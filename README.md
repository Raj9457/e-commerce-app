# E Commerce App E-commerce Product Listing

A responsive React-based e-commerce product listing page that provides a seamless shopping experience with features like product filtering, sorting, pagination, and a mini cart.

![E Commerce App Screenshot](https://ibb.co/B24HCRKs)

## Features

- **Product Listing**: Grid view of products fetched from Fake Store API
- **Filtering**: Filter products by dcategory and price range
- **Sorting**: Sort products by price (low to high/high to low) and title (A-Z/Z-A)
- **Pagination**: Navigate through products with a clean pagination interface
- **Mini Cart**: Add products to cart with a sliding cart drawer showing order summary
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop

## Demo

Live demo: [E Commerece App](https://shiny-ganache-21cbe9.netlify.app/)

## Technologies Used

- React 18
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui components
- React Query for data fetching
- Fake Store API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Raj9457/e-commerce-app
   cd e-commerce-app
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration

This project uses the [Fake Store API](https://fakestoreapi.com/) for product data with the following endpoints:

- All Products: `https://fakestoreapi.com/products`
- Categories: `https://fakestoreapi.com/products/categories`
- Filter by category: `https://fakestoreapi.com/products/category/{category}`

## Project Structure

```
src/
├── components/        # UI components
│   ├── Cart.tsx       # Shopping cart component
│   ├── Filters.tsx    # Filtering options component
│   ├── Navbar.tsx     # Top navigation bar
│   ├── Pagination.tsx # Page navigation component
│   ├── ProductCard.tsx # Individual product display
│   ├── ProductGrid.tsx # Grid layout for products
│   └── ui/            # UI component library (shadcn/ui)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
│   ├── Index.tsx      # Home/product listing page
│   └── NotFound.tsx   # 404 page
├── services/          # API service layer
│   └── api.ts         # API client and type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Deployment

This project can be easily deployed to Netlify or Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Netlify/Vercel
3. Configure the build settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `dist`
4. Deploy!

## License

MIT

## Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
