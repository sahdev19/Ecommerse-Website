// Cart Page Functionality (cart.js)

// Display cart items on cart page
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    
    if (!cartContainer) return;
    
    // Load cart from main script
    if (typeof window.cartFunctions !== 'undefined') {
        window.cartFunctions.loadCart();
    }
    
    const cart = window.cartFunctions ? window.cartFunctions.getCart() : [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2 style="color: #088178; margin-bottom: 15px;">Your cart is empty</h2>
                <p style="color: #465b52; margin-bottom: 30px;">Add some products to get started!</p>
                <a href="index.html" style="display: inline-block; margin-top: 20px; padding: 12px 30px; background-color: #088178; color: white; text-decoration: none; border-radius: 5px; font-weight: 600;">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContainer.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead>
                <tr style="border-bottom: 2px solid #088178; background-color: #E3E6F3;">
                    <th style="padding: 20px; text-align: left; font-size: 14px; text-transform: uppercase; color: #088178;">Product</th>
                    <th style="padding: 20px; text-align: center; font-size: 14px; text-transform: uppercase; color: #088178;">Price</th>
                    <th style="padding: 20px; text-align: center; font-size: 14px; text-transform: uppercase; color: #088178;">Quantity</th>
                    <th style="padding: 20px; text-align: center; font-size: 14px; text-transform: uppercase; color: #088178;">Subtotal</th>
                    <th style="padding: 20px; text-align: center; font-size: 14px; text-transform: uppercase; color: #088178;">Remove</th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => `
                    <tr style="border-bottom: 1px solid #e3e3e3; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f9f9f9'" onmouseout="this.style.backgroundColor='white'">
                        <td style="padding: 20px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover; border: 1px solid #ddd;">
                                <div>
                                    <h6 style="margin: 0; color: #088178; font-size: 13px; text-transform: uppercase;">${item.brand}</h6>
                                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #465b52;">${item.name}</p>
                                </div>
                            </div>
                        </td>
                        <td style="padding: 20px; text-align: center; font-weight: 600; color: #222; font-size: 16px;">$${item.price}</td>
                        <td style="padding: 20px; text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                                <button onclick="decreaseQuantity(${item.id})" 
                                        style="width: 32px; height: 32px; border: 1px solid #088178; background: white; cursor: pointer; border-radius: 4px; font-size: 18px; color: #088178; transition: all 0.2s;"
                                        onmouseover="this.style.backgroundColor='#088178'; this.style.color='white'"
                                        onmouseout="this.style.backgroundColor='white'; this.style.color='#088178'">−</button>
                                <span style="min-width: 40px; text-align: center; font-weight: 600; font-size: 16px;">${item.quantity}</span>
                                <button onclick="increaseQuantity(${item.id})" 
                                        style="width: 32px; height: 32px; border: 1px solid #088178; background: white; cursor: pointer; border-radius: 4px; font-size: 18px; color: #088178; transition: all 0.2s;"
                                        onmouseover="this.style.backgroundColor='#088178'; this.style.color='white'"
                                        onmouseout="this.style.backgroundColor='white'; this.style.color='#088178'">+</button>
                            </div>
                        </td>
                        <td style="padding: 20px; text-align: center; font-weight: 700; color: #088178; font-size: 18px;">$${(item.price * item.quantity).toFixed(2)}</td>
                        <td style="padding: 20px; text-align: center;">
                            <button onclick="deleteItem(${item.id})" 
                                    style="background: #ff6b6b; color: white; border: none; padding: 10px 16px; border-radius: 5px; cursor: pointer; transition: background 0.2s; font-size: 14px;"
                                    onmouseover="this.style.backgroundColor='#ff5252'"
                                    onmouseout="this.style.backgroundColor='#ff6b6b'"
                                    title="Remove item">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <a href="index.html" style="padding: 14px 35px; background-color: #088178; color: white; text-decoration: none; border-radius: 5px; font-weight: 600; transition: background 0.2s;"
               onmouseover="this.style.backgroundColor='#066963'"
               onmouseout="this.style.backgroundColor='#088178'">
               <i class="fa-solid fa-arrow-left"></i> Continue Shopping
            </a>
            <button onclick="clearEntireCart()" 
                    style="padding: 14px 35px; background-color: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; transition: background 0.2s;"
                    onmouseover="this.style.backgroundColor='#ff5252'"
                    onmouseout="this.style.backgroundColor='#ff6b6b'">
                <i class="fa-solid fa-trash-alt"></i> Clear Cart
            </button>
        </div>
        
        <div style="margin-top: 50px; max-width: 450px; margin-left: auto; background: linear-gradient(135deg, #E3E6F3 0%, #d4d9f0 100%); padding: 35px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 25px; color: #088178; font-size: 24px; border-bottom: 2px solid #088178; padding-bottom: 10px;">Cart Summary</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px;">
                <span style="color: #465b52;">Subtotal:</span>
                <span style="font-weight: 600; color: #222;">$${total.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px;">
                <span style="color: #465b52;">Shipping:</span>
                <span style="font-weight: 600; color: #088178;">Free</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px;">
                <span style="color: #465b52;">Tax (Estimated):</span>
                <span style="font-weight: 600; color: #222;">$${(total * 0.1).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 20px; border-top: 2px solid #088178; font-size: 20px; font-weight: 700; margin-top: 10px;">
                <span style="color: #222;">Total:</span>
                <span style="color: #088178;">$${(total * 1.1).toFixed(2)}</span>
            </div>
            <button onclick="checkout()" 
                    style="width: 100%; margin-top: 25px; padding: 16px; background-color: #088178; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: 700; transition: all 0.3s; box-shadow: 0 4px 10px rgba(8,129,120,0.3);"
                    onmouseover="this.style.backgroundColor='#066963'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(8,129,120,0.4)'"
                    onmouseout="this.style.backgroundColor='#088178'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(8,129,120,0.3)'">
                <i class="fa-solid fa-lock"></i> Proceed to Checkout
            </button>
            <div style="margin-top: 20px; text-align: center;">
                <img src="img/pay/pay.png" alt="payment methods" style="max-width: 100%; opacity: 0.8;">
            </div>
        </div>
    `;
}

// Increase quantity
function increaseQuantity(productId) {
    if (typeof window.cartFunctions !== 'undefined') {
        const cart = window.cartFunctions.getCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            window.cartFunctions.updateQuantity(productId, item.quantity + 1);
            displayCart();
        }
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    if (typeof window.cartFunctions !== 'undefined') {
        const cart = window.cartFunctions.getCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            window.cartFunctions.updateQuantity(productId, item.quantity - 1);
            displayCart();
        }
    }
}

// Delete item
function deleteItem(productId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        if (typeof window.cartFunctions !== 'undefined') {
            window.cartFunctions.removeFromCart(productId);
            displayCart();
            showCartNotification('Item removed from cart');
        }
    }
}

// Clear entire cart
function clearEntireCart() {
    if (typeof window.cartFunctions !== 'undefined') {
        window.cartFunctions.clearCart();
        displayCart();
    }
}

// Checkout function
function checkout() {
    alert('Proceeding to checkout... (This is a demo)');
    // Add your checkout logic here
}

// Show notification on cart page
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #088178;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize cart display when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayCart);
} else {
    displayCart();
}