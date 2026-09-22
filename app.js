const products = [
  { id: 1, name: 'Ripple ceramic vase', category: 'Home', price: 68, tag: 'New', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Linen market tote', category: 'Wear', price: 42, tag: '', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'Field notes journal', category: 'Home', price: 24, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Wool picnic blanket', category: 'Outdoors', price: 128, tag: '', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=700&q=80' },
  { id: 5, name: 'Everyday crew sweater', category: 'Wear', price: 96, tag: 'New', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80' },
  { id: 6, name: 'Hand-thrown mug', category: 'Home', price: 36, tag: '', image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=700&q=80' },
  { id: 7, name: 'Canvas camp chair', category: 'Outdoors', price: 155, tag: '', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80' },
  { id: 8, name: 'Linen house shirt', category: 'Wear', price: 84, tag: '', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80' },
  { id: 9, name: 'Cedar incense set', category: 'Home', price: 29, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1603905179139-db12ab535f10?auto=format&fit=crop&w=700&q=80' },
  { id: 10, name: 'Utility daypack', category: 'Outdoors', price: 112, tag: '', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80' },
  { id: 11, name: 'Stoneware dinner plate', category: 'Home', price: 32, tag: '', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=700&q=80' },
  { id: 12, name: 'Ribbed cotton socks', category: 'Wear', price: 18, tag: '', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=700&q=80' }
];

const state = { query: '', categories: [], price: 'all', sort: 'featured', cart: JSON.parse(localStorage.getItem('morrow-cart') || '[]') };
const $ = (selector) => document.querySelector(selector);
const money = (value) => `$${value.toFixed(2)}`;

function filteredProducts() {
  let result = products.filter((product) => {
    const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(state.query.toLowerCase());
    const matchesCategory = !state.categories.length || state.categories.includes(product.category);
    const matchesPrice = state.price === 'all' || (state.price === 'under50' && product.price < 50) || (state.price === '50to100' && product.price >= 50 && product.price <= 100) || (state.price === 'over100' && product.price > 100);
    return matchesQuery && matchesCategory && matchesPrice;
  });
  if (state.sort === 'low') result.sort((a, b) => a.price - b.price);
  if (state.sort === 'high') result.sort((a, b) => b.price - a.price);
  if (state.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

function renderProducts() {
  const visible = filteredProducts();
  $('#result-count').textContent = `${visible.length} ${visible.length === 1 ? 'object' : 'objects'}`;
  $('#empty-state').hidden = visible.length > 0;
  $('#product-grid').innerHTML = visible.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 35}ms">
      <div class="product-image">${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}<img src="${product.image}" alt="${product.name}" loading="lazy"><button class="quick-add" data-add="${product.id}">Add to bag</button></div>
      <div class="product-info"><div><p class="product-name">${product.name}</p><p class="product-meta">${product.category}</p></div><strong class="product-price">${money(product.price)}</strong></div>
    </article>`).join('');
  document.querySelectorAll('[data-add]').forEach((button) => button.addEventListener('click', () => addToCart(Number(button.dataset.add))));
}

function addToCart(id) {
  const existing = state.cart.find((item) => item.id === id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id, quantity: 1 });
  persistCart();
  renderCart();
  showToast(`${products.find((product) => product.id === id).name} added to your bag`);
}

function updateQuantity(id, amount) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  persistCart();
  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + products.find((product) => product.id === item.id).price * item.quantity, 0);
  $('#cart-count').textContent = count;
  $('#drawer-count').textContent = `(${count})`;
  $('#subtotal').textContent = money(total);
  $('#cart-empty').hidden = count > 0;
  $('#cart-footer').hidden = count === 0;
  $('#cart-items').innerHTML = state.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return `<div class="cart-row"><img src="${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${money(product.price)}</p><div class="quantity"><button data-quantity="${product.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-quantity="${product.id}" data-change="1" aria-label="Increase quantity">+</button></div><button class="remove-item" data-remove="${product.id}">Remove</button></div><strong>${money(product.price * item.quantity)}</strong></div>`;
  }).join('');
  document.querySelectorAll('[data-quantity]').forEach((button) => button.addEventListener('click', () => updateQuantity(Number(button.dataset.quantity), Number(button.dataset.change))));
  document.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => updateQuantity(Number(button.dataset.remove), -999)));
}

function persistCart() { localStorage.setItem('morrow-cart', JSON.stringify(state.cart)); }
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2300); }
function toggleCart(open) { $('#cart-drawer').classList.toggle('open', open); $('#overlay').classList.toggle('open', open); $('#cart-drawer').setAttribute('aria-hidden', String(!open)); }

$('#search-input').addEventListener('input', (event) => { state.query = event.target.value; renderProducts(); });
$('#sort-select').addEventListener('change', (event) => { state.sort = event.target.value; renderProducts(); });
document.querySelectorAll('input[name="category"]').forEach((input) => input.addEventListener('change', () => { state.categories = [...document.querySelectorAll('input[name="category"]:checked')].map((item) => item.value); renderProducts(); }));
document.querySelectorAll('input[name="price"]').forEach((input) => input.addEventListener('change', () => { state.price = document.querySelector('input[name="price"]:checked').value; renderProducts(); }));
$('#clear-filters').addEventListener('click', () => { state.categories = []; state.price = 'all'; document.querySelectorAll('input[name="category"]').forEach((input) => { input.checked = false; }); document.querySelector('input[value="all"]').checked = true; renderProducts(); });
$('#cart-toggle').addEventListener('click', () => toggleCart(true));
$('#cart-close').addEventListener('click', () => toggleCart(false));
$('#overlay').addEventListener('click', () => toggleCart(false));
$('#keep-shopping').addEventListener('click', () => toggleCart(false));
$('#search-toggle').addEventListener('click', () => { $('#search-input').focus(); document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' }); });
document.querySelectorAll('[data-nav-category]').forEach((link) => link.addEventListener('click', () => { const category = link.dataset.navCategory; const input = document.querySelector(`input[value="${category}"]`); input.checked = true; state.categories = [category]; renderProducts(); }));

renderProducts();
renderCart();
