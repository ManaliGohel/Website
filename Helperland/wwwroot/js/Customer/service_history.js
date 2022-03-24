$(document).ready(function () {
    getCustomerDashboardData();
    getCustomerServiceHistoryData();
    $("#dvCusUpdateSuccess").hide(); 
    $("#dvCusChangePassword").hide();
    fillselDate('selcusMyDetailsDOBDate');
    fillselMonth('selcusMyDetailsDOBMonth');
    fillselYear('selcusMyDetailsDOBYear');
});

function checkForAdminWindowSize() {
    if (sessionStorage.getItem("key") == "MySettings") {
        showcusMysettings();
        sessionStorage.clear();
    }
    else {
        if (window.outerWidth >= 991) {
            showcusDashboard('lnkcus-dashboard');
            setActive('lnkcus-dashboard');
            document.getElementById("hdncusActiveMenu").value = "lnkcus-dashboard";
        }
        else {
            showUpcomingServices('lnkcus-dashboard1');
            setActive('lnkcus-dashboard1');
            document.getElementById("hdncusActiveMenu").value = "lnkcus-dashboard1";
        }
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
    document.getElementById("dvcus-notifications").style.display = "none";
    document.getElementById("dvcus-mysettings").style.display = "none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusSerhistory(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="block";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display = "none";
    document.getElementById("dvcus-mysettings").style.display = "none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusSerschedule(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="block";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display = "none";
    document.getElementById("dvcus-mysettings").style.display = "none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusFavpros(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="block";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display = "none";
    document.getElementById("dvcus-mysettings").style.display = "none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusInvoices(id) {
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="block";
    document.getElementById("dvcus-notifications").style.display = "none";
    document.getElementById("dvcus-mysettings").style.display = "none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusNotifications(id){
    document.getElementById("dvcus-dashboard").style.display="none";
    document.getElementById("dvcus-serhistory").style.display="none";
    document.getElementById("dvcus-serschedule").style.display="none";
    document.getElementById("dvcus-favpros").style.display="none";
    document.getElementById("dvcus-invoices").style.display="none";
    document.getElementById("dvcus-notifications").style.display = "block";
    document.getElementById("dvcus-mysettings").style.display = "none";
    document.getElementById("hdncusActiveMenu").value=id;
    setActive(id);
}
function showcusMysettings() {    
    document.getElementById("dvcus-dashboard").style.display = "none";
    document.getElementById("dvcus-serhistory").style.display = "none";
    document.getElementById("dvcus-serschedule").style.display = "none";
    document.getElementById("dvcus-favpros").style.display = "none";
    document.getElementById("dvcus-invoices").style.display = "none";
    document.getElementById("dvcus-notifications").style.display = "none";
    document.getElementById("dvcus-mysettings").style.display = "block";
    showcusMySettingsTb('dvcus-mysettings-mydetails');
    document.getElementById("hdncusActiveMenu").value = '';    
    showUserMyDetails();
    displayLoggedinUserAddresses();
    setActive('');    
}

function showcusMySettingsTb(whichtb) {
    var tbs = ["dvcus-mysettings-mydetails", "dvcus-mysettings-myaddresses", "dvcus-mysettings-changepassword"];
    var activetblnk = ["lnkcusMysettingsMydetails", "lnkcusMysettingsMyaddresses", "lnkcusMysettingsChangepassword"];
    var activetbimg = ["imgCusMydetails", "imgCusMyaddresses", "imgCusChangepassword"];
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
            document.getElementById(activetblnk[i]).setAttribute("onmouseover", "onHoverCusSettingsImg('" + activetbimg[i] + "')");
            document.getElementById(activetblnk[i]).setAttribute("onmouseout", "onHoverOutCusSettingsImg('" + activetbimg[i] + "')");
        }
    }
}
function onHoverCusSettingsImg(id) {
    document.getElementById(id).classList.add("dvcussettingsimg-active");
}
function onHoverOutCusSettingsImg(id) {
    document.getElementById(id).classList.remove("dvcussettingsimg-active");
}

