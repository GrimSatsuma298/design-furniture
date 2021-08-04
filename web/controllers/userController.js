const controller = {
    login: (req, res)=>{
        res.render('login', {
            title: "LOGIN LEO DESIGN&FURNITURE",
            cssFile: "products"
        });
    },
    register: (req, res) =>{
        res.render('register', {
            title: "REGISTER LEO DESIGN&FURNITURE",
            cssFile: "products"
        });
    }
}


module.exports = controller;