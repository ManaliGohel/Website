$(document).ready(function () {
    showLoggedinSPDetails();
    showSPNewServiceRequestsData(document.getElementById("hasPetsForNewRequestsOfSP").checked);
    showSPUpcomingServicesData();
    showSPServiceHistoryData();
    showSPBlockedtbData();    
    showSPMyRatingsData();
});
function fillCitiesByPostalcodeofSPMySettings(postalcode) {
    if (postalcode.toString().trim().length == 0) {
        document.getElementById("spnPostalCodeSPAdd").innerHTML = "";
    }
    else if (postalcode.toString().trim().length == 6) {
        $("#dvLoader").addClass("is-active");
        $.ajax({
            type: 'get',
            url: "/BookService/getAllCitiesByPostalCode",
            data: { "postalcode": postalcode },
            success: function (data) {
                $("#dvLoader").removeClass("is-active");
                if (data.length > 0) {
                    document.getElementById("spnPostalCodeSPAdd").innerHTML = "";
                    $('#selSPAddressCity').empty();
                    var count = 0;
                    $.each(data, function (i, v) {
                        if (count == 0) {
                            $('#selSPAddressCity').append('<option value="' + v.state + '" selected>' + v.city + '</option>');
                            count++;
                        }
                        else {
                            $('#selSPAddressCity').append('<option value="' + v.state + '">' + v.city + '</option>');
                        }
                    });
                }
                else {
                    $('#selSPAddressCity').empty();
                    document.getElementById("spnPostalCodeSPAdd").innerHTML = "This postal code is not available with us!!";
                }
            },
            error: function (response) {
                $("#dvLoader").removeClass("is-active");
                console.log("MySettingsSP.js->fillCitiesByPostalcodeofSPMySettings error: " + response.responseText);
            }
        });
    }
    else {
        $('#selSPAddressCity').empty();
        document.getElementById("spnPostalCodeSPAdd").innerHTML = "";
    }
}
function showLoggedinSPDetails() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "get",
        url: "/ServiceProvider/getLoggedinSPData",
        dataType: "JSON",
        contentType: "application/json",
        success: function (data) {        
            $("#dvLoader").removeClass("is-active");
            $.each(data, function (i, v) {
                document.getElementById("txtFirstnameSPMydetails").value = v.firstName;
                document.getElementById("txtLastnameSPMydetails").value = v.lastName;
                document.getElementById("txtEmailSPMydetails").value = v.email;
                document.getElementById("txtMobileSPMydetails").value = v.mobile;
                if (v.dob != null) {
                    document.getElementById("selSPMyDetailsDOBDate").value = (new Date(v.dob).getDate());
                    document.getElementById("selSPMyDetailsDOBMonth").value = (new Date(v.dob).getMonth() + 1);
                    document.getElementById("selSPMyDetailsDOBYear").value = (new Date(v.dob).getFullYear());
                }
                if (v.nationality != null) {
                    $("#selSPMyDetailsNationality option").filter(function () {
                        return $(this).val() == v.nationality;
                    }).prop("selected", true);
                }
                if (v.gender != null) {
                    $("input[name=rbGenderSP][value=" + v.gender + "]").attr('checked', 'checked');
                }
                if (v.spProfilePicture != null) {
                    selectedAvatarImage('img-' + v.spProfilePicture.split('/')[3].split('.')[0]);
                }
                if (v.addressLine1 != null) {
                    document.getElementById('txtStreetNameSPAdd').value = v.addressLine1;
                }
                if (v.addressLine2 != null) {
                    document.getElementById('txtHouseNumberSPAdd').value = v.addressLine2;
                }
                if (v.postalcode != null) {
                    document.getElementById("txtPostalcodeSPAdd").value = v.postalcode;
                    if (v.citiesStatesByPostalcode.length > 0) {
                        for (var j = 0; j < v.citiesStatesByPostalcode.length; j++) {
                            $("#selSPAddressCity").append('<option value="' + v.citiesStatesByPostalcode[j].dState + '">' + v.citiesStatesByPostalcode[j].dCity + '</option>');
                        }
                        $("#selSPAddressCity option").filter(function () {
                            return $(this).text() == v.city;
                        }).prop("selected", true);
                    }
                }
            })           
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->showLoggedinSPDetails error: " + response.responseText);
        }
    });
}

