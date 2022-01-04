function checkForWindowSize(){
    if(window.outerWidth>=991){
      showAdminSerReq('lnkadmin-ser-req');
      setActive('lnkadmin-ser-req');
      document.getElementById("hdnadminActiveMenu").value="lnkadmin-ser-req";
    }
    else{
        showAdminSerReq('lnkadmin-ser-req1');
        setActive('lnkadmin-ser-req1');
        document.getElementById("hdnadminActiveMenu").value="lnkadmin-ser-req1";
    }
}
function navadminMenuSize(){
    var navMenu=document.getElementById("navbarCollapse");
    if(window.outerWidth>=991){
      navMenu.classList.remove("navMenu");
    }
    else{
      navMenu.classList.add("navMenu");
    }
    var hdnval=document.getElementById("hdnadminActiveMenu").value;
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
  var sidebarlinks1 = ['lnkadmin-ser-req1', 'lnkadmin-user-management1'];
  var sidebarlinks2 = ['lnkadmin-ser-req', 'lnkadmin-user-management'];
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
    document.getElementById(links[i]).style.color="#646464";
    document.getElementById(links[i]).style.pointerEvents = "auto";
    document.getElementById(links[i]).onmouseover = function() {ChangeColorBack(this.id)};  
    document.getElementById(links[i]).onmouseout = function() {ChangeColorBack2(this.id)}; 
  }
}
function activateShowLink(linkid){
    document.getElementById(linkid).style.color="#1FB6FF";
    document.getElementById(linkid).style.pointerEvents = "none";
    document.getElementById(linkid).setAttribute("onmouseover", "");
    document.getElementById(linkid).setAttribute("onmouseout", "");
}
function ChangeColorBack(id)
{
  document.getElementById(id).style.color="#1FB6FF";
}
function ChangeColorBack2(id)
{
  document.getElementById(id).style.color="#646464";
}
function showAdminSerReq(id){
    document.getElementById("dvadmin-ser-req").style.display="block";
    document.getElementById("dvadmin-user-management").style.display="none";
    document.getElementById("hdnadminActiveMenu").value=id;
    setActive(id);
}
function showAdminUserManagement(id){
    document.getElementById("dvadmin-ser-req").style.display="none";
    document.getElementById("dvadmin-user-management").style.display="block";
    document.getElementById("hdnadminActiveMenu").value=id;
    setActive(id);
}