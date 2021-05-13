# MS2_screens 
# Warehouse TV Screen Messanger

A live demo can be found [here](http://ms2.sslsupports.com/).
Username/Password - on request.

Youtube video [here](https://onisstudio.github.io/notes-and-lists-ms2/).

---
## Content ##


  1. [UX (User Experience)](#ux)
  1.1 [Project Goals](#project-goals)
  1.2 [User Goals](#user-goals)
  1.3 [User Stories](#user-stories)
  1.4 [Skeleton](#skeleton)
  2. [Features](#features)
  2.1 [Features Implemented](#features-implemented)
  2.2[Future Features](#future-features)
  3. [Technologies Used](#technologies-used)
  3.1 [Languages Used](#languages-used)
  3.2 [Frameworks, Libraries & Programs Used](#frameworks)
  4. [Testing](#testing)
  5. [Deployment](#deployment)
  5.1 [GitHub Pages](#github-pages)
  5.2 [Fork](#fork)
  5.3 [Clone](#clone)
  6. [Credits](#credits)
  7. [Acknowledgements](#acknowledgements)

## 1. UX ##

---
## 1.1 Project Goals ##

The **goal** of this project is to build a website that will improve communication between admins and warehouse, helps to track ongoing requests, minimize contact between people (COVID-19 awareness). Reduce constant phone calls between departments.
 
## 1.2 User Goals ##

The website was designed for three types of users: "Admin" (warehouse office), "Material Handler" (warehouse floor), and drivers.

- **"Admin"** can quickly forward request from office to floor. Highlight urgent requests, also update any request if there is a need. Can track requests that are still in progress.

- **"Material Handlers"** can delete request that is no longer actual (picked, received, other canceled, etc...). Can track requests and organize a sequence of picking. The warehouse requirement was to be able listening music in the background. 

- **"Drivers"** can delete request that is no longer actual (delivered, transferred, collected, canceled, other, etc...). Can track requests and organize a sequence of delivery/collection.

## 1.3 User Stories ##

- As a **user**, I want to add massage.
- As a **user**, I want to delete the message.
- As a **user**, I want to update the message.
- As a **user**, I want to highlight a message.
- As a **user**, I want to select music from Youtube.
- As a **user**, I want to use this website on TV, desctop and mobile devices.

 
## 1.4 Skeleton ##

> - [Wireframe here](https://github.com/Kpokc/MS2_screens/blob/main/files/MS2%20Wireframe.png) 
> - [SQL tables here](https://github.com/Kpokc/MS2_screens/blob/main/files/pick_test%20db.pdf)
> - One-page website with **4** modal windows, and **1** toggle section.
> - Website with login session, background refresh functions (automatic - 200 sec period and each time user add/delete/update request).
> - Fixed navigation bar.
> - Main section with requests retrieved from the database.
> - Footer with Copyright info and Social Media icons
> - Toggle section - Youtube data API (youtube search and video manipulation).


## 2. Features ##

---
### 2.1 Features Implemented ###
- Login session to control SQL DB granted privileges.
- SQL database with "user" and "message" tables.
- Responsive mobile-first design using a [Bootstrap](https://getbootstrap.com/) framework.
- User-friendly design.
- Easy navigation that collapses on mobile displays and sticks on desktop.
- Functional ADD / DELETE / UPDATE / LOGOUT forms.
- Youtube API for video search.
  
    1. Login.
    1.1. When username and password are entered, and the "Login" button is pressed - if data is correct, username and password are going to be assigned to PHP session variables. This will allow the user to retrieve/delete/update data from SQL DB depending on granted permissions.  
    1.2. Ussername or/and Password - incorrect, then notification message pop up "Incorrect Username or Password!".
    *Above checked via PHP and SQL functions. PHP opens new connection to DB and performs a query against the database.
    If result is **"true"** - user is loged in and his data assigned to session variables.
    If result is **false** - login.php forward user to index.php and send "unsuccess=1" message to that page, where **isset $_GET** set to catch this message and call user alert message.*

    2. **"ADD request"** 
    2.1. ADD button - modal window and form pop up. Where user can select and provide information regarding request.
    2.2. Insert fields - input event listener set up to check, if length of user input string is not exceeding 16 charecters. **
    2.3. If transaction aborted: input fields, textarea - all data missing. Labels turns back to normal condition.
    
    3. **"DELETE request"** 
    3.1. DELETE button - modal window and form pop up. Where user can select which request to delete.
    3.2. UID Insert field - user must provide "UID" number *[number is in the brackets:  UID (**156**) in this case it is **156** ]*. ** ' *** ' ****'
    3.3. User can DELETE any request by double click on it, UID number automaticali forwards into insert field. ***
    3.4. If transaction aborted: input fields, textarea - all data missing. Labels turns back to normal condition.
    
    4. **"UPDATE"** 
    4.1. UPDATE button - modal window and form pop up. Where user can select which request to update.
    4.2. UID Insert field - user must provide "UID" number *[number is in the brackets:  UID (**156**) in this case it is **156** ]*. ** ' *** ' ****'
    4.3. All insert, select, textarea fields are updates with data from selected request.
    4.4. If any input, select, textare fields are changed aside label turns into red and change text from "Current" to "Changed".
    4.5. If transaction aborted: input fields, textarea - all data missing. Labels turns back to normal condition.
    
    5. **"LOGOUT"**
    5.1 LOGOUT button - modal window and form pop up. Where users can select to stay or leave the website.
    
    6. **"YOUTUBE"** 
    6.1. YOUTUBE button - Toggles down Youtube section.
    6.2. User can use search field to retrieve Youtube videos.
    6.3. "Previous" nad "Next" buttons added for pagination (10 videos per page).
    
>   ***
>   *Applies to all: The Website refreshes every 200 seconds to keep users session on. Also on the user side, website refreshes every time user use ADD / DELETE / UPDATE options. Refreshing happens only for the main section (where all request are displayed). This done on warehouse request - to be able to listen to the Youtube videos without interuptions. (Youtube videos stops to play every whole website refresh)*
>   ***
>    ** *If any input field length exceeds 16 characters bottom "ADD/DELETE/UPDATE" button disables - so user can't send request to DB (This rule is applyed to prevent error on SQL side, when user string length is greater than set in DB). Input charecters and label becomes red, label text show alert message to user "- 16 Characters maximum!".*
>   ***
>    *** *Selected request will appares under the form*
>   ***
>    ****  Before processing all data to DB, I am doing a small check if requested row exists. This check prevents situation when response from sever is "OK", but SQL query didn't execute. 
-- SQL executes a query against the table with a reference of UID that the user provides. If the retrieved result is greater than zero,  only then SQL will executes query with all data. With help of php I am assigning "200" number to server respons. If checking query is error, main query wont executes and I am assigning "400" to server response. Then after JQuery is going to catch respons and depending on the number in it, show to the users if request was sent or not. (In this case I am assigning numbers to server response my self, because in goddady hosting I am getting back "200" response each time php estabilishes connection to DB, no matter if querry was executed or not.) *
>   ***

### 2.2 Future Features ###

- Security (Prevent SQL injection)
- Reload function which will reload main section for all users each time data added to DB. 
- Chat section where users can create chat rooms, communicate, and leave messages.
- Push notifications.

---

## 3. Technologies Used

### 3.1 Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/CSS)
-   [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
-   [PHP](https://en.wikipedia.org/wiki/PHP)
-   [SQL](https://en.wikipedia.org/wiki/SQL)

### 3.2 Frameworks, Libraries & Programs Used

- [jQuery:](https://code.jquery.com/) - JavaScript library. 
- [SCSS](https://sass-lang.com/) - CSS extension.
- [Bootstrap v4.5.3:](https://getbootstrap.com/docs/4.5/getting-started/introduction/) - Bootstrap was used to assist with the responsiveness and styling of the website.
- [Yotube data v3](https://developers.google.com/youtube/v3) - To search and manipulate with videos
- [Google Fonts:](https://fonts.google.com/)  - To import Google fonts.
- [Font Awesome:](https://fontawesome.com/) - To add icons to the site.
- [Git](https://git-scm.com/) - For version control.
- [GitHub:](https://github.com/) - To store the project's code after being pushed from Git.
- [Balsamiq:](https://balsamiq.com/) - To create the Wireframe.
- [HTML Validator](https://validator.w3.org/nu/) - HTML validator.
- [CSS Validator](https://validator.w3.org/) - CSS validator.
---

## 4. Testing ##

[Test.md here](https://github.com/Kpokc/MS2_screens/blob/main/files/test.md) 

---

## 5. Deployment ##

### 5.1 GitHub Pages ###

1. First login to [GitHub](https://github.com/).
2. Locate the **Repository** and click on settings.
3. Scroll down the settings page till you see GitHub Pages.
4. Then under source choose **_master_** branch by clicking the button.
5. Click Save and wait for the page to refresh.
6. Scroll down again to GitHub pages.
7. Find the URL for the site under GitHub pages.

### 5.2 Fork  ###

1. Login to [GitHub](https://github.com/).
2. Locate the **Repository**.
3. In the top right corner click **_Fork_** button.

### 5.3 Clone  ###

1. Login to [GitHub](https://github.com/)
2. Fork the Repository.
3. Then click **Code** under the _Settings_ button.
4. Choose HTTPS, SSH, or GitHub CLI, then click the copy button to the right.
5. Open Git Bash.
6. Change the directory to the location where you want the cloned directory to be made.
7. Type **git clone** and paste the URL you copied before.
8. To create the clone press **Enter**.

---


## 6. Credits


- Code Institute - tutorial "Working With External Resources".
- [Bootstrap](https://getbootstrap.com/)
- [Yotube data](https://developers.google.com/youtube/v3)
- [Sass Basics](https://sass-lang.com/guide)

### 7. Acknowledgements

-   My mentor, for his guidance and feedback.
-   [w3schools](https://www.w3schools.com/default.asp) for useful information.
-   [Stackoverflow](https://stackoverflow.com/) - for general needs
-   [Google](https://www.google.com/) - for general needs.
