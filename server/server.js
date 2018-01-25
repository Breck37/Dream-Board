require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  axios = require("axios"),
  bodyParser = require("body-parser"),
  parser = require("xml2json"),
  multer = require("multer"),
  corsPrefetch = require("cors-prefetch-middleware"),
  imagesUpload = require("images-upload-middleware"),
  actrl = require("./controllers/account_controller"),
  ictrl = require("./controllers/image_controller"),
  path = require('path'),
  app = express();

app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  })
);

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log("DB error", err);
  });

//PULLING IMAGES FROM API OR S3
app.get("/home", (req, res) => {
  axios
    .get("http://seize-the-dream.s3-accelerate.amazonaws.com")
    .then(response => {
      var json = parser.toJson(response.data);
      var j = JSON.parse(json);
      res.status(200).json(j);
    });
  });


//PULL QUOTE OF DAY FROM API
app.get("/homes", (req, res) => {
  axios.get("http://quotes.rest/qod.json").then(response => {
    const data = response.data;
    res.status(200).json(data);
  });
});

app.get("/myimages/:userid", ictrl.getDbImages)
// (req, res) => {
//   app
//     .get("db")
//     .view_image(req.params.userid)
//     .then(images => {
//       res.status(200).send(images);
//     });
// });


//JOIN statement, needs Update
app.get("/mydreams/:userid", actrl.getAccount);

//Upload Image
app.post("/uploadimage/:userid", ictrl.addImage);

app.get('/getcategory', ictrl.getImageCategories)
// (req, res) => {
//   app.get('db')
//   .get_cat()
//   .then(categories => {
//     res.send(categories);
//   })
// })


//Delete Image
app.delete("/deletedream/:id/:userid", ictrl.deleteImage)
// (req, res) => {
//   app
//     .get("db")
//     .delete_image(req.params.id, req.params.userid)
//     .then(images => {
//       res.send(images);
//     });
// });

//Edit Image
app.get(`/alterdream/:id`, ictrl.editImage)
// (req, res) => {
//   app.get('db')
//   .get_image([req.params.id])
//   .then(image => {
//     res.send(image)
//   })
// })

//Update image in Database
app.patch(`/alterdream/:text/:id`, ictrl.updateImage)
// (req, res) => {
//   app.get('db')
//   .update_image(req.params.text, req.params.id)
//   .then(() => {
//     res.status(200).send('')
//   })
// })

//Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send();
})

app.post("/login", (req, res) => {
  const { userId } = req.body;
  const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`;
  axios.get(auth0Url, {
      headers: {
          Authorization: 'Bearer ' + process.env.AUTH0_MANAGEMENT_ACCESS_TOKEN
      }
  }).then(response => {
      //Set User Data Object
      const userData = response.data;
      //Find if user is already in database.
      app.get('db').find_user(userData.user_id).then(users => {
          if(users.length){
              req.session.user = users[0];
              res.json({ user: req.session.user })
          } else {
              //If no user in Database, Create new User.
              app.get('db').create_user([userData.user_id, userData.name, userData.email, userData.picture]).then(user => {
                  req.session.user = user[0];
                  res.json({ user: req.session.user });
              })
          }
      }).catch(err => console.log('sup', err))
  }).catch(err => {
      console.log('USER', err);
      res.status(500).json({message: 'Server 500'});
  })
});

function checkLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

app.get("/user-data", checkLoggedIn, (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(403).send('You must login');
  }
});

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 5000;

app.listen(PORT, () => console.log(`We be jamming to the tunes of ${PORT}`));
