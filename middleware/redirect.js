let redirect = {
    login: (req, res, next) => {
        if(!req.session.loggedin){
            res.redirect('/login');
        } else {
            next();
        }
    },
    account: (req, res, next) => {
        if(!req.session.loggedin){
            next();
        } else {
            res.redirect('/account');
        }
    },
    register: (req, res, next) => {
        if(!req.session.loggedin){
            res.redirect('/signup');;
        } else {
            next();
        }
    },
}

module.exports = redirect;