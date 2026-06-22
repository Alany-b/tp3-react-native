import { verifyToken } from '../helpers/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies['token'];
    if (!token) return res.status(401).json({ ok: false, msg: 'Usuario no autenticado' });
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};
