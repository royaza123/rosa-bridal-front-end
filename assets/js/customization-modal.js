// ENHANCED WEDDING DRESS CUSTOMIZATION MODAL - ULTRA DEEP CUSTOMIZATION
// Maintains all existing functionality while adding comprehensive options

// STRIPE PAYMENT LINKS CONFIGURATION (unchanged)
const STRIPE_PAYMENT_LINKS = {
  'Boho Wedding Dress Elegant': 'https://buy.stripe.com/4gM3cv3TA7sRc093EN1B600',
  'Boho Beach Wedding Dress': 'https://buy.stripe.com/7sY6oHdua7sR6FP0sB1B601',
  'Custom Lace Mermaid Wedding Dress': 'https://buy.stripe.com/5kQ00jcq614t4xH2AJ1B602',
  'Elegant Ivory Satin Bridal Gown': 'https://buy.stripe.com/3cI4gz2Pw8wV7JT6QZ1B604',
  'Floral Bridal Dress': 'https://buy.stripe.com/cNi3cv9dUfZnggpcbj1B605',
  'Gorgeous Ivory Mermaid Wedding Gown': 'https://buy.stripe.com/7sYaEX75MdRf0hrgrz1B606',
  'Minimalist Off Shoulder Satin Wedding Dress': 'https://buy.stripe.com/28E9ATgGm9AZ7JTdfn1B607',
  'Sexy Sequin Mermaid Wedding Dress': 'https://buy.stripe.com/7sY00jeye28xe8h7V31B60a',
  'Sexy Fishtail Bridal Gown': 'https://buy.stripe.com/eVqdR9bm2fZn4xHcbj1B609',
  'Modest Satin Wedding Dress': 'https://buy.stripe.com/4gM3cvcq6cNbc09dfn1B608'
};

// Global variable to store current product info (unchanged)
let currentProductInfo = {
  name: 'Wedding Dress',
  basePrice: 300,
  originalPrice: 380,
  discountPercent: 22,
  image: '',
  id: ''
};

