function recordameMiddleware(req, res, next){
    next()
    console.log("recordar usuario es: "+req.cookies.usuarioRecordado)
    if (req.cookies.usuarioRecordado != undefined && req.session.usuario == undefined){
        req.session.userId = req.cookies.usuarioRecordado;
        req.session.loggedin = true;
    }
}

module.exports = recordameMiddleware;