// main-ecommerce.js - Enhanced E-commerce Integration for Roza Bridal with Custom Products

// Site Base URL
const siteBaseUrl = document.querySelector('meta[name="base-url"]')?.content || '';

// Complete Product Database
const PRODUCTS = {
  'minimalist-off-shoulder-satin-dress': {
    name: 'Minimalist Off Shoulder Satin Wedding Dress',
    price: 295.47,
    originalPrice: 350.00,
    id: 'minimalist-off-shoulder-satin-dress',
    image: 'minimalist-off-shoulder-satin-wedding-dress/main.webp'
  },
  'sexy-sequin-mermaid-wedding-dress': {
    name: 'Sexy Sequin Mermaid Wedding Dress',
    price: 111.78,
    originalPrice: 150.00,
    id: 'sexy-sequin-mermaid-wedding-dress',
    image: 'sexy-sequin-mermaid-wedding-dress/main.webp'
  },
  'boho-beach-wedding-dress': {
    name: 'Boho Beach Wedding Dress',
    price: 121.56,
    originalPrice: 160.00,
    id: 'boho-beach-wedding-dress',
    image: 'boho-beach-wedding-dress/main.webp'
  },
  'boho': {
    name: 'Boho Wedding Dress Elegant',
    price: 298.43,
    originalPrice: 380.00,
    id: 'boho',
    image: 'boho-wedding-dress-elegant/main.webp'
  },
  'modest-satin-wedding-dress': {
    name: 'Modest Satin Wedding Dress',
    price: 184.65,
    originalPrice: 230.00,
    id: 'modest-satin-wedding-dress',
    image: 'modest-satin-wedding-dress/main.webp'
  },
  'sexy-fishtail-bridal-gown': {
    name: 'Sexy Fishtail Bridal Gown',
    price: 279.83,
    originalPrice: 340.00,
    id: 'sexy-fishtail-bridal-gown',
    image: 'sexy-fishtail-bridal-gown/main.webp'
  },
  'floral-bridal-dress': {
    name: 'Floral Bridal Dress',
    price: 149.64,
    originalPrice: 190.00,
    id: 'floral-bridal-dress',
    image: 'floral-bridal-dress-ladies-wedding-gown/main.webp'
  },
  'custom-lace-mermaid-wedding-dress': {
    name: 'Custom Lace Mermaid Wedding Dress',
    price: 175.32,
    originalPrice: 220.00,
    id: 'custom-lace-mermaid-wedding-dress',
    image: 'custom-lace-mermaid-wedding-dress/main.webp'
  },
  'custom-lace-mermaid-wedding-dress-v-neck': {
    name: 'Custom Lace Mermaid Wedding Dress V-Neck',
    price: 222.61,
    originalPrice: 280.00,
    id: 'custom-lace-mermaid-wedding-dress-v-neck',
    image: 'custom-lace-mermaid-wedding-dress-v-neck/picture 1.webp'
  },
  'gorgeous-ivory-mermaid-wedding-gown': {
    name: 'Gorgeous Ivory Mermaid Wedding Gown',
    price: 197.52,
    originalPrice: 250.00,
    id: 'gorgeous-ivory-mermaid-wedding-gown',
    image: 'gorgeous-ivory-mermaid-wedding-gown/main.webp'
  },
  'elegant-ivory-satin-bridal-gown': {
    name: 'Elegant Ivory Satin Bridal Gown',
    price: 198.42,
    originalPrice: 250.00,
    id: 'elegant-ivory-satin-bridal-gown',
    image: 'elegant-ivory-satin-bridal-gown/main.webp'
  }
};

// Make products globally available
window.PRODUCTS = PRODUCTS;

// Get product info by ID
function getProductInfo(productId) {
  return PRODUCTS[productId] || null;
}

// Get current product ID from URL
function getCurrentProductId() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop().replace('.html', '');
  return filename;
}

// Shopping Cart Class - Enhanced for Custom Products
class ShoppingCart {
  constructor() {
    this.items = [];
    this.loadFromLocalStorage();
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
    // For custom products, always add as new item (don't combine)
    if (product.isCustom) {
      this.items.push(product);
    } else {
      // Check if regular item already exists with same size
      const existingItem = this.items.find(item => 
        item.id === product.id && item.size === product.size && !item.isCustom
      );
      
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        this.items.push(product);
      }
    }
    
