const express=require('express');
const User=require('../model/database');
const Note=require('../model/database2');
const passport=require('passport');
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.render('index');
});
router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.post('/signin',passport.authenticate('local-signin',{
	successRedirect: '/diario',
        failureRedirect: '/signin',
        failureFlash: true
}));
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.get('/diario',(req,res,next)=>{
	res.render('diario');
});
router.get('/notes',async(req,res,next)=>{
	const notes = await Note.find();
	res.render('notes',{
		notes
	});
});
router.get('/delete/:id',async(req,res,next)=>{
	let {id} = req.params;
	await Note.remove({_id: id});
	res.redirect('/notes');
});
router.get('/edit/:id',async(req,res,next)=>{
	const notes = await Note.findById(req.params.id);
	res.render('edit',{
		notes
	})
});
router.post('/edit/:id',async(req,res,next)=>{
	let {id} = req.params;
	await Note.update({_id: id},req.body);
	res.redirect('/notes');
});
router.get('/gusta/:id',async(req,res,next)=>{
	const note = await Note.findById(req.params.id);
	note.status = !note.status;
	await note.save();
	res.redirect('/notes');
});
router.post('/diario',async(req,res,next)=>{
	const note = new Note(req.body);
	await note.save();
	console.log(note);
	res.redirect('/diario');
});
router.post('/signup',passport.authenticate('local-signup',{
	successRedirect: '/diario',
	failureRedirect: '/signup',
	passReqToCallback: true
}));

module.exports=router;