function saveSPDetails() {
    var vSPDetailsCount = 0;
    if (document.getElementById("txtFirstnameSPMydetails").value.trim().length > 0) {
        vSPDetailsCount++;
        document.getElementById("spnFirstnameSPMydetails").innerHTML = "";
    }
    else {
        vSPDetailsCount--;
        document.getElementById("spnFirstnameSPMydetails").innerHTML = "Enter First name!!";
    }
    if (document.getElementById("txtLastnameSPMydetails").value.trim().length > 0) {
        vSPDetailsCount++;
        document.getElementById("spnLastnameSPMydetails").innerHTML = "";
    }
    else {
        vSPDetailsCount--;
        document.getElementById("spnLastnameSPMydetails").innerHTML = "Enter Last name!!";
    }
    if (document.getElementById("txtMobileSPMydetails").value.trim().length > 0) {
        if (document.getElementById("txtMobileSPMydetails").value.trim().length < 10) {
            vSPDetailsCount--;
            document.getElementById("spnMobileSPMydetails").innerHTML = "Enter valid Phone number!!";
        }
        else {
            vSPDetailsCount++;
            document.getElementById("spnMobileSPMydetails").innerHTML = "";
        }
    }
    else {
        vSPDetailsCount--;
        document.getElementById("spnMobileSPMydetails").innerHTML = "Enter Phone number!!";
    }
    if (document.getElementById("txtPostalcodeSPAdd").value.trim().length == 0) {
        vSPDetailsCount--;
        document.getElementById("spnPostalCodeSPAdd").innerHTML = "Enter Postal code!!";
    }
    else if (document.getElementById("txtPostalcodeSPAdd").value.trim().length > 0) {
        if (document.getElementById("txtPostalcodeSPAdd").value.trim().length == 6 && document.getElementById("spnPostalCodeSPAdd").innerHTML == "") {
            vSPDetailsCount++;
        }
        else if (document.getElementById("txtPostalcodeSPAdd").value.trim().length < 6) {
            vSPDetailsCount--;
            document.getElementById("spnPostalCodeSPAdd").innerHTML = "Enter valid Postal code!!";
        }        
    }
    if (document.getElementById("selSPMyDetailsDOBDate").value == "0" && document.getElementById("selSPMyDetailsDOBMonth").value == "0" && document.getElementById("selSPMyDetailsDOBYear").value == "0") {
        vSPDetailsCount++;
        document.getElementById("spnDOBSPMydetails").innerHTML = "";
    }
    else if (document.getElementById("selSPMyDetailsDOBDate").value != "0" || document.getElementById("selSPMyDetailsDOBMonth").value != "0" || document.getElementById("selSPMyDetailsDOBYear").value != "0") {
        if (document.getElementById("selSPMyDetailsDOBDate").value != "0" && document.getElementById("selSPMyDetailsDOBMonth").value != "0" && document.getElementById("selSPMyDetailsDOBYear").value != "0") {
            if (dateCheck(parseInt(document.getElementById("selSPMyDetailsDOBYear").value), parseInt(document.getElementById("selSPMyDetailsDOBMonth").value), parseInt(document.getElementById("selSPMyDetailsDOBDate").value))) {
                vSPDetailsCount++;
                document.getElementById("spnDOBSPMydetails").innerHTML = "";
            }
            else {
                vSPDetailsCount--;
                document.getElementById("spnDOBSPMydetails").innerHTML = "Enter valid Date of Birth!";
            }
        }
        else {
            vSPDetailsCount--;
            document.getElementById("spnDOBSPMydetails").innerHTML = "Enter Date of Birth!!";
        }
    }
    if (vSPDetailsCount == 5) {
        var data = {
            FirstName: document.getElementById("txtFirstnameSPMydetails").value,
            LastName: document.getElementById("txtLastnameSPMydetails").value,
            Email: document.getElementById("txtEmailSPMydetails").value,
            Mobile: document.getElementById("txtMobileSPMydetails").value,
            Date: parseInt(document.getElementById("selSPMyDetailsDOBDate").value),
            Month: parseInt(document.getElementById("selSPMyDetailsDOBMonth").value),
            Year: parseInt(document.getElementById("selSPMyDetailsDOBYear").value),
            Nationality: document.getElementById("selSPMyDetailsNationality").value,
            Gender: $('input:radio[name="rbGenderSP"]:checked').val(),
            AddressLine1: document.getElementById("txtStreetNameSPAdd").value,
            AddressLine2: document.getElementById("txtHouseNumberSPAdd").value,
            PostalCode: document.getElementById("txtPostalcodeSPAdd").value,
            City: $("#selSPAddressCity").val(),
            State: $("#selSPAddressCity option:selected").text()
        };
        if ($("#imgSPProfie").attr("src").toString().includes('..')) {
            data.SPProfilePicture = $("#imgSPProfie").attr("src").toString().split('..')[2];
        }
        else {
            data.SPProfilePicture = $("#imgSPProfie").attr('src');
        }
        $("#dvLoader").addClass("is-active");
        $.ajax({
            type: "post",
            dataType: "JSON",
            data: JSON.stringify(data),
            contentType: "application/json",
            url: "/ServiceProvider/updateSPDetails",
            success: function (response) {
                $("#dvLoader").removeClass("is-active");
                if (response > 0) {
                    $("#dvSPUpdateSuccess").fadeTo(2000, 500).slideUp(500, function () {
                        $("#dvSPUpdateSuccess").slideUp(500);
                    });
                }
            },
            error: function (response) {
                $("#dvLoader").removeClass("is-active");
                console.log("MySettingsSP.js->saveSPDetails error: " + response.responseText);
            }
        }); 
    }
}
function dateCheck(year, month, day) {
    var d = new Date(year + "-" + AppendZero(month) + "-" + AppendZero(day));
    if (d.getFullYear().toString() == year && (d.getMonth() + 1).toString() == month && d.getDate().toString() == day) {
        return true;
    }
    return false;
}

