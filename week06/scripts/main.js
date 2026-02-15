// Main JavaScript file for BlueFin Capital

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeSite();
    loadStats();
    loadOpportunities();
    loadTestimonials();
    setupMobileMenu();
    setupLazyLoading();
    setupNewsletterForm();
    setupInvestmentCalculator();
    loadFAQ();
    setFooterDates();
});

// Site initialization
function initializeSite() {
    console.log('BlueFin Capital site initialized');
    checkLocalStorage();
}

// Check and initialize localStorage
function checkLocalStorage() {
    if (!localStorage.getItem('visitorCount')) {
        localStorage.setItem('visitorCount', '1');
    } else {
        let count = parseInt(localStorage.getItem('visitorCount')) + 1;
        localStorage.setItem('visitorCount', count.toString());
    }

    if (!localStorage.getItem('recentInvestments')) {
        localStorage.setItem('recentInvestments', JSON.stringify([]));
    }
}

// Stats data array
const stats = [
    { icon: '💰', value: '$2.5M', label: 'Total Investments' },
    { icon: '🌾', value: '150+', label: 'Acres Farmed' },
    { icon: '👥', value: '500+', label: 'Active Investors' },
    { icon: '📈', value: '14%', label: 'Average Returns' }
];

// Load stats dynamically
function loadStats() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    container.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

// Opportunities array with objects
const opportunities = [
    {
        id: 1,
        title: 'Aquaculture',
        description: 'Invest in sustainable fish farming operations with proven returns.',
        minInvestment: 5000,
        returns: '12-15%',
        image: 'images/aquaculture-small.webp',
        tags: ['Sustainable', 'High Demand']
    },
    {
        id: 2,
        title: 'Hydroponics',
        description: 'Year-round vegetable production with minimal water usage.',
        minInvestment: 2500,
        returns: '10-18%',
        image: 'images/hydroponics-small.webp',
        tags: ['Urban', 'Water Efficient']
    },
    {
        id: 3,
        title: 'Poultry',
        description: 'Free-range organic egg production for local markets.',
        minInvestment: 1000,
        returns: '8-12%',
        image: 'images/poultry-small.webp',
        tags: ['Organic', 'Local']
    }
];

// Load opportunities dynamically
function loadOpportunities() {
    const container = document.getElementById('opportunities-container');
    if (!container) return;

    container.innerHTML = opportunities.map(opp => `
        <article class="opportunity-card">
            <img src="${opp.image}" alt="${opp.title}" loading="lazy">
            <h3>${opp.title}</h3>
            <p>${opp.description}</p>
            <div class="opportunity-details">
                <span>Min: $${opp.minInvestment.toLocaleString()}</span>
                <span>Returns: ${opp.returns}</span>
            </div>
            <div class="tags">
                ${opp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="invest.html?type=${opp.id}" class="learn-more">Learn More →</a>
        </article>
    `).join('');
}

// Testimonials array
const testimonials = [
    {
        name: 'Sarah Johnson',
        location: 'Idaho',
        text: 'I invested in the aquaculture project two years ago and have seen consistent returns. The transparency is refreshing.',
        rating: 5,
        investment: '$15,000'
    },
    {
        name: 'Michael Chen',
        location: 'California',
        text: 'The hydroponics investment allowed me to diversify my portfolio while supporting sustainable agriculture.',
        rating: 4,
        investment: '$7,500'
    },
    {
        name: 'Roberto Garcia',
        location: 'Texas',
        text: 'Started with poultry farming investment. The quarterly reports are detailed and the team is responsive.',
        rating: 5,
        investment: '$5,000'
    }
];

// Load testimonials with slider functionality
function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    let currentIndex = 0;

    function displayTestimonial(index) {
        const t = testimonials[index];
        container.innerHTML = `
            <div class="testimonial-card active">
                <div class="testimonial-rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">
                    <strong>${t.name}</strong>
                    <span>${t.location}</span>
                    <span class="investment-amount">Investment: ${t.investment}</span>
                </div>
            </div>
        `;
    }

    displayTestimonial(0);

    // Setup slider buttons
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            displayTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            displayTestimonial(currentIndex);
        });
    }
}

// FAQ data array
const faqData = [
    {
        question: 'What is the minimum investment amount?',
        answer: 'Our minimum investment starts at $1,000 for poultry projects, $2,500 for hydroponics, and $5,000 for aquaculture projects.'
    },
    {
        question: 'How are returns calculated and distributed?',
        answer: 'Returns are calculated based on farm yield and market prices, distributed quarterly directly to your bank account.'
    },
    {
        question: 'Is my investment protected?',
        answer: 'Yes, all investments are held in third-party escrow accounts until farm operations begin and during the growing cycle.'
    },
    {
        question: 'Can I visit the farms I invest in?',
        answer: 'Yes, we welcome investors to schedule visits to our partner farms. Contact us to arrange a tour.'
    }
];

// Load FAQ with accordion functionality
function loadFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = faqData.map((faq, index) => `
        <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
                ${faq.question}
                <span class="faq-icon">▼</span>
            </button>
            <div class="faq-answer" id="faq-${index}" hidden>
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');

    // Add event listeners for accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);
            const answer = button.nextElementSibling;
            answer.hidden = expanded;
            button.querySelector('.faq-icon').textContent = expanded ? '▼' : '▲';
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('active');
            toggle.textContent = expanded ? '☰' : '✕';
        });
    }
}

// Lazy loading for images
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Newsletter form handling
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const message = document.getElementById('newsletter-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('newsletter-email').value;

            // Simple validation
            if (email && email.includes('@')) {
                // Store in localStorage
                let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
                subscribers.push({ email, date: new Date().toISOString() });
                localStorage.setItem('subscribers', JSON.stringify(subscribers));

                message.textContent = 'Thank you for subscribing!';
                message.className = 'form-message success';
                form.reset();
            } else {
                message.textContent = 'Please enter a valid email address.';
                message.className = 'form-message error';
            }
        });
    }
}

// Investment calculator functionality
function setupInvestmentCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('investment-amount').value) || 10000;
            const term = parseInt(document.getElementById('investment-term').value);
            const type = document.getElementById('investment-type').value;

            // Returns by investment type
            const returnsMap = {
                'aquaculture': 0.14,
                'hydroponics': 0.15,
                'poultry': 0.10
            };

            const annualReturn = returnsMap[type] || 0.12;
            const totalReturn = amount * annualReturn * term;
            const totalValue = amount + totalReturn;

            document.getElementById('initial-display').textContent = `$${amount.toLocaleString()}`;
            document.getElementById('returns-display').textContent = `$${totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
            document.getElementById('total-display').textContent = `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

            // Save calculation to localStorage
            const calculations = JSON.parse(localStorage.getItem('calculations') || '[]');
            calculations.push({
                amount,
                term,
                type,
                totalValue,
                date: new Date().toISOString()
            });
            localStorage.setItem('calculations', JSON.stringify(calculations.slice(-5)));
        });
    }
}

// Set footer dates
function setFooterDates() {
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const modifiedSpan = document.getElementById('lastModified');
    if (modifiedSpan) {
        modifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    }
}