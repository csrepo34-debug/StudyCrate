import { PRODUCTS } from '../../../lib/products';

export async function generateMetadata({ params }) {
  const product = PRODUCTS.find((p) => p._id === params.id);

  if (!product) {
    return {
      title: 'Product not found | StudyCrate',
      description: 'The requested StudyCrate product could not be found.'
    };
  }

  const title = `${product.title} | StudyCrate`;
  const description = `${product.description} Downloadable study kit for ${product.category.toLowerCase()}.`;

  return {
    title,
    description
  };
}

export default function ProductLayout({ children }) {
  return children;
}
