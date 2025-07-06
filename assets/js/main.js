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
// =============== TESTIMONIALS MANAGER ===============
class TestimonialsManager {
    constructor() {
        this.currentIndex = 0;
        this.testimonials = [];
        this.autoScrollInterval = null;
        this.autoScrollDelay = 5000; // 5 seconds
        this.isAutoScrolling = true;
        
        // DOM Elements
        this.wrapper = document.getElementById("testimonialWrapper");
        this.dotsContainer = document.getElementById("testimonialDots");
        this.prevBtn = document.getElementById("prevBtn");
        this.nextBtn = document.getElementById("nextBtn");
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadTestimonials();
            this.renderTestimonials();
            this.createDots();
            this.bindEvents();
            this.startAutoScroll();
        } catch (error) {
            console.error("Error initializing testimonials:", error);
            this.showError();
        }
    }
    
    // جلب البيانات من قاعدة البيانات (أو استخدام البيانات المضمنة)
    async loadTestimonials() {
        // استخدام البيانات المضمنة بدلاً من جلبها من API
        this.testimonials = [
                    {
                        id: 1,
                        qr_id: "QR001",
                        sender_name: "أحمد محمد",
                        message_text: "عمل رائع جداً، تم اتباع جميع جوانب المشروع خطوة بخطوة وبنتائج ممتازة. أنصح بالتعامل معهم بشدة.",
                        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                        signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMCAyMEM0MCAyMCA2MCAyMCA5MCAyMCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
                        created_at: "2024-01-15"
                    },
                    {
                        id: 2,
                        qr_id: "QR002",
                        sender_name: "فاطمة علي",
                        message_text: "خدمة احترافية ومميزة، تم تسليم العمل في الوقت المحدد وبجودة عالية. شكراً لكم على الجهد المبذول.",
                        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                        signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNSAyNUM0NSAyNSA2NSAyNSA5NSAyNSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
                        created_at: "2024-01-20"
                    },
                    {
                        id: 3,
                        qr_id: "QR003",
                        sender_name: "محمد حسن",
                        message_text: "تجربة رائعة ونتائج تفوق التوقعات. الفريق محترف ومتعاون ويهتم بأدق التفاصيل.",
                        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                        signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMCAyMEM1MCAyMCA3MCAyMCAxMDAgMjAiIHN0cm9rZT0iIzMzMyIgc3Ryb29rZS13aWR0aD0iMiIvPjwvc3ZnPg==",
                        created_at: "2024-01-25"
                    },
                    {
                        id: 4,
                        qr_id: "QR004",
                        sender_name: "سارة أحمد",
                        message_text: "أفضل خدمة حصلت عليها، الاهتمام بالتفاصيل والجودة العالية جعلتني أوصي بهم لجميع أصدقائي.",
                        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                        signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAyMkM0MiAyMiA2MiAyMiA5MiAyMiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
                        created_at: "2024-02-01"
                    },
                    {
                        id: 5,
                        qr_id: "QR005",
                        sender_name: "عمر خالد",
                        message_text: "عمل متقن ومهني، تم تنفيذ جميع المتطلبات بدقة عالية وفي الوقت المناسب. أشكركم على التعاون.",
                        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                        signature: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOCAyNEM0OCAyNCA2OCAyNCA5OCAyNCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=",
                        created_at: "2024-02-05"
                    }
                ];
        // إذا كنت تريد جلب البيانات من API في المستقبل، يمكنك تفعيل الكود التالي:
        /*
        try {
            const response = await fetch("YOUR_API_ENDPOINT_HERE"); // استبدل هذا برابط API الخاص بك
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            this.testimonials = data;
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            throw error;
        }
        */
    }
    
    renderTestimonials() {
        // إزالة رسالة التحميل قبل عرض الكروت
        this.wrapper.innerHTML = ""; 

        if (this.testimonials.length === 0) {
            this.wrapper.innerHTML = 
                `<div class="testimonial__loading">
                    <p>لا توجد شهادات متاحة حاليًا.</p>
                </div>`;
            return;
        }
        
        const testimonialsHTML = this.testimonials.map(testimonial => 
            this.createTestimonialCard(testimonial)
        ).join("");
        
        this.wrapper.innerHTML = testimonialsHTML;
        this.updateDisplay();
    }
    
    createTestimonialCard(testimonial) {
        return `
            <div class="testimonial__card" data-id="${testimonial.id}">
                <div class="testimonial__header">
                    <img src="${testimonial.image}" alt="${testimonial.sender_name}" class="testimonial__img" 
                         onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JmLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIzMCIgZmlsbD0iI2Y1ZjVmNSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMjUiIHI9IjgiIGZpbGw9IiNjY2MiLz48cGF0aCBkPSJNMTUgNDVjMC04IDctMTUgMTUtMTVzMTUgNyAxNSAxNSIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==\'; this.style.display=\'none\';">
                    <div class="testimonial__info">
                        <h3 class="testimonial__name">${testimonial.sender_name}</h3>
                        <p class="testimonial__role">عميل</p>
                    </div>
                </div>
                <p class="testimonial__description">${testimonial.message_text}</p>
                ${testimonial.signature ? `
                    <div class="testimonial__signature">
                        <img src="${testimonial.signature}" alt="توقيع ${testimonial.sender_name}" 
                             onerror="this.style.display=\'none\';">
                        <p class="testimonial__signature-text">التوقيع</p>
                    </div>
                ` : ""}
            </div>
        `;
    }
    
    createDots() {
        if (this.testimonials.length <= 1) return;
        
        const dotsHTML = this.testimonials.map((_, index) => 
            `<span class="testimonial__dot ${index === 0 ? "active" : ""}" data-index="${index}"></span>`
        ).join("");
        
        this.dotsContainer.innerHTML = dotsHTML;
    }
    
    bindEvents() {
        // أزرار التنقل
        if (this.prevBtn) {
            this.prevBtn.addEventListener("click", () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener("click", () => this.nextSlide());
        }
        
        // النقاط
        if (this.dotsContainer) {
            this.dotsContainer.addEventListener("click", (e) => {
                if (e.target.classList.contains("testimonial__dot")) {
                    const index = parseInt(e.target.dataset.index);
                    this.goToSlide(index);
                }
            });
        }
        
        // إيقاف التمرير التلقائي عند التفاعل
        this.wrapper.addEventListener("mouseenter", () => this.pauseAutoScroll());
        this.wrapper.addEventListener("mouseleave", () => this.resumeAutoScroll());
        
        // التنقل بالكيبورد
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.nextSlide();
            if (e.key === "ArrowRight") this.prevSlide();
        });
        
        // التنقل باللمس (للأجهزة المحمولة)
        this.bindTouchEvents();
    }
    
    bindTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        this.wrapper.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.wrapper.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // الحد الأدنى للحركة
                if (diff > 0) {
                    this.nextSlide(); // تمرير لليسار
                } else {
                    this.prevSlide(); // تمرير لليمين
                }
            }
        });
    }
    
    updateDisplay() {
        if (this.testimonials.length === 0) return;
        
        const cardWidth = 350 + 32; // عرض الكارت + المسافة
        const offset = -this.currentIndex * cardWidth;
        
        this.wrapper.style.transform = `translateX(${offset}px)`;
        
        // تحديث النقاط
        const dots = this.dotsContainer.querySelectorAll(".testimonial__dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
        
        // تحديث أزرار التنقل
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.testimonials.length - 1;
        }
    }
    
    nextSlide() {
        if (this.currentIndex < this.testimonials.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // العودة للبداية
        }
        this.updateDisplay();
        this.resetAutoScroll();
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.testimonials.length - 1; // الذهاب للنهاية
        }
        this.updateDisplay();
        this.resetAutoScroll();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.testimonials.length) {
            this.currentIndex = index;
            this.updateDisplay();
            this.resetAutoScroll();
        }
    }
    
    startAutoScroll() {
        if (this.testimonials.length <= 1) return;
        
        this.autoScrollInterval = setInterval(() => {
            if (this.isAutoScrolling) {
                this.nextSlide();
            }
        }, this.autoScrollDelay);
    }
    
    pauseAutoScroll() {
        this.isAutoScrolling = false;
    }
    
    resumeAutoScroll() {
        this.isAutoScrolling = true;
    }
    
    resetAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
        this.startAutoScroll();
    }
    
    showError() {
        this.wrapper.innerHTML = `
            <div class="testimonial__loading">
                <p>حدث خطأ في تحميل الشهادات. يرجى المحاولة مرة أخرى.</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--accent-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                    إعادة المحاولة
                </button>
            </div>
        `;
    }
}

// =============== INITIALIZATION ===============
document.addEventListener("DOMContentLoaded", () => {
    new TestimonialsManager();
});

// =============== UTILITY FUNCTIONS ===============
// دالة لتحديث البيانات من الخادم
async function refreshTestimonials() {
    const manager = new TestimonialsManager();
    await manager.init();
}

// دالة لإضافة شهادة جديدة (للاستخدام المستقبلي)
function addTestimonial(testimonialData) {
    // يمكن استخدام هذه الدالة لإضافة شهادة جديدة ديناميكيًا
    console.log("Adding new testimonial:", testimonialData);
}


