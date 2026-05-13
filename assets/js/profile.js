console.log("NEW PROFILE JS LOADED");

let email = localStorage.getItem("email");

if(!email){
  window.location.href = "login.html";
}

/* ================= LOAD PROFILE ================= */

$.ajax({

  url: "php/profile.php",
  type: "POST",
  data: { email: email },

  success: function(data){

    console.log("PROFILE RESPONSE:", data);

    let res = typeof data === "string" ? JSON.parse(data) : data;

    /* ❌ HANDLE ERRORS SAFELY */
    if(res.error){

      alert(res.error);
      window.location.href = "login.html";
      return;

    }

    $("#email").val(res.email || "");
    $("#emailText").text(res.email || "");
    $("#nameText").text(res.name || "");
    $("#ageText").text(res.age || "");
    $("#dobText").text(res.dob || "");
    $("#contactText").text(res.contact || "");
    $("#addressText").text(res.address || "");
    $("#cityText").text(res.city || "");
    $("#countryText").text(res.country || "");
    $("#pincodeText").text(res.pincode || "");

    $("#name").val(res.name || "");
    $("#age").val(res.age || "");
    $("#dob").val(res.dob || "");
    $("#contact").val(res.contact || "");
    $("#address").val(res.address || "");
    $("#city").val(res.city || "");
    $("#country").val(res.country || "");
    $("#pincode").val(res.pincode || "");

  }

});

/* ================= ENABLE EDIT ================= */

function enableEdit(){    

   $("#emailSection").hide(); 
   $(".edit-field").show();
   $("span[id$='Text']").hide();
   $("#saveBtn").show();
   $("#editBtn").hide();  
}

/* ================= FIXED SAVE FUNCTION ================= */

function updateProfile(){

  $.ajax({

    url: "php/profile.php",
    type: "POST",

    data: {
      update: 1,
      email: $("#email").val(),
      name: $("#name").val(),
      age: $("#age").val(),
      dob: $("#dob").val(),
      contact: $("#contact").val(),
      address: $("#address").val(),
      city: $("#city").val(),
      country: $("#country").val(),
      pincode: $("#pincode").val()
    },

    success: function(data){

      console.log("SERVER:", data);

      if(data.status === "updated"){

        $("#nameText").text($("#name").val());
        $("#ageText").text($("#age").val());
        $("#dobText").text($("#dob").val());
        $("#contactText").text($("#contact").val());
        $("#addressText").text($("#address").val());
        $("#cityText").text($("#city").val());
        $("#countryText").text($("#country").val());
        $("#pincodeText").text($("#pincode").val());

        resetUI();

        alert("Profile Updated");

      } else {
        alert("Update Failed");
      }

    }

  });

}

/* ================= FIXED UI RESET (IMPORTANT) ================= */

function resetUI(){

  $(".edit-field").hide();
  $("span[id$='Text']").show();

  $("#emailSection").show();

  $("#saveBtn").hide();
  $("#editBtn").show();
}

/* ================= LOGOUT ================= */

function logout(){

  $.ajax({

    url: "php/logout.php",
    type: "POST",
    data: { email: email },

    success: function(){

      localStorage.clear();
      window.location.href = "login.html";

    }

  });

}