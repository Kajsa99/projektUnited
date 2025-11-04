const express = require("express");
const router = express.Router();
const smultronController = require("../controllers/smultronController");

//CRUD
router.post("/", smultronController.createSmultron);
router.get("/", smultronController.getSmultron);
router.put("/:id", smultronController.updateSmultron);
router.delete("/:id", smultronController.deleteSmultron);

module.exports = router;
