# TestShop – Google tag & conversion test site

Static e-commerce test site for validating Google tag (gtag.js), GA4 e-commerce events and Google Ads conversions. No backend, no real payments.

## 1. Add your tag IDs
Edit `config.js`:
- `TAG_IDS` – your `G-...` and/or `AW-...` IDs
- `ADS_CONVERSIONS` – optional Google Ads conversion labels (`AW-XXXX/label`)

## 2. Deploy on GitHub Pages
1. Create a **public** repo on GitHub (e.g. `test-shop`).
2. **Add file → Upload files** → drag in all files from this folder → Commit.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. Site goes live in ~1 min at `https://<username>.github.io/test-shop/`

CLI alternative:
```
git init && git add . && git commit -m "TestShop"
git branch -M main
git remote add origin https://github.com/<username>/test-shop.git
git push -u origin main
```

## Events fired
| Page / action | Event | Ads conversion key |
|---|---|---|
| Home | view_item_list, select_item | – |
| Product page | view_item | – |
| Add to cart | add_to_cart | add_to_cart |
| Remove from cart | remove_from_cart | – |
| Cart | view_cart | – |
| Checkout load | begin_checkout | begin_checkout |
| Shipping / payment change | add_shipping_info, add_payment_info | – |
| Thank-you page | purchase (+ enhanced conversions user_data) | purchase |
| Contact form | generate_lead | generate_lead |
| Newsletter (footer) | sign_up | sign_up |

URL-based conversions: use `thank-you.html` (purchase) – URL includes `?order_id=T-...`.

## Testing
- Every page shows an **Event log** panel at the bottom listing what fired.
- `debug_mode` is on by default → check **GA4 Admin → DebugView**.
- Use **Tag Assistant** (tagassistant.google.com) to confirm the tag and conversions.
- Add `?gclid=test123` to any URL to simulate an ad click.
- "Reset cart" in the footer clears local state.
