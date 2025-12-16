const router = require("express").Router();
const controller = require("../controllers/userController");

router.post("/", controller.register);
router.post("/login", controller.login);
router.get("/", controller.getAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
