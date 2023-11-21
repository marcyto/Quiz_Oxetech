
// element selectors
var scoreDisplay = document.querySelector("#custom-score");
var timerDisplay = document.querySelector("#custom-timer");
var titleDisplay = document.querySelector("#custom-header");
var startButton = document.querySelector("#start-button");
var scoreButton = document.querySelector("#score-button");
var questionDisplay = document.querySelector("#question-display");
var quizQuestion = document.querySelector("#quiz-question");
var quizCode = document.querySelector("#quiz-code");
var answerOne = document.querySelector("#answer1");
var answerTwo = document.querySelector("#answer2");
var answerThree = document.querySelector("#answer3");
var answerFour = document.querySelector("#answer4");
var gameOverDisplay = document.querySelector("#game-over");
var gameOverOverlay = document.querySelector("#overlay-background");
var gameOverScore = document.querySelector("#game-over-score");
var gameOverSplash = document.querySelector("#game-over-splash");
var userNameForm = document.querySelector("#name-form");
var userName = document.querySelector("#userName");
var HighScoreList = document.querySelector("#score-list");
var dynamicList = document.querySelector("#dynamic-list");
var submitBtn = document.querySelector("#submit-btn");
var letsGoAgain = document.querySelector("#go-again");
var clearHighScores = document.querySelector("#clear-scores");
var retakeQuiz = document.querySelector("#retake-quiz");
var footer = document.querySelector("#footer");

var timerInterval; // make interval global
var currentTime = 180; //  start with a minute on the clock
var score = 0; // score start
var currentQuestion = 0; // keep adding to it to access others in the quiz Index
var questionTimeLeft = 20;
var multiplicadorDePontos = 20;
var scoreList = []; // empty score list

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

var quizQuestionsArray = [
    {
        question: "O que podemos fazer com um computador?",
        answers: [
            "Acessar sites",
            "Jogar",
            "Fazer planilhas",
            "Todas as alternativas",
        ],
        optrue: "Todas as alternativas",
        code: "",
    },
    {
        question: "Quantas paginas existem na internet?",
        answers: [
            "1.000.000",
            "350.000.000",
            "35.000",
            "1.980.000.000"
        ],
        optrue: "1.980.000.000",
        code: "",
    },
    {
        question: "Qual é o 'cérebro' do computador?",
        answers: [
            "CPU - Processador",
            "GPU - Placa de vídeo",
            "RAM - Memória",
            "HDD - Disco rígido"
        ],
        optrue: "CPU - Processador",
        code: "",
    },
    {
        question: "Qual desses é um dispositivo de Saída?",
        answers: [
            "Monitor",
            "Teclado",
            "Mouse",
            "Todas as alternativas"
        ],
        optrue: "Monitor",
        code: "",
    },
    {
        question: "Qual desses é um dispositivo de Entrada?",
        answers: [
            "Monitor",
            "Teclado",
            "Fone de Ouvido",
            "Todas as alternativas"
        ],
        optrue: "Teclado",
        code: "",
    },{
        question: "Qual dessas peças é responsvavel pelo armazenamento de dados?",
        answers: [
            "CPU - Processador",
            "GPU - Placa de vídeo",
            "RAM - Memória",
            "HDD - Disco rígido"
        ],
        optrue: "HDD - Disco rígido",
        code: "",
    },{
        question: "Na informática, existe um sistema de medidas que é medido em números e letras. Baseando-se nessa afirmação, qual das alternativas representa uma dessas medidas?",
        answers: [
            "10KG",
            "A4",
            "U2",
            "1GB"
        ],
        optrue: "1GB",
        code: "",
    },{
        question: "Qual foi a primeira rede social da história da internet?",
        answers: [
            "MySpace",
            "Classmate",
            "Orkut",
            "Facebook"
        ],
        optrue: "Classmate",
        code:"",
    },{
        question: "O que significa a sigla “WWW” na internet?",
        answers: [
            "World Wide Web",
            "Web World Wide",
            "Web Wide World",
            "World War Won"
        ],
        optrue: "World Wide Web",
        code: "",
    },
    {
        question: "Software é o:",
        answers: [
            "Conjunto de programas que permitem o funcionamento e utilização da máquina",
            "Conjunto de componentes que permitem o funcionamento e utilização do sistema operacional",
            "Conjunto de programas que permitem o funcionamento e utilização do navegador",
            "Conjunto de componentes que formam a parte física do computador"
        ],
        optrue: "Conjunto de programas que permitem o funcionamento e utilização da máquina",
        code: "",
    },
    {
        question: "A área de trabalho também é conhecida como:",
        answers: [
            "Documentos",
            "Desktop",
            "Word",
            "Internet",
            "HD"
        ],
        optrue: "Desktop",
        code: "",
    },
    {
        question: "Buscador da internet mais utilizado atualmente:",
        answers: [
            "Google",
            "Bing",
            "Youtube",
            "Yahoo",
            "ASK"
        ],
        optrue: "Google",
        code: "",
    },
    {
        question: "Download é:",
        answers: [
            "Enviar vírus para outro computador",
            "Cadastrar-se em um site",
            "Ato de enviar arquivos",
            "Baixar qualquer arquivo da internet",

        ],
        optrue: "Baixar qualquer arquivo da internet",
        code: "",
    },
    {
        question: "O que é informática?",
        answers: [
            "É a habilidade de invadir um sistema",
            "É o conjunto das ciências da informação",
            "É o conjunto de componentes de hardware",
            "É um determinado conjunto de programas de computador",
            "É a disciplina que estuda os meios de comunicação"
        ],
        optrue: "É o conjunto das ciências da informação",
        code: "",
    },
];

