module.exports = {
    register : (req,res) => {
        return res.render("users/register",{
            title : "register"})
    },
    login : (req,res) => {
        return res.render("users/login",{
            title : "login"})
    }
}
