const questions = [
  {
    question: "Which team won the inaugural IPL season in 2008?",
    answers: [
      { text: "Chennai Super Kings", correct: false },
      { text: "Rajasthan Royals", correct: true },
      { text: "Mumbai Indians", correct: false },
      { text: "Kolkata Knight Riders", correct: false },
    ],
  },
  {
    question: "Who is the all-time leading run scorer in the IPL?",
    answers: [
      { text: "Virat Kohli", correct: true },
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rohit Sharma", correct: false },
      { text: "David Warner", correct: false },
    ],
  },
  {
    question: "Which bowler has the most wickets in IPL history?",
    answers: [
      { text: "Lasith Malinga", correct: true },
      { text: "Jasprit Bumrah", correct: false },
      { text: "Piyush Chawla", correct: false },
      { text: "Anil Kumble", correct: false },
    ],
  },
  {
    question: "What is the name of the award given to the highest run scorer in the IPL?",
    answers: [
      { text: "Purple Cap", correct: false },
      { text: "Orange Cap", correct: true },
      { text: "MVP Trophy", correct: false },
      { text: "Champions Trophy", correct: false },
    ],
  },
  {
    question: "Which of the following team has not won the IPL championships once?",
    answers: [
      { text: "Chennai Super Kings", correct: false },
      { text: "Mumbai Indians", correct: false },
      { text: "Kolkata Knight Riders", correct: false },
      { text: "Royal Challengers Bangalore", correct: true },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    nextButton.addEventListener('click', handleNextButton);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) {
    score++;
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('incorrect');
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', handleNextButton);

function handleNextButton() {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = 'block';
  nextButton.addEventListener('click', startGame);
}

startGame();