quizQuestionsArray = shuffle(quizQuestionsArray);

// setting display visibility
if (scoreDisplay) { scoreDisplay.hidden = true; } //  hide score, timer, and q&a areas
if (timerDisplay) { timerDisplay.hidden = true; }
if (questionDisplay) { questionDisplay.hidden = true; }
if (gameOverDisplay) { gameOverDisplay.hidden = true; } // hide all end screens
if (gameOverOverlay) { gameOverOverlay.hidden = true; }
if (HighScoreList) { HighScoreList.hidden = true; }
if (letsGoAgain) { letsGoAgain.hidden = true; }

// begin script
init();

// retrieves list of previous scores in local storage
function init() {
    // need to parse array of user score objects

    var storedScoreList = [];
    if (localStorage.getItem("scoresList") !== null) {
        storedScoreList = JSON.parse(atob(localStorage.getItem("scoresList").replaceAll("GGG", "F")));
    }

    // assign the parsed array to scoreList array to render later
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    // prepare the score list to show later
    renderScoreList();
    // we are at start of the quiz
    currentQuestion = 0;
}


function showScore(event) {
    event.preventDefault();
    HighScoreList.hidden = false;
    footer.hidden = true;
    titleDisplay.hidden = true;
    startButton.hidden = true;
    scoreButton.hidden = true;
    gameOverOverlay.hidden = false;
    gameOverDisplay.hidden = false;
    userNameForm.hidden = true;
    gameOverSplash.hidden = true;
    letsGoAgain.hidden = false;
    clearHighScores.hidden = false;
    renderScoreList();
}

// start or restarting quiz; reset all visible sections and variables
function startQuiz(event) {
    event.preventDefault();
    footer.hidden = true;
    gameOverSplash.hidden = true;
    titleDisplay.hidden = true;
    startButton.hidden = true;
    scoreButton.hidden = true;
    score = 0; // reset score
    currentTime = 180; //reset clock
    currentQuestion = 0; // reset to start of quiz
    questionDisplay.hidden = false; // show Q&A
    // display score and timer
    scoreDisplay.textContent = "Pontuação: 00" + score;
    scoreDisplay.hidden = false;
    timerDisplay.textContent = "Tempo: " + currentTime;
    timerDisplay.hidden = false; // could be put in function instead

    // initialize countdown timer
    setTime();
    // render Q&A
    renderQuestion();
}

// this function taken from class activities
// begins the countdown
function setTime() {
    timerInterval = setInterval(function () {
        questionTimeLeft--;
        console.log(questionTimeLeft);
        console.log(multiplicadorDePontos);

        if (questionTimeLeft <= 5) {
            multiplicadorDePontos = 5;
        }
        if (questionTimeLeft <= 2) {
            questionTimeLeft = 1;
        }

        currentTime--;
        timerDisplay.textContent = "Tempo: " + currentTime;

        // Time is up, game over
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            questionTimeLeft = 20;
            multiplicadorDePontos = 20;
            gameOver();
        }
        // if you have less than 10 secs left
        // display a red shadow around the timer
        if (currentTime <= 10) {
            timerDisplay.setAttribute("style", "box-shadow: 0px 5px 2px red");
        }
    }, 1000);
}

