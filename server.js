//imports and declaration
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//PORT.
const PORT = 8000;

//MULTER PHOTO STORAGE.
const DIR = "./uploads/";

//DATABASE CONNECTION.
const db = require("./database.js");

//DATABASE COLLECTIONS.
const Guide = require("./guideSchema.js");
const User = require("./UserSchema");

//MIDDLEWARES.
app.use(bodyParser.json());
app.use(cors());

////////////////////////ROUTES//////////////////////////////////////
//CRTEATE a Guide
app.post("/guides", (req, res) => {
  let newGuide = {
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    gender: req.body.gender,
    languages: req.body.languages,
    city: req.body.city,
    phone: req.body.number,
    email: req.body.email,
  };
  Guide.create(newGuide).then((guide) => {
    res.status(201).json(guide);
  });
});

//this is for getting all guides // OK
app.get("/guides", (req, res) => {
  Guide.find({}, (err, guides) => {
    if (err) res.json("can not find this guide at @ /guides");
    else {
      res.status(200).json(guides);
    }
  });
});

//this is for deleting one guide // OK
app.delete("/guides/:name", (req, res) => {
  Guide.findOneAndRemove({ name: req.params.name }, (err, guide) => {
    if (err) res.json("can not find or remove this guide name @ /guides/:name");
    else {
      res.status(201).json(guide);
    }
  });
});

//this for updating a guide// CHECK THE IMG UPDATE AND LANGUAGE ARRAY
app.put("/guides/:name", (req, res) => {
  Guide.findOneAndUpdate({ name: req.params.name }, req.body, (err, guide) => {
    if (err) res.json("can not find or update this guide @/guides/:name");
    else {
      res.status(201).json(guide);
    }
  });
});

//OMAR----CREATE A USER IF THAT THE EMAIL USED IS NOT ALREADY TAKED FROM ANOTHER USER AND HASH THE PASSWORD----OMAR\\
app.post("/signUp", (req, res) => {
  let newUser = {
    userName: req.body.userName,
    addressMail: req.body.addressMail,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };

  User.findOne({ addressMail: req.body.addressMail })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser)
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        res.json("USER ALREADY EXIST");
      }
    })
    .catch((err) => {
      res.send("ERROOOOR");
    });
});

//OMAR----COMPARE HASHED PASSWORD WITH ENTRED PASSWORD AND IF ALL IS CORRECT GIVE A TOKE THAT AUTHENTICATE THE USER.----OMAR\\
app.post("/LogIn", (req, res) => {
  User.findOne({ addressMail: req.body.addressMail }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("invalid email");
      } else if (bcrypt.compareSync(req.body.password, user.password)) {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      } else {
        res.status(401).send("invalid password");
      }
    }
  });
});

//LISTEN PORT FOR EXRESS APP
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error : ", err);
  }
  console.log(`Local Guide is running on http://localhost:${PORT}`);
});