    this.saveToLocalStorage();
    this.updateCartIcon();
    this.showNotification(product.name, product.isCustom);
  }
  
  // Remove item from cart
  removeItem(index) {
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.updateCartIcon();
    this.updateCartDrawer();
  }
  
  // Update item quantity
  updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    this.items[index].quantity = quantity;
    this.saveToLocalStorage();
    this.updateCartIcon();
    this.updateCartDrawer();
  }
  
  // Calculate cart total
  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  // Get number of items in cart
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
  
  // Setup cart icon in header
  setupCartIcon() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;
    
    // Create cart icon
    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span class="cart-count">0</span>
    `;
    
    headerControls.appendChild(cartIcon);
    
    // Add event listener
    cartIcon.addEventListener('click', () => {
      this.openCartDrawer();
    });
    
    this.updateCartIcon();
  }
  
  // Update cart icon count
  updateCartIcon() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const count = this.getItemCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  
  // Show added to cart notification - Enhanced for custom products
  showNotification(productName, isCustom = false) {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const message = isCustom ? 
      `Your custom ${productName} has been added to cart! 🎨` : 
      `${productName} added to your cart`;
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
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
      this.openCartDrawer();
    });
    
    // Make notification visible
    setTimeout(() => {
      notification.classList.add('visible');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  
  // Open cart drawer
  openCartDrawer() {
    // Create cart drawer if it doesn't exist
    let cartDrawer = document.querySelector('.cart-drawer');
    
    if (!cartDrawer) {
      cartDrawer = document.createElement('div');
      cartDrawer.className = 'cart-drawer';
      document.body.appendChild(cartDrawer);
    }
    
    // Update cart drawer content
    this.updateCartDrawer();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);
    
    // Add event listener to overlay
    overlay.addEventListener('click', () => {
      this.closeCartDrawer();
    });
    
    // Show cart drawer
    setTimeout(() => {
      cartDrawer.classList.add('open');
      overlay.classList.add('visible');
    }, 10);
  }
  
  // Close cart drawer
  closeCartDrawer() {
    const cartDrawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartDrawer) {
      cartDrawer.classList.remove('open');
    }
    
    if (overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 300);
    }
  }
  
  // Update cart drawer content - Enhanced for custom products
  updateCartDrawer() {
    const cartDrawer = document.querySelector('.cart-drawer');
    if (!cartDrawer) return;
    
    cartDrawer.innerHTML = `
      <div class="cart-drawer-header">
        <h3>Your Cart (${this.getItemCount()})</h3>
        <button class="close-cart">&times;</button>
      </div>
      
      <div class="cart-items">
        ${this.items.length === 0 ? 
          '<div class="cart-empty">Your cart is empty</div>' : 
          this.items.map((item, index) => this.renderCartItem(item, index)).join('')
        }
      </div>
      
      <div class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${this.calculateTotal().toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>$${this.calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        
        <button class="checkout-button ${this.items.length === 0 ? 'disabled' : ''}" ${this.items.length === 0 ? 'disabled' : ''}>
          Proceed to Checkout
        </button>
        
        <button class="continue-shopping">Continue Shopping</button>
      </div>
    `;
    
    // Add event listeners
    const closeBtn = cartDrawer.querySelector('.close-cart');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCartDrawer());
    }
    
    const continueShopping = cartDrawer.querySelector('.continue-shopping');
    if (continueShopping) {
      continueShopping.addEventListener('click', () => this.closeCartDrawer());
    }
    
    // Quantity buttons
    const minusBtns = cartDrawer.querySelectorAll('.quantity-btn.minus');
    minusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        if (this.items[index].quantity > 1) {
          this.updateQuantity(index, this.items[index].quantity - 1);
        }
      });
    });
    
    const plusBtns = cartDrawer.querySelectorAll('.quantity-btn.plus');
    plusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.updateQuantity(index, this.items[index].quantity + 1);
      });
    });
    
    // Quantity inputs
    const quantityInputs = cartDrawer.querySelectorAll('.item-quantity');
    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        const index = parseInt(input.dataset.index);
        this.updateQuantity(index, parseInt(input.value) || 1);
      });
    });
    
    // Remove buttons
    const removeBtns = cartDrawer.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.removeItem(index);
      });
    });
    
    // Checkout button
    const checkoutBtn = cartDrawer.querySelector('.checkout-button');
    if (checkoutBtn && !checkoutBtn.disabled) {
      checkoutBtn.addEventListener('click', () => {
        // Check if user is logged in
        if (auth.isLoggedIn()) {
          // Redirect to checkout page
          window.location.href = `${siteBaseUrl}/checkout.html`;
        } else {
          // Show login modal
          this.closeCartDrawer();
          auth.showLoginModal('checkout');
        }
      });
    }
  }
  
  // Render individual cart item - Enhanced for custom products
  renderCartItem(item, index) {
    const customizationDetails = item.isCustom && item.customizations ? 
      `<div class="cart-item-customizations">
        <small style="color: #c9a96e; font-weight: 600;">✨ Custom Design:</small><br>
        <small style="color: #666;">
          ${item.customizations.style} • ${item.customizations.neckline} • ${item.customizations.color}<br>
          ${item.customizations.fabric} • ${item.customizations.train}
          ${item.customizations.specialRequests ? '<br>Special: ' + item.customizations.specialRequests.substring(0, 50) + '...' : ''}
        </small>
      </div>` : '';
    
    return `
      <div class="cart-item">
        <img src="${siteBaseUrl}/assets/images/${item.image || 'placeholder.jpg'}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-size">Size: ${item.size}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          ${customizationDetails}
          <div class="cart-item-actions">
            <div class="quantity-selector">
              <button class="quantity-btn minus" data-index="${index}">-</button>
              <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-index="${index}">
              <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Clear cart
  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
    this.updateCartIcon();
  }
}

