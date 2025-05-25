// WEDDING DRESS CUSTOMIZATION MODAL - customization-modal.js
// Place this file in your assets/js/ folder

// Inject CSS styles
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
  color: #666;
  text-decoration: line-through;
  margin-right: 0.5rem;
}

.total-price {
  color: #c9a96e;
  font-size: 1.5rem;
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
}
</style>
`;

// Inject HTML modal
const customizationHTML = `
<div id="customizationModal" class="custom-modal">
  <div class="custom-modal-content">
    <div class="custom-header">
      <button class="close-custom-modal" onclick="closeCustomizationModal()">&times;</button>
      <h2>Design Your Dream Dress</h2>
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
          <div class="color-option" data-option="color" data-value="ivory" data-price="0" style="background: #f8f6f0;"></div>
          <div class="color-option" data-option="color" data-value="white" data-price="0" style="background: #ffffff;"></div>
          <div class="color-option" data-option="color" data-value="champagne" data-price="50" style="background: #f7e7ce;"></div>
          <div class="color-option" data-option="color" data-value="blush" data-price="75" style="background: #fde2e4;"></div>
          <div class="color-option" data-option="color" data-value="dustyRose" data-price="100" style="background: #d4a5a5;"></div>
          <div class="color-option" data-option="color" data-value="sage" data-price="125" style="background: #9caf88;"></div>
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

      <div class="custom-section">
        <h3><span class="section-icon">💌</span> Special Requests</h3>
        <textarea class="special-requests" placeholder="Tell me your dreams! Any special details, modifications, or personal touches you'd love? I'm here to make magic happen! ✨"></textarea>
      </div>
    </div>

    <div class="custom-footer">
      <div class="price-summary">
        <span class="base-price">$1,200</span>
        <span class="total-price" id="totalPrice">$1,200</span>
      </div>
      <div class="action-buttons">
        <button class="btn btn-secondary" onclick="closeCustomizationModal()">Maybe Later</button>
        <button class="btn btn-primary" onclick="submitCustomization()">Let's Create This! 🎉</button>
      </div>
    </div>
  </div>
</div>
`;

// Modal functionality
let selectedOptions = {
  style: 'mermaid',
  neckline: 'vneck',
  color: 'ivory',
  fabric: 'satin',
  train: 'sweep'
};
let basePrice = 1200;

function openCustomizationModal(dressName = 'Wedding Dress') {
  const modal = document.getElementById('customizationModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  const header = modal.querySelector('.custom-header h2');
  header.textContent = `Customize Your ${dressName}`;
  
  initializeDefaults();
  updatePrice();
}

function closeCustomizationModal() {
  const modal = document.getElementById('customizationModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function initializeDefaults() {
  document.querySelector('[data-option="style"][data-value="mermaid"]').classList.add('selected');
  document.querySelector('[data-option="neckline"][data-value="vneck"]').classList.add('selected');
  document.querySelector('[data-option="color"][data-value="ivory"]').classList.add('selected');
  document.querySelector('[data-option="fabric"][data-value="satin"]').classList.add('selected');
  document.querySelector('[data-option="train"][data-value="sweep"]').classList.add('selected');
}

function updatePrice() {
  let totalPrice = basePrice;
  
  document.querySelectorAll('.custom-option.selected, .color-option.selected').forEach(option => {
    totalPrice += parseInt(option.dataset.price) || 0;
  });
  
  document.getElementById('totalPrice').textContent = `$${totalPrice.toLocaleString()}`;
}

function submitCustomization() {
  const specialRequests = document.querySelector('.special-requests').value;
  const totalPrice = document.getElementById('totalPrice').textContent;
  
  const subject = encodeURIComponent('Custom Wedding Dress Order - Let\'s Create Magic!');
  const body = encodeURIComponent(`Hello Roza Bridal! 💕

I'm ready to create my dream dress! Here are my customization details:

👗 DRESS STYLE: ${selectedOptions.style}
💎 NECKLINE: ${selectedOptions.neckline}  
🎨 COLOR: ${selectedOptions.color}
✨ FABRIC: ${selectedOptions.fabric}
👸 TRAIN: ${selectedOptions.train}

💌 SPECIAL REQUESTS:
${specialRequests || 'No special requests'}

💰 TOTAL PRICE: ${totalPrice}

I'm so excited to work with you to bring this vision to life! When can we start the magic? ✨

Looking forward to hearing from you!

Best regards,
[Your Future Bride] 💍`);
  
  window.open(`mailto:aetophis@aetophis.com?subject=${subject}&body=${body}`, '_blank');
  closeCustomizationModal();
  
  setTimeout(() => {
    alert('🎉 Amazing! Your customization request has been sent! We\'ll be in touch soon to make your dream dress a reality! ✨');
  }, 500);
}

// Initialize the modal when DOM is ready
function initializeCustomizationModal() {
  // Inject CSS
  document.head.insertAdjacentHTML('beforeend', customizationCSS);
  
  // Inject HTML
  document.body.insertAdjacentHTML('beforeend', customizationHTML);
  
  // Add event listeners
  document.addEventListener('click', function(e) {
    if (e.target.closest('.custom-option') || e.target.closest('.color-option')) {
      const option = e.target.closest('.custom-option') || e.target.closest('.color-option');
      const optionType = option.dataset.option;
      const optionValue = option.dataset.value;
      
      document.querySelectorAll(`[data-option="${optionType}"]`).forEach(el => {
        el.classList.remove('selected');
      });
      
      option.classList.add('selected');
      selectedOptions[optionType] = optionValue;
      updatePrice();
    }
  });
  
  document.getElementById('customizationModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeCustomizationModal();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCustomizationModal();
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCustomizationModal);
} else {
  initializeCustomizationModal();
}
