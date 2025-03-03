import React from "react"
import { useState, useEffect} from "react"
import questions from "../assets/questiondata.json"

function Card(){
    const [isHidden, setisHidden] = useState(true)
    const [question, setQuestion] = useState("Filler")
    const [historyStack, setHistoryStack] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    const getRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length)
        return questions[randomIndex]
    };

    const handleNextQuestion = () => {
        if(currentIndex < historyStack.length - 1){
            setCurrentIndex( currentIndex + 1)
            setQuestion(historyStack[currentIndex + 1])
        }else{
            const newQuestion = getRandomQuestion()
            setQuestion(newQuestion)
            setHistoryStack([...historyStack, newQuestion]);
            setCurrentIndex(historyStack.length)
        }
    }

    const handlePrevQuesion = () => {
        if(currentIndex > 0){
            // const prevQuestion = historyStack.pop();
            setCurrentIndex( currentIndex - 1)
            setHistoryStack([...historyStack]);
            setQuestion(historyStack[currentIndex - 1]);
        }
    }
    
    return(
        <>
        <div className="card-page">
            <div className="card-container" onClick={() => setisHidden(!isHidden)}>
                <h1 className="question-category">
                    {question.category}
                </h1>
                
                <h2 className="question-text">
                    {question.question_text}
                </h2>

                <p className="question-res" style={{visibility : isHidden ? "hidden" : "visible"}}>
                    {question.question_res}
                </p>
            </div>
        </div>
        <div className="btn-container">
            <button className = "btn" id="prev-btn" 
                onClick = {() => {!isHidden ? setisHidden(!isHidden) : setisHidden(isHidden); handlePrevQuesion()}} disabled = {historyStack.length === 0}>
                Prev
            </button>

            <button className="btn" id="next-btn"
                onClick = {() => {!isHidden ? setisHidden(!isHidden) : setisHidden(isHidden); handleNextQuestion()}}>
                Next
            </button>
        </div>
        </>
    )
}

export default Card