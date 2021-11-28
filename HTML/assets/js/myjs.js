function showCustomerBlock(){
	var cus=document.getElementById("dvCustomer");
	var ser=document.getElementById("dvServiceProvider");
	cus.style.display="block";
    ser.style.display="none";
    document.getElementById("dvSlide1").classList.remove("slide2");
    document.getElementById("dvSlide2").classList.remove("slide1");
    document.getElementById("dvSlide1").classList.add("slide1");
    document.getElementById("dvSlide2").classList.add("slide2");
}
function showServiceProviderBlock(){
	var cus=document.getElementById("dvCustomer");
	var ser=document.getElementById("dvServiceProvider");
	ser.style.display="block";
    cus.style.display="none";
    document.getElementById("dvSlide1").classList.remove("slide1");
    document.getElementById("dvSlide2").classList.remove("slide2");
    document.getElementById("dvSlide1").classList.add("slide2");
    document.getElementById("dvSlide2").classList.add("slide1");
}
window.onscroll = function() {myFunction()};
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}