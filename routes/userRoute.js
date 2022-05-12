const express = require('express')
const router = express.Router()
const passport = require('passport')
//const flash = require('connect-flash')
const UserController = require('../Controller/User')


const isLoggedIn = function (req, res, next) {
  console.log("authenticate" , req.isAuthenticated())
  if (req.isAuthenticated()) {
    next()
   // res.redirect('/Profile')  
  } else {
   
  }
}

const isAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/user/login')
  }
}


router.get('/login',  (req, res) => {
  res.render('login',
   { title: 'login',
   layout: './Layout/FullWidthLayout' },
   )
})

// router.get('/', (req,res) =>{
//   res.render('home', { title: 'home' })
//   })

  router.post('/login', (req, res, next) => {
    passport.authenticate(
      'local',
      { failureFlash: true },
      function (error, user, info) {
        if (error) {
          console.log(error , "error")

          return res.status(500).json(error)
        }
        if (!user) {
          return res.status(400).json(info.message)
        } else {
          req.login(user, function (err) {
            console.log(err , "error")
            if (err) {
              return res.status(500).json(err)
            }
          })
        }
        res.json(user)
      }
    )(req, res, next)
  })



  router.get('/registration', (req, res) => {
    res.render('registration', {
      title: 'registration',
      message : req.flash('errorMessage'),

      layout: './Layout/RegistrationLayout'
    })
  })

  router.post('/registration',  UserController.adduser)

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('http://localhost:8000/login')
  })

  router.get('/Profile' , isLoggedIn , UserController.ProfileData)
  router.post('/profile',UserController.updateUser)

  router.get('/verifyEmail', (req, res) => {
    res.render('verifyEmail', {
      title: 'verifyEmail',
      layout: './Layout/FullWidthLayout',
    })
  })

  //router.post('/verifyEmail', UserController.verifyUser)
  
  router.get('/forgotPassword', UserController.handleForgotPassword)
  
  router.get('/resetPassword', (req, res) => {
    res.render('ResetPassword', { title: 'reset password' , layout: './Layout/FullWidthLayout' })
  })

  router.post('/resetPassword', UserController.handleResetPassword)


  module.exports = router;