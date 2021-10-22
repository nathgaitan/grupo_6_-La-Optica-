const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));
const {validationResult} = require('express-validator');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

module.exports = {
    register : (req,res) => {
        return res.render("users/register",{
            title : "register"})
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
        
        const {name,lastName,email,password} = req.body;
        db.User.create ({
            name : name.trim(),
            lastName : lastName.trim(),
            email : email.trim(),
            password : bcryptjs.hashSync(password.trim(), 10),
            rolId : 3,
            avatar : "avatar_default.png"
        })
           .then(user =>{       
        req.session.userLogin = {
            id : user.id,
            name : user.name,
            lastName : user.lastName,
            rolId : user.rolId,
            avatar : user.avatar
        }
        
       return res.redirect("/")
    })
    .catch(error => console.log(error))

    }else{
        return res.render("users/register", {
            title : "register",
            old: req.body,
            errors: errors.mapped(),

        })
    }

    },
    login : (req,res) => {
        return res.render("users/login",{
            title : "login"})
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {email,recordar} = req.body;
            db.User.findOne({
                where : {
                    email
                }
            })
                .then(user => {
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                lastName : user.lastName,
                avatar : user.avatar,
                rolId : user.rolId,
                email : user.email
                
            }

            if(recordar){
                res.cookie("optica",req.session.userLogin,{maxAge: 60000})
            }

            return res.redirect("/")
        })
        .catch(error => console.log(error))
                
        }else{
            return res.render("users/login",{
               title:"login",
               errors : errors.mapped()
            })
        }
    },
    profile : (req,res) => {
        db.User.findByPk
        (req.session.userLogin.id)
        .then(user =>{
            return res.render('users/profile',
            {
                title : "Perfil",
                user 
        })
        })
    },

    
    processProfile : (req,res) => {
        const errors = validationResult(req);

        if (req.fileValidationError) {
            let imagen = {
                param : 'imagen',
                msg: req.fileValidationError,
            }

            errors.errors.push(imagen)
        }


        if (errors.isEmpty()) {
            

            let user = db.User.findByPk(req.session.userLogin.id)
            
            const {name,lastName,email,password,rolId} = req.body;
            db.User.update(
              {  
                name : name.trim(),
                lastName : lastName.trim(),
                email : email,
                password : password ? bcryptjs.hashSync(password.trim(),10) : user.password,
                rolId : rolId,
                avatar : req.file ? req.file.filename : user.avatar
            },
            {
                where : {
                    id : +req.session.userLogin.id
                }
            }
            )

            .then(() => {
                delete req.session.userLogin
                delete req.locals.userLogin

                req.session.userLogin={
                    id : user.id,
                    name : user.name,
                    lastName : user.lastName,
                    rolId : user.rolId,
                    avatar : user.avatar
                }
                req.locals.userLogin = req.session.userLogin

                return res.render ("user/profile")
            })

            .catch(error => console.log(error))

            if (req.file) {
                if(fs.existsSync(path.join(__dirname,'..','..','public','images','usuarios',user.imagen))) {
                    fs.unlinkSync(path.join(__dirname,'..','..','public','images','usuarios',user.imagen))
                }
            }                


 



           /*let modificados = users.map(user => user.id === +req.params.id ? userModificado : user)*/

           /* fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(modificados,null,2),'utf-8');
            res.redirect('/users/profile')*/

        } else {
            db.User.findByPk
            (req.session.userLogin.id)
            .then(user =>{
                return res.render('users/profile',
                {
                    title : "Perfil",
                    user,
                    errors : errors.mapped(),
                    old : req.body
            })
            })              
        }
    },

        logout : (req,res) => {
            req.session.destroy();
            res.cookie('la optica palabra clave',null,{maxAge: -1})
            return res.redirect('/')
        }
    }
