var currentUser;
var role = localStorage.getItem('role');

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
                    var curStatus = doc.data().Status;
                    var email = doc.data().userEmail;
                    let rideCard = rideCardTemp.content.cloneNode(true);
                    if (startLocation != null) {
                        rideCard.querySelector('.start').value = startLocation;
                      }
                    if (endLocation != null) {
                        rideCard.querySelector('.end').value = endLocation;
                      }
                      if (depTime != null) {
                        rideCard.querySelector('.depTime').value = endLocation;
                      }
                      if (curStatus != null) {
                        if (curStatus == "Available") {
                            $('.Available').prop('checked', true);
                        } else {                     
                            $('.NotAvailable').prop('checked', true);
                        }
                      }
                    //   if (curStatus != null) {
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
    console.log("inside save ride info");
  
    // userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    // userSchool = document.getElementById('schoolInput').value; //get the value of the field with id="schoolInput"
    // userCity = document.getElementById('cityInput').value; //get the value of the field with id="cityInput"
    // userGender = document.querySelector('input[name="Gender"]:checked').value;
  
    // currentUser.update({
    //     name: userName,
    //     school: userSchool,
    //     city: userCity,
    //     gender: userGender
    //   })
    //   .then(() => {
    //     console.log("Document successfully updated!");
    //     window.location.assign("role.html");
    //   })
  }
  document.getElementById('rideCardGroup').disabled = true;