const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log(res);
  res.send("Opps, wrong address@").status(200);
});

module.exports = router;