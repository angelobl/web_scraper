const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan')
//Initializations
const app = express();
//Settings
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir:path.join(app.get('views'),'layouts'),
  partialsDir:path.join(app.get('views'),'partials'),
  extname:'.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Global Variables

//Routes
app.use('/scraper',require('./routes/rutas'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});