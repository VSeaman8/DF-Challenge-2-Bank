import UserInterface from "./userInterface.js";

/* Please note to unlock the account use 1234;

Please also note that in the menu is a temporary demo (called Challenge Demo) that recreates the following information

**Given** a client makes a deposit of 1000 on 10-01-2012
**And** a deposit of 2000 on 13-01-2012
**And** a withdrawal of 500 on 14-01-2012
**When** she prints her bank statement
**Then** she would see 
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00

To see this please use option 5 

*/

let userInterface = new UserInterface();
userInterface.askForPin();