// Enhanced customization options with pricing
const CUSTOMIZATION_OPTIONS = {
  silhouette: {
    'aline': { name: 'A-Line', price: 0, emoji: '📐', desc: 'Classic flattering shape' },
    'ballgown': { name: 'Ball Gown', price: 200, emoji: '👸', desc: 'Princess-style voluminous skirt' },
    'mermaid': { name: 'Mermaid', price: 150, emoji: '🧜‍♀️', desc: 'Form-fitting with flared bottom' },
    'trumpet': { name: 'Trumpet', price: 125, emoji: '🎺', desc: 'Similar to mermaid, flares at knee' },
    'sheath': { name: 'Sheath', price: 100, emoji: '📏', desc: 'Straight, column-like silhouette' },
    'empire': { name: 'Empire', price: 75, emoji: '🏛️', desc: 'High waistline under bust' },
    'tealength': { name: 'Tea-Length', price: -50, emoji: '☕', desc: 'Mid-calf length, vintage style' }
  },
  
  neckline: {
    'sweetheart': { name: 'Sweetheart', price: 75, emoji: '💕', desc: 'Heart-shaped, romantic' },
    'vneck': { name: 'V-Neck', price: 0, emoji: 'V', desc: 'Classic V-shaped neckline' },
    'highneck': { name: 'High Neck', price: 100, emoji: '⬆️', desc: 'Covers collarbone, elegant' },
    'halter': { name: 'Halter', price: 85, emoji: '🎀', desc: 'Ties around neck' },
    'scoop': { name: 'Scoop', price: 50, emoji: '🥄', desc: 'Round, modest neckline' },
    'offshoulder': { name: 'Off-Shoulder', price: 100, emoji: '👫', desc: 'Exposes shoulders gracefully' },
    'oneshoulder': { name: 'One-Shoulder', price: 125, emoji: '🔺', desc: 'Asymmetrical, modern' }
  },
  
  sleeves: {
    'sleeveless': { name: 'Sleeveless', price: 0, emoji: '🚫', desc: 'Clean, timeless look' },
    'cap': { name: 'Cap Sleeve', price: 50, emoji: '🧢', desc: 'Short, delicate sleeves' },
    'short': { name: 'Short Sleeve', price: 75, emoji: '👕', desc: 'Classic short sleeves' },
    'long': { name: 'Long Sleeve', price: 150, emoji: '👔', desc: 'Full arm coverage' },
    'illusion': { name: 'Illusion Sleeve', price: 200, emoji: '✨', desc: 'Sheer, ethereal effect' },
    'bell': { name: 'Bell Sleeve', price: 175, emoji: '🔔', desc: 'Dramatic, flowing sleeves' }
  },
  
  back: {
    'zipper': { name: 'Zipper', price: 0, emoji: '🤐', desc: 'Classic, secure closure' },
    'openback': { name: 'Open Back', price: 100, emoji: '💫', desc: 'Dramatic, show-stopping' },
    'keyhole': { name: 'Keyhole', price: 75, emoji: '🔑', desc: 'Small opening, subtle detail' },
    'vback': { name: 'V-Back', price: 85, emoji: '📐', desc: 'V-shaped back opening' },
    'laceup': { name: 'Lace-Up', price: 125, emoji: '🎀', desc: 'Adjustable corset-style' },
    'buttons': { name: 'Button-Up', price: 150, emoji: '🔘', desc: 'Vintage button detail' },
    'illusion': { name: 'Illusion Back', price: 175, emoji: '✨', desc: 'Sheer back with details' }
  },
  
  train: {
    'none': { name: 'No Train', price: -50, emoji: '🚫', desc: 'Clean hem, easy movement' },
    'sweep': { name: 'Sweep Train', price: 0, emoji: '🧹', desc: 'Just touches the floor' },
    'chapel': { name: 'Chapel Train', price: 150, emoji: '⛪', desc: '3-4 feet behind dress' },
    'cathedral': { name: 'Cathedral Train', price: 300, emoji: '🏰', desc: '6-7 feet, very dramatic' },
    'royal': { name: 'Royal Train', price: 500, emoji: '👑', desc: '10+ feet, ultimate drama' }
  },
  
  material: {
    'lace': { name: 'Lace', price: 300, emoji: '🕸️', desc: 'Delicate, romantic texture' },
    'tulle': { name: 'Tulle', price: 150, emoji: '☁️', desc: 'Soft, dreamy layers' },
    'satin': { name: 'Satin', price: 0, emoji: '🌟', desc: 'Smooth, lustrous finish' },
    'chiffon': { name: 'Chiffon', price: 200, emoji: '🌊', desc: 'Flowing, ethereal fabric' },
    'organza': { name: 'Organza', price: 225, emoji: '💎', desc: 'Crisp, structured elegance' },
    'mikado': { name: 'Mikado', price: 275, emoji: '🎌', desc: 'Luxurious silk blend' },
    'crepe': { name: 'Crepe', price: 250, emoji: '🌙', desc: 'Smooth, sophisticated drape' }
  },
  
  waistline: {
    'natural': { name: 'Natural', price: 0, emoji: '➡️', desc: 'At natural waist' },
    'empire': { name: 'Empire', price: 75, emoji: '🏛️', desc: 'High under bust' },
    'drop': { name: 'Drop Waist', price: 100, emoji: '⬇️', desc: 'Lower on hips' },
    'basque': { name: 'Basque', price: 125, emoji: '🔺', desc: 'Pointed waistline' },
    'none': { name: 'No Defined', price: 50, emoji: '〰️', desc: 'Flowing, no waist' }
  },
  
  embellishments: {
    'none': { name: 'None', price: 0, emoji: '✨', desc: 'Clean, minimal design' },
    'beading': { name: 'Beading', price: 400, emoji: '💎', desc: 'Hand-sewn beadwork' },
    'applique': { name: 'Lace Appliqué', price: 350, emoji: '🌸', desc: 'Layered lace details' },
    'embroidery': { name: 'Embroidery', price: 300, emoji: '🧵', desc: 'Intricate stitched patterns' },
    'sequins': { name: 'Sequins', price: 450, emoji: '✨', desc: 'Sparkling sequin details' },
    'pearls': { name: 'Pearls', price: 500, emoji: '🦪', desc: 'Elegant pearl accents' },
    'floral': { name: 'Floral Details', price: 275, emoji: '🌺', desc: '3D floral elements' }
  },
  
  bust: {
    'builtin': { name: 'Built-in Bra', price: 75, emoji: '👙', desc: 'Structured support' },
    'none': { name: 'No Bra', price: 0, emoji: '🚫', desc: 'Natural, unstructured' },
    'padding': { name: 'Custom Padding', price: 100, emoji: '➕', desc: 'Enhanced shape support' }
  },
  
  layers: {
    'single': { name: 'Single Layer', price: 0, emoji: '1️⃣', desc: 'Simple, elegant' },
    'double': { name: 'Double Layer', price: 100, emoji: '2️⃣', desc: 'Added volume' },
    'multi': { name: 'Multi-Layered', price: 200, emoji: '3️⃣', desc: 'Full, dramatic skirt' },
    'crinoline': { name: 'With Crinoline', price: 150, emoji: '🎪', desc: 'Structured underskirt' }
  }
};

