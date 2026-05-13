document.addEventListener("DOMContentLoaded", function () {

    let attempts = 0;

   
    document.getElementById("loginForm").addEventListener("submit", function (e) {

        e.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        $.ajax({
            url: "php/login.php",
            type: "POST",

            data: {
                email: email,
                password: password
            },

            success: function (data) {

                console.log("LOGIN:", data);

                if (data.trim() === "success") {

                    attempts = 0;

                    localStorage.setItem("email", email);

                    console.log(
                        "Stored Email:",
                        localStorage.getItem("email")
                    );

                    window.location.href = "profile.html";

                } else {

                    attempts++;

                    alert("Invalid email or password");

                    if (attempts >= 3) {

                        document.getElementById("forgotSection").style.display = "block";

                    }
                }
            },

            error: function () {

                alert("Server Error");

            }

        });

    });

});



function resetPassword() {

    let email = document.getElementById("email").value;

    let newPass = document.getElementById("newPass").value;

    let confirm = document.getElementById("confirmPass").value;


    if (!newPass || !confirm) {

        alert("Fill all fields");
        return;

    }


    if (newPass !== confirm) {

        alert("Passwords do not match");
        return;

    }


    $.ajax({

        url: "php/login.php",

        type: "POST",

        data: {
            email: email,
            password: newPass,
            reset: 1
        },

        success: function (data) {

            console.log("RESET:", data);

            if (data.trim() === "reset_success") {

                alert("Password reset successful");

                document.getElementById("resetBox").style.display = "none";

            } else {

                alert("Error resetting password");

            }

        },

        error: function () {

            alert("Server Error");

        }

    });

}



function showReset() {

    document.getElementById("resetBox").style.display = "block";

}

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


function toggleIcon(iconId, input){

  let icon = document.getElementById(iconId);

  if(input.value.length > 0){

    icon.style.display = "block";

  }
  else{

    icon.style.display = "none";

  }

}