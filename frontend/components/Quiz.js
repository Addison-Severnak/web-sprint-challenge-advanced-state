import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/action-creators';


function Quiz(props) {
  const {
    quiz: { question, answer_id },
    fetchQuiz,
    selectAnswer,
    postAnswer
  } = props

  useEffect(() => {
    if (!question) fetchQuiz()
  }, [])

  const onAnswer = () => {
    const { quiz_id } = question
    postAnswer({ quiz_id, answer_id })
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        question ? (
          <>
            <h2>{question.question}</h2>
            {console.log(question)}
            <div id='quizAnswers'>
              {
                question.answers.map(ans => (
                  <div 
                    key={ans.answer_id}
                    className={answer_id === ans.answer_id ? 'answer selected' : 'answer'}
                    onClick={() => selectAnswer(ans.answer_id)}
                  >
                    {question.answers[0].text}
                    <button>
                      {answer_id === ans.answer_id ? 'SELECTED' : 'Select'}
                    </button>
                  </div>
                ))
              }
            </div>

            {/* <div id="quizAnswers">
              <div className="answer selected">
                {question.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                {question.answers[1].text}
                <button>
                  Select
                </button>
              </div>
            </div> */}

            <div>
              <button id="submitAnswerBtn" onClick={onAnswer} disabled={!answer_id}>
                Submit answer
              </button>
            </div>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => ({
  quiz: st.quiz
}), {
  fetchQuiz: actions.fetchQuiz,
  postAnswer: actions.postAnswer,
  selectAnswer: actions.selectAnswer
})(Quiz)
