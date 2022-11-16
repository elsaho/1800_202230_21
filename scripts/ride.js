var role = localStorage.getItem('role');

function populateRidesInfo() {
  let rideCardTemp = document.getElementById("rideCardTemp");
  let rideCardGroup = document.getElementById("rideCardGroup");
  if (role === "Passenger") {
    db.collection("rides").doc("AllDriverRides").collection("DrivererRides").get()
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
  } else if (role === "Driver") {
    db.collection("rides").doc("AllPassengerRides").collection("PassengerRides").get()
      .then(allRides => {
        allRides.forEach(doc => {
          var startLocation = doc.data().start;
          var endLocation = doc.data().end;
          var depTime = doc.data().DepartureTime;
          var curStatus = doc.data().Status;
          let rideCard = rideCardTemp.content.cloneNode(true);
          rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
          rideCard.querySelector('.end').innerHTML = "To: " + endLocation;
          rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
          rideCard.querySelector('.email').innerHTML = "Contact information " + email;
          rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
          rideCard.querySelector('.role').innerHTML = "I'm a passenger, I'm looking for a ride."        
          rideCardGroup.appendChild(rideCard);
        })
      })

  }

}
populateRidesInfo();