# Backend Implementation Estimation working 6-8hrs from Monday to Friday

## General Assumptions

- Monolithic Node.js + Express API
- Local environment only (no cloud/infrastructure hardening)
- Single developer full-time (6-8 hours/day, Monday-Friday)
- Clean architecture (controllers / services / repositories)
- Standard REST implementation with DTO validation and basic tests
- Database not defined yet (estimate assumes either PostgreSQL or MongoDB with similar complexity)
- Frontend currently uses mock data and will be integrated later to this API
- Security baseline included: JWT auth, role checks, company scope validation

## Suggested Backend Architecture

Suggested backend folder structure:

```text
backend/
  src/
    app.ts
    server.ts

    config/
      env.ts
      logger.ts

    shared/
      errors/
      utils/
      constants/

    middlewares/
      auth.middleware.ts
      role.middleware.ts
      company-scope.middleware.ts
      error-handler.middleware.ts
      validate.middleware.ts

    modules/
      auth/
        auth.model.ts
        auth.repository.ts
        auth.service.ts
        auth.controller.ts
        auth.routes.ts
        auth.validation.ts
        auth.test.ts

      companies/
      users/
      grupos/
      candidatos/
      evaluaciones/
      factor-rango/
      correo/
      bitacora/
      dashboard/

    database/
      migrations/
      seeds/
      connection.ts

  tests/
    integration/
    e2e/

  package.json
  tsconfig.json
```

## Identified Modules

Detected from current frontend routes, pages, and feature docs:

- Authentication and session
- Company context (global selector and scope)
- Dashboard metrics
- Empresas (core details + nested roles, users, factor-rango)
- Usuarios (administrative users)
- Grupos (main operational module)
- Candidatos (global candidates view)
- Evaluaciones
- Factor Rango
- Correo (templates and send operations)
- Bitacora (audit log)

## Module Analysis

### Module: Authentication and Session

Entities:

- UserAuth
- SessionToken (access/refresh)
- Permission
- Role

Endpoints:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

Complexity:

- Medium

Relationships:

- UserAuth -> Role (many-to-one)
- Role -> Permission (many-to-many)

CRUD and operations:

- Mostly read/auth operations, not full CRUD in this module
- Token issue/refresh/revoke

Validation and processing:

- Email/password format
- Account active check
- Password hash compare
- Token expiration and rotation

Estimated time:

- 4-6 days

Reason:

- Foundation module required by all others; moderate logic and security handling.

---

### Module: Company Context (Global Scope)

Entities:

- Company
- UserCompanyAccess
- ActiveCompanyContext (derived)

Endpoints:

- `GET /api/v1/companies`
- `GET /api/v1/me/companies`
- `GET /api/v1/companies/:id`

Complexity:

- Medium

Relationships:

- User -> Company (many-to-many)
- Company -> all domain entities through `companyId`

CRUD and operations:

- Primarily read operations for selector/scope
- Optional admin CRUD if needed later

Validation and processing:

- Ensure user can access selected `companyId`
- Reject unauthorized cross-company requests

Estimated time:

- 3-4 days

Reason:

- Cross-cutting module with authorization impact across all endpoints.

---

### Module: Dashboard

Entities:

- DashboardMetricSnapshot (or computed view)
- CandidateStats
- EvaluationStats
- ProcessStats

Endpoints:

- `GET /api/v1/dashboard/summary?companyId=&from=&to=`
- `GET /api/v1/dashboard/candidate-growth?companyId=&from=&to=`
- `GET /api/v1/dashboard/evaluations-by-type?companyId=&from=&to=`
- `GET /api/v1/dashboard/metric-comparison?companyId=&month=&year=`

Complexity:

- Medium

Relationships:

- Derived from candidates, groups, evaluations, results

CRUD and operations:

- Read-only aggregation endpoints

Validation and processing:

- Date range validation
- Company scope enforcement
- Aggregation grouping and sorting

Estimated time:

- 4-6 days

Reason:

- No CRUD, but requires reliable aggregate queries and filters.

---

### Module: Empresas

Entities:

- Company
- CompanyRole
- CompanyUser
- CompanySettings

Endpoints:

- `GET /api/v1/empresas?page=&pageSize=&search=`
- `POST /api/v1/empresas`
- `GET /api/v1/empresas/:id`
- `PUT /api/v1/empresas/:id`
- `DELETE /api/v1/empresas/:id`
- `GET /api/v1/empresas/:id/roles`
- `POST /api/v1/empresas/:id/roles`
- `PUT /api/v1/empresas/:id/roles/:roleId`
- `DELETE /api/v1/empresas/:id/roles/:roleId`
- `GET /api/v1/empresas/:id/usuarios`
- `POST /api/v1/empresas/:id/usuarios`
- `PUT /api/v1/empresas/:id/usuarios/:userId`
- `DELETE /api/v1/empresas/:id/usuarios/:userId`

