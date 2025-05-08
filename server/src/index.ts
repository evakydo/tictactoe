import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const gameRoutes = require('../routes/gameRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
});

app.listen(4000, () => {
  console.log('Server is running');
});

app.use('/api', gameRoutes);

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rankLeaderboard';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB ' + uri))
  .catch(err => console.error('MongoDB connection error:', err));
