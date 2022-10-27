import React from 'react'


export default function Content(props){
    const styles = {
        backgroundColor: "#D6DBF5",
        border: 'none' 
    }
    const rightanswer = {
        backgroundColor: "#57d973",
        color: "white",
        border: "1px solid black"
    }
    const wronganswer = {
        backgroundColor: "#d83535",
        color: "white",
        border: "1px solid black"
    }

return (
    <div className='question__container' id={props.id}>
        <h3>{props.question}</h3>
        
        <div className='answers-container'>
            {props.answers.map(element=> {
                const {answer, id, handleClick,clicked, rightAnswer, wrongAnswer} = element
                return(
                <p className='answers__btn'
                key={id}
                id={id}
                onClick={handleClick.handleClick}
                style={ rightAnswer ? rightanswer : wrongAnswer ? wronganswer : clicked ? styles : {} }
                >
                {answer}</p>)})}
            </div>
        </div>
    )
}

