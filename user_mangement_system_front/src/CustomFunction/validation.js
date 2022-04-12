
function validation() {
  console.log("dheeeeeeeeeeeeeeeeeeeeeeeee");
  let validity = document.getElementById('validation').innerHTML
  let username = document.getElementById('username').innerHTML
  if(username == "" && 3<=username.length<20) {
  validity = "User Name Need Minimum 3 Character And Maximum 20 Character"
  return false
  }

}


export default validation;