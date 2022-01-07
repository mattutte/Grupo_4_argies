function authMiddleware(req, res, next) {
    if (req.session.userId != undefined){
        next();
    } else{
        //res.render('unauthorized');
        next();
    }
}

module.exports = authMiddleware;