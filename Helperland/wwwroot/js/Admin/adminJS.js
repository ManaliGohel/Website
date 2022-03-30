$(document).ready(function () {
    showAdminPanelServiceRequestsData();
    showAdminPanelUserManagementData();
});
$("#txtCustomerAdminPanelSR").select2({
    placeholder: "Customer",
    theme: "bootstrap4",
    allowClear: false,
    ajax: {
        url: "/Admin/getCustomers",
        dataType: "json",
        data: function (params) {
            var query =
            {
                searchTerm: params.term,
            };
            return query;
        },
        processResults: function (data, params) {
            return {
                results: data
            };
        }
    }
});
$("#txtSPAdminPanelSR").select2({
    placeholder: "Service provider",
    theme: "bootstrap4",
    allowClear: false,
    ajax: {
        url: "/Admin/getServiceProviders",
        dataType: "json",
        data: function (params) {
            var query =
            {
                searchTerm: params.term,
            };
            return query;
        },
        processResults: function (data, params) {
            return {
                results: data
            };
        }
    }
});
$("#txtUsernameAdminPanelUM").select2({
    placeholder: "User name",
    theme: "bootstrap4",
    allowClear: false,
    ajax: {
        url: "/Admin/getUsers",
        dataType: "json",
        data: function (params) {
            var query =
            {
                searchTerm: params.term,
            };
            return query;
        },
        processResults: function (data, params) {
            return {
                results: data
            };
        }
    }
});  

