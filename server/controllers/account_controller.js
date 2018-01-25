let app;

module.exports = {
  getAccount(req, res) {
    req.app
      .get("db")
      .account_info(req.params.userid)
      .then(info => {
        res.send(info);
      });
  }
};
