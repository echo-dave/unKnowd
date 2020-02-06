# The unKnowd

A community platform to help bring the community back into community. 

This project set out to solve a real world problem of a local art community: people felt left out because they didn’t know what was going on with events and gatherings. As a result, one of the requirements became having viewer displays available for visitors and those that don’t log into anything. Primary key components used to build the platform are React.js, WebSockets, and MongoDB. All posts and updates are broadcast and updated in realtime to displays and users.  

Real community for real people without the social stalking.

## Highlights
- Realtime updating of events to the public via available public displays [https://unknowd.herokuapp.com/viewer](https://unknowd.herokuapp.com/viewer)
- Current design goals only make public events available to viewer displays
- Users can communicate with the community without having to first friend everyone and or pass around information - need to borrow a ladder or need a hand? Ask the real people in you local community
- Users can upload photos so it’s easier to recognize people you don’t see often in the community and applies that photo to posts and events
- Community members can post events like a simple gathering for food or a gallery opening across town

![GitHub issues by-label](https://img.shields.io/github/issues-raw/echo-dave/unKnowd/bug) ![GitHub issues by-label](https://img.shields.io/github/issues-raw/echo-dave/unKnowd/enhancement?color=green) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/echo-dave/unKowd) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/echo-dave/unKnowd) ![GitHub last commit](https://img.shields.io/github/last-commit/echo-dave/unKnowd) ![GitHub contributors](https://img.shields.io/github/contributors/echo-dave/unKowd) ![GitHub](https://img.shields.io/github/license/echo-dave/unKnowd) 


## Technology

- Socketio websockets real time updating to our view display and connected users
- ReactJS providing a fast responsive application minimizing page reload times
- Google Maps showing where in the area posted events may be happening
- Bcrypt and JSON Web Tokens providing authentication
- Express-fileupload with Cloudinary hosting granting persistent photo uploads
- MongoDB with Mongoose ODM storing user information, photo urls, and content
- Bulma CSS framework and sass variables allowing simple flexible styling
- React-datepicker reliable cross-brosser date picking method for consistent database entry

### Updates
**Issues for Enahncements / features can be tracked:** [Enhancement Issues](https://github.com/echo-dave/unKnowd/issues?utf8=✓&q=is%3Aissue+is%3Aopen+label%3Aenhancement)

As a work in progress here’s what what’s been added:

- lots of styling work for better readability
- replies to posts and comments
- photo uploads for comments
- add close button to reply without submitting reply
- broke out some components in an effort to start code cleanup
- added a user profile page for updating info - click name / photo top right
- added signup form validations that were missing
- realtime comment updating is now working

![mobile login and posts](readmeImages/loginMobile_posts.jpg)
![mobile menu and events](readmeImages/mobileMenu_events.jpg)
![mobile add post and add event](readmeImages/addPostMobile_addEvent.jpg)
