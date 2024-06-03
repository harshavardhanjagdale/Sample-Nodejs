const express = require("express");
const app = express();
const validation=require('../core/helpers/validationCheck')
const router = express.Router();
const resTransform = require("../core/helpers/responceTransform");

app.use(express.json());

const authModel = require("../core/services/auth");


router.post("/login",validation.loginValidation() ,(req, res) => {
  authModel.loginUser(req, (err, result) => {
 
    if (err) {
      res.json(resTransform.errorResponse(err))
      return res;
    }
    res.json({token:result,...resTransform.successResponse(undefined,"login successfully")})
    res.end();
    return res;
  });
});

router.post("/signup", (req, res) => {
  authModel.signUpUser(req.body, (err, result) => {
    if (err) {
      res.json(resTransform.errorResponse(err))
      return err;
    }
    res.json(resTransform.successResponse(result,"signin succesfully"))
    res.end();
    return res;
  });
});

module.exports = router;
