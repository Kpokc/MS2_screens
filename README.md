# MS2_screens 
# Warehouse TV Screen Messanger

A live demo can be found [here](http://ms2.sslsupports.com/).
Username/Password - on request.

Youtube video [here](https://onisstudio.github.io/notes-and-lists-ms2/).

## UX ##

---
## Project Goals ##

The **goal** of this project is to build a website that will improve communication between admins and warehouse, helps to track ongoing requests, minimize contact between people (COVID-19 awareness). Reduce constant phone calls between departments.
 
## User Goals ##

The website was designed for three types of users: "Admin" (warehouse office), "Material Handler" (warehouse floor), and drivers.

- **"Admin"** can quickly forward request from office to floor. Highlight urgent requests, also update any request if there is a need. Can track requests that are still in progress.

- **"Material Handlers"** can delete request that is no longer actual (picked, received, other canceled, etc...). Can track requests and organize a sequence of picking. The warehouse requirement was to be able listening music in the background. 

- **"Drivers"** can delete request that is no longer actual (delivered, transferred, collected, canceled, other, etc...). Can track requests and organize a sequence of delivery/collection.

## User Stories ##

- As a **user**, I want to add massage.
- As a **user**, I want to delete the message.
- As a **user**, I want to update the message.
- As a **user**, I want to highlight a message.
- As a **user**, I want to select music from Youtube.
 
## Skeleton ##

> - [Wireframes](https://): 
> - SQL tables.
> - One-page website with **4** modal windows, and **1** toggle section.
> - Website with login session, background refresh functions (automatic - 200 sec period and each time user add/delete/update request).
> - Fixed navigation bar.
> - Main section with requests retrieved from the database.
> - Footer with Copyright info and Social Media icons
> - Toggle section - Youtube data API (youtube search and video manipulation).
> - Toggle section - CSS rule set to show this section only on devices wider than 990px. Due to company rules - floor staff is not allowed to listen to music or videos nor watching videos on their/company devices during the work (loading, unloading, picking, receiving, etc...). 


## Features ##

---
### Features Implemented ###
- Login session to control SQL DB granted privileges.
- SQL database with "user" and "message" tables.
- Responsive mobile-first design using a [Bootstrap](https://getbootstrap.com/) framework.
- User-friendly design.
- Easy navigation that collapses on mobile displays and sticks on desktop.
- Functional ADD / DELETE / UPDATE / LOGOUT forms.
- Youtube API for video search.
  
    1. After username and password are entered and the "Login" button is pressed - if data is correct, username and password are going to be assigned to session variables. This will allow the user to retrieve data from DB and manipulate.  
    2. **"ADD"** button - User can add request to the website (all required fields must be filled).
    3. **"DELETE"** button - User can delete request by providing UID number. Example [ UID (125) ]. Or by double-click on request. A request will pop up at the bottom of the "DELETE" form.
    4. **"UPDATE"** button - User can delete request by providing UID number. Example [ UID (125) ]. All "UPDATE" form fields will show the current data of the request. If any data changed by a user, the side status note (Current) is going to change for (Changed). The request will pop up at the bottom of the "UPDATE" form.
    5. **"LOGOUT"** button - Logout / Cancel modal window pops up.
    6. **"YOUTUBE"** button - Toggles down (from top menu) section where user can search for any youtube video and play it. Website refreshes only request section, this allows to play any long video. (requested by the warehouse to listen to podcasts or music on the TV screen). 

### Future Features ###

- Reload function each time data was manipulated within the database 
- Chat section where users can create chat rooms.
- Push notifications.

---

## Technologies Used

### Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/CSS)
-   [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
-   [PHP](https://en.wikipedia.org/wiki/PHP)
-   [SQL](https://en.wikipedia.org/wiki/SQL)

### Frameworks, Libraries & Programs Used

- [jQuery:](https://code.jquery.com/) - JavaScript library. 
- [SCSS](https://sass-lang.com/) - CSS extension.
- [Bootstrap v4.5.3:](https://getbootstrap.com/docs/4.5/getting-started/introduction/) - Bootstrap was used to assist with the responsiveness and styling of the website.
- [Yotube data v3](https://developers.google.com/youtube/v3) - To search and manipulate with videos
- [Google Fonts:](https://fonts.google.com/)  - To import Google fonts.
- [Font Awesome:](https://fontawesome.com/) - To add icons to the site.
- [Git](https://git-scm.com/) - For version control.
- [GitHub:](https://github.com/) - To store the project's code after being pushed from Git.
- [Balsamiq:](https://balsamiq.com/) - To create the Wireframes.
- [HTML Validator](https://validator.w3.org/nu/) - HTML validator.
- [CSS Validator](https://validator.w3.org/) - CSS validator.
---

## Testing ##
---
### index. ###


## Deployment ##

### GitHub Pages ###

1. First login to [GitHub](https://github.com/).
2. Locate the **Repository** and click on settings.
3. Scroll down the settings page till you see GitHub Pages.
4. Then under source choose **_master_** branch by clicking the button.
5. Click Save and wait for the page to refresh.
6. Scroll down again to GitHub pages.
7. Find the URL for the site under GitHub pages.

### Fork  ###

1. Login to [GitHub](https://github.com/).
2. Locate the **Repository**.
3. In the top right corner click **_Fork_** button.

### Clone  ###

1. Login to [GitHub](https://github.com/)
2. Fork the Repository.
3. Then click **Code** under the _Settings_ button.
4. Choose HTTPS, SSH, or GitHub CLI, then click the copy button to the right.
5. Open Git Bash.
6. Change the directory to the location where you want the cloned directory to be made.
7. Type **git clone** and paste the URL you copied before.
8. To create the clone press **Enter**.

---


## Credits


- Code Institute - tutorial "Working With External Resources".
- [Bootstrap](https://getbootstrap.com/)
- [Yotube data](https://developers.google.com/youtube/v3)
- [Sass Basics](https://sass-lang.com/guide)

### Acknowledgements

-   My mentor, for his guidance and feedback.
-   [w3schools](https://www.w3schools.com/default.asp) for useful information.
-   [Stackoverflow](https://stackoverflow.com/) - for general needs
-   [Google](https://www.google.com/) - for general needs.
