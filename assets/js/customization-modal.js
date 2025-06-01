// Beautiful Customization Modal - DESIGN ONLY, No Personal Info
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
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.4s ease;
  `;

  // Create modal content
  const modal = document.createElement('div');
  modal.className = 'customization-modal';
  modal.style.cssText = `
    background: white;
    border-radius: 20px;
    max-width: 1000px;
    width: 100%;
    max-height: 95vh;
    overflow-y: auto;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
    transform: translateY(30px) scale(0.9);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  `;

  // Get Stripe link for this product
  const stripeProductId = window.getProductIdFromName ? window.getProductIdFromName(productName) : productId;
  const hasStripeLink = window.STRIPE_PAYMENT_LINKS && window.STRIPE_PAYMENT_LINKS[stripeProductId];

  modal.innerHTML = `
    <!-- Header Section -->
    <div style="background: linear-gradient(135deg, #c9a96e 0%, #d4b875 50%, #e6c388 100%); color: white; padding: 2.5rem; border-radius: 20px 20px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"30\" r=\"1.5\" fill=\"rgba(255,255,255,0.08)\"/><circle cx=\"40\" cy=\"70\" r=\"1\" fill=\"rgba(255,255,255,0.12)\"/><circle cx=\"90\" cy=\"80\" r=\"1.2\" fill=\"rgba(255,255,255,0.06)\"/></svg>'); opacity: 0.3;"></div>
      <div style="position: relative; z-index: 2;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin: 0 0 0.5rem; color: white; font-weight: 300; line-height: 1.1;">✨ Customize Your Dress</h2>
            <p style="margin: 0; opacity: 0.95; font-size: 1.2rem; font-weight: 300;">${productName}</p>
          </div>
          <button class="close-modal" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 45px; height: 45px; border-radius: 50%; font-size: 1.8rem; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">&times;</button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.15); padding: 1rem 1.5rem; border-radius: 12px; backdrop-filter: blur(10px);">
          <span style="font-size: 1.5rem;">💰</span>
          <div>
            <div style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 0.25rem;">Starting from</div>
            <div style="font-size: 2rem; font-weight: 600; font-family: 'Cormorant Garamond', serif;">${price}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 2.5rem;">
      <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 3rem; align-items: start;">
        
        <!-- Product Preview Section -->
        <div style="text-align: center; position: sticky; top: 2rem;">
          <div style="position: relative; margin-bottom: 2rem;">
            <img src="${imageSrc}" alt="${productName}" style="width: 100%; max-width: 320px; height: auto; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); transition: transform 0.3s ease;">
            <div style="position: absolute; top: -10px; right: -10px; background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; box-shadow: 0 4px 15px rgba(255,107,107,0.4);">
              ✨ CUSTOM
            </div>
          </div>
          
          <!-- Included Features -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 16px; text-align: left; border: 1px solid rgba(201, 169, 110, 0.1);">
            <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.3rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">💎</span> What's Included
            </h3>
            <div style="display: grid; gap: 1rem;">
              ${[
                { icon: '👗', title: 'Custom Design', desc: 'Personalized to your vision' },
                { icon: '📏', title: 'Perfect Fit', desc: 'Tailored to your measurements' },
                { icon: '🎨', title: 'Color Choice', desc: 'Any color you desire' },
                { icon: '✨', title: 'Premium Quality', desc: 'Finest fabrics & craftsmanship' },
                { icon: '🔄', title: 'Unlimited Revisions', desc: 'Until it\'s perfect' },
                { icon: '📞', title: 'Personal Consultation', desc: 'One-on-one design session' }
              ].map(feature => `
                <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <span style="font-size: 1.3rem; width: 35px; text-align: center;">${feature.icon}</span>
                  <div>
                    <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 0.1rem;">${feature.title}</div>
                    <div style="font-size: 0.85rem; color: #666;">${feature.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <!-- Customization Form - DESIGN ONLY -->
        <div>
          <form id="customization-form">
            
            <!-- Dress Style Section -->
            <div class="design-section" style="margin-bottom: 2.5rem;">
              <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.6rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.75rem;">
                <span style="width: 45px; height: 45px; background: linear-gradient(135deg, #c9a96e, #d4b875); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">👗</span>
                Dress Silhouette
              </h3>
              
              <div class="style-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
                ${[
                  { value: 'A-line', label: 'A-Line', icon: '📐', desc: 'Classic & flattering' },
                  { value: 'Ball Gown', label: 'Ball Gown', icon: '👑', desc: 'Princess style' },
                  { value: 'Mermaid', label: 'Mermaid', icon: '🧜‍♀️', desc: 'Figure-hugging' },
                  { value: 'Sheath', label: 'Sheath', icon: '📏', desc: 'Sleek & modern' },
                  { value: 'Empire', label: 'Empire', icon: '🏛️', desc: 'High waisted' },
                  { value: 'Trumpet', label: 'Trumpet', icon: '🎺', desc: 'Flared bottom' }
                ].map(style => `
                  <label class="style-option" style="display: block; cursor: pointer; transition: all 0.3s;">
                    <input type="radio" name="style" value="${style.value}" style="display: none;">
                    <div class="style-card" style="padding: 1.25rem 0.75rem; background: white; border: 2px solid #e0e0e0; border-radius: 12px; text-align: center; transition: all 0.3s; height: 100%;">
                      <div style="font-size: 2rem; margin-bottom: 0.5rem;">${style.icon}</div>
                      <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem; color: #1a1a1a;">${style.label}</div>
                      <div style="font-size: 0.75rem; color: #666;">${style.desc}</div>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Neckline Section -->
            <div class="design-section" style="margin-bottom: 2.5rem;">
              <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.6rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.75rem;">
                <span style="width: 45px; height: 45px; background: linear-gradient(135deg, #6772e5, #5469d4); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">💎</span>
                Neckline Style
              </h3>
              
              <div class="neckline-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                ${[
                  { value: 'V-neck', label: 'V-Neck', icon: 'V' },
                  { value: 'Strapless', label: 'Strapless', icon: '—' },
                  { value: 'Off-shoulder', label: 'Off-Shoulder', icon: '⤵' },
                  { value: 'Halter', label: 'Halter', icon: '△' },
                  { value: 'One-shoulder', label: 'One-Shoulder', icon: '/' },
                  { value: 'Sweetheart', label: 'Sweetheart', icon: '♡' },
                  { value: 'High neck', label: 'High Neck', icon: '⬆' },
                  { value: 'Scoop', label: 'Scoop', icon: '⌒' }
                ].map(neckline => `
                  <label class="neckline-option" style="display: block; cursor: pointer;">
                    <input type="radio" name="neckline" value="${neckline.value}" style="display: none;">
                    <div class="neckline-card" style="padding: 1rem 0.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 10px; text-align: center; transition: all 0.3s;">
                      <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; color: #6772e5;">${neckline.icon}</div>
                      <div style="font-weight: 500; font-size: 0.85rem; color: #1a1a1a;">${neckline.label}</div>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Color & Fabric Section -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem;">
              
              <!-- Color Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #ff6b6b, #ee5a52); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">🎨</span>
                  Color
                </h3>
                
                <div class="color-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                  ${[
                    { value: 'Pure White', color: '#ffffff', border: '#e0e0e0' },
                    { value: 'Ivory', color: '#f8f6f0', border: '#e8e6e0' },
                    { value: 'Champagne', color: '#f7e7ce', border: '#e7d7be' },
                    { value: 'Blush', color: '#fde2e4', border: '#edd2d4' },
                    { value: 'Dusty Rose', color: '#d4a5a5', border: '#c49595' },
                    { value: 'Sage', color: '#9caf88', border: '#8c9f78' }
                  ].map(color => `
                    <label class="color-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="color" value="${color.value}" style="display: none;">
                      <div class="color-card" style="padding: 1rem; background: ${color.color}; border: 2px solid ${color.border}; border-radius: 8px; text-align: center; transition: all 0.3s; min-height: 60px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-weight: 500; font-size: 0.85rem; color: #1a1a1a; text-shadow: 0 1px 2px rgba(255,255,255,0.8);">${color.value}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
              
              <!-- Fabric Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #4ecdc4, #44a08d); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">🧵</span>
                  Fabric
                </h3>
                
                <div class="fabric-list" style="display: grid; gap: 0.5rem;">
                  ${[
                    { value: 'Chiffon', desc: 'Light & flowing' },
                    { value: 'Tulle', desc: 'Dreamy & ethereal' },
                    { value: 'Satin', desc: 'Smooth & elegant' },
                    { value: 'Lace', desc: 'Romantic & detailed' },
                    { value: 'Organza', desc: 'Crisp & structured' },
                    { value: 'Silk', desc: 'Luxurious & soft' }
                  ].map(fabric => `
                    <label class="fabric-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="fabric" value="${fabric.value}" style="display: none;">
                      <div class="fabric-card" style="padding: 0.75rem 1rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500; color: #1a1a1a;">${fabric.value}</span>
                        <span style="font-size: 0.8rem; color: #666;">${fabric.desc}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
            
            <!-- Train & Size Section -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem;">
              
              <!-- Train Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #a8edea, #fed6e3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">👑</span>
                  Train Style
                </h3>
                
                <div class="train-list" style="display: grid; gap: 0.5rem;">
                  ${[
                    { value: 'No train', desc: 'Clean & modern' },
                    { value: 'Sweep', desc: 'Subtle elegance' },
                    { value: 'Court', desc: 'Traditional length' },
                    { value: 'Chapel', desc: 'Dramatic flair' },
                    { value: 'Cathedral', desc: 'Ultimate glamour' }
                  ].map(train => `
                    <label class="train-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="train" value="${train.value}" style="display: none;">
                      <div class="train-card" style="padding: 0.75rem 1rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500; color: #1a1a1a;">${train.value}</span>
                        <span style="font-size: 0.8rem; color: #666;">${train.desc}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
              
              <!-- Size Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #ffeaa7, #fdcb6e); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">📏</span>
                  Size
                </h3>
                
                <div class="size-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                  ${['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => `
                    <label class="size-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="size" value="${size}" style="display: none;">
                      <div class="size-card" style="padding: 0.75rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; text-align: center; transition: all 0.3s; font-weight: 600; color: #1a1a1a;">
                        ${size}
                      </div>
                    </label>
                  `).join('')}
                </div>
                
                <label class="size-option" style="display: block; cursor: pointer; margin-top: 0.5rem;">
                  <input type="radio" name="size" value="Custom measurements" style="display: none;">
                  <div class="size-card" style="padding: 0.75rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: 2px solid transparent; border-radius: 8px; text-align: center; transition: all 0.3s; font-weight: 600;">
                    ✨ Custom Measurements
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Special Requests -->
            <div class="design-section" style="margin-bottom: 2.5rem;">
              <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.6rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.75rem;">
                <span style="width: 45px; height: 45px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">💭</span>
                Special Requests
              </h3>
              
              <textarea name="specialRequests" rows="4" placeholder="Describe your dream dress... Any special details, inspiration photos, or modifications you'd like. We love bringing your vision to life! ✨" 
                style="width: 100%; padding: 1.5rem; border: 2px solid #e0e0e0; border-radius: 12px; resize: vertical; font-family: inherit; font-size: 1rem; line-height: 1.6; transition: all 0.3s; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);">
              </textarea>
            </div>
            
          </form>
          
          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 3rem;">
            
            <!-- Primary: Custom Design Button -->
            <button type="button" class="submit-customization" style="width: 100%; padding: 1.5rem; background: linear-gradient(135deg, #c9a96e 0%, #d4b875 50%, #e6c388 100%); color: white; border: none; font-weight: 600; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; border-radius: 12px; cursor: pointer; transition: all 0.4s; box-shadow: 0 8px 30px rgba(201, 169, 110, 0.3); position: relative; overflow: hidden;">
              <span style="position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
                <span style="font-size: 1.3rem;">✨</span>
                Request Custom Design Quote
              </span>
            </button>
            
            ${hasStripeLink ? `
            <!-- Secondary: Quick Stripe Checkout -->
            <button type="button" class="stripe-checkout-custom" style="width: 100%; padding: 1.25rem; background: linear-gradient(135deg, #6772e5 0%, #5469d4 100%); color: white; border: none; font-weight: 600; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 6px 25px rgba(103, 114, 229, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Buy Standard Version Now
            </button>
            ` : ''}
            
            <!-- Tertiary: Add to Cart -->
            <button type="button" class="add-to-cart-custom" style="width: 100%; padding: 1rem; background: transparent; color: #6c757d; border: 2px solid #e0e0e0; font-weight: 500; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 12px; cursor: pointer; transition: all 0.3s;">
              🛍️ Add to Cart with These Preferences
            </button>
          </div>
          
          <!-- How It Works -->
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 20%, #fff3e0 100%); padding: 2rem; border-radius: 16px; margin-top: 2rem; border-left: 4px solid #17a2b8;">
            <h4 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.4rem;">💡</span> How Custom Design Works
            </h4>
            <div style="display: grid; gap: 1rem; font-size: 0.95rem; color: #555;">
              <div style="display: flex; align-items: start; gap: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <span style="width: 30px; height: 30px; background: #c9a96e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">1</span>
                <div><strong>Design Consultation:</strong> We'll contact you within 24 hours to discuss your design preferences</div>
              </div>
              <div style="display: flex; align-items: start; gap: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <span style="width: 30px; height: 30px; background: #6772e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">2</span>
                <div><strong>Design & Quote:</strong> Receive detailed sketches and transparent pricing for your custom dress</div>
              </div>
              <div style="display: flex; align-items: start; gap: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <span style="width: 30px; height: 30px; background: #28a745; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">3</span>
                <div><strong>Creation & Delivery:</strong> Your dress is handcrafted with love and delivered to your door</div>
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

  // Setup event listeners
  setupModalInteractions(modal, overlay, productName, stripeProductId, price, imageSrc);
} Contact Info, Pure Design Focus
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
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.4s ease;
  `;

  // Create modal content
  const modal = document.createElement('div');
  modal.className = 'customization-modal';
  modal.style.cssText = `
    background: white;
    border-radius: 20px;
    max-width: 1000px;
    width: 100%;
    max-height: 95vh;
    overflow-y: auto;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
    transform: translateY(30px) scale(0.9);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  `;

  // Get Stripe link for this product
  const stripeProductId = window.getProductIdFromName ? window.getProductIdFromName(productName) : productId;
  const hasStripeLink = window.STRIPE_PAYMENT_LINKS && window.STRIPE_PAYMENT_LINKS[stripeProductId];

  modal.innerHTML = `
    <!-- Header Section -->
    <div style="background: linear-gradient(135deg, #c9a96e 0%, #d4b875 50%, #e6c388 100%); color: white; padding: 2.5rem; border-radius: 20px 20px 0 0; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"30\" r=\"1.5\" fill=\"rgba(255,255,255,0.08)\"/><circle cx=\"40\" cy=\"70\" r=\"1\" fill=\"rgba(255,255,255,0.12)\"/><circle cx=\"90\" cy=\"80\" r=\"1.2\" fill=\"rgba(255,255,255,0.06)\"/></svg>'); opacity: 0.3;"></div>
      <div style="position: relative; z-index: 2;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin: 0 0 0.5rem; color: white; font-weight: 300; line-height: 1.1;">✨ Design Your Perfect Dress</h2>
            <p style="margin: 0; opacity: 0.95; font-size: 1.2rem; font-weight: 300;">${productName}</p>
          </div>
          <button class="close-modal" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 45px; height: 45px; border-radius: 50%; font-size: 1.8rem; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">&times;</button>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.15); padding: 1rem 1.5rem; border-radius: 12px; backdrop-filter: blur(10px);">
          <span style="font-size: 1.5rem;">💰</span>
          <div>
            <div style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 0.25rem;">Starting from</div>
            <div style="font-size: 2rem; font-weight: 600; font-family: 'Cormorant Garamond', serif;">$${price}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 2.5rem;">
      <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 3rem; align-items: start;">
        
        <!-- Product Preview Section -->
        <div style="text-align: center; position: sticky; top: 2rem;">
          <div style="position: relative; margin-bottom: 2rem;">
            <img src="${imageSrc}" alt="${productName}" style="width: 100%; max-width: 320px; height: auto; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); transition: transform 0.3s ease;">
            <div style="position: absolute; top: -10px; right: -10px; background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; box-shadow: 0 4px 15px rgba(255,107,107,0.4);">
              ✨ CUSTOM
            </div>
          </div>
          
          <!-- Included Features -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 16px; text-align: left; border: 1px solid rgba(201, 169, 110, 0.1);">
            <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.3rem; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <span style="font-size: 1.5rem;">💎</span> What's Included
            </h3>
            <div style="display: grid; gap: 1rem;">
              ${[
                { icon: '👗', title: 'Custom Design', desc: 'Personalized to your vision' },
                { icon: '📏', title: 'Perfect Fit', desc: 'Tailored to your measurements' },
                { icon: '🎨', title: 'Color Choice', desc: 'Any color you desire' },
                { icon: '✨', title: 'Premium Quality', desc: 'Finest fabrics & craftsmanship' },
                { icon: '🔄', title: 'Unlimited Revisions', desc: 'Until it\'s perfect' },
                { icon: '📞', title: 'Personal Consultation', desc: 'One-on-one design session' }
              ].map(feature => `
                <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <span style="font-size: 1.3rem; width: 35px; text-align: center;">${feature.icon}</span>
                  <div>
                    <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 0.1rem;">${feature.title}</div>
                    <div style="font-size: 0.85rem; color: #666;">${feature.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <!-- Customization Form -->
        <div>
          <form id="customization-form">
            
            <!-- Dress Style Section -->
            <div class="design-section" style="margin-bottom: 2.5rem;">
              <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.6rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.75rem;">
                <span style="width: 45px; height: 45px; background: linear-gradient(135deg, #c9a96e, #d4b875); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">👗</span>
                Dress Silhouette
              </h3>
              
              <div class="style-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
                ${[
                  { value: 'A-line', label: 'A-Line', icon: '📐', desc: 'Classic & flattering' },
                  { value: 'Ball Gown', label: 'Ball Gown', icon: '👑', desc: 'Princess style' },
                  { value: 'Mermaid', label: 'Mermaid', icon: '🧜‍♀️', desc: 'Figure-hugging' },
                  { value: 'Sheath', label: 'Sheath', icon: '📏', desc: 'Sleek & modern' },
                  { value: 'Empire', label: 'Empire', icon: '🏛️', desc: 'High waisted' },
                  { value: 'Trumpet', label: 'Trumpet', icon: '🎺', desc: 'Flared bottom' }
                ].map(style => `
                  <label class="style-option" style="display: block; cursor: pointer; transition: all 0.3s;">
                    <input type="radio" name="style" value="${style.value}" style="display: none;">
                    <div class="style-card" style="padding: 1.25rem 0.75rem; background: white; border: 2px solid #e0e0e0; border-radius: 12px; text-align: center; transition: all 0.3s; height: 100%;">
                      <div style="font-size: 2rem; margin-bottom: 0.5rem;">${style.icon}</div>
                      <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem; color: #1a1a1a;">${style.label}</div>
                      <div style="font-size: 0.75rem; color: #666;">${style.desc}</div>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Neckline Section -->
            <div class="design-section" style="margin-bottom: 2.5rem;">
              <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.6rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.75rem;">
                <span style="width: 45px; height: 45px; background: linear-gradient(135deg, #6772e5, #5469d4); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">💎</span>
                Neckline Style
              </h3>
              
              <div class="neckline-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                ${[
                  { value: 'V-neck', label: 'V-Neck', icon: 'V' },
                  { value: 'Strapless', label: 'Strapless', icon: '—' },
                  { value: 'Off-shoulder', label: 'Off-Shoulder', icon: '⤵' },
                  { value: 'Halter', label: 'Halter', icon: '△' },
                  { value: 'One-shoulder', label: 'One-Shoulder', icon: '/' },
                  { value: 'Sweetheart', label: 'Sweetheart', icon: '♡' },
                  { value: 'High neck', label: 'High Neck', icon: '⬆' },
                  { value: 'Scoop', label: 'Scoop', icon: '⌒' }
                ].map(neckline => `
                  <label class="neckline-option" style="display: block; cursor: pointer;">
                    <input type="radio" name="neckline" value="${neckline.value}" style="display: none;">
                    <div class="neckline-card" style="padding: 1rem 0.5rem; background: white; border: 2px solid #e0e0e0; border-radius: 10px; text-align: center; transition: all 0.3s;">
                      <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; color: #6772e5;">${neckline.icon}</div>
                      <div style="font-weight: 500; font-size: 0.85rem; color: #1a1a1a;">${neckline.label}</div>
                    </div>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Color & Fabric Section -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem;">
              
              <!-- Color Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #ff6b6b, #ee5a52); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">🎨</span>
                  Color
                </h3>
                
                <div class="color-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                  ${[
                    { value: 'Pure White', color: '#ffffff', border: '#e0e0e0' },
                    { value: 'Ivory', color: '#f8f6f0', border: '#e8e6e0' },
                    { value: 'Champagne', color: '#f7e7ce', border: '#e7d7be' },
                    { value: 'Blush', color: '#fde2e4', border: '#edd2d4' },
                    { value: 'Dusty Rose', color: '#d4a5a5', border: '#c49595' },
                    { value: 'Sage', color: '#9caf88', border: '#8c9f78' }
                  ].map(color => `
                    <label class="color-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="color" value="${color.value}" style="display: none;">
                      <div class="color-card" style="padding: 1rem; background: ${color.color}; border: 2px solid ${color.border}; border-radius: 8px; text-align: center; transition: all 0.3s; min-height: 60px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-weight: 500; font-size: 0.85rem; color: #1a1a1a; text-shadow: 0 1px 2px rgba(255,255,255,0.8);">${color.value}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
              
              <!-- Fabric Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #4ecdc4, #44a08d); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">🧵</span>
                  Fabric
                </h3>
                
                <div class="fabric-list" style="display: grid; gap: 0.5rem;">
                  ${[
                    { value: 'Chiffon', desc: 'Light & flowing' },
                    { value: 'Tulle', desc: 'Dreamy & ethereal' },
                    { value: 'Satin', desc: 'Smooth & elegant' },
                    { value: 'Lace', desc: 'Romantic & detailed' },
                    { value: 'Organza', desc: 'Crisp & structured' },
                    { value: 'Silk', desc: 'Luxurious & soft' }
                  ].map(fabric => `
                    <label class="fabric-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="fabric" value="${fabric.value}" style="display: none;">
                      <div class="fabric-card" style="padding: 0.75rem 1rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500; color: #1a1a1a;">${fabric.value}</span>
                        <span style="font-size: 0.8rem; color: #666;">${fabric.desc}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
            
            <!-- Train & Size Section -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem;">
              
              <!-- Train Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #a8edea, #fed6e3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">👑</span>
                  Train Style
                </h3>
                
                <div class="train-list" style="display: grid; gap: 0.5rem;">
                  ${[
                    { value: 'No train', desc: 'Clean & modern' },
                    { value: 'Sweep', desc: 'Subtle elegance' },
                    { value: 'Court', desc: 'Traditional length' },
                    { value: 'Chapel', desc: 'Dramatic flair' },
                    { value: 'Cathedral', desc: 'Ultimate glamour' }
                  ].map(train => `
                    <label class="train-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="train" value="${train.value}" style="display: none;">
                      <div class="train-card" style="padding: 0.75rem 1rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 500; color: #1a1a1a;">${train.value}</span>
                        <span style="font-size: 0.8rem; color: #666;">${train.desc}</span>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
              
              <!-- Size Selection -->
              <div class="design-section">
                <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.4rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.5rem;">
                  <span style="width: 35px; height: 35px; background: linear-gradient(135deg, #ffeaa7, #fdcb6e); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem;">📏</span>
                  Size
                </h3>
                
                <div class="size-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                  ${['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => `
                    <label class="size-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="size" value="${size}" style="display: none;">
                      <div class="size-card" style="padding: 0.75rem; background: white; border: 2px solid #e0e0e0; border-radius: 8px; text-align: center; transition: all 0.3s; font-weight: 600; color: #1a1a1a;">
                        ${size}
                      </div>
                    </label>
                  `).join('')}
                </div>
                
                <label class="size-option" style="display: block; cursor: pointer; margin-top: 0.5rem;">
                  <input type="radio" name="size" value="Custom measurements" style="display: none;">
                  <div class="size-card" style="padding: 0.75rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: 2px solid transparent; border-radius: 8px; text-align: center; transition: all 0.3s; font-weight: 600;">
                    ✨ Custom Measurements
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Special Requests -->
            <div class="design-section" style="margin-bottom: 2.5rem;">
              <h3 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.6rem; font-family: 'Cormorant Garamond', serif; display: flex; align-items: center; gap: 0.75rem;">
                <span style="width: 45px; height: 45px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">💭</span>
                Special Requests
              </h3>
              
              <textarea name="specialRequests" rows="4" placeholder="Describe your dream dress... Any special details, inspiration photos, or modifications you'd like. We love bringing your vision to life! ✨" 
                style="width: 100%; padding: 1.5rem; border: 2px solid #e0e0e0; border-radius: 12px; resize: vertical; font-family: inherit; font-size: 1rem; line-height: 1.6; transition: all 0.3s; background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);">
              </textarea>
            </div>
            
          </form>
          
          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 3rem;">
            
            <!-- Primary: Custom Design Button -->
            <button type="button" class="submit-customization" style="width: 100%; padding: 1.5rem; background: linear-gradient(135deg, #c9a96e 0%, #d4b875 50%, #e6c388 100%); color: white; border: none; font-weight: 600; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; border-radius: 12px; cursor: pointer; transition: all 0.4s; box-shadow: 0 8px 30px rgba(201, 169, 110, 0.3); position: relative; overflow: hidden;">
              <span style="position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
                <span style="font-size: 1.3rem;">✨</span>
                Start Custom Design Process
              </span>
            </button>
            
            ${hasStripeLink ? `
            <!-- Secondary: Quick Stripe Checkout -->
            <button type="button" class="stripe-checkout-custom" style="width: 100%; padding: 1.25rem; background: linear-gradient(135deg, #6772e5 0%, #5469d4 100%); color: white; border: none; font-weight: 600; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-shadow: 0 6px 25px rgba(103, 114, 229, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Buy Standard Version Now
            </button>
            ` : ''}
            
            <!-- Tertiary: Add to Cart -->
            <button type="button" class="add-to-cart-custom" style="width: 100%; padding: 1rem; background: transparent; color: #6c757d; border: 2px solid #e0e0e0; font-weight: 500; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 12px; cursor: pointer; transition: all 0.3s;">
              🛍️ Add to Cart Instead
            </button>
          </div>
          
          <!-- How It Works -->
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 20%, #fff3e0 100%); padding: 2rem; border-radius: 16px; margin-top: 2rem; border-left: 4px solid #17a2b8;">
            <h4 style="margin: 0 0 1.5rem; color: #1a1a1a; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.4rem;">💡</span> How Your Custom Design Works
            </h4>
            <div style="display: grid; gap: 1rem; font-size: 0.95rem; color: #555;">
              <div style="display: flex; align-items: start; gap: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <span style="width: 30px; height: 30px; background: #c9a96e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">1</span>
                <div><strong>Design Consultation:</strong> We'll contact you within 24 hours to discuss your vision and preferences</div>
              </div>
              <div style="display: flex; align-items: start; gap: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <span style="width: 30px; height: 30px; background: #6772e5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">2</span>
                <div><strong>Design & Quote:</strong> Receive detailed sketches and transparent pricing for your custom dress</div>
              </div>
              <div style="display: flex; align-items: start; gap: 1rem; padding: 0.75rem; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <span style="width: 30px; height: 30px; background: #28a745; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;">3</span>
                <div><strong>Creation & Delivery:</strong> Your dress is handcrafted with love and delivered to your door</div>
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

  // Setup event listeners
  setupModalInteractions(modal, overlay, productName, stripeProductId, price, imageSrc);
}

function setupModalInteractions(modal, overlay, productName, stripeProductId, price, imageSrc) {
  // Close modal function
  function closeModal() {
    overlay.style.opacity = '0';
    modal.style.transform = 'translateY(30px) scale(0.9)';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 400);
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

  // Enhanced selection interactions
  setupSelectionInteractions(modal);

  // Form submission - Custom Design Process
  modal.querySelector('.submit-customization').addEventListener('click', function() {
    const customizations = collectCustomizations(modal);
    
    // No validation required - they can request a quote with any selections
    
    // Create customization request
    const customizationData = {
      product: {
        name: productName,
        basePrice: price,
        image: imageSrc,
        productId: stripeProductId
      },
      design: customizations,
      timestamp: new Date().toISOString(),
      requestId: 'CR-' + Date.now()
    };
    
    // Send customization request
    sendCustomizationRequest(customizationData);
    
    // Track in MailerLite
    if (typeof ml !== 'undefined') {
      ml('track', 'custom_design_request', {
        product_name: productName,
        style: customizations.style,
        neckline: customizations.neckline,
        color: customizations.color,
        fabric: customizations.fabric,
        request_id: customizationData.requestId
      });
    }
    
    closeModal();
    
    // Show beautiful success message
    showSuccessMessage(customizationData.requestId);
  });

  // Stripe checkout button (if available)
  const stripeButton = modal.querySelector('.stripe-checkout-custom');
  if (stripeButton) {
    stripeButton.addEventListener('click', function() {
      const customizations = collectCustomizations(modal);
      
      // Use global Stripe checkout function
      closeModal();
      
      // Show preferences note
      if (Object.keys(customizations).filter(key => customizations[key]).length > 0) {
        setTimeout(() => {
          alert('🎨 Design Preferences Noted!\n\nYou\'ll be redirected to secure Stripe checkout. After purchase, we\'ll contact you to discuss your customization preferences.\n\nYour design choices have been saved for reference.');
          
          setTimeout(() => {
            window.handleStripeCheckout(stripeProductId, productName, customizations);
          }, 1000);
        }, 500);
      } else {
        window.handleStripeCheckout(stripeProductId, productName);
      }
    });
  }

  // Add to cart button
  modal.querySelector('.add-to-cart-custom').addEventListener('click', function() {
    const customizations = collectCustomizations(modal);
    
    // Create cart item with customizations
    const cartItem = {
      id: 'custom-' + Date.now(),
      name: productName,
      price: parseFloat(price),
      quantity: 1,
      size: customizations.size || 'To be determined',
      image: imageSrc,
      isCustom: Object.keys(customizations).filter(key => customizations[key]).length > 0,
      customizations: customizations
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
    
    // Show success message
    setTimeout(() => {
      showCartSuccessMessage(cartItem.isCustom);
    }, 500);
  });
}

function setupSelectionInteractions(modal) {
  // Style selection interactions
  modal.querySelectorAll('.style-option').forEach(option => {
    option.addEventListener('click', function() {
      // Remove active state from all style options
      modal.querySelectorAll('.style-card').forEach(card => {
        card.style.borderColor = '#e0e0e0';
        card.style.background = 'white';
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
      });
      
      // Add active state to selected option
      const card = this.querySelector('.style-card');
      card.style.borderColor = '#c9a96e';
      card.style.background = 'linear-gradient(135deg, #c9a96e10, #d4b87510)';
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 8px 25px rgba(201, 169, 110, 0.3)';
      
      // Check the radio button
      this.querySelector('input[type="radio"]').checked = true;
    });
  });

  // Neckline selection interactions
  modal.querySelectorAll('.neckline-option').forEach(option => {
    option.addEventListener('click', function() {
      modal.querySelectorAll('.neckline-card').forEach(card => {
        card.style.borderColor = '#e0e0e0';
        card.style.background = 'white';
        card.style.transform = 'scale(1)';
      });
      
      const card = this.querySelector('.neckline-card');
      card.style.borderColor = '#6772e5';
      card.style.background = 'linear-gradient(135deg, #6772e510, #5469d410)';
      card.style.transform = 'scale(1.05)';
      
      this.querySelector('input[type="radio"]').checked = true;
    });
  });

  // Color selection interactions
  modal.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      modal.querySelectorAll('.color-card').forEach(card => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
      });
      
      const card = this.querySelector('.color-card');
      card.style.transform = 'scale(1.1)';
      card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
      
      this.querySelector('input[type="radio"]').checked = true;
    });
  });

  // Fabric, Train, and Size selection interactions
  ['fabric', 'train', 'size'].forEach(type => {
    modal.querySelectorAll(`.${type}-option`).forEach(option => {
      option.addEventListener('click', function() {
        modal.querySelectorAll(`.${type}-card`).forEach(card => {
          card.style.borderColor = card.style.borderColor === 'transparent' ? 'transparent' : '#e0e0e0';
          card.style.background = card.style.background.includes('gradient') ? card.style.background : 'white';
          card.style.transform = 'scale(1)';
        });
        
        const card = this.querySelector(`.${type}-card`);
        if (!card.style.background.includes('gradient')) {
          card.style.borderColor = '#17a2b8';
          card.style.background = 'linear-gradient(135deg, #17a2b810, #20c99720)';
        }
        card.style.transform = 'scale(1.02)';
        
        this.querySelector('input[type="radio"]').checked = true;
      });
    });
  });

  // Enhanced hover effects
  modal.querySelectorAll('.style-option, .neckline-option, .color-option, .fabric-option, .train-option, .size-option').forEach(option => {
    option.addEventListener('mouseenter', function() {
      if (!this.querySelector('input[type="radio"]').checked) {
        const card = this.querySelector('div[class$="-card"]');
        card.style.transform = 'scale(1.02)';
      }
    });
    
    option.addEventListener('mouseleave', function() {
      if (!this.querySelector('input[type="radio"]').checked) {
        const card = this.querySelector('div[class$="-card"]');
        card.style.transform = 'scale(1)';
      }
    });
  });

  // Button hover effects
  modal.querySelector('.submit-customization').addEventListener('mouseenter', function() {
    this.style.background = 'linear-gradient(135deg, #a08850 0%, #b89960 50%, #c9a96e 100%)';
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 15px 40px rgba(201, 169, 110, 0.4)';
  });
  
  modal.querySelector('.submit-customization').addEventListener('mouseleave', function() {
    this.style.background = 'linear-gradient(135deg, #c9a96e 0%, #d4b875 50%, #e6c388 100%)';
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 8px 30px rgba(201, 169, 110, 0.3)';
  });

  if (modal.querySelector('.stripe-checkout-custom')) {
    modal.querySelector('.stripe-checkout-custom').addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(135deg, #5469d4 0%, #4c63d2 100%)';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 12px 35px rgba(103, 114, 229, 0.4)';
    });
    
    modal.querySelector('.stripe-checkout-custom').addEventListener('mouseleave', function() {
      this.style.background = 'linear-gradient(135deg, #6772e5 0%, #5469d4 100%)';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 6px 25px rgba(103, 114, 229, 0.3)';
    });
  }

  modal.querySelector('.add-to-cart-custom').addEventListener('mouseenter', function() {
    this.style.background = '#f8f9fa';
    this.style.color = '#495057';
    this.style.borderColor = '#6c757d';
    this.style.transform = 'translateY(-1px)';
  });
  
  modal.querySelector('.add-to-cart-custom').addEventListener('mouseleave', function() {
    this.style.background = 'transparent';
    this.style.color = '#6c757d';
    this.style.borderColor = '#e0e0e0';
    this.style.transform = 'translateY(0)';
  });

  modal.querySelector('.close-modal').addEventListener('mouseenter', function() {
    this.style.background = 'rgba(255,255,255,0.3)';
    this.style.transform = 'scale(1.1)';
  });
  
  modal.querySelector('.close-modal').addEventListener('mouseleave', function() {
    this.style.background = 'rgba(255,255,255,0.2)';
    this.style.transform = 'scale(1)';
  });
}

function collectCustomizations(modal) {
  const form = modal.querySelector('#customization-form');
  const formData = new FormData(form);
  
  return {
    style: formData.get('style'),
    neckline: formData.get('neckline'),
    color: formData.get('color'),
    fabric: formData.get('fabric'),
    train: formData.get('train'),
    size: formData.get('size'),
    specialRequests: formData.get('specialRequests')
  };
}

function validateCustomizations(customizations) {
  const requiredFields = ['style', 'neckline', 'color', 'fabric', 'train', 'size'];
  const missingFields = requiredFields.filter(field => !customizations[field]);
  
  if (missingFields.length > 0) {
    const fieldNames = {
      style: 'Dress Style',
      neckline: 'Neckline',
      color: 'Color',
      fabric: 'Fabric',
      train: 'Train Style',
      size: 'Size'
    };
    
    const missingFieldNames = missingFields.map(field => fieldNames[field]).join(', ');
    
    showValidationMessage(`✨ Almost there! Please select: ${missingFieldNames}`);
    return false;
  }
  
  return true;
}

function sendCustomizationRequest(customizationData) {
  const subject = encodeURIComponent(`Custom Design Request - ${customizationData.requestId}`);
  const body = encodeURIComponent(`✨ NEW CUSTOM DESIGN REQUEST ✨

REQUEST ID: ${customizationData.requestId}

🎯 PRODUCT DETAILS:
Base Design: ${customizationData.product.name}
Base Price: ${customizationData.product.basePrice}

🎨 CUSTOMIZATION DETAILS:
• Style: ${customizationData.design.style}
• Neckline: ${customizationData.design.neckline}
• Color: ${customizationData.design.color}
• Fabric: ${customizationData.design.fabric}
• Train: ${customizationData.design.train}
• Size: ${customizationData.design.size}

💭 SPECIAL REQUESTS:
${customizationData.design.specialRequests || 'None specified'}

📅 SUBMITTED: ${new Date(customizationData.timestamp).toLocaleString()}

---
🎯 NEXT STEPS:
1. Contact customer within 24 hours for design consultation
2. Create detailed sketches based on specifications
3. Provide comprehensive quote and timeline
4. Schedule fitting appointments if needed

This is a high-priority custom design request requiring immediate attention.`);
  
  // Save to localStorage for tracking
  const customRequests = JSON.parse(localStorage.getItem('rozaBridalCustomRequests') || '[]');
  customRequests.push(customizationData);
  localStorage.setItem('rozaBridalCustomRequests', JSON.stringify(customRequests));
  
  // Open email client
  window.open(`mailto:aetophis@aetophis.com?subject=${subject}&body=${body}`, '_blank');
}

function showSuccessMessage(requestId) {
  const successModal = document.createElement('div');
  successModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  successModal.innerHTML = `
    <div style="background: white; border-radius: 20px; padding: 3rem; text-align: center; max-width: 500px; width: 100%; box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);">
      <div style="font-size: 4rem; margin-bottom: 1rem;">✨</div>
      <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; color: #1a1a1a; margin-bottom: 1rem; font-weight: 300;">Custom Design Request Submitted!</h2>
      <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">Request ID: <strong>${requestId}</strong></p>
      <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">Our design team will contact you within 24 hours to discuss your vision and provide a detailed quote.</p>
      <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="padding: 1rem 2rem; background: linear-gradient(135deg, #c9a96e 0%, #d4b875 100%); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
        Perfect! ✨
      </button>
    </div>
  `;
  
  document.body.appendChild(successModal);
  setTimeout(() => {
    successModal.style.opacity = '1';
  }, 10);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (successModal.parentNode) {
      successModal.style.opacity = '0';
      setTimeout(() => {
        if (successModal.parentNode) {
          successModal.remove();
        }
      }, 300);
    }
  }, 5000);
}

function showCartSuccessMessage(isCustom) {
  const message = isCustom 
    ? '✅ Custom dress added to cart!\n\nYour design preferences have been saved. We\'ll finalize all details during checkout.'
    : '✅ Dress added to cart!\n\nReady to checkout when you are.';
  
  alert(message);
}

function showValidationMessage(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
    z-index: 1002;
    font-weight: 500;
    max-width: 350px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.4s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 400);
  }, 3000);
}

// Responsive CSS for mobile
const responsiveStyles = document.createElement('style');
responsiveStyles.textContent = `
  @media (max-width: 768px) {
    .customization-modal {
      margin: 0.5rem !important;
      max-height: 98vh !important;
    }
    
    .customization-modal > div:first-child {
      padding: 2rem 1.5rem !important;
    }
    
    .customization-modal > div:last-child {
      padding: 2rem 1.5rem !important;
    }
    
    .customization-modal > div:last-child > div {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }
    
    .style-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .neckline-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .color-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .size-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    
    .customization-modal img {
      max-width: 280px !important;
    }
    
    .customization-modal h2 {
      font-size: 2rem !important;
    }
    
    .customization-modal h3 {
      font-size: 1.3rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .style-grid {
      grid-template-columns: 1fr !important;
    }
    
    .neckline-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .color-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
`;
document.head.appendChild(responsiveStyles);

// Make function globally available
window.openCustomizationModal = openCustomizationModal;
