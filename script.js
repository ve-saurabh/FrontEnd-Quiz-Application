let fname = document.getElementById("fname");
let email = document.getElementById("email");
let button = document.getElementById("button");
let allusers = localStorage.getItem("allusers");
if(allusers){
    allusers = JSON.parse(allusers);
}
else{
    allusers = [];
}

button.addEventListener("click", (e)=>{
    e.preventDefault();
     if(fname.value!=='' && email.value!==''){
        let currentuser = allusers.find(ele=> ele.Email == email.value);
        if(currentuser){
            localStorage.setItem('currentuser', JSON.stringify(currentuser));
            alert('This email already exists!')
            location.href = "../Registration Page/RegistrationPage.html"
        }
        else{
            currentuser = {FullName:fname.value, Email:email.value, HighestScore:0};
            allusers.push(currentuser);
            localStorage.setItem('currentuser', JSON.stringify(currentuser));
            location.href = "../Home Page/homePage.html"
        }
        localStorage.setItem('allusers', JSON.stringify(allusers))
     }
     else{
        alert('Please fill all the details!')
     }
})