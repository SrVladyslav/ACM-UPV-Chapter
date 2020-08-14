module.exports = {
    // Permit to proove if its logged in
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }else{
            return res.redirect('/signin')
        }
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }else{
            return res.redirect('/profile')
        }
    },

    // Permit to use only admin methods
    isNotAdmin(req, res, next) {
        if (req.user.username == 'vlady') {
            console.log("Es dios")
            return next()
        }else {
            console.log('UPS')
            return res.redirect('/profile')
        }
    }

    // 
}