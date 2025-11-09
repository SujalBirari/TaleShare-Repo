const express = require('express')
const path = require('path')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors');

const dbConnect = require('./config/db');
const authRoutes = require('./routes/auth');
const taleRoutes = require('./routes/tales');

// Establish connection with the database
dbConnect();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Using Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/tales', taleRoutes);

// DEFINE ROUTES
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/editor', (req, res) => {
    res.render('tale-editor');
});

app.get('/register', (req, res) => {
    res.render('register'); // Renders views/register.ejs
});
app.get('/login', (req, res) => {
    res.render('login'); // Renders views/login.ejs
});
app.get('/my-tales', (req, res) => {
    res.render('my-tales'); // Renders views/my-tales.ejs
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});