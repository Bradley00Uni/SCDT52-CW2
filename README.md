# SCDT52-CW2
## Hair Salon Website for SCDT52 Coursework 2

Fullstack Web Application for Kaye_the_barber, linked to a Mongoose Database and built using React/Node & Express.

**Testing Credentials:**
*Admin:* admin@outlook.com | password
*Customer:* user@outlook.com | password 

## Version Changes
**Version 1.0:**
*Basic Structure Implemented*

 - Frontend Node Application
 - Backend Express Application
 - Mongoose Database Connection
 - All Databases Created
 - All Models (Excluding Users) Created

**Version 1.1:**
 - Implemented Gallery and Review Screens
 - Screens successfully pull Data from Mongo
 - Imported new 'Darkly.css' Bootstrap Theme
 - Designed new Website Banner

**Version 1.2**
 - User Login and Registration created
 - Passwords are Hashed
 - New Users are added to Mongoose Database
 - JWT Web tokens are generated

**Version 1.3**

 - Created Contact Page
 - Finished Landing Page
 - Services are pulled from Mongoose Database
 - Some Files are renamed for accessibility

**Version 1.4**

 - Completed User Login
 - New Users can be Registered
 - Logout Button added to Header in Navigation Bar
 - User Information displayed on Account Page

**Version 1.5**

 - Implemented Appointment Front-end for Account Page
 - Added Admin-Panel for Appointments
 - Appointments can be Marked as 'Confirmed' by an Admin
 - Account Page styling In-Progress

***Version 1.5.1***

 - Creation of Appointment Screen
 - Review Model reformatted
 - Only logged-in Users can access Appointment Screen
 - New API Routes for Reviews
 - New Reducer and Action for Reviews
 - Reviews can be created through external API software, such as Postman

***Version 1.5.2***

 - Created Temporary .jsx file to store code not currently needed but will be in later Iterations
 - Appointment Form still In-Progress
		 - Updates on Button Press
		 - Shows Available Times based on chosen Date

**Version 1.6**

 - Completed Appointment Form
 - Appointments can be fully booked from Frontend
 - Created & Completed Review Form
 - Reviews can be fully created from Frontend
 - Reviews can be left Anonymously
 - Valid login required to leave Review
 - If Logged out, Review Form will not render

***Version 1.6.1***

 - Editied Appointment Model
 - New Services API Path
 - Moved Appointment Admin-Panel from Account to new Admin-Only Page
 - Admin-User Account Page now the same as regular Users
 - Seperate Header compoment for Admin Users
 - Admin-Only pages cannot be accessed by unauthorised users
 - Admins can now mark Appointments as Complete or Deleted from the system
 - New Services Admin-Panel displays all Services
 - Services can be deleted from the system
 - Groundwork laid to add new Services
 - Empty shells for Admin-Panels of Daily Messages and Users added to Navigation and Screens

***Version 1.6.1.1***
*Bug-Fixing Commit*

 - In Last commit regular users are unable to book appointments, as the API route requires an Admin status
>This was an error, and so the code has been removed.

**Version 1.7**
*Large Update*
 - Completed Admin Panels for: Services, Gallery Items, Users, Daily Messages and Appointments
 - All Services can be fully: Added, Deleted and viewed as a single Table by an Admin
 - All Gallery Items can be fully: Added, Deleted and viewed as a single Table by an Admin
 - All Appointments can be fully: Deleted, Marked as Confirmed, Marked as Complete and viewed as a single table by an Admin
 - All Daily Messages can be fully: Added, Deleted and viewed as a single Table by an Admin - the latest message will always appear on the site
 - All Users can be fully: Deleted, Contacted via Email and viewed as a single Table by Admin
 - Users can: update contact information, change login email and password and request account deletion via email template directly to Client
 - Landing Page is reformatted if user is on Mobile Device
 - Temporary code-store file has been removed
 - Additional styling across webpages
 - Multiple new Pages to complete actions listed above
 - Multiple new API routes to complete actions listed above

**Version 1.8**
*Final Main Version before Submission*

 - Added additional comments throughout Code
 - General tidying and sorting of code
 - Implemented Code changes based on Testing completed for compatibility and functionality
 - Modified Reducers to better show User feedback in Error Messages and Loaders
 - Moved Review Submission Form from separate Component to Main Review Page
 - Added Footer to all Pages containing copyright and personal LinkedIn

***Version 1.8.1***
*Bug-Fixing Commit*

 - Updated Success Message for Account Contact Details edit

***Version 1.8.1.1**
*README update*

 - Updated README File

***Version 1.8.1.2**
*README update*

 - Updated README File
