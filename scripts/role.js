var currentUser //put this right after you start script tag before writing any functions.

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
            var userRole = userDoc.data().Role;
  
            //if the data fields are not empty, then write them in to the form.
            if (userRole != null) {
              document.querySelector('input[name="Role"]:checked').value;
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
  
    userRole = document.querySelector('input[name="Role"]:checked').value;
  
    currentUser.update({
        Role: userRole
      })
      .then(() => {
        console.log("Document successfully updated!");
        window.location.assign("role.html"); 
      })
  }