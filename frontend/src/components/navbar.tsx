import { Package } from 'lucide-react';
import TransactionsButton from './buttons/transactions-button';
import CheckOutButton from './buttons/check-out-button';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard')
    }

    return (
        <div className='NavBar'>
            <div className="LeftNavBar">
                <div className="navLogo" onClick={handleClick}>
                    <Package size={24} color="white" strokeWidth={2.5} />
                </div>
                <div className="LeftNavBarText">
                    <div style={{ fontFamily: "Tatsuki", fontWeight: 700, fontSize: "2.5rem", cursor: "pointer" }} onClick={handleClick}>Inventory Tracker</div>
                </div>
            </div>
            <div className="RightNavBar">
                <div className="TransactionsButton">
                    <TransactionsButton />
                </div>
                <div className="CheckOutButton">
                    <CheckOutButton />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
