require('dotenv').config()
const express = require('express')
const path = require('path')

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// DEFINE ROUTES
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/editor', (req, res) => {
    res.render('tale-editor');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});