function openDeleteUserAddressModal(addressid) {
    document.getElementById("hdnDeleteCustomerAddressId").value = addressid;
    var deleteUserAddressModal = new bootstrap.Modal(document.getElementById('deleteuseraddressModal'));
    deleteUserAddressModal.show();
}
function validateAddEditUserAddressModal() {
    if (document.getElementById("txtStreetnameMdladdedit").value.length > 0 && document.getElementById("txtHomenumberMdladdedit").value.length > 0 && document.getElementById("txtPostalcodeMdladdedit").value.length > 0 && document.getElementById("txtMobilenumberMdladdedit").value.length > 0) {
        document.getElementById("btnaddedituseraddressModal").classList.remove("btndisable");
        document.getElementById("btnaddedituseraddressModal").disabled = false;
    }
    else {
        document.getElementById("btnaddedituseraddressModal").classList.add("btndisable");
        document.getElementById("btnaddedituseraddressModal").disabled = true;
    }
}
function addEditUserAddress() {
    var count = 0;
    if (document.getElementById("txtPostalcodeMdladdedit").value.length < 6) {
        document.getElementById("spnPostalcodeMdladdedit").innerHTML = "Enter valid Postal code!!";
        count--;
    }
    else {   
        document.getElementById("spnPostalcodeMdladdedit").innerHTML = "";
        count++;
    }
    if (document.getElementById("txtMobilenumberMdladdedit").value.length < 10) {
        document.getElementById("spnMobilenumberMdladdedit").innerHTML = "Enter valid Mobile number!!";
        count--;
    }
    else {
        document.getElementById("spnMobilenumberMdladdedit").innerHTML = "";
        count++;
    }
    if (count == 2) {
        var data = {            
            addressLine1: document.getElementById("txtStreetnameMdladdedit").value.trim(),
            addressLine2: document.getElementById("txtHomenumberMdladdedit").value.trim(),
            city: document.getElementById("selCityCusMysettingsMdl").options[document.getElementById("selCityCusMysettingsMdl").selectedIndex].text,
            state: document.getElementById("selCityCusMysettingsMdl").value,
            postalCode: document.getElementById("txtPostalcodeMdladdedit").value.trim(),
            mobile: document.getElementById("txtMobilenumberMdladdedit").value.trim()
        };
        if (document.getElementById("hdnCustomerEditAddressId").value == "") {
            $("#dvLoader").addClass("is-active");
            $.ajax({
                type: "post",
                dataType: "JSON",
                data: JSON.stringify(data),
                contentType: "application/json",
                url: "/BookService/addNewAddress",
                success: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    if (response > 0) {
                        $("#addedituseraddressModal").modal('hide');
                        displayLoggedinUserAddresses();
                        clearAddEditCusAddressModal();
                    }
                },
                error: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    console.log("service_history.js->addEditUserAddress->addAddress error: " + response.responseText);
                }
            })    
        }
        else {
            data.addressId = parseInt(document.getElementById("hdnCustomerEditAddressId").value);
            $("#dvLoader").addClass("is-active");
            $.ajax({
                type: "post",
                dataType: "JSON",
                data: JSON.stringify(data),
                contentType: "application/json",
                url: "/CustomerMySettings/updateCustomerAddress",
                success: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    if (response > 0) {
                        $("#addedituseraddressModal").modal('hide');
                        displayLoggedinUserAddresses();
                        clearAddEditCusAddressModal();
                    }
                },
                error: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    console.log("service_history.js->addEditUserAddress->editAddress error: " + response.responseText);
                }
            });
        }
    }
}
function validateNewPassword() {
    document.getElementById("txtnewpwdUserchangepwd").removeAttribute("onfocusout");
    document.getElementById("txtnewpwdUserchangepwd").setAttribute("onkeyup", "validateNewPassword()");
    if (document.getElementById("txtnewpwdUserchangepwd").value.trim().length > 0) {
        if (document.getElementById("txtnewpwdUserchangepwd").value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,14}$/) != null) {
            document.getElementById("spnnewpwdUserchangepwd").innerHTML = "";
            validateConfirmNewPassword();
            validateOldPassword();
        }
        else {
            document.getElementById("spnnewpwdUserchangepwd").innerHTML = "Password must be 6 to 14 Characters long, must contain at least one Upper case, one Lower case, one Digit and one Special character!";
            disableCustomerChangePasswordbtn();
        }
    }
    else {
        disableCustomerChangePasswordbtn();
        document.getElementById("spnnewpwdUserchangepwd").innerHTML = "Enter new password!";
    }    
}
function validateConfirmNewPassword() {
    document.getElementById("txtconfirmnewpwdUserchangepwd").removeAttribute("onfocusout");
    document.getElementById("txtconfirmnewpwdUserchangepwd").setAttribute("onkeyup", "validateConfirmNewPassword()");
    if (document.getElementById("txtconfirmnewpwdUserchangepwd").value.trim().length > 0) {
        if (document.getElementById("txtconfirmnewpwdUserchangepwd").value == document.getElementById("txtnewpwdUserchangepwd").value) {
            document.getElementById("spnconfirmnewpwdUserchangepwd").innerHTML = "";
            validateOldPassword();
        }
        else {
            document.getElementById("spnconfirmnewpwdUserchangepwd").innerHTML = "Password and Confirm password must be same!";
            disableCustomerChangePasswordbtn();
        }
    }
    else {
        disableCustomerChangePasswordbtn();
        document.getElementById("spnconfirmnewpwdUserchangepwd").innerHTML = "Enter confirm password!";
    }
}
function validateOldPassword() {
    document.getElementById("txtoldpwdUserchangepwd").setAttribute("onkeyup", "validateOldPassword()");
    if (document.getElementById("txtoldpwdUserchangepwd").value.trim().length > 0 && document.getElementById("txtnewpwdUserchangepwd").value.trim().length > 0 && document.getElementById("txtconfirmnewpwdUserchangepwd").value.trim().length > 0 && document.getElementById("spnnewpwdUserchangepwd").innerHTML.trim().length == 0 && document.getElementById("spnconfirmnewpwdUserchangepwd").innerHTML.trim().length == 0) {
        document.getElementById("btnCusChangepassword").classList.remove("btnContinueSetupSerProcDisable");
        document.getElementById("btnCusChangepassword").disabled = false;
    }
    else {
        disableCustomerChangePasswordbtn();
    }
}
function disableCustomerChangePasswordbtn() {
    document.getElementById("btnCusChangepassword").classList.add("btnContinueSetupSerProcDisable");
    document.getElementById("btnCusChangepassword").disabled = true;
}
function changeCusPassword() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        url: "/CustomerMySettings/checkUserPassword",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            document.getElementById("spnoldpwdUserchangepwd").innerHTML = "";
            if (response.password == document.getElementById("txtoldpwdUserchangepwd").value) {
                updateUserPassword();                
            }
            else {
                document.getElementById("spnoldpwdUserchangepwd").innerHTML = "Incorrect old password!";
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->changeCusPassword error: " + response.responseText);
        }
    });
}
function updateUserPassword() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: { "password": document.getElementById("txtnewpwdUserchangepwd").value.trim() },
        url: "/CustomerMySettings/updateUserPassword",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                clearChangePasswordTab();
                $("#dvCusChangePassword").fadeTo(2000, 500).slideUp(500, function () {
                    $("#dvCusChangePassword").slideUp(500);
                });
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->updateUserPassword error: " + response.responseText);
        }
    });
}

function showUserMyDetails() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/CustomerMySettings/getLoggedinUserData",
        dataType: "JSON",
        contentType: "application/json",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            document.getElementById("txtFirstnameCusMydetails").value = data.firstName;
            document.getElementById("txtLastnameCusMydetails").value = data.lastName;
            document.getElementById("txtEmailCusMydetails").value = data.email;
            document.getElementById("txtMobileCusMydetails").value = data.mobile;
            if (data.dateOfBirth != null) {
                document.getElementById("selcusMyDetailsDOBDate").value = (new Date(data.dateOfBirth).getDate());
                document.getElementById("selcusMyDetailsDOBMonth").value = (new Date(data.dateOfBirth).getMonth() + 1);
                document.getElementById("selcusMyDetailsDOBYear").value = (new Date(data.dateOfBirth).getFullYear());
            }
            if (data.languageId != null) {
                document.getElementById("selcusMyDetailsPreferredLanguage").value = data.languageId;
            }
            validateCustomerMydetails();
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->showUserMyDetails error: " + response.responseText);
        }
    });
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
    for (var i = new Date().getFullYear(); i >= (new Date().getFullYear()-117); i--) {        
        $("#" + id).append('<option value="' + i + '">' + i + '</option>');
    }
}

