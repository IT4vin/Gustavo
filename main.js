// ===== MAIN JAVASCRIPT FILE =====

// Global variables
let isLoading = true;
let currentSection = 'home';
let typingInstance = null;
let particlesInstance = null;

// DOM elements
const loadingScreen = document.getElementById('loading-screen');
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const projectModal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const projectButtons = document.querySelectorAll('.project__btn');

// Interactive background elements (inicializados depois)
let interactiveBg, cursorGlow, gridOverlay;

// ===== LOADING SCREEN =====
function initLoading() {
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
            initApp();
        }, 500);
    }, 2000);
}

// ===== MAIN APP INITIALIZATION =====
function initApp() {
    initNavigation();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initTiltEffects();
    initContactForm();
    initProjectModals();
    initSmoothScroll();
    initScrollHeader();
    initInteractiveBackground();
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations
    initGSAPAnimations();
}

// ===== NAVIGATION =====
function initNavigation() {
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.add('show');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    navClose?.addEventListener('click', closeNavMenu);
    
    // Close menu when clicking outside
    navMenu?.addEventListener('click', (e) => {
        if (e.target === navMenu) {
            closeNavMenu();
        }
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeNavMenu();
            updateActiveNavLink(link);
        });
    });
}

function closeNavMenu() {
    navMenu?.classList.remove('show');
    navToggle?.classList.remove('active');
    document.body.style.overflow = '';
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    // Use Lenis for smooth scrolling if available, otherwise fallback to native
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== SCROLL HEADER =====
function initScrollHeader() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
        updateActiveSection();
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            if (currentSection !== sectionId) {
                currentSection = sectionId;
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    updateActiveNavLink(activeLink);
                }
            }
        }
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Desenvolvedor Full Stack',
        'Criador de Experiências',
        'Solucionador de Problemas',
        'Inovador Digital'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00e5ff', '#9b5cff', '#ff3db1', '#2fffdc']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00e5ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
    
    // Reduce particles on mobile
    if (window.innerWidth < 768) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40
                },
                line_linked: {
                    enable: false
                }
            }
        });
    }
}

