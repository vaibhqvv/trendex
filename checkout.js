// Fetch products and display receipt with total amount
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalAmount = 0;
        const receiptContainer = document.querySelector('.receipt');

        if (cart.length > 0) {
            cart.forEach(item => {
                const product = products.find(p => p.id == item.product_id);
                totalAmount += product.price * item.quantity;

                // Create a receipt item element
                let receiptItem = document.createElement('div');
                receiptItem.classList.add('receipt-item');
                receiptItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="details">
                        <p>${product.name}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="price">$${(product.price * item.quantity).toFixed(2)}</div>
                `;
                receiptContainer.appendChild(receiptItem);
            });
        }

        // Display total amount
        document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
    })
    .catch(err => console.error('Error fetching products:', err));

// Handle Proceed to Pay button click
document.getElementById('proceedToPay').addEventListener('click', () => {
    alert('Proceeding to payment!');
    // Implement payment functionality here
});
