
const form = document.getElementById("form")

let allUsers = [];

function User (fName,lName,email,password,passwordConf) {
    this.fName = fName
    this.lName = lName
    this.email = email
    this.password = password
    this.passwordConf = passwordConf
}

function render (event) {
    event.preventDefault();
    console.log(event);
    window.location.href = "login.html";

    let firstName = event.target.fName.value;
    let lastName = event.target.lName.value;
    let uEmail = event.target.email.value;
    let uPassword = event.target.password.value;
    let uPasswordConf = event.target.passwordConfirm.value;
    if(uPassword !== uPasswordConf){
        alert('Passwords do not match');
    }

    let newUser = new User(firstName, lastName, uEmail,uPassword,uPasswordConf);
    allUsers.push(newUser);

    saveToLocal();

    document.forms[0].reset();
}
function saveToLocal(){
    let strArr = JSON.stringify(allUsers);
    localStorage.setItem('allUsers',strArr);
}


form.addEventListener('submit', render);

/************** */
const showname = ( fName, lName) =>
  `<div>
  <h5 class="card-title">${fName}</h5>

  </div>
     `;

