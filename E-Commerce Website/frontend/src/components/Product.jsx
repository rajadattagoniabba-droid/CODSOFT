import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="glass-panel product-card">
      <Link to={`/product/${product._id}`} className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <Link to={`/product/${product._id}`}>
        <div className="product-title">{product.name}</div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', color: 'var(--accent-color)', fontSize: '0.9rem' }}>
          {'★'.repeat(Math.floor(product.rating || 4))}
          {'☆'.repeat(5 - Math.floor(product.rating || 4))}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          ({product.numReviews} reviews)
        </span>
      </div>

      <div className="product-price">
        ₹{product.price.toFixed(2)}
      </div>

      <Link to={`/product/${product._id}`} className="btn btn-outline btn-block" style={{ marginTop: 'auto' }}>
        View Details
      </Link>
    </div>
  );
};

export default Product;
