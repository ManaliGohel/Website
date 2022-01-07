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
function countryddclick() {
  var x = window.matchMedia("(max-width: 800px)");
  var z = document.getElementById('navcountry');
  document.querySelector('.nav-button').addEventListener("click", function(){
  this.parentNode.parentNode.classList.toggle('closed');
  if (x.matches)
  {
    z.classList.remove("ddcountry");
    z.classList.add("ddcountry2");
  }
  else
  {
    z.classList.remove("ddcountry2");
    z.classList.add("ddcountry");
  }
    responsiveMenuClick();
  });
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