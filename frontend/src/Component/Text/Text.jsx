import React from "react";
function Text({text,dec}){
    return(
       <>
          <div style={{
                    width:"40%",
                    padding:"10px",
                    display: "flex",
                    flexWrap: "wrap",
                    margin:"20px"
                  }}>
                  <h2 style={{
                  fontSize:"40px",
                  color:"rgb(26,74,83)",
                  fontWeight:"bold",
                  borderBottom:"2px solid rgb(26,74,83)",
                  margin:"2px"
                  }}>{text}</h2>
                  <p style={{color:"rgb(26,74,83)",}}>{dec}</p>
             </div>
       </>
    );
}
export default Text;