function validateCustomerMydetails() {
    if (document.getElementById("txtFirstnameCusMydetails").value.trim().length > 0 && document.getElementById("txtLastnameCusMydetails").value.trim().length > 0 && document.getElementById("txtMobileCusMydetails").value.trim().length > 0 && parseInt(document.getElementById('selcusMyDetailsDOBDate').value) > 0 && parseInt(document.getElementById('selcusMyDetailsDOBMonth').value) > 0 && parseInt(document.getElementById('selcusMyDetailsDOBYear').value) > 0) {
        document.getElementById("btnsaveCustomerDetails").classList.remove("btnContinueSetupSerProcDisable");
        document.getElementById("btnsaveCustomerDetails").disabled = false;
        document.getElementById("spnFirstnameCusMydetails").innerHTML = "";
        document.getElementById("spnLastnameCusMydetails").innerHTML = "";
        document.getElementById("spnMobileCusMydetails").innerHTML = "";
        if (dateCheck(parseInt(document.getElementById('selcusMyDetailsDOBYear').value), parseInt(document.getElementById('selcusMyDetailsDOBMonth').value), parseInt(document.getElementById('selcusMyDetailsDOBDate').value))) {
            document.getElementById("spnDOBCusMydetails").innerHTML = "";
        }
        else {
            document.getElementById("spnDOBCusMydetails").innerHTML = "Enter valid Date of Birth!";
        }
    }
    else {
        if (document.getElementById("txtFirstnameCusMydetails").value.trim().length > 0) {
            document.getElementById("spnFirstnameCusMydetails").innerHTML = "";
        }
        else {
            document.getElementById("spnFirstnameCusMydetails").innerHTML = "Enter First name!";
        }
        if (document.getElementById("txtLastnameCusMydetails").value.trim().length > 0) {
            document.getElementById("spnLastnameCusMydetails").innerHTML = "";
        }
        else {
            document.getElementById("spnLastnameCusMydetails").innerHTML = "Enter Last name!"; 
        }
        if (document.getElementById("txtMobileCusMydetails").value.trim().length > 0) {
            document.getElementById("spnMobileCusMydetails").innerHTML = "";
        }
        else {
            document.getElementById("spnMobileCusMydetails").innerHTML = "Enter Mobile number!"; 
        }
        if (parseInt(document.getElementById('selcusMyDetailsDOBDate').value) > 0 && parseInt(document.getElementById('selcusMyDetailsDOBMonth').value) > 0 && parseInt(document.getElementById('selcusMyDetailsDOBYear').value) > 0) {
            if (dateCheck(parseInt(document.getElementById('selcusMyDetailsDOBYear').value), parseInt(document.getElementById('selcusMyDetailsDOBMonth').value), parseInt(document.getElementById('selcusMyDetailsDOBDate').value))) {
                document.getElementById("spnDOBCusMydetails").innerHTML = "";
            }
            else {
                document.getElementById("spnDOBCusMydetails").innerHTML = "Enter valid Date of Birth!";
            }
        }
        else {
            document.getElementById("spnDOBCusMydetails").innerHTML = "Enter Date of Birth!";
        }
        document.getElementById("btnsaveCustomerDetails").classList.add("btnContinueSetupSerProcDisable");
        document.getElementById("btnsaveCustomerDetails").disabled = true;
    }
}
function dateCheck(year, month, day) {
    var d = new Date(year + "-" + AppendZero(month) + "-" + AppendZero(day));
    if (d.getFullYear().toString() == year && (d.getMonth() + 1).toString() == month && d.getDate().toString() == day) {
        return true;
    }
    return false;
}
function saveCustomerDetails() {
    if (document.getElementById("txtMobileCusMydetails").value.trim().length < 10) {
        document.getElementById("spnMobileCusMydetails").innerHTML = "Enter valid Mobile number!";
    }
    else {        
        document.getElementById("spnMobileCusMydetails").innerHTML = "";
        if (document.getElementById("spnDOBCusMydetails").innerHTML == "") {
            var data = {
                FirstName: document.getElementById("txtFirstnameCusMydetails").value.trim(),
                LastName: document.getElementById("txtLastnameCusMydetails").value.trim(),
                Mobile: document.getElementById("txtMobileCusMydetails").value.trim(),
                Date: parseInt(document.getElementById("selcusMyDetailsDOBDate").value),
                Month: parseInt(document.getElementById("selcusMyDetailsDOBMonth").value),
                Year: parseInt(document.getElementById("selcusMyDetailsDOBYear").value),
                LanguageId: parseInt(document.getElementById("selcusMyDetailsPreferredLanguage").value)
            };
            $("#dvLoader").addClass("is-active");
            $.ajax({
                type: "post",
                dataType: "JSON",
                data: JSON.stringify(data),
                contentType: "application/json",
                url: "/CustomerMySettings/updateCustomerDetails",
                success: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    $("#dvCusUpdateSuccess").fadeTo(2000, 500).slideUp(500, function () {
                        $("#dvCusUpdateSuccess").slideUp(500);
                    });
                },
                error: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    console.log("service_history.js->saveCustomerDetails error: " + response.responseText);
                }
            });
        }           
    }
}

