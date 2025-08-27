import React from "react"
import { useState, useEffect} from "react"

function Card(){
    const [isHidden, setisHidden] = useState(true)
    const [question, setQuestion] = useState("Filler")
    const [error, setError] = useState(null)
    const [historyStack, setHistoryStack] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)

    const getRandomQuestion = async () => {
        if(firstLoad) setLoading(true);
        setError(null);
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/questions/play/`)
            if(!response.ok){
                throw new Error("Failed to fetch question data");
            }
            const data = await response.json();
            return data;
        }   
            catch(err){
                setError(err.message)
                return null;
            }
            finally{
                setLoading(false);
                setFirstLoad(false);
            }

    };

    const handleNextQuestion = async () => {
        if(currentIndex < historyStack.length - 1){
            setCurrentIndex( currentIndex + 1)
            setQuestion(historyStack[currentIndex + 1]);
        }else{
            console.log("Fetching new question...");
            const newQuestion = await getRandomQuestion();
            console.log("Fetched Question: ", newQuestion);
            if(newQuestion){
                setHistoryStack([...historyStack, newQuestion]);
                setCurrentIndex(historyStack.length)
                setQuestion(newQuestion)
            } else{
                console.log("No question recived")
            }
        }
    }

    const handlePrevQuesion = () => {
        if(currentIndex > 0){
            setCurrentIndex( currentIndex - 1)
            setHistoryStack([...historyStack]);
            setQuestion(historyStack[currentIndex - 1]);
        }
    }
    
    return(
        <>
        <div className="card-page">
            <div className="card-container" onClick={() => setisHidden(!isHidden)}>
                {loading &&(
                    <h1 id="loading-qs">Loading Questions...</h1>
                )}
                {error &&(
                    <p style={{color: "red"}}>{error}</p>
                )}
                <h1 className="question-category">
                    {question.category}
                </h1>
                
                <h2 className="question-text">
                    {question.questionText}
                </h2>

                <p className="question-res" style={{visibility : isHidden ? "hidden" : "visible"}}>
                    {question.questionRes}
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