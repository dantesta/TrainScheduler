$(document).ready(function() {


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFsf6RaeXD2-tMqpuVrdTSl0d8Wp4glxk",
    authDomain: "trainscheduler-c89f2.firebaseapp.com",
    databaseURL: "https://trainscheduler-c89f2.firebaseio.com",
    projectId: "trainscheduler-c89f2",
    storageBucket: "trainscheduler-c89f2.appspot.com",
    messagingSenderId: "151663074715"
  };
    firebase.initializeApp(config);


var database = firebase.database();

// Button for adding Trains
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(),"HH:mm").format("X");
  var trainFreq = $("#freq-input").val().trim();
  console.log(trainFirst)
  // Creates local "temporary" object for holding data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads data to the database
  database.ref().push(newTrain);


  // Alert
  alert("Train Schedule successfully added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

var dataRef = firebase.database();
var timeTrain = moment();

    function timeUpdater() {
      dataRef.ref().child('trains').once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          timeTrain = moment().format('X');
          dataRef.ref('trains/' + childSnapshot.key).update({
          currentTime: timeTrain,
          })
        })    
      });
    };

    setInterval(timeUpdater, 10000);


database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainFirst = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().rate;



  var trainStartMoment = moment.unix(trainFirst).format("HH:mm");

  var trainSchedule = moment().diff(moment.unix(trainFirst, "X"));


  var trainTime = trainSchedule * trainFreq;


  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainStartMoment + "</td><td>" + trainSchedule + "</td><td>" + trainFreq + "</td><td>");
});



});

