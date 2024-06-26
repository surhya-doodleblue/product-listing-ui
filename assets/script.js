let products = [];
let currentIndex = 0;
const productsPerPage = 10;

// Function to render products
function renderProducts(filter = '', selectedCategories = [], sortBy = '') {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; 

    // Filter products based on search input and selected categories
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(filter.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return matchesSearch && matchesCategory;
    });

    // Sort products if sortBy is specified
    if (sortBy === 'price') {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (filteredProducts.length === 0) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'No products found.';
        productsContainer.appendChild(noResultMessage);
        document.querySelector('.load-more').style.display = 'none';
        return;
    }

    const endIndex = Math.min(currentIndex + productsPerPage, filteredProducts.length);

    for (let i = currentIndex; i < endIndex; i++) {
        const product = filteredProducts[i];
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.price;

        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productDescription);

        productsContainer.appendChild(productCard);
    }

    currentIndex = endIndex;

    if (currentIndex >= filteredProducts.length) {
        document.querySelector('.load-more').style.display = 'none';
    } else {
        document.querySelector('.load-more').style.display = 'block';
    }
}

// Fetch products from API and display
async function fetchAndDisplayProducts() {
    showLoader();
    document.querySelector('.product-card').style.display = 'none';
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();

    renderProducts();

    hideLoader();
}

// Event listener for Load More button
document.querySelector('.load-more').addEventListener('click', () => renderProducts(document.getElementById('searchInput').value, getSelectedCategories(), getSortBy()));

// Event listeners for checkboxes
document.getElementById('mens-clothing-checkbox').addEventListener('change', updateCategoryFilter);
document.getElementById('jewelery-checkbox').addEventListener('change', updateCategoryFilter);
document.getElementById('electronics-checkbox').addEventListener('change', updateCategoryFilter);
document.getElementById('womens-clothing-checkbox').addEventListener('change', updateCategoryFilter);

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', function(event) {
    currentIndex = 0;
    renderProducts(event.target.value, getSelectedCategories(), getSortBy());
});

// Event listener for sort dropdown
document.getElementById('searchdropdown').addEventListener('change', function(event) {
    currentIndex = 0;
    renderProducts(document.getElementById('searchInput').value, getSelectedCategories(), event.target.value);
});

// Function to update category filter
function updateCategoryFilter() {
    const selectedCategories = []; 

    // Check each checkbox and add selected categories to array
    if (document.getElementById('mens-clothing-checkbox').checked) {
        selectedCategories.push("men's clothing");
    }
    if (document.getElementById('jewelery-checkbox').checked) {
        selectedCategories.push("jewelery");
    }
    if (document.getElementById('electronics-checkbox').checked) {
        selectedCategories.push("electronics");
    }
    if (document.getElementById('womens-clothing-checkbox').checked) {
        selectedCategories.push("women's clothing");
    }

    currentIndex = 0;
    renderProducts(document.getElementById('searchInput').value, selectedCategories, getSortBy());
}

// Function to get currently selected categories
function getSelectedCategories() {
    const selectedCategories = [];

    if (document.getElementById('mens-clothing-checkbox').checked) {
        selectedCategories.push("men's clothing");
    }
    if (document.getElementById('jewelery-checkbox').checked) {
        selectedCategories.push("jewelery");
    }
    if (document.getElementById('electronics-checkbox').checked) {
        selectedCategories.push("electronics");
    }
    if (document.getElementById('womens-clothing-checkbox').checked) {
        selectedCategories.push("women's clothing");
    }

    return selectedCategories;
}

// Function to get sort by value
function getSortBy() {
    return document.getElementById('searchdropdown').value;
}

// Function to show loader
function showLoader() {
    document.querySelector('.loader').style.display = 'block';
}

// Function to hide loader
function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
}

// Call the function to fetch and display products
fetchAndDisplayProducts();

function toggleMenu() {
    const menu = document.querySelector('.navbar .menu');
    menu.classList.toggle('active');
}
