
import foodModel from '../models/foodModel.js';
import fs from 'fs';

const addFood = async (req, res) => {
  const food = new foodModel({
    name: req.body.name,
    image: req.file.filename,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    await food.save();
    res
      .status(201)
      .json({ success: true, message: 'Food added successfully', data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const listFood = async (req, res) => {
  try {
    const allFoods = await foodModel.find();
    console.log(allFoods);
    res.status(200).json({ success: true, data: allFoods });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const delFood = async (req, res) => {
  const foodId = req.params.id;

  try {
    const food = await foodModel.findById(foodId);
    fs.unlink(`./uploads/${food.image}`, (err) => {
      if (err) console.log(err);
    });

    await foodModel.findByIdAndDelete(foodId);
    res
      .status(200)
      .json({ success: true, message: 'Food deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export { addFood, listFood, delFood };
