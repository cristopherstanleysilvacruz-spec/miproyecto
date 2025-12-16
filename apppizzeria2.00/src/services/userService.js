const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async ({ nombreUsuario, dni, password }) => {
  const hash = await bcrypt.hash(password, 10);
  return User.create({ nombreUsuario, dni, password: hash });
};

const loginUser = async (dni, password) => {
  const user = await User.findOne({ dni });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return user;
};

module.exports = { createUser, loginUser };
