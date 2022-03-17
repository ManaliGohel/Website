$(document).ready(function () {
    //$(".chosen").chosen();
    showAdminPanelServiceRequestsData();
    showAdminPanelUserManagementData();
    //fillAvailableZipcodes();
    //fillCustomers();
    //fillServiceProviders();
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
                    colActions += "<a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#'>Edit & Reschedule</a></li><li><a class='dropdown-item' href='#'>Cancel</a></li></ul></div>";
                }
                else {
                    colActions += "<div class='onHover threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></div>";
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
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#'>Deactivate</a></li></ul></div>";
                    }
                    else {
                        colStatus = "<label class='lblserstatus inactive py-1 px-3'>Inactive</label>";
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#'>Activate</a></li></ul></div>";
                    }
                }
                else {
                    UserType = "Service Provider";
                    if (v.isApproved == true) {
                        colStatus = "<label class='lblserstatus active py-1 px-3'>Approved</label>";
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#'>Disapprove</a></li></ul></div>";
                    }
                    else {
                        colStatus = "<label class='lblserstatus inactive py-1 px-3'>Not Approved</label>";
                        colActions = "<div class='py-0 dropstart dropstart'><a href='#' id='ddActions' role='button' data-bs-toggle='dropdown' aria-expanded='false'><div class='threeVerDotMenuLayer d-flex justify-content-center align-items-center'><div class='threeVerDotMenu'></div></div></a><ul class='dropdown-menu p-3 ddActions' aria-labelledby='ddActions'><li><a class='dropdown-item' href='#'>Approve</a></li></ul></div>";
                    }
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
                    var min = new Date(parseInt($("#dtFromDateAdminPanelSR").val().toString().split('-')[0]), parseInt(parseInt($("#dtFromDateAdminPanelSR").val().toString().split('-')[1]) - 1), parseInt($("#dtFromDateAdminPanelSR").val().toString().split('-')[2]), 0, 0, 0, 0);
                    var max = new Date(parseInt($("#dtToDateAdminPanelSR").val().toString().split('-')[0]), parseInt(parseInt($("#dtToDateAdminPanelSR").val().toString().split('-')[1]) - 1), parseInt($("#dtToDateAdminPanelSR").val().toString().split('-')[2]), 0, 0, 0, 0);
                    var date = new Date(parseInt(data[1].toString().trim().split(' ')[0].split('/')[2]), parseInt(parseInt(data[1].toString().trim().split(' ')[0].split('/')[1]) - 1), parseInt(data[1].toString().trim().split(' ')[0].split('/')[0]), 0, 0, 0, 0);
                    var inputtagdate = AppendZero(AppendZero((date.getMonth() + 1).toString()) + "-" + date.getDate().toString()) + "-" + date.getFullYear().toString();
                    if (
                        (min === null && max === null) ||
                        (min === null && date <= max) ||
                        (min <= date && max === null) ||
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
        tblSerReq.columns(0).search($("#txtSRIdAdminPanelSR").val()).draw();
    }
    else {
        tblSerReq.columns(0).search("").draw();
    }
    if ($("#txtZipcodeAdminPanelSR").val().trim() != "") {
        tblSerReq.columns(2).search($("#txtZipcodeAdminPanelSR").val()).draw();
    }
    else {
        tblSerReq.columns(2).search("").draw();
    }
    if ($("#txtCustomerAdminPanelSR").val().trim() != "") {
        tblSerReq.columns(2).search($("#txtCustomerAdminPanelSR").val()).draw();
    }
    else {
        tblSerReq.columns(2).search("").draw();
    }
    if ($("#txtSPAdminPanelSR").val().trim() != "") {
        tblSerReq.columns(3).search($("#txtSPAdminPanelSR").val()).draw();
    } 
    else {
        tblSerReq.columns(3).search("").draw();
    }
    tblSerReq.columns(4).search($("#selSerStatusAdminPanel").val()).draw();
}
function filterInAdminPanelUserManagement() {
    var tblUserManagement = $("#tblUserManagement").DataTable();
    jQuery.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var min = new Date(parseInt($("#dtFromDateAdminPanelUM").val().toString().split('-')[0]), parseInt(parseInt($("#dtFromDateAdminPanelUM").val().toString().split('-')[1]) - 1), parseInt($("#dtFromDateAdminPanelUM").val().toString().split('-')[2]), 0, 0, 0, 0);
            var max = new Date(parseInt($("#dtToDateAdminPanelUM").val().toString().split('-')[0]), parseInt(parseInt($("#dtToDateAdminPanelUM").val().toString().split('-')[1]) - 1), parseInt($("#dtToDateAdminPanelUM").val().toString().split('-')[2]), 0, 0, 0, 0);
            var date = new Date(parseInt(data[1].toString().split('/')[2]), parseInt(parseInt(data[1].toString().split('/')[1]) - 1), parseInt(data[1].toString().split('/')[0]), 0, 0, 0, 0);
            if (
                (min === null && max === null) ||
                (min === null && date <= max) ||
                (min <= date && max === null) ||
                (min <= date && date <= max)
            ) {
                console.log('success');
                return true;
            }
            else {
                console.log('error');
                return false;
            }
        }
    );
    tblUserManagement.draw();
}
function AppendZero(input) {
    if (input.length == 1) {
        return '0' + input;
    }
    return input;
}
document.getElementById("dtFromDateAdminPanelSR").addEventListener('change', function (e) {
    if (!document.getElementById("dtFromDateAdminPanelSR").value)
        document.getElementById("spndtToDateAdminPanelSR").innerHTML = "";
    else
        document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
});
document.getElementById("dtToDateAdminPanelSR").addEventListener('change', function (e) {
    if (!document.getElementById("dtToDateAdminPanelSR").value)
        document.getElementById("spndtFromDateAdminPanelSR").innerHTML = "";
    else
        document.getElementById("spndtToDateAdminPanelSR").innerHTML = "";
});

