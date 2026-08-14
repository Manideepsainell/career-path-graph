import driver from "../config/db.js";

import {
  skillGapQuery,
  careerPathQuery,
  connectedRolesQuery,
  connectedCompaniesQuery,
  profilesQuery,
  rolesQuery,
} from "../queries/careerQueries.js";
export const getProfiles = async () => {
  const session = driver.session();

  try {
    const result = await session.run(profilesQuery);

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
    }));
  } finally {
    await session.close();
  }
};

export const getRoles = async () => {
  const session = driver.session();

  try {
    const result = await session.run(rolesQuery);

    return result.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
    }));
  } finally {
    await session.close();
  }
};
export const getSkillGap = async (personId, roleId) => {
  const session = driver.session();

  try {
    const result = await session.run(skillGapQuery, {
      personId,
      roleId,
    });

    return result.records.map((record) => ({
      skill: record.get("skill"),
      matched: record.get("matched"),
    }));
  } finally {
    await session.close();
  }
};

export const getCareerPath = async (fromRoleId, toRoleId) => {
  const session = driver.session();

  try {
    const result = await session.run(careerPathQuery, {
      fromRoleId,
      toRoleId,
    });

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].get("roles");
  } finally {
    await session.close();
  }
};

export const getConnectedRoles = async (personId) => {
  const session = driver.session();

  try {
    const result = await session.run(connectedRolesQuery, {
      personId,
    });

    return result.records.map((record) => ({
      role: record.get("role"),
      matchedSkills: record.get("matchedSkills").toInt(),
    }));
  } finally {
    await session.close();
  }
};

export const getConnectedCompanies = async (personId) => {
  const session = driver.session();

  try {
    const result = await session.run(connectedCompaniesQuery, {
      personId,
    });

    return result.records.map((record) => ({
      company: record.get("company"),
      connectedRoles: record.get("connectedRoles"),
      matchedSkills: record.get("matchedSkills").toInt(),
    }));
  } finally {
    await session.close();
  }
};