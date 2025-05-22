// Main E-commerce functionality for Roza Bridal
class RozaBridalEcommerce {
  constructor() {
    this.cart = new ShoppingCart();
    this.auth = new AuthSystem();
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    this.setupHeaderIcons();
    this.initProductPage();
    this.initCheckoutPage();
  }

  setupHeaderIcons() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) {
      // Create header controls if it doesn't exist
      const header = document.querySelector('.header-container');
      if (header) {
        const controls = document.createElement('div');
        controls.className = 'header-controls';
        header.appendChild(controls);
        this.setupHeaderIcons(); // Recursive call
        return;
      }
    }

    // Setup both auth and cart icons
    this.auth.renderAccountIcon();
    this.cart.renderCartIcon();
  }

  initProductPage() {
    // Only run on product pages
    const productPage = document.querySelector('.product-page');
    if (!productPage) return;

    this.initProductForm();
    this.initImageGallery();
  }

  initProductForm() {
    // Check if we're on a product page with form elements
    const productForm = document.querySelector('.product-form') || this.createProductForm();
    if (!productForm) return;

    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddToCart(e);
    });
  }

  createProductForm() {
    // Create product form if it doesn't exist
    const productDetails = document.querySelector('.product-details');
    if (!productDetails) return null;

    const form = document.createElement('form');
    form.className = 'product-form';
    form.innerHTML = `
      <div class="product-options">
        <div class="form-group">
          <label for="product-size">Size:</label>
          <select id="product-size" required>
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="product-quantity">Quantity:</label>
          <div class="quantity-selector">
            <button type="button" class="quantity-btn minus">-</button>
            <input type="number" id="product-quantity" value="1" min="1" max="5">
            <button type="button" class="quantity-btn plus">+</button>
          </div>
        </div>
        
        <div class="product-price">$1,299.00</div>
        
        <button type="submit" class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    // Insert form before buy button
    const buyButton = productDetails.querySelector('.buy-button');
    if (buyButton) {
      productDetails.insertBefore(form, buyButton);
    } else {
      productDetails.appendChild(form);
    }

    // Setup quantity controls
    this.setupQuantityControls(form);

    return form;
  }

  setupQuantityControls(form) {
    const minusBtn = form.querySelector('.quantity-btn.minus');
    const plusBtn = form.querySelector('.quantity-btn.plus');
    const quantityInput = form.querySelector('#product-quantity');

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 5) {
          quantityInput.value = currentValue + 1;
        }
      });
    }
  }

  handleAddToCart(e) {
    const form = e.target;
    const sizeSelect = form.querySelector('#product-size');
    const quantityInput = form.querySelector('#product-quantity');

    if (!sizeSelect.value) {
      alert('Please select a size');
      return;
    }

    // Get product details from the page
    const productName = document.querySelector('h1').textContent;
    const productPrice = 1299; // You can extract this from the page or data attributes
    const productId = this.getProductIdFromUrl();
    const productImage = document.querySelector('.gallery-image.active')?.src || 
                        document.querySelector('.gallery-image')?.src;

    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      size: sizeSelect.value,
      quantity: parseInt(quantityInput.value)
    };

    this.cart.addItem(product);
  }

  getProductIdFromUrl() {
    const path = window.location.pathname;
    const segments = path.split('/');
    return segments[segments.length - 2] || segments[segments.length - 1] || 'unknown';
  }

  initImageGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const images = gallery.querySelectorAll('.gallery-image');
    if (images.length <= 1) return;

    let currentIndex = 0;
    let autoRotateInterval;

    // Create controls if they don't exist
    if (!gallery.querySelector('.gallery-controls')) {
      this.createGalleryControls(gallery, images);
    }

    const updateGallery = () => {
      images.forEach((img, index) => {
        img.classList.toggle('active', index === currentIndex);
      });
      
      const dots = gallery.querySelectorAll('.gallery-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateGallery();
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateGallery();
    };

    // Setup controls
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    const dots = gallery.querySelectorAll('.gallery-dot');

    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateGallery();
      });
    });

    // Auto-rotate
    const startAutoRotate = () => {
      autoRotateInterval = setInterval(nextImage, 5000);
    };

    const stopAutoRotate = () => {
      clearInterval(autoRotateInterval);
    };

    startAutoRotate();
    gallery.addEventListener('mouseenter', stopAutoRotate);
    gallery.addEventListener('mouseleave', startAutoRotate);
  }

  createGalleryControls(gallery, images) {
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';

    const prevArrow = document.createElement('div');
    prevArrow.className = 'gallery-arrow gallery-prev';
    prevArrow.innerHTML = '❮';

    const nextArrow = document.createElement('div');
    nextArrow.className = 'gallery-arrow gallery-next';
    nextArrow.innerHTML = '❯';

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-nav';

    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'gallery-dot';
      if (index === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    controls.appendChild(prevArrow);
    controls.appendChild(dotsContainer);
    controls.appendChild(nextArrow);
    gallery.appendChild(controls);
  }

  initCheckoutPage() {
    if (!document.querySelector('.checkout-container')) return;

    this.populateCheckoutSummary();
    this.prefillCheckoutForm();
    this.handleCheckoutSubmission();
  }

  populateCheckoutSummary() {
    const itemsContainer = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');

    if (!itemsContainer) return;

    const cartItems = this.cart.getItems();
    
    if (cartItems.length === 0) {
      window.location.href = window.location.origin;
      return;
    }

    // Populate items
    itemsContainer.innerHTML = cartItems.map(item => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
        <div class="checkout-item-details">
          <h4>${item.name}</h4>
          <div class="checkout-item-price">$${item.price.toFixed(2)}</div>
          <div class="checkout-item-meta">Size: ${item.size} | Qty: ${item.quantity}</div>
        </div>
      </div>
    `).join('');

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 2000 ? 0 : 50;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Update summary
    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : '$' + shipping.toFixed(2);
    if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
  }

  prefillCheckoutForm() {
    if (!this.auth.isLoggedIn()) return;

    const user = this.auth.getCurrentUser();
    const emailField = document.getElementById('checkout-email');
    const nameField = document.getElementById('checkout-name');

    if (emailField) emailField.value = user.email || '';
    if (nameField) nameField.value = `${user.firstName} ${user.lastName}` || '';
  }

  handleCheckoutSubmission() {
    const checkoutBtn = document.getElementById('place-order-button');
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener('click', () => {
      // Simple validation
      const form = document.querySelector('.checkout-form');
      const requiredFields = form.querySelectorAll('input[required], select[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) {
        alert('Please fill in all required fields');
        return;
      }

      // Process order
      alert('Order placed successfully! Thank you for shopping with Roza Bridal.');
      this.cart.clearCart();
      window.location.href = window.location.origin;
    });
  }
}

