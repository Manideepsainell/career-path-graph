
````md
# Career Path Explorer

A graph-based career exploration application built with **Node.js, React, CognoDB, and the official Neo4j JavaScript driver**.

The application helps users understand how their current skills connect to roles, career paths, and companies.

## Use Case

A user selects:

- Their profile
- Their current role
- Their target role

The application then shows:

1. Skills they already have
2. Skills missing for the target role
3. A career path between their current and target roles
4. Roles connected to their existing skills
5. Companies connected to those roles

## Why a Graph Database?

The core data is relationship-driven.

For example:

```text
Person
  └── HAS_SKILL → Skill
                       └── REQUIRED_BY → Role
                                            └── OFFERED_BY → Company

Role
  └── LEADS_TO → Role
                    └── LEADS_TO → Role
````

A graph database makes traversing these relationships directly natural.

The application uses multi-hop traversal to find career paths such as:

```text
Frontend Developer
        ↓
Full Stack Developer
        ↓
Backend Engineer
```

## Graph Model

### Nodes

* `Person`
* `Skill`
* `Role`
* `Company`

### Relationships

* `HAS_SKILL`
* `REQUIRES`
* `RELATED_TO`
* `LEADS_TO`
* `OFFERED_BY`

### Diagram

```mermaid
graph LR
    Person[Person] -->|HAS_SKILL| Skill[Skill]
    Role[Role] -->|REQUIRES| Skill
    Skill -->|RELATED_TO| Skill
    Role -->|LEADS_TO| NextRole[Role]
    Role -->|OFFERED_BY| Company[Company]
```

## Main Queries

### Skill Gap

Compares a person's skills with the skills required by a target role.

Returns:

* Matched skills
* Missing skills

### Career Path

Finds a path between two roles using `LEADS_TO` relationships.

Example:

```text
Frontend Developer
→ Full Stack Developer
→ Backend Engineer
```

### Connected Roles

Finds roles connected to the skills a person already has and counts matching skills.

### Connected Companies

Traverses:

```text
Person
→ Skill
→ Role
→ Company
```

to find companies connected to the person's current skill set.

## Project Structure

```text
career-path-graph/
├── server/
│   ├── scripts/
│   │   ├── seed.js
│   │   └── ...
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── queries/
│       ├── routes/
│       ├── services/
│       └── server.js
│
├── client/
│   └── src/
│
└── README.md
```

## Tech Stack

* React
* Node.js
* Express
* CognoDB
* Neo4j JavaScript Driver
* Cypher
* Vite

## Setup

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd career-path-graph
```

### 2. Configure the server

```bash
cd server
npm install
```

Create a `.env` file:

```env
COGNODB_URI=<your-cognodb-uri>
COGNODB_USERNAME=<your-username>
COGNODB_PASSWORD=<your-password>
PORT=5000
```

### 3. Seed the database

```bash
node scripts/seed.js
```

### 4. Start the backend

```bash
npm run dev
```

### 5. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Seed Data

The seed script creates:

* 5 people
* 24 skills
* 8 roles
* 6 companies

and the relationships connecting them.

## Screenshots

### Career Explorer

*Add screenshot here.*

### Skill Gap and Career Path

*Add screenshot here.*

## Demo

Hosted application:

`<DEMO_URL>`

## Author

Manideep Sai Nellutla

````
