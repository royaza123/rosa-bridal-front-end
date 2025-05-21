// auth.js - Authentication System
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.checkLoginStatus();
    this.renderAccountIcon();
  }

  // Check if user is logged in based on localStorage
  checkLoginStatus() {
    const userData = localStorage.getItem('rozaBridalUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      return true;
    }
    return false;
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Sign up new user
  signUp(userData) {
    // In a real implementation, this would call an API
    // For now, we'll just store in localStorage
    
    // Check if email already exists
    const existingUsers = this.getAllUsers();
    if (existingUsers.find(user => user.email === userData.email)) {
      throw new Error('Email already in use');
    }
    
    // Generate user ID
    userData.id = 'user_' + Date.now();
    
    // Add to "database"
    existingUsers.push(userData);
    localStorage.setItem('rozaBridalUsers', JSON.stringify(existingUsers));
    
    // Set as current user
    this.currentUser = userData;
    localStorage.setItem('rozaBridalUser', JSON.stringify(userData));
    
    this.renderAccountIcon();
    return userData;
  }

  // Sign in existing user
  signIn(email, password) {
    // Get all users from "database"
    const users = this.getAllUsers();
    
    // Find matching user
    const user = users.find(u => u.email === email);
    
    // Verify credentials
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Set as current user
    this.currentUser = user;
    localStorage.setItem('rozaBridalUser', JSON.stringify(user));
    
    this.renderAccountIcon();
    return user;
  }

  // Sign out user
  signOut() {
    this.currentUser = null;
    localStorage.removeItem('rozaBridalUser');
    this.renderAccountIcon();
  }

  // Get all users (from localStorage)
  getAllUsers() {
    const usersData = localStorage.getItem('rozaBridalUsers');
    return usersData ? JSON.parse(usersData) : [];
  }

  // Update user profile
  updateProfile(userData) {
    if (!this.currentUser) {
      throw new Error('Not logged in');
    }
    
    // Update in "database"
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === this.currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Preserve password if not changing it
    if (!userData.password) {
      userData.password = users[userIndex].password;
    }
    
    // Update user data
    users[userIndex] = { ...users[userIndex], ...userData };
    localStorage.setItem('rozaBridalUsers', JSON.stringify(users));
    
    // Update current user
    this.currentUser = users[userIndex];
    localStorage.setItem('rozaBridalUser', JSON.stringify(this.currentUser));
    
    this.renderAccountIcon();
    return this.currentUser;
  }

  // Render account icon in header
  renderAccountIcon() {
    let accountContainer = document.querySelector('.account-container');
    
    if (!accountContainer) {
      // Create account container if it doesn't exist
      const header = document.querySelector('.header-container');
      if (!header) return;
      
      accountContainer = document.createElement('div');
      accountContainer.className = 'account-container';
      
      // Insert before cart icon if it exists
      const cartIcon = header.querySelector('.cart-icon-container');
      if (cartIcon) {
        header.insertBefore(accountContainer, cartIcon);
      } else {
        header.appendChild(accountContainer);
      }
    }
    
    // Update content based on login status
    if (this.currentUser) {
      accountContainer.innerHTML = `
        <div class="account-icon logged-in">
          <span class="user-initial">${this.currentUser.firstName.charAt(0)}</span>
          <div class="account-dropdown">
            <div class="account-dropdown-header">
              <p>Hello, ${this.currentUser.firstName}!</p>
            </div>
            <ul class="account-dropdown-menu">
              <li><a href="${siteBaseUrl}/account.html">My Account</a></li>
              <li><a href="${siteBaseUrl}/orders.html">My Orders</a></li>
              <li><a href="${siteBaseUrl}/wishlist.html">Wishlist</a></li>
              <li><a href="#" id="sign-out-link">Sign Out</a></li>
            </ul>
          </div>
        </div>
      `;
      
      // Add event listener for sign out
      const signOutLink = accountContainer.querySelector('#sign-out-link');
      if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.signOut();
          window.location.reload();
        });
      }
    } else {
      accountContainer.innerHTML = `
        <div class="account-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
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
      
      // Add event listeners
      const signInLink = accountContainer.querySelector('#sign-in-link');
      if (signInLink) {
        signInLink.addEventListener('click', (e) => {
          e.preventDefault();
          showLoginModal();
        });
      }
      
      const createAccountLink = accountContainer.querySelector('#create-account-link');
      if (createAccountLink) {
        createAccountLink.addEventListener('click', (e) => {
          e.preventDefault();
          showSignupModal();
        });
      }
    }
  }
}

// Show login modal
function showLoginModal(redirectAfter = null) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'auth-modal';
  
  // Modal content
  modal.innerHTML = `
    <div class="auth-modal-content">
      <div class="auth-modal-header">
        <h2>Sign In</h2>
        <button class="close-modal">×</button>
      </div>
      <div class="auth-modal-body">
        <form id="login-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" required placeholder="Enter your email">
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" required placeholder="Enter your password">
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
  
  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  document.body.appendChild(overlay);
  
  // Prevent body scrolling
  document.body.classList.add('modal-open');
  
  // Show modal
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('show');
    overlay.remove();
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
  
  // Add event listeners
  const closeButton = modal.querySelector('.close-modal');
  closeButton.addEventListener('click', closeModal);
  
  overlay.addEventListener('click', closeModal);
  
  // Switch to signup
  const switchToSignup = modal.querySelector('#switch-to-signup');
  switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
    showSignupModal(redirectAfter);
  });
  
  // Handle form submission
  const loginForm = modal.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
      auth.signIn(email, password);
      closeModal();
      
      // Redirect if needed
      if (redirectAfter === 'checkout') {
        window.location.href = `${siteBaseUrl}/checkout.html`;
      } else {
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  });
}

