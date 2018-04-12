$(document).ready(function () {
    var game = {
        theme: ['Disney Villains'],
        question: ['a', 'b', 'c', 'd', 'e', 'f'],
        choices: [['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f']
        ],
        correctChoice: ['a', 'b', 'c', 'd', 'e', 'f'],
        choiceImg: ['assets/images/350x150_1.png', 'assets/images/350x150_1.png', 'assets/images/350x150_1.png', 'assets/images/350x150_1.png', 'assets/images/350x150_1.png', 'assets/images/350x150_1.png'],
        loserImg: ['assets/images/loserQuote.jpeg'],
    }
    var currentQuestion = '';

    var timeCountdown = 15;
    var timeRemain = 0
    var questionNumber = 0;
    var clock;
    var answerChoice;
    var lossCounter = 0;
    var winCounter = 0;
    var contentHml;

    function newHtml() {
        contentHml = "<p>Time remaining:<div class = 'timer'>15</div><p><p>Correct Answers:<div class ='winCounter'>0</div></p><p>Wrong Answers:<div class ='lossCounter'>0</div></p>" + game.question[questionNumber] + "</p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][0] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][1] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][2] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][3] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][4] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][5] + "</button></p>";
        $('.gameArea').html(contentHml);
        $('.winCounter').html(winCounter);
        $('.lossCounter').html(lossCounter);



    }


    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block startButton' href='#' role='button'>Start Quiz</a></p>";
        $(".gameArea").html(startScreen);
    }

    initialScreen();

    function winScreen() {

        contentHtml = "<p>Congratulations! You know your " + game.theme + "</p><p> Press reset to try again</p><p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block resetButton' href='#' role='button'>Restart Quiz</a></p>";
        $('.gameArea').html(contentHtml);

    }

    function lossScreen() {
        contentHtml = "<img src =" + game.loserImg + "><p>But you lost. Press reset to try again</p><p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block resetButton' href='#' role='button'>Restart Quiz</a></p>";
        $('.gameArea').html(contentHtml);


    }

    function newQuestion() {
        questionNumber = Math.floor(Math.random() * game.question.length);
        console.log(questionNumber);
        currentQuestion = game.question[questionNumber];
        console.log(currentQuestion);

    }
    function pause() {
        newHtml()
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
            contentHtml = "<p>That is Correct!</p><img src =" + game.choiceImg[questionNumber] + ">";
            $('.gameArea').html(contentHtml);
            setTimeout(pause, 5000);
        }
    }

    function wrongAnswer() {
        lossCounter++;
        console.log(lossCounter);
        if (lossCounter === 3) {
            console.log("Loser");
            lossScreen();
        }
        else if (lossCounter < 3) {
            contentHtml = "<p>Wrong Answer!</p><p>The correct answer was: </p>" + game.correctChoice[questionNumber] + "</p>";
            $('.gameArea').html(contentHtml);
            setTimeout(pause, 5000);
        }


    };

    $('body').on('click', '.startButton', function (event) {
        newHtml();
        timerCount();
        console.log('start');
    });

    $('body').on('click', '.answer', function (event) {
        console.log('true')
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
        console.log(answerChoice);
    })

    $('body').on('click', '.resetButton', function (event) {
        lossCounter = 0;
        winCounter = 0;
        timeCountdown = 15;
        newHtml();
        timerCount();
        console.log('restart');
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
            console.log(lossCounter);
            if (lossCounter === 3) {
                lossScreen();
            }
            else if (lossCounter < 3) {
                contentHtml = "<p>Times Up!!</p><p>The correct answer was: </p>" + game.correctChoice[questionNumber] + "</p>";
                $('.gameArea').html(contentHtml);
                setTimeout(pause, 5000);
            }
        }




        //function resetGame() {
        //    p class='text-center main-button-container'><a class='btn //btn-primary btn-lg btn-block startButton' href='#' //role='button'>Start Quiz</a></p>
        // }




        newQuestion();


    }

})