Complexity:

- Medium-High

Relationships:

- Company -> CompanyRole (one-to-many)
- Company -> CompanyUser (one-to-many)
- CompanyUser -> CompanyRole (many-to-one)

CRUD and operations:

- Full CRUD for company, roles, and company users

Validation and processing:

- Unique company name/url/email
- Email/url format
- Role uniqueness by company
- Prevent invalid deletes (company in active use)

Estimated time:

- 8-11 days

Reason:

- Multiple nested subflows in UI and relational constraints.

---

### Module: Usuarios (Admin)

Entities:

- User
- UserRoleAssignment

Endpoints:

- `GET /api/v1/usuarios?page=&pageSize=&search=&estado=&tipo=`
- `POST /api/v1/usuarios`
- `GET /api/v1/usuarios/:id`
- `PUT /api/v1/usuarios/:id`
- `DELETE /api/v1/usuarios/:id`

Complexity:

- Medium

Relationships:

- User -> Company (optional many-to-one in current UI)
- User -> Role (many-to-one or many-to-many)

CRUD and operations:

- Full CRUD

Validation and processing:

- Unique email
- Valid role assignment
- State transitions (Activo/Inactivo)

Estimated time:

- 4-6 days

Reason:

- Standard administrative CRUD with role and state checks.

---

### Module: Grupos (Core Operational Module)

Entities:

- Group
- GroupCandidate
- GroupCandidateEvaluationAssignment
- EvaluationAttempt (append-only history)
- CandidateReport
- GroupResult
- ComparativeMetric
- ExportJob (optional)

Endpoints:

- `GET /api/v1/grupos?page=&pageSize=&search=&empresaId=`
- `POST /api/v1/grupos`
- `GET /api/v1/grupos/:id`
- `PUT /api/v1/grupos/:id`
- `DELETE /api/v1/grupos/:id`
- `GET /api/v1/grupos/:id/candidatos?page=&pageSize=&search=&status=`
- `POST /api/v1/grupos/:id/candidatos`
- `POST /api/v1/grupos/:id/candidatos/:candidateId/reenviar-invitacion`
- `POST /api/v1/grupos/:id/comparativas/candidatos`
- `GET /api/v1/grupos/:id/resultados?evaluationType=&status=&page=&pageSize=`
- `GET /api/v1/grupos/:id/candidatos/:candidateId/informe-operativo`
- `GET /api/v1/grupos/:id/candidatos/:candidateId/evaluaciones/intentos`
- `POST /api/v1/grupos/:id/candidatos/:candidateId/pruebas`
- `POST /api/v1/grupos/:id/candidatos/:candidateId/export`

Complexity:

- High

Relationships:

- Group -> Candidates (many-to-many via GroupCandidate)
- Candidate -> EvaluationAttempt (one-to-many append-only)
- Group -> Results (one-to-many)
- Candidate -> Report sections/factors (one-to-many)

CRUD and operations:

- Full CRUD for groups and candidate assignments
- Advanced operations: comparative charts, historical attempts, exports, re-send actions

Validation and processing:

- Candidate belongs to company/group
- At least 2 candidates for comparison
- Historical attempts are append-only (no overwrite)
- Export payload validation by evaluation type/factors
- Pagination and filtering for large datasets

Estimated time:

- 14-20 days

Reason:

- Largest module in current frontend with most business rules and derived views.

---

### Module: Candidatos (Global)

Entities:

- Candidate
- CandidateDocument (CV)
- CandidateContact

Endpoints:

- `GET /api/v1/candidatos?page=&pageSize=&search=&estado=`
- `POST /api/v1/candidatos`
- `GET /api/v1/candidatos/:id`
- `PUT /api/v1/candidatos/:id`
- `DELETE /api/v1/candidatos/:id`
- `GET /api/v1/candidatos/:id/cv`

Complexity:

- Medium

Relationships:

- Candidate -> Company (many-to-one)
- Candidate -> Groups (many-to-many)

CRUD and operations:

- Full CRUD + CV retrieval endpoint

Validation and processing:

- Email/document format
- Duplicate document/email checks
- File metadata and secure document access

Estimated time:

- 5-7 days

Reason:

- Standard CRUD plus document handling and cross-module references.

