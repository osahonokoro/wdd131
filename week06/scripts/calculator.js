// Advanced investment calculator with charts
class InvestmentCalculator {
    constructor() {
        this.initializeChart();
        this.setupEventListeners();
    }

    initializeChart() {
        // Can use Chart.js or similar if you want to add charts
    }

    setupEventListeners() {
        // Additional calculator features
    }

    calculateCompoundInterest(principal, rate, time, compoundsPerYear = 4) {
        return principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * time);
    }
}