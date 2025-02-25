import { Router } from "express";
import { proveYoureHumanController } from "../controllers/prove_youre_human/prove_youre_human.controller";

export const prove_youre_human_routes = Router();

prove_youre_human_routes.post("/", proveYoureHumanController);