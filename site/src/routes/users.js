const express = require('express');
const router = express.Router();
const { register, login, processRegister, processLogin, profile, processProfile, logout } = require ("../controllers/usersController");

/* middlewares requerir aquí abajo */
const avatarUserStorage =require('../middlewares/avatarUserStorage');
const sessionUser =require('../middlewares/sessionUser');

/* validations requerir aquí abajo */
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');

/* GET users listing. */
router.get("/register", register);
router.post("/register",registerValidator, processRegister);

router.get("/login", login);
router.post("/login", loginValidator, processLogin);

router.get("/profile", sessionUser, profileValidator, profile);
router.put("/profile",avatarUserStorage.single('avatar_user'), processProfile);

router.get("/logout",logout);


module.exports = router;
