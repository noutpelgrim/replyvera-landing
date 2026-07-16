import re

css = '''
/* ─── Pricing Page Redesign ─── */
.pricing-4-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    align-items: stretch;
}
.pricing-4-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--border-current, var(--border));
    background: var(--bg-card-current, var(--bg-card));
    padding: 24px;
    border-radius: var(--radius-lg);
    transition: transform var(--transition-fast), border var(--transition-fast), box-shadow var(--transition-fast);
}
.pricing-4-card.recommended {
    border: 2px solid var(--accent);
    background: rgba(16, 185, 129, 0.02);
    position: relative;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.05);
}
.pricing-4-card.recommended::before {
    content: "Most Popular";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: #07070B;
    font-weight: 700;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 3px 10px;
    border-radius: 20px;
}
.pricing-4-feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 0.88rem;
}
.pricing-4-feature-list li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.4;
}
.pricing-4-feature-list i {
    flex-shrink: 0;
    margin-top: 2px;
}
.pricing-billing-toggle {
    display: inline-flex;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 30px;
    padding: 4px;
    margin: 24px auto;
    border: 1px solid var(--border-current, var(--border));
}
.pricing-billing-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary-current, var(--text-secondary));
    padding: 8px 16px;
    border-radius: 24px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
}
.pricing-billing-btn.active {
    background: var(--accent);
    color: #07070B;
}
.pricing-annual-badge {
    color: var(--accent);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 6px;
}
.pricing-billing-btn.active .pricing-annual-badge {
    color: #000;
}

/* Mobile Nav Selector */
.mobile-plan-selector {
    display: none;
    position: sticky;
    top: 60px;
    z-index: 100;
    background: var(--bg-current, var(--bg));
    border-bottom: 1px solid var(--border-current, var(--border));
    padding: 12px 0;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}
.mobile-plan-selector-inner {
    display: flex;
    gap: 8px;
    padding: 0 16px;
}
.mobile-plan-btn {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-current, var(--border));
    border-radius: 20px;
    color: var(--text-primary-current, #FFF);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    min-height: 44px;
    line-height: 26px;
}
.mobile-plan-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* Comparison Expand/Collapse */
.comparison-container {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
}
.comparison-container.expanded {
    max-height: 5000px;
    transition: max-height 0.8s ease-in-out;
}
.compare-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid var(--border-current, var(--border));
    color: var(--text-primary-current, #FFF);
    padding: 10px 24px;
    border-radius: 30px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}
.compare-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.05);
}
.compare-toggle-btn i {
    transition: transform 0.3s ease;
}
.compare-toggle-btn[aria-expanded="true"] i {
    transform: rotate(180deg);
}

/* FAQ Accordion */
.faq-accordion details {
    border-bottom: 1px solid var(--border-current, var(--border));
}
.faq-accordion summary {
    list-style: none;
    padding: 24px 0;
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--text-primary-current, #FFF);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.faq-accordion summary::-webkit-details-marker {
    display: none;
}
.faq-accordion summary i {
    transition: transform 0.2s ease;
    color: var(--accent);
}
.faq-accordion details[open] summary i {
    transform: rotate(180deg);
}
.faq-accordion .faq-content {
    padding-bottom: 24px;
    color: var(--text-secondary-current, var(--text-secondary));
    font-size: 0.95rem;
    line-height: 1.5;
}

@media (max-width: 1024px) {
    .pricing-4-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 768px) {
    .pricing-4-grid {
        grid-template-columns: 1fr;
    }
    .mobile-plan-selector {
        display: block;
    }
}
'''
with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)

