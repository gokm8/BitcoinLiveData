import Router from "express";
const router = Router.Router();
router.get("/", (req, res) => {
    res.send({
        message: "Welcome to live BTC live data API",
        version: "20.05.2024",
    });
});

export default router;
