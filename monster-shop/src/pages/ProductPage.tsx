import { useParams } from 'react-router-dom';

function ProductPage() {
  const { productId } = useParams();
  return (
    <div>
      <h2>Product Detail Page</h2>
      <em>id: {productId}</em>
    </div>
  );
}

export default ProductPage;
