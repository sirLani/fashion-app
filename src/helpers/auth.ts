import bcrypt from 'bcrypt';
import validate from 'deep-email-validator';
import { Response } from 'express';

export const hashPassword = (password: string) => {
   return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
         if (err) {
            reject(err);
         }
         bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
               reject(err);
            }
            resolve(hash);
         });
      });
   });
};

export const comparePassword = (password: string, hashed: string) => {
   return bcrypt.compare(password, hashed);
};

export default function isPasswordAllowed(password: string) {
   return (
      password.length > 6 &&
      // non-alphanumeric
      /\W/.test(password) &&
      // digit
      /\d/.test(password) &&
      // capital letter
      /[A-Z]/.test(password) &&
      // lowercase letter
      /[a-z]/.test(password)
   );
}

export const emailValidtion = async (email: string, res: Response) => {
   const { valid } = await validate(email);

   if (!valid) {
      return res.status(400).json({ message: `Please provide a valid email address.` });
   }
};
