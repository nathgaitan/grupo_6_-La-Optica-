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
    }
}
