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

// 2. Button for adding Employees
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(), "DD/MM/YY").format("X");
  var trainFreq = $("#freq-input").val().trim();
  console.log(trainFirst)
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);


  // Alert
  alert("Train Schedule successfully added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainFirst = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().rate;



  var trainStartMoment = moment.unix(trainFirst).format("MM/DD/YY");

  var trainSchedule = moment().diff(moment.unix(trainFirst, "X"), "months");


  var trainTime = trainSchedule * trainFreq;


  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainStartMoment + "</td><td>" + trainSchedule + "</td><td>" + trainFreq + "</td><td>" + trainTime + "</td></tr>");
});



});

