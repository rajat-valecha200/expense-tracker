import Header from "./Components/Header/Header";
import Transaction from "./Components/Transaction/Transaction";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <Header />
      <Transaction />
    </div>
  );
}

export default App;
