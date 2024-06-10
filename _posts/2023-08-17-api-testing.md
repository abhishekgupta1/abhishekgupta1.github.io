---
title: "Checklist : API Testing"
header:
  caption: "Checklist : API Testing"
tags:
  - sdet
  - quality-assurance
  - Testing
  - QA
toc: false  
---
---
#### **1. Preparation**
-  Understand API specifications, including endpoints, request methods, request/response formats, headers, params, response schema, authentication methods, and configuration flags.
-  Develop a test plan outlining scope, description, actions, data, expected results.
-  Set up testing environments, mirroring production as closely as possible.
-  Prepare test data for positive and negative scenarios, including mock data for databases or caches.

#### **2. Basic Testing**
-  Verify that all API endpoints are accessible and respond correctly.
-  Test all HTTP methods (GET, POST, PUT, DELETE, etc.) for each endpoint.
-  Test different combinations of query parameters, headers, and body data.

#### **3. Functional Testing**
-  Perform positive testing with valid inputs.
-  Conduct negative testing with invalid inputs, missing parameters, and incorrect data types.
-  Check boundary values and edge cases (e.g., minimum and maximum input sizes).
-  Verify data integrity, ensuring accuracy and correct format.
-  Test CRUD operations for APIs interacting with a database.

#### **4. Configuration Flag Testing**
-  Verify that all configuration flags are recognized and processed correctly.
-  Test different combinations of configuration flags.
-  Ensure the API behaves correctly with default settings when flags are not set.
-  Test the API's response to changes in configuration flags during runtime, if supported.

#### **5. Security Testing**
-  Verify authentication mechanisms (e.g., OAuth, API keys) and test for unauthorized access.
-  Ensure only authorized users can access certain endpoints or perform specific actions.
-  Confirm sensitive data is encrypted in transit using HTTPS.
-  Test for SQL injection, XML injection, and other injection attacks.
-  Check if the API enforces rate limiting to prevent abuse.
-  Ensure input data is validated to prevent attacks such as cross-site scripting (XSS).
   Cross-site scripting (XSS) is an exploit where the attacker attaches code onto a legitimate website that will execute when the victim loads the website. 

#### **6. Performance Testing**
-  Conduct load testing to assess performance under normal and peak conditions.
-  Perform stress testing to determine the API's breaking point.
-  Evaluate how the API scales with increasing users or data volume.
-  Measure response times for various endpoints.

#### **7. Use of Mock Data in DB or Cache**
-  Set up mock data in databases or caches to simulate real scenarios.
-  Ensure mock data remains consistent throughout testing and resets between test runs.

#### **8. Usability Testing**
-  Verify that API documentation is complete, accurate, and easy to understand.
-  Ensure error messages are clear, informative, and helpful for troubleshooting.

#### **9. API Versioning**
-  Test different versions of the API to ensure backward compatibility.
-  Verify that deprecated endpoints and features are properly handled and provide adequate warnings.
-  Ensure version-specific changes and features are correctly implemented and documented.

#### **10. Regression Testing**
-  Implement automated tests to quickly identify regressions.
-  Test the API across different versions to ensure backward compatibility. [SDK Testing]

#### **12. Post-Testing**
-  Log defects or issues found during testing in a defect tracking system.
-  Prepare a summary report of test results, including test coverage, defects found, and their status.
-  Review test results with stakeholders and retest any defects after they have been fixed.
