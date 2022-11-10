var currentUser

function insertName(){
  // to check if the user is logged in:
   firebase.auth().onAuthStateChanged(user =>{
       if (user){
           console.log(user.uid); // let me to know who is the user that logged in to get the UID
          currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
          currentUser.get().then(userDoc=>{
              //get the user name
              var user_Name= userDoc.data().name;
              console.log(user_Name);
              $("#name-goes-here").text(user_Name); //jquery
              // document.getElementByID("name-goes-here").innetText=user_Name;
          })    
      }
  
   })
  }
  insertName();

  function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {
  
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid)
        console.log(user.uid);
        //get the document for current user.
        currentUser.get()
          .then(userDoc => {
            //get the data fields of the user
            var userCurrentLocation = userDoc.data().currentLocation;
            var userDestination = userDoc.data().destintaion;
  
            //if the data fields are not empty, then write them in to the form.
            if (userCurrentLocation != null) {
              document.getElementById("currentLocationInput").value = userCurrentLocation;
            }
            if (userDestination != null) {
                document.getElementById("destinationInput").value = userDestination;
            }
          })
      } else {
        // No user is signed in.
        console.log("No user is signed in");
      }
    });
  }

  //call the function to run it 
populateInfo();

function saveUserInfo() {
    console.log("inside save user info");

    userCurrentLocation = document.getElementById('currentLocationInput').value; 
    userDestination = document.getElementById('destinationInput').value; 
  
    currentUser.update({
        currentLocation: userCurrentLocation,
        destination: userDestination
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.assign("map.html"); 
      })
  }
  