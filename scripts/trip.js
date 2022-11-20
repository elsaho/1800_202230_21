var role = localStorage.getItem('role');

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
        let rideCard = rideCardTemp.content.cloneNode(true);
        // rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
        rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
        rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
        rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
        rideCard.querySelector('.userContact').innerHTML = "Contact information: " + userName + ", " + email;
        rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
        rideCard.querySelector('.role').innerHTML = "I am a : Passenger";
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
      let rideCard = rideCardTemp.content.cloneNode(true);
      // rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
      rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
      rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
      rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
      rideCard.querySelector('.userContact').innerHTML = "Contact information: " + userName + ", " + email;
      rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
      rideCard.querySelector('.role').innerHTML = "I am a : Driver";
      rideCardGroup.appendChild(rideCard);
    })
  })
}}

populateRidesInfo();

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