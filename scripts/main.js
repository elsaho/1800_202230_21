var currentUser
var role = localStorage.getItem('role');

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
            // currentUser.get()
            //     .then(userDoc => {
            //         //get the data fields of the user
            //         var userEmail = userDoc.data().email;
            //     })
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    var userName = userDoc.data().name;
                    var userGender = userDoc.data().gender;
                    if (role === "Passenger") {
                        db.collection("rides").doc("AllPassengerRides").collection("PassengerRides").add({
                            start: startLocation,
                            end: endLocation,
                            DepartureTime: depTime,
                            Status: curStatus,
                            userID: userID,
                            userEmail: userEmail,
                            userName: userName,
                            userGender: userGender,
                            role: role,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            window.location.href = "trip.html"; //new line added
                        })
                    } else if (role === "Driver") {
                        db.collection("rides").doc("AllDriverRides").collection("DriverRides").add({
                            start: startLocation,
                            end: endLocation,
                            DepartureTime: depTime,
                            Status: curStatus,
                            userID: userID,
                            userEmail: userEmail,
                            userName: userName,
                            userGender: userGender,
                            role: role,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            window.location.href = "trip.html"; //new line added
                        })
                    }

                })

        } else {
            // No user is signed in.
        }
    });

}