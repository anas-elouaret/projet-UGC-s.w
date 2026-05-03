# Quick Start Guide - Configurable Services

## Get Started in 3 Steps

### Step 1: Review Existing Services
Services are defined in: `src/data/servicesData.js`

The file includes 5 pre-configured services:
- 🎬 UGC Content Creation ($599)
- 📸 Photography ($799)
- 🌐 Website Development ($1499)
- ⚙️ Web Applications ($2499)
- 🖨️ Printing Services ($299)

Each has multiple configurable options with real-time pricing.

---

## Step 2: Customize Service Options

### Example: Add "Rush Delivery" to UGC Service

Open `src/data/servicesData.js` and find the UGC service:

```javascript
// BEFORE
options: [
  {
    id: "delivery-speed",
    name: "Delivery Speed",
    type: "radio",
    required: true,
    default: "standard",
    choices: [
      { id: "standard", label: "Standard (5-7 days)", price: 0 },
      { id: "express", label: "Express (2-3 days)", price: 150 },
      { id: "rush", label: "Rush (24 hours)", price: 300 },
    ],
  },
  // ... rest of options
]

// AFTER - Just modify the choices array
choices: [
  { id: "standard", label: "Standard (5-7 days)", price: 0 },
  { id: "express", label: "Express (2-3 days)", price: 150 },
  { id: "rush", label: "Rush (24 hours)", price: 300 },
  { id: "ultra-rush", label: "Ultra Rush (12 hours)", price: 500 },  // NEW
],
```

### Example: Add New Option Group

Add a new option to the UGC service's `options` array:

```javascript
{
  id: "extra-features",
  name: "Extra Features",
  type: "checkbox",           // Multiple selections allowed
  required: false,            // Optional add-ons
  choices: [
    { id: "subtitles", label: "Auto-generated Subtitles", price: 50 },
    { id: "thumbnails", label: "YouTube Thumbnails", price: 75 },
    { id: "social-cards", label: "Social Media Cards", price: 60 },
    { id: "script-writing", label: "Professional Script Writing", price: 120 },
  ],
}
```

---

## Step 3: Add New Service

Paste this template into `servicesData.js`:

```javascript
{
  id: "your-service-id",
  title: "Your Service Title",
  description: "Brief description for the card view.",
  basePrice: 999,
  category: "category-name",
  image: "🎨",  // Use any relevant emoji
  details: "Detailed description shown in the modal.",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ],
  options: [
    {
      id: "option-1",
      name: "Option Name",
      type: "radio",  // or "checkbox"
      required: true, // or false
      default: "choice-1",  // match a choice id
      choices: [
        { id: "choice-1", label: "Choice 1 Label", price: 0 },
        { id: "choice-2", label: "Choice 2 Label", price: 100 },
      ],
    },
    // Add more options...
  ],
}
```

---

## Common Option Patterns

### Pattern 1: Service Tier (Radio Buttons)
```javascript
{
  id: "service-tier",
  name: "Service Tier",
  type: "radio",
  required: true,
  default: "basic",
  choices: [
    { id: "basic", label: "Basic", price: 0 },
    { id: "standard", label: "Standard", price: 200 },
    { id: "premium", label: "Premium", price: 500 },
  ],
}
```

### Pattern 2: Add-ons (Checkboxes)
```javascript
{
  id: "add_ons",
  name: "Add-ons",
  type: "checkbox",
  required: false,
  choices: [
    { id: "addon-1", label: "Add-on 1", price: 75 },
    { id: "addon-2", label: "Add-on 2", price: 100 },
    { id: "addon-3", label: "Add-on 3", price: 50 },
  ],
}
```

### Pattern 3: Delivery Speed (Radio)
```javascript
{
  id: "delivery",
  name: "Delivery Speed",
  type: "radio",
  required: true,
  default: "standard",
  choices: [
    { id: "standard", label: "Standard (10-14 days)", price: 0 },
    { id: "express", label: "Express (5-7 days)", price: 150 },
    { id: "rush", label: "Rush (24-48 hours)", price: 300 },
  ],
}
```

### Pattern 4: Quality Tiers (Radio)
```javascript
{
  id: "quality",
  name: "Quality Level",
  type: "radio",
  required: false,
  default: null,
  choices: [
    { id: "standard", label: "Standard Quality", price: 0 },
    { id: "hd", label: "HD Quality", price: 100 },
    { id: "4k", label: "4K Ultra HD", price: 250 },
  ],
}
```

---

## Pricing Rules

✅ **Free options**: Set `price: 0`
✅ **Premium add-ons**: Set appropriate price
✅ **Stacked options**: Prices add together automatically
❌ **No quantity multipliers**: Each config is unique

**Example Calculation:**
```
Base:        $599
+ Express:   $150
+ Premium:   $250
+ 2 Add-ons: $75 + $100
────────────────────
Total:       $1,174
```

---

## Testing Your Changes

1. **Add to servicesData.js** ✓
2. **Reload page** in browser (Ctrl+R)
3. **Click "Customize"** on service card
4. **Select options** - see price update in real-time
5. **Check Cart** - verify all selections are saved

---

## File Locations

| File | Purpose |
|------|---------|
| `src/data/servicesData.js` | Service definitions & options |
| `src/pages/ServicesPage.jsx` | Services listing page |
| `src/components/services/ServiceCardEnhanced.jsx` | Service card component |
| `src/components/services/ServiceDetailModal.jsx` | Customization modal |
| `src/components/services/OptionSelector.jsx` | Options UI |
| `src/components/services/PricingBreakdown.jsx` | Price display |
| `src/context/CartContext.jsx` | Cart state management |

---

## Troubleshooting

### Options not showing?
- Check `type: "radio"` or `type: "checkbox"` is correct
- Ensure `default` value matches a `choice.id`
- Verify no typos in option/choice IDs

### Price not updating?
- Confirm all prices are numbers (not strings)
- Check `PricingBreakdown` component isn't filtering options
- Look at React DevTools to verify CartContext has selections

### Modal not opening?
- Check browser console for errors
- Verify `ServiceDetailModal` is imported in `ServicesPage`
- Ensure `onSelect` prop is passed to `ServiceCardEnhanced`

### Cart showing wrong total?
- Verify `selectedChoicesData` array has correct price values
- Check tax calculation (10% default in PricingBreakdown)
- Look at `getTotalPrice()` in CartContext

---

## Advanced: Custom Validation

To validate selections before adding to cart, modify `ServiceDetailModal.jsx`:

```javascript
const handleAddToCart = () => {
  // Validate required options
  const requiredOptions = service.options.filter(o => o.required);
  const selectedOptionIds = new Set(selectedChoices.map(c => c.optionId));
  
  const allRequired = requiredOptions.every(opt => 
    selectedOptionIds.has(opt.id)
  );
  
  if (!allRequired) {
    alert("Please complete all required options");
    return;
  }
  
  // Proceed with adding to cart...
};
```

---

## Need Help?

Refer to: `SERVICES_DOCUMENTATION.md` for complete API reference
