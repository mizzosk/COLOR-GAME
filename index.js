var gameStatus = 0;
var buttonsColors = ["green","red","yellow","blue"];
var gameColors = [];
var levelColors = [];
var level = 1;


function randomButtonSelect(){
    //change header to Level and
    $("h1").text("Level " + level).css("color","#FEF2BF");
    level++;
    //generate random number / button color selection
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomColor = buttonsColors[randomNumber];
    console.log(randomColor);
    //add random color to buttonsGame color array
    gameColors.push(randomColor);
    levelColors = gameColors;
    console.log(gameColors);
    $("#"+randomColor).fadeToggle(1000).fadeToggle(1000);
};


//capture keypress
$("h1").on("click",function(event){
    if(gameStatus === 0){
        console.log("test");
        $(this).fadeToggle(100).fadeToggle(100);
        $(this).removeClass("header-background");
        if(gameStatus ===0) {
            gameStatus = 1; 
            console.log(gameStatus)
            randomButtonSelect();       
        }
    }
});

//capture button click
$(".button").on("click",function(event){
    var pressedButtonColor = event.target.id;
    console.log(pressedButtonColor);
    $("#"+pressedButtonColor).fadeToggle(100).fadeToggle(100);
    if(levelColors[0] === pressedButtonColor && levelColors.length>1 && gameStatus === 1){
        console.log("farby sedia");
        levelColors = levelColors.slice(1);
        console.log(levelColors);       
    } else if (levelColors[0] === pressedButtonColor && levelColors.length===1 && gameStatus === 1){
        console.log("farby sedia");
        $("h1").text("SUPER");
        setTimeout(function() {
            randomButtonSelect();
            }, 1500);        
    } else if(levelColors[0] !== pressedButtonColor && gameStatus === 1){
        gameColors = [];
        levelColors = [];
        level = 1;
        $("body").css("backgroundColor", "red");
        setTimeout(function() {
        $("body").css("backgroundColor", "rgb(1, 31, 63)");
        }, 500);
        gameStatus = 0;
        $("h1").addClass("header-background");
        $("h1").text("SPUST HRU");        
    }

});





	
		