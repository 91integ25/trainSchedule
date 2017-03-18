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
		
		var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var minutesTillTrain = frequency - tRemainder;
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        var nextTrainFormatted = moment(nextTrain).format("hh:mm");
		
		fbdata.ref().push({
			train: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
			nextTrainFormatted:nextTrainFormatted,
			minutesTillTrain:minutesTillTrain,
			dateAdded: firebase.database.ServerValue.TIMESTAMP


		}); // end of push to firebase

	$("#frequency").empty();
	$("#firstTrain").empty();
	$("#destination").empty();
	$("#train").empty();

	});// end of submit info function
	
	fbdata.ref().on("child_added", function (childSnapshot) {
		
		var tableRow = $("<tr>");
		var trainName = $("<td>").html(childSnapshot.val().train);
		var destination = $("<td>").html(childSnapshot.val().destination);
		var frequencyAppend = $("<td>").html(childSnapshot.val().frequency);
		var nextTrainAppend = $("<td>").html(childSnapshot.val().nextTrainFormatted);
		var minutesTillAppend = $("<td>").html(childSnapshot.val().minutesTillTrain);
		
		
	$("#tableStart")
	.append(trainName)
	.append(destination)
	.append(frequencyAppend)
	.append(nextTrainAppend)
	.append(minutesTillAppend);
		

	
	


	
	
		

		



		// $("#tableStart")

		// .append(tableRow)
		// .append(trainName)
		// .append(destination)
		// .append(frequencyTable);
		
		
		
		

		
	});// end of checking if child is added



});// end of document ready function