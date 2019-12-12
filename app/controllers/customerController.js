const Product = require('../models/productModel');
const jsonData = require('../utils/json_reader');

exports.indexAction = (req, res, next) => {
    const promise = jsonData.jsonReader('./data/index_carousel.json');
    
    promise.then((value) =>{
        
        res.render('customer_views/index', {
            pageTitle: "Home",
            isAuthenticated: req.session.isLoggedIn, 
            path: '/',
            meta: value
        })
    });
};

exports.cartAction = (req, res, next) => {

};

exports.getRegisterAction = (req, res, next) => {
    
    res.render('customer_views/register',{
        pageTitle: 'Sign up',
        isAuthenticated: req.session.isLoggedIn,
        path: '/signup'
    });
    
}

exports.postRegisterAction = (req, res, next) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.password;
    const email = req.body.emial;
    const address = req.body.address;
    const telephoneNumber = req.body.telephoneNumber;

    
}

exports.getLoginAction = (req, res, next) => {
    res.render('customer_views/login',{
        path: '/login',
        isAuthenticated: req.session.isLoggedIn,
        pageTitle: 'Login'  
    });
}

exports.postLoginAction = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.postLogoutAction = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) console.error(err);
        res.redirect('/');
    });
}