var currentUser
var role = localStorage.getItem('role');
var rideID;

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
                document.getElementById("name-goes-here").textContent = user_Name + "'s New Trip As A " + role;
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
    var rideID;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
      
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    var userName = userDoc.data().name;
                    var userGender = userDoc.data().gender;
                    rideID = db.collection("rides").doc().id;

                    db.collection("rides").doc(rideID).set({
                        start: startLocation,
                        end: endLocation,
                        DepartureTime: depTime,
                        userID: userID,
                        userEmail: userEmail,
                        userName: userName,
                        userGender: userGender,
                        role: role,
                        rideID: rideID,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        console.log(rideID);
                        window.location.href = "thanks.html"; 
                    })

                })

        } else {
            console.log("No user signed in");
        }
    });

}