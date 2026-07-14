import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Product from '../components/Product';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const { data: productData } = await axios.get(`/api/products/${id}`);
        setProduct(productData);
        
        // Fetch related products
        const { data: allProducts } = await axios.get(`/api/products`);
        const related = allProducts.filter(p => p._id !== id).slice(0, 4);
        setRelatedProducts(related);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, Number(qty));
    navigate('/cart');
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h3 className="text-danger">{error}</h3>;

  return (
    <>
      <Link className="btn mb-3" to="/">
        Go Back
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h3>
          <h4 style={{ color: 'var(--color-danger)', fontSize: '1.5rem', marginBottom: '1rem' }}>
            ₹{product.price}
          </h4>
          <p style={{ marginBottom: '1rem' }}>{product.description}</p>
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Status:</span>
              <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
            </div>

            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Qty:</span>
                <select value={qty} onChange={(e) => setQty(e.target.value)} style={{ padding: '0.2rem' }}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.countInStock > 0 && (
              <button onClick={addToCartHandler} className="btn btn-primary btn-block">Add To Cart</button>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>You might also like</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
