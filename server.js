const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected Successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


// Routes
const insightRoutes = require('./routes/insightRoutes');
app.use('/insights', insightRoutes); 
app.get('/', async (req, res) => {
  try {
    console.log('Main root accessed.'); 
    res.status(200).send('Welcome to the main root!');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