function selectedAvatarImage(selectedImageId) {
    var imgs = ["img-avatar-car", "img-avatar-female", "img-avatar-hat", "img-avatar-iron", "img-avatar-male", "img-avatar-ship"];
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i] == selectedImageId) {
            document.getElementById(imgs[i]).classList.remove('unselectedAvatar');
            document.getElementById(imgs[i]).classList.add('selectedAvatar');
            document.getElementById("dvspProfile").innerHTML = "<img id='imgSPProfie' src='../../images/upcoming-service/" + imgs[i].split('-')[1] + "-" + imgs[i].split('-')[2] + ".png' />";
        }
        else {
            document.getElementById(imgs[i]).classList.remove('selectedAvatar');
            document.getElementById(imgs[i]).classList.add('unselectedAvatar');
        }
    }
}

function validateSPNewPassword() {
    document.getElementById("txtnewpwdSPchangepwd").removeAttribute("onfocusout");
    document.getElementById("txtnewpwdSPchangepwd").setAttribute("onkeyup", "validateSPNewPassword()");
    if (document.getElementById("txtnewpwdSPchangepwd").value.trim().length > 0) {
        if (document.getElementById("txtnewpwdSPchangepwd").value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,14}$/) != null) {
            document.getElementById("spnnewpwdSPchangepwd").innerHTML = "";
            validateSPConfirmNewPassword();
            validateSPOldPassword();
        }
        else {
            document.getElementById("spnnewpwdSPchangepwd").innerHTML = "Password must be 6 to 14 Characters long, must contain at least one Upper case, one Lower case, one Digit and one Special character!";
            disableSPChangePasswordbtn();
        }
    }
    else {
        disableSPChangePasswordbtn();
        document.getElementById("spnnewpwdSPchangepwd").innerHTML = "Enter new password!";
    }
}
function validateSPConfirmNewPassword() {
    document.getElementById("txtconfirmnewpwdSPchangepwd").removeAttribute("onfocusout");
    document.getElementById("txtconfirmnewpwdSPchangepwd").setAttribute("onkeyup", "validateSPConfirmNewPassword()");
    if (document.getElementById("txtconfirmnewpwdSPchangepwd").value.trim().length > 0) {
        if (document.getElementById("txtconfirmnewpwdSPchangepwd").value == document.getElementById("txtnewpwdSPchangepwd").value) {
            document.getElementById("spnconfirmnewpwdSPchangepwd").innerHTML = "";
            validateSPOldPassword();
        }
        else {
            document.getElementById("spnconfirmnewpwdSPchangepwd").innerHTML = "Password and Confirm password must be same!";
            disableSPChangePasswordbtn();
        }
    }
    else {
        disableSPChangePasswordbtn();
        document.getElementById("spnconfirmnewpwdSPchangepwd").innerHTML = "Enter confirm password!";
    }
}
function validateSPOldPassword() {
    document.getElementById("txtoldpwdSPchangepwd").setAttribute("onkeyup", "validateSPOldPassword()");
    if (document.getElementById("txtoldpwdSPchangepwd").value.trim().length > 0 && document.getElementById("txtnewpwdSPchangepwd").value.trim().length > 0 && document.getElementById("txtconfirmnewpwdSPchangepwd").value.trim().length > 0 && document.getElementById("spnnewpwdSPchangepwd").innerHTML.trim().length == 0 && document.getElementById("spnconfirmnewpwdSPchangepwd").innerHTML.trim().length == 0) {
        document.getElementById("btnSPChangepassword").classList.remove("btnContinueSetupSerProcDisable");
        document.getElementById("btnSPChangepassword").disabled = false;
    }
    else {
        disableSPChangePasswordbtn();
    }
}
function disableSPChangePasswordbtn() {
    document.getElementById("btnSPChangepassword").classList.add("btnContinueSetupSerProcDisable");
    document.getElementById("btnSPChangepassword").disabled = true;
}
function changeSPPassword() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        url: "/CustomerMySettings/checkUserPassword",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            document.getElementById("spnoldpwdSPchangepwd").innerHTML = "";
            if (response.password == document.getElementById("txtoldpwdSPchangepwd").value) {
                updateSPPassword();
            }
            else {
                document.getElementById("spnoldpwdSPchangepwd").innerHTML = "Incorrect old password!";
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->changeSPPassword error: " + response.responseText);
        }
    });
}
function updateSPPassword() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: { "password": document.getElementById("txtnewpwdSPchangepwd").value.trim() },
        url: "/CustomerMySettings/updateUserPassword",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                clearChangeSPPasswordTab();
                $("#dvSPChangePassword").fadeTo(2000, 500).slideUp(500, function () {
                    $("#dvSPChangePassword").slideUp(500);
                });
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->updateSPPassword error: " + response.responseText);
        }
    });
}
function clearChangeSPPasswordTab() {
    document.getElementById("txtoldpwdSPchangepwd").value = "";
    document.getElementById("txtnewpwdSPchangepwd").value = "";
    document.getElementById("txtconfirmnewpwdSPchangepwd").value = "";
    document.getElementById("spnoldpwdSPchangepwd").innerHTML = "";
    document.getElementById("spnnewpwdSPchangepwd").innerHTML = "";
    document.getElementById("spnconfirmnewpwdSPchangepwd").innerHTML = "";
    disableSPChangePasswordbtn();
}

