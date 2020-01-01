const hashFunctions = require('../utils/hash_functions');
const db = require('../utils/database');

module.exports = class Customer {
    constructor(username, name, email, password) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static register(userInput) {
        return new Promise((resolve) => {
            resolve(db.execute("INSERT INTO customer (name, username, password, email, address) VALUES (?,?,?,?,?)",
                [userInput.name,
                userInput.username,
                hashFunctions.hash(userInput.password),
                userInput.email,
                userInput.address]))
        }).catch((err) => {
            console.log(err);
        });


        // return db.getConnection().then(conn => {
        //     conn.execute("INSERT INTO customer (name, username, password, email, address) VALUES (?,?,?,?,?)",
        //     [userInput.name, 
        //     userInput.username, 
        //     hashFunctions.hash(userInput.password), 
        //     userInput.email, 
        //     userInput.address])
        //     // .then(conn => {

        //     //     conn.execute("INSERT INTO customer_telephone (customer_id, telephone_number) VALUES (?,?)",
        //     //     []);
        //     // });

        // });


    }

    static getCustomerByUsername(username) {
        return new Promise((resolve) => {
            resolve(db.query("SELECT * FROM customer WHERE username = ?", [username]))
        }).then(value => {
            const details = value[0];
            return new Customer(details.username, details.name, details.email, details.password);
        }).catch((err) => {
            console.log(err);
        });


        // return db.getConnection().then(conn => {
        //     return conn.execute("SELECT * FROM customer WHERE username = ?", [username]).then(
        //         value => {
        //             const details = value[0][0];
        //             return new Customer(details.username, details.name, details.email, details.password);
        //         }
        //     );
        // });
    }

    static getCustomerIdByUsername(username) {
        return new Promise((resolve) => {
            resolve(db.query("SELECT customer_id FROM customer WHERE username = ?", [username]))
        }).then(value => {
            console.log(value)
            return value[0]; 
        }).catch((err) => {
            console.log(err);
        });
    }

    static checkUsernameExist(username){
        return db.query("SELECT username FROM customer WHERE username = ?", [username]);
        
    }

    static checkEmailExist(email){
        return db.query("SELECT email FROM customer WHERE email = ?", [email]);
        
    }

};