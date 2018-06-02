/*
 * Entry point for the watch app
 */

/*
 * Ideas:
* 1) Fun Biblical Facts
* 2) Paid Verse: More Daily Verses, Choose Bible Type, More 1 Year Plans, Audio Bible?, Export Data Option?
* 
* 
* 
 */

/*
 * ToDo:
 * 1) Add Back Button to Daily Verse and Random Verse
 * 2) Get Colors and Backgrounds Right for Verse of the day
 * 
 * 
 * v
 * 
 * 
 * 
 */
import document from "document";
import { display } from "display";
import { readFileSync } from "fs";
import { peerSocket, MessageSocket } from "messaging";
import { memory } from "system";

//setTimeout(function() {
//  console.log("Max message size=" + MessageSocket.MAX_MESSAGE_SIZE);
//  if (peerSocket.readyState === peerSocket.OPEN) {
//     peerSocket.send("Hello");
//  }
//}, 10000);


display.autoOff = false;

console.log("App Started on Watch");

//Define Variables used for tracking which menu the user is in
var MainMenu = false;
var VerseOfTheDayMenu = false;
var RandomVerseMenu = false;
var BiblePlanMenu = false;
var BibleMenu = false;
var BibleDisplayVerseMenu = false;

var BibleMenuNewOrOld = false;
var BibleBook = false;
var BibleChapter = false;
var BibleVerse = false;

//Track Bible Selection
var testment = "";
var book = 0;
var chapter = 0;
var verse = 0;

var currentBook = 0;
var currentChapter = 0;
var chapterLength = 0;

var selectedBook = 0;
var selectedBookName = "";

var selectedChapter = 0;
var currentVerse = 0;
var verseLength = 0;

var selectedVerse = 0;

var verseToDisplay = "";


//Store JSON Data
var text1;
var text2;
var text3;

//Store Current Day in plan
var currentDay = 0;

//Setup Message Listening:
// Listen for the onmessage event
peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log("Data Received on Watch...");
  console.log(evt.data);
  
  var verseToDisplayText = "";
  var verseToDisplayText = evt.data;
  
  console.log(typeof verseToDisplayText);
  
  //verseToDisplayText.includes("Verse:")
  if (verseToDisplayText.indexOf("Verse:") !== -1) {
      console.log("In Verse Display Menu");
      verseToDisplay = evt.data.replace("Verse:", "");
      console.log(verseToDisplay);
      ShowDisplayBibleVerse();
  }
  

}





//Define Functions
function toggle(ele) {
  //console.log("Toggling");
  ele.style.display = (ele.style.display === "inline") ? "none" : "inline";
}

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

//Hide Buttons for main menu:
function readBooks() {
  //Fatal Jerryscript Error: ERR_OUT_OF_MEMORY -- Looks like even one bible chapter is too much for the watch's memory.
  text1 = readFileSync("/mnt/assets/resources/Books.json", "json");
}

//Hide Buttons for main menu:
function readDailyPlan() {
  //Fatal Jerryscript Error: ERR_OUT_OF_MEMORY -- Looks like even one bible chapter is too much for the watch's memory.
  text2 = readFileSync("/mnt/assets/resources/DailyPlan.json", "json");
}

//Hide Buttons for main menu:
function readDailyVerses() {
  //Fatal Jerryscript Error: ERR_OUT_OF_MEMORY -- Looks like even one bible chapter is too much for the watch's memory.
  text3 = readFileSync("/mnt/assets/resources/DailyVerse.json", "json");
}

function clearMemory(){
  console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
  text1 = "";
  text2 = "";
  text3 = "";
  console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
}

//Get Verse of the Day
function getRandomeVerse() {
  
  var randomVerseToGet = Math.floor(Math.random() * 68) + 0;
  
  console.log(randomVerseToGet);
  
  return text3.Verse[randomVerseToGet];
}

