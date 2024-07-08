import "./Header.css";
import Balance from "./Balance";
import Expenses from "./Expenses";
import Piechart from "./PieChart";

const Header = () => {
    return (
        <div className="Header">
            <Balance />
            <Expenses />
            <Piechart />
        </div>
    );
};

export default Header;