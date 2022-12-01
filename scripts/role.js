var currentUser //put this right after you start script tag before writing any functions.

document.getElementById("driver").addEventListener("click", function(){
  localStorage.setItem('role', 'Driver');
})

document.getElementById("passenger").addEventListener("click", function(){
  localStorage.setItem('role', 'Passenger');
})
