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

	var firstTrain = moment(childSnapshot.val().firstTrain,"hh:mm");
	//difference of time between the firstrain and now
	var difference = moment().diff(firstTrain);
	var frequency = childSnapshot.val().frequency;

	
	console.log(difference);
	console.log(firstTrain);	

	
		

		



		// $("#tableStart")

		// .append(tableRow)
		// .append(trainName)
		// .append(destination)
		// .append(frequency)
		// .append(nextArrivalTime)
		// .append(minutesAway );
		
		
		

		
	});// end of checking if child is added



});// end of document ready function