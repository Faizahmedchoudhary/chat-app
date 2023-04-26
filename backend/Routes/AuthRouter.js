const express = require("express")
const router = express.Router()
const controller = require("../Controller/AuthController")
const fetchadmin = require("../MiddleWare/fetchadmin")
const fetchuser = require("../MiddleWare/fetchUser")

router.post("/signup"  , controller.signUp)

router.post("/login" , controller.login)

router.get("/getdata"  ,  controller.getData)

router.get("/getadmin"  , controller.getAdmin)

module.exports = router