//Get Verse of the Day
function getVerseOfTheDay() {
  
  let today = new Date();
  let year = today.getFullYear();
  var janFirst = new Date(year, 0, 1, 1, 1, 1, 1);
  var days = daydiff(janFirst,today);

  var dailyVerseToGet = Math.ceil((((days / text3.Verse.length) - Math.floor((days / text3.Verse.length)))) * text3.Verse.length);
  
  console.log(dailyVerseToGet);
  
  return text3.Verse[dailyVerseToGet];
}
//Get Verse of the Day Picture
function getVerseOfTheDayPicture() {
  
  let today = new Date();
  let year = today.getFullYear();
  var janFirst = new Date(year, 0, 1, 1, 1, 1, 1);
  var days = daydiff(janFirst,today);

  var dailyVersePictureToGet = Math.ceil((((days / 23) - Math.floor((days / 23)))) * 23);
  
  console.log(dailyVersePictureToGet);
  
  return dailyVersePictureToGet;
}

//Show and Hide Menus
function ShowMainMenu() {
  console.log("Main Menu");
  
  clearMemory();
  
  Button1.style.display =  "inline";
  Button2.style.display =  "inline";
  Button3.style.display =  "inline";
  Button4.style.display =  "inline";
  //Set Button Text
  Button1.text = "Bible";
  Button2.text = "Bible Plan";
  Button3.text = "Daily Verse";
  Button4.text = "Random";
  
  MainMenuinstance.style.display = "inline";
  MainMenu = true;
}
function HideMainMenu() {
  console.log("Hide Main Menu");
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  MainMenuinstance.style.display = "none";
  MainMenu = false;
}

function ShowDailyVerse() {
  console.log("Daily Verse");
  
  //Read Daily Verses
  console.log("Reading Daily Verse");
  readDailyVerses();
  
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  DailyVerseInstance.style.display = "inline";
  VerseOfTheDayMenu = true;
}
function HideDailyVerse() {
  console.log("Main Menu");
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  DailyVerseInstance.style.display = "none";
  VerseOfTheDayMenu = false;
}

function ShowYearlyBiblePlan() {
  console.log("Daily Verse");
  
  //Read Daily Plan
  console.log("Reading Daily Plan");
  readDailyPlan();
  
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  YearlyBiblePlanInstance.style.display = "inline";
  BiblePlanMenu = true;
  YearlyBiblePlanText.innerText = text2.Plan[currentDay];
}
function HideYearlyBiblePlan() {
  console.log("Main Menu");
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  YearlyBiblePlanInstance.style.display = "none";
  BiblePlanMenu = false;
}

function ShowRandomVerse() {
  console.log("Daily Verse");

//Read Daily Verses
  console.log("Reading Daily Verse");
  readDailyVerses();
  
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  RandomVerseInstance.style.display = "inline";
  RandomVerseMenu = true;
}
function HideRandomVerse() {
  console.log("Main Menu");
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  RandomVerseInstance.style.display = "none";
  RandomVerseMenu = false;
}

function ShowDisplayBibleVerse() {
  console.log("Bible Verse");
  BibleVerseText.innerText = verseToDisplay;
  Button1.style.display =  "none";
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  BibleVerseInstance.style.display = "inline";
  BibleDisplayVerseMenu = true;
}
function HideDisplayBibleVerse() {
  console.log("Hide Bible Verse");
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  BibleVerseInstance.style.display = "none";
  BibleDisplayVerseMenu = false;
}


function ShowBibleMenuNewOrOld() {
  
  
  console.log("Reading Chapters and Verses");
  readBooks();
  console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
  
  
  console.log("New VS Old Testement");
  Button1.style.display =  "inline";
  Button2.style.display =  "inline";
  
  //Set Button Text
  Button1.text = "Old";
  Button2.text = "New";
  
  MainMenuinstance.style.display = "inline";
  
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  BibleMenuNewOrOld = true;
}
function HideBibleMenuNewOrOld() {
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  BibleMenuNewOrOld = false;
}

