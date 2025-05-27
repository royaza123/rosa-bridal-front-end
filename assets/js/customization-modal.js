// ENHANCED WEDDING DRESS CUSTOMIZATION MODAL WITH CART INTEGRATION AND AUTOMATIC DISCOUNTS
// Complete rewrite with all features - Place this file in your assets/js/ folder

// Global variable to store current product info
let currentProductInfo = {
  name: 'Wedding Dress',
  basePrice: 300,
  originalPrice: 380,
  discountPercent: 22,
  image: '',
  id: ''
};

// Inject CSS styles (including new cart-related styles and discount features)
const customizationCSS = `
<style>
/* Customization Modal Styles */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  overflow-y: auto;
}

.custom-modal.active {
  opacity: 1;
  visibility: visible;
}

.custom-modal-content {
  max-width: 1000px;
  margin: 2rem auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: translateY(50px);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.custom-modal.active .custom-modal-content {
  transform: translateY(0);
}

.custom-header {
  background: linear-gradient(135deg, #c9a96e 0%, #d4b875 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
}

.custom-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 400;
}

.custom-header p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.close-custom-modal {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-custom-modal:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.custom-body {
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
}

.custom-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s;
}

.custom-section:hover {
  border-color: #c9a96e;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(201, 169, 110, 0.1);
}

.custom-section h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 1.5rem;
}

.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.custom-option {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
}

.custom-option:hover {
  border-color: #c9a96e;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(201, 169, 110, 0.2);
}

.custom-option.selected {
  border-color: #c9a96e;
  background: linear-gradient(135deg, #c9a96e 0%, #d4b875 100%);
  color: white;
}

.option-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.option-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.option-price {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.color-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.color-option:hover {
  transform: scale(1.1);
  border-color: #c9a96e;
}

.color-option.selected {
  border-color: #c9a96e;
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.3);
}

.color-option::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.3s;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.color-option.selected::after {
  opacity: 1;
}

.size-section {
  margin-bottom: 2rem;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.size-option {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  font-weight: 600;
}

.size-option:hover {
  border-color: #c9a96e;
  transform: translateY(-2px);
}

.size-option.selected {
  border-color: #c9a96e;
  background: #c9a96e;
  color: white;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  background: #f8f9fa;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.quantity-btn:hover {
  background: #c9a96e;
  color: white;
}

.quantity-input {
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
}

.custom-footer {
  padding: 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.price-summary {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
}

.base-price {
  color: #999;
  text-decoration: line-through;
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.total-price {
  color: #c9a96e;
  font-size: 1.8rem;
  font-weight: 600;
}

.discount-badge {
  background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
  color: #2e7d32;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #c8e6c9;
}

.price-details {
  text-align: center;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.discount-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.price-note {
  color: #666;
  font-size: 0.8rem;
  font-style: italic;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary {
  background: #e0e0e0;
  color: #666;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

.btn-primary {
  background: linear-gradient(135deg, #c9a96e 0%, #d4b875 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(201, 169, 110, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(201, 169, 110, 0.4);
}

.btn-cart {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(40, 167, 69, 0.3);
}

.btn-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(40, 167, 69, 0.4);
}

.special-requests {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
}

.special-requests:focus {
  border-color: #c9a96e;
  outline: none;
}

/* Responsive */
@media (max-width: 768px) {
  .custom-modal-content {
    margin: 1rem;
  }
  
  .custom-header {
    padding: 1.5rem;
  }
  
  .custom-header h2 {
    font-size: 2rem;
  }
  
  .custom-body {
    padding: 1rem;
  }
  
  .custom-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .custom-footer {
    flex-direction: column;
    text-align: center;
  }
  
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .price-row {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .total-price {
    font-size: 1.5rem;
  }
  
  .base-price {
    font-size: 1rem;
  }
}
</style>
`;

