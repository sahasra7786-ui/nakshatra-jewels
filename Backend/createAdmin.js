import bcrypt from 'bcrypt';
import db from './db.js';

async function createAdmin() {
  const username = 'admin';
  const password = 'nakshatra123';
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [username, hash]);
  console.log('Admin created! Username:', username, '| Password:', password);
  process.exit();
}

createAdmin();