function displayLoggedinUserAddresses() {
    document.getElementById("dvUserAddresses").innerHTML = "";
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/CustomerMySettings/getLoggedinUserAddresses",
        dataType: "json",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            if (data == "") {
                document.getElementById("dvUserAddresses").innerHTML = "<div class='addhead py-2 px-4 fw-bold'>You have no address added yet!</div>";
            }
            else {
                document.getElementById("dvUserAddresses").innerHTML = "<div class='addhead py-2 px-4 fw-bold'><div class='float-start'>Addresses</div><div class='float-end'>Action</div></div>";
                $.each(data, function (i, v) {
                    document.getElementById("dvUserAddresses").innerHTML += "<div class='dvaddresses py-3 px-4'><div class='flts'><div><span class='fw-bold'>Addresses: </span>" + v.addressLine1 + " " + v.addressLine2 + ", " + v.city + " " + v.postalCode + "</div><div><span class='fw-bold'>Phone number: </span>" + v.mobile + "</div></div><div class='flte mt-2'><div class='dvimg'><img src='../../images/service-history/edit-icon.png' onclick='openAddEditUserAddressModal(" + v.addressId + ", " + v.postalCode + ");' /></div><div class='dvimg'><img src='../../images/service-history/delete-icon.png' onclick='openDeleteUserAddressModal(" + v.addressId + ");' /></div></div></div>";
                })
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->displayLoggedinUserAddresses error: " + response.responseText);
        }
    });
}
function openAddEditUserAddressModal(addressid, postalcode) {
    clearAddEditCusAddressModal();
    if (addressid != "" && postalcode.toString() != "") {
        document.getElementById("spnAddEditCusAddressTitle").innerHTML = "Edit";
        document.getElementById("spnAddEditCusAddressBtntext").innerHTML = "Edit";
        document.getElementById("hdnCustomerEditAddressId").value = addressid;
        fillCitiesByPostalcode(postalcode);
        showAddresstoEditModal(addressid);
    }
    else {
        document.getElementById("spnAddEditCusAddressTitle").innerHTML = "Add";
        document.getElementById("spnAddEditCusAddressBtntext").innerHTML = "Add";
    }
    var addEditUserAddressModal = new bootstrap.Modal(document.getElementById('addedituseraddressModal'));
    addEditUserAddressModal.show();
}
function fillCitiesByPostalcode(postalcode) {
    if (postalcode.toString().trim().length >= 6) {
        $("#dvLoader").addClass("is-active");
        $.ajax({
            type: 'get',
            url: "/BookService/getAllCitiesByPostalCode",
            data: { "postalcode": postalcode },
            success: function (data) {
                $("#dvLoader").removeClass("is-active");
                if (data.length > 0) {
                    document.getElementById("spnPostalcodeMdladdedit").innerHTML = "";
                    document.getElementById("txtPostalcodeMdladdedit").value = postalcode;
                    $('#selCityCusMysettingsMdl').empty();
                    var count = 0;
                    $.each(data, function (i, v) {
                        if (count == 0) {
                            $('#selCityCusMysettingsMdl').append('<option value="' + v.state + '" selected>' + v.city + '</option>');
                            count++;
                        }
                        else {
                            $('#selCityCusMysettingsMdl').append('<option value="' + v.state + '">' + v.city + '</option>');
                        }
                    });
                    document.getElementById("btnaddedituseraddressModal").classList.remove("btndisable");
                    document.getElementById("btnaddedituseraddressModal").disabled = false;
                    validateAddEditUserAddressModal();
                }
                else {
                    $('#selCityCusMysettingsMdl').empty();
                    document.getElementById("spnPostalcodeMdladdedit").innerHTML = "This postal code is not available with us!!";
                    document.getElementById("btnaddedituseraddressModal").classList.add("btndisable");
                    document.getElementById("btnaddedituseraddressModal").disabled = true;
                }
            },
            error: function (response) {
                $("#dvLoader").removeClass("is-active");
                console.log("service_history.js->fillCitiesByPostalcode error: " + response.responseText);
            }
        });
    }
    else {
        $('#selCityCusMysettingsMdl').empty();
        document.getElementById("spnPostalcodeMdladdedit").innerHTML = "";
        document.getElementById("btnaddedituseraddressModal").classList.add("btndisable");
        document.getElementById("btnaddedituseraddressModal").disabled = true;
    }
}
function showAddresstoEditModal(addressid) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: 'get',
        url: "/CustomerMySettings/getAddressByAddressId",
        data: { "addressid": addressid },
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            document.getElementById("txtStreetnameMdladdedit").value = data.addressLine1;
            document.getElementById("txtHomenumberMdladdedit").value = data.addressLine2;
            document.getElementById("txtMobilenumberMdladdedit").value = data.mobile;
            for (var i = 0; i < document.getElementById("selCityCusMysettingsMdl").options.length; i++) {
                if (document.getElementById("selCityCusMysettingsMdl").options[i].text == data.city) {
                    document.getElementById("selCityCusMysettingsMdl").selectedIndex = i;
                    break;
                }
            }
            document.getElementById("btnaddedituseraddressModal").classList.remove("btndisable");
            document.getElementById("btnaddedituseraddressModal").disabled = false;
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->showAddresstoEditModal error: " + response.responseText);
        }
    });
}

function clearAddEditCusAddressModal() {
    document.getElementById("txtPostalcodeMdladdedit").value = "";
    $('#selCityCusMysettingsMdl').empty();
    document.getElementById("txtStreetnameMdladdedit").value = "";
    document.getElementById("txtHomenumberMdladdedit").value = "";
    document.getElementById("txtMobilenumberMdladdedit").value = "";
    document.getElementById("hdnCustomerEditAddressId").value = "";
    document.getElementById("btnaddedituseraddressModal").classList.add("btndisable");
    document.getElementById("btnaddedituseraddressModal").disabled = true;
    document.getElementById("spnAddEditCusAddressTitle").innerHTML = "";
    document.getElementById("spnaddedituseraddressModalMsg").innerHTML = "";
    document.getElementById("spnPostalcodeMdladdedit").innerHTML = ""; 
    document.getElementById("spnMobilenumberMdladdedit").innerHTML = "";
}
function deleteCustomerAddress() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: { "addressid": parseInt(document.getElementById("hdnDeleteCustomerAddressId").value) },
        url: "/CustomerMySettings/deleteCustomerAddress",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                $("#deleteuseraddressModal").modal('hide');
                displayLoggedinUserAddresses();
                document.getElementById("hdnDeleteCustomerAddressId").value = "";
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->deleteCustomerAddress error: " + response.responseText);
        }
    });   
}
function clearChangePasswordTab() {
    document.getElementById("txtoldpwdUserchangepwd").value = "";
    document.getElementById("txtnewpwdUserchangepwd").value = "";
    document.getElementById("txtconfirmnewpwdUserchangepwd").value = "";
    document.getElementById("spnoldpwdUserchangepwd").innerHTML = "";
    document.getElementById("spnnewpwdUserchangepwd").innerHTML = "";
    document.getElementById("spnconfirmnewpwdUserchangepwd").innerHTML = "";
    disableCustomerChangePasswordbtn();
}

function redirectToCustomerMysettings() {
    sessionStorage.setItem("key", "MySettings");
    window.location.href = "/customer/servicehistory";
}