// Inject HTML modal with enhanced discount display
const customizationHTML = `
<div id="customizationModal" class="custom-modal">
  <div class="custom-modal-content">
    <div class="custom-header">
      <button class="close-custom-modal" onclick="closeCustomizationModal()">&times;</button>
      <h2 id="modalTitle">Design Your Dream Dress</h2>
      <p>Let's create something magical together ✨</p>
    </div>

    <div class="custom-body">
      <div class="custom-section">
        <h3><span class="section-icon">👗</span> Dress Style</h3>
        <div class="custom-grid">
          <div class="custom-option" data-option="style" data-value="mermaid" data-price="0">
            <span class="option-emoji">🧜‍♀️</span>
            <div class="option-name">Mermaid</div>
            <div class="option-price">Base Price</div>
          </div>
          <div class="custom-option" data-option="style" data-value="ballgown" data-price="200">
            <span class="option-emoji">👸</span>
            <div class="option-name">Ball Gown</div>
            <div class="option-price">+$200</div>
          </div>
          <div class="custom-option" data-option="style" data-value="aline" data-price="150">
            <span class="option-emoji">📐</span>
            <div class="option-name">A-Line</div>
            <div class="option-price">+$150</div>
          </div>
          <div class="custom-option" data-option="style" data-value="sheath" data-price="100">
            <span class="option-emoji">📏</span>
            <div class="option-name">Sheath</div>
            <div class="option-price">+$100</div>
          </div>
        </div>
      </div>

      <div class="custom-section">
        <h3><span class="section-icon">💎</span> Neckline</h3>
        <div class="custom-grid">
          <div class="custom-option" data-option="neckline" data-value="vneck" data-price="0">
            <span class="option-emoji">V</span>
            <div class="option-name">V-Neck</div>
            <div class="option-price">Included</div>
          </div>
          <div class="custom-option" data-option="neckline" data-value="sweetheart" data-price="75">
            <span class="option-emoji">💕</span>
            <div class="option-name">Sweetheart</div>
            <div class="option-price">+$75</div>
          </div>
          <div class="custom-option" data-option="neckline" data-value="offShoulder" data-price="100">
            <span class="option-emoji">👫</span>
            <div class="option-name">Off-Shoulder</div>
            <div class="option-price">+$100</div>
          </div>
          <div class="custom-option" data-option="neckline" data-value="halter" data-price="85">
            <span class="option-emoji">🎀</span>
            <div class="option-name">Halter</div>
            <div class="option-price">+$85</div>
          </div>
        </div>
      </div>

      <div class="custom-section">
        <h3><span class="section-icon">🎨</span> Color</h3>
        <div class="custom-grid">
          <div class="color-option" data-option="color" data-value="ivory" data-price="0" style="background: #f8f6f0;" title="Ivory"></div>
          <div class="color-option" data-option="color" data-value="white" data-price="0" style="background: #ffffff;" title="White"></div>
          <div class="color-option" data-option="color" data-value="champagne" data-price="50" style="background: #f7e7ce;" title="Champagne (+$50)"></div>
          <div class="color-option" data-option="color" data-value="blush" data-price="75" style="background: #fde2e4;" title="Blush (+$75)"></div>
          <div class="color-option" data-option="color" data-value="dustyRose" data-price="100" style="background: #d4a5a5;" title="Dusty Rose (+$100)"></div>
          <div class="color-option" data-option="color" data-value="sage" data-price="125" style="background: #9caf88;" title="Sage (+$125)"></div>
        </div>
      </div>

      <div class="custom-section">
        <h3><span class="section-icon">✨</span> Fabric</h3>
        <div class="custom-grid">
          <div class="custom-option" data-option="fabric" data-value="satin" data-price="0">
            <span class="option-emoji">🌟</span>
            <div class="option-name">Satin</div>
            <div class="option-price">Base Price</div>
          </div>
          <div class="custom-option" data-option="fabric" data-value="lace" data-price="300">
            <span class="option-emoji">🕸️</span>
            <div class="option-name">Lace</div>
            <div class="option-price">+$300</div>
          </div>
          <div class="custom-option" data-option="fabric" data-value="tulle" data-price="150">
            <span class="option-emoji">☁️</span>
            <div class="option-name">Tulle</div>
            <div class="option-price">+$150</div>
          </div>
          <div class="custom-option" data-option="fabric" data-value="chiffon" data-price="200">
            <span class="option-emoji">🌊</span>
            <div class="option-name">Chiffon</div>
            <div class="option-price">+$200</div>
          </div>
        </div>
      </div>

      <div class="custom-section">
        <h3><span class="section-icon">👸</span> Train Length</h3>
        <div class="custom-grid">
          <div class="custom-option" data-option="train" data-value="none" data-price="-50">
            <span class="option-emoji">🚫</span>
            <div class="option-name">No Train</div>
            <div class="option-price">-$50</div>
          </div>
          <div class="custom-option" data-option="train" data-value="sweep" data-price="0">
            <span class="option-emoji">🧹</span>
            <div class="option-name">Sweep</div>
            <div class="option-price">Included</div>
          </div>
          <div class="custom-option" data-option="train" data-value="chapel" data-price="150">
            <span class="option-emoji">⛪</span>
            <div class="option-name">Chapel</div>
            <div class="option-price">+$150</div>
          </div>
          <div class="custom-option" data-option="train" data-value="cathedral" data-price="300">
            <span class="option-emoji">🏰</span>
            <div class="option-name">Cathedral</div>
            <div class="option-price">+$300</div>
          </div>
        </div>
      </div>

      <div class="custom-section size-section">
        <h3><span class="section-icon">📏</span> Size</h3>
        <div class="size-grid">
          <div class="size-option" data-option="size" data-value="XS">XS</div>
          <div class="size-option" data-option="size" data-value="S">S</div>
          <div class="size-option" data-option="size" data-value="M">M</div>
          <div class="size-option" data-option="size" data-value="L">L</div>
          <div class="size-option" data-option="size" data-value="XL">XL</div>
          <div class="size-option" data-option="size" data-value="XXL">XXL</div>
          <div class="size-option" data-option="size" data-value="Custom">Custom</div>
        </div>
      </div>

      <div class="custom-section quantity-section">
        <h3><span class="section-icon">🔢</span> Quantity</h3>
        <div class="quantity-selector">
          <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
          <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="10" readonly>
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
      </div>

      <div class="custom-section">
        <h3><span class="section-icon">💌</span> Special Requests</h3>
        <textarea class="special-requests" id="specialRequests" placeholder="Tell me your dreams! Any special details, modifications, or personal touches you'd love? I'm here to make magic happen! ✨"></textarea>
      </div>
    </div>

    <div class="custom-footer">
      <div class="price-summary">
        <div class="price-details">
          <div class="price-row">
            <span class="base-price" id="basePriceDisplay">$380.00</span>
            <span class="total-price" id="totalPrice">$298.43</span>
          </div>
          <div class="discount-row">
            <span class="discount-badge" id="discountBadge">22% OFF</span>
            <span style="color: #666; font-size: 0.8rem; font-style: italic;">Limited time</span>
          </div>
          <p class="price-note">✨ Custom design & expert tailoring included</p>
        </div>
      </div>
      <div class="action-buttons">
        <button class="btn btn-secondary" onclick="closeCustomizationModal()">Maybe Later</button>
        <button class="btn btn-cart" onclick="addToCart()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
        <button class="btn btn-primary" onclick="submitCustomization()">Get Quote First</button>
      </div>
    </div>
  </div>
</div>
`;

