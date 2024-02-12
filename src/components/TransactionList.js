import { Component } from "react";
import Header from "./Header";
import Cookie from "js-cookie";
import { getTransactions } from "../services/api";

class TransactionList extends Component {
  state = {
    transactions: [],
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

  render() {
    const { transactions } = this.state;
    return (
      <div>
        <Header />
        <div>
          {transactions.map((transaction) => (
            <div>
              `TransactionId:{transaction.id} UserId:{transaction.user_id}{" "}
              category:{transaction.category} Date:{transaction.date} Amount: rs
              {transaction.amount}`
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TransactionList;
