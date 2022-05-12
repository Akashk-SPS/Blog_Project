const db = require('../connection/db')
const { Blog } = require('../models')
const bodyParser = require('body-parser');
const path = require('path')

//create Blog
var addBLog = async (req, res) => {
    console.log(req.body, "body");
    console.log(req.file, "file");

    try {
        let data = { auther: req.user.id, title: req.body.title, content: req.body.content, reading_time: req.body.reading_time, image: req.file.path, tags: req.body.Tags }

        let users = await Blog.findOne({
            where: {
                title: req.body.title,
            },
        })

        if (users) {
            //req.flash('titleMessage', 'User with this title already exist')       

            return res
                .status(400)
                .json({ error: 'User with this title already exist' })
        }


        const tags = req.body.Tags

        console.log(tags ,  "tags")

        const re = / /
         const tagname = tags.split(re)

         console.log(tagname , "tagname")




        created_blog = await Blog.create(data);
        res.status(200).json(created_blog);

    } catch (error) {
        console.log(error)
        return res.json(error.message)
    }


}

//Read all Blogs

var readBlogs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 2;

    const post = await Blog.findAndCountAll({

        limit: limit,
        offset: ((page * limit) - limit)
    })
    res.render('home', {
        content: post.rows,
        totalPages: Math.ceil(post.count / limit),
        currentPage: page,
        layout: './Layout/FullWidthLayoutLight',

    })
}

//Read One Blog

var readBlog = async (req, res) => {
    const post = await Blog.findByPk(req.params.id)
    console.log(post, "blogpost")
    res.render('blogDetails', {
        blogpost: post.dataValues,
        layout: './Layout/FullWidthLayout'
    })
}

// Update Blog
var updateBlog = async (req, res) => {

    let data = await Blog.update({ auther: req.body.auther, title: req.body.title, content: req.body.content, reading_time: req.body.reading_time }, {
        where: {
            id: req.params.id
        }
    })
}

//delete Blog
var deleteBlog = async (req, res) => {

    let data = await Blog.destroy({
        where: {
            id: req.params.id
        }
    })
}




module.exports = {
    addBLog,
    updateBlog,
    deleteBlog,
    readBlogs,
    readBlog

}