function getCustomerDashboardData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/CustomerMySettings/getCustomerDashboardData",
        dataType: "json",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var countForNoServiceRequestAvailable = 0;
            if (data.length == 1) {
                $.each(data, function (i, v) {
                    if (v.serviceRequestId == null) {
                        countForNoServiceRequestAvailable = 0;
                    }
                    else {
                        countForNoServiceRequestAvailable++;
                    }
                })
            }
            else {
                countForNoServiceRequestAvailable++;
            }
            var tblcusDashboard = $('#tblcusDashboard').DataTable();
            tblcusDashboard.clear().draw();
            if (countForNoServiceRequestAvailable > 0) {   
                for (var i = 0; i < data.length; i++) {
                    var serStartDate = new Date(data[i].serviceDateTime).toLocaleDateString('en-GB');
                    var serStartTime = new Date(data[i].serviceDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    var serEndTime = new Date(data[i].serviceDateTime).getHours() + data[i].serviceHours;
                    serEndTime = getServiceEndTime(serStartTime, serEndTime);
                    var serProviderName = "";
                    var serProviderProfile = "";
                    var spRate = 0;
                    var serProviderRateImages = "";
                    if (data[i].serviceProviderId != null) {
                        serProviderName = data[i].serviceProviderName;
                        serProviderProfile = "<img src='../../images/service-history/imghatprofile.png'>";
                        if (data[i].spRate.length > 0) {
                            for (var j = 0; j < data[i].spRate.length; j++) {
                                spRate += data[i].spRate[j];
                            }
                            spRate = (spRate / data[i].spRate.length).toFixed(1);
                            serProviderRateImages = getSPRateImages(spRate);
                        }
                        tblcusDashboard.row.add([
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 1 + ");' class='onHover'>" + data[i].serviceRequestId + "</div>",
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 1 + ");' class='onHover'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                            "<div class='media-object'><div class='float-start dvProimgContainer d-flex justify-content-center align-items-center me-2'>" + serProviderProfile + "</div><div><label>" + serProviderName + "</label><div class='d-flex align-items-center'>" + serProviderRateImages + "<label class='ps-2'>" + spRate + "</label></div></div></div>",
                            "<label class='spnEuro'>&euro;&nbsp;" + data[i].payment + "</label>",
                            "<a href='#' class='btnratesp px-3 py-2 me-1' onclick='rescheduleServiceRequest(" + data[i].serviceRequestId + "," + "\"" + " " + data[i].serviceDateTime + "" + "\"" + ", " + data[i].serviceHours + ", " + data[i].serviceProviderId + " );'>Reschedule</a><a href='#' class='btnCancelService px-3 py-2' onclick='deleteServiceRequest(" + data[i].serviceRequestId + ");'>Cancel</a>"
                        ]).draw(false);
                    }
                    else {
                        tblcusDashboard.row.add([
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 1 + ");' class='onHover'>" + data[i].serviceRequestId + "</div>",
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 1 + ");' class='onHover'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                            "",
                            "<label class='spnEuro'>&euro;&nbsp;" + data[i].payment + "</label>",
                            "<a href='#' class='btnratesp px-3 py-2 me-1' onclick='rescheduleServiceRequest(" + data[i].serviceRequestId + "," + "\"" + " " + data[i].serviceDateTime + "" + "\"" + ", " + data[i].serviceHours + ", " + data[i].serviceProviderId + " );'>Reschedule</a><a href='#' class='btnCancelService px-3 py-2' onclick='deleteServiceRequest(" + data[i].serviceRequestId + ");'>Cancel</a>"
                        ]).draw(false);
                    }
                } 
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->getCustomerDashboardData error: " + response.responseText);
        }
    });
}
function getServiceEndTime(serStartTime, serEndTime) {
    if (serStartTime.includes(":30")) {
        serEndTime += 0.5;
    }
    if (serEndTime.toString().includes(".5")) {
        serEndTime = serEndTime.toString().split(".")[0] + ":30";
    }
    else {
        serEndTime = serEndTime + ":00";
    }
    return serEndTime;
}
function getSPRateImages(spRate) {
    var serProviderRateImages = "";
    if (spRate.toString().includes('.')) {
        var decimalRateStarCount = 0;
        for (var m = 0; m < parseInt(spRate.toString().split('.')[0]); m++) {
            decimalRateStarCount++;
            serProviderRateImages += "<img src='../../images/service-history/yellowstar.png' class='spRateImage'>";
        }
        if (parseInt(spRate.toString().split('.')[1]) == 1) {
            decimalRateStarCount++;
            serProviderRateImages += "<img src='../../images/service-history/greystar.png' class='spRateImage'>";
        }
        else if (parseInt(spRate.toString().split('.')[1]) == 2 || parseInt(spRate.toString().split('.')[1]) == 3) {
            decimalRateStarCount++;
            serProviderRateImages += "<img src='../../images/service-history/Yellow25PNG.png' class='spRateImage'>";
        }
        else if (parseInt(spRate.toString().split('.')[1]) == 4 || parseInt(spRate.toString().split('.')[1]) == 5 || parseInt(spRate.toString().split('.')[1]) == 6) {
            decimalRateStarCount++;
            serProviderRateImages += "<img src='../../images/service-history/Yellow50PNG.png' class='spRateImage'>";
        }
        else if (parseInt(spRate.toString().split('.')[1]) == 7 || parseInt(spRate.toString().split('.')[1]) == 8) {
            decimalRateStarCount++;
            serProviderRateImages += "<img src='../../images/service-history/Yellow75PNG.png' class='spRateImage'>";
        }
        else if (parseInt(spRate.toString().split('.')[1]) == 9) {
            decimalRateStarCount++;
            serProviderRateImages += "<img src='../../images/service-history/yellowstar.png' class='spRateImage'>";
        }
        for (var n = 0; n < (5 - decimalRateStarCount); n++) {
            serProviderRateImages += "<img src='../../images/service-history/greystar.png' class='spRateImage'>";
        }
    }
    else {
        for (var k = 0; k < spRate; k++) {
            serProviderRateImages += "<img src='../../images/service-history/yellowstar.png' class='spRateImage'>";
        }
        for (var l = 0; l < (5 - spRate); l++) {
            serProviderRateImages += "<img src='../../images/service-history/greystar.png' class='spRateImage'>";
        }
    }
    return serProviderRateImages;
}

