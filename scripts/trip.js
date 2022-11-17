var role = localStorage.getItem('role');

function populateRidesInfo() {
  let rideCardTemp = document.getElementById("rideCardTemp");
  let rideCardGroup = document.getElementById("rideCardGroup");
  if (role === "Passenger") {
    db.collection("rides").doc("AllDriverRides").collection("DriverRides").get()
      .then(allRides => {
        allRides.forEach(doc => {
          var startLocation = doc.data().start;
          var endLocation = doc.data().end;
          var depTime = doc.data().DepartureTime;
          var curStatus = doc.data().Status;
          var userName = doc.data().userName;
          var email = doc.data().userEmail;
          var userGender = doc.data().userData;
          let rideCard = rideCardTemp.content.cloneNode(true);
          rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
          rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
          rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
          rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
          rideCard.querySelector('.userContact').innerHTML = "Contact information: " + userName + ", " + email;
          rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
          rideCard.querySelector('.role').innerHTML = "I'm a driver, I'm offering a ride."          
          rideCardGroup.appendChild(rideCard);
        })
      })
  } else if (role === "Driver") {
    db.collection("rides").doc("AllPassengerRides").collection("PassengerRides").get()
      .then(allRides => {
        allRides.forEach(doc => {
          var startLocation = doc.data().start;
          var endLocation = doc.data().end;
          var depTime = doc.data().DepartureTime;
          var curStatus = doc.data().Status;
          var userName = doc.data().userName;
          var email = doc.data().userEmail;
          var userGender = doc.data().userGender;
          let rideCard = rideCardTemp.content.cloneNode(true);
          rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
          rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
          rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
          rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
          rideCard.querySelector('.userContact').innerHTML = "Contact information: " + userName + ", " + email;
          rideCard.querySelector('.userGender').innerHTML = "Gender: " + userGender;
          rideCard.querySelector('.role').innerHTML = "I'm a passenger, I'm looking for a ride."        
          rideCardGroup.appendChild(rideCard);
        })
      })

  }

}
populateRidesInfo();