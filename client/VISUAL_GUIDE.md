# Visual Guide - Configurable Services System

## 🎬 User Interface Overview

### Services Page (Desktop View)
```
┌─────────────────────────────────────────────────────────────────────┐
│  UGC Marketplace                                    [☰] [🛒 Cart]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  SERVICES                                                            │
│  Agency-grade services with marketplace flexibility.                 │
│  Customize each service with options that matter to your business.   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ 🎬 UGC CONTENT CREATION        Starting from   $599          │   │
│  │ CONTENT                                                        │   │
│  │ Short-form videos, creator-led ads...                         │   │
│  │                                                                │   │
│  │ • Fast campaign-ready delivery                                │   │
│  │ • Creator matching by niche                                   │   │
│  │ • Cross-platform content formats                              │   │
│  │                                                                │   │
│  │ [🛒 Add to Cart] [Customize →]                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ 📸 PHOTOGRAPHY                 Starting from   $799           │   │
│  │ VISUAL                                                         │   │
│  │ Studio and lifestyle photography...                            │   │
│  │                                                                │   │
│  │ • E-commerce optimized shots                                   │   │
│  │ • High-converting visual storytelling                          │   │
│  │ • Retouching and export included                               │   │
│  │                                                                │   │
│  │ [🛒 Add to Cart] [Customize →]                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  [More services below...]                                            │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Customization Modal (Service Detail)
```
┌──────────────────────────────────────────────────────────────────┐
│  🎬 UGC Content Creation                           [✕]           │
│  CONTENT                                                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Get engaging, conversion-optimized UGC content from              │
│  professional creators...                                         │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Base Price: $599.00                                        │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  What's Included                                                  │
│  ✓ Fast campaign-ready delivery                                   │
│  ✓ Creator matching by niche                                      │
│  ✓ Cross-platform content formats                                 │
│                                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Customize Your Package                                           │
│                                                                    │
│  DELIVERY SPEED [Required]                                        │
│                                                                    │
│  ◯ Standard (5-7 days)                            $0             │
│  ◯ Express (2-3 days)                           +$150 ┐          │
│  ◉ Rush (24 hours)                              +$300 │ Selected │
│                                                         └          │
│                                                                    │
│  REVISION PACKAGE [Required]                                      │
│                                                                    │
│  ◉ 2 Revisions Included                           $0             │
│  ◯ 5 Revisions Included                         +$100            │
│  ◯ Unlimited Revisions                          +$200            │
│                                                                    │
│  ADD-ONS [Optional]                                               │
│                                                                    │
│  ☑ Professional Captions & Subtitles             +$75             │
│  ☑ Professional Voiceover                        +$150            │
│  ☐ 3 Variations per Video                        +$100            │
│  ☐ Premium Music License                         +$50             │
│                                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Pricing Breakdown                                                │
│                                                                    │
│  Base Service                                    $599.00          │
│  → Rush (24 hours)                              +$300.00          │
│  → Professional Captions & Subtitles             +$75.00          │
│  → Professional Voiceover                       +$150.00          │
│                                                ───────────         │
│  Subtotal                                       $1,124.00          │
│  Tax (10%)                                       +$112.40          │
│                                                ───────────         │
│  Total                                          $1,236.40          │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Final Price: $1,236.40                                           │
│                                                                    │
│  [🛒 Add to Cart]  [Cancel]                                       │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Shopping Cart (Side Panel)
```
┌─────────────────────────────────┐
│ Shopping Cart              [✕]  │
├─────────────────────────────────┤
│                                  │
│ 🎬 UGC Content Creation          │
│ CONTENT                          │
│ Base: $599.00                    │
│                                  │
│ → Express (2-3 days)    +$150.00 │
│ → 5 Revisions           +$100.00 │
│ → Captions               +$75.00 │
│                                  │
│ $1,074.00          [Edit] [×]    │
│                                  │
│ ────────────────────────────────  │
│                                  │
│ 📸 Photography                   │
│ VISUAL                           │
│ Base: $799.00                    │
│                                  │
│ → Location Shoot        +$200.00 │
│ → 50 Images             +$300.00 │
│ → Advanced Editing      +$150.00 │
│                                  │
│ $1,199.00          [Edit] [×]    │
│                                  │
│ ────────────────────────────────  │
│                                  │
│ Total: $2,273.00                 │
│                                  │
│ [Place Order]                    │
│ [Continue Shopping]              │
│                                  │
└─────────────────────────────────┘
```

