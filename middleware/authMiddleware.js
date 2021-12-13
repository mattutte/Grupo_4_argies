function authMiddleware(req, res, next) {
    if (req.session.userId != undefined){
        next();
    } else{
        res.render('unauthorized');
    }
}

module.exports = authMiddleware;