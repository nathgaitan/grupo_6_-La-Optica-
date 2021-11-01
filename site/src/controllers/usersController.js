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
            rolId : 1,
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
                param : 'avatar_user',
                msg: req.fileValidationError,
            }

            errors.errors.push(imagen)
        }

        if (errors.isEmpty()) {
            
             db.User.findByPk(req.session.userLogin.id)
            .then( user => {

                const {name,lastName,password} = req.body;

                if (req.file) {
                    if(fs.existsSync(path.join(__dirname,'..','..','public','images','usuarios',user.avatar))) {
                        fs.unlinkSync(path.join(__dirname,'..','..','public','images','usuarios',user.avatar))
                    }
                }

                db.User.update(
                  {  
                    name : name.trim(),
                    lastName : lastName.trim(),
                    email : user.email,
                    password : password ? bcryptjs.hashSync(password.trim(),10) : user.password,
                    rolId : user.rolId,
                    avatar : req.file ? req.file.filename : user.avatar
                },
                {
                    where : {
                        id : req.session.userLogin.id
                    }
                }
                )
                .then(() => {
                    db.User.findByPk(req.session.userLogin.id)
                    .then( user2 => {
                        req.session.userLogin2={
                            id : user2.id,
                            name : user2.name,
                            lastName : user2.lastName,
                            email : user2.email,
                            rolId : user2.rolId,
                            avatar : user2.avatar
                        }/* 
                        req.session.userLogin = req.session.userLogin2 */
                        /* req.locals.userLogin = req.session.userLogin  */
    
                        return res.redirect("/users/profile")

                    })
                })
                .catch(error => res.send(error))
            })
            .catch(error => res.send(error))

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
