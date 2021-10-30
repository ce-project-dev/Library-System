const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config')

const requireAuth = (req, res, next) => {
  const token = req.headers.jwt;
  console.log("########################################check for session: " + JSON.stringify(req.headers))
  console.log("check for session: " + JSON.stringify(req.body))
  // check json web token exists & is verified
  if (token) 
  {
    jwt.verify(token, config.authentication.jwtSecret , (err, decodedToken) => {
      if (err) 
      {
        console.log(err.message);
        res.status(400);
        res.send({message: "login"});
      } 
      else 
      {
        console.log("decodedToken");
        next();
      }
    });
  } 
  else 
  {
  res.status(400);
   res.send({message: "login"});
  }
};


// check current user role
const checkadmin = (req, res, next) => {
  const token = req.headers.jwt;
  if (token) 
  {
    jwt.verify(token, config.authentication.jwtSecret , async (err, decodedToken) => {
      if (err) 
      {
        console.log(err.message);
        res.status(400);
        res.send({message: "login"});
      } 
      else 
      {
        let user = decodedToken;
        console.log(user.role && user.isVerified);
        if (user.role.toString() == "admin") 
        {
          next();
        }
        else
        {
          res.status(401);
          res.send({message: "restricted"});
        }
      }
    });
  } 
  else 
  {
    res.send({message: "login"});
  }
};


// check current user role
const checkuser = (req, res, next) => {
  const token = req.headers.jwt;
  if (token) 
  {
    jwt.verify(token, config.authentication.jwtSecret , async (err, decodedToken) => {
      if (err) 
      {
        console.log(err.message);
        res.status(400);
        res.send({message: "login"});
      } 
      else 
      {
        let user = decodedToken;
        console.log(user.role && user.isVerified);
        if (user.role.toString() == "user") 
        {
          next();
        }
        else
        {
          res.status(401);
          res.send({message: "restricted"});
        }
      }
    });
  } 
  else 
  {
  	res.status(400);
    res.send({message: "login"});
  }
};

module.exports = { requireAuth, checkuser, checkadmin};