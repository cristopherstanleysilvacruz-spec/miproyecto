const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* ======================
   LOGIN
====================== */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Correo y contraseña son obligatorios",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: "Usuario o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "clave_secreta",
      { expiresIn: "1h" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/* ======================
   ME (VALIDAR SESIÓN)
====================== */
const me = (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "clave_secreta"
    );

    res.status(200).json({
      success: true,
      id: decoded.id,
      role: decoded.role,
    });
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

/* ======================
   LOGOUT
====================== */
const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Sesión cerrada correctamente",
  });
};

module.exports = { login, logout, me };
