import User from '../models/user';
import { NextFunction, Request, Response } from 'express';
import isPasswordAllowed, { hashPassword, comparePassword } from '../helpers/auth';
import Jwt from 'jsonwebtoken';
import { env } from '../config/config';
import { IGetUserAuthInfoRequest } from '../types';

export const register = async (req: Request, res: Response) => {
   console.log('REGISTER ENDPOINT => ', req.body);

   const { name, email, password, secret } = req.body;
   // validation
   if (!name) {
      return res.status(400).json({
         error: 'Name is required'
      });
   }
   if (!isPasswordAllowed(password)) {
      return res.status(400).json({ error: `password is not strong enough, it has to contain a capital letter, small letter and non-alphanumeric` });
   }

   if (!secret) {
      return res.status(400).json({
         error: 'Secret answer is required'
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

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   if (!email) {
      return res.status(400).json({ message: `email has to be filled` });
   }
   if (!password) {
      return res.status(400).json({ message: `password can't be blank` });
   }
   try {
      const { email, password } = req.body;
      // check if our db has user with that email
      const user = await User.findOne({ email }).exec();
      if (!user) {
         return res.json({
            error: 'No user found'
         });
      }

      // check password
      const match = await comparePassword(password, user.password);
      if (!match) {
         return res.status(400).json({
            error: 'Wrong password'
         });
      }

      // create signed token
      if (!env.JWT_SECRET) {
         throw new Error('JWT_KEY must be defined');
      }
      const token = Jwt.sign({ _id: user._id }, env.JWT_SECRET, {
         expiresIn: '7d'
      });
      user.password = undefined;
      user.secret = undefined;
      res.json({
         token,
         user
      });
   } catch (err) {
      console.log(err);
      return res.status(400).send('Error. Try again.');
   }
};

export const currentUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
   // console.log(req.auth);
   try {
      const user = await User.findById(req.auth._id);
      // res.json(user);
      res.json({ ok: true });
   } catch (err) {
      console.log(err);
      res.sendStatus(400);
   }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
   console.log(req.body);
   const { email, newPassword, secret } = req.body;
   // validation
   if (!isPasswordAllowed(newPassword)) {
      return res.status(400).json({
         error: 'New password is required and should contain a capital letter, small letter and non-alphanumeric'
      });
   }
   if (!secret) {
      return res.status(400).json({
         error: 'Secret is required'
      });
   }
   let user = await User.findOne({ email, secret });
   // console.log("EXIST ----->", user);
   if (!user) {
      return res.status(400).json({
         error: 'this user exists We cant verify you with those details'
      });
   }
   // return res.status(400).send("We cant verify you with those details");

   try {
      const hashed = await hashPassword(newPassword);
      await User.findByIdAndUpdate(user._id, { password: hashed });
      return res.json({
         success: 'Congrats. Now you can login with your new password'
      });
   } catch (err) {
      console.log(err);
      return res.json({
         error: 'Something wrong. Try again.'
      });
   }
};
