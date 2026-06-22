import { comparePassword, hashPassword } from '../helpers/bcrypt.js';
import { generateToken } from '../helpers/jwt.js';
import { UserModel } from '../models/user.model.js';

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) return res.status(400).json({ ok: false, msg: 'El usuario ya existe' });
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });
    return res.status(201).json({
      ok: true,
      msg: 'Registro exitoso',
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ ok: false, msg: `error interno del servidor` });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ ok: false, msg: 'Credenciales invalidas' });
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    const token = generateToken({
      id: user._id,
      username: user.username,
    });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return res.status(200).json({ ok: true, msg: 'Login exitoso' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};

export const getProfileUser = async (req, res) => {
  try {
    const profile = await UserModel.findById(req.user.id);
    if (!profile) return res.status(401).json({ ok: false, msg: 'Usuario no autorizado' });
    return res.status(200).json({
      ok: true,
      msg: 'Perfil obtenido',
      user: {
        id: profile._id,
        username: profile.username,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};

export const logOutUser = async (req, res) => {
  try {
    res.clearCookie('token'); // Eliminar cookie del navegador
    return res.json({ message: 'Logout exitoso' });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
  }
};
