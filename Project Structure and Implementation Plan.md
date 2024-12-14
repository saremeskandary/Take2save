# Project Structure

## Core Components

```
/components
  /store
    StoreList.tsx         - Main list of stores (already implemented)
    StoreCard.tsx         - Individual store display
    RatingDisplay.tsx     - Reusable rating component
    AddressBar.tsx        - Location/address display
  /product
    ProductCard.tsx       - Surprise bag display
    QuantitySelector.tsx  - +/- buttons for quantity
    PriceDisplay.tsx      - Price with currency formatting
  /order
    DeliverySelector.tsx  - Pickup/delivery options
    PaymentSelector.tsx   - Payment method selection
    OrderSummary.tsx      - Order details review
  /common
    LoadingSpinner.tsx    - Loading states
    ErrorDisplay.tsx      - Error handling
    BackButton.tsx        - Navigation

## Pages Structure
```

/app
/page.tsx - Landing page (implemented)
/stores
/page.tsx - Store listing (implemented)
/[storeId]
/page.tsx - Store details
/order
/page.tsx - Order creation
/confirmation
/page.tsx - Order confirmation

## Contract Integration

```
/hooks
  /useProducts.ts        - Product contract interactions
  /useOrders.ts          - Order management
  /useScoring.ts         - Rating system
  /usePayments.ts        - Payment processing

## Implementation Priority

1. Core Flow (High Priority)
   - Store listing view ✅
   - Store detail view
   - Product selection
   - Basic order flow

2. Contract Integration (Medium Priority)
   - Product contract integration
   - Basic payment flow
   - Order processing

3. Additional Features (Lower Priority)
   - Rating system
   - Delivery options
   - Advanced payment methods

## Design Guidelines

1. Mobile-First Approach
   - Use full-width containers on mobile
   - Bottom navigation bar
   - Large, touch-friendly buttons

2. DaisyUI Theme
   - Primary color: Orange (#FF4D00)
   - Secondary accents
   - Consistent spacing
   - Card-based layouts

3. User Experience
   - Clear loading states
   - Error handling
   - Smooth transitions
   - Intuitive navigation
```