// populates the question and answer fields
function renderQuestion() {
    // did we run out of questions? if so, game over.
    if (currentQuestion >= quizQuestionsArray.length) {
        gameOver();
        return;
    }
    // reset all of the stylings from right/wrong answers and displays
    answerOne.removeAttribute("style");
    answerTwo.removeAttribute("style");
    answerThree.removeAttribute("style");
    answerFour.removeAttribute("style");
    scoreDisplay.removeAttribute("style");
    timerDisplay.removeAttribute("style");

    //reset to default 4 choices
    answerOne.hidden = false;
    answerTwo.hidden = false;
    answerThree.hidden = false;
    answerFour.hidden = false;
    // perhaps will implement true of false questions
    if (quizQuestionsArray[currentQuestion].answers.length < 4) {
        //true of false question
        answerThree.hidden = true;
        answerFour.hidden = true;
    }

    //   populate next question and its answer choices
    quizQuestion.textContent = quizQuestionsArray[currentQuestion].question;
    quizCode.innerHTML = quizQuestionsArray[currentQuestion].code;

    // go print list of answers for however many answers there are
    // only <p> elements are the possible answer choices
    var listOfAnswers = document.querySelectorAll("p");
    for (var i = 0; i < quizQuestionsArray[currentQuestion].answers.length; i++) {
        listOfAnswers[i].textContent =
            quizQuestionsArray[currentQuestion].answers[i];
    }
}

// this function checks for right or wrong responses
function verifyResponse(event) {
    event.preventDefault();
    // grab this element being clicked
    var thisAnswer = event.target;
    // this variable holds the return value of setTimeout()
    var timeOutId = 0;

    if (
        // correct choice!
        thisAnswer.textContent === quizQuestionsArray[currentQuestion].optrue
    ) {
        // se acertar em menos de 3 segundos então obterá menos pontuação
        if (questionTimeLeft > 17) {
            multiplicadorDePontos = 1;
        }

        // disabled double click
        thisAnswer.setAttribute(
            // change style to green to indicate correct choice
            "style",
            "background-color: rgb(104, 226, 56); color: white; box-shadow: 0px 5px 2px rgb(104, 226, 56);pointer-events:none"
        );
        score = score + questionTimeLeft * multiplicadorDePontos; // get 377 points
        currentQuestion++; // go to next question index
        // update score, flash green
        scoreDisplay.textContent = "Pontuação: " + score;
        scoreDisplay.setAttribute(
            "style",
            "box-shadow: 0px 5px 3px rgb(104, 226, 56)"
        );
        // this function sets a delay, so we can see if you got it right or wrong
        // then render the next question after the short delay
        timeOutId = window.setTimeout(renderQuestion, 600);
    } else {
        // wrong choice!
        //  disabled double click
        thisAnswer.setAttribute(
            // style this answer with red to indicate incorrect response
            "style",
            "background-color: red; color: white; box-shadow: 0px 5px 2px red;pointer-events:none"
        );
        // flash timer display with yellow to indicated penalty
        timerDisplay.setAttribute("style", "box-shadow: 0px 5px 3px yellow");
        currentTime = currentTime - 14; // penalty, you got it wrong!
        currentQuestion++; // next question
        // delay to show the color indication right or wrong
        timeOutId = window.setTimeout(renderQuestion, 600);
    }

    // reseta multiplicador e tempo restante apos resposta recebida
    multiplicadorDePontos = 20;
    questionTimeLeft = 20;
}

// this function is called when
// A. time is up, or B. we ran out of questions
function gameOver() {
    gameOverOverlay.hidden = false; // display overlay and game over screen
    gameOverDisplay.hidden = false;
    gameOverSplash.hidden = false; // prompt user name
    userNameForm.hidden = false; // display scores and buttons
    clearHighScores.hidden = true;
    retakeQuiz.hidden = false;
    letsGoAgain.hidden = false;
    HighScoreList.hidden = false;
    answerOne.hidden = true;
    answerTwo.hidden = true;
    answerThree.hidden = true;
    answerFour.hidden = true;

    clearInterval(timerInterval); // freeze time
    // display final score
    gameOverScore.textContent = "FIM do desafio! Você conseguiu " + score + " pontos!";
}

