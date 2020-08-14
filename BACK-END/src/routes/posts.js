const express = require('express')
const path = require('path')

const router = express.Router()
const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')
const fs = require('fs')

var multer = require('multer')
var upload = multer()
const expressFileUpload = require('express-fileupload')


// POST Routes
router.get('/add', isLoggedIn, (req, res) => {
    res.render('posts/add')
})

router.use(expressFileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024
    }
}))

// Form receiver 
router.post("/add", isLoggedIn, async (req, res, next) => {
    const { title, body } = req.body
    console.log(req.files)

    var file = req.body.target_file

    if(title.length > 0 & body.length > 0 & file.length > 0){
        // Uploading the image
        file.mv(__dirname + '/public/uploads/'+ file.name, async (err, result) => { 
            if(err){
                res.send({
                    message: 'Error!'
                })
            }else {
                var image = fs.readFileSync(__dirname + '/public/uploads/'+ file.name);
                
            }
        })
        
        // DB Object
        const new_post = {
            title,
            body,
            user_id: req.user.id,
            image_url: image
        }
        
        await pool.query('INSERT INTO posts set ?', [new_post])
        req.flash('success', 'Post was created successfully!')
        res.redirect('/posts')   
    }else {
        req.flash('message', 'Write on title and body!')
        res.redirect('/posts/add')
    }
})

// SHOW POSTS
router.get('/', isLoggedIn, async (req, res) => {
    //var url = this.window.URL || this.window.webkitURL;
    //var url = 'http://localhost:3000/upload/'
    const posts = await pool.query('SELECT * FROM posts')
    for(let i = 0; i < posts.length; i++){
        const user = await pool.query('SELECT * FROM users WHERE id = ?', [posts[i].user_id]) 
        posts[i].by = user[0].username

        //posts[i].image_url = url.createObjectURL(posts[i].image);
    }
    res.render('posts/post_list', {posts: posts})
})

// DELETE POST
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params

    
    await pool.query('DELETE FROM posts WHERE ID = ?', [id])
    req.flash('success', 'Post was deleted successfully!')
    res.redirect('/posts')
})
// EDIT post
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const posts = await pool.query('SELECT * FROM posts WHERE id = ?', [id])
    res.render('posts/edit', {posts: posts[0]})
})

// UPDATE post
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    //New data
    const { title, body } = req.body
    const newPost = {
        title, 
        body
    }

    await pool.query('UPDATE posts SET ? WHERE id = ?', [newPost, id])
    req.flash('success', 'Post was edited successfully!')
    res.redirect('/posts')
})

/* posting image
router.post('/img', isLoggedIn, async (req, res, next) => {
    console.log(req.files.target_file)
    IMAGE_URL = 'uploads/' + req.files.target_file.name
    res.send(IMAGE_URL)
})*/

module.exports = router