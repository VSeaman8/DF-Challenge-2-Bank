import Account from "../../src/account.js";

describe(`Account Security`, () => {
  it(`Test 1 unlock() should change the isLocked property to false when correct pin is entered`, () => {
    // Arrange
    const account = new Account(1234);
    // Act
    account.check_unlock(1234);
    // Assert
    expect(account.isLocked).toBe(false);
  });
  it(`Test 2: unlock() doesn't affect isLocked property when incorrect pin is entered`, () => {
    // Arrange
    const account = new Account(1235);
    // Act
    account.check_unlock(123);
    // Assert
    expect(account.isLocked).toEqual(true);
  });
  it(`Test 3: lockAcc method changes isLocked property from false to true`, () => {
    // Arrange
    const account = new Account(1234);
    // Act
    account.lockAcc(1234);
    // Assert
    expect(account.isLocked).toBe(true);
  });
});

describe(`Balance and Funds Tests`, () => {
  it(`Test 4: View CurrentBalance when account is unlocked`, () => {
    // Arrange
    const account = new Account(1234);
    // Act
    const balance = account.currentBalance;
    // Assert
    expect(balance).toEqual(account.check_balance());
  });

  it(`Test 5: Deposit adds entry to transaction when unlocked`, () => {
    // Arrange
    const account = new Account(1234);
    // Act
    account.check_unlock(1234);
    account.addDeposit(Number(1000), "10/01/2012");
    // Assert
    expect(account.transHist.length).toEqual(1);
  });
  it(`Test 6: deposit does not add to transaction when account is locked`, () => {
    // Arrange
    const account = new Account();
    // Act
    account.addDeposit(1000, "10/01/2012");
    // Assert
    expect(account.transHist.length).toBe(0);
  });

  it(`Test 7: deposit can not add a negative transaction`, () => {
    // Arrange
    const account = new Account(1234);
    // Act
    account.check_unlock(1234);
    account.addDeposit(-500, "10/12/2012");
    // Assert
    expect(account.transHist.length).toBe(0);
  });
  it(`Test 8: Check currentBalance is correct when a deposit has been added`, () => {
    // Arrange
    const account = new Account(1234, 10);
    account.check_unlock(1234);
    // Act
    account.addDeposit(100, "10/12/2012");
    // Assert
    expect(account.currentBalance).toEqual(110);
  });
  it(`Test 9: withdraw adds entry to transaction when unlocked`, () => {
    // Arrange
    const account = new Account(1234);
    account.check_unlock(1234);
    // Act

    account.withdraw(Number(500), "14/01/2012");
    // Assert
    expect(account.transHist.length).toEqual(1);
  });
  it(`Test 10: withdraw does not add to transaction when account is locked`, () => {
    // Arrange
    const account = new Account();
    // Act
    account.withdraw(Number(500), "14/01/2012");
    // Assert
    expect(account.transHist.length).toEqual(0);
  });
  it(`Test 11: withdraw can not add a negative transaction`, () => {
    // Arrange
    const account = new Account(1234);
    // Act
    account.check_unlock(1234);
    account.withdraw(-500, "14/01/2012");
    // Assert
    expect(account.transHist.length).toBe(0);
  });
  it(`Test 12: check currentBalance is correct when a withdraw has been made`, () => {
    // Arrange
    const account = new Account(1234, 110);
    account.check_unlock(1234);
    // Act
    account.withdraw(10, "10/12/2012");
    // Assert
    expect(account.currentBalance).toEqual(100);
  });
  it(`Test 15: Can't withdraw funds if there is not enough money in the account`, () => {
    // Arrange
    const account = new Account(1234, 10);
    account.check_unlock(1234);
    // Act
    account.withdraw(500, "14/01/2012");
    // Assert
    expect(account.currentBalance).toEqual(10);
  });
});

describe(`Printing Functions`, () => {
  it(`Test 13: printTrans() prints correctly when account unlocked`, () => {
    // Arrange
    const account = new Account(1234);
    account.check_unlock(1234);
    account.addDeposit(100, "10/12/2012");
    spyOn(console, "log");
    // Act
    account.printTrans();
    // Assert
    expect(console.log).toHaveBeenCalled();
  });
});
describe("printTrans", function () {
  it("Test 14:printTrans() prints coloured text", function () {
    // Arrange
    const account = new Account(1234);
    account.check_unlock(1234);
    account.addDeposit(100, "10/12/2012");
    account.withdraw(10, "10/12/2012");
    spyOn(console, "log");
    // Act
    account.printTrans();
    // Assert

    let hasGreen = console.log.calls
      .allArgs()
      .some((args) => args[0].includes("\x1b[32m"));
    let hasRed = console.log.calls
      .allArgs()
      .some((args) => args[0].includes("\x1b[31m"));

    expect(hasGreen).toBe(true);
    expect(hasRed).toBe(true);
  });
});
