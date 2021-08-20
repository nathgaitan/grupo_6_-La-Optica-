module.exports = {
    register : (req,res) => {
        return res.render("register",{
            title : "register"})
    },
    login : (req,res) => {
        return res.render("login",{
            title : "login"})
    }
}
