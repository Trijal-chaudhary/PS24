# NMSCM System - Development Context & Progress Summary

## System Architecture Overview

```
                 ┌─────────────────────────┐
                 │   Firebase / Firestore  │
                 │    (minova-ef69c)       │
                 │                         │
                 │   inspections           │
                 │   incidents             │
                 │   attendance            │
                 │   grievances            │
                 └────────────┬────────────┘
                              │
                              ▼
                       Node.js / Express (Port 5000)
                              │
                  ┌───────────┴───────────┐
                  │                       │
                  ▼                       ▼
        Firestore Repository       JSON Repository
                  │                       │
                  ▼                       ▼
        inspections/incidents/     mines/users/contractors
        attendance/grievances      (server/data/*.json)
                  │                       │
                  └───────────┬───────────┘
                              ▼
                        REST API (/api/*)
                              │
                              ▼
                   React Dashboard (Port 5173)
```

- **Backend**: Express.js server (`server/src/index.js`) running on port 5000.
- **Frontend**: React + Vite SPA (`client/src/App.jsx`) with Vanilla CSS styling (NO Tailwind CSS).
- **Data Access & Repository Layer**:
  - **Firestore Runtime Datasets**: `inspections`, `incidents`, `attendance`, `grievances` (fetched live from Cloud Firestore via `server/src/repositories/firestoreRepository.js`).
  - **Local JSON Runtime Datasets**: `mines`, `users`, `contractors` (fetched from `server/data/*.json` via `server/src/repositories/jsonRepository.js`).
- **Source Data Preservation Policy**: All 7 JSON files in `server/data/` (`mines.json`, `inspections.json`, `incidents.json`, `attendance.json`, `contractors.json`, `grievances.json`, `users.json`) remain **100% byte-for-byte unchanged** as a read-only backup/reference copy.

---

## Phase Completion Status

### Phase 1: Core Architecture & Layout
- Established Express REST server and React SPA layout system.
- Global navigation, header telemetry, theme tokens, and dynamic layout.

### Phase 2: Mine Monitoring & Mine Detail Dossier
- Unified module merging Mine Monitoring and Live Map.
- `/mine-monitoring` page with interactive Leaflet map, filter toolbar, pagination.
- `/mine/:mineId` Mine Detail dossier page with multi-tab layout (Overview, Inspections, Violations, Incidents, Attendance, Contractors, Grievances).
- Dynamic AI-ranked **Highest Attention Mines** component on Overview page.

### Phase 3: Inspection & Compliance Management
- `/inspections` directory with status filters and summary cards.
- `/safety-violations` violations register with severity filtering.
- `/corrective-actions` corrective action tracking.

### Phase 4: Incident Management & Attendance Monitoring
- `/incidents` directory with severity filtering, affected details, evidence attachments.
- `/attendance-workforce` attendance monitoring with shift breakdown and headcount calculations.
- Dynamic **Overview Priority Incident Feed** ticker with severity badges and manual navigation controls.

### Phase 5: Contractors & Documents + Grievances & Observations
- `/contractors` and `/contractors/:contractorId` directory and detail dossier pages.
- Centralized document expiry logic (`Valid`, `Expiring Soon`, `Expired`, `Mixed`, `Unknown`) with derived license status based on reference date `2024-10-25`.
- `/grievances` and `/grievances/:submissionId` directory and detail dossier pages.
- Mine Detail integration for mine-specific contractors and grievances.

### Phase 6A: Firebase Migration & Infrastructure Setup
- Configured Firebase Admin SDK via `GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-account.json`.
- Security audit: Confirmed `.env` and credential JSON are ignored in `.gitignore`.
- Created batch migration script `server/scripts/migrateJsonToFirebase.js`.

### Phase 6B: Selective Firebase Integration (Current Active State)
- **Target Project**: Cloud Firestore project `minova-ef69c`.
- **Selective Dataset Responsibility Matrix**:
  - `inspections`: Firestore
  - `incidents`: Firestore
  - `attendance`: Firestore
  - `grievances`: Firestore
  - `mines`: Local JSON (`mines.json`)
  - `contractors`: Local JSON (`contractors.json`)
  - `users`: Local JSON (`users.json`)
- **Repository Architecture**:
  - `server/src/repositories/baseRepository.js`: Base Firestore repository class with in-memory TTL caching.
  - `server/src/repositories/firestoreRepository.js`: Selective export matrix.
  - `server/src/repositories/firestoreInspectionRepository.js`
  - `server/src/repositories/firestoreIncidentRepository.js`
  - `server/src/repositories/firestoreAttendanceRepository.js`
  - `server/src/repositories/firestoreGrievanceRepository.js`
  - `server/src/repositories/jsonRepository.js`: Serving local JSON for master datasets (`mines`, `contractors`, `users`).
- **Batch Write Operation**:
  - Created [`server/scripts/writeSelectiveToNewFirebase.js`](file:///d:/VibecodingWithHarsh/PS24/server/scripts/writeSelectiveToNewFirebase.js).
  - Executed write operation to commit all 4 runtime datasets (`inspections`: 1,284, `incidents`: 18, `attendance`: 388, `grievances`: 3) directly to Firestore project `minova-ef69c`.
- **Strict Compliance**:
  - Zero post-upload reads, collection scans, or automated test scripts were executed after migration, per explicit instructions (leaving database for manual inspection in Firebase Console).
  - Frontend production build (`npm run build` in `client/`) built cleanly with zero errors (`dist/assets/index-Dt6U50q4.js`).
- **Source JSON Integrity**: Verified SHA-256 checksums across all 7 source JSON files; all remain 100% byte-for-byte unchanged.

---

## Next Steps / Morning Startup Checklist
1. Start Express backend (`cd server && npm run dev`).
2. Start React frontend (`cd client && npm run dev`).
3. Verify application routes (`/overview`, `/mine-monitoring`, `/inspections`, `/incidents`, `/attendance-workforce`, `/contractors`, `/grievances`).
4. Perform manual inspection of collections in Firebase Console for project `minova-ef69c`.