---

### Module: Evaluaciones

Entities:

- Evaluation
- EvaluationType
- EvaluationIndicator

Endpoints:

- `GET /api/v1/evaluaciones?page=&pageSize=&search=&tipo=`
- `POST /api/v1/evaluaciones`
- `GET /api/v1/evaluaciones/:id`
- `PUT /api/v1/evaluaciones/:id`
- `DELETE /api/v1/evaluaciones/:id`

Complexity:

- Medium

Relationships:

- Evaluation -> EvaluationType (many-to-one)
- Evaluation referenced by group assignments/results

CRUD and operations:

- Full CRUD with constraints for in-use evaluations

Validation and processing:

- Type must exist
- Indicator numeric range
- Prevent delete if linked to active group flows

Estimated time:

- 4-6 days

Reason:

- CRUD is straightforward but referential rules add complexity.

---

### Module: Factor Rango

Entities:

- FactorRange
- EvaluationFactor

Endpoints:

- `GET /api/v1/factor-rango?page=&pageSize=&search=&tipoDeEvaluacion=`
- `POST /api/v1/factor-rango`
- `GET /api/v1/factor-rango/:id`
- `PUT /api/v1/factor-rango/:id`
- `DELETE /api/v1/factor-rango/:id`

Complexity:

- Medium

Relationships:

- FactorRange -> EvaluationType (many-to-one)
- Used by report interpretation in `grupos/informe-operativo`

CRUD and operations:

- Full CRUD

Validation and processing:

- Percentile ranges cannot overlap for same factor/evaluation type
- State/description consistency

Estimated time:

- 4-6 days

Reason:

- Rule-heavy validation around ranges and uniqueness.

---

### Module: Correo

Entities:

- EmailTemplate
- EmailDispatch
- EmailDispatchStatus

Endpoints:

- `GET /api/v1/correo/templates?page=&pageSize=&search=&empresaId=`
- `POST /api/v1/correo/templates`
- `GET /api/v1/correo/templates/:id`
- `PUT /api/v1/correo/templates/:id`
- `DELETE /api/v1/correo/templates/:id`
- `POST /api/v1/correo/send`
- `GET /api/v1/correo/dispatch/:id`

Complexity:

- Medium-High

Relationships:

- Template -> Company (many-to-one)
- Dispatch -> Template/Candidate/User (many-to-one)

CRUD and operations:

- CRUD templates + send action

Validation and processing:

- Template variable validation
- Valid recipient list
- Delivery status tracking and retries (basic)

Estimated time:

- 5-7 days

Reason:

- External integration behavior plus template/data validation.

---

### Module: Bitacora (Audit)

Entities:

- AuditLog
- AuditActor
- AuditResource

Endpoints:

- `GET /api/v1/bitacora?page=&pageSize=&search=&accion=&tabla=&fechaDesde=&fechaHasta=`
- `GET /api/v1/bitacora/:id`
- `POST /api/v1/bitacora` (optional manual/system event endpoint)

Complexity:

- Medium

Relationships:

- AuditLog -> User (many-to-one)
- AuditLog -> domain resources (polymorphic reference)

CRUD and operations:

- Primarily read; creation generally system-generated

Validation and processing:

- Normalize action enums (CREATE/UPDATE/DELETE/etc.)
- Date filtering and pagination
- Mask sensitive payload values when needed

Estimated time:

- 3-5 days

Reason:

- Simpler model, but important for filtering and consistency.

---

## Global Estimated Timeline

### Breakdown by area

- API foundation (project setup, DB connection, base middlewares, error handling, auth integration baseline): 5-7 days
- Module implementations (all modules above): 54-78 days
- Basic testing (unit + integration per module): 10-14 days
- Refactoring/stabilization (cleanups, consistency, bug fixing): 5-8 days
- Documentation (OpenAPI/basic README and module notes): 3-4 days

### Total estimate

- Total: **77-111 working days**
- Total in weeks (5 working days/week): **15.5-22.2 weeks**
- Rounded planning range: **16-22 weeks** for one developer full-time

### Suggested sequencing

1. Foundations: Auth + company scope + API base
2. Core business: Empresas, Usuarios, Grupos
3. Supporting modules: Candidatos, Evaluaciones, Factor Rango
4. Cross-functional: Dashboard, Correo, Bitacora
5. Final pass: testing hardening, refactor, documentation

### Risk adjustments (recommended buffer)

- Add 10-15% buffer if final DB choice or domain rules are still changing
- Add 1-2 extra weeks if exports (PDF/Word) must be production-grade from day one
