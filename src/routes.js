import { Router } from "express";

import shippingController from "./controller/shipping.controller.js";

const router = Router();

router.get("/cep", shippingController.generateJSON);

export { router };
