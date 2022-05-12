'use strict';
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,


    },
    auther: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT('long'),
    reading_time: DataTypes.STRING,
    image: DataTypes.STRING,
    tags : DataTypes.STRING,
  

    date: {
      type: DataTypes.DATE,
      defaultValue: Date.NOW
    }

    
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
  };
  return Blog;
};