// Shopping Cart Class
class ShoppingCart {
  constructor() {
    this.items = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem('rozaBridalCart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  saveToStorage() {
    localStorage.setItem('rozaBridalCart', JSON.stringify(this.items));
  }

  addItem(product) {
    const existingIndex = this.items.findIndex(item => 
      item.id === product.id && item.size === product.size
    );

    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += product.quantity;
    } else {
      this.items.push({ ...product });
    }

    this.saveToStorage();
    this.renderCartIcon();
    this.showNotification(product.name);
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.saveToStorage();
    this.renderCartIcon();
  }

  updateQuantity(index, quantity) {
    if (quantity < 1) quantity = 1;
    this.items[index].quantity = quantity;
    this.saveToStorage();
    this.renderCartIcon();
  }

  getItems() {
    return this.items;
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.renderCartIcon();
  }

  renderCartIcon() {
    let cartIcon = document.querySelector('.cart-icon-container');
    
    if (!cartIcon) {
      const headerControls = document.querySelector('.header-controls');
      if (!headerControls) return;

      cartIcon = document.createElement('div');
      cartIcon.className = 'cart-icon-container';
      cartIcon.innerHTML = `
        <div class="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-count">0</span>
        </div>
      `;
      headerControls.appendChild(cartIcon);

      cartIcon.addEventListener('click', () => this.openCartDrawer());
    }

    const countEl = cartIcon.querySelector('.cart-count');
    const count = this.getItemCount();
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }

