import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [[admin]] = await pool.query('SELECT * FROM admins WHERE username=?', [username]);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

export default router;