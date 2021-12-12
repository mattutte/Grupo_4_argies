function authMiddleware(req, res, next) {
    if (req.session.userId != undefined){
        next();
    } else{
        res.send("esta pagina es para usuarios. Tenés que loguearte");
    }
}

module.exports = authMiddleware;