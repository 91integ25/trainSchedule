$(document).ready(function () {
	
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJmV0cyyTvSJKHH4xF6vpP3O6nW0Ym96Y",
    authDomain: "train-scheduler-49b82.firebaseapp.com",
    databaseURL: "https://train-scheduler-49b82.firebaseio.com",
    storageBucket: "train-scheduler-49b82.appspot.com",
    messagingSenderId: "808503016097"
  };

  firebase.initializeApp(config);
// set variable for firebase data
  var fbdata = firebase.database();

  

// on click I will push form data to firebase
	$('#submitInfo').on("click", function(event){
		event.preventDefault();

		var trainName = $("#train").val().trim();
		var destination = $("#destination").val().trim();
		var firstTrain = $("#firstTrain").val().trim();
		var frequency = $("#frequency").val().trim();

		fbdata.ref().push({
			train: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP


		}); // end of push to firebase

	});// end of submit info function
	
	fbdata.ref().on("child_added", function (childSnapshot) {
		
		var tableRow = $("<tr>");
		var trainName = $("<td>").html(childSnapshot.val().train);
		var destination = $("<td>").html(childSnapshot.val().destination);
		var frequency = $("<td>").html(childSnapshot.val().frequency);
		// var minutesNow = parseInt(moment().format("HH")) * 60 + parseInt(moment().format("mm"));
		// var nextArrival = Math.ceil(minutesNow /parseInt(childSnapshot.val().frequency)) * parseInt(childSnapshot.val().frequency);
		// var nextArrivalHours = Math.floor(nextArrival/60);
	 //    var nextArrivalMin = (nextArrival % 60 );
		// var nextArrivalTime = $("<td>").html(nextArrivalHours + ":" + nextArrivalMin);
		// var minutesAway = $("<td>").html(nextArrival - minutesNow);
	var firstTrain = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");

	var currentTime = moment();
	var difference = moment().diff(firstTrain, "mm");
	var frequency = childSnapshot.val().frequency;
	
	console.log(difference);
	console.log(firstTrain);	

			// var timeNow = moment(childSnapshot.val().firstTrain).hour();
			// console.log(timeNow);

		

		



		// $("#tableStart")

		// .append(tableRow)
		// .append(trainName)
		// .append(destination)
		// .append(frequency)
		// .append(nextArrivalTime)
		// .append(minutesAway );
		
		
		

		
	});// end of checking if child is added



});// end of document ready function