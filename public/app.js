fetch("/api/user")
.then(res => res.json())
.then(data => {

 if(!data.login){
   location = "/"
 }

 document.getElementById("user").innerHTML =
 "Welcome " + data.username

})
