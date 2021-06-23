//enable both express and mongoose for use
const express = require('express');
const mongoose = require('mongoose');
//envoke express
const app = express();
//select port for use
const PORT = process.env.PORT || 3001;

const { User, Thought } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'))
// app.use(express.urlencoded({ extended: true }));

//startup mongoose virtual
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gatheristdb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//seeding
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
