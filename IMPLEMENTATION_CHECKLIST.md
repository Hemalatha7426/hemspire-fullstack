Implementation Plan ChecklistOriginal
 Question/TaskQuestion:
 
  <h1>Hemspire Poem Application</h1>
  <h2>Overview</h2>
  <p>You are tasked with developing a "Hemspire Poem Application," a full-stack content management system. The application will allow public users to browse and consume various forms of poetry (text, audio, video) and submit contact/feedback messages. It will also provide a secure admin panel for administrators to manage all content (poems, audio, videos), review feedback, and manage user accounts. The system includes JWT-based authentication and role-based authorization (USER and ADMIN).</p>
  <h2>Question Requirements</h2>
  <h3>Backend Requirements (Spring Boot)</h3>
  <h4>1. Data Models</h4>
  <p>Create entities with appropriate relationships:</p><ul><li><b>User</b>: <code>id</code>, <code>name</code>, <code>email</code>, <code>password</code>, <code>role</code> (e.g., "USER", "ADMIN")</li><li><b>Poem</b>: <code>id</code>, <code>title</code>, <code>description</code> (long text), <code>imagePath</code> (String)</li><li><b>Audio</b>: <code>id</code>, <code>title</code>, <code>description</code>, <code>audioPath</code> (String)</li><li><b>Video</b>: <code>id</code>, <code>title</code>, <code>description</code>, <code>videoPath</code> (String)</li><li><b>ContactMessage</b>: <code>id</code>, <code>name</code>, <code>email</code>, <code>phoneNumber</code>, <code>subject</code>, <code>message</code></li></ul>
  <h4>2. Security Requirements</h4>
  <ul><li>Implement JWT-based authentication for securing endpoints.</li><li>Implement role-based access control:<ul><li><b>Public</b>: Register, Login, View Content (Poems, Audio, Videos), Submit Contact Form.</li><li><b>Admin</b>: All content management (Create, Update, Delete Poems/Audio/Videos), View/Delete Contact Messages, View/Delete Users.</li></ul></li><li>Implement <code>CustomUserDetailsService</code> for loading users.</li><li>Provide secure password encoding using <code>PasswordEncoder</code>.</li></ul>
  <h4>3. RESTful API Endpoints</h4>
  <h5>Auth Endpoints (<code>/api/auth</code>)</h5>
  <ul><li><code>POST /register</code>: Register a new user.</li><li><code>POST /login</code>: Authenticate a user and return a JWT.</li></ul><h5>User Endpoints (<code>/api/users</code>) - ADMIN ONLY</h5><ul><li><code>GET /</code>: Get a list of all registered users.</li><li><code>DELETE /{id}</code>: Delete a user by ID.</li></ul>
  <h5>Poem Endpoints (<code>/api/poems</code>)</h5>
  <ul><li><code>POST /admin</code>: (Admin) Add a new poem with an image upload.</li><li><code>PUT /admin/{id}</code>: (Admin) Update a poem (with optional new image).</li><li><code>DELETE /admin/{id}</code>: (Admin) Delete a poem by ID.</li><li><code>GET /</code>: (Public) Get all poems.</li><li><code>GET /{id}</code>: (Public) Get a single poem by ID.</li><li><code>GET /search</code>: (Public) Search poems by title (<code>?keyword=...</code>).</li></ul>
  <h5>Audio Endpoints (<code>/api/audio</code>)</h5>
  <ul><li><code>POST /admin</code>: (Admin) Add new audio with file upload.</li><li><code>PUT /admin/{id}</code>: (Admin) Update audio (with optional new file).</li><li><code>DELETE /admin/{id}</code>: (Admin) Delete audio by ID.</li><li><code>GET /</code>: (Public) Get all audio files.</li><li><code>GET /{id}</code>: (Public) Get a single audio file by ID.</li><li><code>GET /search</code>: (Public) Search audio by title (<code>?keyword=...</code>).</li></ul>
  <h5>Video Endpoints (<code>/api/videos</code>)</h5>
  <ul><li><code>POST /admin</code>: (Admin) Add a new video with file upload.</li><li><code>PUT /admin/{id}</code>: (Admin) Update a video (with optional new file).</li><li><code>DELETE /admin/{id}</code>: (Admin) Delete a video by ID.</li><li><code>GET /</code>: (Public) Get all videos.</li><li><code>GET /search</code>: (Public) Search videos by title (<code>?keyword=...</code>).</li></ul>
  <h5>Contact Endpoints (<code>/api/contact</code>)</h5>
  <ul><li><code>POST /submit</code>: (Public) Submit a new contact/feedback message.</li><li><code>GET /admin</code>: (Admin) Get all feedback messages.</li><li><code>GET /admin/{id}</code>: (Admin) Get feedback by ID.</li><li><code>DELETE /admin/{id}</code>: (Admin) Delete feedback by ID.</li><li><code>GET /admin/search</code>: (Admin) Search feedback by subject (<code>?keyword=...</code>).</li></ul>
  <h4>4. Service Layer</h4>
  <p>Implement service classes for all business logic:</p><ul><li><b>UserService</b>: Handle user registration and management.</li><li><b>PoemService</b>: Handle poem CRUD and file operations.</li><li><b>AudioService</b>: Handle audio CRUD and file operations.</li><li><b>VideoService</b>: Handle video CRUD and file operations.</li><li><b>ContactService</b>: Handle feedback submission and management.</li></ul>
  <h4>5. File Handling</h4>
  <ul><li>Implement logic to save uploaded files (images, audio, video) to an external <code>/uploads</code> directory.</li><li>Configure Spring Boot to serve static content from this <code>/uploads</code> directory.</li></ul><h3>Frontend Requirements (React)</h3><p>(Inferred from common full-stack application structure)</p>
  <h4>1. Components</h4>
  <ul><li><b>Auth</b>: <code>Login</code>, <code>Register</code> components.</li><li><b>Public</b>: <code>Home</code>, <code>PoemList</code>, <code>PoemDetail</code>, <code>AudioList</code>, <code>VideoList</code>, <code>ContactForm</code>, <code>Navbar</code>.</li><li><b>Admin</b>: <code>AdminDashboard</code>, <code>ContentManagement</code> (with forms for Poem, Audio, Video), <code>UserManagement</code>, <code>FeedbackViewer</code>.</li><li><b>Common</b>: <code>AdminRoute</code> (protected route), <code>Header</code>, <code>Footer</code>.</li></ul>
  <h4>2. Routing</h4>
  <p>Implement React Router for all pages and views (e.g., <code>/login</code>, <code>/poems</code>, <code>/poems/:id</code>, <code>/admin/dashboard</code>).</p><h4>3. API Integration</h4><p>Create service modules (e.g., <code>authService.js</code>, <code>poemService.js</code>) using Axios to interact with all backend endpoints.</p>
  <h4>4. State Management</h4>
  <p>Use Context API or Redux to manage global authentication state (user, token, roles).</p>
  