function showSPNewServiceRequestsData(hasPets) {
    $.ajax({
        type: 'get',
        url: "/ServiceProvider/getLoggedinSPNewServiceRequestsData",
        data: { "hasPets": hasPets },
        success: function (data) {
            var tblspNewServiceRequests = $('#tblNewServiceRequests').DataTable();
            tblspNewServiceRequests.clear().draw();          
            if (data.length > 0) {                
                $.each(data, function (i, v) {
                    var serStartDate = new Date(v.serviceStartDate).toLocaleDateString('en-GB');
                    var serStartTime = new Date(v.serviceStartDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    var serEndTime = new Date(data[i].serviceStartDate).getHours() + v.serviceDuration;
                    serEndTime = getServiceEndTime(serStartTime, serEndTime);
                    var ServiceId = v.serviceRequestId;
                    var CustomerName = v.customerName;
                    var StreetName = v.streetName;
                    var HouseNumber = v.houseNumber;
                    var PostalCode = v.postalCode;
                    var City = v.city;
                    var State = v.state;
                    var Payment = v.payment;
                    tblspNewServiceRequests.row.add([
                        "<div class='onHover' onclick='openSPServiceRequestDetailsModal(" + v.serviceRequestId + ", 1, 0)'>" + ServiceId + "</div>",
                        "<div class='onHover' onclick='openSPServiceRequestDetailsModal(" + v.serviceRequestId + ", 1, 0)'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                        "<div class='d-flex align-items-center contentCenter'><div><img src='../../images/upcoming-service/place.png' class='me-1' alt=''></div><div><div>" + CustomerName + "</div><div>" + StreetName + ", " + HouseNumber + "</div><div>" + PostalCode + " " + City + "-" + State + "</div></div></div>",
                        "<span class='ms-md-3'>" + Payment + " &euro;</span>",
                        "",
                        "<button class='btnratesp px-3 py-2 me-1' onclick='acceptServiceRequest(" + ServiceId + ")'>Accept</button>"
                    ]).draw(false);
                });  
            }                      
        },
        error: function (response) {
            console.log("MySettingsSP.js->showSPNewServiceRequestsData error: " + response.responseText);
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

function acceptServiceRequest(servicerequestid) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        url: '/ServiceProvider/acceptNewServicerequestSP',
        data: { 'serviceid': servicerequestid },
        type: 'post',
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            $("#showSPServiceRequestDetailsModal").modal('hide');
            if (response == false) {
                Swal.fire({
                    icon: 'success',
                    title: 'Service Request has been Accepted Successfully!!',
                    text: 'Service Request Id: ' + servicerequestid + "!!"
                });
                showSPNewServiceRequestsData(document.getElementById("hasPetsForNewRequestsOfSP").checked);
            }
            if (response.isSRConflict == true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Time Conflict!!',
                    text: 'Another service request ' + response.serviceRequestId +' has already been assigned which has time overlap with this service request. You can’t pick this one!!'
                })
            }
            if (response.noLongerAvailable == true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Service Request is no more Available!!',
                    text: 'This Service Request is no more Available. It has been assigned to another Service Provider!!'
                })
                showSPNewServiceRequestsData(document.getElementById("hasPetsForNewRequestsOfSP").checked);
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->acceptServiceRequest error: " + response.responseText);
        }
    });
}

