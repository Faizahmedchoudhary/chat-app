const express = require("express")
const bcrypt = require("bcrypt")
const conn = require("../database/dbConfig")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken");


const signUp = async (req , res) => {
    // res.send("Sign Up Controller")
    const { email, userName , password } = req.body;
    // const data = { name, email, password, role } = req.body;
    
    try {
        const hashedpass = await bcrypt.hash(password , 10);
        conn.query("select * from users where email = ?" , email , (error , result) => {
            if (result.length > 0) {
                console.log("email already exists")
                res.status(422).json({message: "email already exists"})
            }
            
            else{
                conn.query("insert into users SET ?" , { email, userName , hashedpass }  , (err , result) => {
                    if (error) {
                        console.log(error)
                        res.status(422).json({message: error})
                    } else {
                        const data = {
                            user: {
                                id: result.id
                            }
                        }

                        const authToken = jwt.sign(data , JWT_SECRET)
                        // res.json(authToken)
                        res.status(201).json({message: "User Registered"})

                    }
                })
            }
        })
    } catch (error) {
        res.send(error)
    }

}

const login = (req, res) => {
    
    const data = { email, password } = req.body;


    // res.send(password);
    conn.query("SELECT * FROM users WHERE email = ? ", email, (err, result) => {
        if (result.length == 0) {
            console.log("err")
            res.send({ message: "Wrong Email" })
        } else {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].hashedpass, (error, done) => {
                    if (done) {
                        const data = {
                            result: {
                                id: result[0].id,
                            }
                        }
                        console.log(data)
                        const authToken = jwt.sign(data, JWT_SECRET);
                        res.status(201).json( {result, authToken , message: "Login Successfull"} )


                    } else {
                        res.send({ message: "Wrong Password" })
                    }
                })
            }
        }
    })


}

const getData  = async(req, res) => {
    conn.query("select * from users" , (error ,result) => {
        result ? res.send(result) : res.send(error)
    })
} 

const getAdmin  = async(req, res) => {
    conn.query("select * from users where role = ?" , "Admin" , (error ,result) => {
        result ? res.send(result) : res.send(error)
    })
} 

module.exports = {signUp , login , getData, getAdmin}