function showAdminPanelServiceRequestsData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: 'get',
        url: '/Admin/getAdminPanelServiceRequestsData',
        dataType: 'json',
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var tblSerReq = $('#tblSerReq').DataTable();
            tblSerReq.clear().draw();
            $.each(data, function (i, v) {
                var SRId = v.serviceRequestId;
                var serStartDate = new Date(v.serviceStartDateTime).toLocaleDateString('en-GB');
                var serStartTime = new Date(v.serviceStartDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                var serEndTime = new Date(v.serviceStartDateTime).getHours() + v.serviceDuration;
                serEndTime = getServiceEndTime(serStartTime, serEndTime);
                var CustomerName = v.customerName;
                var spProfile = "";
                var spName = "";
                var spRate = 0;
                var spRateImages = "";
                var colActions = "<div class='py-0 dropstart'>";
                var colSP = "";
                var colStatus = "";
                if (v.serviceProviderId != null) {
                    spName = v.serviceProviderName;
                    if (v.serviceProviderProfile != null) {
                        spProfile = "<img src='../.." + v.serviceProviderProfile + "' class='dvProfileImageContainer'>";
                    }
                    if (v.serviceProviderRate != null) {
                        spRate = v.serviceProviderRate;
                    }
                    spRateImages = getSPRateImages(spRate);
                    colSP = "<div class='media-object'><div class='float-start dvProfileImageContainer d-flex justify-content-center align-items-center me-2'>" + spProfile + "</div><div><label>" + spName + "</label><div class='d-flex align-items-center'>" + spRateImages + "<label class='ps-2'>" + spRate + "</label></div></div></div>";
                }
                if (v.serviceStatus == enumServiceStatus.New || v.serviceStatus == enumServiceStatus.Pending) {
                    colActions += "<a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='openEditServiceRequestModal(" + SRId + ")'>Edit & Reschedule</a></li><li><a class='dropdown-item' href='#' onclick='openCancelServiceRequestModal(" + SRId + ")'>Cancel</a></li></ul></div>";
                }
                else {
                    if (v.serviceStatus == enumServiceStatus.Completed && v.serviceProviderRate != null && v.serviceProviderRate <= 1) {
                        colActions += "<a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='openRefundAmountModal(" + SRId + ", " + v.totalAmount + ", " + v.refundAmount + ")' >Refund</a></li></ul></div>";
                    }
                    else {
                        colActions += "<div class='onHover threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></div>";
                    }                    
                }
                if (v.serviceStatus == enumServiceStatus.New) {
                    colStatus = "<label class='lblserstatus new py-1 px-3'>New</label>";
                }
                else if (v.serviceStatus == enumServiceStatus.Pending) {
                    colStatus = "<label class='lblserstatus pending py-1 px-3'>Pending</label>";
                }
                else if (v.serviceStatus == enumServiceStatus.Completed) {
                    colStatus = "<label class='lblserstatus completed py-1 px-3'>Completed</label>";
                }
                else {
                    colStatus = "<label class='lblserstatus cancelled py-1 px-3'>Cancelled</label>";
                }
                tblSerReq.row.add([
                    "<div class='ms-2'>" + SRId + "</div>",
                    "<div><div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + serStartDate + "</span></div><div><img src='../../images/upcoming-service/clock.png' alt=''> " + serStartTime + " - " + serEndTime + "</div></div>",
                    "<div class='d-flex align-items-center contentCenter'><div><img src='../../images/upcoming-service/place.png' class='me-1' alt=''></div><div><div>" + CustomerName + "</div><div>" + v.streetName + ", " + v.houseNumber + "</div><div>" + v.postalCode + " " + v.city + "-" + v.state + "</div></div></div>",
                    colSP,
                    colStatus,
                    colActions
                ]).draw(false);
            });                    
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("adminJS.js->showAdminPanelServiceRequestsData error: " + response.responseText);
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
var enumServiceStatus = {
    'New': 1,
    'Pending': 2,
    'Completed': 3,
    'Cancelled': 4
};

function showAdminPanelUserManagementData() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: 'get',
        url: '/Admin/getAdminPanelUserManagementData',
        dataType: 'json',
        success: function (data) {
            $("#dvLoader").removeClass("is-active");
            var tblUserManagement = $('#tblUserManagement').DataTable();
            tblUserManagement.clear().draw();
            $.each(data, function (i, v) {
                var UserType = "";
                var colStatus = "";
                var colActions = "";
                if (v.userTypeId == enumUserType.Customer) {
                    UserType = "Customer";
                    if (v.isActive == true) {
                        colStatus = "<label class='lblserstatus active py-1 px-3'>Active</label>";
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='adminUserManagementActions(" + v.userId + ", " + enumAdminUserManagementActions.Deactivate + ")'>Deactivate</a></li></ul></div>";
                    }
                    else {
                        colStatus = "<label class='lblserstatus inactive py-1 px-3'>Inactive</label>";
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='adminUserManagementActions(" + v.userId + ", " + enumAdminUserManagementActions.Activate + ")'>Activate</a></li></ul></div>";
                    }
                }
                else if (v.userTypeId == enumUserType.ServiceProvider) {
                    UserType = "Service Provider";
                    if (v.isApproved == true) {
                        if (v.isActive == true) {
                            colStatus = "<label class='lblserstatus active py-1 px-3'>Active</label>";
                            colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='adminUserManagementActions(" + v.userId + ", " + enumAdminUserManagementActions.Deactivate + ")'>Deactivate</a></li></ul></div>";
                        }
                        else {
                            colStatus = "<label class='lblserstatus inactive py-1 px-3'>Inactive</label>";
                            colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='adminUserManagementActions(" + v.userId + ", " + enumAdminUserManagementActions.Activate + ")'>Activate</a></li></ul></div>";
                        }
                    }
                    else {
                        colStatus = "<label class='lblserstatus pending py-1 px-3'>Not Approved</label>";
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#' onclick='adminUserManagementActions(" + v.userId + ", " + enumAdminUserManagementActions.Approve + ")'>Approve</a></li></ul></div>";
                    }
                }
                else {
                    UserType = "Admin";
                }
                var PostalCode = "";
                if (v.zipCode != null) {
                    PostalCode = v.zipCode;
                }
                tblUserManagement.row.add([
                    "<div class='ms-2'>" + v.firstName + " " + v.lastName + "</div>",
                    "<div><img src='../../images/upcoming-service/calender.png' alt=''> <span class='fw-bold'>" + new Date(v.createdDate).toLocaleDateString('en-GB') + "</span></div>",
                    UserType,
                    v.mobile,
                    PostalCode,
                    colStatus,
                    colActions
                ]).draw(false);
            });
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("adminJS.js->showAdminPanelUserManagementData error: " + response.responseText);
        }
    });
}
var enumUserType = {
    'Admin': 1,
    'Customer': 2,
    'ServiceProvider': 3
};

