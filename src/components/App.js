import React, { useEffect, useState } from 'react';
import QuestionList from './QuestionList';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  // Fetch all questions from the server
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  // Handle input changes for new question form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'correctIndex') {
      setNewQuestion((prevState) => ({ ...prevState, [name]: parseInt(value) }));
    } else if (name.startsWith('answer')) {
      const index = parseInt(name.split(' ')[1]) - 1;
      setNewQuestion((prevState) => {
        const newAnswers = [...prevState.answers];
        newAnswers[index] = value;
        return { ...prevState, answers: newAnswers };
      });
    } else {
      setNewQuestion((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Handle form submission to create a new question
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: newQuestion.answers,
        correctIndex: newQuestion.correctIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => setQuestions((prevQuestions) => [...prevQuestions, data]))
      .catch((error) => console.error('Error adding question:', error));
  };

  // Handle deleting a question
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
      })
      .catch((error) => console.error('Error deleting question:', error));
  };

  // Handle updating the correct answer
  const handleUpdateAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex: data.correctIndex } : question
          )
        );
      })
      .catch((error) => console.error('Error updating answer:', error));
  };

  return (
    <div>
      <nav>
        <button onClick={() => setQuestions([...questions])}>View Questions</button>
        <button onClick={() => setNewQuestion({ prompt: '', answers: ['', '', '', ''], correctIndex: 0 })}>
          New Question
        </button>
      </nav>
      <div>
        <h1>New Question</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Prompt:
            <input
              type="text"
              name="prompt"
              value={newQuestion.prompt}
              onChange={handleChange}
            />
          </label>
          {newQuestion.answers.map((answer, index) => (
            <label key={index}>
              Answer {index + 1}:
              <input
                type="text"
                name={`answer ${index + 1}`}
                value={answer}
                onChange={handleChange}
              />
            </label>
          ))}
          <label>
            Correct Answer:
            <select
              name="correctIndex"
              value={newQuestion.correctIndex}
              onChange={handleChange}
            >
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </select>
          </label>
          <button type="submit">Add Question</button>
        </form>
      </div>

      <QuestionList
        questions={questions}
        onDelete={handleDelete}
        onUpdateAnswer={handleUpdateAnswer}
      />
    </div>
  );
};

export default App;