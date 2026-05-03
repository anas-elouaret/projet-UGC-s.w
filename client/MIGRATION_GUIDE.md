# Migration Guide: Old Services → New Configurable Services

## What Changed?

Your marketplace has been upgraded from **simple static services** to a **fully configurable SaaS-style platform** with real-time pricing and customization options.

### Before (Old System)
```
Service Card
├── Fixed price
├── Static benefits list
├── "Add to Cart" button
└── Cart shows: Service name + Price
```

### After (New System)
```
Service Card
├── Base price + "Starting from"
├── "Customize" button → Modal opens
│   ├── Options (radio buttons & checkboxes)
│   ├── Real-time price breakdown
│   └── "Add to Cart" button
└── Cart shows: Service + Selected options + Final price
```

---

## File Changes

### Removed / Deprecated
- Old service list structure (static `serviceItems` from `hybridData.js`)
- Simple "Add to Cart" with just `id`, `name`, `price`
- Basic cart items without configuration tracking

### New Files Created
```
src/
├── data/
│   └── servicesData.js              ← NEW: All service definitions
├── components/services/
│   ├── ServiceCardEnhanced.jsx       ← NEW: Enhanced card with emoji
│   ├── ServiceDetailModal.jsx        ← NEW: Customization modal
│   ├── OptionSelector.jsx            ← NEW: Option UI component
│   └── PricingBreakdown.jsx          ← NEW: Real-time pricing display
└── pages/
    └── ServicesPage.jsx             ← UPDATED: Uses new system
```

### Updated Files
| File | What Changed |
|------|-------------|
| `src/pages/ServicesPage.jsx` | Now uses new modal system & enhanced data |
| `src/context/CartContext.jsx` | Cart items now store full service config |
| `src/components/cart/Cart.jsx` | Displays selected options, Edit functionality |

---

## Code Migration Examples

### Old Service Structure
```javascript
// OLD: src/components/hybrid/hybridData.js
export const serviceItems = [
  {
    id: "ugc-creation",
    title: "UGC Content Creation",
    description: "Short-form videos...",
    price: 599,
    benefits: ["Fast delivery", "Creator matching", "Cross-platform"],
  },
];
```

### New Service Structure
```javascript
// NEW: src/data/servicesData.js
export const servicesData = [
  {
    id: "ugc-creation",
    title: "UGC Content Creation",
    description: "Short-form videos...",
    basePrice: 599,                    // ← Changed property name
    category: "content",               // ← NEW
    image: "🎬",                      // ← NEW (emoji)
    details: "Get engaging content...", // ← NEW (full description)
    features: ["Fast delivery", ...],
    options: [                         // ← NEW (configurable)
      {
        id: "delivery-speed",
        name: "Delivery Speed",
        type: "radio",
        required: true,
        default: "standard",
        choices: [
          { id: "standard", label: "Standard (5-7 days)", price: 0 },
          { id: "express", label: "Express (2-3 days)", price: 150 },
        ],
      },
      // ... more options
    ],
  },
];
```

### Old AddToCart
```javascript
// OLD: Simple item with fixed price
<AddToCartButton 
  item={{
    id: service.id,
    name: service.title,
    price: service.price,
  }}
/>
```

### New Add to Cart (in Modal)
```javascript
// NEW: Complete service configuration
const handleAddToCart = () => {
  addToCart({
    serviceId: service.id,
    serviceName: service.title,
    basePrice: service.basePrice,
    finalPrice: finalPrice,                    // ← Calculated
    selectedChoicesData: selectedChoices,       // ← User selections
    image: service.image,
    category: service.category,
  });
};
```

### Old Cart Items
```javascript
// OLD: Cart context stored
{
  id: "ugc-creation",
  name: "UGC Content Creation",
  price: 599,
  quantity: 1
}
```

### New Cart Items
```javascript
// NEW: Cart context stores
{
  cartItemId: "ugc-creation-1709285746123-0.456",  // ← Unique per config
  serviceId: "ugc-creation",
  serviceName: "UGC Content Creation",
  basePrice: 599,
  finalPrice: 849,                               // ← After options
  selectedChoicesData: [
    {
      id: "express",
      label: "Express (2-3 days)",
      price: 150,
      optionId: "delivery-speed",
      type: "radio"
    },
    {
      id: "voiceover",
      label: "Professional Voiceover",
      price: 150,
      optionId: "add_ons",
      type: "checkbox"
    }
  ],
  image: "🎬",
  category: "content",
  addedAt: "2024-01-15T10:30:00Z"
}
```

---

## Component Integration

### Old Approach
```jsx
// ServicesPage.jsx
{serviceItems.map((service) => (
  <article key={service.id}>
    {/* Static display */}
    <h2>{service.title}</h2>
    <p>${service.price}</p>
    <AddToCartButton item={{ id, name, price }} />
    <Link to="/start-project">Details</Link>
  </article>
))}
```

