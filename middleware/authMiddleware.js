function authMiddleware(req, res, next) {
    if (req.session.loggedin != undefined){
        if(req.session.admin == 1){
            next();
        }else{
            res.render('unauthorized');
        }
    } else{
        res.render('unauthorized');
        //next();
    }
}

module.exports = authMiddleware;