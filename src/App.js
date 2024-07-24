import { useEffect, useState } from "react";
import {SnackbarProvider} from "notistack";
import Card from "./Components/Card/Card";
import PieChart from "./Components/PieChart/PieChart";
import BarChart from "./Components/BarChart/BarChart";
import ExpenseForm from "./Components/CommonForm/AddExp";
import Modal from "./Components/CommonModal/Modal";
import AddBalanceForm from "./Components/CommonForm/AddBalance";
import TransactionList from "./Components/Transaction/TransactionList";

import styles from "./App.module.css";

const useLocalStorage = (key, value) => {
  const [storedValue, setStoredValue] = useState(()=>{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : value;
  });
  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
};

const calcCategoryStats = (expList) => {
  return expList.reduce(
    (acc, item) => {
      acc.spends[item.category] = (acc.spends[item.category] || 0) + Number(item.price);
      return acc;
    }, {
      spends: {food: 0, entertainment: 0, travel: 0},
    }
  );
};

function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [balance, setBalance] = useLocalStorage("balance", 5000);
  const {spends:categorySpends} = calcCategoryStats(expenses);
  const [isOpenExp, setIsOpenExp] = useState(false);
  const [isOpenBal, setIsOpenBal] = useState(false);
  const expense = expenses.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const handleAddIncome = () => {
    setIsOpenBal(true);
  };
  const handleAddExpense = () => {
    setIsOpenExp(true);
  };  

  return (
    <SnackbarProvider>
      <div className={styles.container}>
        <h1>Expense Tracker</h1>

        <div className={styles.cardsContainer}>
          <Card
            title="Wallet Balance"
            money={balance}
            buttonText="+ Add Income"
            buttonType="success"
            handleClick={handleAddIncome}
          />

          <Card
            title="Expenses"
            money={expense}
            buttonText="+ Add Expense"
            buttonType="failure"
            success={false}
            handleClick={handleAddExpense}
          />

          <PieChart
            data={[
              { name: "Food", value: categorySpends.food },
              { name: "Entertainment", value: categorySpends.entertainment },
              { name: "Travel", value: categorySpends.travel },
            ]}
          />

        </div>
        
        <div className={styles.transactionsContainer}>
          <TransactionList
            transactions={expenses}
            editTransactions={setExpenses}
            title="Recent Transactions"
            balance={balance}
            setBalance={setBalance}
          />
          <BarChart
            data={[
              { name: "Food", value: categorySpends.food },
              { name: "Entertainment", value: categorySpends.entertainment },
              { name: "Travel", value: categorySpends.travel },
            ]}
          />
        </div>

        <Modal isOpen={isOpenExp} setIsOpen={setIsOpenExp}>
          <ExpenseForm
            setIsOpen={setIsOpenExp}
            expenseList={expenses}
            setExpenseList={setExpenses}
            setBalance={setBalance}
            balance={balance}
          />
        </Modal>

        <Modal isOpen={isOpenBal} setIsOpen={setIsOpenBal}>
          <AddBalanceForm setIsOpen={setIsOpenBal} setBalance={setBalance} />
        </Modal>

      </div>
    </SnackbarProvider>
  );
}

export default App;
