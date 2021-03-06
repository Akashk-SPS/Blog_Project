const db = require('../models/index')
const passport  =require('passport')
const LocalStrategy =  require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = db.User


module.exports = function () {
    //invoke((passport, LocalStrategy, User, bcrypt) => {
      passport.use(
        new LocalStrategy(
          { usernameField: 'email' },
          
          async (email, password, done) => {
            console.log(email,password);
            try {
              const user = await User.findOne({ where: { email: email } })
              if (!user)
                return done(null, false, {
                  message: 'Email or Password is Incorrect',
                })
  
              const isPasswordMatched = await bcrypt.compare(
                password,
                user.password
              )
  
              if (!isPasswordMatched)
                return done(null, false, {
                  message: 'Email or Password is Incorrect',
                })
  
              return done(null, user)
            } catch (err) {
              return done(err)
            }
          }
        )
      )
  
      passport.serializeUser(function (user, done) {
        done(null, user.id)
      })
  
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findOne({ where: { id: id } })
          if (user) return done(null, user)
        } catch (err) {
          return done(err)
        }
      })
   // })
  }