// Extended color palette with advanced options
const COLOR_OPTIONS = {
  'ivory': { name: 'Ivory', price: 0, hex: '#f8f6f0', desc: 'Classic bridal' },
  'white': { name: 'White', price: 0, hex: '#ffffff', desc: 'Pure traditional' },
  'champagne': { name: 'Champagne', price: 50, hex: '#f7e7ce', desc: 'Warm golden tone' },
  'blush': { name: 'Blush', price: 75, hex: '#fde2e4', desc: 'Soft romantic pink' },
  'nude': { name: 'Nude', price: 100, hex: '#e3c9a7', desc: 'Natural skin tone' },
  'dustyrose': { name: 'Dusty Rose', price: 125, hex: '#d4a5a5', desc: 'Muted pink elegance' },
  'sage': { name: 'Sage Green', price: 150, hex: '#9caf88', desc: 'Natural earth tone' },
  'lavender': { name: 'Lavender', price: 150, hex: '#c8a8d8', desc: 'Soft purple hue' },
  'dustyblue': { name: 'Dusty Blue', price: 150, hex: '#a8c5d1', desc: 'Muted blue elegance' },
  'custom': { name: 'Custom Color', price: 200, hex: '#gradient', desc: 'Your perfect shade' }
};

// Modal state tracking (maintains existing functionality)
let selectedOptions = {
  silhouette: 'aline',
  neckline: 'vneck',
  sleeves: 'sleeveless',
  back: 'zipper',
  train: 'sweep',
  material: 'satin',
  color: 'ivory',
  waistline: 'natural',
  embellishments: 'none',
  bust: 'builtin',
  layers: 'single',
  size: '',
  quantity: 1
};

