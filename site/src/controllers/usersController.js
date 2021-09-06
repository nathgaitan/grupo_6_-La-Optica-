const users = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {
    register : (req,res) => {
        return res.render("users/register",{
            title : "register"})
    },
    processregister : (req,res) => {

    },
    login : (req,res) => {
        return res.render("users/login",{
            title : "login"})
    },
    processLogin : (req,res) => {

    },
    profile : (req,res) => {

    }
}
