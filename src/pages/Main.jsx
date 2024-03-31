import React from 'react';
import welcome from "../assets/welcome.jpg";

function Main() {
  return (
    <div style={{display: "flex", alignItems:"center", justifyContent:"center"}} className="container">
        <img style={{height:"400px"}} src={welcome} alt="Welcome" className="center-image" />
    </div>
  );
}

export default Main;