### New Approach
```jsx
// ServicesPage.jsx
const [selectedService, setSelectedService] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

{servicesData.map((service) => (
  <ServiceCardEnhanced
    key={service.id}
    service={service}
    onSelect={(service) => {
      setSelectedService(service);
      setIsModalOpen(true);
    }}
  />
))}

<ServiceDetailModal
  service={selectedService}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

---

## API Payload Changes

### Old Order Structure
```javascript
{
  items: [
    { id: "ugc-creation", name: "UGC Creation", price: 599, quantity: 1 }
  ],
  total: 599,
  createdAt: "2024-01-15T10:30:00Z"
}
```

### New Order Structure
```javascript
{
  items: [
    {
      serviceId: "ugc-creation",
      serviceName: "UGC Content Creation",
      basePrice: 599,
      finalPrice: 849,
      selectedChoicesData: [
        { id: "express", price: 150, label: "Express..." },
        { id: "voiceover", price: 150, label: "Professional..." }
      ],
      image: "🎬",
      category: "content"
    }
  ],
  total: 849,
  createdAt: "2024-01-15T10:30:00Z"
}
```

**Note:** Your backend at `/api/orders` will receive the new structure. Make sure it handles the additional fields.

---

## Context API Changes

### Old useCart() Hook
```javascript
const { 
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  getTotalPrice,
  getCartCount,
} = useCart();

// Simple usage
addToCart({ id: "service", name: "Name", price: 599 });
removeFromCart("service"); // By ID
```

### New useCart() Hook
```javascript
const { 
  cartItems,
  addToCart,
  updateCartItem,           // ← NEW
  removeFromCart,
  clearCart,
  getTotalPrice,
  getCartCount,
  isCartOpen,               // ← NEW
  setIsCartOpen,            // ← NEW
} = useCart();

// New usage
addToCart({
  serviceId: "ugc-creation",
  serviceName: "UGC Content Creation",
  basePrice: 599,
  finalPrice: 849,
  selectedChoicesData: [...],
  // ... other fields
});

removeFromCart("unique-cart-item-id"); // By unique cartItemId

updateCartItem("unique-cart-item-id", { finalPrice: 999 }); // Edit config
```

---

## Backward Compatibility

### If You Need the Old Service List
The old `hybridData.js` still exists with `serviceItems`. However, it's no longer used. 

To keep using it:
1. Don't modify it
2. Create a migration layer to convert to new format
3. Example:

```javascript
// Convert old serviceItems to new format
const convertToNewFormat = (oldItem) => ({
  id: oldItem.id,
  title: oldItem.title,
  description: oldItem.description,
  basePrice: oldItem.price,
  category: "general",
  image: "📦",
  features: oldItem.benefits || [],
  details: oldItem.description,
  options: [
    // Add basic options
  ],
});

const servicesData = serviceItems.map(convertToNewFormat);
```

---

## Step-by-Step Migration Checklist

### ✅ Phase 1: Review (Already Done)
- [x] New service structure created in `servicesData.js`
- [x] New components built (Modal, Options, Pricing)
- [x] CartContext updated to handle configurations

### ✅ Phase 2: Implementation (Already Done)
- [x] ServicesPage migrated to new system
- [x] Cart updated to show options
- [x] All files imported and connected

### ⏳ Phase 3: Testing
- [ ] Load `/services` page - should see new service cards
- [ ] Click "Customize" on a service
- [ ] Modal opens with options
- [ ] Select options - price updates in real-time
- [ ] Click "Add to Cart"
- [ ] Cart shows selected service + options + final price
- [ ] Edit service configuration from cart
- [ ] Place order

### ⏳ Phase 4: Customization (You Do This)
- [ ] Customize existing services in `servicesData.js`
- [ ] Add new services following template
- [ ] Adjust prices and options as needed
- [ ] Update backend to handle new order structure (if needed)

### ⏳ Phase 5: Launch
- [ ] Test on mobile/tablet
- [ ] Verify animations work smoothly
- [ ] Check all services are displaying
- [ ] Confirm cart totals are accurate
- [ ] Deploy to production

---

## Troubleshooting Migration Issues

### Issue: "servicesData is not defined"
**Solution:** Ensure you imported it in ServicesPage:
```javascript
import { servicesData } from "../data/servicesData";
```

### Issue: Services show but modal won't open
**Solution:** Check that `ServiceDetailModal` is imported:
```javascript
import ServiceDetailModal from "../components/services/ServiceDetailModal";
```

### Issue: Price not updating when selecting options
**Solution:** Verify `selectedChoicesData` includes prices:
```javascript
console.log(selectedChoices); // Check structure in React DevTools
```

### Issue: "Cart shows NaN for price"
**Solution:** Ensure `finalPrice` is a number, not a string:
```javascript
// ✓ Correct
finalPrice: 849
// ❌ Wrong
finalPrice: "849"
```

### Issue: Old `/start-project` link no longer needed
**Solution:** Remove if not using. Or keep as "Details" link to project page.

---

## Performance Notes

- Modal only renders when opened (AnimatePresence)
- Price calculation uses `useMemo` to prevent unnecessary recalculations
- Options are filtered, not conditionally rendered (all available)
- Cart uses unique `cartItemId` to prevent merge issues

---

## Questions?

Refer to complete documentation:
- **SERVICES_DOCUMENTATION.md** - Complete API reference
- **QUICK_START_GUIDE.md** - How to add/customize services
- **SERVICE_TEMPLATE_EXAMPLE.js** - Copy-paste templates

