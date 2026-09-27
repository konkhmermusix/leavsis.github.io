/**
 * LEAV SIS - PORTFOLIO INTERACTION ENGINE
 * Vanilla JavaScript App Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initScrollHeader();
    initSpotlightEffect();
    initProjectSystem();
    initSkillsFilter();
    initContactHandlers();
    initScrollObserver();
    initLucideIcons();
});

/* -------------------------------------------------------------
 * 1. THEME SWITCHER (DARK & LIGHT MODE)
 * ------------------------------------------------------------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('ls_portfolio_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ls_portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (!themeIcon) return;
    
    if (theme === 'light') {
        themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
        themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
}

/* -------------------------------------------------------------
 * 2. MOBILE HAMBURGER MENU
 * ------------------------------------------------------------- */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        } else {
            mobileMenu.classList.remove('hidden');
            menuBtn.setAttribute('aria-expanded', 'true');
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/* -------------------------------------------------------------
 * 3. FLOATING NAVBAR SCROLL BEHAVIOR
 * ------------------------------------------------------------- */
function initScrollHeader() {
    const navbar = document.getElementById('main-navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('py-3');
                navbar.classList.remove('py-5');
            } else {
                navbar.classList.add('py-5');
                navbar.classList.remove('py-3');
            }
        }

        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* -------------------------------------------------------------
 * 4. LIQUID GLASS SPOTLIGHT MOUSE TRACKING
 * ------------------------------------------------------------- */
function initSpotlightEffect() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* -------------------------------------------------------------
 * 5. PROJECTS GRID & MODAL SYSTEM
 * ------------------------------------------------------------- */
function initProjectSystem() {
    const projectsContainer = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.project-filter-btn');

    if (!projectsContainer || !window.PROJECTS_DATA) return;

    // Initial render all projects
    renderProjects(window.PROJECTS_DATA);

    // Setup Category Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => {
                b.classList.remove('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
                b.classList.add('text-slate-400', 'hover:text-white');
            });
            btn.classList.add('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
            btn.classList.remove('text-slate-400');

            if (filter === 'all') {
                renderProjects(window.PROJECTS_DATA);
            } else {
                const filtered = window.PROJECTS_DATA.filter(p => p.category === filter);
                renderProjects(filtered);
            }
        });
    });

    // Modal Close Listeners
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (modal && closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    if (projects.length === 0) {
        container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400">No projects found in this category.</div>`;
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="glass-card spotlight-card group flex flex-col justify-between p-6 cursor-pointer" onclick="openProjectModal('${project.id}')">
            <!-- Header Badge & Number -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-mono font-bold tracking-wider text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                        PROJECT ${project.number}
                    </span>
                    <span class="text-xs text-slate-400 font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                        ${project.categoryLabel}
                    </span>
                </div>

                <!-- Preview Image -->
                <div class="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                    <img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                </div>

                <!-- Title & Description -->
                <h3 class="text-xl font-bold text-white group-hover:text-sky-400 transition-colors font-heading mb-1">
                    ${project.name}
                </h3>
                <p class="text-xs font-semibold text-sky-400/90 mb-3">${project.tagline}</p>
                <p class="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                    ${project.summary}
                </p>
            </div>

            <!-- Tech Tags & Action Button -->
            <div>
                <div class="flex flex-wrap gap-1.5 mb-6">
                    ${project.technologies.slice(0, 4).map(tech => `
                        <span class="text-[11px] font-medium text-slate-300 bg-slate-800/60 border border-white/10 px-2.5 py-0.5 rounded-full">
                            ${tech}
                        </span>
                    `).join('')}
                    ${project.technologies.length > 4 ? `<span class="text-[11px] font-medium text-slate-400 px-2 py-0.5">+${project.technologies.length - 4}</span>` : ''}
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-white/10">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                        Explore Architecture
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                    <span class="text-xs text-slate-500 flex items-center gap-1">
                        <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        Details
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    // Re-bind mouse spotlight listener
    initSpotlightEffect();
}

function openProjectModal(projectId) {
    const project = window.PROJECTS_DATA.find(p => p.id === projectId);
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-content');

    if (!project || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="relative">
            <!-- Modal Header Media -->
            <div class="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10">
                <img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div class="absolute bottom-4 left-6 right-6">
                    <span class="inline-block text-xs font-mono text-sky-400 font-bold bg-sky-500/20 border border-sky-500/30 px-3 py-1 rounded-full mb-2">
                        PROJECT ${project.number} — ${project.categoryLabel.toUpperCase()}
                    </span>
                    <h2 class="text-2xl md:text-3xl font-extrabold text-white font-heading">${project.name}</h2>
                    <p class="text-sky-300 text-sm font-medium">${project.tagline}</p>
                </div>
            </div>

            <!-- Overview Section -->
            <div class="space-y-6 text-slate-300">
                <div>
                    <h4 class="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Project Overview</h4>
                    <p class="text-sm md:text-base leading-relaxed text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                        ${project.summary}
                    </p>
                </div>

                <!-- Technologies Used -->
                <div>
                    <h4 class="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">Technologies & Architecture</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `
                            <span class="text-xs font-semibold text-sky-300 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-lg">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Key Capabilities & Features -->
                <div>
                    <h4 class="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">Core Features & Functionality</h4>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs md:text-sm">
                        ${project.features.map(feat => `
                            <li class="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                                <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                                <span class="text-slate-200">${feat}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Action Footer Links -->
                <div class="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <button onclick="copyModalLink('${project.name}')" class="glass-button-secondary text-xs px-4 py-2.5 flex items-center gap-2">
                            <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            Copy Specification
                        </button>
                    </div>
                    <div class="flex items-center gap-3">
                        <a href="${project.githubUrl}" onclick="showToast('GitHub repository placeholder linked'); return false;" class="glass-button-secondary text-xs px-4 py-2.5 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub Repo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

window.openProjectModal = openProjectModal;
window.copyModalLink = function(name) {
    navigator.clipboard.writeText(`Leav Sis Portfolio Project: ${name}`);
    showToast(`Copied details for ${name} to clipboard`);
};

/* -------------------------------------------------------------
 * 6. SKILLS FILTER TABS
 * ------------------------------------------------------------- */
function initSkillsFilter() {
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-skill-cat');

            skillTabs.forEach(t => {
                t.classList.remove('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
                t.classList.add('text-slate-400', 'hover:text-white');
            });

            tab.classList.add('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
            tab.classList.remove('text-slate-400');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* -------------------------------------------------------------
 * 7. CONTACT FORM & INTERACTIVE ACTIONS
 * ------------------------------------------------------------- */
function initContactHandlers() {
    const contactForm = document.getElementById('portfolio-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const origText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Sending Message...
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origText;
                contactForm.reset();
                showToast('Thank you! Your message has been sent successfully.');
            }, 1200);
        });
    }

    // Direct Copy Action Buttons
    window.copyContactInfo = function(text, label) {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard!`);
    };
}

/* -------------------------------------------------------------
 * 8. INTERSECTION OBSERVER FOR NAV HIGHLIGHT & SCROLL ANIMATIONS
 * ------------------------------------------------------------- */
function initScrollObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------
 * 9. TOAST NOTIFICATION UTILITY
 * ------------------------------------------------------------- */
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'glass-card text-xs font-semibold px-4 py-3 rounded-xl border border-sky-500/40 shadow-2xl flex items-center gap-2 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto';
    toast.innerHTML = `
        <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/* -------------------------------------------------------------
 * 10. LUCIDE ICONS RENDER INITIALIZER
 * ------------------------------------------------------------- */
function initLucideIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
