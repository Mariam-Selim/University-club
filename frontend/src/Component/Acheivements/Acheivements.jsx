import Point from "../Acheivements/Point";
import React from "react";
function Acheivements(){
    return(
        <>
           <div style={{
                width: "80%",
                margin: "5px auto",
                }}>
               <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "5px solid rgb(26,74,83)",
                    paddingTop: "20px",
                    }}>
                    <Point year="2022" text="+10Event"/>

 
                    <Point year="2023" text="+15Event"/>
                    

    
                    <Point year="2024" text="+12Event" />
               </div>
           </div>
        </>
    );
}
export default Acheivements;