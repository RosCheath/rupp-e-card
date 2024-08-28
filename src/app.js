const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes/route');

// Set Views and EJS as the templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));

// Define Routes
app.use('/', route);

// Custom 404 Page Handler
app.use((req, res, next) => {
  res.status(404).render('404', { message: 'Sorry, page not found' }); // Renders views/404.ejs
});

// Default Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong' }); // Renders views/error.ejs
});

// Listen on port 3000
const port = 3000;
app.listen(port, function () {
  console.log('Bubble node app running on port ' + port);
});
