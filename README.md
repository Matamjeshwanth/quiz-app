# quiz-app
Below is a explanation of how the quiz app works:
https://loom.com/share/folder/b0143930418d4490961e963cc07c07e6
––––––––––––––––––––––––––––––––––––––
Quiz App Overview:-

1. Data Loading:  
   - The app fetches quiz questions from a backend API that serves data from a local JSON file.
2. Question Display:
   - One multiple-choice question is shown at a time.
   - Users select an answer, and the selected option is highlighted.
3. Timer:  
   - Each question has a 30-second countdown.
   - If time runs out, the question is auto-submitted.
4. Scoring & Gamification:
   - Correct answers add 10 points plus bonus points for consecutive correct answers (streaks).
   - The app tracks the number of correct answers and the current streak.
5. Result Summary:
   - After the final question, a summary is displayed showing total points, correct answers, and the highest streak.
   - A “Next Level” button appears, which when clicked, shows the message “Next level's will be available soon.”

––––––––––––––––––––––––––––––––––––––
How to Run the Quiz App:-

- API (Backend): 
  1. In the API folder, run `npm install` to install dependencies.  
  2. Start the server with `node server.js`. The API is available at (e.g.) `http://localhost:5000/api/quiz`.
- Quiz App (Frontend):  
  1. In the quiz-app folder, run `npm install` to install dependencies.  
  2. In `QuizApp.js`, ensure the fetch URL points to the API (use localhost for local testing or the public URL if deployed).  
  3. Start the React app with `npm start` and open `http://localhost:3000` in your browser.
