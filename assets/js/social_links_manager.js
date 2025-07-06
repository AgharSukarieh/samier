/*=============== SOCIAL LINKS MANAGER ===============*/
class SocialLinksManager {
    constructor() {
        this.socialLinks = {
            linkedin: '',
            github: '',
            facebook: '',
            twitter: '',
            instagram: ''
        };
        
        this.init();
    }

    init() {
        // تحديد الروابط - يمكن تعديلها هنا
        this.socialLinks = {
            linkedin: 'https://www.linkedin.com/in/your-username', // ضع الرابط هنا أو اتركه فارغًا
            github: 'https://github.com/your-username', // ضع الرابط هنا أو اتركه فارغًا
            facebook: '', // فارغ - لن تظهر الأيقونة
            twitter: '', // فارغ - لن تظهر الأيقونة
            instagram: 'https://instagram.com/your-profile' // ضع الرابط هنا أو اتركه فارغًا
        };
        
        this.updateSocialLinks();
    }

    updateSocialLinks() {
        const socialContainer = document.querySelector('.home__social');
        if (!socialContainer) return;

        // إزالة جميع الروابط الموجودة (عدا الخط)
        const existingLinks = socialContainer.querySelectorAll('.home__social-link');
        existingLinks.forEach(link => link.remove());

        // إضافة الروابط التي تحتوي على URL فقط
        Object.entries(this.socialLinks).forEach(([platform, url]) => {
            if (url && url.trim() !== '') {
                this.createSocialLink(platform, url, socialContainer);
            }
        });

        // إخفاء الحاوية بالكامل إذا لم تكن هناك روابط
        const hasVisibleLinks = Object.values(this.socialLinks).some(url => url && url.trim() !== '');
        if (!hasVisibleLinks) {
            socialContainer.style.display = 'none';
        } else {
            socialContainer.style.display = 'flex';
        }
    }

    createSocialLink(platform, url, container) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = `home__social-link ${platform} focus-visible will-change-transform`;
        link.setAttribute('aria-label', `زيارة ملفي الشخصي على ${this.getPlatformName(platform)}`);

        const icon = document.createElement('i');
        icon.className = `bx bxl-${platform}`;
        icon.setAttribute('aria-hidden', 'true');

        const tooltip = document.createElement('span');
        tooltip.className = 'social-tooltip';
        tooltip.textContent = this.getPlatformName(platform);

        link.appendChild(icon);
        link.appendChild(tooltip);
        container.appendChild(link);

        // إضافة حركة دخول متأخرة للرابط الجديد
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100);
    }

    getPlatformName(platform) {
        const names = {
            linkedin: 'LinkedIn',
            github: 'GitHub',
            facebook: 'Facebook',
            twitter: 'Twitter',
            instagram: 'Instagram'
        };
        return names[platform] || platform;
    }

    // دالة لتحديث رابط معين
    updateLink(platform, url) {
        this.socialLinks[platform] = url;
        this.updateSocialLinks();
    }

    // دالة لتحديث جميع الروابط
    updateAllLinks(newLinks) {
        this.socialLinks = { ...this.socialLinks, ...newLinks };
        this.updateSocialLinks();
    }

    // دالة للحصول على الروابط الحالية
    getCurrentLinks() {
        return { ...this.socialLinks };
    }
}

/*=============== ENHANCED SOCIAL LINKS WITH ANIMATIONS ===============*/
class EnhancedSocialLinksManager extends SocialLinksManager {
    constructor() {
        super();
        this.addEnhancedAnimations();
    }

    addEnhancedAnimations() {
        // إضافة أنماط CSS محسنة
        const style = document.createElement('style');
        style.textContent = `
            /* تحسينات إضافية للروابط الاجتماعية */
            .home__social-link {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .home__social-link::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transform: translateX(-100%) rotate(45deg);
                transition: transform 0.6s ease;
            }

            .home__social-link:hover::after {
                transform: translateX(100%) rotate(45deg);
            }

            .home__social-link i {
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .home__social-link:hover i {
                transform: scale(1.2) rotate(360deg);
            }

            /* تأثير النبضة للروابط النشطة */
            .home__social-link.active {
                animation: socialPulse 2s infinite;
            }

            @keyframes socialPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(var(--first-hue), var(--sat), var(--lig), 0.4);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(var(--first-hue), var(--sat), var(--lig), 0);
                }
            }

            /* تأثير التحميل للروابط الجديدة */
            .home__social-link.loading {
                animation: socialLoading 1s ease-in-out;
            }

            @keyframes socialLoading {
                0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.8);
                }
                50% {
                    transform: translateY(-5px) scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            /* إخفاء سلس للروابط المحذوفة */
            .home__social-link.removing {
                animation: socialRemoving 0.5s ease-in-out forwards;
            }

            @keyframes socialRemoving {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }

    createSocialLink(platform, url, container) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = `home__social-link ${platform} focus-visible will-change-transform loading`;
        link.setAttribute('aria-label', `زيارة ملفي الشخصي على ${this.getPlatformName(platform)}`);

        const icon = document.createElement('i');
        icon.className = `bx bxl-${platform}`;
        icon.setAttribute('aria-hidden', 'true');

        const tooltip = document.createElement('span');
        tooltip.className = 'social-tooltip';
        tooltip.textContent = this.getPlatformName(platform);

        link.appendChild(icon);
        link.appendChild(tooltip);
        container.appendChild(link);

        // إزالة كلاس التحميل بعد انتهاء الحركة
        setTimeout(() => {
            link.classList.remove('loading');
        }, 1000);

        // إضافة تأثير النقر
        link.addEventListener('click', (e) => {
            this.addClickEffect(link, e);
        });
    }

    addClickEffect(link, event) {
        // إنشاء تأثير الموجة عند النقر
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        link.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // دالة محسنة لإزالة الروابط مع حركة
    removeLink(platform) {
        const link = document.querySelector(`.home__social-link.${platform}`);
        if (link) {
            link.classList.add('removing');
            setTimeout(() => {
                link.remove();
                this.socialLinks[platform] = '';
                this.checkContainerVisibility();
            }, 500);
        }
    }

    checkContainerVisibility() {
        const socialContainer = document.querySelector('.home__social');
        const hasVisibleLinks = Object.values(this.socialLinks).some(url => url && url.trim() !== '');
        
        if (!hasVisibleLinks) {
            socialContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            socialContainer.style.opacity = '0';
            socialContainer.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                socialContainer.style.display = 'none';
            }, 500);
        } else {
            socialContainer.style.display = 'flex';
            socialContainer.style.opacity = '1';
            socialContainer.style.transform = 'translateX(0)';
        }
    }
}

// تصدير الكلاسات للاستخدام العام
window.SocialLinksManager = SocialLinksManager;
window.EnhancedSocialLinksManager = EnhancedSocialLinksManager;
