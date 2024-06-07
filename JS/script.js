signUpLink=document.getElementById('sign-up');
signUpBtn=document.getElementById('signUpBtn');
signInContainer=document.getElementById('signInContainer');
signUpContainer=document.getElementById('signUpContainer');
signInUsername=document.getElementById('signInUsername');
signInPassword=document.getElementById('signInPassword');
signUpUsername=document.getElementById('signUpUsername');
signUpEmail=document.getElementById('signUpEmail');
signUpPassword=document.getElementById('signUpPassword');
alertSignUp=document.getElementById('alertSignUp');
signOut=document.getElementById('signOut');
navbar=document.getElementById('navbar');
nameOfUser=document.getElementById('nameOfUser');
alertSignIn=document.getElementById('alertSignIn');

var infoContainer;


if(localStorage.getItem('infoContainer')!=null){
    infoContainer=JSON.parse(localStorage.getItem('infoContainer'));
    }else{
        infoContainer=[];
    }

signUpLink.addEventListener("click", function(e) {
    e.preventDefault();
    signInContainer.classList.add('d-none');
    signUpContainer.classList.remove('d-none');
  });

  signUpBtn.addEventListener('click',function(){
    if (isUsernameTaken(signUpUsername.value) || isEmailTaken(signUpEmail.value)) {
        alertSignUp.textContent = "Username or Email is already taken";
        alertSignUp.classList.remove('d-none');
    } else {
        addInfo();
        clearInfo();
    }
  })

  function addInfo(){

    var info ={
        username:signUpUsername.value,
        email:signUpEmail.value,
        password:signUpPassword.value
    }

    if (signUpUsername.classList.contains('is-valid')&&signUpEmail.classList.contains('is-valid')&&signUpPassword.classList.contains('is-valid')){
        infoContainer.push(info);
        localStorage.setItem('infoContainer',JSON.stringify(infoContainer));
        signInContainer.classList.remove('d-none');
    signUpContainer.classList.add('d-none');
    alertSignUp.classList.add('d-none');
    alertSignIn.classList.add('d-none');
    clearLogin();
    alert("Sign Up successful!");


    }else{
        alertSignUp.classList.remove('d-none');
    }

   

  }

  function clearInfo() {
    signUpUsername.value='';
    signUpEmail.value='';
    signUpPassword.value='';
}

function validateInputs(element) {

    var regex={
        signUpUsername:/^\w{3,10}$/,
        signUpEmail:/^\w{3,20}@[a-z]{2,10}\.[a-z]{3,10}$/,
        signUpPassword:/^\w{3,10}$/,
        
    }

    if (regex[element.id].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }else{
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }
    console.log(element.classList);
}
  




function isUsernameTaken(username) {
    for (var i = 0; i < infoContainer.length; i++) {
        if (infoContainer[i].username === username) {
            return true;
        }
    }
    return false;
}

function isEmailTaken(email) {
    for (var i = 0; i < infoContainer.length; i++) {
        if (infoContainer[i].email === email) {
            return true;
        }
    }
    return false;
}



var signInBtn = document.querySelector("#signInContainer button");

signInBtn.addEventListener("click", function() {
    var username = signInUsername.value;
    var password = signInPassword.value;
    var found = false;

    for (var i = 0; i < infoContainer.length; i++) {
        if (infoContainer[i].username === username && infoContainer[i].password === password) {
            signInContainer.classList.add('d-none');
            navbar.classList.remove('d-none');
            alertSignIn.classList.add('d-none');
            nameOfUser.innerHTML=`<h2 class="mb-5">Welcome Back</h2>
            <div  class="nameOfUser">
          <h2 class="h1">${username}</h2>
        </div>`

            found = true;
            break;
        }
    }

    if (!found) {
        alertSignIn.classList.remove('d-none')
    }
});

signOut.addEventListener('click',function(){
    signInContainer.classList.remove('d-none');
    alertSignUp.classList.add('d-none');
    clearLogin()

})

function clearLogin(){
    signInUsername.value='';
    signInPassword.value='';
}
