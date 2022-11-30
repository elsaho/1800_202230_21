var role = localStorage.getItem('role');
var currentUser;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);
    // the following functions are always called when someone is logged in
    insertName();
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
  db.collection("rides")
    .where("role", "==", "Passenger")
    .get()
    .then(allRides => {
      allRides.forEach(doc => {
        var startLocation = doc.data().start;
        var endLocation = doc.data().end;
        var depTime = doc.data().DepartureTime;
        // var curStatus = doc.data().Status;
        var userName = doc.data().userName;
        var email = doc.data().userEmail;
        var userGender = doc.data().userGender;
        var rideID = doc.data().rideID;
        let rideCard = rideCardTemp.content.cloneNode(true);

        // rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
        rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
        rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
        rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
        rideCard.querySelector('.userContact').innerHTML = "Contact information: " + userName + ", " + email;
        rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
        rideCard.querySelector('.role').innerHTML = "I am a : Passenger";

        //bookmark
        currentUser.get().then(userDoc => {
          var bookmarks = userDoc.data().bookmarks;
          //console.log(rideID);
          if (bookmarks.includes(rideID)) {
            document.getElementById('save-' + rideID).innerText = 'bookmark';
          }
})
        
        rideCard.querySelector('i').id = 'save-' + rideID;
        rideCard.querySelector('i').onclick = () => updateBookmark(rideID);

        rideCardGroup.appendChild(rideCard);
      })
    })
} else if (role == "Passenger") {
  db.collection("rides")
  .where("role", "==", "Driver")
  .get()
  .then(allRides => {
    allRides.forEach(doc => {
      var startLocation = doc.data().start;
      var endLocation = doc.data().end;
      var depTime = doc.data().DepartureTime;
      // var curStatus = doc.data().Status;
      var userName = doc.data().userName;
      var email = doc.data().userEmail;
      var userGender = doc.data().userGender;
      var rideID = doc.data().rideID;
      let rideCard = rideCardTemp.content.cloneNode(true);
      // rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
      rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
      rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
      rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
      rideCard.querySelector('.userContact').innerHTML = "Contact information: " + userName + ", " + email;
      rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
      rideCard.querySelector('.role').innerHTML = "I am a : Driver";

      console.log(rideID);

      //bookmark
      currentUser.get().then(userDoc => {
        var bookmarks = userDoc.data().bookmarks;
        if (bookmarks.includes(rideID)) {
          document.getElementById('save-' + rideID).innerText = 'bookmark';
        }
      })

      rideCard.querySelector('i').id = 'save-' + rideID;
      rideCard.querySelector('i').onclick = () => {console.log(rideID); updateBookmark(rideID)};

      rideCardGroup.appendChild(rideCard);
    })
  })
}}

// function saveBookmark(rideID) {
//   currentUser.set({
//           bookmarks: firebase.firestore.FieldValue.arrayUnion(rideID)
//       }, {
//           merge: true
//       })
//       .then(function () {
//           console.log("bookmark has been saved for: " + currentUser);
//           var iconID = 'save-' + rideID;
//           console.log(iconID);
//           document.getElementById(iconID).innerText = 'bookmark';
//       });
// }

//
// db.collection("rides")
//     .get()
//     .then(allRides => {
//       allRides.forEach(doc => {
//         var rideID = doc.data().rideID;
//       })
//     })
//

function updateBookmark(id) {
  currentUser.get().then((userDoc) => {
    bookmarksNow = userDoc.data().bookmarks;
    // console.log(bookmarksNow)
    if (bookmarksNow.includes(id)) {
      console.log(id);
      currentUser
        .update({
          bookmarks: firebase.firestore.FieldValue.arrayRemove(id),
        })
        .then(function () {
          console.log("This bookmark is removed for" + currentUser);
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = "bookmark_border";
        });
    } else {
      currentUser
        .set(
          {
            bookmarks: firebase.firestore.FieldValue.arrayUnion(id),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log("This bookmark is for" + currentUser);
          var iconID = "save-" + id;
          console.log(iconID);
          document.getElementById(iconID).innerText = "bookmark";
        });
    }
  });
}




function listenNewChanges() {
  db.collection("chats").doc(chatid).collection("messages")
      .onSnapshot(snap => {
          snap.docChanges().forEach(change => {
              if (change.type == "added") {
                  console.log("new message ", change.doc.data());
                  let msgCard = document.getElementById("card-template")
                      .content.cloneNode(true);
                  msgCard.querySelector('.card-body').innerHTML = change.doc.data().text;
                  msgCard.querySelector('.card-name').innerHTML = change.doc.data().name;
                  document.getElementById("results").appendChild(msgCard);
              }
          })
      })
}

