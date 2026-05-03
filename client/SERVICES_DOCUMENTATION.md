# Services Marketplace Documentation

## Overview
Your enhanced services marketplace allows users to customize each service with configurable options before adding to cart. This implements a **Fiverr-like system** with advanced, scalable architecture.

## System Architecture

```
Services Flow:
ServicesPage
  ├── ServiceCardEnhanced (displays service cards)
  │   └── onClick → ServiceDetailModal
  │
  ├── ServiceDetailModal (main customization interface)
  │   ├── OptionSelector (handles radio/checkbox options)
  │   ├── PricingBreakdown (real-time price calculation)
  │   └── Add to Cart → CartContext
  │
  └── Cart.jsx
      ├── Displays all configured services
      ├── Edit button → ServiceDetailModal
      └── Place Order
```

## Key Features

### 1. **Real-time Price Calculation**
- Base price displayed prominently
- Options update price dynamically
- Clear breakdown of all charges
- Tax calculation included (10%)

### 2. **Flexible Option Types**
- **Radio buttons** (select one): Delivery speed, revision packages, etc.
- **Checkboxes** (select multiple): Add-ons like captions, voiceover, etc.
- **Required vs Optional**: Control which options are mandatory
- **Default values**: Pre-select common options

### 3. **Cart Management**
- Each service configuration gets unique ID (`cartItemId`)
- Store complete service data + selected options + calculated price
- Edit functionality: users can modify options before checkout
- Clear pricing display with options breakdown

### 4. **Modern UX**
- Glassmorphism design with gradients
- Smooth Framer Motion animations
- Responsive modal interface
- Real-time feedback on selections

## Data Structure

### Service Object
```javascript
{
  id: "ugc-creation",                    // unique identifier
  title: "UGC Content Creation",         // display name
  description: "Short-form videos...",   // brief description
  details: "Get engaging content...",    // detailed description
  basePrice: 599,                        // starting price
  category: "content",                   // service category
  image: "🎬",                          // emoji icon
  features: ["Fast delivery", ...],      // included features
  options: [                             // customizable options
    {
      id: "delivery-speed",
      name: "Delivery Speed",
      type: "radio",                     // "radio" or "checkbox"
      required: true,
      default: "standard",               // default choice ID
      choices: [
        {
          id: "standard",
          label: "Standard (5-7 days)",
          price: 0                        // price multiplier
        },
        // ... more choices
      ]
    },
    // ... more options
  ]
}
```

### Cart Item Structure
```javascript
{
  cartItemId: "unique-id-timestamp",
  serviceId: "ugc-creation",
  serviceName: "UGC Content Creation",
  basePrice: 599,
  finalPrice: 849,                       // calculated total
  selectedOptions: [...],                // array of selected choices
  selectedChoicesData: [                 // full choice objects
    {
      id: "express",
      label: "Express (2-3 days)",
      price: 150,
      optionId: "delivery-speed",
      type: "radio"
    },
    // ... more selected options
  ],
  image: "🎬",
  category: "content",
  addedAt: "ISO timestamp"
}
```

## How to Add a New Service

1. **Open** `src/data/servicesData.js`
2. **Add new service object** to `servicesData` array:

```javascript
{
  id: "video-editing",                   // unique ID
  title: "Video Editing",
  description: "Professional video editing for all content types.",
  details: "Expert color grading, effects, transitions, and sound design...",
  basePrice: 499,
  category: "video",
  image: "🎞️",
  features: [
    "4K video support",
    "Motion graphics included",
    "Soundtrack selection",
  ],
  options: [
    {
      id: "video-length",
      name: "Video Duration",
      type: "radio",
      required: true,
      default: "standard",
      choices: [
        { id: "standard", label: "5-10 min video", price: 0 },
        { id: "extended", label: "10-30 min video", price: 200 },
        { id: "full", label: "30+ min feature", price: 500 },
      ],
    },
    {
      id: "effects",
      name: "Additional Effects",
      type: "checkbox",
      required: false,
      choices: [
        { id: "3d-text", label: "3D Text Animations", price: 150 },
        { id: "particles", label: "Particle Effects", price: 100 },
        { id: "color-grade", label: "Premium Color Grading", price: 200 },
      ],
    },
  ],
}
```

## How to Customize Options

### Option Types:

**Radio Button** (select one):
```javascript
{
  id: "delivery-speed",
  name: "Delivery Speed",
  type: "radio",              // User selects ONE choice
  required: true,             // Mandatory selection
  default: "standard",        // Pre-selected by default
  choices: [
    { id: "standard", label: "Standard", price: 0 },
    { id: "express", label: "Express", price: 150 },
  ]
}
```

**Checkbox** (select multiple):
```javascript
{
  id: "add_ons",
  name: "Add-ons",
  type: "checkbox",           // User can select MULTIPLE
  required: false,            // Optional
  choices: [
    { id: "captions", label: "Professional Captions", price: 75 },
    { id: "voiceover", label: "Professional Voiceover", price: 150 },
  ]
}
```