function showSPUpcomingServicesData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: 'get',
        url: "/ServiceProvider/getLoggedinSPUpcomingServicesData",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var tblspUpcomingServices = $('#tblUpcomingServices').DataTable();
            tblspUpcomingServices.clear().draw();
            if (data.length > 0) {
                $.each(data, function (i, v) {
                    var serStartDate = new Date(v.serviceStartDate).toLocaleDateString('en-GB');
                    var serStartTime = new Date(v.serviceStartDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    var serEndTime = new Date(data[i].serviceStartDate).getHours() + v.serviceDuration;
                    serEndTime = getServiceEndTime(serStartTime, serEndTime);
                    var ServiceId = v.serviceRequestId;
                    var CustomerName = v.customerName;
                    var StreetName = v.streetName;
                    var HouseNumber = v.houseNumber;
                    var PostalCode = v.postalCode;
                    var City = v.city;
                    var State = v.state;
                    var Payment = v.payment;
                    var Distance = v.distance;
                    var strColAction = "";
                    var date1 = new Date(v.serviceStartDate);
                    date1.setMinutes(date1.getMinutes() + (v.serviceDuration * 60));
                    var date2 = new Date();
                    if (date1 > date2) {
                        strColAction = "<button class='tblCancel px-3 py-2' onclick='cancelServiceRequestBySP(" + v.serviceRequestId + ")'>Cancel</button>";
                    }
                    else {
                        strColAction = "<button class='btnratesp px-3 py-2 me-1' onclick='completeServiceRequestBySP(" + v.serviceRequestId + ")'>Completed</button><button class='tblCancel px-3 py-2'  onclick='cancelServiceRequestBySP(" + v.serviceRequestId + ")'>Cancel</button>";
                    }
                    tblspUpcomingServices.row.add([
                        "<div class='onHover' onclick='openSPServiceRequestDetailsModal(" + v.serviceRequestId + ", 0, 1)'>" + ServiceId + "</div>",
                        "<div class='onHover' onclick='openSPServiceRequestDetailsModal(" + v.serviceRequestId + ", 0, 1)'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                        "<div class='d-flex align-items-center contentCenter'><div><img src='../../images/upcoming-service/place.png' class='me-1' alt=''></div><div><div>" + CustomerName + "</div><div>" + StreetName + " " + HouseNumber + "</div><div>" + PostalCode + " " + City + "-" + State + "</div></div></div>",
                        "<span class='ms-md-3'>" + Payment + " &euro;</span>",
                        "<span class='ms-md-3'>" + Distance + " km</span>",
                        "<div>" + strColAction + "</div>"
                    ]).draw(false);
                });
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->showSPUpcomingServicesData error: " + response.responseText);
        }
    });
}
function completeServiceRequestBySP(srId) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        url: '/ServiceProvider/completeSRbySP',
        type: 'post',
        data: { 'servicerequestid': srId },
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                $("#showSPServiceRequestDetailsModal").modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Service Request completed Successfully!!',
                    text: 'Service Request Id: ' + srId + "!!"
                });
                showSPUpcomingServicesData();
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->completeServiceRequestBySP error: " + response.responseText);
        }
    });
}
function cancelServiceRequestBySP(srId) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        url: '/ServiceProvider/cancelSRbySP',
        type: 'post',
        data: { 'servicerequestid': srId },
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                $("#showSPServiceRequestDetailsModal").modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Service Request cancelled Successfully!!',
                    text: 'Service Request Id: ' + srId + "!!"
                });
                showSPUpcomingServicesData();
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->cancelServiceRequestBySP error: " + response.responseText);
        }
    });
}

