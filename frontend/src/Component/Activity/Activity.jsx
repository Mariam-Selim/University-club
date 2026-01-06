import React from "react";
function Activity({text,icon}){
    return(
       <>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems:"center",
            gap:"10px",
            paddingLeft:"50px",
            paddingRight:"50px"
          }}>
               <i className={icon} style={{
                  color:"rgb(26,74,83)",
                  padding:"7px",
                  fontSize:"20px",
               }}></i>
              <span style={{
                  color:"rgb(26,74,83)",
                  }}>{text}</span>
          </div>
       </>
    );
}
export default Activity;