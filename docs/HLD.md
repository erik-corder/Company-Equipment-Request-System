## Overview
The Company_Equipment_Request (CERS) system is a centralized web application hosted on Azure, designed to handle equipment requests from employees, approvals from managers, fulfillment tracking by IT/Admin, and audit logging. This HLD document outlines the system-level architecture, interactions between components, high-level data model, and key security considerations as per the recommendation.

## Architecture
### Major Components
1. **Frontend**
   - **Technology**: Next.js with TypeScript.
   - **Responsibility**: Provide a user-friendly interface for employees, managers, and IT/Admin to submit, approve, track, and update requests, and view audit logs and fulfillment statuses. Customization features allow admins to manage request statuses, equipment categories, user roles, and basic filters.

2. **Backend API**
   - **Technology**: .Net framework.
   - **Responsibility**: Handle business logic, process requests, approvals, and fulfillments, integrate with third-party systems/services using the API Gateway, perform input validation, and enforce role-based access controls.

3. **API Gateway**
   - **Technology**: Azure API Gateway.
   - **Responsibility**: Facilitate all external integrations by proxying requests between the backend API and third-party services.

4. **Database**
   - **Technology**: MSSQL.
   - **Responsibility**: Store request records, approval and rejection decisions, fulfillment and issued records, audit logs, and settings/configuration data.

5. **Authentication Service**
   - **Technology**: Microsoft Entra ID (future integration).
   - **Responsibility**: Manage user logins, employee profiles, department assignments, manager and role mappings to ensure secure and role-based access control.

6. **Notifications Service**
   - **Technology**: Microsoft Teams or Email (future integration).
   - **Responsibility**: Send notifications for request assignments, reminders, and status updates (approvals/rejections).

7. **Inventory/Procurement Integration**
   - **Technology**: Inventory/Procurement System (future integration).
   - **Responsibility**: Provide real-time equipment availability, stock status, and asset tracking to assist in fulfilling requests efficiently.

8. **IT Service Management (ITSM) Integration**
   - **Technology**: Jira Service Management or ServiceNow (future integration).
   - **Responsibility**: Create and link tickets for approved IT service requests to streamline IT fulfillment processes.

9. **Documentation Service**
   - **Technology**: Confluence or SharePoint (future integration).
   - **Responsibility**: Publish or store audit evidence and operating procedures, enabling easy retrieval and sharing.

### Component Interactions
- **Employees → Frontend**: Submit, update, or view their requests for various equipment.
- **Frontend → Backend API**: Relay requests and updates to the server for processing.
- **Backend API → Database**: Store all request-related information including status, fulfillment details, and audit logs.
- **Backend API → API Gateway**: Route third-party integration requests through the API Gateway to ensure security and consistency.
- **API Gateway → Third-Party Services**: Proxy requests for authentication, notifications, inventory data, ticket creation, and document storage.
- **Third-Party Services → Database**: Store and retrieve employee data, status updates, and documentation as needed.
- **Admins and IT → Frontend**: Manage roles, configurations, fulfill requests, view audit logs, and manage documentation.
- **Frontend → Notifications Service**: Send notifications about request statuses, assignment, and reminders.
- **Documentation Service → Database**: Fetch audit logs and other relevant evidences for publishing.

## Data Model
### High-Level Data Entities
1. **User**
   - `UserID` (Primary Key)
   - `Name`
   - `Email`
   - `DepartmentID`
   - `ManagerID`
   - `Role`

2. **Request**
   - `RequestID` (Primary Key)
   - `RequesterID`
   - `CategoryID`
   - `Description`
   - `StatusID`
   - `CreationDate`
   - `ApprovalDate`
   - `IssueDate`

3. **Equipment**
   - `EquipmentID` (Primary Key)
   - `CategoryID`
   - `AssetID`
   - `Availability`

4. **AuditLog**
   - `LogID` (Primary Key)
   - `RequestID`
   - `Action`
   - `UserID`
   - `Timestamp`
   - `Notes`

5. **Category**
   - `CategoryID` (Primary Key)
   - `Name`

6. **Status**
   - `StatusID` (Primary Key)
   - `Name`

7. **Department**
   - `DepartmentID` (Primary Key)
   - `Name`

8. **FulfillmentNote**
   - `NoteID` (Primary Key)
   - `RequestID`
   - `UserID`
   - `Notes`
   - `Timestamp`

9. **ExportedEvidence**
   - `EvidenceID` (Primary Key)
   - `RequestID`
   - `FileName`
   - `FileSize`
   - `UploadDate`

### Relationships
- One-to-Many: **User → Request** (A user can submit multiple requests).
- One-to-Many: **Category → Request** (A request belongs to one category; multiple requests can have the same category).
- One-to-One: **User → Request** (Requester of the request).
- Many-to-One: **Equipment → Request** (One equipment can be requested by multiple requests).

## Security Considerations
### Role-Based Access Control (RBAC)
- Implement role-based access control to ensure that only authorized users can perform specific actions such as submitting requests, approving, or fulfilling them.

### Authentication
- Use Microsoft Entra ID for user authentication and authorization, ensuring secure user credentials management and role mappings.
- Enforce least privilege access to restrict users' permissions only to what is necessary for their roles.

### Logging and Auditing
- Maintain audit logs for all critical actions (create, update, approve, reject, issue). Logs are read-only and stored securely.
- Ensure traceability of actions taken by managers and IT/Admin by recording their user actions within the logs.

### Secure Configuration Management
- Store configuration data securely in Azure Key Vault.
- Validate all user inputs to prevent injection attacks, ensuring basic input validation.

### Input Validation
- Validate form inputs on both frontend and backend to prevent malicious inputs from being processed.

### Compliance Standards
- Align with internal security standards and ISO 27001 expectations as initially required.

## Open Questions
- None further at this stage; all required components and interactions are clearly defined based on the inputs provided.