  showNotification(productName) {
    // Remove existing notification
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
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
      this.openCartDrawer();
    });

    // Show notification
    setTimeout(() => notification.classList.add('visible'), 10);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  openCartDrawer() {
    let cartDrawer = document.querySelector('.cart-drawer');
    
    if (!cartDrawer) {
      cartDrawer = document.createElement('div');
      cartDrawer.className = 'cart-drawer';
      document.body.appendChild(cartDrawer);
    }

    this.renderCartDrawer();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => this.closeCartDrawer());

    // Show drawer
    setTimeout(() => {
      cartDrawer.classList.add('open');
      overlay.classList.add('visible');
    }, 10);
  }

  closeCartDrawer() {
    const cartDrawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-overlay');

    if (cartDrawer) cartDrawer.classList.remove('open');
    if (overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 300);
    }
  }

  renderCartDrawer() {
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
          this.items.map((item, index) => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-size">Size: ${item.size}</p>
                <p class="cart-item-price">${item.price.toFixed(2)}</p>
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
          `).join('')
        }
      </div>
      
      <div class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${this.getTotal().toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${this.getTotal().toFixed(2)}</span>
          </div>
        </div>
        
        <button class="checkout-button ${this.items.length === 0 ? 'disabled' : ''}" ${this.items.length === 0 ? 'disabled' : ''}>
          Proceed to Checkout
        </button>
        
        <button class="continue-shopping">Continue Shopping</button>
      </div>
    `;

    // Add event listeners
    this.addCartDrawerListeners(cartDrawer);
  }

  addCartDrawerListeners(cartDrawer) {
    // Close button
    const closeBtn = cartDrawer.querySelector('.close-cart');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    // Continue shopping
    const continueBtn = cartDrawer.querySelector('.continue-shopping');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    // Quantity controls
    const minusBtns = cartDrawer.querySelectorAll('.quantity-btn.minus');
    const plusBtns = cartDrawer.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = cartDrawer.querySelectorAll('.item-quantity');
    const removeBtns = cartDrawer.querySelectorAll('.remove-item');

    minusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        if (this.items[index].quantity > 1) {
          this.updateQuantity(index, this.items[index].quantity - 1);
          this.renderCartDrawer();
        }
      });
    });

    plusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.updateQuantity(index, this.items[index].quantity + 1);
        this.renderCartDrawer();
      });
    });

    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        const index = parseInt(input.dataset.index);
        this.updateQuantity(index, parseInt(input.value) || 1);
        this.renderCartDrawer();
      });
    });

    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        this.removeItem(index);
        this.renderCartDrawer();
      });
    });

    // Checkout button
    const checkoutBtn = cartDrawer.querySelector('.checkout-button');
    if (checkoutBtn && !checkoutBtn.disabled) {
      checkoutBtn.addEventListener('click', () => {
        if (window.rozaAuth && window.rozaAuth.isLoggedIn()) {
          window.location.href = window.location.origin + '/checkout.html';
        } else {
          this.closeCartDrawer();
          if (window.rozaAuth) {
            window.rozaAuth.showLoginModal('checkout');
          }
        }
      });
    }
  }
}

