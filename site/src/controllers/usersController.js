const users = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports = {
    register : (req,res) => {
        return res.render("users/register",{
            title : "register"})
    },
    processRegister : (req,res) => {
        const {name,apellido,email,password,imagen} = req.body;
        let user = {
            id : users[users.length -1] ?  users[users.length -1].id + 1 : 1,
            name : name.trim(),
            apellido : apellido.trim(),
            email : email.trim(),
            password : bcryptjs.hashSync(password, 10),
            rol : "user",
            imagen
        }
        users.push(user);

        fs.writeFileSync(path.join(__dirname,"..","data","users.json"),JSON.stringify(users,null,2),"utf-8");
        
        return res.redirect("/users/login")

    },
    login : (req,res) => {
        return res.render("users/login",{
            title : "login"})
    },
    processLogin : (req,res) => {
    },
    profile : (req,res) => {
        return res.render('users/profile', {
            title : "Perfil",
            user : users.find(user => user.id === +req.session.userLogin.id)
        })
    },
    processProfile : (req,res) => {
        const errors = validationResult(req);

        if (req.fileValidationError) {
            let image = {
                param : 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(image)
        }

        if (errors.isEmpty()) {

            let user = users.find(user => user.id === +req.session.userLogin.id)
        
            const { nombre, apellido, password } = req.body;

            if (req.file) {
                if(fs.existsSync(path.join(__dirname,'..','public','images','usuarios',userLogin.image))){
                    fs.unlinkSync(path.join(__dirname,'..','public','images','usuarios',userLogin.image))
                }
            }

            let userModificado = {
                nombre : nombre.trim(),
                apellido : apellido.trim(),
                email : user.email,
                password : req.password ? bcrypt.hashSync(password.trim(),10) : user.password,
                admin : +user.admin,
                imagen : req.file ? req.file.filename : user.imagen
            }

            let modificados = users.map(user => user.id === +req.params.id ? userModificado : user)

            fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(modificados,null,2),'utf-8');
            res.redirect('/users/profile')

        } else {
            return res.rendr('users/profile', {
                errores : errors.mapped(),
                old : req.body
            })
        }
    }
}
