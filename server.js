//enable both express and mongoose for use
const express = require('express');
const mongoose = require('mongoose');
//envoke express
const app = express();
//select port for use
const PORT = process.env.PORT || 3001;

const { User } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//startup mongoose virtual
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gatheristdb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//seeding
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

// app.post('/submit', ({ body }, res) => {
//   const user = new User(body);

//   User.create(user)
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get('/users', (req, res) => {
//   User.find({}).then(users => {
//     res.json(users);
//   });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
