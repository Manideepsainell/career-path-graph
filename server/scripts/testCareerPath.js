import "dotenv/config";
import driver from "../src/config/db.js";

const testCareerPath = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH path =
        (start:Role {id: $fromRoleId})
        -[:LEADS_TO*1..4]->
        (target:Role {id: $toRoleId})

      RETURN
        [node IN nodes(path) | node.title] AS roles
      ORDER BY length(path)
      LIMIT 1
      `,
      {
        fromRoleId: "role-frontend",
        toRoleId: "role-senior-backend",
      }
    );

    if (result.records.length === 0) {
      console.log("No career path found.");
      return;
    }

    const roles = result.records[0].get("roles");

    console.log("Career path:\n");
    console.log(roles.join(" → "));
  } catch (error) {
    console.error("Query failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

testCareerPath();