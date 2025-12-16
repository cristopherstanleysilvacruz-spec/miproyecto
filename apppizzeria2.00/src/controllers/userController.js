const User = require("../models/User");
const { createUser, loginUser } = require("../services/userService");

/* =========================
   REGISTRO
========================= */
exports.register = async (req, res) => {
  try {
    const { nombreUsuario, dni, password, verificarPassword } = req.body;

    if (password !== verificarPassword) {
      return res.status(400).json({ error: "Contraseñas no coinciden" });
    }

    const existe = await User.findOne({ dni });
    if (existe) {
      return res.status(400).json({ error: "DNI ya registrado" });
    }

    const user = await createUser({ nombreUsuario, dni, password });
    res.status(201).json({ mensaje: "Usuario creado", user });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

/* =========================
   LOGIN
========================= */
exports.login = async (req, res) => {
  try {
    const { dni, password } = req.body;

    const user = await loginUser(dni, password);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        dni: user.dni,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
};

/* =========================
   LISTAR USUARIOS
========================= */
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

/* =========================
   ACTUALIZAR USUARIO
========================= */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const userUpdated = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!userUpdated) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario actualizado",
      usuario: userUpdated
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

/* =========================
   ELIMINAR USUARIO
========================= */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario eliminado correctamente",
      usuario: {
        id: userDeleted._id,
        nombreUsuario: userDeleted.nombreUsuario,
        dni: userDeleted.dni
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