function filterInAdminPanelServiceRequests() {
    var tblSerReq = $("#tblSerReq").DataTable();
    document.getElementById("spndtToDateAdminPanelSR").innerHTML = "";
    document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
    if ($("#dtFromDateAdminPanelSR").val().trim() != "" && $("#dtToDateAdminPanelSR").val().trim() == "") {
        document.getElementById("spndtToDateAdminPanelSR").innerHTML = "Enter To Date for Date Filter!";
    }
    else if ($("#dtFromDateAdminPanelSR").val().trim() == "" && $("#dtToDateAdminPanelSR").val().trim() != "") {
        document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "Enter From Date for Date Filter!";
    }
    else {
        var vDTCount = 0;
        if (new Date($("#dtFromDateAdminPanelSR").val()) > new Date($("#dtToDateAdminPanelSR").val())) {
            document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "From Date must be smaller or equal to To Date!";
            vDTCount++;
        }
        if (vDTCount == 0) {
            document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
            jQuery.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
                    var min = "";
                    var max = "";                    
                    if (document.getElementById("dtFromDateAdminPanelSR").value != "" && document.getElementById("dtToDateAdminPanelSR").value!="") {
                        min = new Date(parseInt($("#dtFromDateAdminPanelSR").val().toString().split('-')[0]), parseInt(parseInt($("#dtFromDateAdminPanelSR").val().toString().split('-')[1]) - 1), parseInt($("#dtFromDateAdminPanelSR").val().toString().split('-')[2]), 0, 0, 0, 0);
                        max = new Date(parseInt($("#dtToDateAdminPanelSR").val().toString().split('-')[0]), parseInt(parseInt($("#dtToDateAdminPanelSR").val().toString().split('-')[1]) - 1), parseInt($("#dtToDateAdminPanelSR").val().toString().split('-')[2]), 0, 0, 0, 0);
                    }                    
                    var date = new Date(parseInt(data[1].toString().trim().split(' ')[0].split('/')[2]), parseInt(parseInt(data[1].toString().trim().split(' ')[0].split('/')[1]) - 1), parseInt(data[1].toString().trim().split(' ')[0].split('/')[0]), 0, 0, 0, 0);
                    if (
                        (min === "" && max === "") ||
                        (min === "" && date <= max) ||
                        (min <= date && max === "") ||
                        (min <= date && date <= max)
                    ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            );
            tblSerReq.draw();
        }
    }
    if ($("#txtSRIdAdminPanelSR").val().trim() != "") {
        tblSerReq.columns(0).search("^" + $("#txtSRIdAdminPanelSR").val() + "$", true, false, true).draw(true);
    }
    else {
        tblSerReq.columns(0).search("").draw();
    }
    if ($("#txtCustomerAdminPanelSR").val() != null) {
        tblSerReq.columns(2).search($("#txtCustomerAdminPanelSR").val() +' '+ $("#txtZipcodeAdminPanelSR").val().trim()).draw();
    }
    else {
        tblSerReq.columns(2).search($("#txtZipcodeAdminPanelSR").val().trim()).draw(true);
    }
    if ($("#txtSPAdminPanelSR").val() != null) {
        tblSerReq.columns(3).search($("#txtSPAdminPanelSR").val()).draw();
    } 
    else {
        tblSerReq.columns(3).search("").draw();
    }
    tblSerReq.columns(4).search($("#selSerStatusAdminPanel").val()).draw();
}
function filterInAdminPanelUserManagement() {
    var tblUserManagement = $("#tblUserManagement").DataTable();
    document.getElementById("spndtToDateAdminPanelUM").innerHTML = "";
    document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "";
    if ($("#dtFromDateAdminPanelUM").val().trim() != "" && $("#dtToDateAdminPanelUM").val().trim() == "") {
        document.getElementById("spndtToDateAdminPanelUM").innerHTML = "Enter To Date for Date Filter!";
    }
    else if ($("#dtFromDateAdminPanelUM").val().trim() == "" && $("#dtToDateAdminPanelUM").val().trim() != "") {
        document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "Enter From Date for Date Filter!";
    }
    else {
        var vDTCount = 0;
        if (new Date($("#dtFromDateAdminPanelUM").val()) > new Date($("#dtToDateAdminPanelUM").val())) {
            document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "From Date must be smaller or equal to To Date!";
            vDTCount++;
        }
        if (vDTCount == 0) {
            document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "";
            jQuery.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {
                    var min = "";
                    var max = "";
                    if (document.getElementById("dtFromDateAdminPanelUM").value != "" && document.getElementById("dtToDateAdminPanelUM").value != "") {
                        min = new Date(parseInt($("#dtFromDateAdminPanelUM").val().toString().split('-')[0]), parseInt(parseInt($("#dtFromDateAdminPanelUM").val().toString().split('-')[1]) - 1), parseInt($("#dtFromDateAdminPanelUM").val().toString().split('-')[2]), 0, 0, 0, 0);
                        max = new Date(parseInt($("#dtToDateAdminPanelUM").val().toString().split('-')[0]), parseInt(parseInt($("#dtToDateAdminPanelUM").val().toString().split('-')[1]) - 1), parseInt($("#dtToDateAdminPanelUM").val().toString().split('-')[2]), 0, 0, 0, 0);
                    }                    
                    var date = new Date(parseInt(data[1].toString().split('/')[2]), parseInt(parseInt(data[1].toString().split('/')[1]) - 1), parseInt(data[1].toString().split('/')[0]), 0, 0, 0, 0);
                    if (
                        (min === "" && max === "") ||
                        (min === "" && date <= max) ||
                        (min <= date && max === "") ||
                        (min <= date && date <= max)
                    ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            );
            tblUserManagement.draw();
        }
    }
    if ($("#txtUsernameAdminPanelUM").val() != null) {
        tblUserManagement.columns(0).search($("#txtUsernameAdminPanelUM").val()).draw();
    }
    else {
        tblUserManagement.columns(0).search("").draw();
    }
    tblUserManagement.columns(2).search($("#selUsertypeAdminPanelUM").val()).draw();
    if ($("#txtPhoneAdminPanelUM").val().trim() != "") {
        tblUserManagement.columns(3).search($("#txtPhoneAdminPanelUM").val()).draw();
    }
    else {
        tblUserManagement.columns(3).search("").draw();
    }
    if ($("#txtPostalcodeAdminPanelUM").val().trim() != "") {
        tblUserManagement.columns(4).search($("#txtPostalcodeAdminPanelUM").val()).draw();
    }
    else {
        tblUserManagement.columns(4).search("").draw();
    }
}
function AppendZero(input) {
    if (input.length == 1) {
        return '0' + input;
    }
    return input;
}
document.getElementById("dtFromDateAdminPanelSR").addEventListener('change', function (e) {
    if (!document.getElementById("dtFromDateAdminPanelSR").value)
    {
        document.getElementById("spndtToDateAdminPanelSR").innerHTML = "";
        $('#dtFromDateAdminPanelSR').attr('type', 'text');
    }
    else
        document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
});
document.getElementById("dtToDateAdminPanelSR").addEventListener('change', function (e) {
    if (!document.getElementById("dtToDateAdminPanelSR").value)
    {
        document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
        $('#dtToDateAdminPanelSR').attr('type', 'text');
    }
    else
        document.getElementById("spndtToDateAdminPanelSR").innerHTML = "";
});
document.getElementById("dtFromDateAdminPanelUM").addEventListener('change', function (e) {
    if (!document.getElementById("dtFromDateAdminPanelUM").value) {
        document.getElementById("spndtToDateAdminPanelUM").innerHTML = "";
        $('#dtFromDateAdminPanelUM').attr('type', 'text');
    }
    else
        document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "";
});
document.getElementById("dtToDateAdminPanelUM").addEventListener('change', function (e) {
    if (!document.getElementById("dtToDateAdminPanelUM").value) {
        document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "";
        $('#dtToDateAdminPanelUM').attr('type', 'text');
    }
    else
        document.getElementById("spndtToDateAdminPanelUM").innerHTML = "";
});
function makeText(id) {
    if (document.getElementById(id).value == "") {
        $('#'+id).attr('type', 'text');
    }
}
function clearFilterDataOfAdminPanelSRs() {
    document.getElementById("txtSRIdAdminPanelSR").value = ""; 
    document.getElementById("txtZipcodeAdminPanelSR").value = "";
    $('#txtCustomerAdminPanelSR').val(null).trigger('change');
    $('#txtSPAdminPanelSR').val(null).trigger('change');
    document.getElementById("selSerStatusAdminPanel").value = ""; 
    $('#dtFromDateAdminPanelSR').attr('type', 'text');
    $('#dtToDateAdminPanelSR').attr('type', 'text');
    document.getElementById("dtFromDateAdminPanelSR").value = ""; 
    document.getElementById("dtToDateAdminPanelSR").value = "";
    document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
    document.getElementById("spndtToDateAdminPanelSR").innerHTML = "";    
    $("#tblSerReq").DataTable().search('').columns().search('').draw();
}
function clearFilterDataOfAdminPanelUM() {
    $('#txtUsernameAdminPanelUM').val(null).trigger('change');
    document.getElementById("selUsertypeAdminPanelUM").value = "";
    document.getElementById("txtPhoneAdminPanelUM").value = "";
    document.getElementById("txtPostalcodeAdminPanelUM").value = "";
    $('#dtFromDateAdminPanelUM').attr('type', 'text');
    $('#dtToDateAdminPanelUM').attr('type', 'text');
    document.getElementById("dtFromDateAdminPanelUM").value = "";
    document.getElementById("dtToDateAdminPanelUM").value = "";
    document.getElementById("spndtFromDateAdminPanelUM").innerHTML = "";
    document.getElementById("spndtToDateAdminPanelUM").innerHTML = "";
    $("#tblUserManagement").DataTable().search('').columns().search('').draw();
}

function openEditServiceRequestModal(srid) {
    document.getElementById("spneditServicerequestAdminPanelSRs").innerHTML = "";
    $.ajax({
        type: 'get',
        url: "/CustomerMySettings/getServiceRequestDetails",
        data: { "servicerequestid": srid },
        success: function (data) {
            $.each(data, function (i, v) {
                const date = new Date(v.serviceStartDateTime.split('T')[0] + " " + v.serviceStartDateTime.split('T')[1]);
                $("#dtEditSRAdminPanelSRs").val(date.getFullYear().toString() + "-" + AppendZero((date.getMonth() + 1).toString()) + "-" + AppendZero(date.getDate().toString()));
                var time = "";
                if (date.getMinutes() == 30) {
                    time = date.getHours() + ".5";
                }
                else {
                    time = date.getHours();
                }
                document.getElementById("selTimeEditSRAdminPanelSRs").value = time;
                document.getElementById("txtPostalcodeEditSRAdminPanel").value = v.postalcode;
                fillCitiesByPostalcode(v.postalcode, v.city);     
                document.getElementById("txtStreetnameEditSRAdminPanel").value = v.addressLine1;
                document.getElementById("txtHousenumberEditSRAdminPanel").value = v.addressLine2;
                document.getElementById("hdnServiceRequestIdOfEditSRbyAdmin").value = srid;
                document.getElementById("hdnServiceDurationOfEditSRbyAdmin").value = v.serviceDuration;
                document.getElementById("hdnServiceProviderIdOfEditSRbyAdmin").value = v.serviceProviderId;
                var editServiceRequestAdminPanelModal = new bootstrap.Modal(document.getElementById('editServiceRequestAdminPanelModal'));
                editServiceRequestAdminPanelModal.show();
            });            
        },
        error: function (response) {
            console.log("adminJS.js->openEditServiceRequestModal error: " + response.responseText);
        }
    });    
}
function fillCitiesByPostalcode(postalcode, city) {
    if (postalcode.toString().trim().length >= 6) {
        $.ajax({
            type: 'get',
            url: "/BookService/getAllCitiesByPostalCode",
            data: { "postalcode": postalcode },
            success: function (data) {
                if (data.length > 0) {
                    document.getElementById("spnPostalcodeEditSRAdminPanel").innerHTML = "";
                    document.getElementById("txtPostalcodeEditSRAdminPanel").value = postalcode;
                    $('#selCityEditSRAdminPanel').empty();
                    var count = 0;
                    $.each(data, function (i, v) {
                        if (count == 0) {
                            $('#selCityEditSRAdminPanel').append('<option value="' + v.state + '" selected>' + v.city + '</option>');
                            count++;
                        }
                        else {
                            $('#selCityEditSRAdminPanel').append('<option value="' + v.state + '">' + v.city + '</option>');
                        }
                    });
                    if (city != "") {
                        for (var i = 0; i < document.getElementById("selCityEditSRAdminPanel").options.length; i++) {
                            if (document.getElementById("selCityEditSRAdminPanel").options[i].text == city) {
                                document.getElementById("selCityEditSRAdminPanel").selectedIndex = i;
                                break;
                            }
                        }
                    }
                    document.getElementById("btnEditSRbyAdmin").classList.remove("btndisable");
                    document.getElementById("btnEditSRbyAdmin").disabled = false;
                }
                else {
                    $('#selCityEditSRAdminPanel').empty();
                    document.getElementById("spnPostalcodeEditSRAdminPanel").innerHTML = "This postal code is not available with us!!";
                    document.getElementById("btnEditSRbyAdmin").classList.add("btndisable");
                    document.getElementById("btnEditSRbyAdmin").disabled = true;
                }
            },
            error: function (response) {
                console.log("adminJS.js->fillCitiesByPostalcode error: " + response.responseText);
            }
        });
    }
    else {
        $('#selCityEditSRAdminPanel').empty();
        document.getElementById("spnPostalcodeEditSRAdminPanel").innerHTML = "";
        document.getElementById("btnEditSRbyAdmin").classList.add("btndisable");
        document.getElementById("btnEditSRbyAdmin").disabled = true;
    }
}

function editServiceRequestbyAdmin() {
    if ((parseFloat(document.getElementById("selTimeEditSRAdminPanelSRs").value) + parseFloat(document.getElementById("hdnServiceDurationOfEditSRbyAdmin").value)) > 20) {
        document.getElementById("spneditServicerequestAdminPanelSRs").innerHTML = "Booking change not saved! Helper must be able to finish cleaning by 8pm. Please try again!!";
    }
    else {
        if (document.getElementById("hdnServiceProviderIdOfEditSRbyAdmin").value == "") {
            updateServiceRequestDateTimebyAdmin();
        }
        else {
            var hh = "";
            var min = "";
            if (document.getElementById("selTimeEditSRAdminPanelSRs").value.includes(".")) {
                hh = document.getElementById("selTimeEditSRAdminPanelSRs").value.split('.')[0];
                min = '30';
            }
            else {
                hh = document.getElementById("selTimeEditSRAdminPanelSRs").value;
                min = '00';
            }
            var dt1 = new Date(document.getElementById("dtEditSRAdminPanelSRs").value.split('-')[0], (document.getElementById("dtEditSRAdminPanelSRs").value.split('-')[1] - 1), document.getElementById("dtEditSRAdminPanelSRs").value.split('-')[2], hh, min, 0, 0);
            $("#dvLoader").addClass("is-active");
            $.ajax({
                type: "get",
                url: "/CustomerMySettings/getServiceRequestsDetailsForCheckRescheduleSR",
                data: { "servicerequestid": document.getElementById("hdnServiceRequestIdOfEditSRbyAdmin").value, "serviceproviderid": document.getElementById("hdnServiceProviderIdOfEditSRbyAdmin").value },
                dataType: "json",
                success: function (data) {
                    $("#dvLoader").removeClass("is-active");
                    var vErrCount = 0;
                    var vSucceessCount = 0;
                    var conflictServiceRequestId = 0;
                    var conflictServiceRequestDateTime = 0;
                    var conflictServiceRequestDuration = 0;
                    $.each(data, function (i, v) {
                        var dt2 = new Date(v.serviceStartDateTime.toString().split('T')[0].split('-')[0], (v.serviceStartDateTime.toString().split('T')[0].split('-')[1] - 1), v.serviceStartDateTime.toString().split('T')[0].split('-')[2], v.serviceStartDateTime.toString().split('T')[1].split(':')[0], v.serviceStartDateTime.toString().split('T')[1].split(':')[1], v.serviceStartDateTime.toString().split('T')[1].split(':')[2]);
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
                                if ((xx - (parseFloat(document.getElementById("hdnServiceDurationOfEditSRbyAdmin").value) + 1)) >= 0) {
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
                        document.getElementById("spneditServicerequestAdminPanelSRs").innerHTML = "";
                        updateServiceRequestDateTimebyAdmin();
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
                        document.getElementById("spneditServicerequestAdminPanelSRs").innerHTML = "Another service request has been assigned to the service provider on <strong>" + `${da}-${mo}-${ye}` + "</strong> from <strong>" + conflictServiceRequestDateTime.toString().split('T')[1].split(':')[0] + ":" + conflictServiceRequestDateTime.toString().split('T')[1].split(':')[1] + "</strong> to <strong>" + y + "</strong>. Either choose another date or pick up a different time slot.";
                    }
                },
                error: function (response) {
                    $("#dvLoader").removeClass("is-active");
                    console.log("adminJS.js->editServiceRequestbyAdmin error: " + response.responseText);
                }
            });
        }
    }
}
function updateServiceRequestDateTimebyAdmin() {
    var vCount = 0;
    if (!document.getElementById("dtEditSRAdminPanelSRs").value) {
        document.getElementById("spndtEditSRAdminPanelSRs").innerHTML = "Select Date for Service!";
        vCount--;
    }
    else {
        document.getElementById("spndtEditSRAdminPanelSRs").innerHTML = "";
        vCount++;
    }
    if (!document.getElementById("txtStreetnameEditSRAdminPanel").value) {
        document.getElementById("spnStreetnameEditSRAdminPanel").innerHTML = "Street name Required!";
        vCount--;
    }
    else {
        document.getElementById("spnStreetnameEditSRAdminPanel").innerHTML = "";
        vCount++;
    }
    if (!document.getElementById("txtHousenumberEditSRAdminPanel").value) {
        document.getElementById("spnHousenumberEditSRAdminPanel").innerHTML = "House number Required!";
        vCount--;
    }
    else {
        document.getElementById("spnHousenumberEditSRAdminPanel").innerHTML = "";
        vCount++;
    }
    if (vCount == 3) {
        var data = {};
        data.serviceRequestId = document.getElementById("hdnServiceRequestIdOfEditSRbyAdmin").value;
        data.serviceStartDate = document.getElementById("dtEditSRAdminPanelSRs").value;
        if (document.getElementById("selTimeEditSRAdminPanelSRs").value.includes(".")) {
            data.ServiceStartTime = document.getElementById("selTimeEditSRAdminPanelSRs").value.split('.')[0] + ":30";
        }
        else {
            data.ServiceStartTime = document.getElementById("selTimeEditSRAdminPanelSRs").value + ":00";
        }
        data.addressLine1 = document.getElementById("txtStreetnameEditSRAdminPanel").value;
        data.addressLine2 = document.getElementById("txtHousenumberEditSRAdminPanel").value;
        data.city = $("#selCityEditSRAdminPanel").val();
        data.state = $("#selCityEditSRAdminPanel option:selected").text();
        data.postalCode = document.getElementById("txtPostalcodeEditSRAdminPanel").value;
        $("#dvLoader").addClass("is-active");
        $.ajax({
            type: "post",
            dataType: "JSON",
            data: JSON.stringify(data),
            contentType: "application/json",
            url: "/Admin/updateServiceRequestDateTime",
            success: function (response) {
                $("#dvLoader").removeClass("is-active");
                if (response > 0) {
                    document.getElementById("spneditServicerequestAdminPanelSRs").classList.remove('text-danger');
                    document.getElementById("spneditServicerequestAdminPanelSRs").classList.add('text-success');
                    document.getElementById("spneditServicerequestAdminPanelSRs").innerHTML = "Service Request Updated Successfully!!";
                    setTimeout(function () {
                        $('#editServiceRequestAdminPanelModal').modal('hide');
                        document.getElementById("spneditServicerequestAdminPanelSRs").classList.remove('text-success');
                        document.getElementById("spneditServicerequestAdminPanelSRs").classList.add('text-danger');
                    }, 2000);
                    showAdminPanelServiceRequestsData();
                }
            },
            error: function (response) {
                $("#dvLoader").removeClass("is-active");
                console.log("adminJS.js->updateServiceRequestDateTimebyAdmin error: " + response.responseText);
            }
        });
    }
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

function openCancelServiceRequestModal(srid) {
    document.getElementById("hdncancelServiceRequestIdbyAdmin").value = srid;
    var cancelServiceRequestbyAdminModal = new bootstrap.Modal(document.getElementById('cancelServiceRequestbyAdminModal'));
    cancelServiceRequestbyAdminModal.show();
}
function cancelServiceRequestbyAdmin() {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: { "srid": document.getElementById("hdncancelServiceRequestIdbyAdmin").value },
        url: "/Admin/cancelServiceRequest",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                showAdminPanelServiceRequestsData();
                $("#cancelServiceRequestbyAdminModal").modal("hide");
                Swal.fire({
                    icon: 'success',
                    title: 'Service Request has been cancelled Successfully!!',
                    text: 'Cancelled Service Request Id: ' + document.getElementById("hdncancelServiceRequestIdbyAdmin").value + "!!"
                });
                document.getElementById("hdncancelServiceRequestIdbyAdmin").value = "";
            }            
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("adminJS.js->cancelServiceRequestbyAdmin error: " + response.responseText);
        }
    });    
}

