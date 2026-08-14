import "dotenv/config";
import driver from "../src/config/db.js";

import {
  getSkillGap,
  getCareerPath,
  getConnectedRoles,
  getConnectedCompanies,
} from "../src/services/careerService.js";

const testService = async () => {
  try {
    console.log("\n--- Skill Gap ---");

    const skillGap = await getSkillGap(
      "person-1",
      "role-backend"
    );

    console.table(skillGap);

    console.log("\n--- Career Path ---");

    const careerPath = await getCareerPath(
      "role-frontend",
      "role-senior-backend"
    );

    console.log(careerPath.join(" → "));

    console.log("\n--- Connected Roles ---");

    const roles = await getConnectedRoles("person-1");

    console.table(roles);

    console.log("\n--- Connected Companies ---");

    const companies = await getConnectedCompanies("person-1");

    console.table(companies);
  } catch (error) {
    console.error("Service test failed:", error.message);
  } finally {
    await driver.close();
  }
};

testService();