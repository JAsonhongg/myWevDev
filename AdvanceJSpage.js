/*Default Setting Function*/
/*Highlight the demo-1 button and show demo-1 area, hide all other demo areas*/
//alert("HELLO");

let allButtons = document.getElementsByClassName("demo-button");//Return an array storing all buttons
let allDemoAreas = document.getElementsByClassName("demo-box");//Return an array storing all demo boxes
let Color = localStorage.getItem("pickColor"); // load the value

// change the color of the page
if(Color!=null) {
	document.body.style.backgroundColor = Color;
	document.getElementById("main").style.backgroundColor = Color;
  }

function showDemo(index) {
	//Set all buttons to white color
	for (let i=0; i < allButtons.length; i++) {
		allButtons[i].style.backgroundColor = "white";
		allDemoAreas[i].style.display = "none";
	}
	
	//Set the background color of the demo-button-1 to orange
	allButtons[index].style.background = "#FF9633";
	allDemoAreas[index].style.display = "block";

}



/*-----------------------------------Demo 1(cookie)---------------------------*/
//when choosing a color, it would store your selection
function changeColor(){
    let pickColor = document.getElementById("pickColor").value;
    document.body.style.backgroundColor= pickColor;
    localStorage.setItem("pickColor", pickColor); //set /store a value

}

// <!--Use HTTP Cookie to remember "name"-->
function saveCookie() {
	if( document.myform.customerName.value == "" ) {
	   alert("Please enter your name!");
	   return;
	}

	// we use the function encodeURI() in JavaScript to encode tge value before storing it in the cookie.
	cookievalue = encodeURI(document.myform.customerName.value);
	//Create a cookie: (name=value) pair
	document.cookie = "customerName=" + cookievalue;
	alert("Hello! Welcome! " + cookievalue + " Enjoy it!");
}

//Run this script when loading the page
function checkCookie() {	
	// we use the function encodeURI() in JavaScript to encode tge value before storing it in the cookie.
	value = encodeURI(document.myform.customerName.value);
	//Pop up a welcome message-box
	alert("Welcome " + value + "!");		
}

/*-----------------------------------Demo 3(Drag and Drop)---------------------------*/
//drag the box
$(".box" ).draggable({
  scope: 'demoBox',
  revertDuration: 100,
  start: function( event, ui ) {
  //Reset
  $( ".box" ).draggable( "option", "revert", true );
  $('.result').html('-');
  }
});

$(".drag-area" ).droppable({
  scope: 'demoBox',
  drop: function( event, ui ) {
  let area = $(this).find(".drop-area").html();
  let box = $(ui.draggable).html();     
  $( ".box" ).draggable( "option", "revert", false );
  
  //Display action in text
  $('.result').html("[Action] <b>" + box + "</b>" +
            " dropped on " + 
            "<b>" + area + "</b>");
  
  //Re-align item
  $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
  }						
})


/*-----------------------------------Demo 4(chatbot)---------------------------*/
const inputField = document.getElementById("inputquestion");
inputField.addEventListener("keydown", e => {
	if (e.code === "Enter") {
	  let input = inputField.value;
	  inputField.value = "";
	  output(input);
	}
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text.
  replace(/ a /g, " ").
  replace(/whats/g, "what is").
  replace(/please /g, "").
  replace(/ please/g, "").
  replace(/r u/g, "are you");

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  } else
  {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  addChatEntry(input, product);
}

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
  messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 1000);
}
// input options
const utterances = [
  ["how are you", "how is life", "how are things"],//1
  ["hi", "hey", "hello", "good morning", "good afternoon"],//2
  ["service fee"],//3
  ["what is the bond for"],//4
  ["who are you", "are you human", "are you bot", "are you human or bot"],//5
  ["do i need a charger with my courtesy phone"],//6
  ["why is my phone not under warranty"],//7
  ["how long will my repair take"],//8
  ["how do you protect the private information in my phone"],//9
  ["where do you get your replacement parts"],//10
  ["what happens if my phone is further damage after leaving it with you"],//11
  ["what kind of warranty do you offer and what does it cover"],//12
  ["what does the repair estimate include"],//13
  ["what", "why", "how", "where", "when"],
  ["no", "not sure", "maybe", "no thanks"],
  [""],
  ["haha", "ha", "lol", "hehe", "funny", "joke"],
];

// Possible responses corresponding to triggers
const answers = [
   ["Fine... how are you?","Pretty well, how are you?","Fantastic, how are you?"],//1
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],  //2
  ["A service fee is only charged for repairs to devices that are no longer under war-ran-ty.Business customers are not charged a service fee in accord with the terms of their con-tract."],//3
  ["The bond is to cover any damage done to the courtesy phone and/or charger. The bond will be refunded upon the safe and undamaged return of the phone and charger."],//4
  ["I am just a bot", "I am a bot. What are you?"],//5
  ["No, a charger is optional. You can add one with the 'Add charger' button. If you don't want one but added one by accident, you can remove it by clicking on the 'Remove charger' button."],
  ["The length of your phone's warranty depends on the warranty package you chose upon purchase. The standard is 24 months and is calculated from its purchase date."],//7
  ["Depends on your phone broken status. It takes normally 5 to 7 working days."],//8
  ["We comply with all relevant laws regarding privacy and client confidentiality."],//9
  ["We will send you a quote of all possible vendors who supply replacement parts for your references and your choice."],//10
  ["We make sure that it never happens."],//11
  ["1 month is the average warranty period. These warranties covers parts and service only."],//12
  ["The repair price estimate includes both replacement parts and labor."],//13
  ["Great question"],
  ["That's ok", "What do you want to talk about?"],
  ["Please say something :("],
  ["Haha!", "Good one!"]
];

// Random for any other user input
const alternatives = [
  "Go on...",
  "Try again",
];