// this function is called to store a new entry
function storeScores() {
    localStorage.setItem("scoresList", btoa(JSON.stringify(scoreList)).replace("F", "GGG"));
}

// this function renders the score list
function renderScoreList() {
    // first clear everything
    if (dynamicList)
        dynamicList.innerHTML = "";
    if (scoreList) {
        // ordenando por pontuação mais alta
        scoreList.sort(function (a, b) {
            if (a.highScore > b.highScore) {
                return -1
            }

            if (a.highScore === b.highScore) {
                return 0
            }

            if (a.highScore < b.highScore) {
                return 1
            }
        });
    }


    if (scoreList) {
        // loop through the stored scores and print them onto li elements
        for (var i = 0; i < scoreList.length; i++) {
            var storedScores = scoreList[i];
            var tr = document.createElement("tr");

            var td = document.createElement("td");
            td.textContent = i + 1;
            tr.appendChild(td);

            var td = document.createElement("td");
            td.textContent = scoreList[i].name
            tr.appendChild(td);

            var td = document.createElement("td");
            tr.appendChild(td);
            var span = document.createElement("span");
            span.textContent = scoreList[i].highScore;
            td.appendChild(span);

            dynamicList.appendChild(tr);
        }
    }
}


// double submit capability
// with enter or clicking submit button
function submitScores(event) {
    event.preventDefault();
    // grab user input name
    var user = userName.value.trim();
    // clear the input field
    userName.value = "";
    // if empty string, don't submit
    if (user === "") {
        return;
    }

    user = user.toLowerCase();

    const arr = user.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    user = arr.join(" ");

    // create a new object containing user and score pair
    var userScore = {
        name: user,
        highScore: score,
    };

    let user_added = true;
    for (var i = 0; i < scoreList.length; i++) {
        if (scoreList[i].name === user) {
            alert("O seu nome já está na lista!");
            user_added = false;
            break;
        }
    }

    if (user_added) {
        // push new user-score pair into score list array
        scoreList.push(userScore);
        // now store, then display score list
        storeScores();
        userNameForm.hidden = true;
        gameOverSplash.hidden = true;
        HighScoreList.hidden = false;
        letsGoAgain.hidden = false;
        renderScoreList();
    }

}
// this function erases local storage, score list,
// and clears global array variable
function clearScores(event) {
    // need to clear local storage too
    event.preventDefault();

    let pw = prompt("Digite a senha para zerar o placar: ");

    if (pw === "inovacaoal") {
        dynamicList.innerHTML = "";
        localStorage.clear();
        scoreList = [];
    } else {
        if (!!pw)
            alert("Senha invalida!")
    }

}

// event listeners for buttons and submit
if (startButton)
    startButton.addEventListener("mouseup", startQuiz);
if (scoreButton)
    scoreButton.addEventListener("mouseup", showScore);
if (answerOne)
    answerOne.addEventListener("click", verifyResponse);
if (answerTwo)
    answerTwo.addEventListener("click", verifyResponse);
if (answerThree)
    answerThree.addEventListener("click", verifyResponse);
if (answerFour)
    answerFour.addEventListener("click", verifyResponse);
if (submitBtn)
    submitBtn.addEventListener("click", submitScores);
if (userNameForm)
    userNameForm.addEventListener("submit", submitScores);
if (clearHighScores)
    clearHighScores.addEventListener("mouseup", clearScores);
// retake the quiz, go to start of application
if (retakeQuiz) {
    retakeQuiz.addEventListener("mouseup", function (event) {
        event.preventDefault();
        gameOverDisplay.hidden = true;
        gameOverOverlay.hidden = true;
        questionDisplay.hidden = true;
        scoreDisplay.hidden = true;
        timerDisplay.hidden = true;
        footer.hidden = false;
        titleDisplay.hidden = false;
        startButton.hidden = false;
        scoreButton.hidden = false;

        // reseta multiplicador e tempo restante apos clicar em voltar
        questionTimeLeft = 20;
        multiplicadorDePontos = 20;
    });
}