function showServiceRequestDetails(serviceRequestId, withRescheduleDelete) { 
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/CustomerMySettings/getServiceRequestDetails",
        data: { "servicerequestid": serviceRequestId },
        dataType: "json",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var str = "";
            $.each(data, function (i, v) {
                str += "<div class='fw-bold fs2'>" + new Date(v.serviceStartDateTime).toLocaleDateString('en-GB') + " " + new Date(v.serviceStartDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + "-" + getServiceEndTime(new Date(v.serviceStartDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), new Date(v.serviceStartDateTime).getHours() + v.serviceDuration) + "</div>";
                str += "<div><span class='fw-bold'>Duration: </span>" + v.serviceDuration + " Hrs</div>";
                str += "<hr/>";
                str += "<div><span class='fw-bold'>Service Id: </span>" + serviceRequestId + "</div>";
                if (v.extraServicesId.length > 0) {
                    str += "<div class='fw-bold'>Extras:</div>"
                    for (var j = 0; j < v.extraServicesId.length; j++) {
                        str += "<div>" + enumExtraServices[v.extraServicesId[j]] + "</div>";
                    } 
                } 
                str += "<div class='fw-bold'>Net Amount: <span class='dv-percleaning fs3'>" + v.serviceNetAmount + "&nbsp;&euro;</span></div>";
                str += "<hr/>";
                str += "<div><span class='fw-bold'>Service Address: </span>" + v.addressLine1 + " " + v.addressLine2 + ", " + v.postalcode + " " + v.city + " " + v.state + "</div>";
                str += "<div><span class='fw-bold'>Billing Address: </span>Same as cleaning Address</div>";
                str += "<div><span class='fw-bold'>Phone: </span>" + v.mobile+"</div>";
                str += "<div><span class='fw-bold'>Email: </span>" + v.email + "</div>";
                str += "<hr/>";
                str += "<div class='fw-bold mb-1'>Comments</div>";
                if (v.hasPets) {
                    str += "<div class='d-flex justify-align-center align-items-center'><img src='../../images/service-history/included.png' class='me-2' />I do have pets at home</div>";
                }
                else {
                    str += "<div class='d-flex justify-align-center align-items-center'><img src='../../images/service-history/not-included.png' class='me-2' />I don't have pets at home</div>";
                }           
                if (withRescheduleDelete == 1) {  
                    str += "<hr/>"; 
                    str += "<div><button class='btnratesp px-3 py-2 me-1' onclick='rescheduleServiceRequest(" + serviceRequestId + ", " + "\"" + " " + v.serviceStartDateTime + "" + "\"" + ", " + v.serviceDuration + ", " + v.serviceProviderId + "  )'><span class='d-flex justify-align-center align-items-center'><img class='me-2' src='../../images/service-history/reschedule-icon-small.png' />Reschedule<span></button>";
                    str += "<button class='btnCancelService px-3 py-2' onclick='deleteServiceRequest(" + serviceRequestId + ")'><span class='d-flex justify-align-center align-items-center'><img class='me-2' src='../../images/service-history/close-icon-small.png' />Cancel</span></button></div>";
                }                
                document.getElementById("dvServiceDetailsModalBody").innerHTML = str;
                var showServiceRequestDetailsModal = new bootstrap.Modal(document.getElementById('showServiceRequestDetailsModal'));
                showServiceRequestDetailsModal.show();                
            });
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->showServiceRequestDetails error: " + response.responseText);
        }
    });
}
function rescheduleServiceRequest(serviceRequestId, serviceDateTime, serviceHours, serviceProviderId) {
    document.getElementById("spnRescheduleServiceRequestMsg").innerHTML = "";
    $('#showServiceRequestDetailsModal').modal('hide');
    const date = new Date(serviceDateTime.split('T')[0] + " " + serviceDateTime.split('T')[1]);
    $("#dtRescheduleDateForService").val(date.getFullYear().toString() + "-" + AppendZero((date.getMonth() + 1).toString()) + "-" + AppendZero(date.getDate().toString()));
    var time = "";
    if (date.getMinutes() == 30) {
        time = date.getHours() + ".5";
    }
    else {
        time = date.getHours();
    } 
    document.getElementById("selRescheduleTimeForService").value = time; 
    document.getElementById("hdnServiceRequestIdOfRescheduleSR").value = serviceRequestId;
    document.getElementById("hdnServiceDurationOfRescheduleSR").value = serviceHours;
    document.getElementById("hdnServiceProviderIdOfRescheduleSR").value = serviceProviderId;
    var rescheduleServiceRequestModal = new bootstrap.Modal(document.getElementById('rescheduleServiceRequestModal'));
    rescheduleServiceRequestModal.show();
}
function deleteServiceRequest(serviceRequestId) {    
    $('#showServiceRequestDetailsModal').modal('hide');
    var deleteServiceRequestModal = new bootstrap.Modal(document.getElementById('deleteServiceRequestModal'));
    deleteServiceRequestModal.show();
    document.getElementById("hdncancelServiceRequestId").value = serviceRequestId;
}
function cancelServiceRequest() {    
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: { "servicerequestid": document.getElementById("hdncancelServiceRequestId").value},
        url: "/CustomerMySettings/cancelServiceRequest",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                $("#deleteServiceRequestModal").modal("hide");
                Swal.fire({
                    icon: 'success',
                    title: 'Service Request has been cancelled Successfully!!',
                    text: 'Service Request Id: ' + document.getElementById("hdncancelServiceRequestId").value + "!!"
                });
                document.getElementById("hdncancelServiceRequestId").value = "";
                getCustomerDashboardData();
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->cancelServiceRequest error: " + response.responseText);
        }
    });  
}

var enumExtraServices = {
    1: 'Inside Cabinets',
    2: 'Inside Fridge',
    3: 'Inside Oven',
    4: 'Laundry Wash & Dry',
    5: 'Interior Windows'
};
function AppendZero(input) {
    if (input.length == 1) {
        return '0' + input;
    }
    return input;
}

