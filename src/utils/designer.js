// Designer implementation for React demo
(function() {
    'use strict';

    window.initFabricCanvas = function(canvasId, options = {}) {
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement || !window.fabric) {
            console.error('Canvas element or Fabric.js not found');
            return null;
        }

        const canvasWidth = options.width || 400;
        const canvasHeight = options.height || 400;

        // Create fabric canvas
        const canvas = new fabric.Canvas(canvasId, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: options.backgroundColor || 'transparent',
            selection: true,
            preserveObjectStacking: true
        });

        // Constrain objects to stay within canvas bounds
        canvas.on('object:moving', function(e) {
            const obj = e.target;
            obj.setCoords();
            const bounds = obj.getBoundingRect(true);
            
            if (bounds.left < 0) {
                obj.left -= bounds.left;
            }
            if (bounds.left + bounds.width > canvas.width) {
                obj.left -= (bounds.left + bounds.width - canvas.width);
            }
            if (bounds.top < 0) {
                obj.top -= bounds.top;
            }
            if (bounds.top + bounds.height > canvas.height) {
                obj.top -= (bounds.top + bounds.height - canvas.height);
            }
        });

        // Constrain objects after scaling
        canvas.on('object:scaling', function(e) {
            const obj = e.target;
            
            if (obj.scaleX < 0) obj.scaleX = Math.abs(obj.scaleX);
            if (obj.scaleY < 0) obj.scaleY = Math.abs(obj.scaleY);
            if (obj.scaleX < 0.05) obj.scaleX = 0.05;
            if (obj.scaleY < 0.05) obj.scaleY = 0.05;
            
            obj.flipX = false;
            obj.flipY = false;
            
            obj.setCoords();
            const bounds = obj.getBoundingRect(true);
            
            if (bounds.width > canvas.width || bounds.height > canvas.height) {
                const maxScaleX = canvas.width / (bounds.width / obj.scaleX);
                const maxScaleY = canvas.height / (bounds.height / obj.scaleY);
                const maxScale = Math.min(maxScaleX, maxScaleY) * 0.99;
                
                obj.scaleX = maxScale;
                obj.scaleY = maxScale;
                obj.setCoords();
            }
        });

        canvas.on('object:modified', function(e) {
            const obj = e.target;
            obj.setCoords();
            const bounds = obj.getBoundingRect(true);
            
            if (bounds.left < 0 || bounds.top < 0 ||
                bounds.left + bounds.width > canvas.width ||
                bounds.top + bounds.height > canvas.height) {
                
                if (bounds.left < 0) obj.left -= bounds.left;
                if (bounds.left + bounds.width > canvas.width) {
                    obj.left -= (bounds.left + bounds.width - canvas.width);
                }
                if (bounds.top < 0) obj.top -= bounds.top;
                if (bounds.top + bounds.height > canvas.height) {
                    obj.top -= (bounds.top + bounds.height - canvas.height);
                }
                
                obj.setCoords();
                canvas.renderAll();
            }
        });

        return canvas;
    };

    window.addTextToCanvas = function(canvas, text, color, fontSize) {
        if (!canvas) return;

        const fabricText = new fabric.Text(text, {
            left: 50,
            top: 50,
            fontSize: fontSize || 24,
            fill: color || '#000000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            selectable: true,
            lockScalingFlip: true,
            flipX: false,
            flipY: false
        });

        canvas.add(fabricText);
        canvas.setActiveObject(fabricText);
        canvas.renderAll();
    };

    window.addImageToCanvas = function(canvas, imageDataUrl, fileName) {
        if (!canvas) return null;

        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                const targetMaxSize = Math.min(canvas.width, canvas.height) / 2;
                let scale = targetMaxSize / Math.max(img.width, img.height);
                
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;
                
                if (scaledWidth > canvas.width * 0.9) {
                    scale = (canvas.width * 0.9) / img.width;
                }
                if (scaledHeight > canvas.height * 0.9) {
                    scale = Math.min(scale, (canvas.height * 0.9) / img.height);
                }
                
                const fabricImage = new fabric.Image(img, {
                    left: canvas.width / 2,
                    top: canvas.height / 2,
                    originX: 'center',
                    originY: 'center',
                    scaleX: scale,
                    scaleY: scale,
                    selectable: true,
                    lockScalingFlip: true,
                    flipX: false,
                    flipY: false
                });
                
                canvas.add(fabricImage);
                canvas.setActiveObject(fabricImage);
                canvas.renderAll();
                
                resolve({ name: fileName, data: imageDataUrl });
            };
            img.src = imageDataUrl;
        });
    };

    window.deleteSelectedFromCanvas = function(canvas) {
        if (!canvas) return;
        
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject.type === 'activeSelection') {
                activeObject.forEachObject(function(obj) {
                    canvas.remove(obj);
                });
                canvas.discardActiveObject();
            } else {
                canvas.remove(activeObject);
                canvas.discardActiveObject();
            }
            canvas.renderAll();
        }
    };

    window.clearCanvas = function(canvas) {
        if (!canvas) return;
        canvas.clear();
        canvas.renderAll();
    };

    window.getCanvasDesignData = function(canvas) {
        if (!canvas) return null;

        const svgString = canvas.toSVG();
        const pngData = canvas.toDataURL('image/png');
        
        // Get uploaded images
        const uploadedImages = [];
        canvas.getObjects().forEach(obj => {
            if (obj.type === 'image' && obj._element && obj._element.src) {
                uploadedImages.push({
                    name: 'image-' + uploadedImages.length + '.png',
                    data: obj._element.src
                });
            }
        });

        return {
            svg: svgString,
            png: pngData,
            uploadedImages: uploadedImages,
            objects: canvas.toJSON()
        };
    };

    console.log('✓ Fabric.js designer helpers loaded');
})();
