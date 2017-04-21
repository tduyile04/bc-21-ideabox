var express = require('express');
var router = express.Router();
var markdown = require( "markdown" ).markdown;
var firebase = require('firebase');
var showdown  = require('showdown');
var converter = new showdown.Converter();

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
router.get('/', (req, res) => {

	res.render('splash', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Express' });
});

router.post('/login', (req, res) => {
	
	res.redirect('/dashboard');

	// var email = req.body.email;
	// var pass = req.body.password;
	// const auth = firebase.auth();

	// const promise = auth.signInWithEmailAndPassword(email, pass);

	// promise
	// .then(function(user) {
	// 		auth.onAuthStateChanged(function(user) {
		//     	if (user != null) {
		// 			console.log('Success');
		// 			res.redirect('/dashboard');
		// 		} else {
		// 			console.log('Failed');
		// 			res.redirect('/login');
		// 		}

	// 		});
 	// });

    

	// promise
	// .catch(function(e) {
	// 	console.log(e.message);
 //      	//res.status(500).send({message: 'Login Failed'});
 //      	res.redirect('/login');
	// });
});

router.get('/signup', (req, res) => {
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

	// const auth = firebase.auth();

	// const promise = auth.createUserWithEmailAndPassword(email, pass);
	// promise
	// .then(function() {
	// 	res.redirect('/dashboard');
	// });
	// promise
	// .catch(function(e) {
	// 	console.log(e.message);
	// });
});

/* IN */
router.get('/dashboard', (req, res) => {
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

router.get('/user/question/:idea_title', (req,res,next) => {
	var title = req.params.idea_title;
	console.log(title);

	var description;

	var titleRef = rootRef.child('ideas');
	titleRef.orderByChild('Title')
		.equalTo(title)
		.limitToFirst(1)
		.on('value', function(snap) {
			data = snap.val();
			console.log(data);

			var keys = Object.keys(data);
			var key = keys[0];

			title = data[key].Title;
			//description = markdown.toHTML(data[key].Description);
			description = converter.makeHtml(data[key].Description);

			res.render('idea', { Title: title, Description: description });
		});
});

module.exports = router;