---

## 🔄 State Flow Diagram

```
ComponentA                    Modal                    PricingBreakdown
    │                         │                          │
    ├─ [User clicks]          │                          │
    │  "Customize"            │                          │
    │                         │                          │
    ├────────────────────────>│                          │
    │  (setIsModalOpen(true))  │                          │
    │                         │                          │
    │                         ├─ Initialize             │
    │                         │  defaults               │
    │                         │                          │
    │    [User selects option]│                          │
    │    "Express Delivery"   │                          │
    │                         │                          │
    │<────────────────────────├──────────────────────────│
    │  selectedChoices update  │ recalculate finalPrice  │
    │                         │  │                       │
    │                         ├─>│ Sum all prices        │
    │                         │  │ Add tax               │
    │                         │  │ Re-render             │
    │                         │  │                       │
    │                         │<─┤                       │
    │                         │                          │
    │    [User clicks]        │                          │
    │    "Add to Cart"        │                          │
    │                         │                          │
    │                         ├─ addToCart({            │
    │                         │   serviceName,          │
    │                         │   basePrice,            │
    │                         │   finalPrice,           │
    │                         │   selectedChoices       │
    │                         │ })                      │
    │                         │                          │
    │<────────────────────────┼──────────────────────────│
    │  CartContext updated     │                          │
    │  Cart re-renders         │                          │
```

---

## 📊 Price Calculation Logic

```javascript
// Real-time Price Calculation

User Selects Options
        ↓
selectedChoices = [
  { id: "rush", price: 300, type: "radio", optionId: "delivery-speed" },
  { id: "voiceover", price: 150, type: "checkbox", optionId: "add_ons" },
  { id: "captions", price: 75, type: "checkbox", optionId: "add_ons" }
]
        ↓
useMemo Hook Runs:
  finalPrice = basePrice (599)
             + radio option prices (300)
             + checkbox prices (150 + 75)
             = 1,124
        ↓
PricingBreakdown Component:
  basePrice:           $599
  radio options:       +$300
  checkboxes:          +$225
  ──────────────────────────
  subtotal:            $1,124
  tax (10%):           +$112.40
  ──────────────────────────
  TOTAL:               $1,236.40
        ↓
Cart Stores:
  finalPrice: 1236.40
  selectedChoicesData: [...]
        ↓
Order API Sends:
  {
    serviceId: "ugc-creation",
    basePrice: 599,
    finalPrice: 1236.40,
    selectedChoicesData: [...]
  }
```

---

## 🎨 Option Selection Patterns

### Pattern 1: Radio Button Selection (Single Choice)
```
Before:                          After Selection:
┌─────────────────────┐         ┌─────────────────────┐
│ ◯ Standard (7 days) │         │ ◯ Standard (7 days) │
│ ◯ Express (2 days)  │    -->  │ ◉ Express (2 days)  │
│ ◯ Rush (24 hours)   │         │ ◯ Rush (24 hours)   │
└─────────────────────┘         └─────────────────────┘

✓ Only ONE can be selected
✓ Selecting new option deselects previous
✓ Used for mutually exclusive choices (tiers, speeds)
```

### Pattern 2: Checkbox Selection (Multiple Choices)
```
Before:                          After Selection:
┌────────────────────────┐      ┌────────────────────────┐
│ ☐ Captions             │      │ ☑ Captions         +$75 │
│ ☐ Voiceover            │ -->  │ ☑ Voiceover       +$150 │
│ ☐ 3 Variations         │      │ ☐ 3 Variations    +$100 │
│ ☐ Premium Music        │      │ ☐ Premium Music    +$50 │
└────────────────────────┘      └────────────────────────┘

✓ Multiple can be selected
✓ Each adds to total price
✓ Used for add-ons and extras
✓ Users pick what they need
```

