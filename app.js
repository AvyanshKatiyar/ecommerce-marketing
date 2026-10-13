// Product catalogue, cart (localStorage), and shared layout
var PRODUCTS = [
  { item_id: "SKU-001", item_name: "Classic White Tee",   price: 799,  item_category: "Apparel",     emoji: "👕" },
  { item_id: "SKU-002", item_name: "Running Shoes",       price: 3499, item_category: "Footwear",    emoji: "👟" },
  { item_id: "SKU-003", item_name: "Canvas Backpack",     price: 1899, item_category: "Bags",        emoji: "🎒" },
  { item_id: "SKU-004", item_name: "Wireless Earbuds",    price: 2499, item_category: "Electronics", emoji: "🎧" },
  { item_id: "SKU-005", item_name: "Steel Water Bottle",  price: 599,  item_category: "Accessories", emoji: "🧴" },
  { item_id: "SKU-006", item_name: "Analog Watch",        price: 4999, item_category: "Accessories", emoji: "⌚" }
];
var CUR = (window.SHOP_CONFIG && SHOP_CONFIG.CURRENCY) || "INR";

function money(n) { return CUR + " " + Number(n).toLocaleString("en-IN"); }
function getProduct(id) { return PRODUCTS.find(function (p) { return p.item_id === id; }); }
function toItem(p, qty) {
  return { item_id: p.item_id, item_name: p.item_name, item_category: p.item_category,
           price: p.price, quantity: qty || 1 };
}

// ---- Cart ----
function getCart() { try { return JSON.parse(localStorage.getItem("ts_cart")) || []; } catch (e) { return []; } }
function saveCart(c) { localStorage.setItem("ts_cart", JSON.stringify(c)); updateBadge(); }
function cartItems() { return getCart().map(function (l) { return toItem(getProduct(l.id), l.qty); }); }
function cartTotal() { return cartItems().reduce(function (s, i) { return s + i.price * i.quantity; }, 0); }

function addToCart(id, qty) {
  qty = qty || 1;
  var c = getCart(), line = c.find(function (l) { return l.id === id; });
  line ? (line.qty += qty) : c.push({ id: id, qty: qty });
  saveCart(c);
  var p = getProduct(id);
  track("add_to_cart", { currency: CUR, value: p.price * qty, items: [toItem(p, qty)] }, "add_to_cart");
  toast(p.item_name + " added to cart");
}
function removeFromCart(id) {
  var c = getCart(), line = c.find(function (l) { return l.id === id; });
  if (!line) return;
  var p = getProduct(id);
  track("remove_from_cart", { currency: CUR, value: p.price * line.qty, items: [toItem(p, line.qty)] });
  saveCart(c.filter(function (l) { return l.id !== id; }));
}
function updateBadge() {
  var b = document.getElementById("cart-count");
  if (b) b.textContent = getCart().reduce(function (s, l) { return s + l.qty; }, 0);
}
function toast(msg) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg; t.className = "show";
  setTimeout(function () { t.className = ""; }, 1800);
}

// ---- Shared header / footer / event log ----
document.addEventListener("DOMContentLoaded", function () {
  var header = document.createElement("header");
  header.innerHTML =
    '<a class="logo" href="index.html">🛍️ TestShop</a>' +
    '<nav><a href="index.html">Shop</a><a href="contact.html">Contact</a>' +
    '<a href="cart.html">Cart (<span id="cart-count">0</span>)</a></nav>';
  document.body.prepend(header);

  var banner = document.createElement("div");
  banner.className = "banner";
  banner.textContent = "Test store for tracking QA — no real orders or payments.";
  header.after(banner);

  var foot = document.createElement("footer");
  foot.innerHTML =
    '<form id="newsletter"><input type="email" required placeholder="Email for newsletter (sign_up test)">' +
    '<button>Subscribe</button></form>' +
    '<details open id="event-log"><summary>Event log (this page)</summary><ul id="event-log-list"></ul></details>' +
    '<button class="link" onclick="localStorage.clear();location.reload()">Reset cart</button>';
  document.body.appendChild(foot);

  var t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t);

  document.getElementById("newsletter").addEventListener("submit", function (e) {
    e.preventDefault();
    track("sign_up", { method: "newsletter" }, "sign_up");
    toast("Subscribed (test)"); e.target.reset();
  });
  updateBadge();
});
