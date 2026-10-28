// Deklarasi Elemen DOM
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const productGrid = document.getElementById('product-grid');

const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');

// 1. Handle Login (Simulasi)
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah halaman refresh
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi Sederhana
    if(email && password.length >= 3) {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        fetchProducts(); // Panggil API setelah berhasil login
    } else {
        document.getElementById('login-error').innerText = "Email atau password tidak valid.";
    }
});

// 2. Handle Logout
logoutBtn.addEventListener('click', function() {
    dashboardSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    loginForm.reset();
    productGrid.innerHTML = ''; // Kosongkan data
});

// 3. Fetch Data API (DummyJSON)
async function fetchProducts() {
    // Tampilkan Loading
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.add('hidden');
    productGrid.innerHTML = '';

    try {
        const response = await fetch('https://dummyjson.com/products/category/smartphones');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        loadingState.classList.add('hidden');

        // Handle Empty Data
        if (!data.products || data.products.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        // Render UI Component
        renderProducts(data.products);

    } catch (error) {
        console.error("Fetch error: ", error);
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden'); // Tampilkan Error State
    }
}

// 4. Data Processing ke UI (Pemisahan Logic & UI)
function renderProducts(products) {
    products.forEach(product => {
        // Buat elemen card (Reusable component approach di Vanilla JS)
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
            <h3>${product.title}</h3>
            <span>$${product.price}</span>
        `;
        
        productGrid.appendChild(card);
    });
}