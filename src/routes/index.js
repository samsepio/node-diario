const express=require('express');
const User=require('../model/database');
const Note=require('../model/database2');
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.render('index');
});
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
router.post('/diario',async(req,res,next)=>{
	const note = new Note(req.body);
	await note.save();
	console.log(note);
	res.redirect('/diario');
});
router.post('/signup',async(req,res,next)=>{
	const user = new User(req.body);
	await user.save();
	console.log(user);
	res.redirect('/diario');
});

module.exports=router;
