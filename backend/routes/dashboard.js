import dashboardController from "../controller/dashboardController.js";
import Router from "express";

// Routes
const router = Router.Router();
const { dashboardGraphData, fetchCryptoLiveData } = dashboardController;

router.get("/get-crypto-graph-data", dashboardGraphData);
router.get("/fetch-crypto-live-data", fetchCryptoLiveData);

export default router;
