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
        this.checkImageType();

        this.profileImage.addEventListener('click', () => {
            this.handleImageClick();
        });

        this.closeModal.addEventListener('click', () => {
            this.closeImageModal();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeImageModal();
            }
        });

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
        this.imageContainer.classList.add('square-container');

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
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
}

/*=============== SMOOTH SCROLLING ===============*/
function setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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

/*=============== ADDITIONAL ANIMATIONS ===============*/
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

    const animatedElements = document.querySelectorAll('.home__data, .home__social, .home__scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/*=============== ENHANCED SCROLL EFFECTS ===============*/
class ScrollEffects {
    constructor() {
        this.header = document.getElementById("header");
        this.scrollThreshold = 50;
        this.lastScrollY = 0;
        this.ticking = false;

        this.init();
    }

    init() {
        window.addEventListener("scroll", () => {
            this.requestTick();
        });

        this.initIntersectionObserver();
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateHeader();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateHeader() {
        const currentScrollY = window.scrollY;

        if (!this.header) return;

        if (currentScrollY >= this.scrollThreshold) {
            this.header.classList.add("scroll-header");
        } else {
            this.header.classList.remove("scroll-header");
        }

        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            this.header.classList.add("header-hidden");
        } else {
            this.header.classList.remove("header-hidden");
        }

        this.lastScrollY = currentScrollY;
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");

                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0) scale(1)";
                    }, delay);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            ".home__data > *, .home__social, .home__scroll, .floating-element"
        );

        animatedElements.forEach((el, index) => {
            el.dataset.delay = index * 100;
            el.style.opacity = "0";
            el.style.transform = "translateY(30px) scale(0.9)";
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(el);
        });
    }
}

/*=============== INITIALIZE EVERYTHING ===============*/
document.addEventListener('DOMContentLoaded', function () {
    // Typewriter
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        'Flutter Developer',
        'Mobile App Developer',
        'UI/UX Designer',
        'Full Stack Developer'
    ];
    new TypeWriter(typewriterElement, texts, 120, 80, 2500);

    // Image
    new ImageHandler();

    // Navigation
    setupNavigation();

    // Smooth scroll
    setupSmoothScrolling();

    // Scroll header
    window.addEventListener('scroll', scrollHeader);

    // Entrance animations
    addEntranceAnimations();

    // Scroll effects
    new ScrollEffects();

    // ✅ إخفاء أيقونات التواصل الفارغة
    const socialLinks = document.querySelectorAll('.home__social-link');
    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.trim() === '' || href.trim() === '#') {
            link.style.display = 'none';
        }
    });
});

/*=============== INSTAGRAM GRADIENT STYLE ===============*/
const instagramLink = document.querySelector(".home__social-link.instagram");
if (instagramLink) {
    const style = document.createElement("style");
    style.textContent = `
        .home__social-link.instagram::before {
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
        }
    `;
    document.head.appendChild(style);
}
// =============== TESTIMONIALS MANAGER ===============
/*=============== ENHANCED TESTIMONIALS SCRIPT ===============*/

/*=============== ENHANCED TESTIMONIALS SCRIPT ===============*/

