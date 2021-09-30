const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports = {
    register : (req,res) => {
        return res.render("users/register",{
            title : "register"})
    },
    processRegister : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
        
        const {name,apellido,email,password} = req.body;
        let user = {
            id : users[users.length -1] ?  users[users.length -1].id + 1 : 1,
            name : name.trim(),
            apellido : apellido.trim(),
            email : email.trim(),
            password : bcryptjs.hashSync(password.trim(), 10),
            rol : "user",
            avatar : "avatar_default.png"
        }
        users.push(user);

        fs.writeFileSync(path.join(__dirname,"..","data","users.json"),JSON.stringify(users,null,2),"utf-8");

        req.session.userLogin = {
            id : user.id,
            name : user.name,
            apellido : user.apellido,
            rol : user.rol,
            avatar : user.avatar
        }
        
        res.redirect("/")
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
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email.trim());
            
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                email : user.email,
                avatar : user.avatar,
                rol : user.rol
            }

            

            res.redirect("/")
        }else{
            return res.render("users/login",{
               title:"login",
               errors : errors.mapped()
            })
        }
    },
    profile : (req,res) => {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));

        return res.render('users/profile', {
            title : "Perfil",
            user : users.find(user => user.id === +req.session.userLogin.id)
        })
    },
    processProfile : (req,res) => {
        const errors = validationResult(req);

        if (req.fileValidationError) {
            let avatar = {
                param : 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(avatar)
        }

        if (errors.isEmpty()) {

            let user = users.find(user => user.id === +req.session.userLogin.id)
        
            const { nombre, apellido, password } = req.body;

            if (req.file) {
                if (!user.avatar.includes('default')){
                    if(fs.existsSync(path.join(__dirname,'..','..','public','images','usuarios',user.avatar))) {
                        fs.unlinkSync(path.join(__dirname,'..','..','public','images','usuarios',user.avatar))
                    }
                }
            }

            let userModificado = {
                id : user.id,
                name : nombre.trim(),
                apellido : apellido.trim(),
                email : user.email,
                password : req.password ? bcryptjs.hashSync(password.trim(),10) : user.password,
                rol : user.rol,
                avatar : req.file ? req.file.filename : user.avatar
            }

            let modificados = users.map(user => user.id === +req.session.userLogin.id ? userModificado : user)

            fs.writeFileSync(path.join(__dirname,'..','data','users.json'),JSON.stringify(modificados,null,2),'utf-8');
            res.redirect('/users/profile')

        } else {
            let user = users.find(user => user.id === +req.session.userLogin.id)
            return res.render('users/profile', {
                title : "Perfil",
                user,
                errores : errors.mapped(),
                old : req.body
            })
        }
    
    }
}