Detailed Step Checklist
Step 1: Read Spring Boot project dependencies and analyze backend boilerplate structure
[x] Status: ✅ Completed

Files to modify:

/pom.xml (spring-boot-starter-web, data-jpa, security, jjwt, springdoc-openapi)

/src/main/resources/application.properties (database, server port, multipart, file paths)

Description: This step ensures familiarity with project structure and validates that all required libraries are present for subsequent implementation (entities, persistence, security, file uploads, REST).

Step 2: Implement Data Models (Entities)
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/model/User.java

/src/main/java/com/examly/springapp/model/Poem.java

/src/main/java/com/examly/springapp/model/Audio.java

/src/main/java/com/examly/springapp/model/Video.java

/src/main/java/com/examly/springapp/model/ContactMessage.java

Description: Establishes persistent data models for all application entities as per requirements.

Step 3: Create Repositories for Data Access
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/repository/UserRepository.java

/src/main/java/com/examly/springapp/repository/PoemRepository.java

/src/main/java/com/examly/springapp/repository/AudioRepository.java

/src/main/java/com/examly/springapp/repository/VideoRepository.java

/src/main/java/com/examly/springapp/repository/ContactRepository.java

Description: Allows data access and persistence for all entities using Spring Data JPA. Includes custom query methods for search functionality.

Step 4: Implement Spring Security Infrastructure
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/config/SecurityConfig.java

/src/main/java/com/examly/springapp/config/CustomUserDetailsService.java

/src/main/java/com/examly/springapp/security/JwtUtil.java

/src/main/java/com/examly/springapp/security/JwtRequestFilter.java

Description: Configures web security, defines public/private routes, sets up password encoding, and implements JWT generation, validation, and request filtering.

Step 5: Implement Exception Handling Infrastructure
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/exception/GlobalExceptionHandler.java

/src/main/java/com/examly/springapp/exception/ResourceNotFoundException.java

Description: Provides robust, user-friendly error handling for REST APIs, returning standard JSON error responses for 404, 400, and 500 status codes.

Step 6: Develop Service Layer for Business Logic
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/service/UserService.java

/src/main/java/com/examly/springapp/service/PoemService.java

/src/main/java/com/examly/springapp/service/AudioService.java

/src/main/java/com/examly/springapp/service/VideoService.java

/src/main/java/com/examly/springapp/service/ContactService.java

Description: Centralizes all business logic, including user registration, password encoding, CRUD operations, file upload/storage logic, and mapping between entities and DTOs.

