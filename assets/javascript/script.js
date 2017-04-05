
$(document).ready(function() {
  var $table = $("#train-table");
  var $form = $("#train-form");
  var $name = $("#train-name");
  var $dest = $("#destination");
  var $time = $("#train-time");
  var $freq = $("#frequency");
  var database = firebase.database();

  $form.submit(function(event) {
    debugger;
    event.preventDefault();
    console.log("train added");
    database.ref().push({
      name: $name.val(),
      dest: $dest.val(),
      time: $time.val(),
      freq: $freq.val()
    })
  });

  database.ref().on("child_added", function(snapshot) {
    var current = snapshot.val();
    var now = moment();
    var tStart = moment(current.time, "HH:mm");
    console.log(current);
    // NA = ((CT-ST)/FR + 1) * FR + ST
    // MA = NA - CT

    var nextTrain = moment(tStart.add((Math.ceil((now.diff(tStart, "minutes")/current.freq)) * current.freq), "minutes"));
    console.log(nextTrain.format("HH:mm"));

    var minAway = nextTrain.diff(now, "minutes");

    var timediff = moment().diff(moment(current.time, "HH:mm"), "minutes");
    console.log("Train start: " + moment(current.time, "HH:mm"));
    console.log(current.time);
    console.log(moment(current.time, "HH:mm"));
    console.log(timediff);
    console.log(moment(current.time, "HH:mm").toNow())
    console.log(moment().startOf('day').add(moment(current.time, "HH:mm")));
    $table.append(`<tr><td>${
      current.name
    }</td><td>${
      current.dest
    }</td><td>${
      current.freq
    }</td><td>${
      nextTrain.format("HH:mm")
    }</td><td>${
      minAway
    }</td></tr>`);
  });
});
console.log("javascript loaded");
