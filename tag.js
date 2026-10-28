// Google tag: pasted directly in each page <head> (unchanged).
// Pinterest tag: loaded below (this file runs in every page <head>).
(function () {
  var cfg = window.SHOP_CONFIG || {};
  var ids = (cfg.TAG_IDS || []).filter(function (id) { return id && id.indexOf("XXXX") === -1; });
  var debug = cfg.DEBUG_MODE || /[?&]debug=1/.test(location.search);
  var PIN_ID = "2614432047622";

  // ================= GOOGLE (unchanged) =================
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  var onPage = Array.prototype.map.call(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]'),
    function (s) { return (s.src.match(/id=([^&]+)/) || [])[1]; });
  if (!onPage.length && ids.length) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ids[0];
    document.head.appendChild(s);
    gtag("js", new Date());
  }
  ids.forEach(function (id) {
    if (onPage.indexOf(id) === -1) gtag("config", id, debug ? { debug_mode: true } : {});
  });

  // ================= PINTEREST TAG (base code) =================
  !function(e){if(!window.pintrk){window.pintrk = function () {
  window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
    n=window.pintrk;n.queue=[],n.version="3.0";var
    t=document.createElement("script");t.async=!0,t.src=e;var
    r=document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");

  // Enhanced Match: use an email the visitor already entered (if any)
  var savedEm = null;
  try { savedEm = localStorage.getItem("ts_em"); } catch (e) {}
  pintrk("load", PIN_ID, savedEm ? { em: savedEm } : {});
  pintrk("page");

  // Capture email from any form (checkout, contact, newsletter)
  document.addEventListener("submit", function (e) {
    var input = e.target && e.target.querySelector('input[type="email"]');
    if (!input || !input.value) return;
    var em = input.value.trim().toLowerCase();
    try { localStorage.setItem("ts_em", em); } catch (x) {}
    pintrk("set", { em: em });
  }, true);

  // GA4 event name -> Pinterest event
  var PIN_MAP = {
    view_item_list: "viewcategory",
    view_item:      "pagevisit",
    add_to_cart:    "addtocart",
    begin_checkout: "custom",
    purchase:       "checkout",
    generate_lead:  "lead",
    sign_up:        "signup"
  };
  function pinParams(p) {
    var out = { event_id: "ev-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) };
    if (p.value !== undefined) out.value = p.value;
    if (p.currency) out.currency = p.currency;
    if (p.transaction_id) out.order_id = p.transaction_id;
    if (p.coupon) out.promo_code = p.coupon;
    if (p.lead_source) out.lead_type = p.lead_source;
    if (p.items && p.items.length) {
      out.order_quantity = p.items.reduce(function (s, i) { return s + (i.quantity || 1); }, 0);
      out.line_items = p.items.map(function (i) {
        return { product_id: i.item_id, product_name: i.item_name, product_category: i.item_category,
                 product_price: i.price, product_quantity: i.quantity || 1 };
      });
    }
    return out;
  }

  // ================= track(): Google + Pinterest =================
  window.track = function (name, params, adsKey) {
    params = params || {};
    var gParams = Object.assign({}, params);
    if (debug) gParams.debug_mode = true;
    gtag("event", name, gParams);
    log("Google · " + name, params);

    var label = adsKey && cfg.ADS_CONVERSIONS && cfg.ADS_CONVERSIONS[adsKey];
    if (label) {
      var conv = { send_to: label };
      if (params.value !== undefined) { conv.value = params.value; conv.currency = params.currency; }
      if (params.transaction_id) conv.transaction_id = params.transaction_id;
      gtag("event", "conversion", conv);
      log("Google Ads conversion → " + label, conv);
    }

    var pinEvent = PIN_MAP[name];
    if (pinEvent) {
      var pp = pinParams(params);
      pintrk("track", pinEvent, pp);
      log("Pinterest · " + pinEvent, pp);
    }
  };

  // On-page event log
  function log(name, params) {
    console.log("[TestShop event]", name, params);
    var write = function () {
      var box = document.getElementById("event-log-list");
      if (!box) return;
      var li = document.createElement("li");
      li.innerHTML = "<b>" + name + "</b> <code>" +
        JSON.stringify(params).replace(/</g, "&lt;").slice(0, 300) + "</code>";
      box.prepend(li);
    };
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", write) : write();
  }
})();