function ShowBibleBook() {
  console.log("Book");

  //Set Button Text
  if (currentBook == 0){
    Button1.text = "Not Used";  
  }
  else{
    Button1.text = "Last...";
  }
  
  if (currentBook > 50){
    Button2.text = text1.Books[currentBook].names[0];
    Button3.text = text1.Books[currentBook + 1].names[0];
    Button4.text = text1.Books[currentBook + 2].names[0];
    Button5.text = text1.Books[currentBook + 3].names[0];
    Button6.text = text1.Books[currentBook + 4].names[0];
    Button7.text = text1.Books[currentBook + 5].names[0];
    Button8.text = text1.Books[currentBook + 6].names[0];
    
    Button1.style.display =  "inline";
    Button2.style.display =  "inline";
    Button3.style.display =  "inline";
    Button4.style.display =  "inline";
    Button5.style.display =  "inline";
    Button6.style.display =  "inline";
    Button7.style.display =  "inline";
    Button8.style.display =  "inline";
    Button9.style.display =  "none";
    Button10.style.display =  "none";
    Button11.style.display =  "none";
    Button12.style.display =  "none";
    
  }
  else {
    Button2.text = text1.Books[currentBook].names[0];
    Button3.text = text1.Books[currentBook + 1].names[0];
    Button4.text = text1.Books[currentBook + 2].names[0];
    Button5.text = text1.Books[currentBook + 3].names[0];
    Button6.text = text1.Books[currentBook + 4].names[0];
    Button7.text = text1.Books[currentBook + 5].names[0];
    Button8.text = text1.Books[currentBook + 6].names[0];
    Button9.text = text1.Books[currentBook + 7].names[0];
    Button10.text = text1.Books[currentBook + 8].names[0];
    Button11.text = text1.Books[currentBook + 9].names[0];
    Button12.text = "Next...";
    
    Button1.style.display =  "inline";
    Button2.style.display =  "inline";
    Button3.style.display =  "inline";
    Button4.style.display =  "inline";
    Button5.style.display =  "inline";
    Button6.style.display =  "inline";
    Button7.style.display =  "inline";
    Button8.style.display =  "inline";
    Button9.style.display =  "inline";
    Button10.style.display =  "inline";
    Button11.style.display =  "inline";
    Button12.style.display =  "inline";
  
  }
  
  
  MainMenuinstance.style.display = "inline";
  
  BibleBook = true;
}
function HideBibleBook() {
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  RandomVerseInstance.style.display = "none";
  BibleBook = false;
}

function ShowBibleChapter() {
  console.log("Show Chapters");
  
  console.log(selectedBook);
  console.log(selectedBookName);
  chapterLength = text1.Books[selectedBook].verses.length;
  console.log(chapterLength);
    
  BibleChapter = true;
}
function HideBibleChapter() {
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  BibleChapter = false;
}

