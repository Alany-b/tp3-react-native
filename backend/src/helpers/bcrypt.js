import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 12;
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  return passwordHashed;
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
