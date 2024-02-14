import Transaction from "./transaction.js";

export default class Account {
  #isLocked = true;
  #pin;
  #currentBalance = 10;

  constructor(pin, balance) {
    this.#pin = pin;
    this.#currentBalance = balance;
    this.transHist = [];
  }

  // Checks the account has been unlocked

  check_unlock(pin) {
    if (pin === this.#pin) {
      this.#isLocked = false;
      return true;
    }
    return false;
  }

  // Locks account
  lockAcc(pin) {
    if (pin === this.#pin) {
      this.#isLocked = true;
      return true;
    }
    return false;
  }

  // Adds a deposit

  addDeposit(amount, date) {
    if (!this.#isLocked) {
      if (amount <= 0) {
        return "Sorry you can't add that amount";
      }
      let transaction = new Transaction(amount, date, "deposit");
      this.transHist.push(transaction);
      this.#currentBalance += Number(amount);
    }
  }

  // Withdraws Money from account

  withdraw(amount, date) {
    if (amount <= 0 || amount > this.currentBalance) {
      return "Sorry You can't add that amount";
    }
    if (!this.#isLocked) {
      let transaction = new Transaction(amount, date, "withdraw");
      this.transHist.push(transaction);
      this.#currentBalance -= Number(amount);
    }
  }

  // Checks the balance of the account

  check_balance() {
    if (!this.#isLocked) {
      return this.#currentBalance;
    }
  }

  // Prints Transactions to Terminal
  printTrans() {
    if (!this.#isLocked) {
      console.log("");
      console.log(`date       || credit     || debit      || balance`);

      let balance = this.#currentBalance;

      for (let i = this.transHist.length - 1; i >= 0; i--) {
        let transaction = this.transHist[i];
        let date = transaction.date;

        let credit, debit;
        if (transaction.type === "deposit") {
          credit = "\x1b[32m" + transaction.amount.toFixed(2).padStart(3);
          debit = " ";
          balance += transaction.amount;
        } else {
          credit = " ";
          debit = "\x1b[31m" + transaction.amount.toFixed(2).padStart(3);
          balance -= transaction.amount;
        }

        credit = credit.padEnd(10, " ");
        debit = debit.padEnd(10, " ");

        console.log(
          `${date.padEnd(
            10
          )} || ${credit}\x1b[0m || ${debit}\x1b[0m || ${balance
            .toFixed(2)
            .padStart(10)}`
        );
      }
    }
  }

  // Getters/Setters
  get isLocked() {
    return this.#isLocked;
  }

  set isLocked(newLockStatus) {
    this.#isLocked = newLockStatus;
  }

  get pin() {
    return this.#pin;
  }

  get currentBalance() {
    return this.#currentBalance;
  }

  set currentBalance(newBalance) {
    this.#currentBalance = newBalance;
  }
}
