// STRIPE PAYMENT INTEGRATION - Roza Bridal
// FIXED: Supports modal + checkout only Stripe + persistent cart

// 💰 LIVE STRIPE PAYMENT LINKS
const STRIPE_PAYMENT_LINKS = {
  'boho-wedding-dress-elegant': 'https://buy.stripe.com/4gM3cv3TA7sRc093EN1B600',
  'boho-beach-wedding-dress': 'https://buy.stripe.com/7sY6oHdua7sR6FP0sB1B601',
  'custom-lace-mermaid-wedding-dress': 'https://buy.stripe.com/5kQ00jcq614t4xH2AJ1B602',
  'custom-lace-mermaid-wedding-dress-v-neck': 'https://buy.stripe.com/00waEX2PweVj5BL6QZ1B603',
  'elegant-ivory-satin-bridal-gown': 'https://buy.stripe.com/3cI4gz2Pw8wV7JT6QZ1B604',
  'floral-bridal-dress': 'https://buy.stripe.com/cNi3cv9dUfZnggpcbj1B605',
  'gorgeous-ivory-mermaid-wedding-gown': 'https://buy.stripe.com/7sYaEX75MdRf0hrgrz1B606',
  'minimalist-off-shoulder-satin-dress': 'https://buy.stripe.com/28E9ATgGm9AZ7JTdfn1B607',
  'modest-satin-wedding-dress': 'https://buy.stripe.com/4gM3cvcq6cNbc09dfn1B608',
  'sexy-fishtail-bridal-gown': 'https://buy.stripe.com/eVqdR9bm2fZn4xHcbj1B609',
  'sexy-sequin-mermaid-wedding-dress': 'https://buy.stripe.com/7sY00jeye28xe8h7V31B60a'
};

// Product ID mapping for different naming conventions
const PRODUCT_ID_MAPPING = {
  'boho': 'boho-wedding-dress-elegant',
  'minimalist-off-shoulder-satin-wedding-dress': 'minimalist-off-shoulder-satin-dress'
};

// Make globally available
window.STRIPE_PAYMENT_LINKS = STRIPE_PAYMENT_LINKS;
window.STRIPE_MODE = 'LIVE';

console.log('💰 Stripe Integration loaded - CHECKOUT ONLY MODE');
console.log('🎯 Payment links ready:', Object.keys(STRIPE_PAYMENT_LINKS).length, 'products');

// Enhanced product ID detection
function getProductIdFromPath(path) {
  if (path.includes('/boho.html')) return 'boho-wedding-dress-elegant';
  if (path.includes('/boho-beach-wedding-dress.html')) return 'boho-beach-wedding-dress';
  if (path.includes('/custom-lace-mermaid-wedding-dress-v-neck.html')) return 'custom-lace-mermaid-wedding-dress-v-neck';
  if (path.includes('/custom-lace-mermaid-wedding-dress.html')) return 'custom-lace-mermaid-wedding-dress';
  if (path.includes('/elegant-ivory-satin-bridal-gown.html')) return 'elegant-ivory-satin-bridal-gown';
  if (path.includes('/floral-bridal-dress.html')) return 'floral-bridal-dress';
  if (path.includes('/gorgeous-ivory-mermaid-wedding-gown.html')) return 'gorgeous-ivory-mermaid-wedding-gown';
  if (path.includes('/minimalist-off-shoulder-satin-dress.html')) return 'minimalist-off-shoulder-satin-dress';
  if (path.includes('/minimalist-off-shoulder-satin-wedding-dress.html')) return 'minimalist-off-shoulder-satin-dress';
  if (path.includes('/modest-satin-wedding-dress.html')) return 'modest-satin-wedding-dress';
  if (path.includes('/sexy-fishtail-bridal-gown.html')) return 'sexy-fishtail-bridal-gown';
  if (path.includes('/sexy-sequin-mermaid-wedding-dress.html')) return 'sexy-sequin-mermaid-wedding-dress';
  
  // Fallback: extract from filename
  const filename = path.split('/').pop().replace('.html', '');
  return PRODUCT_ID_MAPPING[filename] || filename;
}

