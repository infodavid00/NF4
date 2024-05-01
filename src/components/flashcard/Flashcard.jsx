
import React, { useState } from "react";
import "./flashcard.css";

export default function Flashcard({arr, index}) {
  const [isInBack, setisInBack] = useState(false);
  
 return (
  <div className="flip-card">
      <div className={isInBack ? "flip-card-inner flip-card-inner-2" : "flip-card-inner"}>
        <div className={"flip-card-front"} onClick={()=> setisInBack(true)}>
           <div>{arr[index]?.question}</div>
           {/* <div style={{marginBottom:'1em'}}>Virtual hosts with different security requirements should be: </div>
           <div>A. encrypted with a one-time password.</div>
           <div>B. stored on separate physical hosts.</div>
           <div>C. moved to the cloud.</div>
           <div>D. scanned for vulnerabilities regularly.</div>
           <div id="flip-card-front-bottom"></div> */}
        </div>
        <div className="flip-card-back" onClick={()=> setisInBack(false)}>
           <div>{arr[index]?.answer}</div>
        </div>
      </div>
    </div>
  )
}