function ShowNextChapters() {
  
      if (currentChapter < 1) {
        Button1.text = "Last...";
        Button1.style.display =  "none";
      }
      else
      {
        Button1.text = "Last...";
        Button1.style.display =  "inline";       
      }
      
      if (currentChapter < chapterLength) {
        Button2.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button2.style.display =  "inline";
      }
      else
      {
        Button2.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button3.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button3.style.display =  "inline";
      }
      else
      {
        Button3.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button4.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button4.style.display =  "inline";
      }
      else
      {
        Button4.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button5.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button5.style.display =  "inline";
      }
      else
      {
        Button5.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button6.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button6.style.display =  "inline";
      }
      else
      {
        Button6.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button7.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button7.style.display =  "inline";
      }
      else
      {
        Button7.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button8.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button8.style.display =  "inline";
      }
      else
      {
        Button8.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button9.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button9.style.display =  "inline";
      }
      else
      {
        Button9.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button10.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button10.style.display =  "inline";
      }
      else
      {
        Button10.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button11.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button11.style.display =  "inline";
      }
      else
      {
        Button11.style.display =  "none";       
      }
  
      if (currentChapter < chapterLength) {
        Button12.text = "Next...";
        Button12.style.display =  "inline";
      }
      else {
        Button12.style.display =  "none";
        currentChapter = Math.ceil(currentChapter / 10) * 10;
      }

}
function ShowLastChapters() {
       
      if ((currentChapter - 20) < 0 ) {
        currentChapter = 0;
      }
      else {
        currentChapter = currentChapter - 20;
      }
  
      if (currentChapter < 1) {
        Button1.text = "Last...";
        Button1.style.display =  "none";
      }
      else
      {
        Button1.text = "Last...";
        Button1.style.display =  "inline";       
      }
      
      if (currentChapter < chapterLength) {
        Button2.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button2.style.display =  "inline";
      }
      else
      {
        Button2.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button3.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button3.style.display =  "inline";
      }
      else
      {
        Button3.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button4.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button4.style.display =  "inline";
      }
      else
      {
        Button4.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button5.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button5.style.display =  "inline";
      }
      else
      {
        Button5.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button6.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button6.style.display =  "inline";
      }
      else
      {
        Button6.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button7.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button7.style.display =  "inline";
      }
      else
      {
        Button7.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button8.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button8.style.display =  "inline";
      }
      else
      {
        Button8.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button9.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button9.style.display =  "inline";
      }
      else
      {
        Button9.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button10.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button10.style.display =  "inline";
      }
      else
      {
        Button10.style.display =  "none";       
      }
      
      if (currentChapter < chapterLength) {
        Button11.text = "Chapter " + (currentChapter + 1);
        currentChapter = currentChapter + 1;
        Button11.style.display =  "inline";
      }
      else
      {
        Button11.style.display =  "none";       
      }
  
      if (currentChapter < chapterLength) {
        Button12.text = "Next...";
        Button12.style.display =  "inline";
      }
      else {
        Button12.style.display =  "none";
      }

}


function ShowBibleVerse() {
  console.log("Verse");
  
  
  console.log("Show Chapters");
  
  verseLength = text1.Books[selectedBook].verses[selectedChapter];
  console.log(selectedChapter);
  console.log(verseLength);
  
  Button1.style.display =  "inline";
  Button2.style.display =  "inline";
  Button3.style.display =  "inline";
  Button4.style.display =  "inline";
  Button5.style.display =  "inline";
  Button6.style.display =  "inline";
  Button7.style.display =  "inline";
  Button8.style.display =  "inline";
  Button9.style.display =  "inline";
  Button10.style.display =  "inline";
  Button11.style.display =  "inline";
  Button12.style.display =  "inline";
  BibleVerse = true;
  
  //Send Request to get Chapter and cache:
  console.log("Fetch:" + selectedBookName + "+" + (selectedChapter + 1));
  
  if (peerSocket.readyState === peerSocket.OPEN) {
   peerSocket.send("Fetch:" + selectedBookName + "+" + (selectedChapter + 1));
  }
  
  
  
}
function HideBibleVerse() {
  Button1.style.display =  "none";
  Button2.style.display =  "none";
  Button3.style.display =  "none";
  Button4.style.display =  "none";
  Button5.style.display =  "none";
  Button6.style.display =  "none";
  Button7.style.display =  "none";
  Button8.style.display =  "none";
  Button9.style.display =  "none";
  Button10.style.display =  "none";
  Button11.style.display =  "none";
  Button12.style.display =  "none";
  RandomVerseInstance.style.display = "none";
  BibleVerse = false;
}