function adminUserManagementActions(userId, actionid) {
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: "post",
        dataType: "JSON",
        data: { "userid": userId, "actionid": actionid },
        url: "/Admin/userManagementUpdateActions",
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                showAdminPanelUserManagementData();
                var strtitle = "";
                var strtext = "";
                if (actionid == enumAdminUserManagementActions.Activate) {
                    strtitle = 'User Activated Successfully!!';
                    strtext = 'Activated User ID: ' + userId + '!!';
                }
                else if (actionid == enumAdminUserManagementActions.Deactivate) {
                    strtitle = 'User Deactivated Successfully!!';
                    strtext = 'Deactivated User ID: ' + userId + '!!';
                }
                else if (actionid == enumAdminUserManagementActions.Approve) {
                    strtitle = 'User Approved Successfully!!';
                    strtext = 'Approved User ID: ' + userId + '!!';
                }
                Swal.fire({
                    icon: 'success',
                    title: strtitle,
                    text: strtext
                });
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("adminJS.js->adminUserManagementActions error: " + response.responseText);
        }
    });    
}
var enumAdminUserManagementActions = {
    'Activate': 1,
    'Deactivate': 2,
    'Approve': 3
};

function openRefundAmountModal(srId, totalamount, refundamount) {
    var refundAmountAdminPanelModal = new bootstrap.Modal(document.getElementById('refundAmountAdminPanelModal'));
    refundAmountAdminPanelModal.show(); 
    $("#serReqIdtoRefund").val(srId);
    $("#txtAmountToRefund").val("");
    $("#idcalculate").val(""); 
    $("#spnerrorrefund").html("");
    $("#btnrefund").prop("disabled", true);
    $("#btnrefund").removeClass("btnExport2");
    $("#btnrefund").addClass("btnExport2disable");
    $("#pamount").html(totalamount);
    $("#ramount").html("00");
    if (refundamount != null) {
        $("#ramount").html(refundamount);
    }
    $("#ibamount").html(parseFloat(totalamount) - parseFloat($("#ramount").html()));
}
$(".amountcal").on("keyup change", function () {
    $("#spnerrorrefund").html("");
    $("#idcalculate").val("");
    reflectrefund();
});
function reflectrefund() {
    if ($("#txtAmountToRefund").val().length == 0) {
        $("#idcalculate").val("");
    }
    else {
        var refundamount = parseFloat($("#txtAmountToRefund").val());
        var refundtype = $("#ddlRefundType").val();
        var calculateamount;
        if (refundtype == "Percentage") {
            calculateamount = (parseFloat($("#pamount").html()) * refundamount) / 100;
        }
        else {
            calculateamount = parseFloat($("#txtAmountToRefund").val());
        }
        if (calculateamount > (parseFloat($("#ibamount").html()))) {
            $("#spnerrorrefund").html("Refund Amount is greater than the Paid Amount!");
            $("#btnrefund").prop("disabled", true);
            $("#btnrefund").removeClass("btnExport2");
            $("#btnrefund").addClass("btnExport2disable");
        }
        else {
            $("#spnerrorrefund").html("");
            $("#idcalculate").val(calculateamount);
            $("#btnrefund").prop("disabled", false);
            $("#btnrefund").removeClass("btnExport2disable");
            $("#btnrefund").addClass("btnExport2");
        }
    }
}
function refund() {
    var data = {}
    data.ServiceRequestId = $("#serReqIdtoRefund").val();
    data.RefundAmount = parseFloat($("#ramount").html()) + parseFloat($("#idcalculate").val());
    $("#dvLoader").addClass("is-active");
    $.ajax({
        type: 'post',
        url: '/Admin/refundAmount',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            $("#dvLoader").removeClass("is-active");
            if (response > 0) {
                $("#refundAmountAdminPanelModal").modal("hide");
                showAdminPanelServiceRequestsData();
                Swal.fire({
                    icon: 'success',
                    title: 'Amout Refunded Successfully!!',
                    text: 'Refunded Service Request Id: ' + $("#serReqIdtoRefund").val() + "!!"
                });
            }
        },
        error: function (response) {
            $("#dvLoader").removeClass("is-active");
            console.log("adminJS.js->refund error: " + response.responseText);
        }
    });
}