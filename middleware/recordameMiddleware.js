function recordameMiddleware(req, res, next){
    next()

    if (req.cookies.usuarioRecordado != undefined && req.session.usuario == undefined){
        req.session.userId = req.cookies.usuarioRecordado;
        req.session.loggedin = true;
    }
}

module.exports = recordameMiddleware;