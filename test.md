# <p align="center">Testing Report</p>

## [Contents:](#contents)

 - [Manual Testing](#manual-testing)

## Manual Testing 

### **Functionality Testing** ###
The following table captures the functional testing performed on the website to ensure it works as desired.

|   Test       |Purpose          | Desired Result | Actual Result | Chrome  | Firefox |
|:------------:|-----------------|----------------|---------------|:------:|:-------:|
|   001        | Login without Username and Password|Required message pop up| Required message pop up| **PASS** | **PASS** |
|   002        | Login without Username or Password |Required message pop up| Required message pop up |**PASS**| **PASS** |
|   003        | Login with correct Username and Password |Redirected to screen.php| Redirected to screen.php |**PASS**| **PASS** |
|   004        | Login with incorrect Username and Password  |Incorrect Username or Password message pop up| Incorrect Username or Password message pop up |**PASS**| **PASS** |
|   005        | "ADD" button | Add modal form pop up, input and textarea fields Required | Add message form pop up, input and textarea fields Required |**PASS**| **PASS** |
|   006        | "ADD" request to DB| "Ok" message pop up if required filleds filled out correct  | "Ok" message pop up if required filleds filled out correct |**PASS**| **PASS** |
|   007        | "ADD" request to DB| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**| **PASS** |
|   007        | "DELETE" button |Delete modal form pop up, input and textarea fields Required| Add message form pop up, input and textarea fields Required |**PASS**| **PASS** |
|   008        | "DELETE" request from DB| "Ok" message pop up if required filleds filled out correct  | "Ok" message pop up if required filleds filled out correct |**PASS**| **PASS** |
|   009        | "DELETE" request from DB| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**| **PASS** |
|   010        | "UPDATE" button |Update modal form pop up, input and textarea fields Required| Add message form pop up, input and textarea fields Required |**PASS**| **PASS** 
|   011        | "UPDATE" form |If UID provided all fields fill up atomaticaly| If UID provided all fields fill up atomaticaly |**PASS**| **PASS**
|   012        | "UPDATE" form |If UID provided and any field value was changed, notice mark changes and become red| If UID provided and any field value was changed, notice mark changes and become red |**PASS**| **PASS**
|   013        | "UPDATE" request| "Ok" message pop up if required filleds filled out correct  | "Ok" message pop up if required filleds filled out correct |**PASS**| **PASS** |
|   014        | "UPDATE" request| "Error" message pop up if required fields filled out incorrect  | "Error" message pop up if required fields filled out incorrect |**PASS**| **PASS** |
|   015        | "LOG OUT" form "CLOSE" button |Log out - cancelled| Log out - cancelled |**PASS**| **PASS** |
|   016        | "LOG OUT" form "LOG OUT" button |Session aborted, user transfered to Log In page| Session aborted, user transfered to Log In page |**PASS**| **PASS** |
|   017        | "YOUTUBE" button |Toggles down / up "Youtube" section| Toggles down / up "Youtube" section |**PASS**| **PASS** |
|   018        | "YOUTUBE" paggination buttons |Previous / Next buttons are disabled if search not performed |Previous / Next buttons are disabled if search not performed |**PASS**| **PASS** |
|   019        | "YOUTUBE" search |Retrievs 10 videos by search word| Retrievs 10 videos by search word |**PASS**| **PASS** |
|   020        | "YOUTUBE" video |Start / Stop any video |Start / Stop any video |**PASS**| **PASS** |
|   021        | "YOUTUBE" paggination button |Previous disabled until Next is not pressed |Previous disabled until Next is not pressed  |**PASS**| **PASS** |
|   022        | "YOUTUBE" paggination button |Previous disabled when Next pressed |Previous disabled when Next pressed |**PASS**| **PASS** |
|   023        | "YOUTUBE" paggination |Previous and Next function is working |Previous and Next function is working |**PASS**| **PASS** |
|   024        | Request Message Card |When double-click, calls delete function. |When double-click, calls delete function. |**PASS**| **PASS** |
|   025        | Window resize |When size iz less than 1200px, "Warehouse / Drivers" buttons apares  |When size iz less than 1200px, "Warehouse / Drivers" buttons apares |**PASS**| **PASS** |
|   026        | Window resize |When size iz less than 990px, hide Youtube button and sections. |When size iz less than 990px, hide Youtube button and sections. |**PASS**| **PASS** |
|   027        | "Warehouse / Drivers" buttons |Warehouse - show warehouse requests, Drivers - show drivers request  |Warehouse - show warehouse requests, Drivers - show drivers request |**PASS**| **PASS** |




## BUGS ##
- When "Login" with incorrect Username and Password - there is no notification message that provided data is wrong. User stays on login.php
- Add Form - textarea field is not set as Required
- Add Form - input fields warn if to much characters
- Update Form - if wrong UID add, request comes back as successful
- Youtube back and next buttons are working even if search wasn't done (buttons not disabled)