class TestimonialsManager {
    constructor() {
        this.testimonialsData = [
            {
                id: 1,
                name: "أحمد محمد السعيد",
                role: "مدير تقني",
                message: "تجربة استثنائية مع فريق محترف جداً. تم تنفيذ المشروع بدقة عالية وفي الوقت المحدد. أنصح بالتعامل معهم بشدة لأي مشروع تقني.",
                avatar: "assets/img/avatars/avatar_1.png",
                signature: "assets/img/signatures/signature_1.png",
                rating: 5,
                date: "2024-01-01"
            },
            {
                id: 2,
                name: "فاطمة علي الزهراني",
                role: "مديرة مشاريع",
                message: "خدمة احترافية ومميزة تفوق التوقعات. الفريق متعاون ومتفهم لمتطلبات العمل. جودة عالية وتسليم في الوقت المناسب.",
                avatar: "../assets/img/emojiAvatar14.png",
                signature: "assets/img/signatures/signature_2.png",
                rating: 5,
                date: "2024-01-15"
            },
            {
                id: 3,
                name: "محمد حسن الأحمدي",
                role: "رائد أعمال",
                message: "تجربة رائعة ونتائج تفوق التوقعات بكثير. الفريق محترف ومتعاون ويهتم بأدق التفاصيل. سأتعامل معهم مرة أخرى بكل تأكيد.",
                avatar: "assets/img/avatars/avatar_3.png",
                signature: "assets/img/signatures/signature_3.png",
                rating: 5,
                date: "2024-02-01"
            },
            {
                id: 4,
                name: "سارة أحمد القحطاني",
                role: "مصممة جرافيك",
                message: "أفضل خدمة حصلت عليها على الإطلاق! الاهتمام بالتفاصيل والجودة العالية جعلتني أوصي بهم لجميع أصدقائي وزملائي في العمل.",
                avatar: "assets/img/avatars/avatar_4.png",
                signature: "assets/img/signatures/signature_4.png",
             
                date: "2024-02-15"
            },
            {
                id: 5,
                name: "عمر خالد المطيري",
                role: "مطور تطبيقات",
                message: "عمل متقن ومهني بكل معنى الكلمة. تم تنفيذ جميع المتطلبات بدقة عالية وفي الوقت المناسب. أشكركم على التعاون الرائع والنتائج المبهرة.",
                avatar: "../assets/img/emojiAvatar14.png",
                signature: "assets/img/signatures/signature_1.png",
               
                date: "2024-03-01"
            },
            {
                id: 6,
                name: "نورا عبدالله الشمري",
                role: "مديرة تسويق",
                message: "خدمة استثنائية وفريق عمل رائع. تم تجاوز توقعاتي بمراحل كثيرة. الجودة والاحترافية والالتزام بالمواعيد كان مثالياً.",
                avatar: "assets/img/avatars/avatar_2.png",
                signature: "assets/img/signatures/signature_2.png",
               
                date: "2024-03-15"
            }
        ];

        this.testimonialsTrack = document.getElementById('testimonialsTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('testimonialsIndicators');
        this.currentIndex = 0;
        this.isHovered = false;

        this.init();
    }

    init() {
        this.renderTestimonials();
        this.renderIndicators();
        this.setupEventListeners();
        this.setupInfiniteScroll();
    }

    renderTestimonials() {
        this.testimonialsTrack.innerHTML = '';
        
        // إنشاء ثلاث نسخ من البيانات لضمان التمرير اللانهائي السلس
        const triplicatedData = [...this.testimonialsData, ...this.testimonialsData, ...this.testimonialsData];
        
        triplicatedData.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.classList.add('testimonial__card');
            card.setAttribute('data-id', `${testimonial.id}-${Math.floor(index / this.testimonialsData.length)}`);

            const stars = Array(testimonial.rating).fill('<i class=\'bx bxs-star testimonial__star\'></i>').join('');

            card.innerHTML = `
                <div class="testimonial__header">
                    <div class="testimonial__avatar">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial__img">
                    </div>
                    <div class="testimonial__info">
                        <h3 class="testimonial__name">${testimonial.name}</h3>
                        <span class="testimonial__role">${testimonial.role}</span>
                    </div>
                </div>
                <div class="testimonial__content">
                    <p class="testimonial__message">\"${testimonial.message}\"</p>
                    <i class=\'bx bxs-quote-alt-right testimonial__quote\'></i>
                </div>
                <div class="testimonial__footer">
                  
                    <div class="testimonial__signature">
                        <img src="${testimonial.signature}" alt="Signature" class="testimonial__signature-img">
                    </div>
                </div>
            `;
            this.testimonialsTrack.appendChild(card);
        });
    }

    renderIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.indicatorsContainer.innerHTML = '';
        this.testimonialsData.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('testimonial__indicator');
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
    }

    setupEventListeners() {
        // أزرار التحكم
      

        // إيقاف الحركة عند التأشير على المنطقة الكاملة
        this.testimonialsTrack.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.pauseAnimation();
        });

        this.testimonialsTrack.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.resumeAnimation();
        });

        // إيقاف الحركة عند التأشير على الكروت الفردية
        this.setupCardHoverEvents();

        // التنقل بالكيبورد
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // إعادة تشغيل الحركة عند تغيير حجم الشاشة
        window.addEventListener('resize', () => {
            this.setupInfiniteScroll();
        });
    }

    setupCardHoverEvents() {
        const cards = this.testimonialsTrack.querySelectorAll('.testimonial__card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.pauseAnimation();
            });
            
            card.addEventListener('mouseleave', () => {
                if (!this.isHovered) {
                    this.resumeAnimation();
                }
            });
        });
    }

    setupInfiniteScroll() {
        // تأكد من أن الحركة تعمل بشكل صحيح
        this.resumeAnimation();
    }

    pauseAnimation() {
        this.testimonialsTrack.style.animationPlayState = 'paused';
    }

    resumeAnimation() {
        this.testimonialsTrack.style.animationPlayState = 'running';
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateIndicators();
        
        // إيقاف الحركة مؤقتاً للانتقال
        this.pauseAnimation();
        
        // استئناف الحركة بعد ثانية واحدة
        setTimeout(() => {
            if (!this.isHovered) {
                this.resumeAnimation();
            }
        }, 1000);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonialsData.length;
        this.updateIndicators();
        this.pauseAnimation();
        setTimeout(() => this.resumeAnimation(), 500);
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.testimonialsData.length) % this.testimonialsData.length;
        this.updateIndicators();
        this.pauseAnimation();
        setTimeout(() => this.resumeAnimation(), 500);
    }

    updateIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.indicatorsContainer.querySelectorAll('.testimonial__indicator').forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Method to add new testimonial dynamically
    addTestimonial(newTestimonial) {
        this.testimonialsData.push(newTestimonial);
        this.renderTestimonials();
        this.renderIndicators();
        this.setupCardHoverEvents();
    }
}

