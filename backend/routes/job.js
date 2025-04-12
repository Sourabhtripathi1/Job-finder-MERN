const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/list", auth, async (req, res) => {
  return;
});

module.exports = router;