html_content = """
    <!-- Mobile Plan Selector -->
    <div class="mobile-plan-selector theme-dark">
        <div class="mobile-plan-selector-inner container">
            <a href="#plan-starter" class="mobile-plan-btn">Starter</a>
            <a href="#plan-autopilot" class="mobile-plan-btn">Autopilot</a>
            <a href="#plan-multi" class="mobile-plan-btn">Multi-Location</a>
            <a href="#plan-agency" class="mobile-plan-btn">Agency</a>
        </div>
    </div>

    <!-- Pricing Hero Section -->
    <header class="hero theme-dark" style="padding: 100px 0 20px;">
        <div class="hero-glow-layer"></div>
        <div class="container hero-content" style="max-width: 800px; margin: 0 auto; text-align: center;">
            <h1 style="font-size: 2.5rem; margin-bottom: 12px; letter-spacing: -0.02em;">Simple Pricing. No Sales Call Required.</h1>
            <p class="lead-text" style="margin-bottom: 0; font-size: 1.1rem; color: var(--text-secondary-current);">
                Choose the level of automation and number of locations that fit your business.
            </p>
            
            <!-- Billing Toggle -->
            <div class="pricing-billing-toggle">
                <button class="pricing-billing-btn active" id="btn-monthly" onclick="setBilling('monthly')">Monthly</button>
                <button class="pricing-billing-btn" id="btn-annual" onclick="setBilling('annual')">Annual <span class="pricing-annual-badge">Save 2 Months</span></button>
            </div>
        </div>
    </header>

    <!-- Pricing Cards Grid Section -->
    <section class="section theme-dark" id="pricing" style="padding: 20px 0 60px;">
        <div class="container">
            <div class="pricing-4-grid mb-12">
                
                <!-- Starter Card -->
                <div class="pricing-4-card" id="plan-starter">
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color:var(--text-primary-current); font-size:1.4rem; font-weight:700; margin-bottom: 4px;">Starter</h4>
                            <p style="font-size:0.85rem; color:var(--text-secondary-current); min-height: 40px; margin-bottom: 16px; line-height: 1.4;">For businesses that approve every reply before publishing.</p>
                            
                            <div style="display:flex; align-items:baseline; margin-bottom: 4px;">
                                <span style="font-size: 2.2rem; font-weight: 800; color: #FFF;" class="price-val" data-monthly="$29" data-annual="$290">$29</span>
                                <span style="color: var(--text-secondary-current); font-size: 0.9rem; margin-left: 4px;" class="price-period" data-monthly="/ month" data-annual="billed annually">/ month</span>
                            </div>
                        </div>
                        
                        <ul class="pricing-4-feature-list">
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> 1 business location</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Up to 30 replies per month</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Manual approval</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Custom tone</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> English and Spanish</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Negative-review alerts</li>
                        </ul>
                    </div>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-secondary" style="width: 100%; text-align: center; justify-content: center;">Start Free Trial</a>
                </div>

                <!-- Autopilot Card -->
                <div class="pricing-4-card recommended" id="plan-autopilot">
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color:var(--text-primary-current); font-size:1.4rem; font-weight:700; margin-bottom: 4px;">Autopilot</h4>
                            <p style="font-size:0.85rem; color:var(--text-secondary-current); min-height: 40px; margin-bottom: 16px; line-height: 1.4;">For businesses that want safe review replies published automatically.</p>
                            
                            <div style="display:flex; align-items:baseline; margin-bottom: 4px;">
                                <span style="font-size: 2.2rem; font-weight: 800; color: #FFF;" class="price-val" data-monthly="$39" data-annual="$390">$39</span>
                                <span style="color: var(--text-secondary-current); font-size: 0.9rem; margin-left: 4px;" class="price-period" data-monthly="/ month" data-annual="billed annually">/ month</span>
                            </div>
                        </div>
                        
                        <ul class="pricing-4-feature-list">
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> 1 business location</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Unlimited replies*</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Safe replies auto-publish</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Sensitive reviews require approval</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Custom brand voice</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Review history</li>
                        </ul>
                    </div>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="width: 100%; text-align: center; justify-content: center;">Start Free Trial</a>
                </div>

                <!-- Multi-Location Card -->
                <div class="pricing-4-card" id="plan-multi">
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color:var(--text-primary-current); font-size:1.4rem; font-weight:700; margin-bottom: 4px;">Multi-Location</h4>
                            <p style="font-size:0.85rem; color:var(--text-secondary-current); min-height: 40px; margin-bottom: 16px; line-height: 1.4;">For businesses managing several locations.</p>
                            
                            <div style="display:flex; align-items:baseline; margin-bottom: 4px;">
                                <span style="font-size: 2.2rem; font-weight: 800; color: #FFF;" class="price-val" data-monthly="$79" data-annual="$790"><span style="font-size:1.2rem;font-weight:600;margin-right:4px;">From</span>$79</span>
                                <span style="color: var(--text-secondary-current); font-size: 0.9rem; margin-left: 4px;" class="price-period" data-monthly="/ month" data-annual="billed annually">/ month</span>
                            </div>
                        </div>
                        
                        <ul class="pricing-4-feature-list">
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> 3 locations included</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Central dashboard</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Unlimited replies*</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Location-specific rules</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Team access</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Additional locations available</li>
                        </ul>
                    </div>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-secondary" style="width: 100%; text-align: center; justify-content: center;">Start Multi-Location Trial</a>
                </div>

                <!-- Agency Card -->
                <div class="pricing-4-card" id="plan-agency">
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h4 style="color:var(--text-primary-current); font-size:1.4rem; font-weight:700; margin-bottom: 4px;">Agency</h4>
                            <p style="font-size:0.85rem; color:var(--text-secondary-current); min-height: 40px; margin-bottom: 16px; line-height: 1.4;">For agencies managing Google review replies for multiple clients.</p>
                            
                            <div style="display:flex; align-items:baseline; margin-bottom: 4px;">
                                <span style="font-size: 2.2rem; font-weight: 800; color: #FFF;" class="price-val" data-monthly="$149" data-annual="$1490"><span style="font-size:1.2rem;font-weight:600;margin-right:4px;">From</span>$149</span>
                                <span style="color: var(--text-secondary-current); font-size: 0.9rem; margin-left: 4px;" class="price-period" data-monthly="/ month" data-annual="billed annually">/ month</span>
                            </div>
                        </div>
                        
                        <ul class="pricing-4-feature-list">
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> 10 client locations included</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Multi-client dashboard</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Separate client brand voices</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Client approval access</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Team access</li>
                            <li><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Agency reporting</li>
                        </ul>
                    </div>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-secondary" style="width: 100%; text-align: center; justify-content: center;">Start Agency Trial</a>
                </div>

            </div>
            
            <p style="font-size: 0.8rem; color: var(--text-secondary-current); text-align: center; margin-bottom: 32px;">
                *Unlimited replies are subject to reasonable-use limits.
            </p>
            
            <div class="text-center">
                <button class="compare-toggle-btn" id="compare-toggle" aria-expanded="false" aria-controls="comparison-container">
                    Compare All Features <i data-lucide="chevron-down" style="width:16px;height:16px;"></i>
                </button>
            </div>
        </div>
    </section>

    <!-- Pricing Comparison Section -->
    <section class="section theme-light" id="comparison" style="border-top: 1px solid var(--border-current); padding: 40px 0;">
        <div class="container">
            <div class="comparison-container" id="comparison-container">
                <div class="comparison-table-wrapper" style="margin-bottom: 40px;">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Features</th>
                                <th>Starter</th>
                                <th>Autopilot</th>
                                <th>Multi-Location</th>
                                <th>Agency</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Locations included</td>
                                <td>1 Location</td>
                                <td>1 Location</td>
                                <td>3 Locations</td>
                                <td>10 Locations</td>
                            </tr>
                            <tr>
                                <td>Monthly reply limit</td>
                                <td>30 replies</td>
                                <td>Unlimited</td>
                                <td>Unlimited</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>Manual approval</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Automatic publishing</td>
                                <td>Not included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Sensitive-review detection</td>
                                <td>Not included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Custom tone</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>English and Spanish</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Employee-name recognition</td>
                                <td>Not included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Review history</td>
                                <td>Not included</td>
                                <td>Included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Team access</td>
                                <td>Not included</td>
                                <td>Not included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Multi-location reporting</td>
                                <td>Not included</td>
                                <td>Not included</td>
                                <td>Included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Client dashboard</td>
                                <td>Not included</td>
                                <td>Not included</td>
                                <td>Not included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Client approval access</td>
                                <td>Not included</td>
                                <td>Not included</td>
                                <td>Not included</td>
                                <td>Included</td>
                            </tr>
                            <tr>
                                <td>Support level</td>
                                <td>Standard</td>
                                <td>Priority</td>
                                <td>Priority</td>
                                <td>Dedicated</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- FAQ Section -->
            <div id="faq" style="max-width: 800px; margin: 0 auto;">
                <div class="text-center mb-8">
                    <h2 class="mb-4">Frequently Asked Questions</h2>
                </div>
                
                <div class="faq-accordion">
                    <details>
                        <summary>Can I cancel at any time? <i data-lucide="chevron-down" style="width:18px;height:18px;"></i></summary>
                        <div class="faq-content">Yes. ReplyVera is billed monthly or annually, and you can cancel before your next billing date.</div>
                    </details>
                    <details>
                        <summary>Is there a setup fee? <i data-lucide="chevron-down" style="width:18px;height:18px;"></i></summary>
                        <div class="faq-content">No. There is no setup fee for standard plans.</div>
                    </details>
                    <details>
                        <summary>Does each location need its own plan? <i data-lucide="chevron-down" style="width:18px;height:18px;"></i></summary>
                        <div class="faq-content">Starter and Autopilot include one location. Multi-location and Agency plans include several locations and allow additional locations to be added for a fee.</div>
                    </details>
                    <details>
                        <summary>Are replies unlimited? <i data-lucide="chevron-down" style="width:18px;height:18px;"></i></summary>
                        <div class="faq-content">The Starter plan includes up to 30 replies per month. Autopilot, Multi-Location, and Agency plans include unlimited responses subject to reasonable-use limits.</div>
                    </details>
                    <details>
                        <summary>Which review platforms are supported? <i data-lucide="chevron-down" style="width:18px;height:18px;"></i></summary>
                        <div class="faq-content">ReplyVera currently supports Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.</div>
                    </details>
                    <details>
                        <summary>Can I change plans later? <i data-lucide="chevron-down" style="width:18px;height:18px;"></i></summary>
                        <div class="faq-content">Yes. You can upgrade or downgrade your plan as your review volume or number of locations changes.</div>
                    </details>
                </div>
                
                <p style="font-size: 0.85rem; color: var(--text-secondary-current); text-align: center; margin-top: 40px; font-weight: 500;">
                    Currently supported: Google Reviews<br>
                    Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.
                </p>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="section theme-dark" style="border-top: 1px solid rgba(255, 255, 255, 0.04); padding: 60px 0;">
        <div class="container text-center" style="max-width: 650px;">
            <h2 class="mb-6">Ready to automate your Google review replies?</h2>
            <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="padding: 14px 28px; font-size:0.95rem;">Start Your Free Trial</a>
        </div>
    </section>
"""

