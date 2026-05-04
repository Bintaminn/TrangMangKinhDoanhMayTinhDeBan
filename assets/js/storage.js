const USER_KEY = 'bintamin_users';
const CURRENT_USER_KEY = 'bintamin_current_user';
const CART_KEY = 'bintamin_cart';

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch (error) { return fallback; }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() { return readJSON(USER_KEY, []); }
function saveUsers(users) { writeJSON(USER_KEY, users); }
function getCurrentUser() { return readJSON(CURRENT_USER_KEY, null); }
function setCurrentUser(user) { writeJSON(CURRENT_USER_KEY, user); }
function logout() { localStorage.removeItem(CURRENT_USER_KEY); window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html'; }

function getCart() { return readJSON(CART_KEY, []); }
function saveCart(cart) { writeJSON(CART_KEY, cart); updateCartCount(); }
function clearCart() { saveCart([]); }