## Component Reference

### ServiceCardEnhanced
Displays service card with "Customize" button.
```jsx
<ServiceCardEnhanced
  service={serviceObject}
  onSelect={(service) => openModal(service)}
/>
```

### ServiceDetailModal
Main customization interface.
```jsx
<ServiceDetailModal
  service={selectedService}
  isOpen={isModalOpen}
  onClose={handleCloseModal}
/>
```

### OptionSelector
Renders radio or checkbox options.
```jsx
<OptionSelector
  option={optionObject}
  selectedChoices={selectedChoicesArray}
  onSelect={setSelectedChoices}
/>
```

### PricingBreakdown
Shows real-time price calculation.
```jsx
<PricingBreakdown
  basePrice={599}
  selectedOptions={options}
  selectedChoices={selectedChoices}
/>
```

## Context API - useCart()

```javascript
import { useCart } from "@/context/CartContext";

const { 
  cartItems,           // Array of cart items
  addToCart,           // Add new service config
  updateCartItem,      // Update existing config
  removeFromCart,      // Remove by cartItemId
  clearCart,           // Empty entire cart
  getTotalPrice,       // Calculate total
  getCartCount,        // Number of items
  isCartOpen,          // Cart panel visibility
  setIsCartOpen,       // Toggle cart panel
} = useCart();

// Add service with configuration
addToCart({
  serviceId: "ugc-creation",
  serviceName: "UGC Content Creation",
  basePrice: 599,
  finalPrice: 849,
  selectedChoicesData: [selectedOptions],
  // ... other fields
});

// Edit existing configuration
updateCartItem(cartItemId, updatedData);

// Remove from cart
removeFromCart(cartItemId);
```

## Styling & Design

### Color Scheme
- **Accent**: `#7CFF5B` (lime green)
- **Background**: `#050505` (near black)
- **Glass effect**: `rgba(255, 255, 255, 0.05-0.1)`
- **Borders**: `rgba(255, 255, 255, 0.1-0.2)`

### Key CSS Classes
- `.card-glass` - Glassmorphism card effect
- `bg-gradient-to-b` - Gradient backgrounds
- `border-white/10` - Semi-transparent borders
- `rounded-2xl` - Rounded corners (32px)

### Animations (Framer Motion)
- Modal entrance: scale + fade
- Item selections: toggle animation
- Hover effects: subtle scale or color change
- Price updates: smooth transitions

## Pricing Logic

**Final Price = Base Price + Sum of All Selected Option Prices**

Example:
```
Base Price:           $599.00
+ Express Delivery:   $150.00
+ 5 Revisions:       $100.00
+ Captions:          + $75.00
+ Voiceover:         + $150.00
────────────────────────────
Subtotal:            $1,074.00
+ Tax (10%):         + $107.40
────────────────────────────
Total:               $1,181.40
```

## Advanced Customization

### Add Dynamic Price Tiers
```javascript
// For services with complex pricing
{
  id: "packages",
  name: "Package Tier",
  type: "radio",
  required: true,
  default: "basic",
  choices: [
    {
      id: "basic",
      label: "Basic",
      price: 0,
      description: "Includes 3 revisions"
    },
    {
      id: "pro",
      label: "Pro",
      price: 300,
      description: "Includes unlimited revisions"
    },
  ]
}
```

### Conditional Options (Future Enhancement)
```javascript
// Show options based on other selections
// Requires custom logic in ServiceDetailModal
const shouldShowOption = (optionId, selectedChoices) => {
  if (optionId === "advanced-features") {
    return selectedChoices.some(c => c.id === "pro");
  }
  return true;
};
```

## API Integration

Cart items are posted to your backend:
```javascript
POST /api/orders
{
  items: [
    {
      serviceId: "ugc-creation",
      serviceName: "UGC Content Creation",
      basePrice: 599,
      finalPrice: 849,
      selectedChoicesData: [...]
    }
  ],
  total: 849,
  createdAt: "ISO timestamp"
}
```

## Responsive Design
- **Mobile**: Modal takes full width with padding
- **Tablet**: Optimized 2-column grid
- **Desktop**: Full layout with proper spacing
- All text scales appropriately with Tailwind's `sm:` and `lg:` breakpoints

## Performance Tips
1. Use `useMemo` for price calculations (already implemented)
2. Lazy load modals only when needed
3. Framer Motion animations are GPU-accelerated
4. Context API prevents unnecessary re-renders with proper memoization

## Future Enhancements
- [ ] Service packages (bundled discounts)
- [ ] Seasonal promotions
- [ ] User-saved configurations
- [ ] Service recommendations based on cart
- [ ] Estimated delivery timeline
- [ ] Real-time inventory checks
- [ ] Customer reviews per option combination