---

## 🎯 Component Hierarchy

```
App (Router)
 │
 └─ ServicesPage
     │
     ├─ HybridNavbar
     │
     ├─ ServiceCardEnhanced  ×5 (for each service)
     │   ├─ onClick
     │   │   └─ setSelectedService()
     │   │   └─ setIsModalOpen(true)
     │   │
     │   └─ ServiceDetailModal
     │       │
     │       ├─ Service Image & Title
     │       ├─ Features List
     │       ├─ OptionSelector ×N (for each option)
     │       │   ├─ Radio Buttons (if type="radio")
     │       │   └─ Checkboxes (if type="checkbox")
     │       │
     │       └─ PricingBreakdown
     │           ├─ basePrice
     │           ├─ Option prices
     │           ├─ Subtotal
     │           ├─ Tax
     │           └─ TOTAL
     │
     └─ Cart (Global - via useCart)
         ├─ CartIcon with count
         ├─ CartPanel (Side drawer)
         │   ├─ Cart Items List
         │   │   └─ Edit Button → Opens Modal
         │   │   └─ Remove Button
         │   │
         │   ├─ Pricing Summary
         │   └─ Place Order Button
         │
         └─ CartContext
             ├─ cartItems state
             ├─ addToCart()
             ├─ removeFromCart()
             ├─ updateCartItem()
             └─ getTotalPrice()
```

---

## 🔄 Service Configuration Lifecycle

```
1. INITIAL STATE
   Modal Closed
   selectedChoices = []

2. MODAL OPENS
   useEffect runs
   Defaults are set
   selectedChoices = [defaultChoice1, defaultChoice2, ...]

3. USER SELECTS OPTION
   handleSelect() called
   selectedChoices updated
   OptionSelector re-renders
   PricingBreakdown re-renders with new price

4. USER ADDS MORE OPTIONS
   handleSelect() called again
   selectedChoices array grows
   Prices accumulate
   finalPrice increases

5. USER CLICKS "ADD TO CART"
   handleAddToCart() called
   cartItem object created with all data
   addToCart(cartItem) called
   CartContext updates
   Modal closes
   Cart panel opens
   selectedChoices reset to []

6. ITEM IN CART
   User can see all options selected
   User can click "Edit" to modify
   Or "Remove" to delete
   Or "Place Order" to checkout
```

---

## 📱 Mobile Responsive Behavior

### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────────────┐
│ Nav                                             [Cart]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Service 1]      [Service 2]                           │
│                                                          │
│  [Service 3]      [Service 4]                           │
│                                                          │
│  [Service 5]                                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
Modal centered on screen, max-width: 42rem (672px)
```

### Tablet (768px - 1024px)
```
┌────────────────────────────────────────┐
│ Nav                          [Cart]    │
├────────────────────────────────────────┤
│                                        │
│  [Service 1]    [Service 2]            │
│                                        │
│  [Service 3]    [Service 4]            │
│                                        │
│  [Service 5]                           │
│                                        │
└────────────────────────────────────────┘
Modal 90% width, max-width still 672px
```

### Mobile (<768px)
```
┌──────────────────┐
│ Nav      [Cart]  │
├──────────────────┤
│                  │
│  [Service 1]     │
│                  │
│  [Service 2]     │
│                  │
│  [Service 3]     │
│                  │
└──────────────────┘
Modal full width with padding
Single column layout
Touch-optimized buttons
```

---

## 🎬 Animation Flows

### Modal Entry Animation
```
Frame 0:           Frame 30ms:         Frame 60ms:
(Starting)         (Scaling)           (Final)

┌─────────┐       ┌──────────┐       ┌──────────────┐
│         │       │          │       │              │
│ Scale   │  ---> │  Scale   │ --->  │   Scale      │
│ 0.95    │       │  0.98    │       │   1.0        │
│ Fade: 0 │       │ Fade: 0.5│       │  Fade: 1.0   │
│         │       │          │       │              │
└─────────┘       └──────────┘       └──────────────┘

