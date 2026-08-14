export const skillGapQuery = `
  MATCH (p:Person {id: $personId})
  MATCH (r:Role {id: $roleId})

  OPTIONAL MATCH (p)-[:HAS_SKILL]->(currentSkill:Skill)
  WITH p, r, collect(currentSkill.name) AS currentSkills

  MATCH (r)-[:REQUIRES]->(requiredSkill:Skill)

  RETURN
    requiredSkill.name AS skill,
    requiredSkill.name IN currentSkills AS matched
  ORDER BY matched DESC, skill
`;

export const careerPathQuery = `
  MATCH path =
    (start:Role {id: $fromRoleId})
    -[:LEADS_TO*1..4]->
    (target:Role {id: $toRoleId})

  RETURN
    [node IN nodes(path) | node.title] AS roles
  ORDER BY length(path)
  LIMIT 1
`;

export const connectedRolesQuery = `
  MATCH (p:Person {id: $personId})
        -[:HAS_SKILL]->
        (skill:Skill)

  MATCH (role:Role)-[:REQUIRES]->(skill)

  RETURN
    role.title AS role,
    count(DISTINCT skill) AS matchedSkills
  ORDER BY matchedSkills DESC, role
`;

export const connectedCompaniesQuery = `
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
`;