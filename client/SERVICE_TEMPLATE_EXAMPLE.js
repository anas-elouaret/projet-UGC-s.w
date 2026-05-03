// Example: Complete Service Configuration Template
// Copy this entire service object and customize it for your needs

const serviceExample = {
  id: "branding-package",                              // Unique identifier (use lowercase, hyphens)
  title: "Complete Branding Package",                  // Display name (will show in card & modal)
  description: "Full brand identity including logo, guidelines, and assets.", // Short description (shows in card)
  basePrice: 1999,                                     // Starting price in dollars
  category: "branding",                                // Category (for filtering/grouping)
  image: "🎨",                                        // Emoji icon (visible in card & modal header)
  
  details: "Professional branding package including logo design, color palette, typography guidelines, and complete brand asset library. Perfect for startups and established businesses looking to refresh their identity.",
  // ↑ Long description shown in modal
  
  features: [
    "Custom Logo Design (3 concepts)",
    "Brand Style Guide",
    "Color Palette & Typography",
    "Social Media Templates",
    "Business Card & Letterhead",
  ],
  // ↑ Feature list shown with checkmarks in modal
  
  options: [
    // OPTION 1: Service Tier (Radio button - select ONE)
    {
      id: "branding-tier",
      name: "Branding Tier",
      type: "radio",                                   // "radio" = select one | "checkbox" = select multiple
      required: true,                                  // User MUST select this option
      default: "standard",                             // Pre-selected option ID
      choices: [
        {
          id: "standard",
          label: "Standard Branding",
          price: 0,                                    // Price multiplier (0 = no extra cost)
        },
        {
          id: "premium",
          label: "Premium + Brand Strategy Consultation",
          price: 500,                                  // Add $500 to final price
        },
        {
          id: "elite",
          label: "Elite + Custom Illustrations",
          price: 1200,                                 // Add $1200 to final price
        },
      ],
    },

    // OPTION 2: Revision Package (Radio button)
    {
      id: "revisions",
      name: "Revision Rounds",
      type: "radio",
      required: true,
      default: "standard-rev",
      choices: [
        {
          id: "standard-rev",
          label: "2 Revision Rounds",
          price: 0,
        },
        {
          id: "extended-rev",
          label: "5 Revision Rounds",
          price: 300,
        },
        {
          id: "unlimited-rev",
          label: "Unlimited Revisions (90 days)",
          price: 600,
        },
      ],
    },

    // OPTION 3: Delivery Speed (Radio button)
    {
      id: "delivery-speed",
      name: "Delivery Timeline",
      type: "radio",
      required: true,
      default: "standard-delivery",
      choices: [
        {
          id: "standard-delivery",
          label: "Standard (3-4 weeks)",
          price: 0,
        },
        {
          id: "express-delivery",
          label: "Express (2 weeks)",
          price: 400,
        },
        {
          id: "rush-delivery",
          label: "Rush (1 week)",
          price: 800,
        },
      ],
    },

    // OPTION 4: Additional Services (Checkboxes - select MULTIPLE)
    {
      id: "add_ons",
      name: "Additional Services",
      type: "checkbox",                                // Allow multiple selections
      required: false,                                 // Optional - user doesn't have to select
      choices: [
        {
          id: "favicon",
          label: "Favicon & App Icon Design",
          price: 150,                                  // Each add-on has its own price
        },
        {
          id: "patterns",
          label: "Custom Pattern & Texture Library",
          price: 200,
        },
        {
          id: "animation",
          label: "Logo Animation (Lottie)",
          price: 300,
        },
        {
          id: "merch",
          label: "Merchandise Template Designs",
          price: 250,
        },
        {
          id: "video",
          label: "Animated Brand Video (30 sec)",
          price: 500,
        },
      ],
    },

    // OPTION 5: Optional Quality Upgrade
    {
      id: "quality-upgrade",
      name: "Quality & Format Options",
      type: "radio",
      required: false,                                 // Don't force selection
      default: null,                                   // No default selected
      choices: [
        {
          id: "standard-quality",
          label: "Standard (RGB, 72 DPI)",
          price: 0,
        },
        {
          id: "print-quality",
          label: "Print-Ready (CMYK, 300 DPI)",
          price: 200,
        },
        {
          id: "all-formats",
          label: "All Formats + Vector Masters",
          price: 400,
        },
      ],
    },
  ],
};

// ============================================
// PRICING EXAMPLE:
// ============================================
// Base Price:                          $1,999
// + Premium Tier:                      + $500
// + 5 Revision Rounds:                 + $300
// + Express Delivery:                  + $400
// + Favicon Icon Design:               + $150
// + Logo Animation:                    + $300
// + Print-Ready Quality:               + $200
// ─────────────────────────────────────────
// Subtotal:                            $3,849
// + Tax (10%):                         + $384.90
// ═════════════════════════════════════════
// TOTAL:                               $4,233.90

// ============================================
// KEY DESIGN PATTERNS:
// ============================================

// Pattern 1: SERVICE TIERS (usually required)
// Use radio buttons to offer different quality/scope levels
// Prices should increase with tier level
// Example: Basic, Standard, Premium, Enterprise

// Pattern 2: DELIVERY SPEEDS (usually required)
// Use radio buttons for delivery timeline options
// Prices increase for faster delivery
// Example: Standard, Express, Rush, Overnight

// Pattern 3: ADD-ONS (usually optional checkboxes)
// Let users select multiple features independently
// Each add-on has its own price
// Example: Captions, Voiceover, Premium Music, Animation

// Pattern 4: REVISION PACKAGES (usually required)
// Radio buttons for revision limits
// Prices increase with more revision rounds
// Example: 2 rounds, 5 rounds, Unlimited

// ============================================
// TIPS FOR YOUR SERVICES:
// ============================================

// ✓ Always have at least 2 required options
// ✓ At least one radio option should have price: 0 (default)
// ✓ Add-ons should be checkboxes (optional)
// ✓ Price options from low to high
// ✓ Use clear, benefit-focused labels
// ✓ Include quantity/quantity info in label
// ✓ Emoji in title helps brand recognition
// ✓ Features list should be 3-5 items
// ✓ Details should be 1-2 sentences

// ============================================
// COMMON MISTAKES TO AVOID:
// ============================================

// ❌ Wrong: All prices are 0 (nothing changes)
// ✓ Right: At least some options have different prices

// ❌ Wrong: type: "radio" with price: 0 on all choices
// ✓ Right: At least one choice per radio option is free

// ❌ Wrong: default: "non-existent-id" (doesn't match choice.id)
// ✓ Right: default: "standard" (matches one of the choice.id values)

// ❌ Wrong: Forgetting to import servicesData in ServicesPage
// ✓ Right: import { servicesData } from "../data/servicesData";

// ❌ Wrong: Setting required: true with no default value
// ✓ Right: If required, always provide a default

// ============================================
// TO USE THIS TEMPLATE:
// ============================================

// 1. Copy the entire serviceExample object
// 2. Go to src/data/servicesData.js
// 3. Add it to the servicesData array:
//    export const servicesData = [
//      { existing services... },
//      serviceExample,  // ← Add here
//    ];
// 4. Change the id, title, description, basePrice, etc.
// 5. Customize options for your service
// 6. Save and refresh browser
// 7. Click "Customize" on your new service card

// ============================================

export default serviceExample;