// ===== GSAP ANIMATIONS =====
function initGSAPAnimations() {
    // Fade in animations for sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.fromTo(section.children, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Skills animation
    gsap.utils.toArray('.skill__item').forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                scale: 0.8,
                rotationY: 90
            },
            {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Project mockups animation
    gsap.utils.toArray('.project__mockup').forEach(mockup => {
        gsap.fromTo(mockup,
            {
                opacity: 0,
                rotationX: 45,
                rotationY: 45,
                z: -100
            },
            {
                opacity: 1,
                rotationX: 0,
                rotationY: 0,
                z: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: mockup,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Social icons pulse animation
    gsap.utils.toArray('.social__link').forEach(link => {
        gsap.to(link, {
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: Math.random() * 2
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Create intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.about__content, .skill__item, .project__mockup, .contact__content'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== TILT EFFECTS =====
function initTiltEffects() {
    if (typeof VanillaTilt === 'undefined') return;
    
    // Apply tilt to project mockups
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        VanillaTilt.init(element, {
            max: 15,
            speed: 1000,
            glare: true,
            'max-glare': 0.2,
            scale: 1.05,
            perspective: 1000,
            transition: true,
            'glare-prerender': false
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    if (!contactForm) return;
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitButton = contactForm.querySelector('.form__submit');
    const feedback = document.getElementById('form-feedback');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitButton.classList.add('btn--loading');
        
        try {
            // Simulate form submission (replace with actual endpoint)
            const formData = new FormData(contactForm);
            
            // For demo purposes, we'll simulate a successful submission
            await simulateFormSubmission(formData);
            
            showFeedback('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showFeedback('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitButton.classList.remove('btn--loading');
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.form__error').forEach(error => {
            error.classList.remove('show');
        });
        
        // Validate name
        if (!nameInput.value.trim()) {
            showFieldError('name-error', 'Nome é obrigatório');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showFieldError('email-error', 'Email é obrigatório');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showFieldError('email-error', 'Email inválido');
            isValid = false;
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            showFieldError('subject-error', 'Assunto é obrigatório');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showFieldError('message-error', 'Mensagem é obrigatória');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showFieldError('message-error', 'Mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showFieldError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `form__feedback show ${type}`;
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 5000);
    }
    
    async function simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
}

// ===== PROJECT MODALS =====
function initProjectModals() {
    const projectsData = {
        1: {
            title: 'E-commerce Platform',
            description: 'Uma plataforma completa de e-commerce desenvolvida com React, Node.js e MongoDB. Inclui sistema de pagamentos, gerenciamento de produtos, carrinho de compras e painel administrativo.',
            longDescription: `
                <p>Este projeto foi desenvolvido como uma solução completa para vendas online, incluindo todas as funcionalidades essenciais de um e-commerce moderno.</p>
                
                <h4>Funcionalidades Principais:</h4>
                <ul>
                    <li>Catálogo de produtos com filtros avançados</li>
                    <li>Carrinho de compras persistente</li>
                    <li>Sistema de pagamentos integrado (Stripe)</li>
                    <li>Painel administrativo completo</li>
                    <li>Sistema de avaliações e comentários</li>
                    <li>Notificações em tempo real</li>
                </ul>
                
                <h4>Desafios Técnicos:</h4>
                <p>O maior desafio foi implementar um sistema de pagamentos seguro e confiável, além de otimizar a performance para lidar com um grande volume de produtos e usuários simultâneos.</p>
            `,
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT', 'Socket.io'],
            images: [
                './assets/images/projects/project-placeholder.svg',
                './assets/images/projects/mobile-placeholder.svg',
                './assets/images/projects/project-placeholder.svg'
            ],
            liveUrl: 'https://ecommerce-demo.netlify.app',
            githubUrl: 'https://github.com/gustavosouza/ecommerce-platform'
        },
        2: {
            title: 'Task Management App',
            description: 'Aplicativo de gerenciamento de tarefas com colaboração em tempo real, desenvolvido com Next.js, TypeScript e Socket.io.',
            longDescription: `
                <p>Uma aplicação moderna para gerenciamento de projetos e tarefas, com foco na colaboração em equipe e produtividade.</p>
                
                <h4>Funcionalidades Principais:</h4>
                <ul>
                    <li>Criação e organização de projetos</li>
                    <li>Sistema de tarefas com prioridades</li>
                    <li>Colaboração em tempo real</li>
                    <li>Dashboard com métricas de produtividade</li>
                    <li>Sistema de notificações</li>
                    <li>Integração com calendário</li>
                </ul>
                
                <h4>Arquitetura:</h4>
                <p>Utilizei Next.js para o frontend com TypeScript para maior robustez, Socket.io para comunicação em tempo real e PostgreSQL como banco de dados.</p>
            `,
            technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
            images: [
                './assets/images/projects/project-placeholder.svg',
                './assets/images/projects/mobile-placeholder.svg',
                './assets/images/projects/project-placeholder.svg'
            ],
            liveUrl: 'https://taskmanager-demo.vercel.app',
            githubUrl: 'https://github.com/gustavosouza/task-management-app'
        },
        3: {
            title: 'Analytics Dashboard',
            description: 'Dashboard interativo para análise de dados com gráficos em tempo real, desenvolvido com React, D3.js e Express.',
            longDescription: `
                <p>Um dashboard completo para visualização e análise de dados empresariais, com gráficos interativos e atualizações em tempo real.</p>
                
                <h4>Funcionalidades Principais:</h4>
                <ul>
                    <li>Múltiplos tipos de gráficos (linha, barra, pizza, scatter)</li>
                    <li>Filtros dinâmicos por período e categoria</li>
                    <li>Exportação de relatórios em PDF</li>
                    <li>Alertas personalizáveis</li>
                    <li>API REST para integração</li>
                    <li>Visualizações responsivas</li>
                </ul>
                
                <h4>Tecnologias Utilizadas:</h4>
                <p>O frontend foi desenvolvido em React com D3.js para visualizações customizadas. O backend utiliza Express.js com MongoDB para armazenamento dos dados.</p>
            `,
            technologies: ['React', 'D3.js', 'Express', 'MongoDB', 'Chart.js', 'Material-UI'],
            images: [
                './assets/images/projects/project-placeholder.svg',
                './assets/images/projects/mobile-placeholder.svg',
                './assets/images/projects/project-placeholder.svg'
            ],
            liveUrl: 'https://analytics-dashboard-demo.herokuapp.com',
            githubUrl: 'https://github.com/gustavosouza/analytics-dashboard'
        }
    };
    
    // Add click events to project buttons
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const projectData = projectsData[projectId];
            
            if (projectData) {
                showProjectModal(projectData);
            }
        });
    });
    
    // Modal close events
    modalClose?.addEventListener('click', closeProjectModal);
    modalOverlay?.addEventListener('click', closeProjectModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });
    
    function showProjectModal(projectData) {
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="project-modal">
                <div class="project-modal__header">
                    <h2 class="project-modal__title">${projectData.title}</h2>
                    <p class="project-modal__description">${projectData.description}</p>
                </div>
                
                <div class="project-modal__gallery">
                    ${projectData.images.map((img, index) => `
                        <img src="${img}" alt="${projectData.title} - Screenshot ${index + 1}" 
                             class="project-modal__image" loading="lazy">
                    `).join('')}
                </div>
                
                <div class="project-modal__content">
                    ${projectData.longDescription}
                </div>
                
                <div class="project-modal__tech">
                    <h4>Tecnologias Utilizadas:</h4>
                    <div class="project-modal__tech-list">
                        ${projectData.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-modal__actions">
                    <a href="${projectData.liveUrl}" target="_blank" rel="noopener noreferrer" 
                       class="btn btn--primary">
                        <span>Ver Projeto</span>
                        <svg class="btn__icon" viewBox="0 0 24 24">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                    </a>
                    <a href="${projectData.githubUrl}" target="_blank" rel="noopener noreferrer" 
                       class="btn btn--secondary">
                        <span>Ver Código</span>
                        <svg class="btn__icon" viewBox="0 0 24 24">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
        
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add styles for modal content
        const modalStyles = `
            <style id="modal-styles">
                .project-modal {
                    max-width: 900px;
                    margin: 0 auto;
                }
                
                .project-modal__header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .project-modal__title {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: var(--gradient-neon);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .project-modal__description {
                    font-size: 1.125rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                }
                
                .project-modal__gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                
                .project-modal__image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: var(--border-radius);
                    border: 1px solid rgba(0, 229, 255, 0.2);
                }
                
                .project-modal__content {
                    margin-bottom: 2rem;
                    line-height: 1.7;
                }
                
                .project-modal__content h4 {
                    color: var(--neon-blue);
                    margin: 1.5rem 0 1rem 0;
                    font-size: 1.125rem;
                }
                
                .project-modal__content ul {
                    margin: 1rem 0;
                    padding-left: 2rem;
                }
                
                .project-modal__content li {
                    margin-bottom: 0.5rem;
                    color: var(--text-secondary);
                }
                
                .project-modal__tech h4 {
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                }
                
                .project-modal__tech-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }
                
                .project-modal__actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                @media (max-width: 768px) {
                    .project-modal__gallery {
                        grid-template-columns: 1fr;
                    }
                    
                    .project-modal__actions {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .project-modal__actions .btn {
                        width: 100%;
                        max-width: 250px;
                    }
                }
            </style>
        `;
        
        if (!document.getElementById('modal-styles')) {
            document.head.insertAdjacentHTML('beforeend', modalStyles);
        }
    }
    
    function closeProjectModal() {
        projectModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ===== INTERACTIVE BACKGROUND =====
function initInteractiveBackground() {
    // Inicializar elementos DOM
    interactiveBg = document.getElementById('interactive-bg');
    cursorGlow = document.getElementById('cursor-glow');
    gridOverlay = document.getElementById('grid-overlay');
    
    // Verificar se elementos existem
    if (!interactiveBg || !cursorGlow || !gridOverlay) {
        return;
    }
    
    let isMouseMoving = false;
    let mouseTimeout;
    
    // Desativar em dispositivos móveis
    if (window.innerWidth <= 768) {
        interactiveBg.style.display = 'none';
        return;
    }
    
    // Desativar se usuário prefere movimento reduzido (TEMPORARIAMENTE DESABILITADO PARA TESTE)
    // if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    //     console.log('Movimento reduzido preferido, desativando background interativo');
    //     interactiveBg.style.display = 'none';
    //     return;
    // }
    
    // Seguir movimento do mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Atualizar posição do glow
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        
        // Ativar efeitos
        if (!isMouseMoving) {
            cursorGlow.classList.add('active');
            gridOverlay.classList.add('active');
            isMouseMoving = true;
        }
        
        // Reset timeout
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            cursorGlow.classList.remove('active');
            gridOverlay.classList.remove('active');
            isMouseMoving = false;
        }, 2000);
    });
    
    // Efeito de clique - ondas
    document.addEventListener('click', (e) => {
        createClickWave(e.clientX, e.clientY);
        createFloatingParticles(e.clientX, e.clientY);
    });
    
    // Função para criar ondas de clique
    function createClickWave(x, y) {
        const wave = document.createElement('div');
        wave.className = 'click-wave';
        wave.style.left = x + 'px';
        wave.style.top = y + 'px';
        
        interactiveBg.appendChild(wave);
        
        // Remover após animação
        setTimeout(() => {
            if (wave.parentNode) {
                interactiveBg.removeChild(wave);
            }
        }, 1000);
    }
    
    // Função para criar partículas flutuantes
    function createFloatingParticles(x, y) {
        const particleCount = 6;
        const colors = ['#00e5ff', '#9b5cff', '#ff3db1', '#2fffdc'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Direções aleatórias
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 200;
            
            particle.style.setProperty('--random-x', randomX + 'px');
            particle.style.setProperty('--random-y', randomY + 'px');
            
            // Cor aleatória
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            interactiveBg.appendChild(particle);
            
            // Remover após animação
            setTimeout(() => {
                if (particle.parentNode) {
                    interactiveBg.removeChild(particle);
                }
            }, 3000);
        }
    }
    
    // Efeito especial ao passar por botões e links
    setTimeout(() => {
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorGlow.style.filter = 'blur(0.5px)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.filter = 'blur(1px)';
            });
        });
    }, 1000);
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== EVENT LISTENERS =====

// Window load event
window.addEventListener('load', () => {
    initLoading();
});

// DOM ready event para garantir que elementos existam
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, verificando elementos...');
    
    // Verificar se elementos do background existem
    const bgTest = document.getElementById('interactive-bg');
    const glowTest = document.getElementById('cursor-glow');
    const gridTest = document.getElementById('grid-overlay');
    
    console.log('Teste elementos:', {
        interactiveBg: !!bgTest,
        cursorGlow: !!glowTest,
        gridOverlay: !!gridTest
    });
});

