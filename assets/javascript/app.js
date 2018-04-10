$(document).ready(function () {
    var game = {
        question: ['a', 'b', 'c', 'd', 'e', 'f'],
        choices: [['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f'], ['a', 'b', 'c', 'd', 'e', 'f']
        ],
        correctChoice: ['a', 'b', 'c', 'd', 'e', 'f'],
        choiceImg: ['a', 'b', 'c', 'd', 'e', 'f'],
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


    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block startButton' href='#' role='button'>Start Quiz</a></p>";
        $(".gameArea").html(startScreen);
    }

    initialScreen();

    //function startGame() {
    //  $('#startButton').click(function(){

    //})

    //}
    function newQuestion() {
        questionNumber = Math.floor(Math.random() * game.question.length);
        console.log(questionNumber);
        currentQuestion = game.question[questionNumber];
        console.log(currentQuestion);

    }
    function pause() {
        newHtml()
        timeCountdown = 15;
        timerWrapper()
    }
    
    function correctAnswer() {
        winCounter++;
        contentHtml = "<p>That is Correct!</p>";
        $('.gameArea').html(contentHtml);
        setTimeout(pause, 5000);

    }

    $('body').on('click', '.startButton', function (event) {
        newHtml();
        timerWrapper();
        console.log('start');
    });

    $('body').on('click', '.answer', function (event) {
        console.log('true')
        answerChoice = $(this).text();
        if (answerChoice === game.correctChoice[questionNumber]) {
            console.log('correct');
            correctAnswer();
        }
        console.log(answerChoice);
    })
    


function newHtml() {
    contentHml = "<p>Time remaining:<div class = 'timer'>15</div><p>" + game.question[questionNumber] + "</p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][0] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][1] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][2] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][3] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][4] + "</button></p><p><button type='button' class='btn btn-light answer'>" + game.choices[questionNumber][5] + "</button></p>";
    $('.gameArea').html(contentHml);
    

}

function timerWrapper() {
	clock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
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
    contentHtml = "<p>Times Up!!</p><p>The correct answer was: </p>" + game.correctChoice[questionNumber] + "</p>"; 
    $('.gameArea').html(contentHtml);
    setTimeout(pause, 5000);
}


    




newQuestion();


}

})
