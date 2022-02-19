/****************              Login             **************************/
function loginUser() {
    document.getElementById("errMsg_loginmodal_email").innerHTML = "";
    var email = document.getElementById("loginmodal_email").value; 
    var password = document.getElementById("loginmodal_password").value; 
    var isremember = document.getElementById("loginmodal_isremember").checked;
    if (emailValidate(email) == false) {
        document.getElementById("errMsg_loginmodal_email").innerHTML = "Enter valid Email Id!!";
    }
    else {
        $.ajax({
            type: "post",
            url: "/Customer/checkForLoginIfUserExistorNot",
            data: { "email": email, "password": password, "isremember": isremember },
            success: function (response) {
                if (response == "1") {
                    window.location.href = '/admin/index';
                }
                else if (response == "2") {
                    window.location.href = '/customer/servicehistory';
                }
                else if (response == "3") {
                    window.location.href = '/serviceprovider/upcomingservice';
                }
                else if (response == "Book Service") {
                    window.location.href = '/customer/bookservice';
                }
                else {
                    document.getElementById("spnLoginMsg").innerHTML = response;
                    document.getElementById("dvLoginMsg").classList.remove("d-none");
                    document.getElementById("dvLoginMsg").classList.add("d-block");
                }
            },
            error: function (response) {
                console.log("loginUser() error: " + response.responseText);
            }
        })
    }    
}
function hideErrMsgofLoginModal() {
    document.getElementById("spnLoginMsg").innerHTML = "";
    document.getElementById("dvLoginMsg").classList.remove("d-block");
    document.getElementById("dvLoginMsg").classList.add("d-none");
}
document.getElementById('loginModal').addEventListener('hidden.bs.modal', function (event) {
    hideErrMsgofLoginModal();
    document.getElementById("loginmodal_email").value = "";
    document.getElementById("errMsg_loginmodal_email").innerHTML = "";
    document.getElementById("loginmodal_password").value = "";
})

/****************              Forgot Password             **************************/
function forgotPassword() {
    document.getElementById("errMsg_passwordmodal_email").innerHTML = "";
    var email = document.getElementById("passwordmodal_email").value;
    if (emailValidate(email) == false) {
        document.getElementById("errMsg_passwordmodal_email").innerHTML = "Enter valid Email Id!!";
    }
    else {
        $.ajax({
            type: "post",
            url: "/Customer/checkForForgotPasswordIfUserExistorNot",
            data: { "email": email },
            success: function (response) {
                if (response) {
                    $('#forgorpasswordModal').modal('hide');
                    Swal.fire({
                        icon: 'success',
                        title: 'Forgot Password',
                        text: 'You will receive an Email with further Instructions on how to Reset your Password!!',
                    });
                }
                else {
                    document.getElementById("spnForgotPwdMsg").innerHTML = "This Email is not Registered!!";
                    document.getElementById("dvForgotPwdMsg").classList.remove("d-none");
                    document.getElementById("dvForgotPwdMsg").classList.add("d-block");
                }
            },
            error: function (response) {
                console.log("forgotPassword() error: " + response.responseText);
            }
        })
    }    
}
function hideErrMsgofForgotPasswordModal() {
    document.getElementById("spnForgotPwdMsg").innerHTML = "";
    document.getElementById("dvForgotPwdMsg").classList.remove("d-block");
    document.getElementById("dvForgotPwdMsg").classList.add("d-none");
}
document.getElementById('forgorpasswordModal').addEventListener('hidden.bs.modal', function (event) {
    hideErrMsgofForgotPasswordModal();
    document.getElementById("passwordmodal_email").value = "";
    document.getElementById("errMsg_passwordmodal_email").innerHTML = "";
})

/********************************************************************/
function emailValidate(email) {
    var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regexEmail.test(email); 
}
function openLoginModalforBS() {
    $.ajax({
        type: "post",
        url: "/BookService/setSessionVarValue",
        data: { "varName": "redirectToBookService", "varValue": "1" },
        success: function () {
            var myLoginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            myLoginModal.show();
        },
        error: function (response) {
            console.log("error openLoginModalforBS(): " + response.responseText);
        }
    })    
}