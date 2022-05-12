const Sequelize = require('sequelize');
const {sequelize} = require('../models')



  sequelize.authenticate()
  .then(() => {
      console.log("connected")
  })
  .catch(err =>{
      console.log("error"+err)
  });


    module.exports = sequelize;