function showSPServiceHistoryData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: 'get',
        url: "/ServiceProvider/getLoggedinSPServiceHistoryData",
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var tblSPServiceHistory = $('#tblSPServiceHistory').DataTable();
            tblSPServiceHistory.clear().draw();
            if (data.length > 0) {
                $.each(data, function (i, v) {
                    var serStartDate = new Date(v.serviceStartDate).toLocaleDateString('en-GB');
                    var serStartTime = new Date(v.serviceStartDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                    var serEndTime = new Date(data[i].serviceStartDate).getHours() + v.serviceDuration;
                    serEndTime = getServiceEndTime(serStartTime, serEndTime);
                    var ServiceId = v.serviceRequestId;
                    var CustomerName = v.customerName;
                    var StreetName = v.streetName;
                    var HouseNumber = v.houseNumber;
                    var PostalCode = v.postalCode;
                    var City = v.city;
                    var State = v.state;
                    tblSPServiceHistory.row.add([
                        "<div class='onHover' onclick='openSPServiceRequestDetailsModal(" + v.serviceRequestId + ", 0, 0)'>" + ServiceId + "</div>",
                        "<div class='onHover' onclick='openSPServiceRequestDetailsModal(" + v.serviceRequestId + ", 0, 0)'><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                        "<div class='d-flex align-items-center contentCenter'><div><img src='../../images/upcoming-service/place.png' class='me-1' alt=''></div><div><div>" + CustomerName + "</div><div>" + StreetName + " " + HouseNumber + "</div><div>" + PostalCode + " " + City + "-" + State + "</div></div></div>",
                    ]).draw(false);
                });
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->showSPServiceHistoryData error: " + response.responseText);
        }
    });
}