// Inject enhanced CSS styles
const customizationCSS = `
<style>
/* Enhanced Customization Modal Styles */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-y: auto;
  padding: 1rem;
}

.custom-modal.active {
  opacity: 1;
  visibility: visible;
}

.custom-modal-content {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  transform: translateY(60px) scale(0.95);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  position: relative;
}

.custom-modal.active .custom-modal-content {
  transform: translateY(0) scale(1);
}

.custom-header {
  background: linear-gradient(135deg, #8b7355 0%, #a08968 20%, #c9a96e 100%);
  color: white;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.custom-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="25" cy="25" r="0.5" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="0.3" fill="white" opacity="0.05"/><circle cx="50" cy="10" r="0.4" fill="white" opacity="0.08"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.custom-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 0.75rem 0;
  font-weight: 300;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 1;
}

.custom-header p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  opacity: 0.95;
  margin: 0;
  position: relative;
  z-index: 1;
}

.close-custom-modal {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.close-custom-modal:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05) rotate(90deg);
}

.custom-body {
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
  background: linear-gradient(180deg, #fefefe 0%, #f9f7f4 100%);
}

/* Progress Bar */
.customization-progress {
  background: rgba(139, 115, 85, 0.1);
  height: 6px;
  border-radius: 3px;
  margin: 1.5rem 2rem;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8b7355, #c9a96e);
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 10px rgba(139, 115, 85, 0.3);
}

/* Enhanced Sections */
.custom-section {
  margin-bottom: 2.5rem;
  padding: 2rem;
  border: 2px solid transparent;
  border-radius: 16px;
  background: linear-gradient(135deg, white 0%, rgba(249, 247, 244, 0.5) 100%);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.custom-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #8b7355, #c9a96e);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.custom-section:hover::before {
  transform: scaleY(1);
}

.custom-section:hover {
  border-color: rgba(139, 115, 85, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 35px rgba(139, 115, 85, 0.15);
}

.custom-section h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 400;
  position: relative;
}

.section-icon {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  background: linear-gradient(135deg, #8b7355, #c9a96e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.custom-option {
  padding: 1.25rem;
  border: 2px solid #e8e6e3;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: white;
  position: relative;
  overflow: hidden;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(139, 115, 85, 0.1), transparent);
  transition: left 0.6s ease;
}

.custom-option:hover::before {
  left: 100%;
}

.custom-option:hover {
  border-color: #c9a96e;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(201, 169, 110, 0.2);
}

.custom-option.selected {
  border-color: #8b7355;
  background: linear-gradient(135deg, #8b7355 0%, #a08968 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 115, 85, 0.3);
}

.option-emoji {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  display: block;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.option-name {
  font-weight: 600;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.option-price {
  font-size: clamp(0.7rem, 1.3vw, 0.8rem);
  opacity: 0.7;
  font-weight: 500;
}

.option-desc {
  font-size: clamp(0.65rem, 1.1vw, 0.75rem);
  opacity: 0.8;
  font-style: italic;
  margin-top: 0.25rem;
  line-height: 1.3;
}

/* Enhanced Color Options */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.color-option {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #e8e6e3;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.color-option:hover {
  transform: scale(1.1);
  border-color: #c9a96e;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.color-option.selected {
  border-color: #8b7355;
  box-shadow: 0 0 0 4px rgba(139, 115, 85, 0.3);
  transform: scale(1.05);
}

.color-option::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  filter: drop-shadow(0 0 3px rgba(0,0,0,0.8));
}

.color-option.selected::after {
  opacity: 1;
}

.color-info {
  text-align: center;
  margin-top: 0.75rem;
}

.color-name {
  font-weight: 600;
  font-size: 0.8rem;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.color-price {
  font-size: 0.7rem;
  color: #8b7355;
  font-weight: 500;
}

.color-desc {
  font-size: 0.65rem;
  color: #666;
  font-style: italic;
  margin-top: 0.25rem;
}

/* Special gradient for custom color */
.color-option[data-value="custom"] {
  background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff, #9c88ff, #ff6b6b);
  background-size: 300% 300%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Size Section */
.size-section {
  margin-bottom: 2.5rem;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.size-option {
  padding: 1rem;
  border: 2px solid #e8e6e3;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: white;
  font-weight: 600;
  font-size: 0.9rem;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-option:hover {
  border-color: #c9a96e;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(201, 169, 110, 0.2);
}

.size-option.selected {
  border-color: #8b7355;
  background: linear-gradient(135deg, #8b7355, #a08968);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(139, 115, 85, 0.3);
}

/* Enhanced Quantity Section */
.quantity-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f4f7 100%);
  border-radius: 12px;
  border-left: 4px solid #8b7355;
}

.quantity-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: #1a1a1a;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #e8e6e3;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.quantity-btn {
  width: 45px;
  height: 45px;
  background: #f8f9fa;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #8b7355;
}

.quantity-btn:hover {
  background: #8b7355;
  color: white;
}

.quantity-input {
  width: 70px;
  height: 45px;
  border: none;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  background: white;
}

/* Special Requests Section */
.special-requests-section {
  margin-bottom: 2.5rem;
}

.special-requests {
  width: 100%;
  padding: 1.5rem;
  border: 2px solid #e8e6e3;
  border-radius: 12px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  background: white;
  line-height: 1.6;
}

.special-requests:focus {
  border-color: #8b7355;
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
}

.special-requests::placeholder {
  color: #999;
  font-style: italic;
}

/* Enhanced Footer */
.custom-footer {
  padding: 2.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f4f7 100%);
  border-top: 1px solid rgba(139, 115, 85, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.price-summary {
  flex: 1;
  min-width: 300px;
}

.price-details {
  text-align: left;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.base-price {
  color: #999;
  text-decoration: line-through;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 500;
}

.total-price {
  color: #8b7355;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 600;
  font-family: 'Cormorant Garamond', serif;
}

.discount-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.discount-badge {
  background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
  color: #2e7d32;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #c8e6c9;
  box-shadow: 0 2px 8px rgba(46, 125, 50, 0.1);
}

.price-note {
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
  margin: 0;
  line-height: 1.4;
}

.customization-summary {
  background: rgba(139, 115, 85, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border-left: 3px solid #8b7355;
}

.summary-title {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.summary-details {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  min-width: 160px;
  justify-content: center;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.6s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-secondary {
  background: linear-gradient(135deg, #e8e6e3 0%, #d4d2cf 100%);
  color: #666;
  border: 2px solid transparent;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #d4d2cf 0%, #c0beb9 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #8b7355 0%, #a08968 100%);
  color: white;
  box-shadow: 0 6px 25px rgba(139, 115, 85, 0.3);
  border: 2px solid transparent;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(139, 115, 85, 0.4);
  background: linear-gradient(135deg, #6d5a44 0%, #8b7355 100%);
}

.btn-cart {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  box-shadow: 0 6px 25px rgba(40, 167, 69, 0.3);
  border: 2px solid transparent;
}

.btn-cart:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(40, 167, 69, 0.4);
  background: linear-gradient(135deg, #1e7e34 0%, #17a2b8 100%);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .custom-modal-content {
    margin: 0.5rem;
  }
  
  .custom-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .color-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
}

@media (max-width: 768px) {
  .custom-modal {
    padding: 0.5rem;
  }
  
  .custom-header {
    padding: 2rem 1.5rem;
  }
  
  .custom-body {
    padding: 1.5rem;
    max-height: 65vh;
  }
  
  .custom-section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .custom-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  
  .color-option {
    width: 60px;
    height: 60px;
  }
  
  .custom-footer {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .price-summary {
    min-width: auto;
    width: 100%;
  }
  
  .price-details {
    text-align: center;
  }
  
  .price-row {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .custom-header h2 {
    font-size: 1.8rem;
  }
  
  .custom-grid {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  }
  
  .custom-option {
    padding: 1rem;
    min-height: 100px;
  }
  
  .option-emoji {
    font-size: 1.4rem;
  }
  
  .size-grid {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  }
  
  .close-custom-modal {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}

/* Loading States */
.btn.loading {
  pointer-events: none;
  opacity: 0.8;
}

.btn.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.custom-option:focus,
.color-option:focus,
.size-option:focus,
.btn:focus {
  outline: 3px solid #8b7355 !important;
  outline-offset: 2px !important;
}

/* Scroll styling */
.custom-body::-webkit-scrollbar {
  width: 8px;
}

.custom-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-body::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8b7355, #c9a96e);
  border-radius: 4px;
}

.custom-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #6d5a44, #8b7355);
}
</style>
`;

