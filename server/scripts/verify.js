import "dotenv/config";
import driver from "../src/config/db.js";

const verify = async () => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS type, count(n) AS count
      ORDER BY type
    `);

    console.log("Node counts:");

    for (const record of result.records) {
      console.log(
        `${record.get("type")}: ${record.get("count").toInt()}`
      );
    }

    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS relationship, count(r) AS count
      ORDER BY relationship
    `);

    console.log("\nRelationship counts:");

    for (const record of relationshipResult.records) {
      console.log(
        `${record.get("relationship")}: ${record.get("count").toInt()}`
      );
    }
  } catch (error) {
    console.error("Verification failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

verify();