tep 7: Create Controllers with All Required REST Endpoints
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/controller/AuthController.java

/src/main/java/com/examly/springapp/controller/UserController.java

/src/main/java/com/examly/springapp/controller/PoemController.java

/src/main/java/com/examly/springapp/controller/AudioController.java

/src/main/java/com/examly/springapp/controller/VideoController.java

/src/main/java/com/examly/springapp/controller/ContactController.java

Description: Implements all required API endpoints, maps requests to service methods, and handles request/response DTOs. Includes @Operation tags for OpenAPI documentation.

Step 8: Configure File Serving, CORS, and OpenAPI
[x] Status: ✅ Completed

Files to create:

/src/main/java/com/examly/springapp/config/WebConfig.java (For CORS and file serving addResourceHandlers)

/src/main/java/com/examly/springapp/config/OpenApiConfig.java (For Swagger/OpenAPI UI)

Description: Allows the React frontend to communicate with the backend (CORS), enables serving of uploaded files, and configures the OpenAPI documentation.

Step 9: Implement All Backend JUnit Test Cases (Controllers/Service Layer)
[x] Status: ✅ Completed

Files to create:

/src/test/java/com/examly/springapp/controller/AuthControllerTest.java

/src/test/java/com/examly/springapp/controller/PoemControllerTest.java

/src/test/java/com/examly/springapp/service/PoemServiceTest.java

(etc. for all controllers and services)

Description: Ensures each backend endpoint and service method behaves as required, validations and error handling are correct, and all business logic is robust.

Step 10: Compile and Run Backend (Spring Boot) Tests
[x] Status: ✅ Completed

Description: Validates Spring Boot code compiles and passes all required JUnit test cases.

Step 11: Read and analyze React frontend dependencies and structure
[x] Status: ✅ Completed

Files to modify:

/reactapp/package.json (react, react-router-dom, axios, jwt-decode)

Description: Ensures correct setup for adding UI components, routing, style and service utilities, and test files.

Step 12: Implement UI, Routing, and API Services
[x] Status: ✅ Completed

Files to create:

/reactapp/src/App.js (Main router setup)

/reactapp/src/services/authService.js

/reactapp/src/services/poemService.js

/reactapp/src/services/audioService.js

/reactapp/src/services/videoService.js

/reactapp/src/services/contactService.js

/reactapp/src/components/Login.js

/reactapp/src/components/Register.js

/reactapp/src/components/PoemList.js

/reactapp/src/components/AdminDashboard.js

(etc. for all required components)

Description: Delivers all functional frontend UI for public and admin workflows, with correct API integration, React Router setup, and auth state management.

Step 13: Implement All Jest Test Cases for React Components
[x] Status: ✅ Completed

Files to create:

/reactapp/src/components/Login.test.js

/reactapp/src/components/PoemList.test.js

/reactapp/src/components/AdminDashboard.test.js

Description: Ensures UI components are tested for rendering, user interaction, and API call mocking using Jest and React Testing Library.

Step 14: Lint, Compile, and Test React Frontend
[x] Status: ✅ Completed

Description: Validates that the React frontend builds, passes all style and code standards, and passes all Jest tests.

Completion Status
Step,Status,Completion Time
Step 1,✅ Completed,2025-10-28 09:15:00
Step 2,✅ Completed,2025-10-28 10:30:15
Step 3,✅ Completed,2025-10-28 11:05:20
Step 4,✅ Completed,2025-10-28 14:20:45
Step 5,✅ Completed,2025-10-28 15:00:10
Step 6,✅ Completed,2025-10-29 11:45:30
Step 7,✅ Completed,2025-10-29 16:10:00
Step 8,✅ Completed,2025-10-29 17:00:00
Step 9,✅ Completed,2025-10-30 15:00:00
Step 10,✅ Completed,2025-10-30 16:30:00
Step 11,✅ Completed,2025-10-31 09:00:00
Step 12,✅ Completed,2025-11-01 17:30:00
Step 13,✅ Completed,2025-11-02 11:00:00
Step 14,✅ Completed,2025-11-02 12:00:00

Notes & Issues
Errors Encountered

All implementation steps and testing were completed successfully.

Important DecisionsFile Storage: 

Chose an external uploads/ directory for persistent file storage, separate from the application JAR. Configured WebConfig to serve these files statically.
Security: Implemented admin-only endpoints using @PreAuthorize("hasRole('ADMIN')") and configured SecurityConfig to enforce this at the HTTP request level.
API Documentation: Integrated springdoc-openapi to provide a Swagger UI for API testing and documentation, as seen in the controller annotations.

Next Actions

All implementation and testing are complete. The application is ready for deployment.