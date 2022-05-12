const db = require('../models')
const bcrypt = require('bcrypt')
const User = db.User
const flash = require('connect-flash')
const JWT = require('jsonwebtoken')
const secret = 'd41d8cd98f00b204e9800998ecf8427e'
const CLIENT_URL = 'http://localhost:8000'
const  _ = require('lodash')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(
  'SG.vLTQ2KJbRvCg-46vOaZeEA.3Jf7G-Jx4NTiIgpE-HJya1eeCJNEJwvNLeCvvWRwWqg'
)
const utils = require('../utils/generalutils')

const validateUser = require('../models/validations/userValidation')
var adduser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    first_name: req.body.fname,
    last_name: req.body.lname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt)
  };

  const { error } = await validateUser(
    req.body
  )

  if (error) {
    req.flash('errorMessage', error?.details[0].message)
    return res.status(400).json({ error: error?.details[0].message })
  }



  let user = await User.findOne({
    where: {
      email: req.body.email,
    }
  })
  if (user) {
    req.flash('errorMessage', 'User with this email already exist')
    return res
      .status(400)
      .json({ error: 'User with this email already exist' })
    
  }

  created_user = await User.create(usr);
  res.status(200).json(created_user);

}








var handleForgotPassword = async (req, res) => {

  const { email } = req.body

  if (!email) {
    req.flash('message', 'email id required')
    return res.status(400).json({ error: 'email id required' })
  }

  let user = await User.findOne({
    where: {
      email: email,
    },
  })

  if (!user) {
    req.flash('message', "couldn't find your account")
    return res.status(400).json({ error: "couldn't find your account" })
  }
  const token = JWT.sign({ id: user.id }, secret, { expiresIn: '6h' })
  const msg = {
    to: user.email,
    from: 'rishabh_choudhary@softprodigy.com', // Use the email address or domain you verified above
    subject: 'Verification Email',
    html: `<p>Please click the link below to reset your password</p><br><a href="${CLIENT_URL}/resetPassword?token=${token}" target="_blank">${CLIENT_URL}/verifyAccount/token=${token}</a>`,
  }

  try {
    const result = await sgMail.send(msg)
    console.log(result, "sent result")
    res.status(200).json({message : "reset password link sent to email"})
  } catch (err) {
    console.log('send grid', err)
  }


}


const verifyToken = async function (token) {
  let decoded
  console.log(verifyToken , "verifytoken")
  try {
    decoded = JWT.verify(token, secret)
    console.log(decoded , "decodevarify")
    return decoded
  } catch (err) {
    console.log(err)
    throw err
  }
}



let handleResetPassword = async (req, res) => {
  let  password = req.body
  let token = req.query.token
  console.log(token , "token")

  let decoded

  //trying to verify even token is not expired and decode it
  try {
    decoded = await verifyToken(token)
    console.log(decoded , "decoded code")
    let user = await User.findOne({
      where: {
        id: decoded.id,
      },
    })
    
    if (!user) return res.status(400).json({ message: 'invalid id' })
    let password = await bcrypt.hash(req.body.password, 10)
    User.password = password
    //await User.save()
    let data = await User.update({ password: password }, {

      where: {
        id: decoded.id
      }
    })
    return res.status(200).json({ message: 'password reset successfull' })
  
  
  
  } catch (err) {
    console.log(err , "error")
    if (err.name == 'TokenExpiredError') {
      
         return res.status(400).json({ message: 'invalid token' })
      }

      
    }
  

  


  
}
//   Get Profile Data  //

let ProfileData = async (req, res) => {
  const email = req.user.email
  let user = await User.findOne({
    where: {
      email: email,
    },
  })

  res.render('Profile', {
    user: user,
    layout: './Layout/FullWidthLayoutLight',
    message: 'Success'

  })
}

//   Update Profile Data  //

var updateUser = async (req, res) => {
  const userId = req.user.id
  let data = await User.update({ first_name: req.body.first_name, last_name: req.body.last_name }, {

    where: {
      id: userId
    }
  })
  res.render('Profile', {
    user: data,
    layout: './Layout/FullWidthLayoutLight',


  })
}



module.exports = {
  adduser,
  ProfileData,
  updateUser,
  handleForgotPassword,
  handleResetPassword,
  //verifyUser
}