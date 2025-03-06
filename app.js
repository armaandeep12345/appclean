// Intersection Observer to detect when stats are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(animateValue);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe the stats grid
const statsGrid = document.querySelector('.stats-grid');
observer.observe(statsGrid);

// Animation function for counting up
function animateValue(element) {
    element.classList.add('animate');
    
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;
    
    let current = 0;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepDuration);
}

// Intersection Observer for process steps animation
const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            stepsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe the steps container
const stepsContainer = document.querySelector('.steps-container');
stepsObserver.observe(stepsContainer);

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Add active class to clicked item
        item.classList.add('active');
    });
});

const categoryGrid = document.getElementById('categoryGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenItems = document.querySelectorAll('.category-item.hidden');
let isExpanded = false;

// Initially hide extra items
hiddenItems.forEach(item => {
    item.style.display = 'none';
});

showMoreBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    hiddenItems.forEach(item => {
        item.style.display = isExpanded ? 'flex' : 'none';
    });

    showMoreBtn.innerHTML = isExpanded ? 
        '<span>Show Less</span><i class="material-icons">expand_less</i>' : 
        '<span>Show More</span><i class="material-icons">expand_more</i>';
    
    // Add animation
    categoryGrid.style.opacity = '0.7';
    setTimeout(() => {
        categoryGrid.style.opacity = '1';
    }, 200);
});

// Add hover effect to category items
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.category-icon i');
        icon.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.category-icon i');
        icon.style.transform = 'scale(1)';
    });
});

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideInterval = 5000; // Change slide every 5 seconds

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Start automatic slideshow
let slideTimer = setInterval(nextSlide, slideInterval);

// Add click handlers for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideTimer);
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Restart automatic slideshow
        slideTimer = setInterval(nextSlide, slideInterval);
    });
});

function scheduleTime() {
    // Add your scheduling functionality here
    alert('Schedule timing functionality will be implemented here');
}

function trackLocation() {
    // Add your location tracking functionality here
    alert('Location tracking functionality will be implemented here');
}