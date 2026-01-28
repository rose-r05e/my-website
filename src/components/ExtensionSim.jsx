import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import '../utils/designer.js';
import './ExtensionSim.css';

function ExtensionSim() {
  // State for different views
  const [currentView, setCurrentView] = useState('admin-setup');
  
  // Admin Setup State
  const [productImage, setProductImage] = useState(null);
  const [canvasPosition, setCanvasPosition] = useState({ x: 30, y: 20, width: 40, height: 50 });
  const [isCustomizable, setIsCustomizable] = useState(true);
  const [allowText, setAllowText] = useState(true);
  const [allowImages, setAllowImages] = useState(true);
  const [productVariants, setProductVariants] = useState([
    { id: 1, name: 'White', color: '#ffffff', image: null },
    { id: 2, name: 'Black', color: '#000000', image: null },
  ]);
  
  // Buyer Designer State
  const [productColor, setProductColor] = useState('transparent');
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const fabricCanvasRef = useRef(null);
  const uploadedImagesRef = useRef([]);
  
  // Orders State
  const [orders, setOrders] = useState([]);
  
  // Load saved data from localStorage
  useEffect(() => {
    const savedSetup = localStorage.getItem('wc_admin_setup');
    if (savedSetup) {
      const setup = JSON.parse(savedSetup);
      if (setup.canvasPosition) setCanvasPosition(setup.canvasPosition);
      if (setup.productImage) setProductImage(setup.productImage);
      if (setup.productVariants) setProductVariants(setup.productVariants);
      setIsCustomizable(setup.isCustomizable !== false);
      setAllowText(setup.allowText !== false);
      setAllowImages(setup.allowImages !== false);
    }
    
    const savedOrders = localStorage.getItem('wc_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);
  
  // Extract dominant color from image (copied from WordPress plugin)
  const extractDominantColor = (imageDataUrl, callback) => {
    const img = new Image();
    img.onload = function() {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Sample center region of the image (likely the product)
        const centerX = Math.floor(img.width / 2);
        const centerY = Math.floor(img.height / 2);
        const sampleSize = Math.min(img.width, img.height) / 4;
        
        const imageData = ctx.getImageData(
          centerX - sampleSize / 2,
          centerY - sampleSize / 2,
          sampleSize,
          sampleSize
        );
        
        // Calculate average color
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
          const red = imageData.data[i];
          const green = imageData.data[i + 1];
          const blue = imageData.data[i + 2];
          const alpha = imageData.data[i + 3];
          
          // Skip transparent/white pixels
          if (alpha > 200 && (red + green + blue) < 700) {
            r += red;
            g += green;
            b += blue;
            count++;
          }
        }
        
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          callback(hex);
        } else {
          callback('#cccccc'); // Default gray if extraction fails
        }
      } catch (e) {
        console.error('Error extracting color:', e);
        callback('#cccccc');
      }
    };
    img.onerror = function() {
      callback('#cccccc');
    };
    img.src = imageDataUrl;
  };

  // Admin Setup Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const saveAdminSetup = () => {
    const setup = {
      productImage,
      canvasPosition,
      isCustomizable,
      allowText,
      allowImages,
      productVariants
    };
    localStorage.setItem('wc_admin_setup', JSON.stringify(setup));
    alert('Product setup saved! Switch to "Buyer View" to try the designer.');
  };
  
  // Initialize Fabric canvas when buyer view is active
  useEffect(() => {
    if (currentView === 'buyer-designer' && productImage) {
      // Clean up existing canvas if switching back
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }

      // Wait for DOM element and Fabric.js to be available
      const initCanvas = () => {
        const canvasElement = document.getElementById('designer-canvas');
        if (!canvasElement) {
          setTimeout(initCanvas, 50);
          return;
        }

        if (window.fabric && window.initFabricCanvas) {
          // Calculate canvas dimensions based on product preview size
          const productPreview = document.querySelector('.product-preview img');
          if (!productPreview) {
            setTimeout(initCanvas, 50);
            return;
          }

          const previewWidth = productPreview.offsetWidth;
          const previewHeight = productPreview.offsetHeight;
          
          // Calculate actual canvas size from percentages
          const canvasWidth = Math.floor((canvasPosition.width / 100) * previewWidth);
          const canvasHeight = Math.floor((canvasPosition.height / 100) * previewHeight);

          const canvas = window.initFabricCanvas('designer-canvas', {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: 'transparent'
          });
          fabricCanvasRef.current = canvas;
          console.log('Fabric canvas initialized:', canvasWidth, 'x', canvasHeight);
        } else {
          setTimeout(initCanvas, 100);
        }
      };
      setTimeout(initCanvas, 150);
    }

    // Cleanup on unmount or view change
    return () => {
      if (fabricCanvasRef.current && currentView !== 'buyer-designer') {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [currentView, canvasPosition.width, canvasPosition.height]);

  // Update canvas background when product color changes
  useEffect(() => {
    if (fabricCanvasRef.current) {
      // Keep canvas transparent, color is on the product image
      fabricCanvasRef.current.backgroundColor = 'transparent';
      fabricCanvasRef.current.renderAll();
    }
  }, [productColor]);
  
  // Buyer Designer Handlers
  const addTextElement = () => {
    if (!textInput.trim() || !fabricCanvasRef.current) return;
    
    window.addTextToCanvas(fabricCanvasRef.current, textInput, textColor, 24);
    setTextInput('');
  };
  
  const addImageElement = async (e) => {
    const file = e.target.files[0];
    if (file && fabricCanvasRef.current) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageData = await window.addImageToCanvas(
          fabricCanvasRef.current,
          event.target.result,
          file.name
        );
        if (imageData) {
          uploadedImagesRef.current = [...uploadedImagesRef.current, imageData];
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const deleteSelectedElement = () => {
    if (fabricCanvasRef.current) {
      window.deleteSelectedFromCanvas(fabricCanvasRef.current);
    }
  };
  
  const clearAllElements = () => {
    if (confirm('Clear all design elements?')) {
      if (fabricCanvasRef.current) {
        window.clearCanvas(fabricCanvasRef.current);
        uploadedImagesRef.current = [];
      }
    }
  };
  
  const saveDesignToCart = () => {
    if (!fabricCanvasRef.current) return;
    
    const designData = window.getCanvasDesignData(fabricCanvasRef.current);
    if (!designData) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      customerName: 'Customer #' + Math.floor(Math.random() * 1000),
      productColor,
      design: designData.objects,
      svg: designData.svg,
      uploadedImages: designData.uploadedImages
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('wc_orders', JSON.stringify(updatedOrders));
    
    alert('Design saved to cart! Check "Admin Orders View" to see the order.');
    
    // Clear canvas
    window.clearCanvas(fabricCanvasRef.current);
    uploadedImagesRef.current = [];
  };
  
  const downloadOrderFiles = async (order) => {
    const zip = new JSZip();
    
    // Add SVG design file (already generated by Fabric.js)
    if (order.svg) {
      zip.file('design.svg', order.svg);
    }
    
    // Add all uploaded images
    if (order.uploadedImages && order.uploadedImages.length > 0) {
      for (let i = 0; i < order.uploadedImages.length; i++) {
        const imageData = order.uploadedImages[i];
        const base64Data = imageData.data.split(',')[1];
        const mimeMatch = imageData.data.match(/data:image\/(\w+);/);
        const extension = mimeMatch ? mimeMatch[1] : 'png';
        const filename = `uploaded-image-${i + 1}.${extension}`;
        zip.file(filename, base64Data, { base64: true });
      }
    }
    
    // Generate and download the ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-files-order-${order.id}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="theme-tile">
      {/* View Switcher */}
      <div className="view-switcher">
        <button 
          className={currentView === 'admin-setup' ? 'active' : ''}
          onClick={() => setCurrentView('admin-setup')}
        >
          🛠️ Admin Setup
        </button>
        <button 
          className={currentView === 'buyer-designer' ? 'active' : ''}
          onClick={() => setCurrentView('buyer-designer')}
        >
          🎨 Buyer View
        </button>
        <button 
          className={currentView === 'admin-orders' ? 'active' : ''}
          onClick={() => setCurrentView('admin-orders')}
        >
          📦 Admin Orders
        </button>
      </div>

      {/* Admin Setup View */}
      {currentView === 'admin-setup' && (
        <div className="view-container admin-setup-view">
          <h2>Product Customization Setup</h2>
          <p className="view-description">Configure which products allow customization and set the design canvas position on the product image.</p>
          
          <div className="setup-grid">
            <div className="setup-section">
              <h3>Product Settings</h3>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isCustomizable}
                    onChange={(e) => setIsCustomizable(e.target.checked)}
                  />
                  <span>Enable product customization</span>
                </label>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={allowText}
                    onChange={(e) => setAllowText(e.target.checked)}
                    disabled={!isCustomizable}
                  />
                  <span>Allow text customization</span>
                </label>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={allowImages}
                    onChange={(e) => setAllowImages(e.target.checked)}
                    disabled={!isCustomizable}
                  />
                  <span>Allow image upload</span>
                </label>
              </div>
              
              <div className="form-group">
                <label>Product Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {!productImage && (
                  <p className="help-text">Upload a product image (e.g., t-shirt, mug, etc.)</p>
                )}
              </div>

              <div className="form-group">
                <h3>Product Variants (Color Variations)</h3>
                <p className="help-text">Add color variants. Colors are extracted from the center of each variant image.</p>
                
                <div className="variants-list">
                  {productVariants.map((variant, index) => (
                    <div key={variant.id} className="variant-item">
                      <input 
                        type="text"
                        placeholder="Variant name (e.g., White)"
                        value={variant.name}
                        onChange={(e) => {
                          const updated = [...productVariants];
                          updated[index].name = e.target.value;
                          setProductVariants(updated);
                        }}
                      />
                      <div 
                        className="color-display"
                        style={{ backgroundColor: variant.color }}
                        title={`Extracted color: ${variant.color}`}
                      />
                      <input 
                        type="file"
                        accept="image/*"
                        id={`variant-img-${variant.id}`}
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const imageData = event.target.result;
                              // Extract dominant color from the image
                              extractDominantColor(imageData, (extractedColor) => {
                                const updated = [...productVariants];
                                updated[index].image = imageData;
                                updated[index].color = extractedColor;
                                setProductVariants(updated);
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label htmlFor={`variant-img-${variant.id}`} className="variant-img-label">
                        {variant.image ? '✓ Image' : '📷 Image'}
                      </label>
                      {variant.image && (
                        <div className="variant-preview">
                          <img src={variant.image} alt={variant.name} />
                        </div>
                      )}
                      <button 
                        type="button"
                        className="btn-remove-variant"
                        onClick={() => {
                          setProductVariants(productVariants.filter((_, i) => i !== index));
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button"
                  className="btn-add-variant"
                  onClick={() => {
                    setProductVariants([
                      ...productVariants,
                      { 
                        id: Date.now(), 
                        name: '', 
                        color: '#cccccc', 
                        image: null 
                      }
                    ]);
                  }}
                >
                  ➕ Add Variant
                </button>
              </div>
            </div>
            
            <div className="setup-section">
              <h3>Canvas Position & Size</h3>
              <p className="help-text">Position the design canvas on your product image</p>
              
              {productImage ? (
                <div className="canvas-preview-container">
                  <div className="canvas-preview">
                    <img src={productImage} alt="Product" className="preview-product-image" />
                    <div 
                      className="preview-canvas-overlay"
                      style={{
                        left: `${canvasPosition.x}%`,
                        top: `${canvasPosition.y}%`,
                        width: `${canvasPosition.width}%`,
                        height: `${canvasPosition.height}%`
                      }}
                    />
                  </div>
                  
                  <div className="canvas-controls">
                    <div className="control-group">
                      <label>X Position: {Math.round(canvasPosition.x)}%</label>
                      <input 
                        type="range" 
                        min="0" 
                        max={Math.max(0, 100 - canvasPosition.width)} 
                        value={canvasPosition.x}
                        onChange={(e) => {
                          const newX = Number(e.target.value);
                          const maxX = 100 - canvasPosition.width;
                          setCanvasPosition({...canvasPosition, x: Math.min(newX, maxX)});
                        }}
                      />
                    </div>
                    
                    <div className="control-group">
                      <label>Y Position: {Math.round(canvasPosition.y)}%</label>
                      <input 
                        type="range" 
                        min="0" 
                        max={Math.max(0, 100 - canvasPosition.height)} 
                        value={canvasPosition.y}
                        onChange={(e) => {
                          const newY = Number(e.target.value);
                          const maxY = 100 - canvasPosition.height;
                          setCanvasPosition({...canvasPosition, y: Math.min(newY, maxY)});
                        }}
                      />
                    </div>
                    
                    <div className="control-group">
                      <label>Width: {Math.round(canvasPosition.width)}%</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={canvasPosition.width}
                        onChange={(e) => {
                          const newWidth = Number(e.target.value);
                          const maxX = 100 - newWidth;
                          setCanvasPosition({
                            ...canvasPosition, 
                            width: newWidth,
                            x: Math.min(canvasPosition.x, maxX)
                          });
                        }}
                      />
                    </div>
                    
                    <div className="control-group">
                      <label>Height: {Math.round(canvasPosition.height)}%</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={canvasPosition.height}
                        onChange={(e) => {
                          const newHeight = Number(e.target.value);
                          const maxY = 100 - newHeight;
                          setCanvasPosition({
                            ...canvasPosition, 
                            height: newHeight,
                            y: Math.min(canvasPosition.y, maxY)
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-image-placeholder">
                  <p>Upload a product image to configure canvas position</p>
                </div>
              )}
              
              <button className="btn-primary btn-large" onClick={saveAdminSetup}>
                💾 Save Product Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Designer View */}
      {currentView === 'buyer-designer' && (
        <div className="view-container buyer-designer-view">
          <h2>Design Your Product</h2>
          <p className="view-description">This is what customers see when they customize their product.</p>
          
          {!productImage ? (
            <div className="no-setup-warning">
              <h3>⚠️ No Product Setup</h3>
              <p>Please configure the product in "Admin Setup" first.</p>
              <button onClick={() => setCurrentView('admin-setup')}>Go to Admin Setup</button>
            </div>
          ) : (
            <div className="designer-grid">
              <div className="designer-tools">
                <h3>Design Tools</h3>
                
                {allowText && (
                  <div className="tool-section">
                    <h4>Add Text</h4>
                    <input 
                      type="text"
                      placeholder="Enter text..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTextElement()}
                    />
                    <div className="tool-row">
                      <input 
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        title="Text Color"
                      />
                      <button onClick={addTextElement}>Add Text</button>
                    </div>
                  </div>
                )}
                
                {allowImages && (
                  <div className="tool-section">
                    <h4>Upload Image</h4>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={addImageElement}
                      id="designer-image-upload"
                    />
                    <label htmlFor="designer-image-upload" className="file-upload-label">
                      Choose Image
                    </label>
                  </div>
                )}
                
                <div className="tool-section">
                  <h4>Product Color</h4>
                  <p className="color-note">These colors come from product variants you configured in Admin Setup</p>
                  <div className="color-swatches">
                    {productVariants.map(({name, color, image}) => (
                      <button
                        key={color}
                        className={`color-swatch ${productColor === color ? 'active' : ''}`}
                        style={{ 
                          backgroundColor: color,
                          border: color === '#ffffff' ? '2px solid #ddd' : '2px solid transparent',
                          backgroundImage: image ? `url(${image})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        onClick={() => {
                          setProductColor(color);
                          if (image) {
                            setProductImage(image);
                          }
                        }}
                        title={name}
                        data-color-name={name.toLowerCase()}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="tool-section">
                  <button className="btn-danger" onClick={deleteSelectedElement}>
                    🗑️ Delete Selected
                  </button>
                  <button className="btn-danger" onClick={clearAllElements}>
                    Clear All
                  </button>
                </div>
                
                <div className="tool-section">
                  <button className="btn-success btn-large" onClick={saveDesignToCart}>
                    💾 Save & Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="designer-canvas-area">
                <div className="canvas-wrapper">
                  <div 
                    className="product-preview"
                  >
                    <img 
                      src={productImage} 
                      alt="Product" 
                      className="product-image"
                    />
                    <div 
                      className="design-canvas-container"
                      style={{
                        position: 'absolute',
                        left: `${canvasPosition.x}%`,
                        top: `${canvasPosition.y}%`,
                        width: `${canvasPosition.width}%`,
                        height: `${canvasPosition.height}%`,
                      }}
                    >
                      <canvas id="designer-canvas"></canvas>
                    </div>
                  </div>
                </div>
                <p className="canvas-help">
                  💡 Click to select • Drag to move • Use corner handles to resize/rotate • Delete key or button to remove
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Admin Orders View */}
      {currentView === 'admin-orders' && (
        <div className="view-container admin-orders-view">
          <h2>Customer Orders with Custom Designs</h2>
          <p className="view-description">View and download customer designs for production.</p>
          
          {orders.length === 0 ? (
            <div className="no-orders">
              <h3>No Orders Yet</h3>
              <p>Create a design in "Buyer View" to see orders appear here.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p className="order-meta">
                        <span>📅 {order.date}</span>
                        <span>👤 {order.customerName}</span>
                      </p>
                    </div>
                    <button className="btn-download" onClick={() => downloadOrderFiles(order)}>
                      ⬇️ Download Files
                    </button>
                  </div>
                  
                  <div className="order-content">
                    <div className="order-info">
                      <h4>Design Details</h4>
                      <ul>
                        <li><strong>Product Color:</strong> 
                          <span 
                            className="color-indicator"
                            style={{ backgroundColor: order.productColor }}
                          ></span>
                          {order.productColor}
                        </li>
                        <li><strong>Design Elements:</strong> {order.design?.objects?.length || 0}</li>
                      </ul>
                      
                      <h4>Available Files:</h4>
                      <ul className="file-list">
                        <li>📄 design.svg - Design vector file</li>
                        {order.uploadedImages && order.uploadedImages.map((img, idx) => {
                          const mimeMatch = img.data.match(/data:image\/(\w+);/);
                          const extension = mimeMatch ? mimeMatch[1] : 'png';
                          return (
                            <li key={idx}>🖼️ uploaded-image-{idx + 1}.{extension} - Customer uploaded image</li>
                          );
                        })}
                      </ul>
                    </div>
                    
                    <div className="order-preview">
                      <h4>Customer Design Preview</h4>
                      <div 
                        className="mini-product-preview"
                        style={{ backgroundColor: order.productColor === '#ffffff' ? '#f0f0f0' : '#fff' }}
                      >
                        {order.svg && (
                          <img 
                            src={`data:image/svg+xml;base64,${btoa(order.svg)}`} 
                            alt="Design Preview" 
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {orders.length > 0 && (
            <button 
              className="btn-danger clear-orders-btn"
              onClick={() => {
                if (confirm('Clear all test orders?')) {
                  setOrders([]);
                  localStorage.removeItem('wc_orders');
                }
              }}
            >
              Clear All Orders
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ExtensionSim;
