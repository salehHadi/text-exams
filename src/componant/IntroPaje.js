

export default function Intro(props) {
    const hidden = props.handleHidden
    return(
        <div className={`${hidden? "hidden":"intro__container"}`}>
            <h1 className="intro__title">Quizzical</h1>
            <h4>some description if needed</h4>
            <button onClick={props.handleClick} className="btn intro__btn">Start Quiz</button>
        </div>
    )
}