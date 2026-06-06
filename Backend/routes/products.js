import { Router } from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// Public: get all products (with optional category filter)
router.get('/', async (req, res) => {
  const { category, featured } = req.query;
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  if (category) { sql += ' AND category = ?'; params.push(category); }
  if (featured)  { sql += ' AND is_featured = 1'; }
  sql += ' ORDER BY created_at DESC';
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

// Admin: add product
router.post('/', verifyToken, async (req, res) => {
  const { name, category, weight, price, image_url, description, is_featured } = req.body;
  const [result] = await pool.query(
    'INSERT INTO products (name,category,weight,price,image_url,description,is_featured) VALUES (?,?,?,?,?,?,?)',
    [name, category, weight, price, image_url, description, is_featured || false]
  );
  res.json({ id: result.insertId });
});

// Admin: update product
router.put('/:id', verifyToken, async (req, res) => {
  const { name, category, weight, price, image_url, description, is_featured } = req.body;
  await pool.query(
    'UPDATE products SET name=?,category=?,weight=?,price=?,image_url=?,description=?,is_featured=? WHERE id=?',
    [name, category, weight, price, image_url, description, is_featured, req.params.id]
  );
  res.json({ success: true });
});

// Admin: delete product
router.delete('/:id', verifyToken, async (req, res) => {
  await pool.query('DELETE FROM products WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

export default router;