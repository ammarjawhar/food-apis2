import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists' });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please enter a valid email' });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'password must be at least 8 characters' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = createToken(newUser._id);
      res.status(201).json({ message: 'User created successfully', token });
    }
  } catch (err) {}
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: 'User logged in successfully', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export { register, login };