// Authentication Class (unchanged)
class Authentication {
  constructor() {
    this.currentUser = null;
    this.loadUserFromLocalStorage();
  }
  
  // Load user from localStorage
  loadUserFromLocalStorage() {
    const userData = localStorage.getItem('rozaBridalUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }
  
  // Save user to localStorage
  saveUserToLocalStorage() {
    if (this.currentUser) {
      localStorage.setItem('rozaBridalUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('rozaBridalUser');
    }
  }
  
  // Setup user icon in header
  setupUserIcon() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;
    
    // Create user icon
    const userIcon = document.createElement('div');
    userIcon.className = 'user-icon';
    
    if (this.currentUser) {
      // Logged in state
      userIcon.innerHTML = `
        <div class="user-initial">${this.currentUser.firstName.charAt(0)}</div>
        <div class="account-dropdown">
          <div class="account-dropdown-header">
            <p>Hello, ${this.currentUser.firstName}!</p>
          </div>
          <ul class="account-dropdown-menu">
            <li><a href="${siteBaseUrl}/account.html">My Account</a></li>
            <li><a href="${siteBaseUrl}/orders.html">My Orders</a></li>
            <li><a href="#" id="sign-out-btn">Sign Out</a></li>
          </ul>
        </div>
      `;
    } else {
      // Logged out state
      userIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <div class="account-dropdown">
          <div class="account-dropdown-header">
            <p>Welcome!</p>
          </div>
          <ul class="account-dropdown-menu">
            <li><a href="#" id="sign-in-btn">Sign In</a></li>
            <li><a href="#" id="sign-up-btn">Create Account</a></li>
          </ul>
        </div>
      `;
    }
    
    // Insert before cart icon
    const cartIcon = headerControls.querySelector('.cart-icon');
    if (cartIcon) {
      headerControls.insertBefore(userIcon, cartIcon);
    } else {
      headerControls.appendChild(userIcon);
    }
    
    // Add event listeners
    if (this.currentUser) {
      const signOutBtn = userIcon.querySelector('#sign-out-btn');
      if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.signOut();
        });
      }
    } else {
      const signInBtn = userIcon.querySelector('#sign-in-btn');
      if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.showLoginModal();
        });
      }
      
      const signUpBtn = userIcon.querySelector('#sign-up-btn');
      if (signUpBtn) {
        signUpBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.showSignupModal();
        });
      }
    }
  }
  
  // Check if user is logged in
  isLoggedIn() {
    return !!this.currentUser;
  }
  
  // Sign in user
  signIn(email, password) {
    // In a real implementation, this would call an API
    // For demo purposes, we'll use localStorage
    
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Set current user
    this.currentUser = user;
    this.saveUserToLocalStorage();
    
    // Update UI
    this.updateUI();
    
    return user;
  }
  
  // Sign up new user
  signUp(userData) {
    // Validate data
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }
    
    // Check if email already exists
    const users = this.getAllUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already in use');
    }
    
    // Create user with ID
    const newUser = {
      ...userData,
      id: 'user_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    
    // Save to "database"
    users.push(newUser);
    localStorage.setItem('rozaBridalUsers', JSON.stringify(users));
    
    // Set as current user
    this.currentUser = newUser;
    this.saveUserToLocalStorage();
    
    // Update UI
    this.updateUI();
    
    return newUser;
  }
  
  // Sign out user
  signOut() {
    this.currentUser = null;
    localStorage.removeItem('rozaBridalUser');
    
    // Update UI
    this.updateUI();
    
    // Redirect to home page
    window.location.href = siteBaseUrl + '/';
  }
  
  // Get all users
  getAllUsers() {
    const usersData = localStorage.getItem('rozaBridalUsers');
    return usersData ? JSON.parse(usersData) : [];
  }
  
  // Update UI after auth changes
  updateUI() {
    // Remove existing user icon
    const existingIcon = document.querySelector('.user-icon');
    if (existingIcon) {
      existingIcon.parentNode.removeChild(existingIcon);
    }
    
    // Setup user icon again
    this.setupUserIcon();
  }
  
  // Show login modal
  showLoginModal(redirectAfter = null) {
    // Remove existing modals
    this.removeExistingModals();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    
    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2>Sign In</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="auth-modal-body">
          <form class="auth-form" id="login-form">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" required>
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <input type="password" id="login-password" required>
            </div>
            <div class="form-group">
              <button type="submit" class="submit-button">Sign In</button>
            </div>
            <div class="auth-modal-footer">
              <p>Don't have an account? <a href="#" id="switch-to-signup">Create one now</a></p>
            </div>
          </form>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    
    // Show modal
    setTimeout(() => {
      modal.classList.add('visible');
    }, 10);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      this.closeModal(modal, overlay);
    });
    
    overlay.addEventListener('click', () => {
      this.closeModal(modal, overlay);
    });
    
    // Switch to signup
    const switchBtn = modal.querySelector('#switch-to-signup');
    switchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal(modal, overlay);
      this.showSignupModal(redirectAfter);
    });
    
    // Handle form submission
    const form = modal.querySelector('#login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      try {
        this.signIn(email, password);
        this.closeModal(modal, overlay);
        
        // Redirect if needed
        if (redirectAfter === 'checkout') {
          window.location.href = `${siteBaseUrl}/checkout.html`;
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }
  
  // Show signup modal
  showSignupModal(redirectAfter = null) {
    // Remove existing modals
    this.removeExistingModals();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    
    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2>Create Account</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="auth-modal-body">
          <form class="auth-form" id="signup-form">
            <div class="form-row">
              <div class="form-group">
                <label for="signup-firstname">First Name</label>
                <input type="text" id="signup-firstname" required>
              </div>
              <div class="form-group">
                <label for="signup-lastname">Last Name</label>
                <input type="text" id="signup-lastname" required>
              </div>
            </div>
            <div class="form-group">
              <label for="signup-email">Email</label>
              <input type="email" id="signup-email" required>
            </div>
            <div class="form-group">
              <label for="signup-password">Password</label>
              <input type="password" id="signup-password" required minlength="8">
              <p class="password-hint">Password must be at least 8 characters</p>
            </div>
            <div class="form-group">
              <button type="submit" class="submit-button">Create Account</button>
            </div>
            <div class="auth-modal-footer">
              <p>Already have an account? <a href="#" id="switch-to-login">Sign in</a></p>
            </div>
          </form>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
    
    // Show modal
    setTimeout(() => {
      modal.classList.add('visible');
    }, 10);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      this.closeModal(modal, overlay);
    });
    
    overlay.addEventListener('click', () => {
      this.closeModal(modal, overlay);
    });
    
    // Switch to login
    const switchBtn = modal.querySelector('#switch-to-login');
    switchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal(modal, overlay);
      this.showLoginModal(redirectAfter);
    });
    
    // Handle form submission
    const form = modal.querySelector('#signup-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userData = {
        firstName: document.getElementById('signup-firstname').value,
        lastName: document.getElementById('signup-lastname').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value
      };
      
      try {
        this.signUp(userData);
        this.closeModal(modal, overlay);
        
        // Redirect if needed
        if (redirectAfter === 'checkout') {
          window.location.href = `${siteBaseUrl}/checkout.html`;
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }
  
  // Close modal
  closeModal(modal, overlay) {
    modal.classList.remove('visible');
    
    setTimeout(() => {
      modal.remove();
      overlay.remove();
    }, 300);
  }
  
  // Remove existing modals
  removeExistingModals() {
    const existingModal = document.querySelector('.auth-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    const existingOverlay = document.querySelector('.modal-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
  }
}

// Initialize cart and auth
const cart = new ShoppingCart();
const auth = new Authentication();

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
 // Setup header icons
 cart.setupCartIcon();
 auth.setupUserIcon();
 
 // Initialize product page functionality
 initializeProductPage();
 
 // Load and display product prices
 loadProductPrices();
});

// Load product prices on current page
function loadProductPrices() {
 const currentProductId = getCurrentProductId();
 const productInfo = getProductInfo(currentProductId);
 
 if (productInfo) {
   // Update product price display
   const priceElement = document.getElementById('product-price');
   const originalPriceElement = document.getElementById('original-price');
   
   if (priceElement) {
     priceElement.textContent = `$${productInfo.price.toFixed(2)}`;
   }
   
   if (originalPriceElement && productInfo.originalPrice) {
     originalPriceElement.textContent = `$${productInfo.originalPrice.toFixed(2)}`;
   }
   
   // Update customize button with correct price
   const customizeButtons = document.querySelectorAll('.customize-button, [onclick*="openCustomizationModal"]');
   customizeButtons.forEach(button => {
     button.onclick = () => {
       if (typeof openCustomizationModal === 'function') {
         openCustomizationModal(productInfo.name, productInfo.price, `${siteBaseUrl}/assets/images/${productInfo.image}`, productInfo.id);
       }
     };
   });
 }
}

// Initialize product page functionality
function initializeProductPage() {
 // Only run on product pages
 if (!document.querySelector('.product-page')) return;
 
 // Setup Add to Cart buttons for regular products
 const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
 addToCartButtons.forEach(button => {
   button.addEventListener('click', function() {
     const productId = getCurrentProductId();
     const productInfo = getProductInfo(productId);
     
     if (productInfo) {
       // Show size selection modal or add directly
       showSizeSelectionModal(productInfo);
     }
   });
 });
}

// Show size selection modal for regular add to cart
function showSizeSelectionModal(productInfo) {
 const modal = document.createElement('div');
 modal.className = 'size-modal';
 modal.innerHTML = `
   <div class="size-modal-content">
     <div class="size-modal-header">
       <h3>Select Size</h3>
       <button class="close-size-modal">&times;</button>
     </div>
     <div class="size-modal-body">
       <p>Choose your size for <strong>${productInfo.name}</strong></p>
       <div class="size-options">
         <button class="size-btn" data-size="XS">XS</button>
         <button class="size-btn" data-size="S">S</button>
         <button class="size-btn" data-size="M">M</button>
         <button class="size-btn" data-size="L">L</button>
         <button class="size-btn" data-size="XL">XL</button>
         <button class="size-btn" data-size="XXL">XXL</button>
       </div>
       <div class="quantity-section">
         <label>Quantity:</label>
         <div class="quantity-selector">
           <button class="qty-btn minus">-</button>
           <input type="number" class="qty-input" value="1" min="1" max="10">
           <button class="qty-btn plus">+</button>
         </div>
       </div>
       <button class="add-to-cart-final" disabled>Add to Cart - $${productInfo.price.toFixed(2)}</button>
     </div>
   </div>
 `;
 
 document.body.appendChild(modal);
 
 // Add event listeners
 let selectedSize = '';
 let quantity = 1;
 
 // Size selection
 modal.querySelectorAll('.size-btn').forEach(btn => {
   btn.addEventListener('click', function() {
     modal.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
     this.classList.add('selected');
     selectedSize = this.dataset.size;
     modal.querySelector('.add-to-cart-final').disabled = false;
   });
 });
 
 // Quantity controls
 const qtyInput = modal.querySelector('.qty-input');
 modal.querySelector('.qty-btn.minus').addEventListener('click', () => {
   if (quantity > 1) {
     quantity--;
     qtyInput.value = quantity;
     updateFinalPrice();
   }
 });
 
 modal.querySelector('.qty-btn.plus').addEventListener('click', () => {
   if (quantity < 10) {
     quantity++;
     qtyInput.value = quantity;
     updateFinalPrice();
   }
 });
 
 qtyInput.addEventListener('input', () => {
   quantity = Math.max(1, Math.min(10, parseInt(qtyInput.value) || 1));
   qtyInput.value = quantity;
   updateFinalPrice();
 });
 
 function updateFinalPrice() {
   const finalBtn = modal.querySelector('.add-to-cart-final');
   finalBtn.textContent = `Add to Cart - $${(productInfo.price * quantity).toFixed(2)}`;
 }
 
 // Close modal
 modal.querySelector('.close-size-modal').addEventListener('click', () => {
   modal.remove();
 });
 
 // Add to cart
 modal.querySelector('.add-to-cart-final').addEventListener('click', () => {
   if (selectedSize) {
     const cartItem = {
       id: productInfo.id,
       name: productInfo.name,
       price: productInfo.price,
       quantity: quantity,
       size: selectedSize,
       image: productInfo.image,
       isCustom: false
     };
     
     cart.addItem(cartItem);
     modal.remove();
   }
 });
 
 // Show modal
 setTimeout(() => modal.classList.add('visible'), 10);
}