function showSPBlockedtbData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        url: '/ServiceProvider/getCustomersForSPBlockedData',
        type: 'get',
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            var tblspBlockCustomer = $('#tblspBlockCustomer').DataTable();
            tblspBlockCustomer.clear().draw();
            response.forEach(function (e) {
                var strBtnBlockUnblock = "";
                if (e.blockeduser != null) {
                    strBtnBlockUnblock = "<button class='btnratesp px-4 py-2 me-1' onclick='UnBlockCustomerByLoggedinSP(" + e.customeruserid + ")'>Unblock</button>";
                }
                else {
                    strBtnBlockUnblock = "<button class='tblCancel px-4 py-2 me-1' onclick='BlockCustomerByLoggedinSP(" + e.customeruserid + ")'>Block</button>";
                }
                tblspBlockCustomer.row.add([
                    "<img src='../../images/upcoming-service/avatar-hat.png' />",
                    "<label class='fw-bold'>" + e.customername + "</label>",
                    strBtnBlockUnblock
                ]).draw(false);
            });
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->showSPBlockedtbData error: " + response.responseText);
        }
    });
}
function BlockCustomerByLoggedinSP(targetuserid) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        url: '/ServiceProvider/BlockCustomerByLoggedinSP',
        type: 'post',
        data: { 'targetuserid': targetuserid },
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                showSPBlockedtbData();
                showSPNewServiceRequestsData(document.getElementById("hasPetsForNewRequestsOfSP").checked);
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->BlockCustomerByLoggedinSP error: " + response.responseText);
        }
    });
}
function UnBlockCustomerByLoggedinSP(targetuserid) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        url: '/ServiceProvider/UnBlockCustomerByLoggedinSP',
        type: 'post',
        data: { 'targetuserid': targetuserid },
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                showSPBlockedtbData();
                showSPNewServiceRequestsData(document.getElementById("hasPetsForNewRequestsOfSP").checked);
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->UnBlockCustomerByLoggedinSP error: " + response.responseText);
        }
    });
}

