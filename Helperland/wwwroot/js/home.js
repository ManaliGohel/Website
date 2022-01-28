var navbar = document.getElementById("navbar");
var offset = navbar.getBoundingClientRect();
var sticky= offset.bottom;
function stickyNavbar(){
  var navlogo = document.getElementById('navlogo');
	if(window.pageYOffset >= sticky)
	{
		navbar.classList.add("sticky");
    navlogo.style.width = "73px";
    navlogo.style.height = "54px";
    document.getElementById('btnBookCleaner').classList.add("stickynavtext");
    document.getElementById('btnLogin').classList.add("stickynavtext");
    document.getElementById('btnBecomeHelper').classList.add("stickynavtext");
	}
	else
  {
		navbar.classList.remove("sticky");
    navlogo.style.width = "175px";
    navlogo.style.height = "130px";
    document.getElementById('btnBookCleaner').classList.remove("stickynavtext");
    document.getElementById('btnLogin').classList.remove("stickynavtext");
    document.getElementById('btnBecomeHelper').classList.remove("stickynavtext");
    setLogoByWinSize();
	}
}
function topnavigation(){
  document.body.scrollTop= document.documentElement.scrollTop=0;
}

document.addEventListener("click", (evt) => {
  const navbar = document.getElementById("navbarCollapse");
  let targetElement = evt.target;
  do {
      if (targetElement == navbar) {
          return;
      }
      targetElement = targetElement.parentNode;
  } while (targetElement);
  $("#navbarCollapse").removeClass("show");
});

function setLogoByWinSize(){
  var navlogo = document.getElementById('navlogo');
  if(window.outerWidth<=991){  
    navlogo.style.width = "73px";
    navlogo.style.height = "54px";
  }
  else{
    navlogo.style.width = "175px";
    navlogo.style.height = "130px";
  }
}

function checkForLoginModal(){
  var loginemail=document.getElementById("loginmodal_email").value.trim().length;
  var loginpassword=document.getElementById("loginmodal_password").value.trim().length;
  var btnlogin=document.getElementById("btnloginmodal");
  if(loginemail>0 && loginpassword>0){
    btnlogin.disabled=false;
    if(btnlogin.classList.contains('btndisable'))
      btnlogin.classList.remove('btndisable');
    btnlogin.classList.add('btnLogin');
  }
  else{
    btnlogin.disabled=true;
    if(btnlogin.classList.contains('btnLogin'))
      btnlogin.classList.remove('btnLogin');
    btnlogin.classList.add('btndisable');
  }
}

function checkForPasswordModal(){
  var passwordemail=document.getElementById("passwordmodal_email").value.trim().length;
  var btnpassword=document.getElementById("btnpasswordmodal");
  if(passwordemail>0){
    btnpassword.disabled=false;
    if(btnpassword.classList.contains('btndisable'))
      btnpassword.classList.remove('btndisable');
    btnpassword.classList.add('btnLogin');
  }
  else{
    btnpassword.disabled=true;
    if(btnpassword.classList.contains('btnLogin'))
      btnpassword.classList.remove('btnLogin');
    btnpassword.classList.add('btndisable');
  }
}

function openLoginModal(){
  $('#loginModal').modal('show');
}