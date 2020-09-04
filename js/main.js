
let houseOfCards = [
{

    character:"spiderman",
    image: "./images/spiderMan1.png"
},
{
    character: "spiderman",
    image: "./images/spiderMan2.jpg"
},
{
    character: "hulk",
    image: "./images/hulk1.jpg"
},
{
    character: "hulk",
    image: "./images/hulk2.jpg"
},
{
    character: "batman",
    image: "./images/batman1.jpg"
},
{
    character: "batman",
    image: "./images/batman2.jpg"

},
{
    character: "ironman",
    image: "./images/iron1.jpg"
},
{
    character: "ironman",
    image: "./images/iron2.jpg"
},
{
    character: "CaptianOfAmerica",
    image: "./images/COFA1.jpg"
},
{
    character: "CaptianOfAmerica",
    image: "./images/COFA2.jpg"
},
{
    character: "blackWidow",
    image: "./images/black1.jpg"
},
{
    character: "blackWidow",
    image: "./images/back2.jpg"
},
{
    character: "theGreen",
    image: "./images/greenL1.jpg"
},
{
    character: "theGreen",
    image: "./images/greenL2.jpg"
},
{
    character: "superMan",
    image: "./images/superman1.jpg"
},
{
    character: "superMan",
    image: "./images/superman2.jpg"
}
]


$('#marvelPlayer').hide();
$('#level3').hide();
$('#level2').hide();
$('#level1').hide();
$('#loser').hide();
$('#rematch').hide();
$('#rules').hide();
$('#mohammad').hide();


function showRulesAndDeveloper(){

    // show rules. 
    $('#ruleButton').click(function(){
        $('.directPager').hide();
        $('#rules').show();
    });

    // show developer information
    $('.developer').click(function(){
        $('.directPager').hide();
        $('#mohammad').show();
    });

    // go back to main page from rules page.
    $('#rematchFromRules').click(function(){
        $('.directPager').show();
        $('#rules').hide();
    });

    // go back from developer page.
    $('#rematchFromDev').click(function(){
        $('.directPager').show();
        $('#mohammad').hide();
    });
}
showRulesAndDeveloper();
// to shuffle board of cards. 
function shuffleBoard(){
    let index = houseOfCards.length, temp, random; 
    while(index >= 2)
    {
        random = Math.floor(Math.random() * index);
        index -= 1;
        // changing them
        temp = houseOfCards[index];
        houseOfCards[index] = houseOfCards[random];
        houseOfCards[random] = temp;
    }
    return houseOfCards;
}
// call suffleBoard to shuffle cards.
shuffleBoard();

let arrayHolder = [];

let matchCards = [];

let totatMatch = 0;

function playGame(){

   // let listner = document.querySelector(".imageSQPP");
   let score = document.querySelector(".total");
   let move = this.getAttribute('id');
   arrayHolder.push(houseOfCards[move].character);
   this.setAttribute('src', houseOfCards[move].image);

   if(arrayHolder.length === 2){      
       if(arrayHolder[0] === arrayHolder[1]){
           totatMatch = totatMatch + 1;
           score.textContent = "Score: " + totatMatch;
       }
       else if(arrayHolder[0] !== arrayHolder[1]){
        totatMatch = totatMatch - 1;
        score.textContent = "Score: " + totatMatch;
       }
       arrayHolder = [];
   }
}

// function to display home. 
function displayStage (){
        let home = document.querySelector(".cardsMar");
    
        for(let i= 0; i < houseOfCards.length; i++){
            let images = document.createElement("img");
            images.setAttribute("class", "imageSQPP");
            images.setAttribute("src", "./images/marvel.png");
            images.setAttribute('id', i);
            images.addEventListener('click', playGame);
            images.style.height = " 250px";
            images.style.width = "180px";
            home.appendChild(images);
        }
}
displayStage();

// create a timer for playing the game. once it 00:00, the page will be reset.
function displayTimer(){
    let container = document.querySelector(".time");
    let anotherContainer = document.querySelector(".date");
    let newP = document.createElement("p");
    let newD = document.createElement("p");
    newP.setAttribute("class", "timer");
    newD.setAttribute("class", "dater");
    
    let date = new Date();
    let months = ["January", "February", "March", "April",
     "May", "June", "July", "August", 
     "September", "October", "November", "December"];
     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let hour = date.getHours();
    let min = date.getMinutes();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear()
    let today = date.getDate();
    var ampm = hour >= 12 ? ' PM' : ' AM';
    if(hour < 10){
        hour = "0"+date.getHours();
    }
    if(min < 10){
        min = "0"+date.getMinutes();
    }
    // let sPage = document.querySelector(".timeContainer");
    let greeting = document.createElement("p");
    let history = document.createElement("p");
    greeting.setAttribute("class", "greet");
    history.setAttribute("class", "history");

    newP.textContent = hour + ":" + min + ampm;
    history.textContent = days[day] + "," + " " + today + " " + months[month] + " " + year;
   
    
    container.appendChild(newP)
    anotherContainer.appendChild(history);
}
displayTimer();

function startTimer(duration, display) {
    
    let timer = duration, minutes, seconds;
    let timeText = document.querySelector("#time");

    
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (minutes == 0 && seconds == 0){
            if(totatMatch > 6){
                $('#homePlaying').hide();
                $('#marvelPlayer').show();
                $('#rematch').show();
                $('#timerGoDown').hide();
            }else if(totatMatch == 1 || totatMatch == 2){
                $('#homePlaying').hide();
                $('#level1').show();
                $('#rematch').show();
                $('#timerGoDown').hide();
            }else if(totatMatch == 3 || totatMatch == 4){
                $('#homePlaying').hide();
                $('#level2').show();
                $('#rematch').show();
                $('#timerGoDown').hide();
            }else if(totatMatch == 5 || totatMatch == 6){
                $('#homePlaying').hide();
                $('#level3').show();
                $('#rematch').show();
                $('#timerGoDown').hide();
            }else if(totatMatch <= 0){
                $('#homePlaying').hide();
                $('#loser').show();
                $('#rematch').show();
                $('#timerGoDown').hide();
            }
           
        }

        if(minutes == 0 && seconds == 30){ // the timer will turn red with bigger font if reachs to 00:30
            timeText.style.color = "red";
            timeText.style.fontSize = "40px";
        }
     
        if(minutes < 10){
            minutes = "0"+ minutes;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
window.onload = function () {
    let theOneMinutes = 60;
    display = document.querySelector('#time');
    startTimer(theOneMinutes, display);
};

let audio = document.querySelector(".audio");
function playMusic(){
    audio.play();
    audio.loop = true; // to loop the music when is ended. 
}
function pauseMusic(){
    audio.pause();
}

