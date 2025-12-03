import Navbar from '../../components/navbar';
import Stocks from '../../components/stocks';
import { useEffect, useState } from 'react';

// components in dashboard: 
// Navbar
// Stocks (statistic & searchBar & products)

function Dashboard() {

  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson){
      const user = JSON.parse(userJson)
      console.log("Logged in user", user)
      if(user.company_name){
        setCompanyName(user.company_name);
      }
    } else {
      console.log("No user found in local storage")
    }
  }, [])

  return (
    <div>
      
        <Navbar  />
        <div style={{ fontFamily: "Tatsuki", fontWeight: 400, fontSize: "3rem" }}>{companyName ? `${companyName} Product Dashboard` : "Product Dashboard"}</div>
        <Stocks />
    </div>
  );
}

export default Dashboard;
