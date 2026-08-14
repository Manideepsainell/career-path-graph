import "dotenv/config";
import driver from "../src/config/db.js";

const testSkillGap = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (p:Person {id: $personId})
      MATCH (r:Role {id: $roleId})

      OPTIONAL MATCH (p)-[:HAS_SKILL]->(currentSkill:Skill)
      WITH p, r, collect(currentSkill.name) AS currentSkills

      MATCH (r)-[:REQUIRES]->(requiredSkill:Skill)

      RETURN
          requiredSkill.name AS skill,
          requiredSkill.name IN currentSkills AS matched
      ORDER BY matched DESC, skill
      `,
      {
        personId: "person-1",
        roleId: "role-backend",
      }
    );

    console.log("Skill gap for Alex → Backend Engineer:\n");

    for (const record of result.records) {
      console.log(
        `${record.get("matched") ? "✓" : "✗"} ${record.get("skill")}`
      );
    }
  } catch (error) {
    console.error("Query failed:", error.message);
  } finally {
    await session.close();
    await driver.close();
  }
};

testSkillGap();