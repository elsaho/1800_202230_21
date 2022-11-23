firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let rideCardGroup = document.getElementById("rideCardGroup");
            bookmarks.forEach(thisRideID => {
                console.log(thisRideID);
                db.collection("rides").where("rideID", "==", thisRideID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var startLocation = doc.start;
                        var endLocation = doc.end;
                        var depTime = doc.DepartureTime;
                        var userName = doc.userName;
                        var email = doc.userEmail;
                        var rideRole = doc.role;
                        let rideCard = rideCardTemp.content.cloneNode(true);

                        rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
                        rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
                        rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
                        rideCard.querySelector('.email').innerHTML = "Contact information: " + userName + ", "+ email;
                        rideCard.querySelector('.role').innerHTML = "As a: " + rideRole;
                        rideCardGroup.appendChild(rideCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}