const buttonColors = ["red", "blue", "green", "yellow"];
let randomNumber;
let randomChosenColor;

let gamePattern = [];
let userClickedPattern = [];

let isGameStarted = false;
let level = 0;
let levelText =   $("#level-title");

$(document).keypress(function(){
    if (isGameStarted === false){
        isGameStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});


$(".btn").click(function(e){
    if (isGameStarted === true){
        let userChosenColour  = e.target.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    }

});


function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 3);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let i = 0;
    if (gamePattern.length > 0){
        console.log("begin loop");
        gamePatternLoop(i);
    }

    level++;
    levelText.text("Level " + level);
    i = 0;
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function gamePatternLoop(i){

    setTimeout(function(){
        $("#"+gamePattern[i]).fadeOut(250).fadeIn(250);
        playSound(gamePattern[i]);
        i++;
        if (i < gamePattern.length){
            gamePatternLoop(i);
        }
    }, 500);

}




function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(userClickedArrayElement){

    if (userClickedPattern[userClickedArrayElement] !== gamePattern[userClickedArrayElement]){
        console.log("wrong pattern clicked");
        wrongColor();
    }
    else if (userClickedArrayElement === gamePattern.length-1){
        console.log("correct!");
        setTimeout(nextSequence, 1000);
    }
}


function wrongColor(){
    playSound("wrong");
    levelText.text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    isGameStarted = false;
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");

    }, 200);
}