// Modal functionality with selected options
let selectedOptions = {
  style: 'mermaid',
  neckline: 'vneck',
  color: 'ivory',
  fabric: 'satin',
  train: 'sweep',
  size: '',
  quantity: 1
};

// SMART discount calculation - Always 22% discount with proper formula
function calculateSmartDiscount(currentPrice, productId) {
  // FIXED: Use proper reverse calculation for original price
  // Formula: Original Price = Current Price ÷ (1 - Discount%/100)
  const discountPercent = 22;
  const originalPrice = Math.round((currentPrice / (1 - discountPercent / 100)) * 100) / 100;
  
  console.log(`Price calculation for ${productId}:`, {
    currentPrice: currentPrice,
    discountPercent: discountPercent,
    calculatedOriginalPrice: originalPrice,
    formula: `${currentPrice} ÷ (1 - ${discountPercent}/100) = ${currentPrice} ÷ 0.78 = ${originalPrice}`
  });
  
  return {
    originalPrice: originalPrice,
    discountedPrice: currentPrice,
    discountPercent: discountPercent
  };
}

// SMART function that automatically detects product info
function openCustomizationModal(dressName = null, basePrice = null, productImage = '', productId = '') {
  // AUTO-DETECT product info if not provided
  if (!dressName || !basePrice) {
    const autoDetected = autoDetectProductInfo();
    dressName = dressName || autoDetected.name;
    basePrice = basePrice || autoDetected.price;
    productImage = productImage || autoDetected.image;
    productId = productId || autoDetected.id;
  }
  
  // Calculate smart discount for this product
  const discountInfo = calculateSmartDiscount(basePrice, productId);
  
  // Store current product info with discount data
  currentProductInfo.name = dressName;
  currentProductInfo.basePrice = basePrice;
  currentProductInfo.originalPrice = discountInfo.originalPrice;
  currentProductInfo.discountPercent = discountInfo.discountPercent;
  currentProductInfo.image = productImage || document.querySelector('.gallery-image.active')?.src || '';
  currentProductInfo.id = productId || getCurrentProductId();
  
  console.log('Opening customization with discount:', currentProductInfo);
  
  const modal = document.getElementById('customizationModal');
  if (!modal) {
    console.error('Customization modal not found. Initializing...');
    initializeCustomizationModal();
    return;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Update modal title
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = `Design Your ${dressName}`;
  
  initializeDefaults();
  updatePrice(); // This will now calculate the discount automatically
}

// AUTO-DETECTION function - reads product info from page
function autoDetectProductInfo() {
  // Method 1: Try to get from global PRODUCTS database
  const currentId = getCurrentProductId();
  if (window.PRODUCTS && window.PRODUCTS[currentId]) {
    const product = window.PRODUCTS[currentId];
    return {
      name: product.name,
      price: product.price,
      image: `${getSiteBaseUrl()}/assets/images/${product.image}`,
      id: product.id
    };
  }
  
  // Method 2: Try to read from page elements
  const titleElement = document.querySelector('h1') || document.querySelector('.product-title');
  const priceElement = document.querySelector('#product-price') || 
                      document.querySelector('.current-price') || 
                      document.querySelector('[id*="price"]');
  const imageElement = document.querySelector('.gallery-image.active') || 
                      document.querySelector('.product-image');
  
  // Extract price from text (handles $298, $298.43, etc.)
  let price = 300; // Default fallback
  if (priceElement) {
    const priceText = priceElement.textContent || priceElement.innerText;
    const priceMatch = priceText.match(/\$(\d+(?:\.\d+)?)/);
    if (priceMatch) {
      price = parseFloat(priceMatch[1]);
    }
  }
  
  return {
    name: titleElement ? titleElement.textContent.trim() : 'Wedding Dress',
    price: price,
    image: imageElement ? imageElement.src : '',
    id: currentId
  };
}

// Helper function to get current product ID from URL
function getCurrentProductId() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop().replace('.html', '');
  return filename || 'unknown';
}

