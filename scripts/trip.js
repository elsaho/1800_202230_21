var role = localStorage.getItem('role');
var currentUser;


firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);

    // the following functions are always called when someone is logged in
    populateRidesInfo();
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

function populateRidesInfo() {
  let rideCardTemp = document.getElementById("rideCardTemp");
  let rideCardGroup = document.getElementById("rideCardGroup");

  console.log(role);

  if (role === "Driver") {
    document.getElementById("tripHeader").textContent = "Available Trips Posted by Passengers";
    db.collection("rides")
      .where("role", "==", "Passenger")
      .get()
      .then(allRides => {
        allRides.forEach(doc => {
          var startLocation = doc.data().start;
          var endLocation = doc.data().end;
          var depTime = doc.data().DepartureTime;
          var userName = doc.data().userName;
          var email = doc.data().userEmail;
          var userGender = doc.data().userGender;
          var rideID = doc.data().rideID;
          let rideCard = rideCardTemp.content.cloneNode(true);

          rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
          rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
          rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
          rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
          rideCard.querySelector('.role').innerHTML = userName + " is posting as a: Passenger";
          rideCard.querySelector('.userContact').innerHTML = "Contact " + userName + " at: " + email + ". Or bookmark for later view!";

          currentUser.set({
              bookmarks: firebase.firestore.FieldValue.arrayUnion(),
            }, {
              merge: true
            })

          //bookmark
          rideCard.querySelector('i').id = "save-" + rideID;
          rideCard.querySelector('i').onclick = () => updateBookmark(rideID);

          currentUser.get().then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            if (bookmarks.includes(rideID)) {
              document.getElementById('save-' + rideID).innerText = 'bookmark';
            }
          })


          rideCardGroup.appendChild(rideCard);
        })
      })
  } else if (role == "Passenger") {
    document.getElementById("tripHeader").textContent = "Available Trips Posted by Drivers";
    db.collection("rides")
      .where("role", "==", "Driver")
      .get()
      .then(allRides => {
        allRides.forEach(doc => {
          var startLocation = doc.data().start;
          var endLocation = doc.data().end;
          var depTime = doc.data().DepartureTime;
          var userName = doc.data().userName;
          var email = doc.data().userEmail;
          var userGender = doc.data().userGender;
          var rideID = doc.data().rideID;
          let rideCard = rideCardTemp.content.cloneNode(true);
          rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
          rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
          rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
          rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
          rideCard.querySelector('.role').innerHTML = userName + " is posting as a: Driver";
          rideCard.querySelector('.userContact').innerHTML = "Contact " + userName + " at: " + email + ". Or bookmark for later view!";


          currentUser.set({
              bookmarks: firebase.firestore.FieldValue.arrayUnion(),
            }, {
              merge: true
            })

          rideCard.querySelector('i').id = "save-" + rideID;
          rideCard.querySelector('i').onclick = () => updateBookmark(rideID);

          //bookmark
          currentUser.get().then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            if (bookmarks.includes(rideID)) {
              document.getElementById('save-' + rideID).innerText = 'bookmark';
            }
          })

          rideCardGroup.appendChild(rideCard);
        })
      })
  }
}


function updateBookmark(id) {
  currentUser.get().then((userDoc) => {
    bookmarksNow = userDoc.data().bookmarks;
    console.log(bookmarksNow);

    if (bookmarksNow.includes(id)) {
      console.log(id)
      currentUser
        .update({
          bookmarks: firebase.firestore.FieldValue.arrayRemove(id),
        })
        .then(function () {
          console.log("This bookmark is removed");
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = 'bookmark_border';
        });
    } else {
      currentUser
        .set({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(id),
        }, {
          merge: true
        })
        .then(function () {
          console.log("This bookmark is added");
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = 'bookmark';
        });
    }
  });
}