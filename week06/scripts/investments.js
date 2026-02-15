// Investment packages array
const investmentPackages = [
    { id: 'pkg-001', name: 'Starter Poultry', minAmount: 1000, maxAmount: 10000, returns: '8-10%', term: '1 year' },
    { id: 'pkg-002', name: 'Growth Hydroponics', minAmount: 2500, maxAmount: 25000, returns: '10-15%', term: '3 years' },
    { id: 'pkg-003', name: 'Premium Aquaculture', minAmount: 5000, maxAmount: 50000, returns: '12-18%', term: '5 years' },
    { id: 'pkg-004', name: 'Diversified Portfolio', minAmount: 10000, maxAmount: 100000, returns: '11-16%', term: 'Mixed' }
];

// Interest areas array
const interestAreas = [
    { id: 'area-001', value: 'aquaculture', label: '🐟 Aquaculture' },
    { id: 'area-002', value: 'hydroponics', label: '🌱 Hydroponics' },
    { id: 'area-003', value: 'poultry', label: '🐔 Poultry' },
    { id: 'area-004', value: 'processing', label: '🏭 Food Processing' },
    { id: 'area-005', value: 'distribution', label: '🚚 Distribution' }
];

document.addEventListener('DOMContentLoaded', () => {
    populatePackages();
    populateInterestAreas();
    setupLiveSummary();
    displayRecentInvestments();
    setupFormValidation();
    setFooterDates();
});

// Populate investment packages select
function populatePackages() {
    const select = document.getElementById('package');
    if (!select) return;

    // Clear existing options (keep placeholder)
    while (select.options.length > 1) {
        select.remove(1);
    }

    // Add packages from array
    investmentPackages.forEach(pkg => {
        const option = document.createElement('option');
        option.value = pkg.id;
        option.textContent = `${pkg.name} - $${pkg.minAmount.toLocaleString()} min`;
        option.dataset.minAmount = pkg.minAmount;
        option.dataset.maxAmount = pkg.maxAmount;
        option.dataset.returns = pkg.returns;
        option.dataset.term = pkg.term;
        select.appendChild(option);
    });
}

// Populate interest areas checkboxes
function populateInterestAreas() {
    const container = document.getElementById('interest-areas');
    if (!container) return;

    container.innerHTML = interestAreas.map(area => `
        <label class="checkbox-label">
            <input type="checkbox" name="interestArea" value="${area.value}">
            <span>${area.label}</span>
        </label>
    `).join('');
}

// Live investment summary
function setupLiveSummary() {
    const packageSelect = document.getElementById('package');
    const amountInput = document.getElementById('amount');
    const summaryDiv = document.getElementById('live-summary');

    function updateSummary() {
        if (!packageSelect || !amountInput || !summaryDiv) return;

        const selectedOption = packageSelect.options[packageSelect.selectedIndex];
        const amount = parseFloat(amountInput.value) || 0;

        if (packageSelect.value && amount > 0) {
            const minAmount = parseFloat(selectedOption.dataset.minAmount);
            const maxAmount = parseFloat(selectedOption.dataset.maxAmount);

            if (amount < minAmount) {
                summaryDiv.innerHTML = `
                    <div class="summary-warning">
                        ⚠️ Minimum investment for this package is $${minAmount.toLocaleString()}
                    </div>
                `;
            } else if (amount > maxAmount) {
                summaryDiv.innerHTML = `
                    <div class="summary-warning">
                        ⚠️ Maximum investment for this package is $${maxAmount.toLocaleString()}
                    </div>
                `;
            } else {
                summaryDiv.innerHTML = `
                    <div class="summary-success">
                        <h4>${selectedOption.textContent.split(' - ')[0]}</h4>
                        <p>Investment: $${amount.toLocaleString()}</p>
                        <p>Expected Returns: ${selectedOption.dataset.returns}</p>
                        <p>Term: ${selectedOption.dataset.term}</p>
                        <p class="summary-note">✓ Within investment limits</p>
                    </div>
                `;
            }
        } else {
            summaryDiv.innerHTML = '<p>Select a package and enter amount to see details</p>';
        }
    }

    packageSelect.addEventListener('change', updateSummary);
    amountInput.addEventListener('input', updateSummary);
}

// Display recent investments from localStorage
function displayRecentInvestments() {
    const container = document.getElementById('recent-investments-list');
    if (!container) return;

    const recentInvestments = JSON.parse(localStorage.getItem('recentInvestments') || '[]');

    if (recentInvestments.length === 0) {
        container.innerHTML = '<p class="no-data">No recent investments to display</p>';
        return;
    }

    container.innerHTML = recentInvestments.slice(-3).reverse().map(inv => `
        <div class="recent-item">
            <div class="recent-package">${inv.package}</div>
            <div class="recent-amount">$${inv.amount.toLocaleString()}</div>
            <div class="recent-date">${inv.date}</div>
        </div>
    `).join('');
}

// Form validation and submission
function setupFormValidation() {
    const form = document.getElementById('investment-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateForm()) {
                saveInvestmentToStorage();
                form.submit();
            }
        });
    }
}

// Validate form
function validateForm() {
    const packageSelect = document.getElementById('package');
    const amount = document.getElementById('amount');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const agree = document.getElementById('agree');

    // Check required fields
    if (!packageSelect.value) {
        alert('Please select an investment package');
        packageSelect.focus();
        return false;
    }

    const amountValue = parseFloat(amount.value);
    if (!amountValue || amountValue < 1000) {
        alert('Please enter a valid investment amount (minimum $1,000)');
        amount.focus();
        return false;
    }

    if (!fullname.value.trim()) {
        alert('Please enter your full name');
        fullname.focus();
        return false;
    }

    if (!email.value || !email.value.includes('@')) {
        alert('Please enter a valid email address');
        email.focus();
        return false;
    }

    if (!agree.checked) {
        alert('Please agree to the terms and disclaimer');
        agree.focus();
        return false;
    }

    return true;
}

// Save investment to localStorage
function saveInvestmentToStorage() {
    const packageSelect = document.getElementById('package');
    const selectedOption = packageSelect.options[packageSelect.selectedIndex];
    const amount = document.getElementById('amount').value;
    const fullname = document.getElementById('fullname').value;

    const investment = {
        id: Date.now(),
        package: selectedOption.textContent.split(' - ')[0],
        amount: parseFloat(amount),
        name: fullname,
        date: new Date().toLocaleDateString()
    };

    let recentInvestments = JSON.parse(localStorage.getItem('recentInvestments') || '[]');
    recentInvestments.push(investment);

    // Keep only last 10 investments
    if (recentInvestments.length > 10) {
        recentInvestments = recentInvestments.slice(-10);
    }

    localStorage.setItem('recentInvestments', JSON.stringify(recentInvestments));

    // Update counter
    let submissionCount = parseInt(localStorage.getItem('submissionCount') || '0');
    submissionCount++;
    localStorage.setItem('submissionCount', submissionCount.toString());
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