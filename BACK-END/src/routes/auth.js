const express = require('express')
const router = express.Router()
const passport = require('passport')
const pool = require('../database')
const helpers = require('../lib/helpers') // Possibly wrong
const { isLoggedIn, isNotAdmin, isNotLoggedIn } = require('../lib/auth')


// Main route
router.get('/signup', isLoggedIn,(req, res) => { //isNotAdmin
    res.render('auth/signup')
})

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})

// Create an Admin Account
router.post('/signup', isLoggedIn, passport.authenticate('local.signup', { //isNotAdmin
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

router.get('/profile', isLoggedIn, async (req, res) => {
    const posts = await pool.query('SELECT * FROM posts WHERE user_id = ?', [req.user.id])
    res.render('profile', {posts: posts})
})

// Update profile
router.get('/profile/edit/:id', isLoggedIn, async (req, res) => {
    const user = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id])
    res.render('edit', {user: user[0]})
})

router.post('/profile/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    // New data
    const { name, email, password, password_r, img_profile } = req.body
    if( password == password_r){
        const newUser = {
            id, 
            password,
            email, 
            name
        }

        if(password.length > 0) {
            newUser.password = await helpers.encryptPassword(password)
        }else {
            newUser.password = req.user.password
        }
        
        await pool.query('UPDATE users SET ? WHERE id = ?', [newUser, id])
        req.flash('success', 'Your profile was edited successfully!')
        res.redirect('/profile')

    }else{
        req.flash('message', 'Password missmatch...')
        res.redirect('/profile/edit/:id')
    }
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/signin')
})
module.exports = router