$(document).ready(function () {
    var game = {
        theme: ['Disney Villains'],
        question: ['Who is the main villain in The Lion King?', 'Who is the main villain in The Little Mermaid?', 'Who is the villain in Aladdin?', 'Who is main vilain from the Jungle Book', 'Who is the sidekick of the villain in Aladdin?', 'Who is the sidekick of the villain in Up?'],
        choices: [['Scar', 'Lala', 'Scab', 'Timon', 'Pumba', 'Ursula'], ['Sebastian', 'Flounder', 'King Triton', 'Ursula', 'Jafar', 'Maleficent'], ['Genie', 'Abu', 'The Sultan', 'Scar', 'Jafar', 'Timon'], ['Mowgli', 'Baloo', 'Jafar', 'Scar', 'King Louie', 'Shere Khan'], ['Iago', 'Shere Khan', 'Princess Jasmine', 'Scar', 'Baloo', 'Timon'], ['Rafiki', 'Alpha', 'Dug', 'Ursula', 'Scar', 'Russell']
        ],
        correctChoice: ['Scar', 'Ursula', 'Jafar', 'Shere Khan', 'Iago', 'Alpha'],
        choiceImg: ['assets/images/scar.gif', 'assets/images/ursula.gif', 'assets/images/Jafar.gif', 'assets/images/sherekhan.gif', 'assets/images/iago.gif', 'assets/images/up.gif'],
        loserImg: ['assets/images/loserQuote.jpeg'],
        winImg: ['assets/images/winLionKing.gif','assets/images/mermaidWin.gif','assets/images/aladdinWin.gif','assets/images/jungleWin.gif','assets/images/aladdinWin.gif','assets/images/upWin.gif']
    }

    var timeCountdown = 15;
    var questionNumber = Math.floor(Math.random() * game.question.length);
    var clock;
    var answerChoice;
    var lossCounter = 0;
    var winCounter = 0;
    var contentHtml;
    let questionAskedArray =[]

    
    function newQuestion() {
        currentQuestion = game.question[questionNumber]
        
        if (questionAskedArray.includes(questionNumber)){
            questionNumber = Math.floor(Math.random() * game.question.length)
            return newQuestion()
        }
        else{
            questionAskedArray.push(questionNumber)
            newHtml()}

    }

    function newHtml() {
        contentHtml = "<div class= 'text-center contentText'><p>Time remaining:<div class = 'timer'>15</div></p><div class ='row'><div class ='col-6'><p>Correct Answers:<div class ='winCounter'>0</div></div><div class='col-6'>Wrong Answers:<div class ='lossCounter'>0</div></div></p></div><div class = 'row'><div class = 'col-12'><p class = 'question'>" + game.question[questionNumber] + "</p></div></div><div class='row'><div class='col-6'><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][0] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][1] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][2] + "</button></p></div><div class = 'col-6'><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][3] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][4] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][5] + "</button></p></div></div>";
        $('.gameArea').html(contentHml);
        $('.winCounter').html(winCounter);
        $('.lossCounter').html(lossCounter);



    }


    function initialScreen() {
        startScreen = "<p class = 'themeName'>" + game.theme + "</p><p class ='themeName'>Trivia Game</p><p class='text-center main-button-container'><a class='btn btn-primary startButton' href='#' role='button'>Start Quiz</a></p>";
        $(".gameArea").html(startScreen);
    }

    initialScreen();

    function winScreen() {

        contentHtml = "<div class= 'text-center contentText'><p>Congratulations! You know your " + game.theme + ".</p><p> Press reset to try again</p><p class='text-center main-button-container'><a class='btn btn-primary resetButton' href='#' role='button'>Restart Quiz</a></p><img src =" + game.winImg[questionNumber] + " class='rounded'></div>";
        $('.gameArea').html(contentHtml);
        questionAskedArray = []
    }

    function lossScreen() {
        contentHtml = "<div class ='text-center contentText'><img src =" + game.loserImg + "><p>But you lost. Press reset to try again</p><p class='text-center main-button-container'><a class='btn btn-primary resetButton' href='#' role='button'>Restart Quiz</a></p></div>";
        $('.gameArea').html(contentHtml);
        questionAskedArray = []


    }


    function pause() {
        newQuestion()
        timeCountdown = 15;
        timerCount()
    }

    function correctAnswer() {
        winCounter++;
        if (winCounter === 3) {
            console.log("You win");
            winScreen();
        }
        else if (winCounter < 3) {
            contentHtml = "<div class = 'text-center contentText'><p>That is Correct!</p><img src =" + game.choiceImg[questionNumber] + " class='rounded'></div>";
            $('.gameArea').html(contentHtml);
            setTimeout(pause, 5000);
        }
    }

    function wrongAnswer() {
        lossCounter++;
    
        if (lossCounter === 3) {
            console.log("Loser");
            lossScreen();
        }
        else if (lossCounter < 3) {
            contentHtml = "<div class='text-center contentText'><p>Wrong Answer!</p><p>The correct answer was: </p>" + game.correctChoice[questionNumber] + "</p><img src =" + game.choiceImg[questionNumber] + " class='rounded'></div>";
            $('.gameArea').html(contentHtml);
            setTimeout(pause, 5000);
        }


    };

    $('body').on('click', '.startButton', function (event) {
        newQuestion();
        timerCount();
    });

    $('body').on('click', '.answer', function (event) {
        answerChoice = $(this).text();
        if (answerChoice === game.correctChoice[questionNumber]) {
            console.log('correct');
            correctAnswer();
            clearInterval(clock);
        }
        else {
            console.log('wrong');
            wrongAnswer();
            clearInterval(clock);
        }
        
    })

    $('body').on('click', '.resetButton', function (event) {
        lossCounter = 0;
        winCounter = 0;
        timeCountdown = 15;
        newQuestion();
        timerCount();
        
    })





    function timerCount() {
        clock = setInterval(timeLength, 1000);
        function timeLength() {
            if (timeCountdown === 0) {
                clearInterval(clock);
                lossDueToTimeOut();
            }
            if (timeCountdown > 0) {
                timeCountdown--;
            }
            $(".timer").html(timeCountdown);
        }



        function lossDueToTimeOut() {
            lossCounter++;
            
            if (lossCounter === 3) {
                lossScreen();
            }
            else if (lossCounter < 3) {
                contentHtml = "<div class = 'text-center contentText'><p>Times Up!!</p><p>The correct answer was: </p>" + game.correctChoice[questionNumber] + "</p></div>";
                $('.gameArea').html(contentHtml);
                setTimeout(pause, 5000);
            }
        }











    }

})