// Authentication System
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.loadFromStorage();
  }

  loadFromStorage() {
    const userData = localStorage.getItem('rozaBridalUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  saveToStorage() {
    if (this.currentUser) {
      localStorage.setItem('rozaBridalUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('rozaBridalUser');
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  signUp(userData) {
    // Validate required fields
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }

    // Check if email already exists
    const users = this.getAllUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already in use');
    }

    // Create new user
    const newUser = {
      ...userData,
      id: 'user_' + Date.now(),
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('rozaBridalUsers', JSON.stringify(users));

    // Set as current user
    this.currentUser = newUser;
    this.saveToStorage();
    this.renderAccountIcon();

    return newUser;
  }

  signIn(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    this.currentUser = user;
    this.saveToStorage();
    this.renderAccountIcon();

    return user;
  }

  signOut() {
    this.currentUser = null;
    localStorage.removeItem('rozaBridalUser');
    this.renderAccountIcon();
  }

  getAllUsers() {
    const usersData = localStorage.getItem('rozaBridalUsers');
    return usersData ? JSON.parse(usersData) : [];
  }

  renderAccountIcon() {
    let accountContainer = document.querySelector('.account-container');
    
    if (!accountContainer) {
      const headerControls = document.querySelector('.header-controls');
      if (!headerControls) return;

      accountContainer = document.createElement('div');
      accountContainer.className = 'account-container';
      
      // Insert before cart icon
      const cartIcon = headerControls.querySelector('.cart-icon-container');
      if (cartIcon) {
        headerControls.insertBefore(accountContainer, cartIcon);
      } else {
        headerControls.appendChild(accountContainer);
      }
    }

    if (this.currentUser) {
      // Logged in state
      accountContainer.innerHTML = `
        <div class="account-icon logged-in">
          <span class="user-initial">${this.currentUser.firstName.charAt(0)}</span>
          <div class="account-dropdown">
            <div class="account-dropdown-header">
              <p>Hello, ${this.currentUser.firstName}!</p>
            </div>
            <ul class="account-dropdown-menu">
              <li><a href="#" id="sign-out-link">Sign Out</a></li>
            </ul>
          </div>
        </div>
      `;

      const signOutLink = accountContainer.querySelector('#sign-out-link');
      if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.signOut();
          window.location.reload();
        });
      }
    } else {
      // Logged out state
      accountContainer.innerHTML = `
        <div class="account-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <div class="account-dropdown">
            <div class="account-dropdown-header">
              <p>Welcome!</p>
            </div>
            <ul class="account-dropdown-menu">
              <li><a href="#" id="sign-in-link">Sign In</a></li>
              <li><a href="#" id="create-account-link">Create Account</a></li>
            </ul>
          </div>
        </div>
      `;

      const signInLink = accountContainer.querySelector('#sign-in-link');
      const createAccountLink = accountContainer.querySelector('#create-account-link');

      if (signInLink) {
        signInLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.showLoginModal();
        });
      }

      if (createAccountLink) {
        createAccountLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.showSignupModal();
        });
      }
    }
  }

  showLoginModal(redirectAfter = null) {
    this.removeExistingModals();

    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    
    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2>Sign In</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="auth-modal-body">
          <form id="login-form">
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

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    setTimeout(() => modal.classList.add('visible'), 10);

    this.addModalListeners(modal, overlay, redirectAfter);
  }

  showSignupModal(redirectAfter = null) {
    this.removeExistingModals();

    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    
    modal.innerHTML = `
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2>Create Account</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="auth-modal-body">
          <form id="signup-form">
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

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    setTimeout(() => modal.classList.add('visible'), 10);

    this.addModalListeners(modal, overlay, redirectAfter, true);
  }

  addModalListeners(modal, overlay, redirectAfter, isSignup = false) {
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => this.closeModal(modal, overlay));
    
    overlay.addEventListener('click', () => this.closeModal(modal, overlay));

    if (isSignup) {
      const form = modal.querySelector('#signup-form');
      const switchBtn = modal.querySelector('#switch-to-login');
      
      switchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeModal(modal, overlay);
        this.showLoginModal(redirectAfter);
      });

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
          
          if (redirectAfter === 'checkout') {
            window.location.href = window.location.origin + '/checkout.html';
          } else {
            window.location.reload();
          }
        } catch (error) {
          alert(error.message);
        }
      });
    } else {
      const form = modal.querySelector('#login-form');
      const switchBtn = modal.querySelector('#switch-to-signup');
      
      switchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeModal(modal, overlay);
        this.showSignupModal(redirectAfter);
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
          this.signIn(email, password);
          this.closeModal(modal, overlay);
          
          if (redirectAfter === 'checkout') {
            window.location.href = window.location.origin + '/checkout.html';
          } else {
            window.location.reload();
          }
        } catch (error) {
          alert(error.message);
        }
      });
    }
  }

  closeModal(modal, overlay) {
    modal.classList.remove('visible');
    setTimeout(() => {
      modal.remove();
      overlay.remove();
    }, 300);
  }

  removeExistingModals() {
    const existingModal = document.querySelector('.auth-modal');
    const existingOverlay = document.querySelector('.modal-overlay');
    
    if (existingModal) existingModal.remove();
    if (existingOverlay) existingOverlay.remove();
  }
}

// Global instances
let rozaEcommerce;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    rozaEcommerce = new RozaBridalEcommerce();
    
    // Make auth available globally for checkout redirect
    window.rozaAuth = rozaEcommerce.auth;
  });
} else {
  rozaEcommerce = new RozaBridalEcommerce();
  window.rozaAuth = rozaEcommerce.auth;
}
