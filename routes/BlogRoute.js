const express = require('express')
const router = express.Router()
const UserController = require('../Controller/Blog.js')
const Blog  = require('../models/blog')
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const storage = require('../config/multerConfig')
const multer = require('multer')

const upload = multer({storage : storage})

const isLoggedIn = function (req, res, next) {
   console.log("authenticate" , req.isAuthenticated())
   if (req.isAuthenticated()) {
     next()
    // res.redirect('/Profile')  
   } else {
    
   }
 }


router.get('/addBlog',(req,res)=>{
   res.render('createBlog', {
      message : req.flash('titleMessage'),
      layout: './Layout/FullWidthLayoutLight',
   })
})
router.post('/addBlog',  upload.single('image'),  UserController.addBLog);
router.patch('/updateBlog/:id', UserController.updateBlog);
router.delete('/deleteBlog/:id', UserController.deleteBlog);
router.get('/', isLoggedIn ,  UserController.readBlogs )
router.get('/blog/:id', UserController.readBlog );



module.exports = router;
