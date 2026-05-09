const unitPrice = 1000;
const quantityInput = document.getElementById('quantity');
const totalDisplay = document.getElementById('total');

quantityInput.addEventListener('input', function() {
    let quantity = parseInt(quantityInput.value) || 0;
    if (quantity < 0) {
        quantity = 0;
        quantityInput.value = 0;
    }
    const total = unitPrice * quantity;
    totalDisplay.textContent = total;
    if (total > 1000) {
        alert('Congratulations! You are now eligible for a gift coupon.');
    }
});