function rescheduleServiceRequestValidation() {
    if ((parseFloat(document.getElementById("selRescheduleTimeForService").value) + parseFloat(document.getElementById("hdnServiceDurationOfRescheduleSR").value)) > 20) {
        document.getElementById("spnRescheduleServiceRequestMsg").innerHTML = "Booking change not saved! Helper must be able to finish cleaning by 8pm. Please try again!!";
    }
    else {
        if (document.getElementById("hdnServiceProviderIdOfRescheduleSR").value=="") {
            updateServiceRequestDateTime();
        }
        else {
            var hh = "";
            var min = "";
            if (document.getElementById("selRescheduleTimeForService").value.includes(".")) {
                hh = document.getElementById("selRescheduleTimeForService").value.split('.')[0];
                min = '30';
            }
            else {
                hh = document.getElementById("selRescheduleTimeForService").value;
                min = '00';
            }
            var dt1 = new Date(document.getElementById("dtRescheduleDateForService").value.split('-')[0], (document.getElementById("dtRescheduleDateForService").value.split('-')[1] - 1), document.getElementById("dtRescheduleDateForService").value.split('-')[2], hh, min, 0, 0);
            $("#dvLoader").addClass("is-active");
            $.ajax({
                type: "get",
                url: "/CustomerMySettings/getServiceRequestsDetailsForCheckRescheduleSR",
                data: { "servicerequestid": document.getElementById("hdnServiceRequestIdOfRescheduleSR").value, "serviceproviderid": document.getElementById("hdnServiceProviderIdOfRescheduleSR").value },
                dataType: "json",
                success: function (data) {
                    $("#dvLoader").removeClass("is-active");
                    var vErrCount = 0;
                    var vSucceessCount = 0;
                    var conflictServiceRequestId = 0;
                    var conflictServiceRequestDateTime = 0;
                    var conflictServiceRequestDuration = 0;
                    $.each(data, function (i, v) {    
                        var dt2 = new Date(v.serviceStartDateTime.toString().split('T')[0].split('-')[0], (v.serviceStartDateTime.toString().split('T')[0].split('-')[1]-1), v.serviceStartDateTime.toString().split('T')[0].split('-')[2], v.serviceStartDateTime.toString().split('T')[1].split(':')[0], v.serviceStartDateTime.toString().split('T')[1].split(':')[1], v.serviceStartDateTime.toString().split('T')[1].split(':')[2]);
                        var xx = 0;         
                        conflictServiceRequestId = v.serviceRequestId;
                        conflictServiceRequestDateTime = v.serviceStartDateTime;
                        conflictServiceRequestDuration = v.serviceDuration;
                        if (date_units_diff(dt1, dt2).slice(0, -2)[0] == 0) {
                            if ((date_units_diff(dt1, dt2).slice(0, -2)[1]) < 0) {
                                xx = (date_units_diff(dt1, dt2).slice(0, -2)[1]).toString().split("-")[1];
                                if (date_units_diff(dt1, dt2).slice(0, -2)[2].toString().includes('30')) {
                                    xx = parseFloat(xx + ".5");
                                }
                                else {
                                    xx = parseFloat(xx);
                                }
                                if ((xx - (parseFloat(v.serviceDuration) + 1)) >= 0) {           
                                    vSucceessCount++;
                                }
                                else {
                                    vErrCount++;
                                    return false;
                                }
                            }
                            else if ((date_units_diff(dt1, dt2).slice(0, -2)[1]) == 0) {
                                vErrCount++;
                                return false;
                            }
                            else {
                                xx = date_units_diff(dt1, dt2).slice(0, -2)[1];
                                if (date_units_diff(dt1, dt2).slice(0, -2)[2] == 30) {
                                    xx = parseFloat(xx + ".5");
                                }
                                else {
                                    xx = parseFloat(xx);
                                }
                                if ((xx - (parseFloat(document.getElementById("hdnServiceDurationOfRescheduleSR").value) + 1)) >= 0) {                  
                                    vSucceessCount++;
                                }
                                else {
                                    vErrCount++;
                                    return false;
                                }
                            }
                        }
                        else {
                            vSucceessCount++;
                        }
                    });
                    if (vSucceessCount != 0 && vErrCount == 0) {
                        document.getElementById("spnRescheduleServiceRequestMsg").innerHTML = "";
                        updateServiceRequestDateTime();
                    }
                    else {
                        let d = new Date(conflictServiceRequestDateTime.toString().split('T')[0].split('-')[0], conflictServiceRequestDateTime.toString().split('T')[0].split('-')[1], conflictServiceRequestDateTime.toString().split('T')[0].split('-')[2]);
                        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
                        var x = conflictServiceRequestDateTime.toString().split('T')[1].split(':')[0];
                        if (conflictServiceRequestDateTime.toString().split('T')[1].split(':')[1].toString().includes('30')) {
                            x = x + ".5";
                        }
                        x = parseFloat(x) + conflictServiceRequestDuration;
                        var y = 0;
                        if (x.toString().includes('.')) {
                            y = x.toString().split('.')[0];
                            if (y < 10) {
                                y = '0' + y;
                            }
                            y = y + ":30";
                        }
                        else {
                            y = x;
                            if (y < 10) {
                                y = '0' + y;
                            }
                            y = y + ':00';
                        }
                        document.getElementById("spnRescheduleServiceRequestMsg").innerHTML = "Another service request has been assigned to the service provider on <strong>" + `${da}-${mo}-${ye}` + "</strong> from <strong>" + conflictServiceRequestDateTime.toString().split('T')[1].split(':')[0] + ":" + conflictServiceRequestDateTime.toString().split('T')[1].split(':')[1]+"</strong> to <strong>"+y+"</strong>. Either choose another date or pick up a different time slot.";
                    }
                },
                error: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    console.log("service_history.js->rescheduleServiceRequestValidation error: " + response.responseText);
                }
            });
        }
    }
}
function updateServiceRequestDateTime() {
    var data = {};
    data.ServiceRequestId = document.getElementById("hdnServiceRequestIdOfRescheduleSR").value;
    data.ServiceStartDate = document.getElementById("dtRescheduleDateForService").value;
    if (document.getElementById("selRescheduleTimeForService").value.includes(".")) {
        data.ServiceStartTime = document.getElementById("selRescheduleTimeForService").value.split('.')[0] + ":30";
    }
    else {
        data.ServiceStartTime = document.getElementById("selRescheduleTimeForService").value + ":00";
    }
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: "/CustomerMySettings/updateServiceRequestDateTime",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                document.getElementById("spnRescheduleServiceRequestMsg").classList.remove('text-danger');
                document.getElementById("spnRescheduleServiceRequestMsg").classList.add('text-success');
                document.getElementById("spnRescheduleServiceRequestMsg").innerHTML = "Service Request Date Time Updated Successfully!!";
                setTimeout(function () {
                    $('#rescheduleServiceRequestModal').modal('hide');
                    document.getElementById("spnRescheduleServiceRequestMsg").classList.remove('text-success');
                    document.getElementById("spnRescheduleServiceRequestMsg").classList.add('text-danger');
                }, 2000);
                getCustomerDashboardData();
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->updateServiceRequestDateTime error: " + response.responseText);
        }
    });   
}
function date_units_diff(a, b, unit_amounts) {
    var split_to_whole_units = function (milliseconds, unit_amounts) {
        time_data = [milliseconds];
        for (i = 0; i < unit_amounts.length; i++) {
            time_data.push(parseInt(time_data[i] / unit_amounts[i]));
            time_data[i] = time_data[i] % unit_amounts[i];
        }; return time_data.reverse();
    }; if (unit_amounts == undefined) {
        unit_amounts = [1000, 60, 60, 24];
    };
    var utc_a = new Date(a.toUTCString());
    var utc_b = new Date(b.toUTCString());
    var diff = (utc_b - utc_a);
    return split_to_whole_units(diff, unit_amounts);
}