//function fillAvailableZipcodes() {
//    $("#dvLoader").addClass("is-active");
//    $.ajax({
//        type: 'get',
//        url: "/Admin/getAvailablePostalCodes",
//        success: function (data) {
//            $("#dvLoader").removeClass("is-active");
//            $('#selAvailableZipcodes').empty();
//            $('#selAvailableZipcodes').append('<option value="Zipcode" selected>Zipcode</option>');
//            $.each(data, function (i, v) {
//                $('#selAvailableZipcodes').append('<option value="' + v + '">' + v + '</option>');
//            });
//        },
//        error: function (response) {
//            $("#dvLoader").removeClass("is-active");
//            console.log("adminJS.js->fillAvailableZipcodes error: " + response.responseText);
//        }
//    });
//}
//function fillCustomers() {
//    $("#dvLoader").addClass("is-active");
//    $.ajax({
//        type: 'get',
//        url: "/Admin/getCustomers",
//        success: function (data) {
//            $("#dvLoader").removeClass("is-active");
//            $('#selCustomers').empty();
//            $('#selCustomers').append('<option value="Customer" selected>Customer</option>');
//            $.each(data, function (i, v) {
//                $('#selCustomers').append('<option value="' + v + '">' + v + '</option>');
//            })
//        },
//        error: function (response) {
//            $("#dvLoader").removeClass("is-active");
//            console.log("adminJS.js->fillCustomers error: " + response.responseText);
//        }
//    });
//}
//function fillServiceProviders() {
//    $("#dvLoader").addClass("is-active");
//    $.ajax({
//        type: 'get',
//        url: "/Admin/getServiceProviders",
//        success: function (data) {
//            $("#dvLoader").removeClass("is-active");
//            $('#selServiceProviders').empty();
//            $('#selServiceProviders').append('<option value="Service provider" selected>Service provider</option>');
//            $.each(data, function (i, v) {
//                $('#selServiceProviders').append('<option value="' + v + '">' + v + '</option>');
//            })
//        },
//        error: function (response) {
//            $("#dvLoader").removeClass("is-active");
//            console.log("adminJS.js->fillServiceProviders error: " + response.responseText);
//        }
//    });
//}
