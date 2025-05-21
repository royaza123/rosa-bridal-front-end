// cart.js - Shopping Cart Implementation
class ShoppingCart {
  constructor() {
    this.items = [];
    this.loadFromLocalStorage();
    this.renderCartIcon();
  }

  // Load cart from localStorage
  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('rozaBridalCart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  // Save cart to localStorage
  saveToLocalStorage() {
    localStorage.setItem('rozaBridalCart', JSON.stringify(this.items));
  }

  // Add item to cart
  addItem(product) {
    // Check if item already exists
    const existingItem = this.items.find(item => 
      item.id === product.id && item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.items.push({...product});
    }

    this.saveToLocalStorage();
    this.renderCartIcon();
    this.showAddedToCartNotification(product.name);
  }

  // Remove item from cart
  removeItem(index) {
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.renderCartIcon();
    this.renderCartItems(); // Re-render the cart if open
  }

  // Update item quantity
  updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    this.items[index].quantity = quantity;
    this.saveToLocalStorage();
    this.renderCartIcon();
    this.renderCartItems(); // Re-render the cart if open
  }

  // Calculate total
  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Get number of items in cart
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Render cart icon with count
  renderCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    const itemCount = this.getItemCount();
    
    if (cartIcon) {
      const countBadge = cartIcon.querySelector('.cart-count') || document.createElement('span');
      countBadge.className = 'cart-count';
      countBadge.textContent = itemCount;
      
      // Only show if there are items
      if (itemCount > 0) {
        countBadge.style.display = 'flex';
      } else {
        countBadge.style.display = 'none';
      }
      
      if (!cartIcon.querySelector('.cart-count')) {
        cartIcon.appendChild(countBadge);
      }
    }
  }

  // Show "Added to Cart" notification
  showAddedToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>${productName} added to cart</span>
      </div>
      <div class="notification-actions">
        <button class="continue-shopping">Continue Shopping</button>
        <button class="view-cart">View Cart</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listeners
    notification.querySelector('.continue-shopping').addEventListener('click', () => {
      notification.remove();
    });
    
    notification.querySelector('.view-cart').addEventListener('click', () => {
      notification.remove();
      this.openCart();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 5000);
  }

  // Open cart sidebar
  openCart() {
    let cartSidebar = document.getElementById('cart-sidebar');
    
    if (!cartSidebar) {
      cartSidebar = document.createElement('div');
      cartSidebar.id = 'cart-sidebar';
      cartSidebar.className = 'cart-sidebar';
      document.body.appendChild(cartSidebar);
    }
    
    this.renderCartItems();
    
    // Show the sidebar
    setTimeout(() => {
      cartSidebar.classList.add('open');
      document.body.classList.add('cart-open');
    }, 10);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', () => {
      this.closeCart();
    });
  }

  // Close cart sidebar
  closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar) {
      cartSidebar.classList.remove('open');
      document.body.classList.remove('cart-open');
    }
    
    if (overlay) {
      overlay.remove();
    }
  }

  // Render cart items in sidebar
  renderCartItems() {
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (!cartSidebar) return;
    
    // Cart content
    cartSidebar.innerHTML = `
      <div class="cart-header">
        <h2>Your Shopping Cart</h2>
        <button class="close-cart">×</button>
      </div>
      <div class="cart-items">
        ${this.items.length === 0 ? 
          '<div class="empty-cart">Your cart is empty</div>' : 
          this.items.map((item, index) => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-size">Size: ${item.size}</p>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                  <div class="quantity-control">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}">
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                  </div>
                  <button class="remove-item" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          `).join('')
        }
      </div>
      <div class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${this.calculateTotal().toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>Calculated at checkout</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>$${this.calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <button class="checkout-button ${this.items.length === 0 ? 'disabled' : ''}" ${this.items.length === 0 ? 'disabled' : ''}>
          Proceed to Checkout
        </button>
        <button class="continue-shopping-button">Continue Shopping</button>
      </div>
    `;
    
    // Add event listeners
    const closeButton = cartSidebar.querySelector('.close-cart');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.closeCart());
    }
    
    const continueShopping = cartSidebar.querySelector('.continue-shopping-button');
    if (continueShopping) {
      continueShopping.addEventListener('click', () => this.closeCart());
    }
    
    // Quantity buttons
    const minusButtons = cartSidebar.querySelectorAll('.quantity-btn.minus');
    minusButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index);
        if (this.items[index].quantity > 1) {
          this.updateQuantity(index, this.items[index].quantity - 1);
        }
      });
    });
    
    const plusButtons = cartSidebar.querySelectorAll('.quantity-btn.plus');
    plusButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index);
        this.updateQuantity(index, this.items[index].quantity + 1);
      });
    });
    
    // Quantity input
    const quantityInputs = cartSidebar.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        const index = parseInt(input.dataset.index);
        this.updateQuantity(index, parseInt(input.value));
      });
    });
    
    // Remove buttons
    const removeButtons = cartSidebar.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index);
        this.removeItem(index);
      });
    });
    
    // Checkout button
    const checkoutButton = cartSidebar.querySelector('.checkout-button');
    if (checkoutButton && !checkoutButton.disabled) {
      checkoutButton.addEventListener('click', () => {
        // Check if user is logged in
        if (isLoggedIn()) {
          // Redirect to checkout page
          window.location.href = `${siteBaseUrl}/checkout.html`;
        } else {
          // Show login modal
          showLoginModal('checkout');
        }
      });
    }
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
    this.renderCartIcon();
  }
}

// Initialize cart
const cart = new ShoppingCart();

// Add cart icon to header
function addCartIconToHeader() {
  const header = document.querySelector('.header-container');
  if (!header) return;
  
  const cartIconContainer = document.createElement('div');
  cartIconContainer.className = 'cart-icon-container';
  
  cartIconContainer.innerHTML = `
    <div id="cart-icon" class="cart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
    </div>
  `;
  
  header.appendChild(cartIconContainer);
  
  // Add event listener
  document.getElementById('cart-icon').addEventListener('click', () => {
    cart.openCart();
  });
  
  // Initialize cart icon
  cart.renderCartIcon();
}

// Add to cart function for product pages
function initializeProductPage() {
  const addToCartForm = document.querySelector('.add-to-cart-form');
  if (!addToCartForm) return;
  
  addToCartForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get product details
    const productName = document.querySelector('h1').textContent;
    const productPrice = parseFloat(document.querySelector('[data-product-price]').dataset.productPrice);
    const productImage = document.querySelector('.gallery-image.active').src;
    const productId = document.querySelector('[data-product-id]').dataset.productId;
    const productSize = document.querySelector('#product-size').value;
    const productQuantity = parseInt(document.querySelector('#product-quantity').value);
    
    // Add to cart
    cart.addItem({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      size: productSize,
      quantity: productQuantity
    });
  });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  addCartIconToHeader();
  initializeProductPage();
});
