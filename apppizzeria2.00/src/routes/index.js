const router = require("express").Router();

router.use("/usuarios", require("./userRoutes"));
router.use("/pizzas", require("./pizzaRoutes"));
router.use("/promociones", require("./promocionRoutes"));

module.exports = router;