function getProductIdFromName(productName) {
  const nameMap = {
    'Boho Wedding Dress Elegant': 'boho-wedding-dress-elegant',
    'Boho Beach Wedding Dress': 'boho-beach-wedding-dress',
    'Custom Lace Mermaid Wedding Dress': 'custom-lace-mermaid-wedding-dress',
    'Custom Lace Mermaid Wedding Dress V-Neck': 'custom-lace-mermaid-wedding-dress-v-neck',
    'Elegant Ivory Satin Bridal Gown': 'elegant-ivory-satin-bridal-gown',
    'Floral Bridal Dress': 'floral-bridal-dress',
    'Gorgeous Ivory Mermaid Wedding Gown': 'gorgeous-ivory-mermaid-wedding-gown',
    'Minimalist Off Shoulder Satin Wedding Dress': 'minimalist-off-shoulder-satin-dress',
    'Modest Satin Wedding Dress': 'modest-satin-wedding-dress',
    'Sexy Fishtail Bridal Gown': 'sexy-fishtail-bridal-gown',
    'Sexy Sequin Mermaid Wedding Dress': 'sexy-sequin-mermaid-wedding-dress'
  };
  return nameMap[productName] || null;
}

// CHECKOUT PAGE ONLY - Stripe checkout handler (BACK TO WORKING VERSION)
function handleStripeCheckoutFromCart(cartItems, customerDetails) {
  console.log('💳 Processing cart checkout with Stripe:', {
    itemCount: cartItems.length,
    customerDetails: customerDetails,
    mode: 'LIVE'
  });
  
  // For single item with direct Stripe link - redirect to Stripe
  if (cartItems.length === 1) {
    const item = cartItems[0];
    const cleanName = item.name.replace(/\s*\(Custom\)$/, '');
    const productId = getProductIdFromName(cleanName);
    const stripeLink = STRIPE_PAYMENT_LINKS[productId];
    
    console.log('Single item checkout:', {
      itemName: item.name,
      cleanName: cleanName,
      productId: productId,
      stripeLink: stripeLink,
      isCustom: item.isCustom
    });
    
    if (stripeLink) {
      // Save customer details and order info for follow-up
      saveOrderForStripeProcessing(item, customerDetails);
      
      // Track checkout
      if (typeof ml !== 'undefined') {
        ml('track', 'stripe_checkout_started', {
          product_id: productId,
          product_name: item.name,
          customer_email: customerDetails.email,
          has_customizations: item.isCustom,
          checkout_method: 'cart_to_stripe'
        });
      }
      
      // SAVE CHECKOUT STATE BEFORE OPENING STRIPE (for potential return)
      saveCheckoutState(cartItems, customerDetails);
      
      // OPEN STRIPE IN NEW TAB - Don't clear cart immediately
      console.log('🚀 Opening Stripe in new tab:', stripeLink);
      window.open(stripeLink, '_blank');
      
      // Show success message
      setTimeout(() => {
        alert('💳 Stripe checkout opened in new tab!\n\n✅ Complete your payment there\n🔄 You can return here to modify your order if needed\n\n💡 Tip: Keep this tab open until payment is complete');
      }, 500);
      
      return true;
    }
  }
  
  // Multiple items or no direct Stripe link - use email processing
  console.log('Multiple items or no Stripe link - using email processing');
  return false;
}

// Save checkout state before Stripe redirect
function saveCheckoutState(cartItems, customerDetails) {
  const checkoutState = {
    cart: cartItems,
    customer: customerDetails,
    timestamp: Date.now(),
    status: 'stripe_redirect'
  };
  
  localStorage.setItem('checkoutState', JSON.stringify(checkoutState));
  localStorage.setItem('checkoutStateBackup', JSON.stringify(checkoutState));
  sessionStorage.setItem('checkoutState', JSON.stringify(checkoutState));
  
  console.log('💾 Checkout state saved before Stripe redirect');
}

