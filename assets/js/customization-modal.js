// Enhanced Customization Modal - DESIGN ONLY (Fixed Version)
function openCustomizationModal(productName, price, imageSrc, productId) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'customization-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Create modal content
  const modal = document.createElement('div');
  modal.className = 'customization-modal';
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: translateY(20px) scale(0.95);
    transition: all 0.3s ease;
    overflow: hidden;
    margin: 1rem;
  `;

  // Get Stripe link for this product
  const stripeProductId = window.getProductIdFromName ? window.getProductIdFromName(productName) : productId;
  const hasStripeLink = window.STRIPE_PAYMENT_LINKS && window.STRIPE_PAYMENT_LINKS[stripeProductId];

  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #c9a96e 0%, #d4b875 100%); color: white; padding: 2rem; border-radius: 12px 12px 0 0;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; margin: 0 0 0.5rem; color: white; font-weight: 400;">✨ Design Your Perfect Dress</h2>
          <p style="margin: 0; opacity: 0.9; font-size: 1.1rem;">${productName}</p>
        </div>
        <button class="close-modal" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; transition: all 0.3s;">&times;</button>
      </div>
    </div>
    
    <div style="padding: 2rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
        
        <!-- Product Preview -->
        <div style="text-align: center;">
          <img src="${imageSrc}" alt="${productName}" style="width: 100%; max-width: 300px; height: auto; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); margin-bottom: 1.5rem;">
          
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: left;">
            <h3 style="margin: 0 0 1rem; color: #1a1a1a; font-size: 1.2rem;">💎 Included in Your Design:</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #c9a96e;">✓</span> Personal design consultation
              </li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #c9a96e;">✓</span> Custom measurements & fitting
              </li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #c9a96e;">✓</span> Premium fabric selection
              </li>
              <li style="padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #c9a96e;">✓</span> Unlimited design revisions
              </li>
              <li style="padding: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
                <span style="color: #c9a96e;">✓</span> Professional alterations
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Customization Form -->
        <div>
          <form id="customization-form">
            
            <!-- Dress Customization -->
            <div style="margin-bottom: 2rem;">
              <h3 style="margin: 0 0 1rem; color: #1a1a1a; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>👗</span> Dress Design
              </h3>
              <div style="display: grid; gap: 1rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Style</label>
                    <select name="style" style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px;">
                      <option value="">Select style</option>
                      <option value="A-line">A-line</option>
                      <option value="Ball Gown">Ball Gown</option>
                      <option value="Mermaid">Mermaid</option>
                      <option value="Sheath">Sheath</option>
                      <option value="Empire">Empire</option>
                      <option value="Trumpet">Trumpet</option>
                    </select>
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Neckline</label>
                    <select name="neckline" style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px;">
                      <option value="">Select neckline</option>
                      <option value="V-neck">V-neck</option>
                      <option value="Strapless">Strapless</option>
                      <option value="Off-shoulder">Off-shoulder</option>
                      <option value="Halter">Halter</option>
                      <option value="One-shoulder">One-shoulder</option>
                      <option value="Sweetheart">Sweetheart</option>
                      <option value="High neck">High neck</option>
                      <option value="Scoop">Scoop</option>
                    </select>
                  </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Color</label>
                    <select name="color" style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px;">
                      <option value="">Select color</option>
                      <option value="Pure White">Pure White</option>
                      <option value="Ivory">Ivory</option>
                      <option value="Champagne">Champagne</option>
                      <option value="Blush">Blush</option>
                      <option value="Dusty Rose">Dusty Rose</option>
                      <option value="Sage">Sage</option>
                      <option value="Custom Color">Custom Color</option>
                    </select>
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Fabric</label>
                    <select name="fabric" style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px;">
                      <option value="">Select fabric</option>
                      <option value="Chiffon">Chiffon</option>
                      <option value="Tulle">Tulle</option>
                      <option value="Satin">Satin</option>
                      <option value="Lace">Lace</option>
                      <option value="Organza">Organza</option>
                      <option value="Crepe">Crepe</option>
                      <option value="Silk">Silk</option>
                    </select>
                  </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Train Style</label>
                    <select name="train" style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px;">
                      <option value="">Select train</option>
                      <option value="No train">No train</option>
                      <option value="Sweep">Sweep</option>
                      <option value="Court">Court</option>
                      <option value="Chapel">Chapel</option>
                      <option value="Cathedral">Cathedral</option>
                      <option value="Watteau">Watteau</option>
                    </select>
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Size</label>
                    <select name="size" style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px;">
                      <option value="">Select size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                      <option value="Custom measurements">Custom measurements</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Special Requests -->
            <div style="margin-bottom: 2rem;">
              <h3 style="margin: 0 0 1rem; color: #1a1a1a; font-size: 1.3rem; display: flex; align-items: center; gap: 0.5rem;">
                <span>💭</span> Special Requests
              </h3>
              <textarea name="specialRequests" rows="4" placeholder="Tell us about any special requirements, inspiration, or modifications you'd like..." style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 6px; resize: vertical; font-family: inherit;"></textarea>
            </div>
            
          </form>
          
          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem;">
            
            <!-- Primary: Custom Design Button -->
            <button type="button" class="submit-customization" style="width: 100%; padding: 1.25rem; background: linear-gradient(135deg, #c9a96e 0%, #d4b875 100%); color: white; border: none; font-weight: 600; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; border-radius: 6px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(201, 169, 110, 0.3);">
              ✨ Start Custom Design Process
            </button>
            
            ${hasStripeLink ? `
            <!-- Secondary: Quick Stripe Checkout -->
            <button type="button" class="stripe-checkout-custom" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #6772e5 0%, #5469d4 100%); color: white; border: none; font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 6px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(103, 114, 229, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Skip Customization - Buy Standard Version
            </button>
            ` : ''}
            
            <!-- Tertiary: Add to Cart -->
            <button type="button" class="add-to-cart-custom" style="width: 100%; padding: 1rem; background: transparent; color: #6c757d; border: 1px solid #e0e0e0; font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 6px; cursor: pointer; transition: all 0.3s;">
              🛍️ Add to Cart Instead
            </button>
          </div>
          
          <!-- Payment Options Explanation -->
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-top: 1.5rem; border-left: 3px solid #17a2b8;">
            <h4 style="margin: 0 0 1rem; color: #1a1a1a; font-size: 1rem;">💡 How This Works</h4>
            <div style="display: grid; gap: 0.75rem; font-size: 0.9rem; color: #6c757d;">
              <div style="display: flex; align-items: start; gap: 0.5rem;">
                <span style="color: #c9a96e; margin-top: 0.1rem;">•</span>
                <div><strong>Custom Design:</strong> We'll contact you within 24 hours to discuss your vision and provide a detailed quote</div>
              </div>
              ${hasStripeLink ? `
              <div style="display: flex; align-items: start; gap: 0.5rem;">
                <span style="color: #6772e5; margin-top: 0.1rem;">•</span>
                <div><strong>Standard Version:</strong> Buy the dress as-is with secure Stripe checkout (your custom preferences will be noted)</div>
              </div>
              ` : ''}
              <div style="display: flex; align-items: start; gap: 0.5rem;">
                <span style="color: #6c757d; margin-top: 0.1rem;">•</span>
                <div><strong>Add to Cart:</strong> Continue shopping and checkout multiple items together</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;

  // Add to DOM
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Show with animation
  setTimeout(() => {
    overlay.style.opacity = '1';
    modal.style.transform = 'translateY(0) scale(1)';
  }, 10);

  // Event listeners
  function closeModal() {
    overlay.style.opacity = '0';
    modal.style.transform = 'translateY(20px) scale(0.95)';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  }

  // Close button
  modal.querySelector('.close-modal').addEventListener('click', closeModal);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Form submission - Custom Design Process
  modal.querySelector('.submit-customization').addEventListener('click', function() {
    const form = modal.querySelector('#customization-form');
    const formData = new FormData(form);
    
    // Collect customization data
    const customizations = {
      design: {
        style: formData.get('style'),
        neckline: formData.get('neckline'),
        color: formData.get('color'),
        fabric: formData.get('fabric'),
        train: formData.get('train'),
        size: formData.get('size'),
        specialRequests: formData.get('specialRequests')
      },
      product: {
        name: productName,
        basePrice: price,
        image: imageSrc,
        productId: stripeProductId
      },
      timestamp: new Date().toISOString(),
      requestId: 'CR-' + Date.now()
    };
    
    // Send customization request
    sendCustomizationRequest(customizations);
    
    // Track in MailerLite
    if (typeof ml !== 'undefined') {
      ml('track', 'custom_design_request', {
        product_name: productName,
        request_id: customizations.requestId
      });
    }
    
    closeModal();
    
    // Show success message
    alert(`✨ Custom Design Request Submitted!\n\nRequest ID: ${customizations.requestId}\n\nOur design team will contact you within 24 hours to discuss your vision and provide a detailed quote.\n\nThank you for choosing Roza Bridal!`);
  });

  // Stripe checkout button (if available)
  const stripeButton = modal.querySelector('.stripe-checkout-custom');
  if (stripeButton) {
    stripeButton.addEventListener('click', function() {
      const form = modal.querySelector('#customization-form');
      const formData = new FormData(form);
      
      // Collect customization preferences for reference
      const customizations = {
        style: formData.get('style'),
        neckline: formData.get('neckline'),
        color: formData.get('color'),
        fabric: formData.get('fabric'),
        train: formData.get('train'),
        size: formData.get('size'),
        specialRequests: formData.get('specialRequests')
      };
      
      // Use global Stripe checkout function
      closeModal();
      window.handleStripeCheckout(stripeProductId, productName, customizations);
    });
  }

  // Add to cart button
  modal.querySelector('.add-to-cart-custom').addEventListener('click', function() {
    const form = modal.querySelector('#customization-form');
    const formData = new FormData(form);
    
    // Create cart item with customizations
    const cartItem = {
      id: 'custom-' + Date.now(),
      name: productName,
      price: parseFloat(price),
      quantity: 1,
      size: formData.get('size') || 'Custom',
      image: imageSrc,
      isCustom: true,
      customizations: {
        style: formData.get('style'),
        neckline: formData.get('neckline'),
        color: formData.get('color'),
        fabric: formData.get('fabric'),
        train: formData.get('train'),
        specialRequests: formData.get('specialRequests')
      }
    };
    
    // Add to cart using existing cart system
    if (window.cart && window.cart.addItem) {
      window.cart.addItem(cartItem);
    } else {
      // Fallback: add directly to localStorage
      const cart = JSON.parse(localStorage.getItem('rozaBridalCart') || '[]');
      cart.push(cartItem);
      localStorage.setItem('rozaBridalCart', JSON.stringify(cart));
      
      // Update cart display
      if (window.updateCartDisplay) {
        window.updateCartDisplay();
      }
      
      // Show notification
      if (window.showCartNotification) {
        window.showCartNotification(cartItem);
      }
    }
    
    closeModal();
    alert('✅ Custom dress added to cart!\n\nYour customization preferences have been saved. We\'ll finalize the details during checkout.');
  });

  // Style enhancements
  const style = document.createElement('style');
  style.textContent = `
    .customization-overlay input:focus,
    .customization-overlay select:focus,
    .customization-overlay textarea:focus {
      outline: none;
      border-color: #c9a96e;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.1);
    }
    
    .submit-customization:hover {
      background: linear-gradient(135deg, #a08850 0%, #b89960 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(201, 169, 110, 0.4);
    }
    
    .stripe-checkout-custom:hover {
      background: linear-gradient(135deg, #5469d4 0%, #4c63d2 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 25px rgba(103, 114, 229, 0.4);
    }
    
    .add-to-cart-custom:hover {
      background: #f8f9fa;
      color: #495057;
      border-color: #6c757d;
    }
    
    .close-modal:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
      .customization-modal {
        margin: 1rem;
        max-height: 95vh;
      }
      
      .customization-modal > div:first-child {
        padding: 1.5rem;
      }
      
      .customization-modal > div:last-child {
        padding: 1.5rem;
      }
      
      .customization-modal > div:last-child > div {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .customization-modal img {
        max-width: 250px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Function to send customization request via email
function sendCustomizationRequest(customizations) {
  const subject = encodeURIComponent(`Custom Design Request - ${customizations.requestId}`);
  const body = encodeURIComponent(`NEW CUSTOM DESIGN REQUEST

REQUEST ID: ${customizations.requestId}

PRODUCT:
Base Design: ${customizations.product.name}
Base Price: $${customizations.product.basePrice}

CUSTOMIZATION DETAILS:
Style: ${customizations.design.style || 'Not specified'}
Neckline: ${customizations.design.neckline || 'Not specified'}
Color: ${customizations.design.color || 'Not specified'}
Fabric: ${customizations.design.fabric || 'Not specified'}
Train: ${customizations.design.train || 'Not specified'}
Size: ${customizations.design.size || 'Not specified'}

SPECIAL REQUESTS:
${customizations.design.specialRequests || 'None specified'}

SUBMITTED: ${new Date(customizations.timestamp).toLocaleString()}

---
NEXT STEPS:
1. Contact customer within 24 hours
2. Discuss design vision and requirements
3. Provide detailed quote and timeline
4. Schedule design consultation if needed

This is a high-priority custom design request.`);
  
  // Save to localStorage for tracking
  const customRequests = JSON.parse(localStorage.getItem('rozaBridalCustomRequests') || '[]');
  customRequests.push(customizations);
  localStorage.setItem('rozaBridalCustomRequests', JSON.stringify(customRequests));
  
  // Open email client
  window.open(`mailto:aetophis@aetophis.com?subject=${subject}&body=${body}`, '_blank');
}

// Make function globally available
window.openCustomizationModal = openCustomizationModal;
