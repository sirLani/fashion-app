import User from '../models/user';
import { Request, Response } from 'express';
import isPasswordAllowed, { hashPassword } from '../helpers/auth';
// import { nanoid } from 'nanoid';

export const register = async (req: Request, res: Response) => {
   //   console.log("REGISTER ENDPOINT => ", req.body);

   const { name, email, password, secret } = req.body;
   // validation
   if (!name) {
      return res.status(400).json({
         error: 'Name is required'
      });
   }
   if (!isPasswordAllowed(password)) {
      return res.status(400).json({ message: `password is not strong enough` });
   }
   if (!password || password.length < 6) {
      return res.status(400).json({
         error: 'Password is required and should be min 6 characters long'
      });
   }
   if (!secret) {
      return res.status(400).json({
         error: 'Answer is required'
      });
   }
   const exist = await User.findOne({ email });
   if (exist) {
      return res.status(400).json({
         error: 'Email is taken'
      });
   }

   // hash password
   const hashedPassword = await hashPassword(password);

   const user = new User({
      name,
      email,
      password: hashedPassword,
      secret
      //   username: nanoid(6)
   });
   try {
      await user.save();
      console.log('REGISTERED USER => ', user);
      return res.json({
         ok: true,
         name,
         email
      });
   } catch (err) {
      console.log('REGISTER FAILED => ', err);
      return res.status(400).send('Error. Try again.');
   }
};
