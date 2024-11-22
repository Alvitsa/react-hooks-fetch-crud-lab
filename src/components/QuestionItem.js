import React from "react";

function QuestionItem({ question, handleDeleteQuestion, handleAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChange(event) {
    const newIndex = parseInt(event.target.value);
    handleAnswerChange(id, newIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;