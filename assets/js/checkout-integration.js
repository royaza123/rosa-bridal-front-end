// checkout-integration.js - Integrate cart with checkout page
// This ensures the checkout page loads cart data properly

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Only run on checkout page
  if (!window.location.pathname.includes('checkout')) {
    return;
  }
  
  initializeCheckout();
});

function initializeCheckout() {
  // Load cart data and populate checkout
  loadCartDataForCheckout();
  
  // Setup form handling
  setupCheckoutFormHandling();
  
  // Setup real-time form validation
  setupFormValidation();
}

function loadCartDataForCheckout() {
  try {
    // Get cart data from localStorage
    const cartData = localStorage.getItem('rozaBridalCart');
    const cartItems = cartData ? JSON.parse(cartData) : [];
    
    console.log('Loading cart data for checkout:', cartItems);
    
    // Get checkout elements
    const checkoutItems = document.getElementById('checkout-items');
    const emptyCartNotice = document.getElementById('empty-cart-notice');
    const checkoutTotals = document.getElementById('checkout-totals');
    const placeOrderButton = document.getElementById('place-order-button');
    
    if (!checkoutItems) {
      console.error('Checkout elements not found');
      return;
    }
    
    if (cartItems.length === 0) {
      // Show empty cart state
      if (emptyCartNotice) emptyCartNotice.style.display = 'block';
      if (checkoutItems) checkoutItems.style.display = 'none';
      if (checkoutTotals) checkoutTotals.style.display = 'none';
      if (placeOrderButton) {
        placeOrderButton.style.display = 'none';
      }
      return;
    }
    
    // Hide empty cart notice
    if (emptyCartNotice) emptyCartNotice.style.display = 'none';
    if (checkoutItems) checkoutItems.style.display = 'block';
    if (checkoutTotals) checkoutTotals.style.display = 'block';
    if (placeOrderButton) {
      placeOrderButton.style.display = 'block';
      placeOrderButton.disabled = false;
    }
    
    // Render cart items
    renderCheckoutItems(cartItems);
    
    // Calculate and display totals
    calculateCheckoutTotals(cartItems);
    
  } catch (error) {
    console.error('Error loading cart data for checkout:', error);
  }
}

function renderCheckoutItems(cartItems) {
  const checkoutItems = document.getElementById('checkout-items');
  if (!checkoutItems) return;
  
  checkoutItems.innerHTML = cartItems.map((item, index) => {
    // Handle custom product details
    const customizationHtml = item.isCustom && item.customizations ? `
      <div class="checkout-item-customizations">
        <h5>✨ Custom Design Details:</h5>
        <p>
          <strong>Style:</strong> ${item.customizations.style || 'Not specified'}<br>
          <strong>Neckline:</strong> ${item.customizations.neckline || 'Not specified'}<br>
          <strong>Color:</strong> ${item.customizations.color || 'Not specified'}<br>
          <strong>Fabric:</strong> ${item.customizations.fabric || 'Not specified'}<br>
          <strong>Train:</strong> ${item.customizations.train || 'Not specified'}
          ${item.customizations.specialRequests ? `<br><strong>Special Requests:</strong> ${item.customizations.specialRequests}` : ''}
        </p>
      </div>
    ` : '';
    
    return `
      <div class="checkout-item" data-item-index="${index}">
        <img src="${item.image || '/assets/images/placeholder.jpg'}" alt="${item.name}" class="checkout-item-image" onerror="this.src='/assets/images/placeholder-dress.jpg'">
        <div class="checkout-item-details">
          <h4>${item.name}</h4>
          <p class="checkout-item-meta">
            Size: ${item.size || 'Not specified'} • Quantity: ${item.quantity || 1}
          </p>
          <p class="checkout-item-price">$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
          ${customizationHtml}
        </div>
      </div>
    `;
  }).join('');
}

function calculateCheckoutTotals(cartItems) {
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + ((item.price || 0) * (item.quantity || 1));
  }, 0);
  
  // Calculate shipping (free over $500, otherwise $50)
  const shippingCost = subtotal >= 500 ? 0 : 50;
  
  // Tax calculated separately
  const tax = 0;
  
  // Total
  const total = subtotal + shippingCost + tax;
  
  // Update display
  const subtotalElement = document.getElementById('checkout-subtotal');
  const shippingElement = document.getElementById('checkout-shipping');
  const taxElement = document.getElementById('checkout-tax');
  const totalElement = document.getElementById('checkout-total');
  
  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingElement) shippingElement.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
  if (taxElement) taxElement.textContent = 'Calculated separately';
  if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

