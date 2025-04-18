const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = 8080;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public', {
  setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
      }
  }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.use(express.json()); 
// MongoDB Connection
mongoose.connect('mongodb+srv://varunbotcha:varun123@cluster0.afzwir6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    eventType: String,
  });
  
  const Registration = mongoose.model('Registration', registrationSchema);
// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', async (req, res) => {
  const { name, email, eventType } = req.body;
  try {
    await Registration.create({ name, email, eventType });
    res.send('Thank you for registering!');
  } catch (err) {
    res.status(500).send('Registration failed.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});