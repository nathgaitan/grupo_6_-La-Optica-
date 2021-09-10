const express = require('express');
const router = express.Router();
const { register, login, processRegister, processLogin, profile, processProfile } = require ("../controllers/usersController");

/* middlewares requerir aquí abajo */
const avatarUserStorage =require('../middlewares/avatarUserStorage');

/* validations requerir aquí abajo */
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');

/* GET users listing. */
router.get("/register", register);
router.post("/register", processRegister);

router.get("/login", login);
router.post("/login", loginValidator, processLogin);

router.get("/profile", profile);
router.put("/profile",avatarUserStorage.single('avatar_user'), processProfile);



module.exports = router;
