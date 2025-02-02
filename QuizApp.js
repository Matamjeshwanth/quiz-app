import React, { useState, useEffect } from 'react';


const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState(""); // New state for the message
  
  useEffect(() => {
    fetch('http://localhost:5000/api/quiz')
      .then((response) => response.json())
      .then((data) => setQuestions(data.quiz.questions))
      .catch((error) => console.error('Error fetching quiz data:', error));
  }, []);
  

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      if (selectedOption.isCorrect || selectedOption.is_correct) {
        setScore((prevScore) => prevScore + 10 + streak * 5);
        setCorrectAnswers((prev) => prev + 1);
        setStreak((prevStreak) => prevStreak + 1);
      } else {
        setStreak(0);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
      }
    } else {
      alert('Please select an option before submitting.');
    }
  };

  const handleNextLevel = () => {
    setMessage("Next level's will be available soon."); // Display message
    setTimeout(() => {
      setMessage(""); // Clear message after 3 seconds
    }, 3000);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', width: '80%', margin: 'auto' }}>
      <h1 style={{ color: '#4CAF50' }}>Quiz App - Level {level}</h1>
      {message && <p style={{ color: 'orange', fontWeight: 'bold' }}>{message}</p>}
      {!quizCompleted ? (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h3>{questions[currentQuestion]?.description}</h3>
          <p style={{ color: 'red' }}>Time Left: {timeLeft} seconds</p>
          <p style={{ color: 'blue' }}>Streak: {streak} 🔥</p>

          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              style={{
                backgroundColor: selectedOption === option ? '#ADD8E6' : '#fff',
                padding: '10px 20px',
                margin: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'block',
                width: '60%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              onClick={() => handleOptionClick(option)}
            >
              {option.description}
            </button>
          ))}

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              marginTop: '20px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      ) : (
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <h2>Quiz Completed! 🎉</h2>
          <p>Total Points Scored: {score}</p>
          <p>Correct Answers: {correctAnswers} / {questions.length}</p>
          <p>Highest Streak: {streak} 🔥</p>

          <button
            onClick={handleNextLevel}
            style={{
              backgroundColor: '#FF5722',
              color: 'white',
              padding: '10px 20px',
              marginTop: '20px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Next Level 🚀
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
