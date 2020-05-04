const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const AuthController = {
    
    showLogin: (req,res) => {
        //req.query.error
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: (req,res) => {
        console.log(req.session.usuario);
        res.render('index');
    },

    login: async (req,res) => {
        // lendo as info do body
        const { email, senha } = req.body;
        
        //tentar carregar um usuario
        const user = await Usuario.findOne({ where: { email } });
        //console.log(user);
        //res.send(user);
        
        //verificar se existe usuario com o email passado
        if(!user){
            res.redirect('login?error=1');
        }

        //validar a senha passada via post contra a guardada no banco
        if(!bcrypt.compareSync(senha, user.senha)){
            res.redirect('login?error=2');
        }

        // setar uma session com o usuario
        req.session.usuario = user;
        
        // redirecionar  o usuario para a rota '/home' 
        res.redirect('/home');
    }
}

module.exports = AuthController;