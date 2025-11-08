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

// Favorites Products
let favoritesContainer = document.querySelector("#favorites-container");
let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

// Products Data - Same as in script.js
let products = [
    {
        id: 1,
        title: "Yamaha YZF-R1",
        description: "Supersport, 998cc, Racing Edition",
        category: "sport",
        color: "Blue",
        imageUrl: "image/bike1.jpg",
        price: 17999
    },
    {
        id: 2,
        title: "Harley-Davidson Fat Boy",
        description: "Cruiser, 1868cc, Milwaukee-Eight",
        category: "cruiser",
        color: "Black",
        imageUrl: "image/bike2.jpg",
        price: 19999
    },
    {
        id: 3,
        title: "Kawasaki Ninja H2",
        description: "Hypersport, 998cc, Supercharged",
        category: "sport",
        color: "Green",
        imageUrl: "image/bike3.jpg",
        price: 29999
    },
    {
        id: 4,
        title: "BMW R1250GS",
        description: "Adventure, 1254cc, Off-Road",
        category: "adventure",
        color: "White",
        imageUrl: "image/bike4.jpg",
        price: 18500
    },
    {
        id: 5,
        title: "Ducati Panigale V4",
        description: "Superbike, 1103cc, Racing DNA",
        category: "sport",
        color: "Red",
        imageUrl: "image/bike5.jpg",
        price: 28395
    },
    {
        id: 6,
        title: "Honda Gold Wing",
        description: "Touring, 1833cc, Luxury Comfort",
        category: "touring",
        color: "Silver",
        imageUrl: "image/bike6.jpg",
        price: 24999
    },
    {
        id: 7,
        title: "Suzuki Hayabusa",
        description: "Sport Touring, 1340cc, Speed Legend",
        category: "sport",
        color: "Blue",
        imageUrl: "image/bike7.jpg",
        price: 18599
    },
    {
        id: 8,
        title: "Indian Chief Dark Horse",
        description: "Cruiser, 1811cc, Thunder Stroke",
        category: "cruiser",
        color: "Black",
        imageUrl: "image/bike8.jpg",
        price: 17499
    },
    {
        id: 9,
        title: "KTM 1290 Super Adventure",
        description: "Adventure, 1301cc, Travel Ready",
        category: "adventure",
        color: "Orange",
        imageUrl: "image/bike9.jpg",
        price: 19699
    }
];

// Draw Favorites
function drawFavorites() {
    if(!favoritesContainer) return;
    
    if(favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fa-solid fa-heart" style="font-size: 80px; color: #e74c3c; margin-bottom: 20px;"></i>
                <h2 style="color: var(--text-color); margin-bottom: 15px;">No favorites yet</h2>
                <p style="color: var(--text-color); opacity: 0.7; margin-bottom: 30px;">Start adding your favorite motorcycles to see them here!</p>
                <a href="index.html" class="checkout-btn" style="display: inline-block; padding: 12px 35px; text-decoration: none;">
                    <i class="fa-solid fa-shopping-bag"></i> Browse Motorcycles
                </a>
            </div>
        `;
        return;
    }

    let favoriteProducts = products.filter(product => favorites.includes(product.id));
    
    let favoritesHTML = favoriteProducts.map((item) => {
        return `
            <div class="product_item" data-category="${item.category}">
                <img class="product_item_img" src="${item.imageUrl}" alt="${item.title}">
                <div class="product_item_desc">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <span><i class="fa-solid fa-palette"></i> Color: ${item.color}</span>
                    <span><i class="fa-solid fa-tag"></i> Category: ${item.category}</span>
                    <span class="price">$${item.price.toLocaleString()}</span>
                </div>
                <div class="product_item_action">
                    <button class="add_to_cart" onclick="addToCart(${item.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add To Cart
                    </button>
                    <i class="fas fa-heart fav active" onclick="removeFromFavorites(${item.id})"></i>
                </div>
            </div>
        `;
    }).join("");
    
    favoritesContainer.innerHTML = favoritesHTML;
}

// Remove from favorites
function removeFromFavorites(id) {
    if(!localStorage.getItem("username")) {
        alert("Please login to manage favorites");
        window.location = "login.html";
        return;
    }

    let index = favorites.indexOf(id);
    if(index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        drawFavorites();
        alert("💔 Removed from favorites");
    }
}

// Add to cart function
function addToCart(id) {
    if(!localStorage.getItem("username")) {
        alert("Please login to add bikes to cart");
        window.location = "login.html";
        return;
    }

    let choosenItem = products.find((item) => item.id === id);
    let addedItem = localStorage.getItem("productsIncart") ? 
        JSON.parse(localStorage.getItem("productsIncart")) : [];
    
    let isInCart = addedItem.find(item => item.id === choosenItem.id);
    if(isInCart) {
        alert("✓ This bike is already in your cart!");
        return;
    }
    
    addedItem = [...addedItem, choosenItem];
    localStorage.setItem("productsIncart", JSON.stringify(addedItem));
    alert("✓ Bike added to cart successfully!");
}

// Initialize favorites page
if(favoritesContainer) {
    drawFavorites();
}

// Make functions global
window.removeFromFavorites = removeFromFavorites;
window.addToCart = addToCart;