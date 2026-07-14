document.addEventListener('DOMContentLoaded', () => {
    
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
                    // Show success
                    btn.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 6px;"></i> Joined!';
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
                    // Show error state gracefully
                    btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error';
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
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';

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
                    successMsg.style.color = 'var(--success)';
                    successMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> You\'re on the list! Keep an eye on your inbox.';
                    
                    setTimeout(() => {
                        emailInput.value = '';
                        successMsg.style.display = 'none';
                        btn.disabled = false;
                    }, 5000);
                })
                .catch(error => {
                    btn.innerHTML = originalText;
                    successMsg.style.display = 'flex';
                    successMsg.style.color = 'var(--danger)';
                    successMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network error. Please try again.';
                    
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                        successMsg.style.color = '';
                        btn.disabled = false;
                    }, 4000);
                });
            }
        });
    }

    // Simple interaction for the Tone Selector in Solution section
    const tonePills = document.querySelectorAll('.tone-pills span');
    if (tonePills.length > 0) {
        tonePills.forEach(pill => {
            pill.addEventListener('click', () => {
                tonePills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                
                // Update Code Block mock data
                const tag = document.querySelector('.code-line:nth-child(2) .tag');
                if (tag) {
                    if (pill.innerText === 'Professional') tag.innerText = '"Helpful team"';
                    if (pill.innerText === 'Friendly') tag.innerText = '"Super nice folks"';
                    if (pill.innerText === 'Appreciative') tag.innerText = '"Thank you!"';
                }
            });
        });
    }
    // Live AI Review Simulator Demo Logic
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
            btnGenerate.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin" style="margin-right: 6px;"></i> Writing reply...';
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
});