// Show signup modal
function showSignupModal(redirectAfter = null) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'auth-modal';
  
  // Modal content
  modal.innerHTML = `
    <div class="auth-modal-content">
      <div class="auth-modal-header">
        <h2>Create Account</h2>
        <button class="close-modal">×</button>
      </div>
      <div class="auth-modal-body">
        <form id="signup-form">
          <div class="form-row">
            <div class="form-group">
              <label for="signup-firstname">First Name</label>
              <input type="text" id="signup-firstname" required placeholder="Enter your first name">
            </div>
            <div class="form-group">
              <label for="signup-lastname">Last Name</label>
              <input type="text" id="signup-lastname" required placeholder="Enter your last name">
            </div>
          </div>
          <div class="form-group">
            <label for="signup-email">Email</label>
            <input type="email" id="signup-email" required placeholder="Enter your email">
          </div>
          <div class="form-group">
            <label for="signup-password">Password</label>
            <input type="password" id="signup-password" required placeholder="Create a password" minlength="8">
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
  
  // Add overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  document.body.appendChild(overlay);
  
  // Prevent body scrolling
  document.body.classList.add('modal-open');
  
  // Show modal
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('show');
    overlay.remove();
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
  
  // Add event listeners
  const closeButton = modal.querySelector('.close-modal');
  closeButton.addEventListener('click', closeModal);
  
  overlay.addEventListener('click', closeModal);
  
  // Switch to login
  const switchToLogin = modal.querySelector('#switch-to-login');
  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
    showLoginModal(redirectAfter);
  });
  
  // Handle form submission
  const signupForm = modal.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userData = {
      firstName: document.getElementById('signup-firstname').value,
      lastName: document.getElementById('signup-lastname').value,
      email: document.getElementById('signup-email').value,
      password: document.getElementById('signup-password').value,
      createdAt: new Date().toISOString()
    };
    
    try {
      auth.signUp(userData);
      closeModal();
      
      // Redirect if needed
      if (redirectAfter === 'checkout') {
        window.location.href = `${siteBaseUrl}/checkout.html`;
      } else {
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  });
}

// Helper function to check if user is logged in
function isLoggedIn() {
  return auth.checkLoginStatus();
}

// Initialize site base URL
const siteBaseUrl = document.querySelector('meta[name="base-url"]')?.content || '';

// Initialize authentication system
const auth = new AuthSystem();

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize authentication UI
  auth.renderAccountIcon();
});