// Enhanced HTML modal with all customization options
const customizationHTML = `
<div id="customizationModal" class="custom-modal">
  <div class="custom-modal-content">
    <div class="custom-header">
      <button class="close-custom-modal" onclick="closeCustomizationModal()">&times;</button>
      <h2 id="modalTitle">Design Your Dream Dress</h2>
      <p>Create something uniquely yours with unlimited customization ✨</p>
    </div>

    <div class="customization-progress">
      <div class="progress-fill" id="progressFill" style="width: 0%"></div>
    </div>

    <div class="custom-body">
      <!-- SILHOUETTE SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">👗</span> Dress Silhouette</h3>
        <p style="color: #666; margin-bottom: 1rem;">Choose the foundational shape that flatters your figure</p>
        <div class="custom-grid" id="silhouette-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- NECKLINE SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">💎</span> Neckline Style</h3>
        <p style="color: #666; margin-bottom: 1rem;">Select the perfect neckline to complement your style</p>
        <div class="custom-grid" id="neckline-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- SLEEVE SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">👔</span> Sleeve Style</h3>
        <p style="color: #666; margin-bottom: 1rem;">From sleeveless elegance to dramatic bell sleeves</p>
        <div class="custom-grid" id="sleeves-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- BACK STYLE SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">🔙</span> Back Style</h3>
        <p style="color: #666; margin-bottom: 1rem;">Make a statement from every angle</p>
        <div class="custom-grid" id="back-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- TRAIN SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">👸</span> Train Length</h3>
        <p style="color: #666; margin-bottom: 1rem;">From practical to breathtakingly dramatic</p>
        <div class="custom-grid" id="train-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- MATERIAL SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">✨</span> Fabric Choice</h3>
        <p style="color: #666; margin-bottom: 1rem;">Luxurious fabrics to bring your vision to life</p>
        <div class="custom-grid" id="material-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- COLOR SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">🎨</span> Color Palette</h3>
        <p style="color: #666; margin-bottom: 1rem;">Classic bridal tones and custom color matching available</p>
        <div class="color-grid" id="color-options">
          <!-- Color options will be populated by JavaScript -->
        </div>
      </div>

      <!-- WAISTLINE SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">📏</span> Waistline Style</h3>
        <p style="color: #666; margin-bottom: 1rem;">Define your silhouette with the perfect waist placement</p>
        <div class="custom-grid" id="waistline-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- EMBELLISHMENTS SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">💍</span> Embellishments</h3>
        <p style="color: #666; margin-bottom: 1rem;">Add sparkle, texture, and personal touches</p>
        <div class="custom-grid" id="embellishments-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- BUST SUPPORT SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">👙</span> Bust Support</h3>
        <p style="color: #666; margin-bottom: 1rem;">Comfort and confidence with proper support</p>
        <div class="custom-grid" id="bust-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- SKIRT LAYERS SECTION -->
      <div class="custom-section">
        <h3><span class="section-icon">🎪</span> Skirt Volume</h3>
        <p style="color: #666; margin-bottom: 1rem;">From sleek minimalism to full ballgown drama</p>
        <div class="custom-grid" id="layers-options">
          <!-- Options will be populated by JavaScript -->
        </div>
      </div>

      <!-- SIZE SECTION -->
      <div class="custom-section size-section">
        <h3><span class="section-icon">📐</span> Size Selection</h3>
        <p style="color: #666; margin-bottom: 1rem;">Standard sizes or completely custom measurements</p>
        <div class="size-grid">
          <div class="size-option" data-option="size" data-value="XS">XS</div>
          <div class="size-option" data-option="size" data-value="S">S</div>
          <div class="size-option" data-option="size" data-value="M">M</div>
          <div class="size-option" data-option="size" data-value="L">L</div>
          <div class="size-option" data-option="size" data-value="XL">XL</div>
          <div class="size-option" data-option="size" data-value="XXL">XXL</div>
          <div class="size-option" data-option="size" data-value="Custom">Custom Measurements</div>
        </div>
      </div>

      <!-- QUANTITY SECTION -->
      <div class="custom-section quantity-section">
        <div class="quantity-label">
          <span class="section-icon">🔢</span>
          Quantity
        </div>
        <div class="quantity-selector">
          <button class="quantity-btn" onclick="changeQuantity(-1)">−</button>
          <input type="number" class="quantity-input" id="quantity" value="1" min="1" max="10" readonly>
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
      </div>

      <!-- SPECIAL REQUESTS SECTION -->
      <div class="custom-section special-requests-section">
        <h3><span class="section-icon">💌</span> Special Requests & Personal Touches</h3>
        <p style="color: #666; margin-bottom: 1rem;">Tell us about any special details, modifications, or personal elements you'd love to include</p>
        <textarea class="special-requests" id="specialRequests" placeholder="Share your dreams and vision with us! Whether it's incorporating family heirloom lace, matching a specific color, adjusting proportions, or adding meaningful details - we're here to make it happen. Every bride is unique, and your dress should be too! ✨

Examples:
• Family lace from grandmother's dress
• Specific shade of blue for 'something blue'
• Extra length for tall bride
• Pockets (yes, we can add pockets!)
• Religious or cultural elements
• Special embroidery or monogramming
• Matching accessories or details for bridesmaids

Don't hold back - this is your moment to create something truly magical!"></textarea>
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
            <span style="color: #666; font-size: 0.8rem; font-style: italic;">Limited time offer</span>
          </div>
          <p class="price-note">✨ Includes custom design, expert tailoring, and white-glove service</p>
          
          <div class="customization-summary" id="customizationSummary">
            <div class="summary-title">Your Customizations:</div>
            <div class="summary-details" id="summaryDetails">
              <!-- Will be populated by JavaScript -->
            </div>
          </div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-secondary" onclick="closeCustomizationModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H6m6-6l-6 6 6 6"/>
          </svg>
          Maybe Later
        </button>
        
        <button class="btn btn-cart" onclick="addToCart()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
        
        <button class="btn btn-primary" onclick="submitCustomization()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Get Quote First
        </button>
      </div>
    </div>
  </div>
</div>
`;

