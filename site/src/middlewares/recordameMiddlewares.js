function recordameMiddleware(req,res,netx){
    netx();

    if(req.cookies.recordar != undefined && req.session.userLogin === undefined){
        
    }
}

module.exports = recordameMiddleware