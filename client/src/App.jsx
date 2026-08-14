import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [roles, setRoles] = useState([]);

const [selectedProfile, setSelectedProfile] = useState("");
const [selectedCurrentRole, setSelectedCurrentRole] = useState("");
const [selectedRole, setSelectedRole] = useState("");

  const [skillGap, setSkillGap] = useState(null);
  const [careerPath, setCareerPath] = useState(null);
  const [connectedRoles, setConnectedRoles] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [profilesResponse, rolesResponse] = await Promise.all([
          fetch(`${API_URL}/profiles`),
          fetch(`${API_URL}/roles`),
        ]);

        if (!profilesResponse.ok || !rolesResponse.ok) {
          throw new Error("Failed to load profiles and roles.");
        }

        const profilesData = await profilesResponse.json();
        const rolesData = await rolesResponse.json();

        setProfiles(profilesData.profiles);
        setRoles(rolesData.roles);

        if (profilesData.profiles.length > 0) {
          setSelectedProfile(profilesData.profiles[0].id);
        }
const frontendRole = rolesData.roles.find(
  (role) => role.id === "role-frontend"
);

const backendRole = rolesData.roles.find(
  (role) => role.id === "role-backend"
);

if (frontendRole) {
  setSelectedCurrentRole(frontendRole.id);
}

if (backendRole) {
  setSelectedRole(backendRole.id);
}
      } catch (err) {
        setError(err.message);
      } finally {
        setInitialLoading(false);
      }
    };

    loadOptions();
  }, []);

  const exploreCareer = async () => {
    if (!selectedProfile || !selectedCurrentRole || !selectedRole) {
  return;
}

    setLoading(true);
    setError("");

    try {
      const [
        skillGapResponse,
        careerPathResponse,
        rolesResponse,
        companiesResponse,
      ] = await Promise.all([
        fetch(
          `${API_URL}/profiles/${selectedProfile}/skill-gap/${selectedRole}`
        ),
       
          fetch(
  `${API_URL}/career-path?from=${selectedCurrentRole}&to=${selectedRole}`
),
        fetch(`${API_URL}/profiles/${selectedProfile}/roles`),
        fetch(`${API_URL}/profiles/${selectedProfile}/companies`),
      ]);

      if (
        !skillGapResponse.ok ||
        !careerPathResponse.ok ||
        !rolesResponse.ok ||
        !companiesResponse.ok
      ) {
        throw new Error("Unable to explore this career path.");
      }

      const [skillGapData, pathData, rolesData, companiesData] =
        await Promise.all([
          skillGapResponse.json(),
          careerPathResponse.json(),
          rolesResponse.json(),
          companiesResponse.json(),
        ]);

      setSkillGap(skillGapData);
      setCareerPath(pathData.path);
      setConnectedRoles(rolesData.roles);
      setCompanies(companiesData.companies);
    } catch (err) {
      setError(err.message);
      setSkillGap(null);
      setCareerPath(null);
      setConnectedRoles([]);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const selectedProfileName =
    profiles.find((profile) => profile.id === selectedProfile)?.name || "";

  const selectedRoleTitle =
    roles.find((role) => role.id === selectedRole)?.title || "";

  if (initialLoading) {
    return (
      <main className="app">
        <div className="loading-screen">Loading career explorer...</div>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">CAREER PATH EXPLORER</p>
          <h1>Understand where your skills can take you.</h1>
          <p className="hero-text">
            Explore skill gaps, career paths, connected roles, and companies
            through a graph of relationships.
          </p>
        </div>
      </header>

      <section className="explorer-card">
        <div className="selector-grid">
          <label>
            <span>Your profile</span>
            <select
              value={selectedProfile}
              onChange={(event) => setSelectedProfile(event.target.value)}
            >
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </label>
<label>
  <span>Current role</span>
  <select
    value={selectedCurrentRole}
    onChange={(event) =>
      setSelectedCurrentRole(event.target.value)
    }
  >
    {roles.map((role) => (
      <option key={role.id} value={role.id}>
        {role.title}
      </option>
    ))}
  </select>
</label>
          <label>
            <span>Target role</span>
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
            </select>
          </label>

          <button onClick={exploreCareer} disabled={loading}>
            {loading ? "Exploring..." : "Explore Career"}
          </button>
        </div>
      </section>

      {error && <div className="error-card">{error}</div>}

      {!skillGap && !loading && !error && (
        <section className="empty-state">
          <div className="empty-icon">→</div>
          <h2>Ready to explore</h2>
          <p>
            Choose a profile and target role, then explore the relationships
            in the career graph.
          </p>
        </section>
      )}

      {skillGap && (
        <>
          <section className="section">
            <div className="section-heading">
              <div>
                <p className="section-label">01 · SKILL GAP</p>
                <h2>
                  {selectedProfileName} → {selectedRoleTitle}
                </h2>
              </div>
              <span className="count-badge">
                {skillGap.missingSkills.length} gaps
              </span>
            </div>

            <div className="skills-layout">
              <div className="skill-panel matched">
                <h3>Already have</h3>

                <div className="chips">
                  {skillGap.matchedSkills.length > 0 ? (
                    skillGap.matchedSkills.map((skill) => (
                      <span className="chip success" key={skill}>
                        ✓ {skill}
                      </span>
                    ))
                  ) : (
                    <p className="muted">No matching skills yet.</p>
                  )}
                </div>
              </div>

              <div className="skill-panel missing">
                <h3>Skills to develop</h3>

                <div className="chips">
                  {skillGap.missingSkills.length > 0 ? (
                    skillGap.missingSkills.map((skill) => (
                      <span className="chip warning" key={skill}>
                        + {skill}
                      </span>
                    ))
                  ) : (
                    <p className="muted">No skill gaps. Great match.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {careerPath && (
            <section className="section">
              <div className="section-heading">
                <div>
                  <p className="section-label">02 · CAREER PATH</p>
                  <h2>A possible progression</h2>
                </div>
              </div>

              <div className="career-path">
                {careerPath.map((role, index) => (
                  <div className="path-step" key={role}>
                    <div className="path-node">
                      <span>{index + 1}</span>
                      <strong>{role}</strong>
                    </div>

                    {index < careerPath.length - 1 && (
                      <div className="path-arrow">↓</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="two-column">
            <div className="section compact">
              <div className="section-heading">
                <div>
                  <p className="section-label">03 · CONNECTED ROLES</p>
                  <h2>Roles matching your skills</h2>
                </div>
              </div>

              <div className="role-list">
                {connectedRoles.map((role) => (
                  <div className="role-row" key={role.role}>
                    <span>{role.role}</span>
                    <strong>{role.matchedSkills}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="section compact">
              <div className="section-heading">
                <div>
                  <p className="section-label">04 · COMPANIES</p>
                  <h2>Connected companies</h2>
                </div>
              </div>

              <div className="company-list">
                {companies.map((company) => (
                  <div className="company-card" key={company.company}>
                    <div>
                      <strong>{company.company}</strong>
                      <p>{company.connectedRoles.join(" · ")}</p>
                    </div>
                    <span>{company.matchedSkills} skills</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;