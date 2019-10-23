const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User=require('../model/database');

passport.serializeUser((user, done) => {
	done(null,user.id);
});

passport.deserializeUser(async(id, done) => {
	const user = await User.findById(id);
	done(null,user);
});

passport.use('local-signup', new LocalStrategy ({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},async(req,email,password,done) => {
	const user = await User.findOne({'email': email});
	if(user){
		done(null,false,req.flash('signupMessage','El Correo Ya A Sido Tomado'));
	}else{
		const newUser = new User();
        	newUser.email = email;
        	newUser.password = newUser.encryptPassword(password);
        	await newUser.save();
        	done(null,newUser);
	};
}));
passport.use('local-signin', new LocalStrategy ({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},async(req,email,password,done)=>{
	const user = await User.findOne({email: email});
	if(!user){
		return done(null,false,req.flash('signinMessage','el correo no es valido'));
	}
	//si user.comparepasswor no coincide con la contraseña dada mandame un mensaje
	if(!user.comparePassword(password)){
		return done(null,false,req.flash('signinMessage','contraseña Incorrecta'));
	}
	return done(null,user);
}));
