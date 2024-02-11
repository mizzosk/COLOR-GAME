var gameStatus = 0;
var buttonsColors = ["green","red","yellow","blue"];
var gameColors = [];
var levelColors = [];
var level = 1;
var user = "anonymous";

function randomButtonSelect(){
    //change header to Level and
    $("h1").text("Level " + level);
    level++;
    //generate random number / button color selection
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonsColors[randomNumber];
    //add random color to buttonsGame color array
    gameColors.push(randomColor);
    levelColors = gameColors;
    console.log(gameColors);
    $("#"+randomColor).fadeToggle(700).fadeToggle(700);
};


//start the game
$(".player-button").on("click",function(){
    gameStatus = 1; 
    level = 1;
    user = $(this).find('img').attr('alt')
    setTimeout(function() {
        $(this).fadeToggle(100).fadeToggle(100);
        }, 200);
    $(".player-button").hide();
    $(".top10").hide();
    $(".button").show();
    randomButtonSelect();   
});

//capture button click
$(".button").on("click",function(event){
    var pressedButtonColor = event.target.id;
    console.log(pressedButtonColor);
    if(levelColors[0] === pressedButtonColor && levelColors.length>1 && gameStatus === 1){
        $("#"+pressedButtonColor).fadeToggle(100).fadeToggle(100);
        $("h1").text(levelColors.length-1);
        console.log("farby sedia");
        levelColors = levelColors.slice(1);
        console.log(levelColors);       
    } else if (levelColors[0] === pressedButtonColor && levelColors.length===1 && gameStatus === 1){
        $("#"+pressedButtonColor).fadeToggle(100).fadeToggle(100);
        $("h1").text("SPRAVNE");
        console.log("farby sedia");
        setTimeout(function() {
            randomButtonSelect();
            }, 2000);        
    } else if(levelColors[0] !== pressedButtonColor && gameStatus === 1){
        gameColors = [];
        levelColors = [];
        $(".button").hide();
        $("body").css("backgroundColor", "red");
        setTimeout(function() {
            $("body").css("backgroundColor", "rgb(1, 31, 63)");
        }, 200);
        //reorders h1 after p element
        $("h1").insertAfter($("p"));
        //shows player icon
        $(".player-button img[alt='" + user + "']").parent().show();
        //remove class player-button to make the icon not clickable
        //$(".player-button img[alt='" + user + "']").parent().removeClass("test");
        $("h1").text("Level " + (level-2));  
        setTimeout(function() {
            gameStatus = 0;
            //reorders h1 element back to initial place right after body starts
            $("h1").prependTo("body");
            $("h1").text("ZVOĽ HRÁČA"); 
            $(".player-button").show();  
            //displaying top 10 list
            top10();
        }, 3000);
    }

});


function top10(){
    $(".top10").show();
 // Function to save the user's name and achieved level
function saveUserLevel(user, level) {

    // Retrieve existing user levels or initialize an empty array
    const userLevels = JSON.parse(localStorage.getItem('userLevels')) || [];

    // Create a new user entry with the achieved level
    const userEntry = { user, level };

    // Add the new user entry to the array
    userLevels.push(userEntry);

    // Sort the array in descending order based on levels
    userLevels.sort((a, b) => b.level - a.level);

    // Keep only the top ten levels
    const top10UserLevels = userLevels.slice(0, 10);

    // Save the updated user levels to localStorage
    localStorage.setItem('userLevels', JSON.stringify(userLevels));
    // Save the top 10 levels to another key in localStorage if needed
    localStorage.setItem('top10UserLevels', JSON.stringify(top10UserLevels));

    // Display the levels on the webpage
    displayUserLevels();
}

// Function to display top ten user levels as a table
function displayUserLevels() {
    const top10UserLevels = JSON.parse(localStorage.getItem('top10UserLevels')) || [];

    // Create a table HTML string
    let tableHtml = '<table border="1">';
    tableHtml += '<tr><th>Poradie</th><th>Hráč</th><th>Level</th></tr>';

    // Initialize ranking outside the loop
    let ranking = 1;

    // Populate the table rows with user names, levels, and rankings
    top10UserLevels.forEach(entry => {
        tableHtml += `<tr><td>${ranking + "."}</td><td>${entry.user}</td><td>${entry.level}</td></tr>`;
        ranking++; // Increment ranking for each iteration
    });

    tableHtml += '</table>';

    // Set the innerHTML of the <p> element with class "top10" to the table HTML
    document.querySelector('.top10').innerHTML = tableHtml;
}

saveUserLevel(user, level-2);

// // Display the levels on the webpage when it loads
// displayUserLevels();

// function deleteTop10UserLevels() {

//     localStorage.removeItem('top10UserLevels');


//     displayUserLevels();
// };

// deleteTop10UserLevels();

// function deleteAllUserLevels() {
//     // Remove all user levels from localStorage
//     localStorage.removeItem('userLevels');
//     localStorage.removeItem('top10UserLevels');

//     displayUserLevels();
// }
// deleteAllUserLevels();


}
