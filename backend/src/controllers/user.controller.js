import { UserModel } from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password');
    if (users.length === 0) return res.status(200).json({ ok: true, msg: 'Aun no hay usuarios' });
    return res.status(200).json({ ok: true, msg: 'Usuarios encontrados', Users: users });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};
