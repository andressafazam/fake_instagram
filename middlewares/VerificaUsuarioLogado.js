const VerificaUsuarioLogado = (req,res,next) =>{
    //Se session do usuario nao estiver setada, redireciona para o login
    if(!req.session.usuario){
        res.redirect('/login?error=3');
    }

    //se chegou ate aqui, a session esta ok
    next();
}

module.exports= VerificaUsuarioLogado;