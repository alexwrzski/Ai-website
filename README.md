This code creates a login page with:

Username/Email field                            // completed
Password field                                  // completed
Login button                                    // completed
Register link that opens a modal form           // completed


The register modal includes:

Username/Email field                 // completed
Password field                       // completed
Confirm Password field               // completed
Register button                      // completed



Features:

Simple validation for both forms
A dark theme as requested (#333 background and #444 container)           // completed
Rounded corners on the input fields and containers                       // completed
Shadow effect on the login container                                     // completed
Basic password hashing using MD5 (not secure in production)              // need proper security



To make this fully functional:

Add an actual database (like MySQL or MongoDB)
Use a proper password hashing library (bcrypt.js is recommended)
Implement server-side validation
Add CSRF protection
Implement session management