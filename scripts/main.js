game_intro = $("#game-intro");

function randomColor() {
    // function to run for a new random color, to increase the level

    var randomInt = parseInt(Math.random()*4);
    fadeInFadeOut($("#" + allColors[randomInt]));
    var audio = new Audio("./sounds/" + allColors[randomInt] + ".mp3");
    audio.play();

    // chosen buttons array are the ones chosen by the computer, at random, which the user has to match
    chosenButtons.push(allColors[randomInt]);
}


$(document).on("keypress", function() {
    game_intro.html("0 / 1")
    randomColor();
})

game_intro.click(function() {
    game_intro.html("0 / 1")
    randomColor();
})

for(var $colorbox of $(".colorbox")) {
    allColors.push($colorbox.id)
}


function fadeInFadeOut($tobeanimated) {
    // fade in fade out animation using animate css
    $tobeanimated.addClass("animate__animated animate__fadeIn");
}


$(".colorbox").click(function() {

    myClickedButtons.push(this.id);
    fadeInFadeOut($("#" + this.id));


    var getRand = false;
    if(this.id == chosenButtons[myClickedButtons.length-1] && myClickedButtons.length == chosenButtons.length) {
        // when user remembers everything from the current level
        game_intro.html("Level Up");
        var audio = new Audio("./sounds/" + this.id + ".mp3");
        audio.play();
        myClickedButtons = [];
        getRand = true;

    } else if(this.id != chosenButtons[myClickedButtons.length-1]){
        // wrong color chosen case
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play;
        game_intro.html("You Lose, your score was " + chosenButtons.length);
        myClickedButtons = [];

    } else {
        // in the middle of the level case, updates the status
        var audio = new Audio("./sounds/" + this.id + ".mp3");
        audio.play();
        game_intro.html(myClickedButtons.length + " / " + chosenButtons.length);
    }

    if(getRand) {
        // a delay to let the user read the level up sign and get prepared for next random color
        setTimeout(function() {
            randomColor();
        }, 1000)
    }


})