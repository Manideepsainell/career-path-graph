import {
  getSkillGap,
  getCareerPath,
  getConnectedRoles,
  getConnectedCompanies,
  getProfiles,
  getRoles,
} from "../services/careerService.js";
export const profiles = async (req, res, next) => {
  try {
    const results = await getProfiles();

    res.json({
      profiles: results,
    });
  } catch (error) {
    next(error);
  }
};

export const roles = async (req, res, next) => {
  try {
    const results = await getRoles();

    res.json({
      roles: results,
    });
  } catch (error) {
    next(error);
  }
};
export const skillGap = async (req, res, next) => {
  try {
    const { personId, roleId } = req.params;

    const results = await getSkillGap(personId, roleId);

    const matchedSkills = results
      .filter((item) => item.matched)
      .map((item) => item.skill);

    const missingSkills = results
      .filter((item) => !item.matched)
      .map((item) => item.skill);

    res.json({
      matchedSkills,
      missingSkills,
    });
  } catch (error) {
    next(error);
  }
};

export const careerPath = async (req, res, next) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        error: "Both 'from' and 'to' role IDs are required.",
      });
    }

    const path = await getCareerPath(from, to);

    if (!path) {
      return res.status(404).json({
        error: "No career path found.",
      });
    }

    res.json({
      path,
    });
  } catch (error) {
    next(error);
  }
};

export const connectedRoles = async (req, res, next) => {
  try {
    const { personId } = req.params;

    const roles = await getConnectedRoles(personId);

    res.json({
      roles,
    });
  } catch (error) {
    next(error);
  }
};

export const connectedCompanies = async (req, res, next) => {
  try {
    const { personId } = req.params;

    const companies = await getConnectedCompanies(personId);

    res.json({
      companies,
    });
  } catch (error) {
    next(error);
  }
};