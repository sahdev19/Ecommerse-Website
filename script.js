// Shopping Cart Management System - Main Script (script.js)
let cart = [];

// Load cart from memory on page load
function loadCart() {
    const savedCart = sessionStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to memory
function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
}

// Product data structure
const products = [
    {
        id: 1,
        name: "Men's Cotton Blend Solid Shirt with Spread Collared",
        brand: "MILDIN",
        price: 78,
        image: "img/products/f3.jpg"
    },
    {
        id: 2,
        name: "Cartoon Astronaut T-Shirt Graphic Print",
        brand: "adidas",
        price: 45,
        image: "img/products/f1.jpg"
    },
    {
        id: 3,
        name: "Women's Floral Print Dress Summer Collection",
        brand: "NIKE",
        price: 89,
        image: "img/products/f8.jpg"
    },
    {
        id: 4,
        name: "Men's Casual Polo Shirt Classic Fit",
        brand: "PUMA",
        price: 52,
        image: "img/products/f2.jpg"
    },
    {
        id: 5,
        name: "Women's Denim Jacket Vintage Style",
        brand: "ZARA",
        price: 95,
        image: "img/products/f4.jpg"
    },
    {
        id: 6,
        name: "Hawaiian Print Shirt Beach Wear",
        brand: "H&M",
        price: 38,
        image: "img/products/f5.jpg"
    },
    {
        id: 7,
        name: "Women's Cotton Shorts Summer Essential",
        brand: "LEVIS",
        price: 42,
        image: "img/products/f6.jpg"
    },
    {
        id: 8,
        name: "Men's Slim Fit Chinos Smart Casual",
        brand: "GAP",
        price: 65,
        image: "img/products/f7.jpg"
    }
];

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
        }
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count badge
function updateCartCount() {
    const cartIcon = document.querySelector('.material-symbols-outlined');
    if (cartIcon) {
        const count = getCartItemCount();
        let badge = document.querySelector('.cart-badge');
        
        if (!badge && count > 0) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.parentElement.style.position = 'relative';
            cartIcon.parentElement.appendChild(badge);
        }
        
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
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

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        showNotification('Cart cleared!');
    }
}

// Mobile menu toggle
function initializeMobileMenu() {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    
    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }
    
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('#navbar li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
}

// Smooth scroll to sections
function initializeSmoothScroll() {
    // Handle all anchor links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Check if it's a valid section (not just #)
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Check if user is logged in and update UI
function checkUserLoginStatus() {
    const user = sessionStorage.getItem('user');
    const userIcon = document.querySelector('.fa-user');
    
    if (user && userIcon) {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
            // Change icon to show logged in state
            userIcon.classList.remove('far');
            userIcon.classList.add('fas');
            userIcon.style.color = '#088178';
            
            // Add title attribute
            userIcon.parentElement.setAttribute('title', `Logged in as ${userData.email}`);
        }
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    window.location.href = 'signin.html';
}

// Initialize cart functionality
function initializeCart() {
    loadCart();
    
    // Check login status
    checkUserLoginStatus();
    
    // Add click event to all cart buttons on product page
    const cartButtons = document.querySelectorAll('.pro button');
    cartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(index + 1);
        });
    });
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Add CSS for animations
    if (!document.querySelector('#cart-styles')) {
        const style = document.createElement('style');
        style.id = 'cart-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            .cart-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #ff6b6b;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    initializeCart();
}

// Export functions for use in other pages
window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    clearCart,
    getCart: () => cart,
    loadCart,
    saveCart
};