// Resize event with throttling
window.addEventListener('resize', throttle(() => {
    // Reinitialize particles on resize if needed
    if (particlesInstance && window.innerWidth < 768) {
        // Reduce particles on mobile
        particlesInstance.particles.array = particlesInstance.particles.array.slice(0, 40);
    }
}, 250));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        closeNavMenu();
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        './assets/images/profile-placeholder.svg',
        './assets/images/projects/project-placeholder.svg',
        './assets/images/projects/mobile-placeholder.svg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize critical resource preloading
preloadCriticalResources();

// Service Worker registration (desabilitado por enquanto)
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./sw.js')
//             .then(registration => {
//                 console.log('SW registered: ', registration);
//             })
//             .catch(registrationError => {
//                 console.log('SW registration failed: ', registrationError);
//             });
//     });
// }

// Console easter egg
console.log(`
    %c🚀 Olá, desenvolvedor curioso! 
    %c
    Gostou do que viu? Este portfolio foi desenvolvido com:
    • HTML5 semântico
    • CSS3 com variáveis customizadas
    • JavaScript ES6+ vanilla
    • GSAP para animações
    • Particles.js para efeitos
    
    Quer conversar sobre desenvolvimento? Entre em contato!
    
    %c💙 Desenvolvido com paixão por Gustavo Souza
`, 
'color: #00e5ff; font-size: 16px; font-weight: bold;',
'color: #b8c5d6; font-size: 14px; line-height: 1.5;',
'color: #9b5cff; font-size: 14px; font-weight: bold;'
);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isInViewport,
        isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    };
}
