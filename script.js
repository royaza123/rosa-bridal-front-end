// Main JavaScript for Roza Bridal

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Image gallery carousel functionality
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const images = gallery.querySelectorAll('img');
    let currentIndex = 0;
    let autoRotateInterval;
    
    // Create gallery controls
    const controls = document.createElement('div');
    controls.className = 'gallery-controls';
    gallery.appendChild(controls);
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-nav';
    
    // Create previous arrow
    const prevArrow = document.createElement('div');
    prevArrow.className = 'gallery-arrow gallery-prev';
    prevArrow.innerHTML = '❮';
    controls.appendChild(prevArrow);
    
    // Create next arrow
    const nextArrow = document.createElement('div');
    nextArrow.className = 'gallery-arrow gallery-next';
    nextArrow.innerHTML = '❯';
    controls.appendChild(nextArrow);
    
    // Initialize the first image as active
    images[0].classList.add('active');
    
    // Create dots based on number of images
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'gallery-dot';
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateGallery();
      });
      
      dotsContainer.appendChild(dot);
    });
    
    controls.appendChild(dotsContainer);
    
    // Update gallery function
    function updateGallery() {
      images.forEach(img => img.classList.remove('active'));
      document.querySelectorAll('.gallery-dot').forEach(dot => dot.classList.remove('active'));
      
      images[currentIndex].classList.add('active');
      document.querySelectorAll('.gallery-dot')[currentIndex].classList.add('active');
    }
    
    // Next image function
    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      updateGallery();
    }
    
    // Previous image function
    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateGallery();
    }
    
    // Event listeners for arrows
    nextArrow.addEventListener('click', nextImage);
    prevArrow.addEventListener('click', prevImage);
    
    // Auto-rotate images every 5 seconds
    function startAutoRotate() {
      autoRotateInterval = setInterval(nextImage, 5000);
    }
    
    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }
    
    startAutoRotate();
    
    // Pause auto-rotation when hovering over gallery
    gallery.addEventListener('mouseenter', stopAutoRotate);
    
    // Resume auto-rotation when leaving gallery
    gallery.addEventListener('mouseleave', startAutoRotate);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    });
    
    // Add touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      if (touchEndX < touchStartX) {
        // Swipe left, go to next image
        nextImage();
      } else if (touchEndX > touchStartX) {
        // Swipe right, go to previous image
        prevImage();
      }
    }
  }

  // Reveal animations for sections as they scroll into view
  const revealElements = document.querySelectorAll('.section-title, .product-card, .about-text');
  
  function reveal() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add('active');
      }
    }
  }
  
  window.addEventListener('scroll', reveal);
  
  // Add active class to section titles and product cards initially
  document.querySelectorAll('.section-title, .product-card, .about-text').forEach(element => {
    element.classList.add('active');
  });
});
