// ============================================================
//  EDIT THIS FILE ONLY — paste your Google tag IDs here
// ============================================================
window.SHOP_CONFIG = {
  // Google tag ID: GA4 "G-XXXXXXX" or Google Ads "AW-XXXXXXXXX".
  // The first ID loads gtag.js; every ID in the list is configured.
  TAG_IDS: ["AW-17628351890"],

  // Google Ads conversion labels (from Ads > Goals > Conversions > Tag setup).
  // Format: "AW-XXXXXXXXXX/AbC-D_efG-h12_34-567". Leave "" to skip.
  ADS_CONVERSIONS: {
    purchase:       "",   // fired on thank-you.html
    add_to_cart:    "",
    begin_checkout: "",
    generate_lead:  "",   // fired on contact form submit
    sign_up:        ""    // fired on newsletter sign-up
  },

  CURRENCY: "INR",

  // Sends GA4 events with debug_mode so they show in GA4 DebugView.
  // You can also turn it on per visit with ?debug=1 in the URL.
  DEBUG_MODE: true
};
