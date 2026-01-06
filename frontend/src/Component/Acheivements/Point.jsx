import React from "react";
function Point ({year,text}){
    return(
       <>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgb(26,74,83)",
                    borderRadius: "50%",
                    margin: "-35px auto 10px",
                    }}>
                </div>
                <p>
                    {year}<br /> {text}
                </p>
            </div>
        </>
    );
}
export default Point