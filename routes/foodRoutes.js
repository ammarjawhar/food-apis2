import express from 'express';
import { addFood, delFood, listFood  } from '../controllers/foodControllers.js';
import multer from 'multer';

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

foodRouter
  .post('/add', upload.single('image'), addFood)
  .get('/list', listFood)
  .delete('/:id', delFood);


export default foodRouter;
