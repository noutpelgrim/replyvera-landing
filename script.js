document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Industries Dropdown Toggle (desktop) ---
    const dropdownWrappers = document.querySelectorAll('.nav-dropdown');
    dropdownWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector('.nav-dropdown-btn');
        const content = wrapper.querySelector('.nav-dropdown-content');
        if (!btn || !content) return;

        let closeTimeout;

        const openDropdown = () => {
            clearTimeout(closeTimeout);
            if (!wrapper.classList.contains('open')) {
                dropdownWrappers.forEach(w => {
                    w.classList.remove('open');
                    const b = w.querySelector('.nav-dropdown-btn');
                    if (b) b.setAttribute('aria-expanded', 'false');
                });
                wrapper.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        };

        const closeDropdown = () => {
            closeTimeout = setTimeout(() => {
                wrapper.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }, 200);
        };

        // Hover events
        wrapper.addEventListener('mouseenter', openDropdown);
        wrapper.addEventListener('mouseleave', closeDropdown);

        // Keyboard focus
        btn.addEventListener('focus', openDropdown);
        content.addEventListener('focusin', openDropdown);
        wrapper.addEventListener('focusout', (e) => {
            if (!wrapper.contains(e.relatedTarget)) {
                closeDropdown();
            }
        });

        // Click toggle
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (wrapper.classList.contains('open')) {
                clearTimeout(closeTimeout);
                wrapper.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                openDropdown();
            }
        });

        content.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                clearTimeout(closeTimeout);
                wrapper.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    document.addEventListener('click', () => {
        dropdownWrappers.forEach(w => {
            w.classList.remove('open');
            const b = w.querySelector('.nav-dropdown-btn');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Mobile Navigation ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav     = document.getElementById('mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileNav.classList.contains('open');
            mobileNav.classList.toggle('open', !isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
        });

        // Close mobile nav on outside click
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileNav.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });

        // Close mobile nav when a link inside it is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Language Selector Toggle ---
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const selector = btn.closest('.lang-selector');
            const menu = selector.querySelector('.lang-menu');
            
            // Close other open language menus
            document.querySelectorAll('.lang-menu.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            
            menu.classList.toggle('show');
        });
    });

    // Close language menus on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
            document.querySelectorAll('.lang-menu.show').forEach(m => {
                m.classList.remove('show');
            });
        }
    });

    // --- Mobile Industries Accordion ---
    const mobileIndToggle = document.getElementById('mobile-ind-toggle');
    const mobileIndList   = document.getElementById('mobile-ind-list');

    if (mobileIndToggle && mobileIndList) {
        mobileIndToggle.addEventListener('click', () => {
            const isOpen = mobileIndToggle.classList.contains('open');
            mobileIndToggle.classList.toggle('open', !isOpen);
            mobileIndList.classList.toggle('open', !isOpen);
            mobileIndToggle.setAttribute('aria-expanded', String(!isOpen));
        });
    }

    // Escape key closes all overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdownWrappers.forEach(w => {
                w.classList.remove('open');
                const b = w.querySelector('.nav-dropdown-btn');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (mobileNav) {
                mobileNav.classList.remove('open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
                }
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Handle Form 1 (Hero) Submission
    const form1 = document.getElementById('waitlist-form-1');
    if (form1) {
        form1.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const emailInput = document.getElementById('email-1');
            const email = emailInput.value;
            
            if (email) {
                const btn = form1.querySelector('button');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="margin-right: 6px;"></i> Joining...';
                btn.disabled = true;

                // Send to Node.js backend waitlist API
                fetch('https://replyvera-backend.onrender.com/api/leads/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                })
                .then(response => {
                    btn.innerHTML = 'Joined!';
                    btn.style.background = 'var(--success)';
                    btn.style.boxShadow = 'none';
                    
                    setTimeout(() => {
                        emailInput.value = ''; 
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(error => {
                    btn.innerHTML = 'Error';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 3000);
                });
            }
        });
    }

    // Handle Form 2 (Footer/CTA) Submission
    const form2 = document.getElementById('waitlist-form-2');
    if (form2) {
        form2.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email-2');
            const email = emailInput.value;
            const successMsg = document.getElementById('success-msg');
            const btn = form2.querySelector('button');
            
            if (email) {
                btn.disabled = true;
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Processing...';

                // Send to Node.js backend waitlist API
                fetch('https://replyvera-backend.onrender.com/api/leads/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                })
                .then(response => {
                    btn.innerHTML = originalText;
                    successMsg.style.display = 'flex';
                    successMsg.style.color = 'var(--accent)';
                    successMsg.innerHTML = '<i data-lucide="check-circle" style="width:16px; height:16px; margin-right:6px;"></i> You\'re on the list! Keep an eye on your inbox.';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    
                    setTimeout(() => {
                        emailInput.value = '';
                        successMsg.style.display = 'none';
                        btn.disabled = false;
                    }, 5000);
                })
                .catch(error => {
                    btn.innerHTML = originalText;
                    successMsg.style.display = 'flex';
                    successMsg.style.color = '#FF6B6B';
                    successMsg.innerHTML = '<i data-lucide="alert-triangle" style="width:16px; height:16px; margin-right:6px;"></i> Network error. Please try again.';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                        successMsg.style.color = '';
                        btn.disabled = false;
                    }, 4000);
                });
            }
        });
    }

    // Live AI Review Simulator Demo Logic (under interactive simulator)
    const btnGenerate = document.getElementById('btn-generate-demo');
    if (btnGenerate) {
        btnGenerate.addEventListener('click', async () => {
            const comment = document.getElementById('demo-comment').value;
            const rating = parseInt(document.getElementById('demo-rating').value);
            const tone = document.getElementById('demo-tone').value;
            const outputContainer = document.getElementById('demo-output-container');
            const replyTextEl = document.getElementById('demo-reply-text');

            if (!comment.trim()) {
                alert('Please type a sample review first!');
                return;
            }

            btnGenerate.disabled = true;
            const originalText = btnGenerate.innerHTML;
            btnGenerate.innerHTML = 'Writing reply...';
            outputContainer.style.display = 'none';

            try {
                const response = await fetch('https://replyvera-backend.onrender.com/api/settings/preview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        comment: comment,
                        rating: rating,
                        tone: tone,
                        businessName: 'The Mudhouse Hostel'
                    })
                });

                const data = await response.json();
                if (data.preview) {
                    replyTextEl.innerText = `"${data.preview}"`;
                    outputContainer.style.display = 'block';
                } else {
                    alert('AI failed to generate a reply: ' + (data.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('Demo error:', error);
                alert('Failed to connect to AI server. Please try again.');
            } finally {
                btnGenerate.innerHTML = originalText;
                btnGenerate.disabled = false;
            }
        });
    }

    // --- Automated Autopilot Product Demonstration Logic ---
    const interactiveDemoSection = document.getElementById('interactive-demo');
    const simProgress = document.getElementById('sim-progress-bar');
    const simReviewCard = document.querySelector('#interactive-demo div[style*="background: var(--bg-card-current)"]');
    const simReplyCard = document.getElementById('simulated-reply-card');
    const simReplyText = document.getElementById('sim-reply-text');
    const simStatus = document.getElementById('sim-status');
    const simActionsBox = document.getElementById('sim-actions-box');
    const btnSimApprove = document.getElementById('btn-sim-approve');
    const btnSimPublish = document.getElementById('btn-sim-publish');
    const simCompleteStatus = document.getElementById('sim-complete-status');
    const btnStartSim = document.getElementById('btn-start-simulation');

    let demoHasStarted = false;
    let simTimeoutIds = [];

    function clearAllDemoTimeouts() {
        simTimeoutIds.forEach(id => clearTimeout(id));
        simTimeoutIds = [];
    }

    function highlightDot(step) {
        document.querySelectorAll('.sim-step-dot').forEach((dot, index) => {
            if (index < step) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function runAutomatedDemo() {
        clearAllDemoTimeouts();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Reset Visual States
        if (btnStartSim) btnStartSim.style.display = 'none';
        simReviewCard.style.opacity = '0';
        simReviewCard.style.transform = 'translateY(-20px)';
        simReviewCard.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        simReplyCard.style.display = 'none';
        simReplyText.textContent = '';
        simStatus.textContent = 'Waiting for review...';
        simActionsBox.style.display = 'none';
        simCompleteStatus.style.display = 'none';
        btnSimApprove.style.display = 'inline-flex';
        btnSimApprove.disabled = false;
        btnSimApprove.style.opacity = '1';
        btnSimApprove.innerHTML = '<i data-lucide="check" style="width:14px; height:14px; margin-right:4px;"></i> Approve';
        btnSimPublish.style.display = 'inline-flex';
        btnSimPublish.disabled = false;
        btnSimPublish.style.opacity = '1';
        btnSimPublish.innerHTML = '<i data-lucide="globe" style="width:14px; height:14px; margin-right:4px;"></i> Publish';
        
        highlightDot(1);
        simProgress.style.width = '0%';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // 1. Review Arrives (0.8s)
        let t1 = setTimeout(() => {
            simReviewCard.style.opacity = '1';
            simReviewCard.style.transform = 'translateY(0)';
            simStatus.textContent = 'New review received';
            simProgress.style.width = '20%';
            highlightDot(2);
        }, 800);
        simTimeoutIds.push(t1);

        // 2. AI Starts Sentiment/Voice Analysis (2s)
        let t2 = setTimeout(() => {
            simReplyCard.style.display = 'block';
            simStatus.textContent = 'Analyzing review & brand voice...';
            simProgress.style.width = '40%';
            highlightDot(3);
        }, 2200);
        simTimeoutIds.push(t2);

        // 3. AI response typing (3.2s)
        let t3 = setTimeout(() => {
            simStatus.textContent = 'Drafting reply...';
            simProgress.style.width = '60%';
            
            const replyText = "Thank you for your kind words about our food and team. We’re sorry your delivery took longer than expected. We’re actively working to improve our delivery times and hope to serve you again soon.";
            
            if (prefersReducedMotion) {
                simReplyText.textContent = replyText;
                simStatus.textContent = 'Draft ready for review';
                simActionsBox.style.display = 'flex';
                triggerAutoApproval();
            } else {
                let index = 0;
                simReplyText.innerHTML = '<span class="sim-cursor"></span>';
                const cursor = simReplyText.querySelector('.sim-cursor');
                
                function typeChar() {
                    if (index < replyText.length) {
                        if (cursor) {
                            cursor.insertAdjacentText('beforebegin', replyText.charAt(index));
                        } else {
                            simReplyText.textContent += replyText.charAt(index);
                        }
                        index++;
                        let charTimeout = setTimeout(typeChar, 8); // Fast, snappy typing
                        simTimeoutIds.push(charTimeout);
                    } else {
                        simStatus.textContent = 'Draft ready for review';
                        if (cursor) cursor.remove();
                        simActionsBox.style.display = 'flex';
                        triggerAutoApproval();
                    }
                }
                typeChar();
            }
        }, 3400);
        simTimeoutIds.push(t3);
    }

    function triggerAutoApproval() {
        // 4. Auto-Approve Action Highlights & Click (1.5s after typing ends)
        let t4 = setTimeout(() => {
            btnSimApprove.style.border = '2px solid var(--accent)';
            btnSimApprove.style.boxShadow = '0 0 15px var(--accent)';
            
            let t5 = setTimeout(() => {
                btnSimApprove.innerHTML = '<i data-lucide="check-check" style="width:14px; height:14px; margin-right:4px;"></i> Approved';
                btnSimApprove.disabled = true;
                btnSimApprove.style.opacity = '0.7';
                btnSimApprove.style.boxShadow = 'none';
                btnSimApprove.style.border = 'none';
                simStatus.textContent = 'Draft approved';
                simProgress.style.width = '80%';
                highlightDot(4);
                if (typeof lucide !== 'undefined') lucide.createIcons();

                // 5. Auto-Publish (1.2s after approval)
                let t6 = setTimeout(() => {
                    btnSimPublish.style.border = '2px solid var(--primary-light)';
                    btnSimPublish.style.boxShadow = '0 0 15px var(--primary-light)';
                    
                    let t7 = setTimeout(() => {
                        btnSimPublish.style.display = 'none';
                        btnSimApprove.style.display = 'none';
                        simCompleteStatus.style.display = 'flex';
                        simStatus.textContent = 'Published successfully';
                        simProgress.style.width = '100%';
                        highlightDot(5);
                        if (typeof lucide !== 'undefined') lucide.createIcons();

                        // 6. Loop restart (4s after success)
                        let t8 = setTimeout(runAutomatedDemo, 4000);
                        simTimeoutIds.push(t8);

                    }, 600);
                    simTimeoutIds.push(t7);
                }, 1200);
                simTimeoutIds.push(t6);
            }, 600);
            simTimeoutIds.push(t5);
        }, 1500);
        simTimeoutIds.push(t4);
    }

    // Intersection Observer to trigger demo when scrolled into viewport
    if (interactiveDemoSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !demoHasStarted) {
                    demoHasStarted = true;
                    runAutomatedDemo();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(interactiveDemoSection);
    }



    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // --- Sticky Navbar Logic ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Roadmap Poll Form Handling ---
    const pollForm = document.getElementById('roadmap-poll-form');
    if (pollForm) {
        const otherRadio = document.getElementById('poll-option-other');
        const otherContainer = document.getElementById('other-input-container');
        const otherInput = document.getElementById('poll-option-other-text');
        
        pollForm.addEventListener('change', (e) => {
            if (e.target.name === 'poll_option') {
                if (e.target.id === 'poll-option-other') {
                    otherContainer.style.display = 'block';
                    otherInput.required = true;
                    otherInput.focus();
                } else {
                    otherContainer.style.display = 'none';
                    otherInput.required = false;
                }
            }
        });
        
        pollForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('poll-email');
            const selectedOption = pollForm.querySelector('input[name="poll_option"]:checked').value;
            const finalValue = selectedOption === 'Other' ? otherInput.value : selectedOption;
            const btn = pollForm.querySelector('button');
            const successMsg = document.getElementById('poll-success-msg');
            
            if (emailInput.value && finalValue) {
                btn.disabled = true;
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Submitting...';
                
                // Submit to waitlist/leads backend API with platform details
                fetch('https://replyvera-backend.onrender.com/api/leads/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        email: emailInput.value,
                        platform: finalValue,
                        source: 'roadmap_poll'
                    })
                })
                .then(response => {
                    pollForm.style.display = 'none';
                    successMsg.style.display = 'flex';
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                })
                .catch(error => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                });
            }
        });
    }

    // --- Cookie Consent Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    if (cookieBanner && acceptBtn && declineBtn) {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
                cookieBanner.setAttribute('aria-hidden', 'false');
            }, 1000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'accepted');
            cookieBanner.classList.remove('show');
            cookieBanner.setAttribute('aria-hidden', 'true');
        });

        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'declined');
            cookieBanner.classList.remove('show');
            cookieBanner.setAttribute('aria-hidden', 'true');
        });
    }

    // --- Vercel Analytics Event Tracking ---
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes('dashboard.replyvera.com')) {
            if (typeof window.va === 'function') {
                const action = link.href.includes('signup=true') ? 'signup_click' : 'login_click';
                window.va('track', action, {
                    text: link.textContent.trim(),
                    page: window.location.pathname
                });
            }
        }
    });
});
