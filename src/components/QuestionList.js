import React from 'react';

const QuestionList = ({ questions, onDelete, onUpdateAnswer }) => {
  return (
    <div>
      <h2>Questions List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <p>Correct Answer: {question.answers[question.correctIndex]}</p>
            <button onClick={() => onDelete(question.id)}>Delete Question</button>
            <select
              value={question.correctIndex}
              onChange={(e) => onUpdateAnswer(question.id, parseInt(e.target.value))}
            >
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;