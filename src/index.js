const express=require('express');
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose');
const engine=require('ejs');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const app=express();

mongoose.connect('mongodb+srv://walter:3219329910@database1-wegwd.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

require('./passport/local-auth');

app.set('puerto',process.env.PORT || 8000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
	secret: '%$#udshduchmysecrteysgdythebigban%&$',
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//con app.locals creamos una variable que es accesible en toda nuestra aplicacion
app.use((req,res,next) => {
	app.locals.signupMessage = req.flash('signupMessage');
	app.locals.signinMessage = req.flash('signinMessage');
	app.locals.user = req.user;
	next();
});

app.use(require('./routes'));

app.use(express.static(path.join(__dirname,'./public')));

app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutrandose en el puerto ${app.get('puerto')}`);
});

