import express from "express";
import {
  skillGap,
  careerPath,
  connectedRoles,
  connectedCompanies,
  profiles,
  roles,
} from "../controllers/careerController.js";
const router = express.Router();
router.get("/profiles", profiles);
router.get("/roles", roles);

router.get(
  "/profiles/:personId/skill-gap/:roleId",
  skillGap
);

router.get(
  "/career-path",
  careerPath
);

router.get(
  "/profiles/:personId/roles",
  connectedRoles
);

router.get(
  "/profiles/:personId/companies",
  connectedCompanies
);

export default router;