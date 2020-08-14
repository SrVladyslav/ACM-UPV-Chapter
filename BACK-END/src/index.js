const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const { isLoggedIn } = require('./lib/auth')

const pool = require('./database')

//files
const expressFileUpload = require('express-fileupload')

const { database } = require('./keys')
const { strict } = require('assert')

// Initializations
const app = express()
require('./lib/passport')

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js'),
    insecureAuth : true
}))
app.set('view engine', '.hbs')


// Middlewares
// Uploading files
app.use(expressFileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024
    }
}))


//end upload
app.use(session({
    secret: 'sessionacm',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false})) // Only admits plain text, not images
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())




// Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    // User info
    app.locals.user = req.user

    next()
})

// Routes
app.use(require('./routes/index'))
app.use(require('./routes/auth'))

// Link to POST section
app.use('/posts', require('./routes/posts'))

// Public (all the code that the browser can use)
app.use(express.static(path.join(__dirname, 'public')))



// POSTS CREATE AND EDIT 
//upload
app.get('/create_post', isLoggedIn, async (req, res) => {
    res.render('./new_post')
})

app.post('/img', isLoggedIn, async (req, res, next) => {
    // checking req.files is empty or not
    //res.send('FUCK')
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.body)

    const file = req.files.target_file
    file.mv(__dirname + '/public/uploads/'+ file.name, async (err, result) => { 
        if(err){
            res.send({
                message: 'Error!'
            })
        }else {
            //var image = fs.readFileSync(__dirname + '/public/uploads/'+ file.name);
            //console.log(image)
            var title = req.body.title //"Tituli"
            var body = req.body.body //"bodyus"
            var url = '/uploads/'+ file.name
            var post_type = req.body.post_t

            if(title.length > 0 & body.length > 0 & url.length > 0){ 
                const new_post = {
                    title,
                    body,
                    user_id: req.user.id,
                    post_type,
                    image_url: url 
                }
                
                await pool.query('INSERT INTO posts set ?', [new_post])
                req.flash('success', 'Post was created successfully!')
                res.status(200)
                res.redirect('/posts')
            }else{
                req.flash('message', 'Write on title and body!')
                res.redirect('/create_post')
            } 
        }
    })
    //res.redirect('/posts') 
})




// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})
