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
function changeNavColor(){
  var nav=document.getElementById("myHeader");
  var navMenu=document.getElementById("navbarCollapse");
  if(nav.classList.contains("changeNavColor")){
    nav.classList.remove("changeNavColor"); 
    navMenu.classList.remove("navMenu");   
  }
  else{
    nav.classList.add("changeNavColor");
    navMenu.classList.add("navMenu");
  }  
}
function navMenuSize(){
  var navMenu=document.getElementById("navbarCollapse");
  if(window.outerWidth>=991){
    navMenu.classList.remove("navMenu");
  }
  else{
    navMenu.classList.add("navMenu");
  }
  var hdnval=document.getElementById("hdnActiveMenu").value;
  if(hdnval.substring(hdnval.length-1,hdnval.length)=='1')  {
    hdnval=hdnval.substring(0,hdnval.length-1);
  }
  else{
    hdnval+='1';
  }
  setActive(hdnval);
}
function checkForWindowSize(){
  if(window.outerWidth>=991){
    showUpcomingServices('lnk-upcoming-services');
    setActive('lnk-upcoming-services');
    document.getElementById("hdnActiveMenu").value="lnk-upcoming-services";
  }
  else{
    showUpcomingServices('lnk-upcoming-services1');
    setActive('lnk-upcoming-services1');
    document.getElementById("hdnActiveMenu").value="lnk-upcoming-services1";
  }
}
function showDashboard(id){
  document.getElementById("dv-dashboard").style.display="block";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display="none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showNewServiceRequests(id){
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="block";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display="none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showUpcomingServices(id){
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="block";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display="none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showServiceSchedule(id){
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="block";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display="none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showServiceHistory(id){
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="block";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display="none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showMyRatings(id){
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="block";
  document.getElementById("dv-block-cus").style.display="none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showBlockCustomer(id){
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display="block";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}

function setActive(linkid)
{
  var sidebarlinks1 = ['lnk-dashboard1', 'lnk-new-ser-req1', 'lnk-upcoming-services1', 'lnk-ser-schedule1', 'lnk-ser-history1', 'lnk-myratings1', 'lnk-block-cus1'];
  var sidebarlinks2 = ['lnk-dashboard', 'lnk-new-ser-req', 'lnk-upcoming-services', 'lnk-ser-schedule', 'lnk-ser-history', 'lnk-myratings', 'lnk-block-cus'];
  giveHoverEffectToLinks(sidebarlinks1);
  giveHoverEffectToLinks(sidebarlinks2);
  activateShowLink(linkid);
  if(linkid.includes(1))
    linkid=linkid.substring(0,linkid.length-1);
  else
    linkid+='1';
  activateShowLink(linkid);
}
function giveHoverEffectToLinks(links){
  for(i=0;i<links.length;i++)
  { 
    document.getElementById(links[i]).style.backgroundColor="#1d7a8c";
    document.getElementById(links[i]).style.pointerEvents = "auto";
    document.getElementById(links[i]).onmouseover = function() {ChangeColorBack(this.id)};  
    document.getElementById(links[i]).onmouseout = function() {ChangeColorBack2(this.id)}; 
  }
}
function activateShowLink(linkid){
    document.getElementById(linkid).style.backgroundColor="#146371";
    document.getElementById(linkid).style.pointerEvents = "none";
    document.getElementById(linkid).setAttribute("onmouseover", "");
    document.getElementById(linkid).setAttribute("onmouseout", "");
}
function ChangeColorBack(id)
{
  document.getElementById(id).style.backgroundColor="#146371";
}
function ChangeColorBack2(id)
{
  document.getElementById(id).style.backgroundColor="#1d7a8c";
}

function changeNavColorAdmin(){
  alert("hello")
  var nav=document.getElementById("myHeader");
  var navMenu=document.getElementById("navbarCollapse");
  if(nav.classList.contains("changeNavColorAdmin")){
    nav.classList.remove("changeNavColorAdmin"); 
    navMenu.classList.remove("navMenu");   
  }
  else{
    nav.classList.add("changeNavColorAdmin");
    navMenu.classList.add("navMenu");
  }  
}