function ShowNextVerses() {
  
      if (currentVerse < 1) {
        Button1.text = "Last...";
        Button1.style.display =  "none";
      }
      else
      {
        Button1.text = "Last...";
        Button1.style.display =  "inline";       
      }
      
      if (currentVerse < verseLength) {
        Button2.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button2.style.display =  "inline";
        Button3.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button3.style.display =  "inline";
        Button4.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button4.style.display =  "inline";
        Button5.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button5.style.display =  "inline";
        Button6.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button6.style.display =  "inline";
        Button7.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button7.style.display =  "inline";
        Button8.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button8.style.display =  "inline";
        Button9.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button9.style.display =  "inline";
        Button10.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button10.style.display =  "inline";
        Button11.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button11.style.display =  "inline";
      }
      else
      {
        Button2.style.display =  "none";   
        Button3.style.display =  "none";   
        Button4.style.display =  "none";   
        Button5.style.display =  "none";   
        Button6.style.display =  "none";   
        Button7.style.display =  "none";   
        Button8.style.display =  "none";   
        Button9.style.display =  "none";   
        Button10.style.display =  "none";   
        Button11.style.display =  "none";   
      }
      
  
      if (currentVerse < verseLength) {
        Button12.text = "Next...";
        Button12.style.display =  "inline";
      }
      else {
        Button12.style.display =  "none";
        currentVerse = Math.ceil(currentVerse / 10) * 10;
      }

}
function ShowLastVerses() {
       
      if ((currentVerse - 20) < 0 ) {
        currentVerse = 0;
      }
      else {
        currentVerse = currentVerse - 20;
      }
  
      if (currentVerse < 1) {
        Button1.text = "Last...";
        Button1.style.display =  "none";
      }
      else
      {
        Button1.text = "Last...";
        Button1.style.display =  "inline";       
      }
      
      if (currentVerse < verseLength) {
        Button2.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button2.style.display =  "inline";
        Button3.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button3.style.display =  "inline";
        Button4.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button4.style.display =  "inline";
        Button5.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button5.style.display =  "inline";
        Button6.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button6.style.display =  "inline";
        Button7.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button7.style.display =  "inline";
        Button8.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button8.style.display =  "inline";
        Button9.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button9.style.display =  "inline";
        Button10.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button10.style.display =  "inline";
        Button11.text = "Verse " + (currentVerse + 1);
        currentVerse = currentVerse + 1;
        Button11.style.display =  "inline";
      }
      else
      {
        Button2.style.display =  "none";   
        Button3.style.display =  "none";   
        Button4.style.display =  "none";   
        Button5.style.display =  "none";   
        Button6.style.display =  "none";   
        Button7.style.display =  "none";   
        Button8.style.display =  "none";   
        Button9.style.display =  "none";   
        Button10.style.display =  "none";   
        Button11.style.display =  "none";   
      }

      if (currentVerse < verseLength) {
        Button12.text = "Next...";
        Button12.style.display =  "inline";
      }
      else {
        Button12.style.display =  "none";
      }
  
}

function selectVerse() {
    //Send Request to get Verse:
  console.log("FetchVerse:" + selectedVerse);
  
  if (peerSocket.readyState === peerSocket.OPEN) {
   peerSocket.send("FetchVerse:" + selectedVerse);
  }
}

//Hide Buttons for main menu:
function toggleMainMenu() {
  console.log("Opening Main Menu");
  toggle(Button1); //Show
  toggle(Button2); //Show
  toggle(Button3); //Show
  toggle(Button4); //Show
  toggle(Button5); //Show
  toggle(Button6); //Show
  toggle(Button7); //Show
  toggle(Button8); //Show
  toggle(Button9); //Show
  toggle(Button10); //Show
  toggle(Button11); //Show
  toggle(Button12); //Show
  toggle(Button5); //Hide
  toggle(Button6); //Hide
  toggle(Button7); //Hide
  toggle(Button8); //Hide
  toggle(Button9); //Hide
  toggle(Button10); //Hide
  toggle(Button11); //Hide
  toggle(Button12); //Hide
 
  //Set Button Text
  Button1.text = "Bible";
  Button2.text = "Bible Plan";
  Button3.text = "Daily Verse";
  Button4.text = "Random";
}

