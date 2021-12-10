function guestMiddleware(req, res, next) {
    if (req.session.usuario == undefined){
        next();
    } else{
         res.send("esta pagina es para que no están logueados");
    }
}

module.exports = guestMiddleware;