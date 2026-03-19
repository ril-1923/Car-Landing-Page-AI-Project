function scrollToCollection() {
  const collection = document.getElementById('collection');
  if (collection) {
    collection.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateStats = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target + (stat.nextElementSibling.textContent.includes('Satisfaction') ? '%' : '+');
          }
        };

        updateCounter();
      });
    };

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  const carCards = document.querySelectorAll('.car-card, .gallery-card');
  carCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
    });
  });
});
