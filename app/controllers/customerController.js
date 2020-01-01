const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const Category = require('../models/categoryModel');
const jsonData = require('../utils/json_reader');

exports.indexAction = (req, res, next) => {
    const promise = jsonData.jsonReader('./data/index_carousel.json');

    const fetchProductDetails = () => {
        return new Promise((resolve, reject) => {
            resolve((Product.fetchAllProductForIndex()));
        });
    };

    promise.then((value) => {
        fetchProductDetails().then((result) => {
            console.log(result)
            res.render('customer_views/index', {
                pageTitle: "Home",
                path: '/',
                meta: value,
                productDetails: result            })
        });

    });
};

exports.track_orderAction = (req, res, next) =>{
    res.render ('customer_views/track_order',{
        pageTitle: "Track Order",
        path: "/",
        isAuthenticated: req.session.isLoggedIn
    })
};
exports.checkoutAction = (req, res, next) => {
    res.render('customer_views/checkout', {
        pageTitle: "Checkout",
        path: "/"
    })
};

/**
 * cart information is loaded to the cart page 
 * the product model is accessed 
 */

exports.cartAction = (req, res, next) => {

    // change once sessions are done----------------------------------
    var cartItems = [
        { prod_id: 15731, var_id: 66376, quantity: 3 }, 
        { prod_id: 16113, var_id: 38282, quantity: 4 },
    ]
    // var json_str = JSON.stringify(cartItems);
    // res.setHeader('set-Cookie',"cartCookie =",jsonData)
    res.cookie("cartCookie",cartItems)
    req.session.cartItems = [
        { prod_id: 15731, var_id: 66376, quantity: 3 }, 
        { prod_id: 16113, var_id: 38282, quantity: 4 },
    ]
    // console.log(req.cookies)
    //-----------------------------------------------------------------
    
    const fetchProducts = new Promise((resolve, reject) => {
        const custId = 13550
        if (req.session.isLoggedIn) {
            resolve((Product.getProductsFromTheCart(custId)))
        }
        else {
            resolve(Product.getProductsFromTheCartCookie(req.session.cartItems))
        }
    })


    fetchProducts
        .then((result) => {
            // console.log(result)
            res.render('customer_views/cart', {
                pageTitle: "Cart",
                path: "/cart",
                isAuthenticated: req.session.isLoggedIn,
                data: result
            })
        }).catch(err => console.error(err))
};

exports.addToCart2 = (req, res, next) => {
    console.log(req.body);
    var product_id = req.body.data[0]
    var varient_id = req.body.data[1]
    // var price = req.body.price
    // console.log(req)
    console.log(product_id,varient_id)

    if (req.session.isLoggedIn) {
        console.log(req.session.prevInputs.username,product_id,varient_id,req.params.price)
        Product.addProductToCart(req.session.prevInputs.username,product_id,varient_id,req.params.price)
    }
    // res.render('index', {
    //     pageTitle: 'Shop',
    //     path: '/',
    //     activeShop: true,
    //     productCSS: true
    // });
};

exports.order_detailsActionPost = (req, res, next) => {
    var order_id = req.body.order_id;
    console.log(order_id);
    const fetchOrderDetails = () => {
        return new Promise((resolve, reject) => {
            resolve((Order.findOrderDetailsByOrderID(order_id)));
        });
    };
    const fetchOrderItems = () => {
        return new Promise((resolve, reject) => {
            resolve((Order.findOrderItemsByOrderID(order_id)));
        });
    };
    fetchOrderDetails().then((result) => {
        console.log(result[0]);
        fetchOrderItems().then((resu) => {
            console.log(resu);
            res.render('customer_views/track_order_details', {
                pageTitle: "Order Details",
                path: "/",
                order_details: result[0],
                order_items: resu,
                isAuthenticated: req.session.isLoggedIn
            })
        }).catch(err => console.error(err));
    }).catch(err => console.error(err))
};