// Helper function to get site base URL
function getSiteBaseUrl() {
  return document.querySelector('meta[name="base-url"]')?.content || '';
}

// SMART addToCart function with automatic product detection
function addToCart() {
  // Validate that size is selected
  if (!selectedOptions.size) {
    alert('Please select a size before adding to cart!');
    return;
  }
  
  // Create customization summary
  const customizations = {
    style: selectedOptions.style,
    neckline: selectedOptions.neckline,
    color: selectedOptions.color,
    fabric: selectedOptions.fabric,
    train: selectedOptions.train,
    specialRequests: document.getElementById('specialRequests')?.value || ''
  };
  
  // Calculate final price with customizations
  let unitPrice = currentProductInfo.basePrice;
  document.querySelectorAll('.custom-option.selected, .color-option.selected').forEach(option => {
    unitPrice += parseInt(option.dataset.price) || 0;
  });
  
  // Create product object for cart
  const customProduct = {
    id: `${currentProductInfo.id}_custom_${Date.now()}`,
    name: `${currentProductInfo.name} (Custom)`,
    price: unitPrice,
    quantity: selectedOptions.quantity,
    size: selectedOptions.size,
    image: currentProductInfo.image,
    customizations: customizations,
    isCustom: true
  };
  
  console.log('Adding custom product to cart:', customProduct);
  
  // Add to cart using the main cart system
  if (typeof window.cart !== 'undefined' && window.cart.addItem) {
    window.cart.addItem(customProduct);
    closeCustomizationModal();
  } else {
    // Fallback - try to add to cart after a short delay (for loading)
    setTimeout(() => {
      if (typeof window.cart !== 'undefined' && window.cart.addItem) {
        window.cart.addItem(customProduct);
        closeCustomizationModal();
      } else {
        console.log('Cart system not available, custom product ready:', customProduct);
        alert('🎉 Your custom dress design is ready! Please refresh the page and try again if the cart doesn\'t update.');
        closeCustomizationModal();
      }
    }, 500);
  }
}