function showSPMyRatingsData() {
    $.ajax({
        url: '/ServiceProvider/getSPMyRatingsData',
        type: 'post',
        data: { "ratings": $("#selSPRatingsRange").val() },
        success: function (data) {
            var tblSPMyRatings = $('#tblSPMyRatings').DataTable();
            tblSPMyRatings.clear().draw();
            var strRateStars = "";
            var strRateType = "";
            data.forEach(function (e) {
                strRateStars = getSPRateImages(e.rating);
                if (e.rating >= 0 && e.rating <= 1) {
                    strRateType = " Very Poor";
                }
                else if (e.rating > 1 && e.rating <= 2) {
                    strRateType = " Poor";
                }
                else if (e.rating > 2 && e.rating <= 3) {
                    strRateType = " Good";
                }
                else if (e.rating > 3 && e.rating <= 4) {
                    strRateType = " Very Good";
                }
                else if (e.rating > 4 && e.rating <= 5) {
                    strRateType = " Excellent";
                }
                date = new Date(e.servistartdateandtime);
                var d2 = new Date(e.servistartdateandtime);
                d2.setMinutes(d2.getMinutes() + (e.servicehoures * 60));
                var temptime = AppendZero(date.getHours().toString()) + ":" + AppendZero(date.getMinutes().toString()) + " - " + AppendZero(d2.getHours().toString()) + ":" + AppendZero(d2.getMinutes().toString());
                var inputtagdate = AppendZero(date.getDate().toString()) + "/" + AppendZero((date.getMonth() + 1).toString()) + "/" + date.getFullYear().toString();
                tblSPMyRatings.row.add([
                    '<div class="spMyratingsBorder"><div class= "d-flex innerbox" ><div class="colume-1">' + e.servicereqestid + ' <br /><span class="fw-bold">' + e.customername + '</span></div><div class="colume-2">' +
                    '<img src="..//images/upcoming-service/calender.png" alt=""><span class="fw-bold ms-1">' + inputtagdate + '</span> <br>' +
                    '<img src="..//images/upcoming-service/clock.png" alt=""><span class="ms-1">' + temptime + '</span>' +
                    '</div>' +
                    '<div class="colume-3">' +
                    '<span class="fw-bold">Ratings</span> <br> <div class="d-flex align-items-center"><label>' + strRateStars + '</label> <label class="ms-2 mt-1">' + strRateType + '</label></div>' +
                    '</div>' +
                    '</div>' +
                    '<hr / class="m-0 mt-3">' +
                    '<div class="commentbox float-left mt-2">' +
                    '<span class="fw-bold">Customer Comment</span>' + "  <div>" + e.comment + '</div>' +
                    '</div>' +
                    '</div>'
                ]).draw(false);
            });
        },
        error: function (response) {
            console.log("MySettingsSP.js->showSPMyRatingsData error: " + response.responseText);
        }
    });
}
function AppendZero(input) {
    if (input.length == 1) {
        return '0' + input;
    }
    return input;
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

function openSPServiceRequestDetailsModal(serviceRequestId, btnAccept, btnCancelComplete) {
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
                str += "<div><span class='fw-bold'>Phone: </span>" + v.mobile + "</div>";
                str += "<div><span class='fw-bold'>Email: </span>" + v.email + "</div>";
                str += "<hr/>";
                str += "<div class='fw-bold mb-1'>Comments</div>";
                if (v.hasPets) {
                    str += "<div class='d-flex justify-align-center align-items-center'><img src='../../images/service-history/included.png' class='me-2' />I do have pets at home</div>";
                }
                else {
                    str += "<div class='d-flex justify-align-center align-items-center'><img src='../../images/service-history/not-included.png' class='me-2' />I don't have pets at home</div>";
                }
                if (btnAccept == 1) {
                    str += "<hr/>";
                    str += "<button class='btnratesp px-3 py-2 me-1' onclick='acceptServiceRequest(" + serviceRequestId + ")'><span class='d-flex justify-align-center align-items-center'><img class='me-2' src='../../images/service-history/rightmark.png' />Accept</span></button>";
                }
                if (btnCancelComplete == 1) {
                    str += "<hr/>";
                    var date1 = new Date(v.serviceStartDateTime);
                    date1.setMinutes(date1.getMinutes() + (v.serviceDuration * 60));
                    var date2 = new Date();
                    if (date1 > date2) {
                        str += "<button class='tblCancel px-3 py-2' onclick='cancelServiceRequestBySP(" + serviceRequestId + ")'><span class='d-flex justify-align-center align-items-center'><img class='me-2' src='../../images/service-history/close-icon-small.png' />Cancel</span></button>";
                    }
                    else {
                        str += "<div class='d-flex align-items-center'><button class='btnratesp px-3 py-2 me-1' onclick='completeServiceRequestBySP(" + serviceRequestId + ")'><span class='d-flex justify-align-center align-items-center'><img class='me-2' src='../../images/service-history/rightmark.png' />Completed</span></button><button class='tblCancel px-3 py-2'  onclick='cancelServiceRequestBySP(" + v.serviceRequestId + ")'><span class='d-flex justify-align-center align-items-center'><img class='me-2' src='../../images/service-history/close-icon-small.png' />Cancel<span></button></div>";
                    }       
                }
                document.getElementById("dvSPServiceDetailsModalBody").innerHTML = str;
                var showSPServiceRequestDetailsModal = new bootstrap.Modal(document.getElementById('showSPServiceRequestDetailsModal'));
                showSPServiceRequestDetailsModal.show();
            });
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("MySettingsSP.js->openSPServiceRequestDetailsModal error: " + response.responseText);
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