import "dotenv/config";
import driver from "../src/config/db.js";

const testConnectedCompanies = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (p:Person {id: $personId})
            -[:HAS_SKILL]->
            (skill:Skill)

      MATCH (role:Role)-[:REQUIRES]->(skill)

      MATCH (role)-[:OFFERED_BY]->(company:Company)

      RETURN
        company.name AS company,
        collect(DISTINCT role.title) AS connectedRoles,
        count(DISTINCT skill) AS matchedSkills
      ORDER BY matchedSkills DESC, company
      `,
      {
        personId: "person-1",
      }
    );

    console.log("Companies connected to Alex's skills:\n");

    for (const record of result.records) {
      const company = record.get("company");
      const roles = record.get("connectedRoles");
      const matchedSkills = record.get("matchedSkills").toInt();

      console.log(`${company}:`);
      console.log(`  Roles: ${roles.join(", ")}`);
      console.log(`  Matched skills: ${matchedSkills}`);
      console.log();
    }
  } catch (error) {
    console.error("Query failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

testConnectedCompanies();