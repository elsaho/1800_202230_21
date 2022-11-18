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
          var userName = userDoc.data().name;
          var userSchool = userDoc.data().school;
          var userCity = userDoc.data().city;
          var userGender = userDoc.data().gender;

          //if the data fields are not empty, then write them in to the form.
          if (userName != null) {
            document.getElementById("nameInput").value = userName;
          }
          if (userSchool != null) {
            document.getElementById("schoolInput").value = userSchool;
          }
          if (userCity != null) {
            document.getElementById("cityInput").value = userCity;
          }
          if (userGender != null) {
            if (userGender == "Female") {
              $('.Female').prop('checked', true);
            }
            if (userGender == "Male") {
              $('.Male').prop('checked', true);
            }
            if (userGender == "Other") {
              $('.Other').prop('checked', true);
            }
          }
          // document.querySelector('form-check').value = userGender;

        })
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  console.log("inside save user info");

  userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
  userSchool = document.getElementById('schoolInput').value; //get the value of the field with id="schoolInput"
  userCity = document.getElementById('cityInput').value; //get the value of the field with id="cityInput"
  userGender = document.querySelector('input[name="Gender"]:checked').value;

  currentUser.update({
      name: userName,
      school: userSchool,
      city: userCity,
      gender: userGender
    })
    .then(() => {
      console.log("Document successfully updated!");
      window.location.assign("role.html");
    })
}
document.getElementById('personalInfoFields').disabled = true;