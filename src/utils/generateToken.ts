import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  // Ensure JWT_SECRET is set and is a valid string
  if (!secret) {
    throw new Error('JWT_SECRET is required');
  }

  // Generate the token
  return jwt.sign({ id }, secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'], // Type cast to SignOptions' expiresIn
  });
};