// Initialize the testimonials manager when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.testimonialsManager = new TestimonialsManager();
});


// start skills
const skills = [
  { name: "HTML5", icon: "html5", desc: "The foundation of web pages." },
  { name: "CSS3", icon: "css3", desc: "Styles and designs web pages." },
  { name: "JavaScript", icon: "javascript", desc: "Adds interactivity to web pages." },
  { name: "React JS", icon: "react", desc: "A library for UI components." },
  { name: "Next Js", icon: "nextdotjs", desc: "A React framework for SSR & SSG." },
  { name: "TypeScript", icon: "typescript", desc: "JS with static typing." },
  { name: "Firebase", icon: "firebase", desc: "Cloud-based backend service." },
  { name: "Git", icon: "git", desc: "Version control system." },
  { name: "GitHub", icon: "github", desc: "Cloud Git repository hosting." },
  { name: "Bootstrap", icon: "bootstrap", desc: "CSS framework for responsive design." },
  { name: "Tailwind", icon: "tailwindcss", desc: "Utility-first CSS framework." },
  { name: "Redux", icon: "redux", desc: "State management for React." },
  { name: "Swiper", icon: "swiper", desc: "Touch slider for smooth UI." },
  { name: "Postman", icon: "postman", desc: "API testing & documentation." },
];

let skillsGrid = document.querySelector(".skills-grid");

skills.forEach(skill=>{
  let card = document.createElement('div');
  card.className="skills-card";
  card.innerHTML = `
    <img src="https://cdn.simpleicons.org/${skill.icon}" alt="${skill.name}" />
    <h3>${skill.name}</h3>
    </br>
    <p>${skill.desc}</p>
  `;
  skillsGrid.appendChild(card);
});


// animation skills
let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

// Select the section you want to observe
let skillsGridSection = document.querySelector(".skills-grid-section");

// Start observing
observer.observe(skillsGridSection);

//end skills