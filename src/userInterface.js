import readline from "readline";
import Account from "./account.js";

export default class UserInterface {
  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.account = new Account(1234, 0);
    this.askForPin();
  }
  // Ask's for users PIN to unlock the account
  askForPin() {
    this.readline.question(
      "Enter your PIN to unlock your account: ",
      (input) => {
        let pin = Number(input);
        if (this.account.check_unlock(pin)) {
          console.log("Account unlocked. Welcome");
          this.mainMenu();
        } else {
          console.log("Incorrect PIN. Please try again.");
          this.askForPin();
        }
      }
    );
  }
  // Locks Account

  lockAccount() {
    this.readline.question("Enter your PIN to lock your account: ", (input) => {
      let pin = Number(input);
      if (this.account.lockAcc(pin)) {
        this.readline.close();
        console.log("Thank you for visiting us today!");
      } else {
        console.log("Incorrect PIN. Please enter correct PIN");
        this.lockAccount();
      }
    });
  }

  // Main Menu
  mainMenu() {
    this.readline.question(
      `Enter number to select option:

            1. Deposit funds
            2. Withdraw funds
            3. Print account statement
            4. Exit program
            5. Challenge demo

            : `,
      (menu) => {
        switch (menu) {
          case "1": // Deposit
            this.readline.question(
              "Enter the amount you wish to deposit: ",
              (amount) => {
                let deposit = Number(amount);
                this.readline.question(
                  "Enter the date of the deposit (DD/MM/YYYY): ",
                  (date) => {
                    let dateDeposit = date;
                    this.account.addDeposit(deposit, dateDeposit);
                    console.log(
                      `Successfully deposited ${deposit} on ${dateDeposit}.`
                    );
                    this.mainMenu();
                  }
                );
              }
            );

            break;
          case "2": // Withdraw
            this.readline.question(
              "Enter the amount you wish to withdraw: ",
              (amount) => {
                let withdrawAmt = Number(amount);
                this.readline.question(
                  "Enter the date of the withdrawal (DD/MM/YYYY): ",
                  (date) => {
                    let dateWithdraw = date;
                    this.account.withdraw(withdrawAmt, dateWithdraw);
                    console.log(
                      `Successfully withdrawn ${withdrawAmt} on ${dateWithdraw}.`
                    );
                    this.mainMenu();
                  }
                );
              }
            );

            break;
          case "3": // Prints Transactions
            this.account.printTrans();
            this.mainMenu();
            break;

          case "4": // Exits Main Menu
            this.lockAccount();
            break;

          case "5": // Challenge demo
            this.account.addDeposit(1000, "10/01/2012");
            this.account.addDeposit(2000, "13/01/2012");
            this.account.withdraw(500, "14/01/2012");
            this.account.printTrans();
            this.mainMenu();
            break;

          default:
            console.log("Invalid option. Please try again.");
            this.mainMenu();
        }
      }
    );
  }
}
