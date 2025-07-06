/*=============== TYPEWRITER EFFECT ===============*/
class TypeWriter {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

/*=============== IMAGE HANDLER ===============*/
class ImageHandler {
    constructor() {
        this.imageContainer = document.getElementById('imageContainer');
        this.profileImage = document.getElementById('profileImage');
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.closeModal = document.getElementById('closeModal');
        
        this.init();
    }

    init() {
        // Check image type when page loads
        this.checkImageType();
        
        // Add click event to image
        this.profileImage.addEventListener('click', () => {
            this.handleImageClick();
        });

        // Modal close events
        this.closeModal.addEventListener('click', () => {
            this.closeImageModal();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeImageModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeImageModal();
            }
        });
    }

    checkImageType() {
        const imageSrc = this.profileImage.src;
        const isPNG = imageSrc.toLowerCase().includes('.png');
        
        if (!isPNG) {
            this.applySquareContainer();
        }
    }

    applySquareContainer() {
        // Add square container class with animation
        this.imageContainer.classList.add('square-container');
        
        // Add entrance animation
        setTimeout(() => {
            this.imageContainer.style.transform = 'scale(1)';
        }, 100);
    }

    handleImageClick() {
        const imageSrc = this.profileImage.src;
        const isPNG = imageSrc.toLowerCase().includes('.png');
        
        if (!isPNG) {
            this.openImageModal();
        }
    }

    openImageModal() {
        this.modalImage.src = this.profileImage.src;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeImageModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/*=============== SCROLL HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll_header');
    } else {
        header.classList.remove('scroll_header');
    }
}

/*=============== NAVIGATION MENU ===============*/
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
}

/*=============== SMOOTH SCROLLING ===============*/
function setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/*=============== INITIALIZE EVERYTHING ===============*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        'Flutter Developer',
        'Mobile App Developer',
        'UI/UX Designer',
        'Full Stack Developer'
    ];
    
    new TypeWriter(typewriterElement, texts, 120, 80, 2500);
    
    // Initialize image handler
    new ImageHandler();
    
    // Setup navigation
    setupNavigation();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Add scroll event listener
    window.addEventListener('scroll', scrollHeader);
});

/*=============== ADDITIONAL ANIMATIONS ===============*/
// Add entrance animations for elements
function addEntranceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.home__data, .home__social, .home__scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize entrance animations
document.addEventListener('DOMContentLoaded', addEntranceAnimations);

