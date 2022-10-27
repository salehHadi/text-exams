import React from 'react';
import './index.css';
import Content from './componant/Content'
import Intro from './componant/IntroPaje'
import {nanoid} from 'nanoid'
import Submit from './componant/Submit';

function App() {
  const [hidden, setHidden] = React.useState(false)
  const [grapData, setGrapData] = React.useState([])
  const [data, setData] = React.useState([])
  const [allQuestionSelected, setAllQuestionSelected] = React.useState(false)
  const [countsANDdisplayText, setCountsANDdisplayText] = React.useState([{count: 10, display: false}])


  React.useEffect(()=> {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then( data =>  setGrapData(data.results))
  },[hidden])


  function refactorData(){
    return(
      grapData.map(data => {
        return(
          {
            question: data.question,
            answers: refactorAnswers(data)[0],
            isAnswered: false,
            id: nanoid(),
          })}))
  }

  function refactorAnswers(data){
    const answers = []
    const wrongAnswers = []
    const rightAnswer = []

  // refactor wrong answers
    data.incorrect_answers.map(element => {
      wrongAnswers.push({
        answer: element,
        id: nanoid(),
        clicked:false,
        wrongAnswer: false,
        isTheRightAnswer: false,
      })})
          
  // refactor right answers
    rightAnswer.push({
      answer:data.correct_answer,
      id: nanoid(),
      clicked:false,
      rightAnswer: false,
      isTheRightAnswer: true,
    })

    wrongAnswers.forEach(element=> answers.push(element))
    rightAnswer.forEach(element=> answers.push(element))


    const fromIndex = answers.indexOf(answers[3])
    const toIndex = Math.floor(Math.random()*3)
    answers.splice(toIndex, 0, answers.splice(fromIndex, 1)[0])


    return [answers]
  }



// ------------------------------------------------------------
// get Statr & answer updated state & questions updated state
// ------------------------------------------------------------


  function GetStart(){
    setHidden(true)
    setData(refactorData())
  }

  // answer section //

  function selectedAnswer(questionID,answerID){
    const updateData = data.map(eachData => {
      return(
        eachData.id === questionID ? 
          changeAnswerClick(eachData,answerID)
         : eachData
      )})


    setData(updateData)
    updateAllQuestionSelected(updateData)
  }

    function changeAnswerClick(questionElement,answerID){
      const question = questionElement
      const updatedQuestion = {
        ...question, 
        answers:question.answers.map(element => element.id === answerID ? {
            ...element,
            clicked: !element.clicked
          } : {...element, clicked: false}),
      }

      return updateIsAnswered(updatedQuestion)
    }


      function updateIsAnswered(updatedQuestion) {
        const getAnswersClicked = updatedQuestion.answers.map(e => {
          return(e)
        })
        const checkAnswersClicked = getAnswersClicked.some(e => {
          return e.clicked? true: false
        })


      return {...updatedQuestion, isAnswered: (checkAnswersClicked)}
      }


// Submit Section //


function updateAllQuestionSelected(updateData){
  const every = updateData.every(e => e.isAnswered? true : false)
  setAllQuestionSelected(every)
}

function submitClick(){
  const updatedData = data.map(data => {
    return ({ 
        ...data,
        answers: submitAnswerCheck(data.answers)
      })})

  setData(updatedData)
  countWrongAnswers(updatedData)
}


function submitAnswerCheck(answers) {
  return answers.map(element => {
    return element.clicked ?
      element.isTheRightAnswer ? 
      {...element, rightAnswer:true} : {...element, wrongAnswer: true, wrong:1 }
    : element.isTheRightAnswer ? {...element, rightAnswer: true} : element
  })
}


function countWrongAnswers(updatedData){
  const counts = updatedData.map(data => data.answers.filter(e => e.wrong).length).reduce((a, b) => a - b, 10)
    setCountsANDdisplayText(e => {return {count: counts,display: true}})
  }


function restartTheQuiry(){
  setData([])
  setHidden(false)
  setAllQuestionSelected(false)
  setCountsANDdisplayText(false)
}


// ------------------------------------------------
// content & Render Data
// ------------------------------------------------

  const contentElement = data.map(data => {
    const answerElement = data.answers.map(element=>{
      const id= element.id
      const handleClick= () => selectedAnswer(data.id,id)

          return {
            key:id,
            answer:element.answer,
            id:id,
            handleClick: {handleClick},
            clicked: element.clicked,
            rightAnswer: element.rightAnswer,
            wrongAnswer: element.wrongAnswer
          }
        })

  return(
    <Content
      key={data.id}    
      id={data.id}    
      question={data.question}
      answers={answerElement}
      handleClick={() => selectedAnswer()}
      />
  )
  })

  // Return to App //

  return (
    <main className="container">
      <Intro
      handleClick={GetStart}
      handleHidden={hidden}
      />

      {contentElement}

      {allQuestionSelected && <Submit 
      score={countsANDdisplayText.count}
      displayTsxt={countsANDdisplayText.display}
      handleSubmitClick={submitClick}
      getStartedAgain={restartTheQuiry}/>
      }
    </main>
  );
}

export default App;
