function recordameMiddleware(req, res, next){
    next()

    if (req.cookies.usuarioRecordado != undefined && req.session.usuario == undefined){
        req.session.usuario = req.cookies.usuarioRecordado;
    }
}

module.exports = recordameMiddleware;