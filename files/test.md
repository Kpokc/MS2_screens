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

### Responsiveness ###
- Website was tested and working well in browsers (Chrome, Safari, Firefox, Opera, IE).
- Responsiveness was tested on a variety of devices (Desktop, laptops, and mobile phones).
- Website tested with Google Mobile-Friendly Test - the website is mobile friendly.

### **Functionality Testing** ###
The following table captures the functional testing performed on the website to ensure it works as desired.

|   Test       |Purpose          | Desired Result | Actual Result | Chrome  |
|:------------:|-----------------|----------------|---------------|:------:|
|   001        | Login without Username and Password|Error messages if required fields not filled | Error messages if required fields not filled | **PASS** |
|   002        | Login without Username or Password |Error messages if required fields not filled| Error messages if required fields not filled |**PASS**|
|   003        | Login with correct Username and Password |Redirected to screen.php| Redirected to screen.php |**PASS**| 
|   004        | Login with incorrect Username and/or Password  |Incorrect Username or Password message pop up| Incorrect Username or Password message pop up |**PASS**|
|   005        | "ADD" button | Add modal form pop up | Add message form pop up|**PASS**|
|   006        | "ADD" request to DB| "Ok" message pop up if required fields are filled| "Ok" message pop up if required fields are filled|**PASS**|
|   007        | "ADD" request to DB| "Error" message pop up if required fields filled out incorrectly  | "Error" message pop up if required fields filled out incorrectly |**PASS**|
|   008        | "DELETE" button |Delete modal form pop up, input and textarea fields Required| Add message form pop up, input and textarea fields Required |**PASS**|
|   009        | "DELETE" request from DB| "Ok" message pop up if required "UID" provided  | "Ok" message pop up if required "UID" provided |**PASS**|
|   010        | "DELETE" request from DB| "Error" message pop up if required UID is incorrect  | "Error" message pop up if required UID is incorrect |**PASS**|
|   011        | "UPDATE" button | Update modal form pop up| Update modal form pop up|**PASS**| 
|   012        | "UPDATE" form |If UID provided all fields fill up automatically| If UID provided all fields fill up automatically |**PASS**| 
|   013        | "UPDATE" form |If UID provided and any field value was changed, notice mark changes and become red| If UID provided and any field value was changed, notice mark changes and become red |**PASS**| 
|   014        | "UPDATE" request| "Ok" message pop up  if required fields were filled  | "Ok" message pop up  if required fields were filled |**PASS**| 
|   015        | "UPDATE" request| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**| 
|   005        | "LOG OUT" button | Log Out modal form pop up | Log Out message form pop up|**PASS**|
|   016        | "LOG OUT" / "CLOSE" button |Log out - cancelled| Log out - cancelled |**PASS**| 
|   017        | "LOG OUT" / "LOG OUT" button |Session aborted, user transferred to login page| Session aborted, user transferred to login page |**PASS**| 
|   018        | "YOUTUBE" button |Toggles down / up "Youtube" section| Toggles down / up "Youtube" section |**PASS**| 
|   019        | "YOUTUBE" pagination buttons |Previous / Next buttons are disabled if search not performed |Previous / Next buttons are disabled if search not performed |**PASS**|
|   020        | "YOUTUBE" search | Retrieved 10 videos by search word| Retrieved 10 videos by search word |**PASS**|
|   021        | "YOUTUBE" video |Start / Stop any video |Start / Stop any video |**PASS**| 
|   022        | "YOUTUBE" pagination button | Previous button disabled until Next button is not assigned to second search page | Previous button disabled until Next button is not assigned to second search page  |**PASS**| 
|   023        | "YOUTUBE" pagination button | Previous button undisabled when Next button was assigned to second search page | Previous button undisabled when Next button was assigned to second search page |**PASS**| 
|   024        | "YOUTUBE" pagination | Previous button and Next button pagination works | Previous button and Next button pagination works |**PASS**| 
|   025        | Request Card | When double-click, calls delete function. | When double-click, calls delete function. |**PASS**| 
|   026        | Window resize | When screen size is less than 1200px, "Warehouse / Drivers" buttons appears  | When screen size is less than 1200px, "Warehouse / Drivers" buttons appears |**PASS**| 
|   027        | Window resize | When screen size is less than 990px, Youtube button and sections "display-none" | When screen size is less than 990px, Youtube button and sections "display-none" |**PASS**| 
|   028        | "Warehouse / Drivers" buttons | Warehouse - show warehouse requests, Drivers - show drivers request  | Warehouse - show warehouse requests, Drivers - show drivers request |**PASS**| 


---


## BUGS ##
-  When "Login" with incorrect Username and/or Password - browser loads login.php, there is no notification on what is happened.
 **Solution** - PHP / SQL statement added to login.php which checking if SQL query executed successfully or not. In case SQL query declined header('Location: index.php") changed to "header('Location: index.php?unsuccess=1')". To index.php I've added if statement to call alert message if "unsuccess=1" is received.
- Update Form - Incorrect UID entered, but server response comes back as successful.
**Solution** - If statement updated to check if provided UID number exists in the database. If SQL response is positive - Update query executes.
- Trying to Add / Delete/ Update - could not receive a correct response from the server.
**Solution** - To change [HTTP Response](https://www.php.net/manual/en/function.http-response-code.php) depending on SQL query result (if response > 0 - 200, else 400). Then catch response with [complete: function (data)](https://stackoverflow.com/questions/23283276/execute-function-after-ajax-call-is-complete) and throughout if statement call correct function.
- PHP INI - to send correct time (user current time) into "time" table, but not current server time.