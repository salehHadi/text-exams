import React from 'react'


export default function Submit(props) {
    const {handleSubmitClick, score, displayTsxt, getStartedAgain} = props

    return (
        <div className='submit__container'>
            {displayTsxt && <h3> your score {score} / 10 correct answers </h3>}

            <button className="btn submit__btn" onClick={!displayTsxt ? handleSubmitClick : getStartedAgain }>
                {!displayTsxt ? "Submit" : "Restart Again" }
            </button>
        </div>
    )

}