// Restore checkout state if user returns from Stripe
function restoreCheckoutState() {
  const checkoutState = localStorage.getItem('checkoutState') || 
                       localStorage.getItem('checkoutStateBackup') ||
                       sessionStorage.getItem('checkoutState');
  
  if (checkoutState) {
    try {
      const state = JSON.parse(checkoutState);
      const timeDiff = Date.now() - state.timestamp;
      
      // If less than 30 minutes old, restore
      if (timeDiff < 30 * 60 * 1000) {
        localStorage.setItem('rozaBridalCart', JSON.stringify(state.cart));
        console.log('🔄 Checkout state restored after Stripe redirect');
        return state;
      }
    } catch (e) {
      console.error('Error restoring checkout state:', e);
    }
  }
  
  return null;
}

// Clear checkout state after successful order
function clearCheckoutState() {
  localStorage.removeItem('checkoutState');
  localStorage.removeItem('checkoutStateBackup');
  sessionStorage.removeItem('checkoutState');
  localStorage.removeItem('stripeRedirectInProgress');
  localStorage.removeItem('stripeRedirectTime');
}

// Detect if user returned from Stripe and handle accordingly
function handleStripeReturn() {
  const stripeRedirectInProgress = localStorage.getItem('stripeRedirectInProgress');
  const redirectTime = localStorage.getItem('stripeRedirectTime');
  
  if (stripeRedirectInProgress && redirectTime) {
    const timeDiff = Date.now() - parseInt(redirectTime);
    
    // If less than 5 minutes, user likely came back from Stripe
    if (timeDiff < 5 * 60 * 1000) {
      console.log('🔄 User returned from Stripe redirect');
      
      // Restore checkout state
      restoreCheckoutState();
      
      // Reset any loading buttons
      resetCheckoutButtons();
      
      // Clean up redirect flags
      localStorage.removeItem('stripeRedirectInProgress');
      localStorage.removeItem('stripeRedirectTime');
      
      return true;
    }
  }
  
  return false;
}

// Reset checkout buttons to normal state
function resetCheckoutButtons() {
  const completeButton = document.getElementById('complete-order-button');
  if (completeButton) {
    completeButton.disabled = false;
    completeButton.innerHTML = `
      <div class="button-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        <span>Complete Order</span>
      </div>
    `;
    console.log('🔄 Checkout button reset');
  }
}

// PERSISTENT CART FUNCTIONS - Fix cart deletion on refresh
function saveCartToPersistentStorage() {
  const cartData = localStorage.getItem('rozaBridalCart');
  if (cartData) {
    // Also save to sessionStorage as backup
    sessionStorage.setItem('rozaBridalCart', cartData);
    
    // Save timestamp
    localStorage.setItem('rozaBridalCartTimestamp', Date.now().toString());
    
    console.log('💾 Cart saved to persistent storage');
  }
}

function restoreCartFromPersistentStorage() {
  let cartData = localStorage.getItem('rozaBridalCart');
  
  // If no cart in localStorage, try sessionStorage
  if (!cartData || cartData === '[]') {
    cartData = sessionStorage.getItem('rozaBridalCart');
    if (cartData && cartData !== '[]') {
      localStorage.setItem('rozaBridalCart', cartData);
      console.log('🔄 Cart restored from sessionStorage');
    }
  }
  
  // Update cart icon if cart system is available
  if (window.cart && typeof window.cart.updateCartIcon === 'function') {
    window.cart.updateCartIcon();
  }
}

// Auto-save cart on any changes
function setupCartPersistence() {
  // Save cart whenever it changes
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'rozaBridalCart') {
      saveCartToPersistentStorage();
    }
  };
  
  // Restore cart on page load
  restoreCartFromPersistentStorage();
  
  // Save cart before page unload
  window.addEventListener('beforeunload', saveCartToPersistentStorage);
  
  console.log('✅ Cart persistence system activated');
}

// Initialize cart persistence when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCartPersistence);
} else {
  setupCartPersistence();
}

// Make functions globally available
window.handleStripeCheckoutFromCart = handleStripeCheckoutFromCart;
window.getProductIdFromPath = getProductIdFromPath;
window.getProductIdFromName = getProductIdFromName;
window.saveCartToPersistentStorage = saveCartToPersistentStorage;
window.restoreCartFromPersistentStorage = restoreCartFromPersistentStorage;

console.log('✅ Stripe Integration Ready - CHECKOUT ONLY MODE');
console.log('🔄 Cart persistence enabled - no more cart loss on refresh');
console.log('💰 All payment links active and ready for sales!');
