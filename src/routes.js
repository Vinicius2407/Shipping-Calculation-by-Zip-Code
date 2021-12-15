import { Router } from "express";

import shippingController from "./controller/shipping.controller.js";

const router = Router();

router.get("/cotacao", shippingController.generateXML);

export { router };
