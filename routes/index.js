var express = require('express');
var router = express.Router();

var firebase = require('firebase');

//var config = require('../javascripts/include/config');
var config = {
    apiKey: "AIzaSyD7v_-dVadUGMCpXW1WvhG7inxn-RU52BY",
    authDomain: "ideabox-c28d8.firebaseapp.com",
    databaseURL: "https://ideabox-c28d8.firebaseio.com",
    projectId: "ideabox-c28d8",
    storageBucket: "ideabox-c28d8.appspot.com",
    messagingSenderId: "419342074689"
};
firebase.initializeApp(config);

var rootRef = firebase.database().ref();

/* OUT */
router.get('/', (req, res, next) => {
 
  res.render('splash', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

router.post('/login', (req, res) => {
	res.redirect('/dashboard');
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Express' });
});

router.post('/signup', (req, res) => {

	var firstname = req.body.first_name;
	var lastname = req.body.last_name;
	var email = req.body.email;
	var password = req.body.password;

	var userRef = rootRef.child('users').push({
		FirstName: firstname,
		LastName: lastname,
		Email: email,
		password: password,
		Time: "12:00"
	});

});

/* IN */
router.get('/dashboard', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.post('/dashboard', (req, res) => {

	var title = req.body.title;
	var description = req.body.description;

	var userRef = rootRef.child('ideas').push({
		Title: title,
		Description: description,
		Time: "12:00"
	});
	res.redirect('/dashboard');
});

router.get('/user/question', (req,res,next) => {
	res.render('idea', { title: 'Express' });
});

module.exports = router;