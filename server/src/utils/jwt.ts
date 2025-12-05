import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
// Helper to create JWT
function createToken(user: any) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export { createToken, verifyToken };