// Get a handle on the instance
var titleScreenFadeOutinstance = document.getElementById("TitleScreenFadeOut");
var MainMenuinstance = document.getElementById("MainMenuScreen");
var DailyVerseInstance = document.getElementById("DailyVerseScreen");
var RandomVerseInstance = document.getElementById("RandomVerseScreen");
var BibleVerseInstance = document.getElementById("BibleVerseScreen");
var YearlyBiblePlanInstance = document.getElementById("YearlyBiblePlanScreen");

let Button1 = document.getElementById("Button1");
let Button2 = document.getElementById("Button2");
let Button3 = document.getElementById("Button3");
let Button4 = document.getElementById("Button4");
let Button5 = document.getElementById("Button5");
let Button6 = document.getElementById("Button6");
let Button7 = document.getElementById("Button7");
let Button8 = document.getElementById("Button8");
let Button9 = document.getElementById("Button9");
let Button10 = document.getElementById("Button10");
let Button11 = document.getElementById("Button11");
let Button12 = document.getElementById("Button12");

var DailyVerseText = document.getElementById("DailyVerseText");
var DailyVerseBackground = document.getElementById("DailyVerseBackground");

var RandomVerseText = document.getElementById("RandomVerseText");

var YearlyBiblePlanText = document.getElementById("YearlyBiblePlanText");

var BibleVerseText = document.getElementById("BibleVerseText");

//Animate after 3 seconds - Fade in Title Screen
setTimeout(function() {
  titleScreenFadeOutinstance.animate = true;
}, 100);

//Hide Menu:
toggle(MainMenuinstance); //Show
toggle(MainMenuinstance); //Hide

//Hide DailyVerse:
toggle(DailyVerseInstance); //Show
toggle(DailyVerseInstance); //Hide

//Hide YearlyBiblePlan:
toggle(YearlyBiblePlanInstance); //Show
toggle(YearlyBiblePlanInstance); //Hide

//Hide RandomVerse:
toggle(RandomVerseInstance); //Show
toggle(RandomVerseInstance); //Hide

//Hide RandomVerse:
toggle(BibleVerseInstance); //Show
toggle(BibleVerseInstance); //Hide

//Hide Main Menu
toggleMainMenu();


//Read NewTestment - Add Back before release
//console.log("Reading Chapters and Verses");
//readBooks();
//console.log("JS memory: " + memory.js.used + "/" + memory.js.total);

//Read Daily Plan
//console.log("Reading Daily Plan");
//readDailyPlan();

//Read Daily Verses
//console.log("Reading Daily Verse");
//readDailyVerses();


//Animate after 3 seconds - Fade in Menu Screen
setTimeout(function() {
  toggle(MainMenuinstance); //Show
  MainMenuinstance.animate = true;
}, 5000);

//SetUp Generic Buttons
console.log("Setting Up Generic Buttons");
Button1.enabled = true;
Button2.enabled = true;
Button3.enabled = true;
Button4.enabled = true;

//Set MainMenu Button
MainMenu = true;

