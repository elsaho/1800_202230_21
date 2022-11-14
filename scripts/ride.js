var role = localStorage.getItem('role');

function populateRidesInfo() {
  let rideCardTemp = document.getElementById("rideCardTemp");
  let rideCardGroup = document.getElementById("rideCardGroup");

  db.collection("rides").get()
    .then(allRides => {
      allRides.forEach(doc => {
        var startLocation = doc.data().start; 
        var endLocation = doc.data().end; 
        var depTime = doc.data().DepartureTime;
        var curStatus = doc.data().Status;
        let rideCard = rideCardTemp.content.cloneNode(true);
        rideCard.querySelector('.start').innerHTML = "From: " + startLocation;
        rideCard.querySelector('.end').innerHTML = "To: " +endLocation;
        rideCard.querySelector('.depTime').innerHTML = "Departing at: " + depTime;
        rideCard.querySelector('.curStatus').innerHTML = "Status: " + curStatus;
        if (role === 'Passenger') {
          rideCard.querySelector('.curStatus').innerHTML = "I'm a passenger, I'm looking for a ride."
        } else if (role === 'Driver') {
          rideCard.querySelector('.curStatus').innerHTML = "I'm a driver, I'm offering a ride."
        }
        rideCardGroup.appendChild(rideCard);
      })
    })
}
populateRidesInfo();

