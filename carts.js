// Dark Mode Toggle
const themeToggle = document.querySelector('.dark-mode-toggle');
const themeIcon = document.querySelector('#theme-icon');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if(themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Cart Products
let productsIncart = localStorage.getItem("productsIncart");
let checkoutContent = document.querySelector("#checkout-content");

if(productsIncart){
    let items = JSON.parse(productsIncart);
    drawCheckoutPage(items);
}

function drawCheckoutPage(items) {
    if(!checkoutContent) return;
    
    if(items.length === 0) {
        checkoutContent.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Discover our exclusive collection of motorcycles</p>
                <a href="index.html" class="checkout-btn" style="display: inline-block; width: auto; padding: 12px 35px; text-decoration: none; margin-top: 25px;">
                    <i class="fa-solid fa-shopping-bag"></i> Continue Shopping
                </a>
            </div>
        `;
        return;
    }

    let cartItemsHTML = items.map((item) => {
        return `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.imageUrl}" alt="${item.title}">
                </div>
                <div class="checkout-item-details">
                    <h3>${item.title}</h3>
                    <p>${item.description || 'Premium Motorcycle'}</p>
                    <p><i class="fa-solid fa-palette"></i> Color: ${item.color}</p>
                    <p class="item-price-mobile">$${(item.price * (item.quantity || 1)).toLocaleString()}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="decreaseQuantity(${item.id})">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity || 1}</span>
                    <button class="quantity-btn plus" onclick="increaseQuantity(${item.id})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="checkout-item-price">$${(item.price * (item.quantity || 1)).toLocaleString()}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i> <span class="remove-text">Remove</span>
                </button>
            </div>
        `;
    }).join("");

    let subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    let shipping = subtotal > 5000 ? 0 : 50;
    let tax = subtotal * 0.1;
    let finalTotal = subtotal + shipping + tax;

    checkoutContent.innerHTML = `
        <div class="checkout-items">
            <div class="checkout-header">
                <h2><i class="fa-solid fa-box"></i> Cart Items (${items.length})</h2>
                <button class="clear-cart-btn" onclick="clearCart()">
                    <i class="fa-solid fa-trash"></i> Clear Cart
                </button>
            </div>
            ${cartItemsHTML}
        </div>
        
        <div class="checkout-summary">
            <h2><i class="fa-solid fa-receipt"></i> Order Summary</h2>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping}</span>
            </div>
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            ${shipping > 0 ? '<p class="shipping-info"><i class="fa-solid fa-truck"></i> Free shipping on orders over $5,000</p>' : ''}
            <button class="checkout-btn" onclick="proceedToCheckout()">
                <i class="fa-solid fa-credit-card"></i> Proceed to Payment
            </button>
            <a href="index.html" class="continue-shopping">
                <i class="fa-solid fa-arrow-left"></i> Continue Shopping
            </a>
        </div>
    `;
}

function increaseQuantity(id) {
    let items = JSON.parse(localStorage.getItem("productsIncart"));
    let item = items.find(item => item.id === id);
    if(item) {
        item.quantity = (item.quantity || 1) + 1;
        localStorage.setItem("productsIncart", JSON.stringify(items));
        drawCheckoutPage(items);
        showNotification(`Increased quantity of ${item.title}`, 'success');
    }
}

function decreaseQuantity(id) {
    let items = JSON.parse(localStorage.getItem("productsIncart"));
    let item = items.find(item => item.id === id);
    if(item) {
        if((item.quantity || 1) > 1) {
            item.quantity = (item.quantity || 1) - 1;
            localStorage.setItem("productsIncart", JSON.stringify(items));
            drawCheckoutPage(items);
            showNotification(`Decreased quantity of ${item.title}`, 'success');
        } else {
            showNotification("Minimum quantity is 1. Use 'Remove' button to delete this item.", 'warning');
        }
    }
}

function removeFromCart(id) {
    let items = JSON.parse(localStorage.getItem("productsIncart"));
    let item = items.find(item => item.id === id);
    
    if(item && confirm(`Are you sure you want to remove "${item.title}" from cart?`)) {
        let updatedItems = items.filter(item => item.id !== id);
        localStorage.setItem("productsIncart", JSON.stringify(updatedItems));
        drawCheckoutPage(updatedItems);
        showNotification(`"${item.title}" removed from cart`, 'success');
    }
}

function clearCart() {
    if(confirm("Are you sure you want to clear your entire cart?")) {
        localStorage.removeItem("productsIncart");
        drawCheckoutPage([]);
        showNotification("Cart cleared successfully", 'success');
    }
}

function proceedToCheckout() {
    let items = JSON.parse(localStorage.getItem("productsIncart"));
    let subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    let shipping = subtotal > 5000 ? 0 : 50;
    let tax = subtotal * 0.1;
    let total = subtotal + shipping + tax;
    
    // Create a more detailed order summary
    let orderDetails = items.map(item => 
        `- ${item.title} (x${item.quantity || 1}): $${(item.price * (item.quantity || 1)).toLocaleString()}`
    ).join('\n');
    
    let confirmationMessage = `
✓ Order Confirmed!

Order Summary:
${orderDetails}

Subtotal: $${subtotal.toLocaleString()}
Shipping: ${shipping === 0 ? 'FREE' : '$' + shipping}
Tax: $${tax.toFixed(2)}
Total: $${total.toFixed(2)}

Items: ${items.length}

Thank you for your purchase! You will receive an email confirmation shortly.
    `;
    
    if(confirm("Are you ready to complete your purchase?\n\n" + confirmationMessage)) {
        localStorage.removeItem("productsIncart");
        showNotification("Order placed successfully! Redirecting...", 'success');
        
        setTimeout(() => {
            window.location = "index.html";
        }, 2000);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid fa-${type === 'success' ? 'check' : type === 'warning' ? 'exclamation-triangle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.clearCart = clearCart;