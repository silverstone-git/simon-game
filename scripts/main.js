game_intro = $("#game-intro");

$(document).on("keypress", function() {
    game_intro.html("0 / 1")
    // fade animation for next random color event
    var randomInt = parseInt(Math.random()*4);
    fadeInFadeOut($("#" + allColors[randomInt]));
    chosenButtons.push(allColors[randomInt]);
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
    //console.log(myClickedButtons);
    //console.log(chosenButtons);


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
        // fade animation for next random color event
        var randomInt = parseInt(Math.random()*4);
        // chosen buttons array are the ones chosen by the computer, at random, which the user has to match
        chosenButtons.push(allColors[randomInt]);
        //console.log(allColors[randomInt] + "appended to list");
        setTimeout(function() {
            fadeInFadeOut($("#" + allColors[randomInt]));
            var audio = new Audio("./sounds/" + allColors[randomInt] + ".mp3");
            audio.play();
        }, 1000)
    }


})