//Catch User Clicks
document.onkeypress = function(e) {
  console.log("Key pressed: " + e.key);
  if (BiblePlanMenu == true) {
    if (e.key == "up") {
      //Goto Previous Day
      if (currentDay == 0) {
        
      }
      else {
        currentDay = currentDay - 1
        //Move to Last Page
        YearlyBiblePlanText.innerText = text2.Plan[currentDay];
        YearlyBiblePlanText.style.fill = "red";
      }
    }
    if (e.key == "down") {
      //Goto Next Day
      if (currentDay == 365) {
        //Make a celibration thing pop up?
      }
      else {
        currentDay = currentDay + 1
        //Move to Next Page
        YearlyBiblePlanText.innerText = text2.Plan[currentDay];
        YearlyBiblePlanText.style.fill = "red";
      }
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideYearlyBiblePlan();
      ShowMainMenu();
      MainMenuinstance.animate = true;
    }
  }
  
  
  if (VerseOfTheDayMenu == true) {
    console.log("In Daily Verse Menu");
    if (e.key == "up") {
      //Exit back to Main Menu
      HideDailyVerse();
      ShowMainMenu();
      MainMenuinstance.animate = true;
      
    }
    if (e.key == "down") {
      
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideDailyVerse();
      ShowMainMenu();
      MainMenuinstance.animate = true;
    }
  }
  
  
   if (RandomVerseMenu == true) {
    console.log("In Random Verse Menu");
    if (e.key == "up") {
      //Exit back to Main Menu
      HideRandomVerse();
      ShowMainMenu();
      MainMenuinstance.animate = true;
      
    }
    if (e.key == "down") {
      //Get Next Random Verse
      RandomVerseText.innerText = getRandomeVerse();
      
      //HideMainMenu();
      //ShowDailyVerse();
      //toggle(RandomVerseInstance);
      RandomVerseInstance.animate = true;
      
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideRandomVerse();
      ShowMainMenu();
      MainMenuinstance.animate = true;
    }
  }
  
  
   if (BibleMenuNewOrOld == true) {
    console.log("In New/Old Display");
    if (e.key == "up") {
      
    }
    if (e.key == "down") {
   
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideBibleMenuNewOrOld();
      ShowMainMenu();
      MainMenuinstance.animate = true;
    }
  }
  
  if (BibleBook == true) {
    console.log("In Book Display");
    if (e.key == "up") {
      
    }
    if (e.key == "down") {

      
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideBibleBook();
      ShowBibleMenuNewOrOld();
    }
  }
  
  if (BibleChapter == true) {
    console.log("In Verse Display");
    if (e.key == "up") {
    }
    if (e.key == "down") {
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideBibleChapter();
      ShowBibleBook();
    }
  }
  
  if (BibleVerse == true) {
    console.log("In Verse Display");
    if (e.key == "up") {
    }
    if (e.key == "down") {
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideBibleVerse();
      ShowBibleChapter();
      ShowNextChapters();
    }
  }
  
  if (BibleDisplayVerseMenu == true) {
    console.log("In Verse Display");
    if (e.key == "up") {  
    }
    if (e.key == "down") {
    }
    if (e.key == "back") {
      e.preventDefault();
      //Exit back to Main Menu
      HideDisplayBibleVerse();
      ShowBibleVerse();
      //MainMenuinstance.animate = true;
    }
  }
  
}

//On Screen Element Clicks
YearlyBiblePlanText.onclick = function(e) {
  console.log("Done with Day");
  YearlyBiblePlanText.style.fill = "green";
}

