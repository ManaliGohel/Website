$(document).ready(function () {
    $("#dvSPUpdateSuccess").hide();
    $("#dvSPChangePassword").hide();
    fillselDate('selSPMyDetailsDOBDate');
    fillselMonth('selSPMyDetailsDOBMonth');
    fillselYear('selSPMyDetailsDOBYear');
});

function showCustomerBlock() {
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
function myFunction() {
  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
function navMenuSize() {
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
function checkForWindowSize() {
    if (sessionStorage.getItem("keySP") == "MySettingsSP") {
        showServiceProviderMysettings();
        sessionStorage.clear();
    }
    else {
        if (window.outerWidth >= 991) {
            showNewServiceRequests('lnk-new-ser-req');
            setActive('lnk-new-ser-req');
            document.getElementById("hdnActiveMenu").value = "lnk-new-ser-req";
        }
        else {
            showNewServiceRequests('lnk-new-ser-req1');
            setActive('lnk-new-ser-req1');
            document.getElementById("hdnActiveMenu").value = "lnk-new-ser-req1";
        }
    }
}
function showDashboard(id) {
  document.getElementById("dv-dashboard").style.display="block";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="none";
  document.getElementById("dv-block-cus").style.display = "none";
  document.getElementById("dv-mysettings-sp").style.display = "none";
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
  document.getElementById("dv-block-cus").style.display = "none";
  document.getElementById("dv-mysettings-sp").style.display = "none";
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
  document.getElementById("dv-block-cus").style.display = "none";
  document.getElementById("dv-mysettings-sp").style.display = "none";
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
  document.getElementById("dv-block-cus").style.display = "none";
  document.getElementById("dv-mysettings-sp").style.display = "none";
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
  document.getElementById("dv-block-cus").style.display = "none";
  document.getElementById("dv-mysettings-sp").style.display = "none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showMyRatings(id) {
  document.getElementById("dv-dashboard").style.display="none";
  document.getElementById("dv-new-ser-req").style.display="none";
  document.getElementById("dv-upcoming-services").style.display="none";
  document.getElementById("dv-ser-schedule").style.display="none";
  document.getElementById("dv-ser-history").style.display="none";
  document.getElementById("dv-myratings").style.display="block";
  document.getElementById("dv-block-cus").style.display = "none";
  document.getElementById("dv-mysettings-sp").style.display = "none";
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
  document.getElementById("dv-block-cus").style.display = "block";
  document.getElementById("dv-mysettings-sp").style.display = "none";
  document.getElementById("hdnActiveMenu").value=id;
  setActive(id);
}
function showServiceProviderMysettings() {
    document.getElementById("dv-dashboard").style.display = "none";
    document.getElementById("dv-new-ser-req").style.display = "none";
    document.getElementById("dv-upcoming-services").style.display = "none";
    document.getElementById("dv-ser-schedule").style.display = "none";
    document.getElementById("dv-ser-history").style.display = "none";
    document.getElementById("dv-myratings").style.display = "none";
    document.getElementById("dv-block-cus").style.display = "none"; 
    document.getElementById("dv-mysettings-sp").style.display = "block";
    showspMySettingsTb('dvsp-mysettings-mydetails');
    document.getElementById("hdnActiveMenu").value = '';
    setActive('');
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

function checkForCustomerSignup(){
  var fn=document.getElementById("txtFirstName").value.trim().length;
  var ln=document.getElementById("txtLastName").value.trim().length;
  var email=document.getElementById("txtEmail").value.trim().length;
  var mbl=document.getElementById("txtMobile").value.trim().length;
  var pwd=document.getElementById("pwd").value.trim().length;
  var cpwd=document.getElementById("confirmpwd").value.trim().length;
  var privacypolicy=document.getElementById("cbprivacypolicy").checked;
  var reg=document.getElementById("sbmtcusreg");
  if(fn>0 && ln>0 && email>0 && mbl>0 && pwd>0 && cpwd>0 && privacypolicy){
    reg.disabled=false;
    if(reg.classList.contains('btndisable'))
      reg.classList.remove('btndisable');
    reg.classList.add('btnCustomerSignup');
  }
  else{
    reg.disabled=true;
    if(reg.classList.contains('btnCustomerSignup'))
      reg.classList.remove('btnCustomerSignup');
    reg.classList.add('btndisable');
  }
}

function redirectToServiceProviderMysettings() {
    sessionStorage.setItem("keySP", "MySettingsSP");
    window.location.href = "/ServiceProvider/upcomingservice";
}
function showspMySettingsTb(whichtb) {
    var tbs = ["dvsp-mysettings-mydetails", "dvsp-mysettings-changepassword"];
    var activetblnk = ["lnkspMysettingsMydetails", "lnkspMysettingsChangepassword"];
    var activetbimg = ["imgCusMydetails", "imgCusChangepassword"];
    for (var i = 0; i < tbs.length; i++) {
        if (tbs[i] == whichtb) {
            document.getElementById(tbs[i]).style.display = "block";
            document.getElementById(activetblnk[i]).classList.add("cusMySettingstbselected");
            document.getElementById(activetbimg[i]).classList.add("dvcussettingsimg-active");
            document.getElementById(activetblnk[i]).removeAttribute("onmouseover");
            document.getElementById(activetblnk[i]).removeAttribute("onmouseout");
        }
        else {
            document.getElementById(tbs[i]).style.display = "none";
            document.getElementById(activetblnk[i]).classList.remove("cusMySettingstbselected");
            document.getElementById(activetbimg[i]).classList.remove("dvcussettingsimg-active");
            document.getElementById(activetblnk[i]).setAttribute("onmouseover", "onHoverSPSettingsImg('" + activetbimg[i] + "')");
            document.getElementById(activetblnk[i]).setAttribute("onmouseout", "onHoverSPSettingsImg('" + activetbimg[i] + "')");
        }
    }
}
function onHoverSPSettingsImg(id) {
    document.getElementById(id).classList.add("dvcussettingsimg-active");
}
function onHoverOutSPSettingsImg(id) {
    document.getElementById(id).classList.remove("dvcussettingsimg-active");
}
function fillselDate(id) {
    $("#" + id).empty();
    $("#" + id).append('<option value="0" selected>Day</option>');
    for (var i = 1; i <= 31; i++) {
        $("#" + id).append('<option value="' + i + '">' + i + '</option>');
    }
}
function fillselMonth(id) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $("#" + id).empty();
    $("#" + id).append('<option selected value="0">Month</option>');
    for (var i = 0; i < months.length; i++) {
        $("#" + id).append('<option value="' + (i + 1) + '">' + months[i] + '</option>');
    }
}
function fillselYear(id) {
    $("#" + id).empty();
    $("#" + id).append('<option selected value="0">Year</option>');
    for (var i = new Date().getFullYear(); i >= (new Date().getFullYear() - 117); i--) {
        $("#" + id).append('<option value="' + i + '">' + i + '</option>');
    }
}