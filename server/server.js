require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  axios = require("axios"),
  bodyParser = require("body-parser"),
  parser = require("xml2json"),
  actrl = require("./controllers/account_controller"),
  ictrl = require("./controllers/image_controller"),
  path = require('path'),
  app = express();

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

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


//JOIN statement, needs Update
app.get("/mydreams/:userid", actrl.getAccount);

//Upload Image
app.post("/uploadimage/:userid", ictrl.addImage);

app.get('/getcategory', ictrl.getImageCategories)



//Delete Image
app.delete("/deletedream/:id/:userid", ictrl.deleteImage)


//Edit Image
app.get(`/alterdream/:id`, ictrl.editImage)


//Update image in Database
app.patch(`/alterdream/:text/:id`, ictrl.updateImage)


//Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.send();
})

app.post("/login", (req, res) => {
  console.log(req.body)
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

const PORT = process.env.PORT || 80;
{/*"proxy": "http://138.197.196.90:5000",*/}
app.listen(PORT, () => console.log(`We be jamming to the tunes of ${PORT}`));