Curve: spring(stiffness: 400, damping: 30)
Duration: ~300ms
```

### Option Selection Animation
```
Click Checkbox:                    Result:

 Before              During         After
   │                  │              │
   ☐ Option      --> ○ Option  --> ☑ Option
   │                  │              │
              (50ms toggle)      (visible tick)
```

### Price Update Animation
```
User selects option:

Before:             During:              After:
$599.00    ----→   $800.00 (transitioning)  ----→   $749.00
           100ms                          100ms
```

---

## 🏗️ Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                      Application                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Context API (Global State)                          │   │
│  │  ├─ CartContext                                      │   │
│  │  │   ├─ cartItems[]                                  │   │
│  │  │   ├─ addToCart(item)                              │   │
│  │  │   ├─ removeFromCart(id)                           │   │
│  │  │   └─ updateCartItem(id, data)                     │   │
│  │  │                                                    │   │
│  │  └─ LanguageContext (existing)                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                         ▲                                    │
│                         │ useCart()                          │
│                         │                                    │
│  ┌──────────────────────┴──────────────────────────────┐   │
│  │           Components (UI Layer)                      │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ ServicesPage                                   │  │   │
│  │  │ ├─ state: [selectedService, isModalOpen]       │  │   │
│  │  │ ├─ ServiceCardEnhanced[]                        │  │   │
│  │  │ │ └─ props: service, onSelect                  │  │   │
│  │  │ └─ ServiceDetailModal                           │  │   │
│  │  │   ├─ state: [selectedChoices, isAdding]         │  │   │
│  │  │   ├─ OptionSelector[]                           │  │   │
│  │  │   └─ PricingBreakdown                           │  │   │
│  │  │                                                 │  │   │
│  │  └─ Cart                                           │  │   │
│  │    ├─ useCart() hook                               │  │   │
│  │    ├─ Cart items display                           │  │   │
│  │    └─ ServiceDetailModal (for editing)             │  │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Data Layer                                 │   │
│  │  └─ src/data/servicesData.js                         │   │
│  │     └─ servicesData[] (service definitions)          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Testing Checklist Visual

```
Services Page
├─ ✓ Loads all 5 services
├─ ✓ Each card shows emoji, title, price
├─ ✓ Hover effect on cards
│
Service Customization
├─ ✓ Modal opens on "Customize" click
├─ ✓ Modal closes on ✕ or "Cancel"
├─ ✓ Defaults are pre-selected
├─ ✓ Base price displayed correctly
├─ ✓ Features list shows
│
Options Selection
├─ ✓ Radio buttons work (select one)
├─ ✓ Checkboxes work (select multiple)
├─ ✓ Required options validated
├─ ✓ Optional options can be skipped
│
Price Calculation
├─ ✓ Base price shown
├─ ✓ Option prices add correctly
├─ ✓ Tax calculated (10%)
├─ ✓ Total updates in real-time
├─ ✓ Pricing breakdown accurate
│
Add to Cart
├─ ✓ "Add to Cart" button works
├─ ✓ Item appears in cart
├─ ✓ Cart price is correct
├─ ✓ Selected options are saved
│
Cart Operations
├─ ✓ Multiple items can be added
├─ ✓ "Edit" opens modal with same service
├─ ✓ "Remove" deletes item
├─ ✓ "Place Order" submits data
├─ ✓ Success message appears
├─ ✓ Cart clears after order
│
Responsive Design
├─ ✓ Desktop layout correct
├─ ✓ Tablet layout correct
├─ ✓ Mobile layout correct
├─ ✓ Touch targets are large enough
├─ ✓ No horizontal scrolling
│
Performance
├─ ✓ Modal opens smoothly
├─ ✓ Animations are 60fps
├─ ✓ Price updates instantly
├─ ✓ No lag on selections
├─ ✓ Cart opens/closes smoothly
```

