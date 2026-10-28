// Google tag: pasted directly in each page <head> (unchanged).
// Pinterest + TikTok tags: loaded below (this file runs in every page <head>).
(function () {
  var cfg = window.SHOP_CONFIG || {};
  var ids = (cfg.TAG_IDS || []).filter(function (id) { return id && id.indexOf("XXXX") === -1; });
  var debug = cfg.DEBUG_MODE || /[?&]debug=1/.test(location.search);
  var PIN_ID = "2614432047622";
  var TT_ID  = "CRPEQQBC77U0USAV7NC0";

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

  // ================= TIKTOK PIXEL (base code) =================
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
    var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
    ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  }(window, document, "ttq");

  // ================= Enhanced / Advanced Match =================
  var savedEm = null, savedEmHash = null;
  try { savedEm = localStorage