// SMART email quote function with dynamic product info
function submitCustomization() {
  const specialRequests = document.getElementById('specialRequests')?.value || 'No special requests';
  const totalPrice = document.getElementById('totalPrice')?.textContent || 'Not calculated';
  const originalPrice = document.getElementById('basePriceDisplay')?.textContent || '';
  const discountBadge = document.getElementById('discountBadge')?.textContent || '';
  
  const subject = encodeURIComponent(`Custom Wedding Dress Quote - ${currentProductInfo.name}`);
  const body = encodeURIComponent(`Hello Roza Bridal! 💕

I would like a quote for a custom wedding dress! Here are my customization details:

DRESS: ${currentProductInfo.name}
👗 DRESS STYLE: ${selectedOptions.style}
💎 NECKLINE: ${selectedOptions.neckline}  
🎨 COLOR: ${selectedOptions.color}
✨ FABRIC: ${selectedOptions.fabric}
👸 TRAIN: ${selectedOptions.train}
📏 SIZE: ${selectedOptions.size || 'Not selected'}
🔢 QUANTITY: ${selectedOptions.quantity}

💌 SPECIAL REQUESTS:
${specialRequests}

💰 PRICING ESTIMATE:
Original Price: ${originalPrice}
Your Price: ${totalPrice} (${discountBadge})

Please provide me with:
- Final pricing confirmation
- Timeline for completion
- Payment options
- Any additional details

I'm excited to work with you to create my dream dress! ✨

Looking forward to hearing from you!

Best regards,
[Your Future Bride] 💍`);
  
  window.open(`mailto:aetophis@aetophis.com?subject=${subject}&body=${body}`, '_blank');
  closeCustomizationModal();
  
  setTimeout(() => {
    alert('📧 Your quote request has been sent! We\'ll get back to you with pricing and timeline details soon! ✨');
  }, 500);
}

// Enhanced price calculation with discounts
function updatePrice() {
  let unitPrice = currentProductInfo.basePrice;
  
  // Add customization costs
  document.querySelectorAll('.custom-option.selected, .color-option.selected').forEach(option => {
    unitPrice += parseInt(option.dataset.price) || 0;
  });
  
  const totalPrice = unitPrice * (selectedOptions.quantity || 1);
  
  // Calculate what the "original" price would be (before discount)
  const originalTotalPrice = Math.round(totalPrice / (1 - currentProductInfo.discountPercent / 100));
  
  // Update price display elements
  const totalPriceElement = document.getElementById('totalPrice');
  const basePriceElement = document.getElementById('basePriceDisplay');
  const discountBadgeElement = document.getElementById('discountBadge');
  
  if (totalPriceElement) {
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
  }
  
  if (basePriceElement) {
    basePriceElement.textContent = `${originalTotalPrice.toFixed(2)}`;
  }
  
  if (discountBadgeElement) {
    discountBadgeElement.textContent = `${currentProductInfo.discountPercent}% OFF`;
  }
}

