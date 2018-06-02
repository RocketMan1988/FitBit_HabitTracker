/*
 * Entry point for the companion app
 */
import * as messaging from "messaging";
//import { peerSocket, MessageSocket } from "messaging";

console.log("Companion Started");

var chapterBuffer = "";
var chapterRecieved = false; 

function getChapter(requestedChapterVerse) {
  var url = "http://bible-api.com/" + requestedChapterVerse;
    
  
  
   fetch(url).then(function(response) {
      console.log("Got response from server:", response);
      return response.json();
    }).then(function(json) {
      
      console.log("Got JSON response from server:" + JSON.stringify(json));
      //Load into JSON
      chapterBuffer = json;
     
      console.log(chapterBuffer["verses"][0]["text"]);
     //var data = json["root"]["station"][0];
	  
     chapterRecieved = true;
	  });
 
}

function getVerse(requestedVerse) {
  //Get Verse from JSON loaded from the web
  console.log("Getting Verse:" + requestedVerse);
  console.log(chapterBuffer.verses[requestedVerse].text);
  
  var messageToSend = "";
  var referenceToSend = "";
  var beginingVerseNumberToSend = "";
  var endVerseNumberToSend = "";
  var i = 0;
  var textVerse = "";
  
  console.log("Max message size=" + messaging.MessageSocket.MAX_MESSAGE_SIZE);
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    
    beginingVerseNumberToSend = chapterBuffer.verses[Number(requestedVerse) + i].verse;
    referenceToSend = chapterBuffer.reference;
    
    //Look Through and Send the max size through the buffer
    while (messageToSend.length < (messaging.MessageSocket.MAX_MESSAGE_SIZE - 400)) {
      //console.log(messageToSend);
      endVerseNumberToSend = chapterBuffer.verses[Number(requestedVerse) + i].verse
      textVerse = chapterBuffer.verses[Number(requestedVerse) + i].text.replace("\n", "").replace(/\n/g, "");
      //console.log(textVerse);
      messageToSend = messageToSend + "\n" + chapterBuffer.verses[Number(requestedVerse) + i].verse + " " + textVerse;
      i = i + 1;
    }

     messaging.peerSocket.send(referenceToSend + ":" + beginingVerseNumberToSend + "-" + endVerseNumberToSend + "\nVerse:" + messageToSend);
  }
  
}

var chapterJSON;

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  var bookChapter = "";
  var bookVerse = "";
  console.log("Data Received...");
  console.log(evt.data);
  
  if (evt.data.includes("Fetch:")) {
      bookChapter = evt.data.replace("Fetch:", "");
      getChapter(bookChapter);
  }
  
  if (evt.data.includes("FetchVerse:")) {
      bookVerse = evt.data.replace("FetchVerse:", "");
      getVerse(bookVerse);
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}
