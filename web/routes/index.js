var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME LEO DESIGN&FURNITURE', cssFile: 'home' });
});

router.get('/contacto', (req, res, next)=>{
  res.render('contact',{ title: 'CONTACT LEO DESIGN&FURNITURE', cssFile: 'contact' })
})

router.get('/about-us', (req, res, next) =>{
  res.send("ABout us")
})

module.exports = router;
