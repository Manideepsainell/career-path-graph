import "dotenv/config";
import driver from "./config/db.js";

try {
  await driver.verifyConnectivity();
  console.log("CognoDB connection successful");
} catch (error) {
  console.error("CognoDB connection failed:", error.message);
} finally {
  await driver.close();
}