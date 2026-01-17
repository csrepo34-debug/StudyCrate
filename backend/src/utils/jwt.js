import jwt from 'jsonwebtoken';

export const signToken = (userId) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};
