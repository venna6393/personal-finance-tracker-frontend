import { Component } from "react";
import Header from "./Header";
import Cookie from "js-cookie";
import { getTransactions } from "../services/api";

class Dashboard extends Component {
  state = {
    transactions: [],
    amount: 0,
    date: new Date(),
    category: "",
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = async () => {
    const transactions = this.state;
    const jwtToken = Cookie.get("jwt_token");
    console.log(jwtToken);
    try {
      const data = await getTransactions(jwtToken);
      this.setState({ transactions: data.transactions });
    } catch (error) {
      console.error("Failed to fetch transactions:", error.message);
    }
    console.log(transactions);
  };

  changeAmount = (e) => {
    this.setState({ amount: parseInt(e.target.value) });
  };

  changeCategory = (e) => {
    this.setState({ category: e.target.value });
    this.setState({ date: new Date() });
  };

  submitTransaction = async () => {
    await this.addTransactions();
    await this.fetchTransactions();
  };

  addTransactions = async () => {
    const { category, date, amount } = this.state;
    const jwtToken = Cookie.get("jwt_token");
    const transactionDetails = { date, category, amount };
    console.log(JSON.stringify(transactionDetails));
    console.log("here it is");
    const response = await fetch(`http://localhost:5000/api/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch transactions");
    }

    return response.json();
  };

  render() {
    let balance = 0;
    let totalExpenses = 0;
    let totalIncome = 0;
    const { transactions } = this.state;
    if (transactions !== undefined) {
      transactions.map((transaction) => {
        if (transaction.amount[0] === "-") {
          balance =
            balance -
            parseInt(transaction.amount.slice(1, transaction.amount.length));
          totalExpenses =
            totalExpenses +
            parseInt(transaction.amount.slice(1, transaction.amount.length));
        } else {
          balance = balance + parseInt(transaction.amount);
          totalIncome = totalIncome + parseInt(transaction.amount);
        }
        return transaction;
      });
    }
    return (
      <div>
        <Header />
        <div>
          <h1>Dashboard</h1>
          <div className="card">
            <p>Add transactions</p>
            <label id="amount">
              Enter Amount please mention "-" for expenses
            </label>
            <input
              onChange={this.changeAmount}
              id="amount"
              placeholder="enter amount"
              type="text"
            />
            <label id="category">category</label>
            <input
              onChange={this.changeCategory}
              id="category"
              placeholder="Enter Cause of income or expenditure"
              type="text"
            />
            <button type="button" onClick={this.submitTransaction}>
              Submit Transaction
            </button>
            <p>balance:{balance}</p>
            <p>totalExpenses:{totalExpenses}</p>
            <p>totalIncome:{totalIncome}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
