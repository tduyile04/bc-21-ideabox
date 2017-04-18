var express = require('express');
var router = express.Router();

/* OUT */
router.get('/', (req, res, next) => {
  res.render('splash', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Express' });
});

/* IN */
router.get('/dashboard', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

module.exports = router;
