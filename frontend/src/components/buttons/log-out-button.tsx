import React from 'react';
import { Button } from 'react-bootstrap';
import { LogOut } from 'lucide-react';

function LogOutButton() {

    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/"; 
    }
    return (
        <Button className='coButton' onClick={handleClick}>
            <div className='transactionLabel'>
                <LogOut size={20} />
                <div style={{ paddingLeft: "4px" }}>Log Out</div>
            </div>

        </Button>
    );

}

export default LogOutButton;