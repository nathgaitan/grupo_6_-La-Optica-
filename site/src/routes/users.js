const express = require('express');
const router = express.Router();
const { register, login, processRegister, processLogin, profile } = require ("../controllers/usersController");

/* middlewares requerir aquí abajo */
const avatarUserStorage =require('../middlewares/avatarUserStorage');

/* validations requerir aquí abajo */
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');

/* GET users listing. */
router.get("/register", register);
router.post("/register",registerValidator, processRegister);

router.get("/login", login);
router.post("/login", loginValidator, processLogin);

router.put("/profile", profile)



module.exports = router;
