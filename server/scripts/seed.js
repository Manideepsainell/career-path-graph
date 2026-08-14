import "dotenv/config";
import driver from "../src/config/db.js";

const people = [
  {
    id: "person-1",
    name: "Alex",
    skills: ["JavaScript", "React", "HTML", "CSS"],
  },
  {
    id: "person-2",
    name: "Priya",
    skills: ["JavaScript", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    id: "person-3",
    name: "Rahul",
    skills: ["Java", "Spring Boot", "PostgreSQL", "SQL", "REST APIs"],
  },
  {
    id: "person-4",
    name: "Sara",
    skills: ["Python", "SQL", "Pandas", "PostgreSQL"],
  },
  {
    id: "person-5",
    name: "Daniel",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Docker"],
  },
];

const skills = [
  { id: "skill-javascript", name: "JavaScript", category: "Language" },
  { id: "skill-typescript", name: "TypeScript", category: "Language" },
  { id: "skill-java", name: "Java", category: "Language" },
  { id: "skill-python", name: "Python", category: "Language" },
  { id: "skill-sql", name: "SQL", category: "Language" },

  { id: "skill-react", name: "React", category: "Frontend" },
  { id: "skill-html", name: "HTML", category: "Frontend" },
  { id: "skill-css", name: "CSS", category: "Frontend" },
  { id: "skill-nextjs", name: "Next.js", category: "Frontend" },

  { id: "skill-nodejs", name: "Node.js", category: "Backend" },
  { id: "skill-express", name: "Express.js", category: "Backend" },
  { id: "skill-springboot", name: "Spring Boot", category: "Backend" },
  { id: "skill-rest", name: "REST APIs", category: "Backend" },
  { id: "skill-graphql", name: "GraphQL", category: "Backend" },

  { id: "skill-mongodb", name: "MongoDB", category: "Database" },
  { id: "skill-postgresql", name: "PostgreSQL", category: "Database" },
  { id: "skill-redis", name: "Redis", category: "Database" },

  { id: "skill-docker", name: "Docker", category: "DevOps" },
  { id: "skill-aws", name: "AWS", category: "DevOps" },
  { id: "skill-kubernetes", name: "Kubernetes", category: "DevOps" },
  { id: "skill-cicd", name: "CI/CD", category: "DevOps" },
  { id: "skill-linux", name: "Linux", category: "DevOps" },

  { id: "skill-pandas", name: "Pandas", category: "Data" },
  { id: "skill-airflow", name: "Airflow", category: "Data" },
];

const roles = [
  {
    id: "role-frontend",
    title: "Frontend Developer",
    level: "Entry",
    skills: ["JavaScript", "React", "HTML", "CSS"],
  },
  {
    id: "role-fullstack",
    title: "Full Stack Developer",
    level: "Entry",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    id: "role-backend",
    title: "Backend Engineer",
    level: "Entry",
    skills: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    id: "role-senior-backend",
    title: "Senior Backend Engineer",
    level: "Senior",
    skills: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
  },
  {
    id: "role-devops",
    title: "DevOps Engineer",
    level: "Mid",
    skills: ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    id: "role-cloud",
    title: "Cloud Engineer",
    level: "Mid",
    skills: ["Linux", "Docker", "Kubernetes", "AWS"],
  },
  {
    id: "role-data-analyst",
    title: "Data Analyst",
    level: "Entry",
    skills: ["Python", "SQL", "Pandas", "PostgreSQL"],
  },
  {
    id: "role-data-engineer",
    title: "Data Engineer",
    level: "Mid",
    skills: ["Python", "SQL", "PostgreSQL", "Docker", "AWS"],
  },
];

const companies = [
  {
    id: "company-novatech",
    name: "NovaTech",
    industry: "SaaS",
    roles: ["Full Stack Developer", "Backend Engineer"],
  },
  {
    id: "company-cloudforge",
    name: "CloudForge",
    industry: "Cloud Infrastructure",
    roles: ["Backend Engineer", "DevOps Engineer", "Cloud Engineer"],
  },
  {
    id: "company-pixellabs",
    name: "PixelLabs",
    industry: "Digital Products",
    roles: ["Frontend Developer", "Full Stack Developer"],
  },
  {
    id: "company-finedge",
    name: "FinEdge",
    industry: "FinTech",
    roles: ["Backend Engineer", "Senior Backend Engineer"],
  },
  {
    id: "company-dataworks",
    name: "DataWorks",
    industry: "Data & Analytics",
    roles: ["Data Analyst", "Data Engineer"],
  },
  {
    id: "company-scalestack",
    name: "ScaleStack",
    industry: "Enterprise Software",
    roles: ["Full Stack Developer", "Backend Engineer", "DevOps Engineer"],
  },
];

const skillRelationships = [
  ["JavaScript", "TypeScript"],
  ["JavaScript", "React"],
  ["JavaScript", "Node.js"],

  ["Node.js", "Express.js"],
  ["Node.js", "REST APIs"],
  ["Node.js", "MongoDB"],
  ["Node.js", "Redis"],

  ["Java", "Spring Boot"],
  ["Spring Boot", "REST APIs"],
  ["Spring Boot", "PostgreSQL"],

  ["Python", "Pandas"],
  ["Python", "SQL"],
  ["SQL", "PostgreSQL"],

  ["Docker", "Kubernetes"],
  ["Docker", "AWS"],
  ["Docker", "CI/CD"],
  ["AWS", "Kubernetes"],
  ["Linux", "Docker"],
];

const careerPaths = [
  ["Frontend Developer", "Full Stack Developer"],
  ["Full Stack Developer", "Backend Engineer"],
  ["Backend Engineer", "Senior Backend Engineer"],
  ["Backend Engineer", "DevOps Engineer"],
  ["DevOps Engineer", "Cloud Engineer"],
  ["Data Analyst", "Data Engineer"],
];

const getSkillId = (name) => {
  const skill = skills.find((skill) => skill.name === name);

  if (!skill) {
    throw new Error(`Skill not found: ${name}`);
  }

  return skill.id;
};

const getRoleId = (title) => {
  const role = roles.find((role) => role.title === title);

  if (!role) {
    throw new Error(`Role not found: ${title}`);
  }

  return role.id;
};

const seed = async () => {
  const session = driver.session();

  try {
    console.log("Clearing existing graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Creating people...");

    await session.run(
      `
      UNWIND $people AS person
      CREATE (p:Person {
        id: person.id,
        name: person.name
      })
      `,
      { people }
    );

    console.log("Creating skills...");

    await session.run(
      `
      UNWIND $skills AS skill
      CREATE (s:Skill {
        id: skill.id,
        name: skill.name,
        category: skill.category
      })
      `,
      { skills }
    );

    console.log("Creating roles...");

    await session.run(
      `
      UNWIND $roles AS role
      CREATE (r:Role {
        id: role.id,
        title: role.title,
        level: role.level
      })
      `,
      { roles }
    );

    console.log("Creating companies...");

    await session.run(
      `
      UNWIND $companies AS company
      CREATE (c:Company {
        id: company.id,
        name: company.name,
        industry: company.industry
      })
      `,
      { companies }
    );

    console.log("Creating person → skill relationships...");

    for (const person of people) {
      await session.run(
        `
        MATCH (p:Person {id: $personId})
        UNWIND $skillNames AS skillName
        MATCH (s:Skill {name: skillName})
        CREATE (p)-[:HAS_SKILL]->(s)
        `,
        {
          personId: person.id,
          skillNames: person.skills,
        }
      );
    }

    console.log("Creating role → skill relationships...");

    for (const role of roles) {
      await session.run(
        `
        MATCH (r:Role {id: $roleId})
        UNWIND $skillNames AS skillName
        MATCH (s:Skill {name: skillName})
        CREATE (r)-[:REQUIRES]->(s)
        `,
        {
          roleId: role.id,
          skillNames: role.skills,
        }
      );
    }

    console.log("Creating skill relationships...");

    for (const [skillA, skillB] of skillRelationships) {
      await session.run(
        `
        MATCH (a:Skill {id: $skillAId})
        MATCH (b:Skill {id: $skillBId})
        CREATE (a)-[:RELATED_TO]->(b)
        `,
        {
          skillAId: getSkillId(skillA),
          skillBId: getSkillId(skillB),
        }
      );
    }

    console.log("Creating career paths...");

    for (const [fromRole, toRole] of careerPaths) {
      await session.run(
        `
        MATCH (from:Role {id: $fromRoleId})
        MATCH (to:Role {id: $toRoleId})
        CREATE (from)-[:LEADS_TO]->(to)
        `,
        {
          fromRoleId: getRoleId(fromRole),
          toRoleId: getRoleId(toRole),
        }
      );
    }

    console.log("Creating role → company relationships...");

    for (const company of companies) {
      await session.run(
        `
        MATCH (c:Company {id: $companyId})
        UNWIND $roleTitles AS roleTitle
        MATCH (r:Role {title: roleTitle})
        CREATE (r)-[:OFFERED_BY]->(c)
        `,
        {
          companyId: company.id,
          roleTitles: company.roles,
        }
      );
    }

    const result = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS type, count(n) AS count
      ORDER BY type
    `);

    console.log("\nSeed complete.");

    for (const record of result.records) {
      console.log(
        `${record.get("type")}: ${record.get("count").toInt()}`
      );
    }
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
};

seed();