const products = [
    {
        id: 1,
        name: "Gourmet Extra Fine Pink Salt",
        category: "cooking",
        price: 12.99,
        weight: "1 kg Bag",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600",
        description: "Silky fine grain pink mineral salt ideal for daily cooking shakers, baking, and precision table seasoning."
    },
    {
        id: 2,
        name: "Coarse Organic Shaker Salt",
        category: "cooking",
        price: 14.50,
        weight: "1 kg Jar",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
        description: "Crushed coarse pink crystals designed specifically for adjustable ceramic salt mills and steak rubs."
    },
    {
        id: 3,
        name: "Artisanal Natural Salt Lamp",
        category: "lamps",
        price: 36.00,
        weight: "3-5 kg Rock",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
        description: "Hand-carved natural salt crystal chunk mounted on a neem wood base. Releases calming air ions."
    },
    {
        id: 4,
        name: "Gourmet Salt Cooking Slab",
        category: "cooking",
        price: 49.99,
        weight: "4.5 kg Heavy Block",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
        description: "Heavy duty pink salt block for sear-grilling steaks, fish, or serving chilled sushi and artisan cheeses."
    }
];

let cart = [];
let currentCurrency = 'USD';
const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, PKR: 278 };
const currencySymbols = { USD: '$', EUR: '€', GBP: '£', PKR: 'Rs ' };

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});

function navigateTo(pageId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(pageId);
  if (target) target.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterProducts(category) {
  renderProducts(category);
}

function renderProducts(filter = 'all') {
  const container = document.getElementById('product-grid');
  if (!container) return;
  
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  container.innerHTML = filtered.map(product => {
    const priceVal = (product.price * currencyRates[currentCurrency]).toFixed(2);
    return `
    <div class="bg-white rounded-3xl overflow-hidden border border-brand-100 shadow-sm p-4 flex flex-col justify-between">
      <div>
        <img src="${product.image}" class="w-full h-44 object-cover rounded-2xl mb-4">
        <span class="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-1 rounded-md">${product.category}</span>
        <h3 class="font-bold text-gray-900 text-base mt-2">${product.name}</h3>
        <p class="text-xs text-gray-400 mt-1">${product.weight}</p>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="text-lg font-extrabold text-gray-900">${currencySymbols[currentCurrency]}${priceVal}</span>
        <button onclick="addToCart(${product.id})" class="bg-brand-500 text-white font-bold px-4 py-2 rounded-xl text-xs">Add to Basket</button>
      </div>
    </div>
  `}).join('');
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
  toggleCart();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">Basket empty</div>`;
    totalEl.innerText = `${currencySymbols[currentCurrency]}0.00`;
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty * currencyRates[currentCurrency];
    total += itemTotal;
    return `
      <div class="flex items-center justify-between border-b pb-2">
        <div>
          <h4 class="font-bold text-xs text-gray-900">${item.name}</h4>
          <p class="text-xs text-gray-500">${currencySymbols[currentCurrency]}${(item.price * currencyRates[currentCurrency]).toFixed(2)} x ${item.qty}</p>
        </div>
        <span class="font-bold text-brand-600 text-xs">${currencySymbols[currentCurrency]}${itemTotal.toFixed(2)}</span>
      </div>
    `;
  }).join('');
  
  totalEl.innerText = `${currencySymbols[currentCurrency]}${total.toFixed(2)}`;
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('hidden');
}

function changeCurrency(curr) {
  currentCurrency = curr;
  renderProducts();
  updateCartUI();
}

function handleFormSubmit(e) {
  e.preventDefault();
  alert('Inquiry sent successfully!');
}
