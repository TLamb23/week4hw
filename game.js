const startEl = document.querySelector('#beginQuiz');
const questionTitleEl = document.querySelector('#question-title');
const choicesEl = document.querySelector('#choices');
const startScreenEl = document.querySelector('#start-screen');
const questionsEl = document.querySelector('#questions');
const timerEl = document.querySelector('#timer');
const feedbackEl = document.querySelector('#feedback');
const endScreenEl = document.querySelector('#end-screen');
const finalScoreEl = document.querySelector('#final-score');
const initialsEl = document.querySelector('#initials');
const submitBtn = document.querySelector('#submit');
const highscoreEl = document.querySelector('#highscore-screen');
const restartEl = document.querySelector('#restart');

const questions =[
    {
        question: "Who is the greatest quarterback of all time?",
        choices: ['Tom Brady', 'Peyton Manning', 'Joe Montana', 'Johnny Unitas'],
        answer: 'Tom Brady'
    },
    {
        question: 'Who has the most pass yards of all time?',
        choices: ['Tom Brady', 'Peyton Manning', 'Drew Bress', 'Dan Marino'],
        answer: 'Drew Brees',
    },
    {
        question: 'Who has the most rushing yards all time?',
        choices: ['Emmitt Smith', 'Peyton Manning', 'Drew Bress'],
        answer:'Emmitt Smith',
    },
    {
        question: 'Who is the winningest coach in NFL history?',
        choices: ['Bill Walsh', 'Vince Lombardi', 'Bill Belichick', 'Don Shula'],
        answer:'Don Shula',
    },
    {
        question: 'Who is the leading career reception yards leader?',
        choices: ['Randy Moss', 'Jerry Rice', 'Calvin Johnson', 'Vince Carter'],
        answer:'Jerry Rice',
    }
]

let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

const getQuestion = () => {
    let currentQuestion = questions[currentQuestionIndex];

    questionTitleEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = '';

    currentQuestion.choices.forEach(choice => {
       let choiceButton = document.createElement('button');
       choiceButton.setAttribute('value', choice);
       choiceButton.textContent = choice;
       choiceButton.addEventListener('click', answerCheck);
       choicesEl.appendChild(choiceButton);

    });
}
const answerCheck = ({target: {value}}) => {
    if(value !== questions [currentQuestionIndex].answer) {
        time -= 15;
        if(time < 0) {
            time = 0;
        }
        feedback.textContent = "Wrong!";
    } else { 
        feedback.textContent = "Correct!";
    }
    feedbackEl.removeAttribute('class');
    setTimeout(() => {
        feedbackEl.setAttribute('class', 'hide')
    }, 2000)

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length) {
quizEnd();
    }else{
        getQuestion();
    }
    
}
const clockTick = () => {
    time--;
    timerEl.textContent = time;
    if(time <= 0) {
        quizEnd();
    }
}

const saveHighScore = () =>{

    let initials = initialsEl.value.trim();
    if(initials !== ""){
        let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

        let newScore = {
            score: time, 
            initials: initials,
          
        };

        highscores.push(newScore);
        localStorage.setItem('highscores', JSON.stringify(highscores));

        printHighScore();
        //window.location.href
    } 
}

const printHighScore = () => {
    endScreenEl.setAttribute('class', 'hide');

    
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    
    highscores.sort((a, b) => b.score - a.score) 
    
    highscores.forEach(score => {
        let liTag = document.createElement('li')
        liTag.textContent = `${score.initials} - ${score.score}`
        
        const olEl = document.querySelector('#highscores')
        highscoreEl.appendChild(liTag)
    })
    highscoreEl.removeAttribute('class');
}
const quizEnd = () => {
    clearInterval(timerId);

    endScreenEl.removeAttribute('class');

    finalScoreEl.textContent = time;

    questionsEl.setAttribute('class', 'hide');
}


const startQuiz = () => {
   currentQuestionIndex = 0;
   time = questions.length * 15;
   highscoreEl.setAttribute('class', 'hide');
   startScreenEl.setAttribute('class', 'hide');
   questionsEl.removeAttribute('class');

timerId = setInterval(clockTick, 1000) 

    getQuestion();
};

const checkForEnter = event => {
    if(event.key === "Enter") {
        saveHighScore();
    }
}
submitBtn.addEventListener('click', saveHighScore)
restartEl.addEventListener('click', startQuiz)
startEl.addEventListener('click', startQuiz)