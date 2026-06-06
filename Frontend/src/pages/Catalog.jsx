import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WA_NUMBER = '91XXXXXXXXXX';
const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bangles', 'Pendants'];
const BG = ['#FAF0DC','#FBF2E0','#F9EDD4','#FDF5E2','#FAF5E9'];
const ICONS = { Rings:'💍', Necklaces:'📿', Earrings:'✨', Bangles:'💛', Pendants:'🔱' };

function ProductCard({ product }) {
  const msg = encodeURIComponent('Hi! I want to order: ' + product.name + ' (Rs.' + product.price + ')');
  return (
    <div className="product-card">
      <div className="product-img" style={{ background: BG[product.id % BG.length] }}>
        {product.image_url ? <img src={product.image_url} alt={product.name} /> : <span>{ICONS[product.category] || '✨'}</span>}
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-weight">{product.weight || '1 gram'} · Gold plated</div>
        <div className="product-footer">
          <div className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</div>
          <a className="wa-btn" href={'https://wa.me/' + WA_NUMBER + '?text=' + msg} target="_blank" rel="noopener noreferrer">📱 Order</a>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true); setError(false);
    const url = activeCategory === 'All'
      ? import.meta.env.VITE_API_URL + '/api/products'
      : import.meta.env.VITE_API_URL + '/api/products?category=' + activeCategory;
    fetch(url).then(r => r.json()).then(data => { setProducts(data); setLoading(false); }).catch(() => { setError(true); setLoading(false); });
  }, [activeCategory]);

  return (
    <>
      <Navbar />
      <div className="catalog-header">
        <h1>Our <span>Collection</span></h1>
        <div className="filter-tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={'filter-tab ' + (activeCategory === cat ? 'active' : '')} onClick={() => cat === 'All' ? setSearchParams({}) : setSearchParams({ category: cat })}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="catalog-grid">
        {loading && <div className="loading-state">Loading collection…</div>}
        {error && <div className="loading-state" style={{color:'#c0392b'}}>Unable to load products. Please try again.</div>}
        {!loading && !error && products.length === 0 && <div className="loading-state">No products found.</div>}
        {!loading && !error && products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <Footer />
    </>
  );
}