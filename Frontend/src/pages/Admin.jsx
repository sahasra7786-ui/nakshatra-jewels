import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const API = import.meta.env.VITE_API_URL;
const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Pendants'];
const EMPTY_FORM = { name: '', category: 'Rings', weight: '1g', price: '', image_url: '', description: '', is_featured: false };

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(API + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid credentials');
      localStorage.setItem('nj_token', data.token);
      onLogin(data.token);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">Nakshatra <span>Admin</span></div>
        <div className="login-sub">Admin Panel</div>
        {error && <div className="login-error">{error}</div>}
        <div className="form-group"><label>Username</label><input value={form.username} onChange={e => setForm({...form, username: e.target.value})} /></div>
        <div className="form-group"><label>Password</label><input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} onKeyDown={e => e.key === 'Enter' && submit()} /></div>
        <button className="btn-primary" style={{width:'100%', padding:'13px'}} onClick={submit} disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
      </div>
    </div>
  );
}

function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const token = localStorage.getItem('nj_token');
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? API + '/api/products/' + form.id : API + '/api/products';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(form) });
    setSaving(false);
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{form.id ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="form-group"><label>Product Name</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
        <div className="form-row">
          <div className="form-group"><label>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Weight</label><input value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="1g" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Price (Rs.)</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
          <div className="form-group"><label>Featured</label>
            <select value={form.is_featured ? 'yes' : 'no'} onChange={e => setForm({...form, is_featured: e.target.value === 'yes'})}>
              <option value="no">No</option><option value="yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="form-group"><label>Image URL</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="https://..." /></div>
        <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div className="modal-actions">
          <button className="action-btn" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Product'}</button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('nj_token'));
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(null); // null | 'add' | product object

  const load = () => {
    fetch(API + '/api/products', { headers: { Authorization: 'Bearer ' + token } })
      .then(r => r.json()).then(setProducts).catch(() => {});
  };

  useEffect(() => { if (token) load(); }, [token]);

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetch(API + '/api/products/' + id, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
    load();
  };

  const logout = () => { localStorage.removeItem('nj_token'); setToken(null); };

  if (!token) return <Login onLogin={setToken} />;

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <span className="admin-sidebar-logo">Nakshatra <span>Admin</span></span>
        <button className="admin-nav-item active">Products</button>
        <button className="admin-nav-item" onClick={logout} style={{marginTop:'auto', color:'rgba(255,255,255,0.3)'}}>Logout</button>
      </div>
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Products</h1>
          <button className="btn-primary" onClick={() => setModal('add')}>+ Add Product</button>
        </div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Weight</th><th>Price</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.weight}</td>
                <td>₹{Number(p.price).toLocaleString('en-IN')}</td>
                <td><span className={'badge ' + (p.is_featured ? 'badge-featured' : 'badge-normal')}>{p.is_featured ? 'Featured' : 'Normal'}</span></td>
                <td>
                  <button className="action-btn" onClick={() => setModal(p)}>Edit</button>
                  <button className="action-btn delete" onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <ProductModal product={modal === 'add' ? null : modal} onSave={() => { load(); setModal(null); }} onClose={() => setModal(null)} />}
    </div>
  );
}