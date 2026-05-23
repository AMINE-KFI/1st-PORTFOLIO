document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const icon = document.querySelector('.hamburger i');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (close)
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Sticky Navbar & Active Link Update on Scroll
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Add/remove scrolled class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Initial Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 100);

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 6. Smooth Scrolling for Anchor Links (polyfill for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 7. Language Translation
const translations = {
    fr: {
        nav_about: "À Propos",
        nav_skills: "Compétences",
        nav_projects: "Projets",
        nav_contact: "Contact",
        hero_greeting: "Bonjour, je suis",
        hero_title: "<span class=\"gradient-text\">Étudiant à 3iL</span> & <span class=\"gradient-text\">Développeur Full-Stack</span>",
        hero_desc: "Passionné par la conception d'applications web modernes et les bases de données. J'allie une solide expertise technique à une vision commerciale pour créer des solutions numériques performantes et évolutives.",
        hero_btn_projects: "Voir mes projets",
        about_title: "À Propos de moi",
        about_desc: "Actuellement en <strong>Bachelor Développement Full-Stack à 3iL</strong> en Algérie, je possède déjà une forte expertise en Bases de Données (TS, BTS, AEC). Mon parcours est atypique : en tant que Délégué Commercial chez EURL KATAMINE, j'ai développé un excellent sens de la communication et de la gestion de projet, ce qui me permet de comprendre aussi bien les enjeux techniques que business d'un produit.",
        about_stat1: "Diplômes en IT",
        about_stat2: "Projets d'Entreprise",
        skills_title: "Mes Compétences",
        skills_front: "Frontend",
        skills_back: "Backend & Mobile",
        skills_db: "Bases de données & Outils",
        skills_db_1: "Conception & Admin BDD",
        projects_title: "Projets Récents",
        proj1_tag1: "Système d'Information",
        proj1_tag2: "Base de données",
        proj1_desc: "Développement du système de gestion des stagiaires sur mesure pour l'entreprise Sonatrach.",
        proj2_tag1: "Full-Stack",
        proj2_tag2: "Rebranding",
        proj2_desc: "Gestion de la refonte de l'identité visuelle et modernisation de l'architecture du site web de l'entreprise.",
        proj3_tag1: "Base de données",
        proj3_tag2: "Soutenance",
        proj3_title: "Projet de Fin d'Études (Avril 2026)",
        proj3_desc: "Conception et développement d'une solution orientée base de données pour la validation du diplôme de Technicien Supérieur.",
        contact_title: "Travaillons ensemble",
        contact_desc: "Vous avez une idée de projet ou une opportunité d'emploi ? N'hésitez pas à me contacter.",
        contact_loc: "Alger, Algérie (Draria) ou Remote",
        form_name: "Votre Nom",
        form_email: "Votre Email",
        form_msg: "Votre Message",
        form_btn: "Envoyer le message",
        footer_rights: "Amine Koufi. Tous droits réservés."
    },
    en: {
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_greeting: "Hello, I am",
        hero_title: "<span class=\"gradient-text\">3iL Student</span> & <span class=\"gradient-text\">Full-Stack Developer</span>",
        hero_desc: "Passionate about designing modern web applications and databases. I combine solid technical expertise with a business vision to create high-performance and scalable digital solutions.",
        hero_btn_projects: "View my projects",
        about_title: "About Me",
        about_desc: "Currently pursuing a <strong>Bachelor's in Full-Stack Development at 3iL</strong> in Algeria, I already possess strong expertise in Databases (TS, BTS, AEC). My background is unique: as a Sales Representative at EURL KATAMINE, I developed excellent communication and project management skills, allowing me to understand both the technical and business aspects of a product.",
        about_stat1: "IT Degrees",
        about_stat2: "Enterprise Projects",
        skills_title: "My Skills",
        skills_front: "Frontend",
        skills_back: "Backend & Mobile",
        skills_db: "Databases & Tools",
        skills_db_1: "DB Design & Admin",
        projects_title: "Recent Projects",
        proj1_tag1: "Information System",
        proj1_tag2: "Database",
        proj1_desc: "Development of a custom intern management system for Sonatrach.",
        proj2_tag1: "Full-Stack",
        proj2_tag2: "Rebranding",
        proj2_desc: "Managed the visual identity redesign and modernized the company's website architecture.",
        proj3_tag1: "Database",
        proj3_tag2: "Graduation",
        proj3_title: "Final Year Project (April 2026)",
        proj3_desc: "Design and development of a database-oriented solution for the Higher Technician diploma validation.",
        contact_title: "Let's work together",
        contact_desc: "Have a project idea or a job opportunity? Feel free to contact me.",
        contact_loc: "Algiers, Algeria (Draria) or Remote",
        form_name: "Your Name",
        form_email: "Your Email",
        form_msg: "Your Message",
        form_btn: "Send Message",
        footer_rights: "Amine Koufi. All rights reserved."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('portfolio_lang') || 'fr';

    const setLanguage = (lang) => {
        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update all data-i18n-placeholder elements
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Update document lang
        document.documentElement.lang = lang;
        
        // Update button text
        const langText = document.getElementById('lang-text');
        if (langText) {
            langText.textContent = lang === 'fr' ? 'EN' : 'FR';
        }
        
        // Save preference
        localStorage.setItem('portfolio_lang', lang);
        currentLang = lang;
    };

    // Initialize language
    setLanguage(currentLang);

    // Toggle language on click
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            setLanguage(newLang);
        });
    }
});
