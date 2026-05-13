document.addEventListener("DOMContentLoaded", function(){

// CONTACT NUMBER VALIDATION
let contactInput = document.getElementById("contact");

contactInput.addEventListener("input", function(){

  this.value = this.value.replace(/\D/g, "");

  if(this.value.length > 10){
    this.value = this.value.slice(0,10);
  }

});

// EMAIL CHECK
$("#email").on("keyup", function(){

  let email = $(this).val().trim();

  if(email === ""){

    $("#emailMsg").html("");
    return;

  }

  $.ajax({

    url: "php/register.php",

    type: "POST",

    data: {

      check_email: 1,
      email: email

    },

    success: function(data){

      if(data.trim() === "exists"){

        $("#emailMsg").html(
          "This email is already existing please Login"
        );

      }
      else{

        $("#emailMsg").html("");

      }

    }

  });

});

// REGISTER FORM
document.getElementById("registerForm").onsubmit = function(e){

  e.preventDefault();

  let fields = [
    "email",
    "password",
    "confirmPassword",
    "name",
    "age",
    "dob",
    "contact",
    "address",
    "city",
    "country",
    "pincode"
  ];

  let hasError = false;

  fields.forEach(id => {

    let input = document.getElementById(id);

    if(!input.value.trim()){

      input.style.border = "2px solid red";
      hasError = true;

    }
    else{

      input.style.border = "";

    }

  });

  if(contactInput.value.length !== 10){

    contactInput.style.border = "2px solid red";
    hasError = true;

  }

  if(hasError){

    alert("Please check the highlighted fields");
    return false;

  }

  let password = document.getElementById("password").value;

  let confirm = document.getElementById("confirmPassword").value;

  if(password !== confirm){

    alert("Passwords do not match");
    return false;

  }

  $.ajax({

    url: "php/register.php",

    type: "POST",

    data: {

      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      password: password,
      age: document.getElementById("age").value,
      dob: document.getElementById("dob").value,
      contact: document.getElementById("contact").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      country: document.getElementById("country").value,
      pincode: document.getElementById("pincode").value

    },

    success: function(data){

      console.log("REGISTER:", data);

      if(data.trim() === "success"){

        alert("Registered Successfully");
        window.location.href = "login.html";

      }

      else if(data.trim() === "exists"){

        alert("Email already exists");

      }

      else if(data.trim() === "invalid_email"){

        alert("Please enter a valid email address");

      }

      else{

        alert("Error: " + data);

      }

    },

    error: function(){

      alert("Server Error");

    }

  });

  return false;

};

});

// TOGGLE PASSWORD
function togglePassword(id, el){

  let field = document.getElementById(id);

  let icon = el.querySelector("i");

  if(field.type === "password"){

    field.type = "text";

    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");

  }
  else{

    field.type = "password";

    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");

  }

}


// SHOW / HIDE ICON
function toggleIcon(iconId, input){

  let icon = document.getElementById(iconId);

  if(input.value.length > 0){

    icon.style.display = "block";

  }
  else{

    icon.style.display = "none";

  }

}