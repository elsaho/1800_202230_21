var currentUser;
var role = localStorage.getItem('role');

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
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

function updateTripHistory() {
    let rideCardTemp = document.getElementById("rideCardTemp");
    let rideCardGroup = document.getElementById("rideCardGroup");

      db.collection("rides").doc("AllDriverRides").collection("DriverRides")
        //.where("userID", "==", userDoc.uid) 
        //Want to filter so that it only displays rides from THIS user but not working rn
        .get()
        .then(allRides => {
          allRides.forEach(doc => {
            var startLocation = doc.data().start;
            var endLocation = doc.data().end;
            var depTime = doc.data().DepartureTime;
            var curStatus = doc.data().Status;
            var email = doc.data().userEmail;
            let rideCard = rideCardTemp.content.cloneNode(true);
            rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
            rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
            rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
            rideCard.querySelector('.email').innerHTML = "Contact information " + email;
            rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
            rideCard.querySelector('.role').innerHTML = "I'm a driver, I'm offering a ride."
            rideCardGroup.appendChild(rideCard);
          })
        })

    //Also add same thing for passenger postings
}

updateTripHistory();