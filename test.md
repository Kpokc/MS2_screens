# <p align="center">Testing Report</p>

 ---

## Automated Testing ##
 
### Validation Services ###

The following **validation services** and **linter** were used to check the validity of the website code.

- [W3C Markup Validation](https://validator.w3.org/) to validate HTML.
- [W3C CSS validation](https://jigsaw.w3.org/css-validator/) to validate CSS.
- [JSHint](https://jshint.com/) to validate JavaScript.

---

## Manual Testing 

### Responsivnes ###
- Website was test and working well in browsers (Chrome, Safari, FireFox, Opera, IE).
- Responsivnes was tested on a variety of devices (Desctops, laptops and mobile phones).
- Website tested with Google Mobile-Friendly Test - website is mobile friendly.

### **Functionality Testing** ###
The following table captures the functional testing performed on the website to ensure it works as desired.

|   Test       |Purpose          | Desired Result | Actual Result | Chrome  |
|:------------:|-----------------|----------------|---------------|:------:|
|   001        | Login without Username and Password|Required message pop up| Required message pop up| **PASS** |
|   002        | Login without Username or Password |Required message pop up| Required message pop up |**PASS**|
|   003        | Login with correct Username and Password |Redirected to screen.php| Redirected to screen.php |**PASS**| 
|   004        | Login with incorrect Username and Password  |Incorrect Username or Password message pop up| Incorrect Username or Password message pop up |**PASS**|
|   005        | "ADD" button | Add modal form pop up, input and textarea fields Required | Add message form pop up, input and textarea fields Required |**PASS**|
|   006        | "ADD" request to DB| "Ok" message pop up if required filleds filled out correct  | "Ok" message pop up if required filleds filled out correct |**PASS**|
|   007        | "ADD" request to DB| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**|
|   007        | "DELETE" button |Delete modal form pop up, input and textarea fields Required| Add message form pop up, input and textarea fields Required |**PASS**|
|   008        | "DELETE" request from DB| "Ok" message pop up if required filleds filled out correct  | "Ok" message pop up if required filleds filled out correct |**PASS**|
|   009        | "DELETE" request from DB| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**|
|   010        | "UPDATE" button |Update modal form pop up, input and textarea fields Required| Add message form pop up, input and textarea fields Required |**PASS**| 
|   011        | "UPDATE" form |If UID provided all fields fill up atomaticaly| If UID provided all fields fill up atomaticaly |**PASS**| 
|   012        | "UPDATE" form |If UID provided and any field value was changed, notice mark changes and become red| If UID provided and any field value was changed, notice mark changes and become red |**PASS**| 
|   013        | "UPDATE" request| "Ok" message pop up if required filleds filled out correct  | "Ok" message pop up if required filleds filled out correct |**PASS**| 
|   014        | "UPDATE" request| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**| 
|   015        | "LOG OUT" form "CLOSE" button |Log out - cancelled| Log out - cancelled |**PASS**| 
|   016        | "LOG OUT" form "LOG OUT" button |Session aborted, user transfered to Log In page| Session aborted, user transfered to Log In page |**PASS**| 
|   017        | "YOUTUBE" button |Toggles down / up "Youtube" section| Toggles down / up "Youtube" section |**PASS**| 
|   018        | "YOUTUBE" paggination buttons |Previous / Next buttons are disabled if search not performed |Previous / Next buttons are disabled if search not performed |**PASS**|
|   019        | "YOUTUBE" search |Retrievs 10 videos by search word| Retrievs 10 videos by search word |**PASS**|
|   020        | "YOUTUBE" video |Start / Stop any video |Start / Stop any video |**PASS**| 
|   021        | "YOUTUBE" paggination button |Previous disabled until Next is not pressed |Previous disabled until Next is not pressed  |**PASS**| 
|   022        | "YOUTUBE" paggination button |Previous disabled when Next pressed |Previous disabled when Next pressed |**PASS**| 
|   023        | "YOUTUBE" paggination |Previous and Next function is working |Previous and Next function is working |**PASS**| 
|   024        | Request Message Card |When double-click, calls delete function. |When double-click, calls delete function. |**PASS**| 
|   025        | Window resize |When size iz less than 1200px, "Warehouse / Drivers" buttons apares  |When size iz less than 1200px, "Warehouse / Drivers" buttons apares |**PASS**| 
|   026        | Window resize |When size iz less than 990px, hide Youtube button and sections. |When size iz less than 990px, hide Youtube button and sections. |**PASS**| 
|   027        | "Warehouse / Drivers" buttons |Warehouse - show warehouse requests, Drivers - show drivers request  |Warehouse - show warehouse requests, Drivers - show drivers request |**PASS**| 


---


## BUGS ##
-  When "Login" with incorrect Username and/or Password - browser loads login.php, there is no any notification on what is happaning
 -- login.php - statment which checking if SQL query executed didn't work corectly. Also incase SQL query declined header('Location: index.php") changed to "header('Location: index.php?unsuccess=1')". And in index.php i've added if statment to call alert message if "unsuccess=1" is received.
- Update Form - if wrong UID add, request comes back as successful
-- If statment added to check if provided UID number exists in the database. 
- Youtube back and next buttons are working even if search wasn't done
-- HTML attribute added (disabled).