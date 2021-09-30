const express = require('express');
const router = express.Router();
const { register, login, processRegister, processLogin, profile, processProfile } = require ("../controllers/usersController");

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

router.get("/profile", sessionUser, profile);
router.put("/profile",avatarUserStorage.single('avatar'), profileValidator, processProfile);

module.exports = router;
