// Dark Mode Toggle
const themeToggle = document.querySelector('.dark-mode-toggle');
const themeIcon = document.querySelector('#theme-icon');
const body = document.body;

// Check for saved theme preference
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

// User Info
let userInfo = document.querySelector("#user_info");
let userData = document.querySelector("#user");
let links = document.querySelector("#links");
let usernameDisplay = document.querySelector("#username-display");

if (localStorage.getItem("username")) {
    if(links) links.remove();
    if(userInfo) userInfo.style.display = "flex";
    if(userData && usernameDisplay) {
        usernameDisplay.innerHTML = localStorage.getItem("username");
    }
}

let logOutBtn = document.querySelector("#logout");
if(logOutBtn) {
    logOutBtn.addEventListener("click", function(e){
        e.preventDefault();
        localStorage.clear();
        setTimeout(() => {
            window.location = "login.html";
        }, 1000);
    });
}

// Products Data - Motorcycles
let allproducts = document.querySelector(".products");
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

// Get favorites from localStorage
let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

// Draw Products
function drawItems(productsList = products) {
    if(!allproducts) return;
    
    let y = productsList.map((item) => {
        let isFavorite = favorites.includes(item.id);
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
                    <i class="fas fa-heart fav ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})"></i>
                </div>
            </div>
        `;
    }).join("");
    allproducts.innerHTML = y;
}

if(allproducts) {
    drawItems();
}

// Toggle Favorite Function
function toggleFavorite(id) {
    if(!localStorage.getItem("username")) {
        alert("Please login to add favorites");
        window.location = "login.html";
        return;
    }

    let index = favorites.indexOf(id);
    if(index > -1) {
        favorites.splice(index, 1);
        alert("💔 Removed from favorites");
    } else {
        favorites.push(id);
        alert("❤️ Added to favorites");
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    // Re-draw to update heart icons
    let searchInput = document.querySelector("#search-input");
    if(searchInput && searchInput.value) {
        let searchTerm = searchInput.value.toLowerCase();
        let filteredProducts = products.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.color.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        drawItems(filteredProducts);
    } else {
        let activeFilter = document.querySelector(".filter-btn.active");
        if(activeFilter) {
            let filter = activeFilter.getAttribute("data-filter");
            if(filter === "all") {
                drawItems(products);
            } else {
                let filteredProducts = products.filter(item => 
                    item.category.toLowerCase() === filter.toLowerCase()
                );
                drawItems(filteredProducts);
            }
        } else {
            drawItems();
        }
    }
}

window.toggleFavorite = toggleFavorite;

// Search Functionality
let searchInput = document.querySelector("#search-input");
if(searchInput) {
    searchInput.addEventListener("keyup", function(e) {
        let searchTerm = e.target.value.toLowerCase();
        let filteredProducts = products.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.color.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        drawItems(filteredProducts);
    });
}

// Filter Buttons
let filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
    btn.addEventListener("click", function() {
        filterButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        
        let filter = this.getAttribute("data-filter");
        
        if(filter === "all") {
            drawItems(products);
        } else {
            let filteredProducts = products.filter(item => 
                item.category.toLowerCase() === filter.toLowerCase()
            );
            drawItems(filteredProducts);
        }
    });
});

// Cart Functionality
let carproductDiv = document.querySelector(".cart-items-preview");
let badge = document.querySelector(".badge");

let addedItem = localStorage.getItem("productsIncart") ? 
    JSON.parse(localStorage.getItem("productsIncart")) : [];

function updateCartDisplay() {
    if(!carproductDiv || !badge) return;
    
    if(addedItem.length > 0) {
        carproductDiv.innerHTML = addedItem.map(item => 
            `<p><i class="fa-solid fa-check"></i> ${item.title}</p>`
        ).join("");
        badge.style.display = "flex";
        badge.innerHTML = addedItem.length;
    } else {
        carproductDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">Cart is empty</p>';
        badge.style.display = "none";
    }
}

updateCartDisplay();

if (localStorage.getItem("username")) {
    function addToCart(id) {
        let choosenItem = products.find((item) => item.id === id);
        
        let isInCart = addedItem.find(item => item.id === choosenItem.id);
        if(isInCart) {
            alert("✓ This bike is already in your cart!");
            return;
        }
        
        addedItem = [...addedItem, choosenItem];
        localStorage.setItem("productsIncart", JSON.stringify(addedItem));
        
        updateCartDisplay();
        
        alert("✓ Bike added to cart successfully!");
    }
    
    window.addToCart = addToCart;
} else {
    if(allproducts) {
        window.addToCart = function() {
            alert("Please login to add bikes to cart");
            window.location = "login.html";
        };
    }
}

// Shopping Cart Dropdown
let ShoppingcartIcon = document.querySelector(".Shopping_cart");
let cartsproducts = document.querySelector(".carts_products");

if(ShoppingcartIcon && cartsproducts) {
    ShoppingcartIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        if(cartsproducts.style.display === "block") {
            cartsproducts.style.display = "none";
        } else {
            cartsproducts.style.display = "block";
        }
    });
    
    document.addEventListener("click", function(e) {
        if (!ShoppingcartIcon.contains(e.target) && !cartsproducts.contains(e.target)) {
            cartsproducts.style.display = "none";
        }
    });
}
// إضافة رابط المفضلات ديناميكياً
function addFavoritesLink() {
    let userInfo = document.querySelector("#user_info");
    if (userInfo && localStorage.getItem("username")) {
        let favoritesExists = userInfo.querySelector('a[href="favorites.html"]');
        if (!favoritesExists) {
            let favoritesItem = document.createElement('li');
            favoritesItem.innerHTML = '<a href="favorites.html"><i class="fa-solid fa-heart"></i> Favorites</a>';
            
            // إدراج الرابط قبل سلة التسوق
            let shoppingCart = userInfo.querySelector('.Shopping_cart');
            if (shoppingCart) {
                userInfo.insertBefore(favoritesItem, shoppingCart);
            } else {
                userInfo.appendChild(favoritesItem);
            }
        }
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    addFavoritesLink();
});