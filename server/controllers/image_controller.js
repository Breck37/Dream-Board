module.exports = {
  addImage(req, res) {
    const { user_id, image_url, image_text, category} = req.body;
    req.app
      .get("db")
      .add_image(user_id, image_url, image_text, category)
      .then(() => {
        res.status(200).send('OK');
      });
  },

  getDbImages(req, res) {
    req.app
      .get("db")
      .view_image(req.params.userid)
      .then(images => {
        res.status(200).send(images);
      });
  },

  getImageCategories(req, res){
    req.app.get('db')
    .get_cat()
    .then(categories => {
      res.send(categories);
    })
  },

  deleteImage(req, res){
    req.app
      .get("db")
      .delete_image(req.params.id, req.params.userid)
      .then(images => {
        res.send(images);
      });
  },

  editImage(req, res){
    req.app.get('db')
    .get_image([req.params.id])
    .then(image => {
      res.send(image)
    })
  },

  updateImage(req, res){
    req.app.get('db')
    .update_image(req.params.text, req.params.id)
    .then(() => {
      res.status(200).send('')
    })
  },
};
