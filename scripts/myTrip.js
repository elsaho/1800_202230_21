var currentUser;
var role = localStorage.getItem('role');
var rideID;



firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);
    // the following functions are always called when someone is logged in
    insertName();
    showTripHistory(user.uid);
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

function insertName() {
  currentUser.get().then(userDoc => {
    //get the user name
    var user_Name = userDoc.data().name;
    console.log(user_Name);

    $("#name-goes-here").text(user_Name); //jquery
  })
}

function showTripHistory(currentUser) {
  document.getElementById("rideCardTemp");
  let rideCardGroup = document.getElementById("rideCardGroup");
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("rides")
        .where("userID", "==", currentUser)
        .get()
        .then(allRides => {
          allRides.forEach(doc => {
            var startLocation = doc.data().start;
            var endLocation = doc.data().end;
            var depTime = doc.data().DepartureTime;
            var userName = doc.data().userName;
            // var curStatus = doc.data().Status;
            var email = doc.data().userEmail;
            var rideRole = doc.data().role;
            rideID = doc.data().rideID;
            let rideCard = rideCardTemp.content.cloneNode(true);
            rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
            rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
            rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
            rideCard.querySelector('.email').innerHTML = "Contact information: " + userName + ", "+ email;
            // rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
            rideCard.querySelector('.role').innerHTML = "As a: " + rideRole;
            rideCardGroup.appendChild(rideCard);
          })
        })
    }
  })
}


function deletePost() {
  console.log(rideID);
  db.collection("rides").doc(rideID).delete().then(() => {
    console.log("Document successfully deleted!");
    window.location.reload ();
}).catch((error) => {
    console.error("Error removing document: ", error);
});

    
}