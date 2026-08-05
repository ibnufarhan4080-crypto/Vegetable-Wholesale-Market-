// Product Database (Sinhala First)
const products = [
    // --- Upcountry Vegetables (උඩරට එළවළු) ---
    { id: 1, nameSi: "බෝංචි", nameTa: "பீன்ஸ்", nameEn: "Beans", category: "upcountry", wholesale: 220, retail: 260, img: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&q=80" },
    { id: 2, nameSi: "කැරට්", nameTa: "கேரட்", nameEn: "Carrot", category: "upcountry", wholesale: 200, retail: 240, img: "https://images.unsplash.com/photo-1598170845058-12ef4a457939?w=400&q=80" },
    { id: 3, nameSi: "ගෝවා", nameTa: "முட்டைக்கோஸ்", nameEn: "Cabbage", category: "upcountry", wholesale: 130, retail: 160, img: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&q=80" },
    { id: 4, nameSi: "ලීක්ස්", nameTa: "லீக்ஸ்", nameEn: "Leeks", category: "upcountry", wholesale: 160, retail: 200, img: "https://images.unsplash.com/photo-1628773822503-930a85832a82?w=400&q=80" },

    // --- Lowcountry Vegetables (පහතරට එළවළු) ---
    { id: 5, nameSi: "වට්ටක්කා", nameTa: "பூசணிக்காய்", nameEn: "Pumpkin", category: "lowcountry", wholesale: 90, retail: 120, img: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&q=80" },
    { id: 6, nameSi: "බණ්ඩක්කා", nameTa: "வெண்டி", nameEn: "Lady's Fingers", category: "lowcountry", wholesale: 130, retail: 170, img: "https://images.unsplash.com/photo-1623863486121-888e5eb54199?w=400&q=80" },
    { id: 7, nameSi: "වම්බටු", nameTa: "கத்தரிக்காய்", nameEn: "Brinjal", category: "lowcountry", wholesale: 160, retail: 200, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80" },

    // --- Yams / Tubers (අල වර්ග) ---
    { id: 8, nameSi: "අර්තාපල්", nameTa: "உருளைக்கிழங்கு", nameEn: "Potato", category: "yams", wholesale: 240, retail: 290, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80" },
    { id: 9, nameSi: "මඤ්ඤොක්කා", nameTa: "மரவள்ளிக்கிழங்கு", nameEn: "Manioc", category: "yams", wholesale: 100, retail: 130, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80" },

    // --- Greens (පලා වර්ග) ---
    { id: 10, nameSi: "මුකුණුවැන්න", nameTa: "பொன்னாங்கண்ணி", nameEn: "Mukunuwenna", category: "greens", wholesale: 35, retail: 50, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },

    // --- Grains (ධාන්‍ය) ---
    { id: 11, nameSi: "මුං ඇට", nameTa: "பச்சைப்பயறு", nameEn: "Green Gram", category: "grains", wholesale: 320, retail: 380, img: "https://images.unsplash.com/photo-1588615419955-522b51b3736d?w=400&q=80" },

    // --- Fruits (පලතුරු) ---
    { id: 12, nameSi: "ඇඹල් කෙසෙල්", nameTa: "வாழைப்பழம்", nameEn: "Banana (Ambul)", category: "fruits", wholesale: 110, retail: 150, img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80" }
];

let cart = [];

// Display Products Card (Sinhala First Header)
function displayProducts(items) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">එළවළු හමු නොවීය (பொருட்கள் எதுவும் கிடைக்கவில்லை)</p>`;
        return;
    }

    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.nameEn}">
            <div class="product-info">
                <h3>${p.nameSi}</h3>
                <h4>${p.nameTa}</h4>
                <p class="eng-name">${p.nameEn}</p>
                
                <div class="price-box">
                    <p>Wholesale: <span>Rs. ${p.wholesale}</span> /kg</p>
                    <p>Retail: <span>Rs. ${p.retail}</span> /kg</p>
                </div>
                
                <!-- Quantity & Custom Weight Selector -->
                <div class="quantity-control">
                    <button class="step-btn" onclick="adjustQty(${p.id}, -0.5)">-</button>
                    <input type="number" id="qty-${p.id}" value="1" step="0.25" min="0.25" class="weight-input">
                    <span class="unit">Kg</span>
                    <button class="step-btn" onclick="adjustQty(${p.id}, 0.5)">+</button>
                </div>

                <!-- Add Button with Highlighted Plus Icon -->
                <button onclick="addToCart(${p.id})" class="add-btn">
                    <span class="plus-icon">+</span> Add to Order
                </button>
            </div>
        </div>
    `).join('');
}

// Quantity Adjuster (+/-)
function adjustQty(id, change) {
    const input = document.getElementById(`qty-${id}`);
    let val = parseFloat(input.value) || 1;
    val = Math.max(0.25, val + change);
    input.value = val;
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);
    const weight = parseFloat(qtyInput.value) || 1;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].weight += weight;
    } else {
        cart.push({ ...product, weight: weight });
    }

    updateCartUI();
}

// Update Cart Display
function updateCartUI() {
    const cartList = document.getElementById('cartList');
    const orderItemsArea = document.getElementById('orderItems');
    
    if (cart.length === 0) {
        cartList.innerHTML = `<p class="empty-cart-text">ඇණවුම් ලැයිස්තුව හිස්ව පවතී (ஆர்டர் பட்டியல் காலியாக உள்ளது)</p>`;
        if (orderItemsArea) orderItemsArea.value = '';
        return;
    }

    let cartText = '';
    cartList.innerHTML = cart.map((item, index) => {
        cartText += `${index + 1}. ${item.nameSi} (${item.nameTa}) - ${item.weight} Kg\n`;
        return `
            <div class="cart-item">
                <span><b>${item.nameSi}</b> - ${item.nameTa} - <b>${item.weight} Kg</b></span>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">❌</button>
            </div>
        `;
    }).join('');

    if (orderItemsArea) {
        orderItemsArea.value = cartText;
    }
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Send Order to WhatsApp (Defaulting to primary number 0769073232)
function sendToWhatsApp(e) {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const address = document.getElementById('custAddress').value;
    const items = document.getElementById('orderItems').value;

    const phone = "94769073232"; // Primary WhatsApp Number
    let message = `*NEW VEGETABLE ORDER*\n\n`;
    message += `*Name:* ${name}\n`;
    message += `*Address:* ${address}\n\n`;
    message += `*Items Ordered:*\n${items}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// Initial Load & Smart Search
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => 
                p.nameSi.toLowerCase().includes(term) ||
                p.nameTa.toLowerCase().includes(term) ||
                p.nameEn.toLowerCase().includes(term)
            );
            displayProducts(filtered);
        });
    }
});

// Category Filter
function filterCategory(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}
