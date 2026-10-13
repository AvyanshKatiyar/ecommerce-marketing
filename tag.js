// Loads the Google tag and exposes a small helper used across the site.
(function () {
  var cfg = window.SHOP_CONFIG || {};
  var ids = (cfg.TAG_IDS || []).filter(function (id) { return id && id.indexOf("XXXX") === -1; });
  var debug = cfg.DEBUG_MODE || /[?&]debug=1/.test(location.search);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  // The Google tag snippet is pasted directly in each page <head>.
  // Only load/config extra IDs here (e.g. a GA4 G- ID) that aren't already on the page.
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
  if (!onPage.length && !ids.length) console.warn("[TestShop] No Google tag found.");

  // track(eventName, params, adsKey) -> sends GA4/gtag event + optional Ads conversion
  window.track = function (name, params, adsKey) {
    params = params || {};
    if (debug) params.debug_mode = true;
    gtag("event", name, params);
    log(name, params);

    var label = adsKey && cfg.ADS_CONVERSIONS && cfg.ADS_CONVERSIONS[adsKey];
    if (label) {
      var conv = { send_to: label };
      if (params.value !== undefined) { conv.value = params.value; conv.currency = params.currency; }
      if (params.transaction_id) conv.transaction_id = params.transaction_id;
      gtag("event", "conversion", conv);
      log("conversion → " + label, conv);
    }
  };

  // On-page event log so you can see what fired without opening DevTools
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
