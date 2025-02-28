import React from "react"
import { useState } from "react"

function Card(){
    const [isHidden, setisHidden] = useState(true)
    const [Question_text, setQuestion_text] = useState("Base Question")
    const [Question_res, setQuestion_res] = useState("Base Response")
    
    return(
        <div className="card-page">
            <div className="card-container" onClick={() => setisHidden(!isHidden)}>
                <h2 className="question-text">
                    {Question_text}
                </h2>

                <p className="question-res" style={{visibility : isHidden ? "hidden" : "visible"}}>{Question_res}</p>

                <div className="btn-container">
                    <button className = "btn" id="prev-btn" 
                        onClick = {() => setPrev(true)}>
                        Prev
                    </button>

                    <button className="btn" id="next-btn"
                        onClick = {() => setNext(true)}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card