function checkForAdminWindowSize(){
    if(window.outerWidth>=991){
      showcusSerhistory('lnkcus-serhistory');
      setActive('lnkcus-serhistory');
      document.getElementById("hdncusActiveMenu").value="lnkcus-serhistory";
    }
    else{
      showUpcomingServices('lnkcus-serhistory1');
      setActive('lnkcus-serhistory1');
      document.getElementById("hdncusActiveMenu").value="lnkcus-serhistory1";
    }
}
function navcusMenuSize(){
    var navMenu=document.getElementById("navbarCollapse");
    if(window.outerWidth>=991){
      navMenu.classList.remove("navMenu");
    }
    else{
      navMenu.classList.add("navMenu");
    }
    var hdnval=document.getElementById("hdncusActiveMenu").value;
    if(hdnval.substring(hdnval.length-1,hdnval.length)=='1')  {
      hdnval=hdnval.substring(0,hdnval.length-1);
    }
    else{
      hdnval+='1';
    }
    setActive(hdnval);
}
function setActive(linkid)
{
  var sidebarlinks1 = ['lnkcus-dashboard1', 'lnkcus-serhistory1', 'lnkcus-serschedule1', 'lnkcus-favpros1', 'lnkcus-invoices1', 'lnkcus-notifications1'];
  var sidebarlinks2 = ['lnkcus-dashboard', 'lnkcus-serhistory', 'lnkcus-serschedule', 'lnkcus-favpros', 'lnkcus-invoices', 'lnkcus-notifications'];
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
function showcusDashboard(id){
    document.getElementById("dvcus-dashboard").style.display="block";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display="none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusSerhistory(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="block";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display="none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusSerschedule(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="block";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display="none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusFavpros(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="block";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display="none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusInvoices(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="block";
    document.getElementById("dvcus-notifications").style.display="none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusNotifications(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display="block";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
