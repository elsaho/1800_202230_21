var currentUser

function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery
                // document.getElementByID("name-goes-here").innetText=user_Name;
            })
        }

    })
}
insertName();

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
              Status: curStatus,
              userID: userID,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
              window.location.href = "trip.html"; //new line added
            })
          })
  
      } else {
        // No user is signed in.
      }
    });
  
  }

  