// Initialize defaults
function initializeDefaults() {
  // Clear all selections first
  document.querySelectorAll('.custom-option, .color-option, .size-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Set defaults
  document.querySelector('[data-option="style"][data-value="mermaid"]')?.classList.add('selected');
  document.querySelector('[data-option="neckline"][data-value="vneck"]')?.classList.add('selected');
  document.querySelector('[data-option="color"][data-value="ivory"]')?.classList.add('selected');
  document.querySelector('[data-option="fabric"][data-value="satin"]')?.classList.add('selected');
  document.querySelector('[data-option="train"][data-value="sweep"]')?.classList.add('selected');
  
  // Reset quantity
  const quantityInput = document.getElementById('quantity');
  if (quantityInput) {
    quantityInput.value = 1;
    selectedOptions.quantity = 1;
  }
  
  // Reset selected options
  selectedOptions = {
    style: 'mermaid',
    neckline: 'vneck',
    color: 'ivory',
    fabric: 'satin',
    train: 'sweep',
    size: '',
    quantity: 1
  };
}

// Quantity change function
function changeQuantity(change) {
  const quantityInput = document.getElementById('quantity');
  if (!quantityInput) return;
  
  let newQuantity = parseInt(quantityInput.value) + change;
  
  if (newQuantity < 1) newQuantity = 1;
  if (newQuantity > 10) newQuantity = 10;
  
  quantityInput.value = newQuantity;
  selectedOptions.quantity = newQuantity;
  updatePrice();
}

// Close modal function
function closeCustomizationModal() {
  const modal = document.getElementById('customizationModal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = 'auto';
}

// Enhanced event handling for options
function handleOptionSelection(target) {
  const option = target.closest('.custom-option') || target.closest('.color-option') || target.closest('.size-option');
  if (!option) return;
  
  const optionType = option.dataset.option;
  const optionValue = option.dataset.value;
  
  // Clear previous selections for this option type
  document.querySelectorAll(`[data-option="${optionType}"]`).forEach(el => {
    el.classList.remove('selected');
  });
  
  // Select current option
  option.classList.add('selected');
  selectedOptions[optionType] = optionValue;
  updatePrice();
}

// UNIVERSAL INITIALIZATION - Works on any page
function initializeCustomizationModal() {
  // Check if modal already exists
  if (document.getElementById('customizationModal')) {
    return;
  }
  
  // Inject CSS
  document.head.insertAdjacentHTML('beforeend', customizationCSS);
  
  // Inject HTML
  document.body.insertAdjacentHTML('beforeend', customizationHTML);
  
  // Add event listeners
  document.addEventListener('click', function(e) {
    // Handle option selections
    if (e.target.closest('.custom-option') || e.target.closest('.color-option') || e.target.closest('.size-option')) {
      handleOptionSelection(e.target);
    }
  });
  
  // Close modal when clicking outside
  const modal = document.getElementById('customizationModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeCustomizationModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeCustomizationModal();
    }
  });
  
  // Add quantity input event listener
  const quantityInput = document.getElementById('quantity');
  if (quantityInput) {
    quantityInput.addEventListener('input', function() {
      let newQuantity = parseInt(this.value) || 1;
      if (newQuantity < 1) newQuantity = 1;
      if (newQuantity > 10) newQuantity = 10;
      this.value = newQuantity;
      selectedOptions.quantity = newQuantity;
      updatePrice();
    });
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCustomizationModal);
} else {
  initializeCustomizationModal();
}

// Make functions globally available
window.openCustomizationModal = openCustomizationModal;
window.closeCustomizationModal = closeCustomizationModal;
window.addToCart = addToCart;
window.submitCustomization = submitCustomization;
window.changeQuantity = changeQuantity;

console.log('✅ Enhanced Customization modal with discount system loaded successfully!');
