import "dotenv/config";
import driver from "../src/config/db.js";

const testConnectedRoles = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (p:Person {id: $personId})
            -[:HAS_SKILL]->
            (skill:Skill)

      MATCH (role:Role)-[:REQUIRES]->(skill)

      RETURN
        role.title AS role,
        count(DISTINCT skill) AS matchedSkills
      ORDER BY matchedSkills DESC, role
      `,
      {
        personId: "person-1",
      }
    );

    console.log("Roles connected to Alex's skills:\n");

    for (const record of result.records) {
      console.log(
        `${record.get("role")}: ${record.get("matchedSkills").toInt()} matched skills`
      );
    }
  } catch (error) {
    console.error("Query failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

testConnectedRoles();