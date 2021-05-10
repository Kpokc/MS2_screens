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
|   005        | "ADD" button | Add message form pop up, input and textarea fields Required | Add message form pop up, input and textarea fields Required |**PASS**| **PASS** |
|   006        | "DELETE" button |Add message form pop up, input and textarea fields Required| Add message form pop up, input and textarea fields Required |**PASS**| **PASS** |

## BUGS ##
- When "Login" with incorrect Username and Password - there is no notification message that provided data is wrong. User stays on login.php
- Add Form - textarea field is not set as requaired
- Add Form - input and textarea fields need to add max characters