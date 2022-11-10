// var ride
// var startLocation
// var endLocation
// var depTime
// var curStatus
// var role

function addTripInfo() {

    // ride = db.collection("rides");
    console.log("in");
  
    var startLocation = document.getElementById("startLocation").value; //get the value of the field with id="nameInput"
    var endLocation = document.getElementById("endLocation").value; //get the value of the field with id="schoolInput"
    var depTime = document.getElementById("depTime").value; //get the value of the field with id="cityInput"
    var curStatus = document.querySelector('input[name="status"]:checked').value;
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        var userID = user.uid;
        //get the document for current user.
        currentUser.get()
          .then(userDoc => {
            db.collection("rides").add({
              start: startLocation,
              end: endLocation,
              DepartureTime: depTime,
              Status: curStatus
            }).then(() => {
              window.location.href = "mytrip.html"; //new line added
            })
          })
  
      } else {
        // No user is signed in.
      }
    });
  
  }

