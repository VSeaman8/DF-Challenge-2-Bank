export default class Transaction {
  #amount;
  #date;
  #type;
  constructor(amount, date, type) {
    this.#amount = amount;
    this.#date = date;
    this.#type = type;
  }

  // Getters and Setters
  get amount() {
    return this.#amount;
  }
  set amount(value) {
    this.#amount = value;
  }

  get date() {
    return this.#date;
  }

  set date(value) {
    this.#date = value;
  }

  get type() {
    return this.#type;
  }
}