with open('pricing.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# Replace from <!-- Pricing Hero Section --> down to <!-- Footer -->
# using a regex to grab the chunk to replace
start_marker = "<!-- Pricing Hero Section -->"
end_marker = "<!-- Footer -->"
start_idx = orig.find(start_marker)
end_idx = orig.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_html = orig[:start_idx] + html_content + orig[end_idx:]
    with open('pricing.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
else:
    print("Markers not found!")

# Add JS logic before </body>
js_logic = """
    <script>
        // Billing Toggle Logic
        function setBilling(mode) {
            const btnMonthly = document.getElementById('btn-monthly');
            const btnAnnual = document.getElementById('btn-annual');
            const priceVals = document.querySelectorAll('.price-val');
            const pricePeriods = document.querySelectorAll('.price-period');
            
            if (mode === 'annual') {
                btnAnnual.classList.add('active');
                btnMonthly.classList.remove('active');
                priceVals.forEach(el => {
                    let val = el.getAttribute('data-annual');
                    if(val === '$790' || val === '$1490') {
                        el.innerHTML = '<span style="font-size:1.2rem;font-weight:600;margin-right:4px;">From</span>' + val;
                    } else {
                        el.textContent = val;
                    }
                });
                pricePeriods.forEach(el => el.textContent = el.getAttribute('data-annual'));
            } else {
                btnMonthly.classList.add('active');
                btnAnnual.classList.remove('active');
                priceVals.forEach(el => {
                    let val = el.getAttribute('data-monthly');
                    if(val === '$79' || val === '$149') {
                        el.innerHTML = '<span style="font-size:1.2rem;font-weight:600;margin-right:4px;">From</span>' + val;
                    } else {
                        el.textContent = val;
                    }
                });
                pricePeriods.forEach(el => el.textContent = el.getAttribute('data-monthly'));
            }
        }

        // Compare Toggle Logic
        document.addEventListener('DOMContentLoaded', () => {
            const compareBtn = document.getElementById('compare-toggle');
            const compareContainer = document.getElementById('comparison-container');
            
            if(compareBtn && compareContainer) {
                compareBtn.addEventListener('click', () => {
                    const isExpanded = compareBtn.getAttribute('aria-expanded') === 'true';
                    compareBtn.setAttribute('aria-expanded', !isExpanded);
                    if (!isExpanded) {
                        compareContainer.classList.add('expanded');
                    } else {
                        compareContainer.classList.remove('expanded');
                    }
                });
            }
        });
    </script>
"""

with open('pricing.html', 'r', encoding='utf-8') as f:
    html = f.read()
    html = html.replace('</body>', js_logic + '</body>')
with open('pricing.html', 'w', encoding='utf-8') as f:
    f.write(html)
