//imports and declaration
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var multer = require("multer");
var path = require("path");
//PORT.
const PORT = 8000;
//DATABASE CONNECTION.
const db = require("./database.js");
//DATABASE COLLECTIONS.
const Guide = require("./guideSchema.js");
const User = require("./UserSchema.js");
const Review = require("./reviewSchema.js");
//MIDDLEWARES.
app.use(bodyParser.json());
app.use(cors());
////////////////////////ROUTES//////////////////////////////////////
const storage = multer.diskStorage({
  destination: "./client/LEGACY/src/assets/img",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
////////////////////////////
//  CRTEATE a Guide
app.post("/guides", upload.single("imageFile"), (req, res) => {
  let newGuide = {
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    gender: req.body.gender,
    languages: req.body.languages,
    city: req.body.city,
    phone: req.body.number,
    email: req.body.email,
    fileName: req.file.filename,
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
//serach bar
app.post("/searchGuides", (req, res) => {
  Guide.find({ name: new RegExp(req.body.name, "i") }, (err, guides) => {
    if (err) res.json("can not find this guide at @ /guides");
    else {
      res.status(200).json(guides);
    }
  });
});
//this is for deleting one guide // OK
app.delete("/guides/", (req, res) => {
  Guide.findOneAndRemove({ name: req.query.name }, (err, guide) => {
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
  console.log(newUser);
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
              res.status(404).send(err);
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

app.get("/one", (req, res) => {
  Guide.find({ gender: req.query.gender, city: req.query.city }).then(
    (result) => {
      res.send(result);
    }
  );
});
// Create a review in dataBase

app.post("/reviews", (req, res) => {
  console.log(req.body.review);
  let newReview = {
    review: req.body.review,
  };
  Review.create(newReview).then((review) => {
    res.status(201).json(review);
  });
});
app.get("/reviews", (req, res) => {
  Review.find({}, (err, reviews) => {
    if (err) res.json("can not find this guide at @ /guides");
    else {
      res.status(200).json(reviews);
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
