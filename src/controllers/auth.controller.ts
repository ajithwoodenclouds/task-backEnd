import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import {protect} from "../middlewares/auth.middleware"

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
  
    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id),
      });
    } catch (error) {
      console.error(error); // log the error for debugging
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error); // log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find(); // fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};