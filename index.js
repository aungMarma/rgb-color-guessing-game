// hex color values
let hexColors = ["a", "b", "c", "d", "e", "f", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// random number between 0 and 15
function randomNum(){
	return Math.floor(Math.random() * 16);
}

// get a random hex color
function getRandomColor(){
	let colorSt = "#";
	while(colorSt.length < 7){
		colorSt += hexColors[randomNum()];   
	}
	return colorSt;
}

// elements to work on
var hard = document.querySelector("#hard");
var easy = document.querySelector("#easy");
var colorBox = document.querySelector(".color-box");
var rgbText = document.querySelector(".heading h1");
var heading = document.querySelector(".heading");
var feedback = document.querySelector("#feedback");
var startGame = document.querySelector("#start-game");
var defaultFeedBack = feedback.textContent;

// array of divs that will be child of color-box
var arrayOfDivs = [];

// guessed right, all six divs and heading div with right color
function colorMatch(color) {
	for(var i = 0; i < arrayOfDivs.length; i++){
		arrayOfDivs[i].classList.remove("hide");
		arrayOfDivs[i].style.backgroundColor = color;
		heading.style.backgroundColor = color;
		feedback.textContent = "CORRECT";
	}
}

// starts the game with six diff colored divs to choose, hard option
function newColors(easyGame){
	// empty the .color-box div and arraydivs, starts from scratch
	$('.color-box').empty();              // o child
	arrayOfDivs = [];
	var level = 6;
	hard.classList.add("selected");
	easy.classList.remove("selected");
	feedback.textContent = defaultFeedBack;
	if(easyGame){
		hard.classList.remove("selected");
		easy.classList.add("selected");
		level = 3
	}
	// append 6 children to .color-box div
	for(var i = 0; i < level; i++){
		// create a div with class: color-individual-box, with a eventListener
		var aDiv = document.createElement("div");
		aDiv.classList.add("color-individual-box");
		let ranColor = getRandomColor();
		aDiv.style.backgroundColor = ranColor;
		// eventListener
		aDiv.addEventListener("click", function(){
			var thisColor = $( this ).css( "background-color" );  // get the background color
			var rgbTextColor = rgbText.textContent;
			// guessed wrong
			if(thisColor !== rgbTextColor){
				this.classList.add("hide");
				feedback.textContent = "Try Again";
			}else{                                             // guessed right
				colorMatch(thisColor);
			}
		})
		// append to color-box div, add to arrayDivs
		colorBox.appendChild(aDiv);
		arrayOfDivs.push(aDiv);
	}

	//  attach one of six divs color to rgb text
	var randomNumOneToSix = Math.floor(Math.random() * arrayOfDivs.length);
	var randomDiv = arrayOfDivs[randomNumOneToSix];
	rgbText.innerHTML = randomDiv.style.backgroundColor;
}

// so page load with a game on it
newColors();

// start a new game 
startGame.addEventListener("click", function(){
	newColors();
})

// start the game (which is hard by default)
hard.addEventListener("click", function(){
	newColors();
})

// play easy option
easy.addEventListener("click", function(){
	newColors("easyGame");
})