// SMART discount calculation - Always 22% discount with proper formula (unchanged)
function calculateSmartDiscount(currentPrice, productId) {
  const discountPercent = 22;
  const originalPrice = Math.round((currentPrice / (1 - discountPercent / 100)) * 100) / 100;
  
  return {
    originalPrice: originalPrice,
    discountedPrice: currentPrice,
    discountPercent: discountPercent
  };
}

// SMART function that automatically detects product info (unchanged)
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
  
  const modal = document.getElementById('customizationModal');
  if (!modal) {
    initializeCustomizationModal();
    return;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Update modal title
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = `Design Your ${dressName}`;
  
  populateCustomizationOptions();
  initializeDefaults();
  updatePrice();
  updateProgress();
}

// Populate all customization options
function populateCustomizationOptions() {
  // Populate silhouette options
  const silhouetteContainer = document.getElementById('silhouette-options');
  if (silhouetteContainer) {
    silhouetteContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.silhouette)
      .map(([key, option]) => `
        <div class="custom-option" data-option="silhouette" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : option.price < 0 ? `${option.price}` : 'Base Price'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate neckline options
  const necklineContainer = document.getElementById('neckline-options');
  if (necklineContainer) {
    necklineContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.neckline)
      .map(([key, option]) => `
        <div class="custom-option" data-option="neckline" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate sleeves options
  const sleevesContainer = document.getElementById('sleeves-options');
  if (sleevesContainer) {
    sleevesContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.sleeves)
      .map(([key, option]) => `
        <div class="custom-option" data-option="sleeves" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate back options
  const backContainer = document.getElementById('back-options');
  if (backContainer) {
    backContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.back)
      .map(([key, option]) => `
        <div class="custom-option" data-option="back" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate train options
  const trainContainer = document.getElementById('train-options');
  if (trainContainer) {
    trainContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.train)
      .map(([key, option]) => `
        <div class="custom-option" data-option="train" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : option.price < 0 ? `${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate material options
  const materialContainer = document.getElementById('material-options');
  if (materialContainer) {
    materialContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.material)
      .map(([key, option]) => `
        <div class="custom-option" data-option="material" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Base Price'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate color options
  const colorContainer = document.getElementById('color-options');
  if (colorContainer) {
    colorContainer.innerHTML = Object.entries(COLOR_OPTIONS)
      .map(([key, option]) => `
        <div class="color-option" data-option="color" data-value="${key}" data-price="${option.price}" style="background: ${option.hex === '#gradient' ? 'linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcf7f, #4d96ff, #9c88ff, #ff6b6b)' : option.hex};" title="${option.name} ${option.price > 0 ? `(+${option.price})` : ''}">
        </div>
        <div class="color-info">
          <div class="color-name">${option.name}</div>
          <div class="color-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="color-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate waistline options
  const waistlineContainer = document.getElementById('waistline-options');
  if (waistlineContainer) {
    waistlineContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.waistline)
      .map(([key, option]) => `
        <div class="custom-option" data-option="waistline" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate embellishments options
  const embellishmentsContainer = document.getElementById('embellishments-options');
  if (embellishmentsContainer) {
    embellishmentsContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.embellishments)
      .map(([key, option]) => `
        <div class="custom-option" data-option="embellishments" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate bust options
  const bustContainer = document.getElementById('bust-options');
  if (bustContainer) {
    bustContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.bust)
      .map(([key, option]) => `
        <div class="custom-option" data-option="bust" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }

  // Populate layers options
  const layersContainer = document.getElementById('layers-options');
  if (layersContainer) {
    layersContainer.innerHTML = Object.entries(CUSTOMIZATION_OPTIONS.layers)
      .map(([key, option]) => `
        <div class="custom-option" data-option="layers" data-value="${key}" data-price="${option.price}">
          <span class="option-emoji">${option.emoji}</span>
          <div class="option-name">${option.name}</div>
          <div class="option-price">${option.price > 0 ? `+${option.price}` : 'Included'}</div>
          <div class="option-desc">${option.desc}</div>
        </div>
      `).join('');
  }
}

// AUTO-DETECTION function - reads product info from page (unchanged)
function autoDetectProductInfo() {
  const currentId = getCurrentProductId();
  
  const titleElement = document.querySelector('h1') || document.querySelector('.product-title');
  const priceElement = document.querySelector('#product-price') || 
                      document.querySelector('.current-price') || 
                      document.querySelector('[id*="price"]');
  const imageElement = document.querySelector('.gallery-image.active') || 
                      document.querySelector('.product-image');
  
  let price = 300;
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

// Helper function to get current product ID from URL (unchanged)
function getCurrentProductId() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop().replace('.html', '');
  return filename || 'unknown';
}

// Helper function to get site base URL (unchanged)
function getSiteBaseUrl() {
  return document.querySelector('meta[name="base-url"]')?.content || '';
}

// Updated addToCart function - works with your existing cart system (unchanged)
function addToCart() {
  // Validate that size is selected
  if (!selectedOptions.size) {
    alert('Please select a size before adding to cart!');
    return;
  }
  
  // Create customization summary
  const customizations = {
    silhouette: selectedOptions.silhouette,
    neckline: selectedOptions.neckline,
    sleeves: selectedOptions.sleeves,
    back: selectedOptions.back,
    train: selectedOptions.train,
    material: selectedOptions.material,
    color: selectedOptions.color,
    waistline: selectedOptions.waistline,
    embellishments: selectedOptions.embellishments,
    bust: selectedOptions.bust,
    layers: selectedOptions.layers,
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
  
  // Add to cart using the main cart system
  if (typeof window.cart !== 'undefined' && window.cart.addItem) {
    window.cart.addItem(customProduct);
    closeCustomizationModal();
  } else {
    // Fallback - try to add to cart after a short delay
    setTimeout(() => {
      if (typeof window.cart !== 'undefined' && window.cart.addItem) {
        window.cart.addItem(customProduct);
        closeCustomizationModal();
      } else {
        alert('🎉 Your custom dress design is ready! Please refresh the page and try again if the cart doesn\'t update.');
        closeCustomizationModal();
      }
    }, 500);
  }
}

// Enhanced email quote function with comprehensive customization details
function submitCustomization() {
  const specialRequests = document.getElementById('specialRequests')?.value || 'No special requests';
  const totalPrice = document.getElementById('totalPrice')?.textContent || 'Not calculated';
  const originalPrice = document.getElementById('basePriceDisplay')?.textContent || '';
  const discountBadge = document.getElementById('discountBadge')?.textContent || '';
  
  // Gather all customization details
  const customizationDetails = {
    silhouette: CUSTOMIZATION_OPTIONS.silhouette[selectedOptions.silhouette]?.name || selectedOptions.silhouette,
    neckline: CUSTOMIZATION_OPTIONS.neckline[selectedOptions.neckline]?.name || selectedOptions.neckline,
    sleeves: CUSTOMIZATION_OPTIONS.sleeves[selectedOptions.sleeves]?.name || selectedOptions.sleeves,
    back: CUSTOMIZATION_OPTIONS.back[selectedOptions.back]?.name || selectedOptions.back,
    train: CUSTOMIZATION_OPTIONS.train[selectedOptions.train]?.name || selectedOptions.train,
    material: CUSTOMIZATION_OPTIONS.material[selectedOptions.material]?.name || selectedOptions.material,
    color: COLOR_OPTIONS[selectedOptions.color]?.name || selectedOptions.color,
    waistline: CUSTOMIZATION_OPTIONS.waistline[selectedOptions.waistline]?.name || selectedOptions.waistline,
    embellishments: CUSTOMIZATION_OPTIONS.embellishments[selectedOptions.embellishments]?.name || selectedOptions.embellishments,
    bust: CUSTOMIZATION_OPTIONS.bust[selectedOptions.bust]?.name || selectedOptions.bust,
    layers: CUSTOMIZATION_OPTIONS.layers[selectedOptions.layers]?.name || selectedOptions.layers
  };
  
  const subject = encodeURIComponent(`Custom Wedding Dress Quote - ${currentProductInfo.name}`);
  const body = encodeURIComponent(`Hello Roza Bridal! 💕

I would like a quote for a custom wedding dress! Here are my detailed customization specifications:

DRESS: ${currentProductInfo.name}

🎨 DESIGN SPECIFICATIONS:
👗 Silhouette: ${customizationDetails.silhouette}
💎 Neckline: ${customizationDetails.neckline}
👔 Sleeves: ${customizationDetails.sleeves}
🔙 Back Style: ${customizationDetails.back}
👸 Train: ${customizationDetails.train}
✨ Fabric: ${customizationDetails.material}
🎨 Color: ${customizationDetails.color}
📏 Waistline: ${customizationDetails.waistline}
💍 Embellishments: ${customizationDetails.embellishments}
👙 Bust Support: ${customizationDetails.bust}
🎪 Skirt Layers: ${customizationDetails.layers}
📐 Size: ${selectedOptions.size || 'Not selected'}
🔢 Quantity: ${selectedOptions.quantity}

💌 SPECIAL REQUESTS & PERSONAL TOUCHES:
${specialRequests}

💰 PRICING ESTIMATE:
Original Price: ${originalPrice}
Your Price: ${totalPrice} (${discountBadge})

Please provide me with:
✅ Final pricing confirmation for all customizations
✅ Timeline for design, creation, and delivery
✅ Payment options and schedule
✅ Fitting appointment scheduling
✅ Any additional details or recommendations

I'm incredibly excited to work with you to create my dream dress! This level of customization is exactly what I was looking for, and I can't wait to see it come to life.

Looking forward to hearing from you soon!

Best regards,
[Your Future Bride] 💍`);
  
  window.open(`mailto:aetophis@aetophis.com?subject=${subject}&body=${body}`, '_blank');
  closeCustomizationModal();
  
  setTimeout(() => {
    alert('📧 Your comprehensive quote request has been sent! We\'ll review all your customization details and get back to you with precise pricing, timeline, and next steps. Thank you for choosing us to create your dream dress! ✨');
  }, 500);
}

// Enhanced price calculation with all customizations
function updatePrice() {
  let unitPrice = currentProductInfo.basePrice;
  
  // Add customization costs from all selected options
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
  
  updateCustomizationSummary();
}

// Update customization summary in real-time
function updateCustomizationSummary() {
  const summaryElement = document.getElementById('summaryDetails');
  if (!summaryElement) return;
  
  const customizations = [];
  
  // Gather selected customizations with prices
  Object.entries(selectedOptions).forEach(([key, value]) => {
    if (key === 'quantity' || key === 'size' || !value) return;
    
    let optionData = null;
    let price = 0;
    
    if (key === 'color') {
      optionData = COLOR_OPTIONS[value];
    } else if (CUSTOMIZATION_OPTIONS[key] && CUSTOMIZATION_OPTIONS[key][value]) {
      optionData = CUSTOMIZATION_OPTIONS[key][value];
    }
    
    if (optionData) {
      price = optionData.price || 0;
      const priceText = price > 0 ? ` (+${price})` : price < 0 ? ` (${price})` : '';
      customizations.push(`${optionData.name}${priceText}`);
    }
  });
  
  summaryElement.textContent = customizations.length > 0 ? customizations.join(' • ') : 'Base configuration';
}

// Update progress bar based on selections
function updateProgress() {
  const totalOptions = Object.keys(selectedOptions).length - 2; // Exclude quantity and size
  let selectedCount = 0;
  
  Object.entries(selectedOptions).forEach(([key, value]) => {
    if (key !== 'quantity' && key !== 'size' && value) {
      selectedCount++;
    }
  });
  
  const progress = Math.min((selectedCount / totalOptions) * 100, 100);
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }
}

// Initialize defaults (enhanced)
function initializeDefaults() {
  // Clear all selections first
  document.querySelectorAll('.custom-option, .color-option, .size-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Set defaults based on selected options
  Object.entries(selectedOptions).forEach(([optionType, defaultValue]) => {
    if (optionType === 'quantity' || optionType === 'size') return;
    
    const defaultOption = document.querySelector(`[data-option="${optionType}"][data-value="${defaultValue}"]`);
    if (defaultOption) {
      defaultOption.classList.add('selected');
    }
  });
  
  // Reset quantity
  const quantityInput = document.getElementById('quantity');
  if (quantityInput) {
    quantityInput.value = 1;
    selectedOptions.quantity = 1;
  }
  
  // Reset defaults
  selectedOptions = {
    silhouette: 'aline',
    neckline: 'vneck',
    sleeves: 'sleeveless',
    back: 'zipper',
    train: 'sweep',
    material: 'satin',
    color: 'ivory',
    waistline: 'natural',
    embellishments: 'none',
    bust: 'builtin',
    layers: 'single',
    size: '',
    quantity: 1
  };
}

// Quantity change function (unchanged)
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

// Close modal function (unchanged)
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
  updateProgress();
}

// UNIVERSAL INITIALIZATION - Works on any page (enhanced)
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

// Auto-initialize when DOM is ready (unchanged)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCustomizationModal);
} else {
  initializeCustomizationModal();
}

// Make functions globally available (unchanged)
window.openCustomizationModal = openCustomizationModal;
window.closeCustomizationModal = closeCustomizationModal;
window.addToCart = addToCart;
window.submitCustomization = submitCustomization;
window.changeQuantity = changeQuantity;

console.log('✅ Enhanced Customization modal with comprehensive options loaded successfully!');