function getCustomerServiceHistoryData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/CustomerMySettings/getCustomerServiceHistoryData",
        dataType: "json",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var countForNoServiceHistoryAvailable = 0;
            if (data.length == 1) {
                $.each(data, function (i, v) {
                    if (v.serviceRequestId == null) {
                        countForNoServiceHistoryAvailable = 0;
                    }
                    else {
                        countForNoServiceHistoryAvailable++;
                    }
                })
            }
            else {
                countForNoServiceHistoryAvailable++;
            }
            var tblcusServiceHistory = $('#tblcusServiceHistory').DataTable();
            tblcusServiceHistory.clear().draw();
            if (countForNoServiceHistoryAvailable > 0) {
                for (var i = 0; i < data.length; i++) {
                    var serStartDate = new Date(data[i].serviceDateTime).toLocaleDateString('en-GB');
                    var serStartTime = new Date(data[i].serviceDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    var serEndTime = new Date(data[i].serviceDateTime).getHours() + data[i].serviceHours;
                    serEndTime = getServiceEndTime(serStartTime, serEndTime);
                    var serProviderName = "";
                    var serProviderProfile = "";
                    var spRate = 0;
                    var serProviderRateImages = "";
                    var statusCol = "";
                    var spRateBtnCol = "";                    
                    if (data[i].serviceProviderId != null) {
                        serProviderName = data[i].serviceProviderName;
                        serProviderProfile = "<img src='../../images/service-history/imghatprofile.png'>";
                        if (data[i].serviceStatus == enumServiceStatus.Cancelled) {
                            statusCol = "<label class='lblserstatus cancelled py-1 px-3'>Cancelled</label>";
                            spRateBtnCol = "<a href='#' class='btnratespdisabled disabled px-3 py-2'>Rate SP</a>";
                        }
                        else if (data[i].serviceStatus == enumServiceStatus.Completed) {
                            statusCol = "<label class='lblserstatus completed py-1 px-3'>Completed</label>";
                            spRateBtnCol = "<a href='#' class='btnratesp px-3 py-2' onclick='openRateSPModal(" + data[i].serviceRequestId + ", " + data[i].serviceProviderId + ", "+ "\"" +"" + serProviderName + " "+ "\"" +")'>Rate SP</a>";
                        }                        
                        if (data[i].spRate.length > 0) {
                            for (var j = 0; j < data[i].spRate.length; j++) {
                                spRate += data[i].spRate[j];
                            }
                            spRate = (spRate / data[i].spRate.length).toFixed(1);
                            serProviderRateImages = getSPRateImages(spRate);
                        }
                        tblcusServiceHistory.row.add([
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 0 + ");' class='onHover'>" + data[i].serviceRequestId + "</div>",
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 0 + ");' class='onHover'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                            "<div class='media-object'><div class='float-start dvProimgContainer d-flex justify-content-center align-items-center me-2'>" + serProviderProfile + "</div><div><label>" + serProviderName + "</label><div class='d-flex align-items-center'>" + serProviderRateImages + "<label class='ps-2'>" + spRate + "</label></div></div></div>",
                            "<label class='spnEuro'>&euro;&nbsp;" + data[i].payment + "</label>",
                            statusCol,
                            spRateBtnCol
                        ]).draw(false);
                    }
                    else {
                        statusCol = "<label class='lblserstatus cancelled py-1 px-3'>Cancelled</label>";
                        spRateBtnCol = "<a href='#' class='btnratespdisabled disabled px-3 py-2'>Rate SP</a>";
                        tblcusServiceHistory.row.add([
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 0 + ");' class='onHover'>" + data[i].serviceRequestId + "</div>",
                            "<div onclick='showServiceRequestDetails(" + data[i].serviceRequestId + ", " + 0 + ");' class='onHover'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                            "",
                            "<label class='spnEuro'>&euro;&nbsp;" + data[i].payment + "</label>",
                            statusCol,
                            spRateBtnCol
                        ]).draw(false);
                    }
                }
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->getCustomerServiceHistoryData error: " + response.responseText);
        }
    });
}
var enumServiceStatus = {
    'New': 1,
    'Pending': 2,
    'Completed': 3,
    'Cancelled': 4
};
function openRateSPModal(srId, spId, spName) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/CustomerMySettings/checkIfCustomerAlreadyRatedSPForServiceRequest",
        data: { "servicerequestid": srId },
        dataType: "json",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                var alreadyRatedSPModal = new bootstrap.Modal(document.getElementById('alreadyRatedSPModal'));
                alreadyRatedSPModal.show();
                document.getElementById("lblspRatedModalSPName").innerHTML = spName;
                setTimeout(function () {
                    $('#alreadyRatedSPModal').modal('hide');
                }, 4000);
            }
            else {
                document.getElementById("hdnSRIdforRateSP").value = srId;
                document.getElementById("hdnSPIdforRateSP").value = spId;
                document.getElementById("txtFeedbackToSP").value = "";
                document.getElementById("lblspRateModalSPName").innerHTML = spName;
                var spRateModal = new bootstrap.Modal(document.getElementById('rateSPModal'));
                spRateModal.show();
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->openRateSPModal error: " + response.responseText);
        }
    });;    
}
function submitRateOfSP() {  
    var data = {
        ServiceRequestId: document.getElementById("hdnSRIdforRateSP").value,
        RatingTo: document.getElementById("hdnSPIdforRateSP").value,
        Ratings: document.getElementById("lblrateSP").textContent,
        Comments: document.getElementById("txtFeedbackToSP").value,
        OnTimeArrival: document.getElementById("lblrtOnTimeArr").textContent,
        Friendly: document.getElementById("lblrtFriendly").textContent,
        QualityOfService: document.getElementById("lblrtQltyofSer").textContent
    };
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: "/CustomerMySettings/saveRatingsOfSP",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                getCustomerServiceHistoryData();
                $("#rateSPModal").modal("hide");
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("service_history.js->submitRateOfSP error: " + response.responseText);
        }
    });    
}
function closeAreadyRatedSPModal() {
    $("#alreadyRatedSPModal").modal("hide");
}