//On Screen Buttons
Button1.onclick = function(evt) {
  console.log("CLICKED Button1!");
  console.log(BibleMenuNewOrOld);
  
  //This section of code looks wrong...
  if (MainMenu == true) {
    HideMainMenu();
    ShowBibleMenuNewOrOld();
  }
  else if (BibleMenuNewOrOld == true){
    console.log("BibleNewOld");
    //console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
    currentBook = 0;
    HideBibleMenuNewOrOld();
    ShowBibleBook();
  }
  else if (BibleBook == true) {
    console.log("Bible Book");
    if (currentBook > 9){
      currentBook = currentBook - 10;
      ShowBibleBook();  
    }
  }
  else if (BibleChapter == true) {
    console.log("Bible Chapter");
    ShowLastChapters();  
  }
  else if (BibleVerse == true) {
    ShowLastVerses();
   }
    
  
}
Button2.onclick = function(evt) {
  console.log("CLICKED Button2!");
  
  if (MainMenu == true) {
    HideMainMenu();
    ShowYearlyBiblePlan();
    //toggle(YearlyBiblePlanInstance);
    YearlyBiblePlanInstance.animate = true;
  }
   else if (BibleMenuNewOrOld == true) {
    currentBook = 40;
    console.log("JS memory: " + memory.js.used + "/" + memory.js.total);
    HideBibleMenuNewOrOld();
    ShowBibleBook();
  }
  else if (BibleBook == true) {
    selectedBook = currentBook;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 10;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 10;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }

   
}
Button3.onclick = function(evt) {
  console.log("CLICKED Button3!");
  
  if (MainMenu == true) {
    //Add Back for final version along with images
    ShowDailyVerse();
    DailyVerseBackground.href = "/mnt/assets/resources/DailyVerse" + getVerseOfTheDayPicture() + ".png";
    DailyVerseText.innerText = getVerseOfTheDay();
    DailyVerseText.style.fill = "white";

    //Comment out for final version of the app
    //DailyVerseBackground.href = "/mnt/assets/resources/Abstract-Blue.png";
    //DailyVerseText.innerText = getVerseOfTheDay();

    HideMainMenu();
    //toggle(DailyVerseInstance);
    DailyVerseInstance.animate = true;
    //    /mnt/assets/resources/
  }
  else if (BibleBook == true) {
    selectedBook = currentBook + 1;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 9;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 9;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }
}
Button4.onclick = function(evt) {
  console.log("CLICKED Button4!");
  
  if (MainMenu == true) {
    HideMainMenu();
    ShowRandomVerse();
    RandomVerseText.innerText = getRandomeVerse();

    //toggle(RandomVerseInstance);
    RandomVerseInstance.animate = true;
  }
    else if (BibleBook == true) {
    selectedBook = currentBook + 2;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 8;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 8;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }
  
}
Button5.onclick = function(evt) {
  console.log("CLICKED Button5!");
  if (BibleBook == true) {
    selectedBook = currentBook + 3;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 7;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 7;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }
}
Button6.onclick = function(evt) {
  console.log("CLICKED Button6!");
  if (BibleBook == true) {
    selectedBook = currentBook + 4;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 6;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 6;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }
}
Button7.onclick = function(evt) {
  console.log("CLICKED Button7!");
  if (BibleBook == true) {
    selectedBook = currentBook + 5;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 5;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 5;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }
}
Button8.onclick = function(evt) {
  console.log("CLICKED Button8!");
  if (BibleBook == true) {
    selectedBook = currentBook + 6;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 4;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 4;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }
}
Button9.onclick = function(evt) {
  console.log("CLICKED Button9!");
  if (BibleBook == true) {
    selectedBook = currentBook + 7;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 3;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 3;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }

}
Button10.onclick = function(evt) {
  console.log("CLICKED Button10!");
  if (BibleBook == true) {
    selectedBook = currentBook + 8;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 2;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 2;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }

}
Button11.onclick = function(evt) {
  console.log("CLICKED Button11!");
  if (BibleBook == true) {
    selectedBook = currentBook + 9;
    selectedBookName = text1.Books[selectedBook].names[0];
    
    HideBibleBook();
    ShowBibleChapter();
    ShowNextChapters();
    
  }
  else if (BibleChapter == true) {
    selectedChapter  = currentChapter - 1;
    HideBibleChapter();
    ShowBibleVerse();
    ShowNextVerses();
  }
  else if (BibleVerse == true) {
    //GetVerse...
    selectedVerse = currentVerse - 1;
    selectVerse();
    console.log(selectedBookName + " " + (selectedChapter + 1) + ":" + (selectedVerse + 1));
  }

}
Button12.onclick = function(evt) {
  console.log("CLICKED Button12!");
  console.log(BibleMenuNewOrOld);
    if (BibleBook == true) {
      if (currentBook == 40) {
        currentBook = currentBook + 10;
        ShowBibleBook();  
      }
      else {
        currentBook = currentBook + 10;
        ShowBibleBook();          
      }
    }
    else if (BibleChapter == true) {
      
      ShowNextChapters();
      
    }
  
    else if (BibleVerse == true) {
      ShowNextVerses();
    }
}


console.log("Finished Setting Up Generic Buttons");