function setupCheckoutFormHandling() {
  const placeOrderButton = document.getElementById('place-order-button');
  if (!placeOrderButton) return;
  
  // Auto-fill user data if logged in
  try {
    const userData = localStorage.getItem('rozaBridalUser');
    if (userData) {
      const user = JSON.parse(userData);
      const emailField = document.getElementById('checkout-email');
      const nameField = document.getElementById('checkout-name');
      
      if (emailField && user.email) emailField.value = user.email;
      if (nameField && user.firstName && user.lastName) {
        nameField.value = `${user.firstName} ${user.lastName}`;
      }
    }
  } catch (error) {
    console.error('Error auto-filling user data:', error);
  }
  
  // Handle place order button click
  placeOrderButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (validateCheckoutForm()) {
      processCheckoutOrder();
    }
  });
}

function setupFormValidation() {
  // Real-time validation for required fields
  const requiredFields = [
    'checkout-email',
    'checkout-phone', 
    'checkout-name',
    'checkout-address',
    'checkout-city',
    'checkout-state',
    'checkout-postal',
    'checkout-country',
    'preferred-payment'
  ];
  
  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('blur', function() {
        if (this.value.trim()) {
          this.style.borderColor = '#c9a96e';
        } else {
          this.style.borderColor = '#dc3545';
        }
      });
      
      field.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(220, 53, 69)' && this.value.trim()) {
          this.style.borderColor = '#c9a96e';
        }
      });
    }
  });
}

function validateCheckoutForm() {
  const requiredFields = [
    { id: 'checkout-email', name: 'Email' },
    { id: 'checkout-phone', name: 'Phone' },
    { id: 'checkout-name', name: 'Full Name' },
    { id: 'checkout-address', name: 'Address' },
    { id: 'checkout-city', name: 'City' },
    { id: 'checkout-state', name: 'State/Province' },
    { id: 'checkout-postal', name: 'Postal Code' },
    { id: 'checkout-country', name: 'Country' },
    { id: 'preferred-payment', name: 'Payment Method' }
  ];
  
  let isValid = true;
  let missingFields = [];
  
  requiredFields.forEach(field => {
    const element = document.getElementById(field.id);
    if (element) {
      if (!element.value.trim()) {
        element.style.borderColor = '#dc3545';
        missingFields.push(field.name);
        isValid = false;
      } else {
        element.style.borderColor = '#c9a96e';
      }
    }
  });
  
  // Email validation
  const emailField = document.getElementById('checkout-email');
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
      emailField.style.borderColor = '#dc3545';
      isValid = false;
      if (!missingFields.includes('Valid Email')) {
        missingFields.push('Valid Email');
      }
    }
  }
  
  if (!isValid) {
    alert(`Please fill in the following required fields:\n\n• ${missingFields.join('\n• ')}`);
    
    // Focus on first invalid field
    const firstInvalidField = document.querySelector('input[style*="rgb(220, 53, 69)"], select[style*="rgb(220, 53, 69)"]');
    if (firstInvalidField) {
      firstInvalidField.focus();
    }
  }
  
  return isValid;
}

function processCheckoutOrder() {
  try {
    // Get cart data
    const cartData = localStorage.getItem('rozaBridalCart');
    const cartItems = cartData ? JSON.parse(cartData) : [];
    
    if (cartItems.length === 0) {
      alert('Your cart is empty! Please add items before checking out.');
      window.location.href = '/products/';
      return;
    }
    
    // Collect order data
    const orderData = collectOrderData(cartItems);
    
    // Save order for tracking
    saveOrderForTracking(orderData);
    
    // Process the order
    submitOrderViaEmail(orderData);
    
  } catch (error) {
    console.error('Error processing checkout order:', error);
    alert('There was an error processing your order. Please try again or contact us directly.');
  }
}

function collectOrderData(cartItems) {
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
  const shippingCost = subtotal >= 500 ? 0 : 50;
  const tax = 0; // Calculated separately
  const total = subtotal + shippingCost + tax;
  
  // Collect form data
  const orderData = {
    orderId: 'RB-' + Date.now(),
    orderDate: new Date().toISOString(),
    contact: {
      email: document.getElementById('checkout-email')?.value || '',
      phone: document.getElementById('checkout-phone')?.value || ''
    },
    shipping: {
      name: document.getElementById('checkout-name')?.value || '',
      address: document.getElementById('checkout-address')?.value || '',
      apartment: document.getElementById('checkout-apartment')?.value || '',
      city: document.getElementById('checkout-city')?.value || '',
      state: document.getElementById('checkout-state')?.value || '',
      postal: document.getElementById('checkout-postal')?.value || '',
      country: document.getElementById('checkout-country')?.value || ''
    },
    payment: {
      preferredMethod: document.getElementById('preferred-payment')?.value || ''
    },
    notes: document.getElementById('order-notes')?.value || '',
    items: cartItems,
    totals: {
      subtotal: subtotal,
      shipping: shippingCost,
      tax: tax,
      total: total
    }
  };
  
  return orderData;
}

