import React from 'react';
import ExtensionSim from '../components/ExtensionSim';
import './WoocommerceExtension.css';

function WoocommerceExtension() {
  return (
    <div className="page woocommerce-extension-page">
      <header className="extension-header page-header">
        <h1>Personalized Product Designer</h1>
        <p>WooCommerce Extension for Custom Product Designs</p>
        <p className="extension-description">
          A complete solution for allowing customers to design personalized products with text and images. 
          This extension integrates seamlessly with WooCommerce and uses Fabric.js canvas for powerful design capabilities.
        </p>
      </header>

      {/* Simulation Section */}
      <ExtensionSim />

      {/* Features Section */}
      <section className="section features-section">
        <h2 className="section-header">Extension Features</h2>
        <div className="features-grid">
          <div className="card feature-card">
            <div className="icon">🎨</div>
            <h3 className="wc-card-header">Visual Canvas Designer</h3>
            <p>Powered by Fabric.js for smooth, professional design experience with drag-and-drop functionality.</p>
          </div>
          
          <div className="card feature-card">
            <div className="icon">📐</div>
            <h3 className="wc-card-header">Flexible Canvas Positioning</h3>
            <p>Admins can precisely position and size the design canvas on any product image using percentage-based controls.</p>
          </div>
          
          <div className="card feature-card">
            <div className="icon">✏️</div>
            <h3 className="wc-card-header">Text Customization</h3>
            <p>Customers can add text with custom colors, sizes, and positioning. Perfect for personalized messages.</p>
          </div>
          
          <div className="card feature-card">
            <div className="icon">🖼️</div>
            <h3 className="wc-card-header">Image Upload</h3>
            <p>Allow customers to upload their own images, logos, or photos to incorporate into their designs.</p>
          </div>
          
          <div className="card feature-card">
            <div className="icon">🌈</div>
            <h3 className="wc-card-header">Product Color Variations</h3>
            <p>Automatically syncs with WooCommerce product variations for accurate color preview.</p>
          </div>
          
          <div className="card feature-card">
            <div className=" icon">💾</div>
            <h3 className="wc-card-header">Design File Export</h3>
            <p>Admins can download design files in SVG format and customer-uploaded images for production.</p>
          </div>
          
          <div className="card feature-card">
            <div className="icon">🛒</div>
            <h3 className="wc-card-header">WooCommerce Integration</h3>
            <p>Seamlessly integrates with WooCommerce cart, checkout, and order management systems.</p>
          </div>
          
          <div className="card feature-card">
            <div className="icon">📱</div>
            <h3 className="wc-card-header">Responsive Design</h3>
            <p>Works beautifully on desktop, tablet, and mobile devices for designing on the go.</p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="section technical-section">
        <h2 className="section-header">Technical Implementation</h2>
        <div className="tech-details">
          <div className="card tech-column">
            <h3 className="card-header">🔧 Backend (PHP)</h3>
            <ul>
              <li><strong>Plugin Architecture:</strong> Modular OOP design with separate classes for Admin, Customizer, and Designer</li>
              <li><strong>WooCommerce Hooks:</strong> Integration via filters and actions for cart and order processing</li>
              <li><strong>Meta Data Storage:</strong> Canvas position and settings stored as product meta data</li>
              <li><strong>Design Storage:</strong> Customer designs saved as order item meta data</li>
              <li><strong>File Handling:</strong> SVG export and image data handling with base64 encoding</li>
            </ul>
          </div>
          
          <div className="card tech-column">
            <h3 className="card-header">⚛️ Frontend (JavaScript)</h3>
            <ul>
              <li><strong>Fabric.js Canvas:</strong> Professional HTML5 canvas library for design manipulation</li>
              <li><strong>AJAX Communication:</strong> WordPress AJAX API for seamless data transfer</li>
              <li><strong>Real-time Preview:</strong> Instant visual feedback as customers design</li>
              <li><strong>Object Manipulation:</strong> Drag, scale, rotate, and delete design elements</li>
              <li><strong>Boundary Constraints:</strong> Keeps design elements within canvas bounds</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section use-cases-section">
        <h2 className="section-header">Perfect For</h2>
        <div className="use-cases-grid">
          <div className="card use-case no-hover">
            <h3 className="card-header">👕 Apparel Shops</h3>
            <p>T-shirts, hoodies, caps - let customers create custom designs with text and images.</p>
          </div>
          <div className="card use-case no-hover">
            <h3 className="card-header">🎁 Gift Shops</h3>
            <p>Mugs, phone cases, posters - personalize gifts with names, photos, and messages.</p>
          </div>
          <div className="card use-case no-hover">
            <h3 className="card-header">📚 Print on Demand</h3>
            <p>Books, notebooks, calendars - allow custom covers and personalized content.</p>
          </div>
          <div className="card use-case no-hover">
            <h3 className="card-header">🏢 Corporate Merchandise</h3>
            <p>Branded items with company logos and employee names.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WoocommerceExtension;
