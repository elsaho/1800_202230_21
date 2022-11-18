var currentUser;
// var curRide;
var role = localStorage.getItem('role');

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);
    // the following functions are always called when someone is logged in   
    showTripHistory(user.uid)
    insertName();
    // curRide = db.collections("rides").doc(user.uid);
    // console.log(curRide);
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
  let rideCardTemp = document.getElementById("rideCardTemp");
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
            // var curStatus = doc.data().Status;
            let rideCard = rideCardTemp.content.cloneNode(true);
            if (startLocation != null) {
              rideCard.querySelector('.start').value = startLocation;
            }
            if (endLocation != null) {
              rideCard.querySelector('.end').value = endLocation;
            }
            if (depTime != null) {
              rideCard.querySelector('.depTime').value = depTime;
            }
            // if (curStatus != null) {
            //   if (curStatus == "Available") {
            //     rideCard.querySelector('.curStatus').value = curStatus;
            //   } else {                     
            //     rideCard.querySelector('.curStatus').value = $('.NotAvailable').prop('checked', true);
            //   }                                              
            // }
            rideCardGroup.appendChild(rideCard);
          })
        })

    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}
showTripHistory(currentUser);

function editRideInfo() {
  //Enable the form fields
  document.getElementById('rideCardTemp').disabled = false;
}

function saveRideInfo() {
//   console.log("inside save ride info");

//   var startLocation = document.getElementById("startLocation").value; //get the value of the field with id="nameInput"
//   var endLocation = document.getElementById("endLocation").value; //get the value of the field with id="schoolInput"
//   var depTime = document.getElementById("depTime").value; //get the value of the field with id="cityInput"


//   curRide.update({
//       start: startLocation,
//       end: endLocation,
//       DepartureTime: depTime
//     })
//     .then(() => {
//       console.log("Document successfully updated!");
//       // window.location.assign("role.html");
//     })
}
document.getElementById('rideCardTemp').disabled = true;