function saveOrderForTracking(orderData) {
  try {
    // Save order to localStorage for customer tracking
    const existingOrders = JSON.parse(localStorage.getItem('rozaBridalOrders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('rozaBridalOrders', JSON.stringify(existingOrders));
    
    console.log('Order saved for tracking:', orderData.orderId);
  } catch (error) {
    console.error('Error saving order for tracking:', error);
  }
}

function submitOrderViaEmail(orderData) {
  // Update button state
  const placeOrderButton = document.getElementById('place-order-button');
  if (placeOrderButton) {
    placeOrderButton.innerHTML = '📧 Sending Order...';
    placeOrderButton.disabled = true;
  }
  
  // Create email content
  const emailSubject = encodeURIComponent(`New Order #${orderData.orderId} - Roza Bridal`);
  const emailBody = createDetailedOrderEmail(orderData);
  
  // Open email client
  window.open(`mailto:aetophis@aetophis.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
  
  // Show success message and redirect
  setTimeout(() => {
    showOrderSuccessMessage(orderData);
  }, 1000);
}

function createDetailedOrderEmail(orderData) {
  // Create detailed item list
  const itemsList = orderData.items.map((item, index) => {
    const customDetails = item.isCustom && item.customizations ? `
  CUSTOM DESIGN DETAILS:
  • Style: ${item.customizations.style || 'Not specified'}
  • Neckline: ${item.customizations.neckline || 'Not specified'}
  • Color: ${item.customizations.color || 'Not specified'}
  • Fabric: ${item.customizations.fabric || 'Not specified'}
  • Train Length: ${item.customizations.train || 'Not specified'}
  ${item.customizations.specialRequests ? '• Special Requests: ' + item.customizations.specialRequests : ''}
  ` : '';
    
    return `
${index + 1}. ${item.name}
   • Size: ${item.size || 'Not specified'}
   • Quantity: ${item.quantity || 1}
   • Unit Price: ${(item.price || 0).toFixed(2)}
   • Line Total: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
   ${customDetails}`;
  }).join('\n');
  
  const orderSummary = `🎉 NEW WEDDING DRESS ORDER - #${orderData.orderId}

📅 ORDER DATE: ${new Date(orderData.orderDate).toLocaleString()}

👰 CUSTOMER INFORMATION:
📧 Email: ${orderData.contact.email}
📞 Phone: ${orderData.contact.phone}

📦 SHIPPING ADDRESS:
${orderData.shipping.name}
${orderData.shipping.address}
${orderData.shipping.apartment ? orderData.shipping.apartment + '\n' : ''}${orderData.shipping.city}, ${orderData.shipping.state} ${orderData.shipping.postal}
${orderData.shipping.country}

💳 PREFERRED PAYMENT METHOD:
${getPaymentMethodName(orderData.payment.preferredMethod)}

🛍️ ORDERED ITEMS:
${itemsList}

💰 ORDER TOTALS:
Subtotal: ${orderData.totals.subtotal.toFixed(2)}
Shipping: ${orderData.totals.shipping === 0 ? 'FREE (Order over $500)' : ' + orderData.totals.shipping.toFixed(2)}
Tax: Calculated separately
────────────────────────
TOTAL: ${orderData.totals.total.toFixed(2)}

📝 CUSTOMER NOTES:
${orderData.notes || 'None provided'}

⚡ URGENT ACTION REQUIRED:
✅ Contact customer within 24 hours
✅ Confirm all customization details
✅ Send secure payment link
✅ Provide production timeline
✅ Schedule fittings if needed

📞 Customer is expecting your call/email for next steps!

---
This order was placed through the Roza Bridal website.
Order tracking ID: ${orderData.orderId}`;
  
  return encodeURIComponent(orderSummary);
}

function getPaymentMethodName(method) {
  const methods = {
    'credit-card': 'Credit Card',
    'paypal': 'PayPal',
    'bank-transfer': 'Bank Transfer',
    'installments': 'Payment Plan (Installments)'
  };
  return methods[method] || method;
}

function showOrderSuccessMessage(orderData) {
  const hasCustomItems = orderData.items.some(item => item.isCustom);
  const customMessage = hasCustomItems ? '\n\n🎨 Your custom designs will be reviewed and confirmed before production begins.' : '';
  
  alert(`🎉 SUCCESS! Order #${orderData.orderId} has been placed!

📧 We've sent your order details via email and will contact you within 24 hours to:

✅ Confirm all customization details
✅ Provide secure payment processing
✅ Discuss timeline and next steps
✅ Schedule fittings if needed${customMessage}

Thank you for choosing Roza Bridal! Your dream dress journey begins now! ✨

You will receive a confirmation email shortly.`);
  
  // Clear the cart
  localStorage.removeItem('rozaBridalCart');
  
  // Redirect to thank you page or home
  setTimeout(() => {
    const baseUrl = document.querySelector('meta[name="base-url"]')?.content || '';
    window.location.href = baseUrl + '/';
  }, 2000);
}

// Utility function to update cart count in header after checkout
function updateHeaderCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = '0';
    cartCount.style.display = 'none';
  }
}

// Export functions for use in other scripts if needed
if (typeof window !== 'undefined') {
  window.checkoutIntegration = {
    loadCartDataForCheckout,
    processCheckoutOrder,
    validateCheckoutForm
  };
}
