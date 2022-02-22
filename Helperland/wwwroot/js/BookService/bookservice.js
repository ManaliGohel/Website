var _serviceHourlyRate = 18;

function checkAvailabilityOfSP() {
    var spnAvailability = document.getElementById("spnCheckAvailability");
    spnAvailability.innerHTML = "";
    var zipcode = document.getElementById("txtzipcode").value.trim();    
    if (zipcode.length > 0) {
        if (zipcode.length < 6) {
            spnAvailability.innerHTML = "Enter valid Postal Code!!";
        }
        else {
            $.ajax({
                type: "post",
                url: "/BookService/checkAvailabilitySP",
                data: { "zipcode": zipcode },
                success: function (response) {
                    if (response) {
                        showSchedulePlanBlock(); 
                        document.getElementById("spnBasicSerHours").innerHTML = 3;
                        document.getElementById("totalSerHours").innerHTML = 3;
                        document.getElementById("spnpercleaningrate").innerHTML = (_serviceHourlyRate*3);
                        document.getElementById("spntotalpayment").innerHTML = (_serviceHourlyRate*3);                        
                    }
                    else {
                        spnAvailability.innerHTML = "We are not providing service in this area. We’ll notify you if any Helper would start working near your area!!";
                    }
                },
                error: function (response) {
                    alert("error: " + response.responseText);
                }
            })
        }        
    }
    else {
        spnAvailability.innerHTML = "Enter Postal Code!!";
    }
}
function opentbYourDetailsBS() {
    showDetailsBlock();
    setPostalCodeandCities();
    getAllUserAddressesbyPostalcode();
    document.getElementById("btnAddNewAddress").classList.remove("d-none");
    document.getElementById("btnAddNewAddress").classList.add("d-block");
    document.getElementById("dvAddNewAddress").classList.remove("d-block");
    document.getElementById("dvAddNewAddress").classList.add("d-none");
}
function opentbMakePaymentBS() {
    showPaymentBlock();
}

function setSessionVar(varName, varValue) {
    $.ajax({
        type: "post",
        url: "/BookService/setSessionVarValue",
        data: { "varName": varName, "varValue": varValue },
        success: function () {},
        error: function (response) {
            alert("error: " + response.responseText);
        }
    })
}

function showSetupServiceBlock() {                
    var setupser = document.getElementById("lnk-setup-service");
    var scheduleplan = document.getElementById("lnk-schedule-plan");
    var details = document.getElementById("lnk-details");
    var makepay = document.getElementById("lnk-make-payment");
    scheduleplan.removeAttribute("onclick");
    scheduleplan.classList.remove('active-setupcleaningsertab-temp');
    details.removeAttribute("onclick");
    details.classList.remove('active-setupcleaningsertab-temp'); 
    setupser.classList.remove('nonactive-setupcleaningsertab');
    setupser.classList.add('active-setupcleaningsertab');
    scheduleplan.classList.remove('active-setupcleaningsertab');
    scheduleplan.classList.add('nonactive-setupcleaningsertab');
    details.classList.remove('active-setupcleaningsertab');
    details.classList.add('nonactive-setupcleaningsertab');
    makepay.classList.remove('active-setupcleaningsertab');
    makepay.classList.add('nonactive-setupcleaningsertab');
    document.getElementById("dv-setup-service").style.display = "block";
    document.getElementById("dv-schedule-plan").style.display = "none";
    document.getElementById("dv-details").style.display = "none";
    document.getElementById("dv-make-payment").style.display = "none";
    document.getElementById("img-setser").style.display = "none";
    document.getElementById("img-setser-white").style.display = "block";
    document.getElementById("img-scheduleplan").style.display = "block";
    document.getElementById("img-scheduleplan-white").style.display = "none";
    document.getElementById("img-details").style.display = "block";
    document.getElementById("img-details-white").style.display = "none";
    document.getElementById("img-makepay").style.display = "block";
    document.getElementById("img-makepay-white").style.display = "none";
}

function showSchedulePlanBlock() {
    document.getElementById("lnk-setup-service").setAttribute("onclick", "showSetupServiceBlock();");
    var setupser = document.getElementById("lnk-setup-service");
    var scheduleplan = document.getElementById("lnk-schedule-plan");
    var details = document.getElementById("lnk-details");
    var makepay = document.getElementById("lnk-make-payment");
    details.removeAttribute("onclick");                                
    details.classList.remove('active-setupcleaningsertab-temp'); 
    setupser.classList.remove('active-setupcleaningsertab');            
    setupser.classList.add('active-setupcleaningsertab-temp');          
    scheduleplan.classList.remove('nonactive-setupcleaningsertab');
    scheduleplan.classList.add('active-setupcleaningsertab');
    details.classList.remove('active-setupcleaningsertab');
    details.classList.add('nonactive-setupcleaningsertab');
    makepay.classList.remove('active-setupcleaningsertab');
    makepay.classList.add('nonactive-setupcleaningsertab');
    document.getElementById("dv-setup-service").style.display = "none";
    document.getElementById("dv-schedule-plan").style.display = "block";
    document.getElementById("dv-details").style.display = "none";
    document.getElementById("dv-make-payment").style.display = "none";
    document.getElementById("img-scheduleplan").style.display = "none";
    document.getElementById("img-scheduleplan-white").style.display = "block";
    document.getElementById("img-details").style.display = "block";
    document.getElementById("img-details-white").style.display = "none";
    document.getElementById("img-makepay").style.display = "block";
    document.getElementById("img-makepay-white").style.display = "none";
}
function showDetailsBlock() {
    document.getElementById("lnk-schedule-plan").setAttribute("onclick", "showSchedulePlanBlock();");
    var setupser = document.getElementById("lnk-setup-service");
    var scheduleplan = document.getElementById("lnk-schedule-plan");
    var details = document.getElementById("lnk-details");
    var makepay = document.getElementById("lnk-make-payment");
    setupser.classList.remove('active-setupcleaningsertab');
    setupser.classList.add('nonactive-setupcleaningsertab');
    scheduleplan.classList.remove('active-setupcleaningsertab');            
    scheduleplan.classList.add('active-setupcleaningsertab-temp');            
    details.classList.remove('nonactive-setupcleaningsertab');
    details.classList.add('active-setupcleaningsertab');
    makepay.classList.remove('active-setupcleaningsertab');
    makepay.classList.add('nonactive-setupcleaningsertab');
    document.getElementById("dv-setup-service").style.display = "none";
    document.getElementById("dv-schedule-plan").style.display = "none";
    document.getElementById("dv-details").style.display = "block";
    document.getElementById("dv-make-payment").style.display = "none";
    document.getElementById("img-details").style.display = "none";
    document.getElementById("img-details-white").style.display = "block";
    document.getElementById("img-makepay").style.display = "block";
    document.getElementById("img-makepay-white").style.display = "none";
}
function showPaymentBlock() {
    document.getElementById("lnk-details").setAttribute("onclick", "showDetailsBlock();");
    var setupser = document.getElementById("lnk-setup-service");
    var scheduleplan = document.getElementById("lnk-schedule-plan");
    var details = document.getElementById("lnk-details");
    var makepay = document.getElementById("lnk-make-payment");
    setupser.classList.remove('active-setupcleaningsertab');
    setupser.classList.add('nonactive-setupcleaningsertab');
    scheduleplan.classList.remove('active-setupcleaningsertab');
    scheduleplan.classList.add('nonactive-setupcleaningsertab');
    details.classList.remove('active-setupcleaningsertab');            
    details.classList.add('active-setupcleaningsertab-temp');            
    makepay.classList.remove('nonactive-setupcleaningsertab');
    makepay.classList.add('active-setupcleaningsertab');
    document.getElementById("dv-setup-service").style.display = "none";
    document.getElementById("dv-schedule-plan").style.display = "none";
    document.getElementById("dv-details").style.display = "none";
    document.getElementById("dv-make-payment").style.display = "block";
    document.getElementById("img-makepay").style.display = "none";
    document.getElementById("img-makepay-white").style.display = "block";
}
function initialyExtraServices() {
    document.getElementById("ser-cabinet-selected").style.display = "none";
    document.getElementById("ser-cabinet").style.display = "block";
    document.getElementById("ser-fridge-selected").style.display = "none";
    document.getElementById("ser-fridge").style.display = "block";
    document.getElementById("ser-oven-selected").style.display = "none";
    document.getElementById("ser-oven").style.display = "block";
    document.getElementById("ser-laundry-selected").style.display = "none";
    document.getElementById("ser-laundry").style.display = "block";
    document.getElementById("ser-windows-selected").style.display = "none";
    document.getElementById("ser-windows").style.display = "block";
    document.getElementById("dv-ser-cabinet").classList.remove("serselected-border");
    document.getElementById("dv-ser-fridge").classList.remove("serselected-border");
    document.getElementById("dv-ser-oven").classList.remove("serselected-border");
    document.getElementById("dv-ser-laundry").classList.remove("serselected-border");
    document.getElementById("dv-ser-windows").classList.remove("serselected-border");
    document.getElementById("dv-insidecabinets").style.display = "none";
    document.getElementById("dv-insidefridge").style.display = "none";
    document.getElementById("dv-insideoven").style.display = "none";
    document.getElementById("dv-insidelaundry").style.display = "none";
    document.getElementById("dv-interiorwindows").style.display = "none";
    document.getElementById("hdnselectedserhoursindex").value = document.getElementById("selserhours").selectedIndex;
}

function isvalidSerTimeHours() {    
    if ((parseFloat(document.getElementById('seltimeforser').value) + parseFloat(document.getElementById('selserhours').value)) > 20) {
        $("#spnInvalidSertimeErr").text("Booking change not saved! Helper must be able to finish cleaning by 8pm. Please try again!!").fadeIn(3000);
        document.getElementById("btnContinueSetupSertoDetails").classList.add("btndisable");
        document.getElementById("btnContinueSetupSertoDetails").disabled = true;
    }
    else {
        $("#spnInvalidSertimeErr").text("");
        document.getElementById("btnContinueSetupSertoDetails").classList.remove("btndisable");
        document.getElementById("btnContinueSetupSertoDetails").disabled = false;
    }
    document.getElementById("spnSerTime").innerHTML = document.getElementById("seltimeforser").options[document.getElementById("seltimeforser").selectedIndex].text;
    isSufficientTimeforSer();
}

function setDateinPS() {
    let d = new Date(document.getElementById("dtSerDate").value);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    document.getElementById('spnSerDate').innerHTML = (`${da}-${mo}-${ye}`);    
}

var sercount = 0;
var extraServices = [];
function selectUnselectSerCabinet() {
    if (document.getElementById("dv-ser-cabinet").classList.contains('serselected-border')) {
        document.getElementById("ser-cabinet-selected").style.display = "none";
        document.getElementById("ser-cabinet").style.display = "block";
        document.getElementById("dv-ser-cabinet").classList.remove("serselected-border");
        sercount--;
        document.getElementById("dv-insidecabinets").style.display = "none";
        document.getElementById("selserhours").selectedIndex--;
        extraServices.splice(extraServices.indexOf("InsideCabinets"), 1);
    }
    else {
        if ((document.getElementById("selserhours").selectedIndex) < ($('#selserhours  option').length - 1) && (parseFloat(document.getElementById('seltimeforser').value) + parseFloat(document.getElementById('selserhours').value)) < 20) {
            document.getElementById("ser-cabinet-selected").style.display = "block";
            document.getElementById("ser-cabinet").style.display = "none";
            document.getElementById("dv-ser-cabinet").classList.add("serselected-border");
            sercount++;
            document.getElementById("dv-insidecabinets").style.display = "block";
            document.getElementById("selserhours").selectedIndex++;
            extraServices.push("InsideCabinets");
        }
        else {
            $("#spnInvalidSertimeErr").text("You cant't select extra services! Helper must be able to finish cleaning by 8pm!!").fadeIn(1000).fadeOut(5000);
        }
    }
    selectedExtraSers();
}
function selectUnselectSerFridge() {
    if (document.getElementById("dv-ser-fridge").classList.contains('serselected-border')) {
        document.getElementById("ser-fridge-selected").style.display = "none";
        document.getElementById("ser-fridge").style.display = "block";
        document.getElementById("dv-ser-fridge").classList.remove("serselected-border");
        sercount--;
        document.getElementById("dv-insidefridge").style.display = "none";
        document.getElementById("selserhours").selectedIndex--;
        extraServices.splice(extraServices.indexOf("InsideFridge"), 1);
    }
    else {
        if ((document.getElementById("selserhours").selectedIndex) < ($('#selserhours  option').length - 1) && (parseFloat(document.getElementById('seltimeforser').value) + parseFloat(document.getElementById('selserhours').value)) < 20) {
            document.getElementById("ser-fridge-selected").style.display = "block";
            document.getElementById("ser-fridge").style.display = "none";
            document.getElementById("dv-ser-fridge").classList.add("serselected-border");
            sercount++;
            document.getElementById("dv-insidefridge").style.display = "block";
            document.getElementById("selserhours").selectedIndex++;
            extraServices.push("InsideFridge");
        }
        else {
            $("#spnInvalidSertimeErr").text("You cant't select extra services! Helper must be able to finish cleaning by 8pm!!").fadeIn(1000).fadeOut(3000);
        }   
    }
    selectedExtraSers();
}
function selectUnselectSerOven() {
    if (document.getElementById("dv-ser-oven").classList.contains('serselected-border')) {
        document.getElementById("ser-oven-selected").style.display = "none";
        document.getElementById("ser-oven").style.display = "block";
        document.getElementById("dv-ser-oven").classList.remove("serselected-border");
        sercount--;
        document.getElementById("dv-insideoven").style.display = "none";
        document.getElementById("selserhours").selectedIndex--;
        extraServices.splice(extraServices.indexOf("InsideOven"), 1);
    }
    else {
        if ((document.getElementById("selserhours").selectedIndex) < ($('#selserhours  option').length - 1) && (parseFloat(document.getElementById('seltimeforser').value) + parseFloat(document.getElementById('selserhours').value)) < 20) {
            document.getElementById("ser-oven-selected").style.display = "block";
            document.getElementById("ser-oven").style.display = "none";
            document.getElementById("dv-ser-oven").classList.add("serselected-border");
            sercount++;
            document.getElementById("dv-insideoven").style.display = "block";
            document.getElementById("selserhours").selectedIndex++;
            extraServices.push("InsideOven");
        }
        else {
            $("#spnInvalidSertimeErr").text("You cant't select extra services! Helper must be able to finish cleaning by 8pm!!").fadeIn(1000).fadeOut(3000);
        }        
    }
    selectedExtraSers();
}
function selectUnselectSerLaundry() {
    if (document.getElementById("dv-ser-laundry").classList.contains('serselected-border')) {
        document.getElementById("ser-laundry-selected").style.display = "none";
        document.getElementById("ser-laundry").style.display = "block";
        document.getElementById("dv-ser-laundry").classList.remove("serselected-border");
        sercount--;
        document.getElementById("dv-insidelaundry").style.display = "none";
        document.getElementById("selserhours").selectedIndex--;
        extraServices.splice(extraServices.indexOf("LaundryWashAndDry"), 1);
    }
    else {
        if ((document.getElementById("selserhours").selectedIndex) < ($('#selserhours  option').length - 1) && (parseFloat(document.getElementById('seltimeforser').value) + parseFloat(document.getElementById('selserhours').value)) < 20) {
            document.getElementById("ser-laundry-selected").style.display = "block";
            document.getElementById("ser-laundry").style.display = "none";
            document.getElementById("dv-ser-laundry").classList.add("serselected-border");
            sercount++;
            document.getElementById("dv-insidelaundry").style.display = "block";
            document.getElementById("selserhours").selectedIndex++;
            extraServices.push("LaundryWashAndDry");
        }
        else {
            $("#spnInvalidSertimeErr").text("You cant't select extra services! Helper must be able to finish cleaning by 8pm!!").fadeIn(1000).fadeOut(3000);
        }        
    }
    selectedExtraSers();
}
function selectUnselectSerWindows() {
    if (document.getElementById("dv-ser-windows").classList.contains('serselected-border')) {
        document.getElementById("ser-windows-selected").style.display = "none";
        document.getElementById("ser-windows").style.display = "block";
        document.getElementById("dv-ser-windows").classList.remove("serselected-border");
        sercount--;
        document.getElementById("dv-interiorwindows").style.display = "none";
        document.getElementById("selserhours").selectedIndex--;
        extraServices.splice(extraServices.indexOf("InteriorWindows"), 1);
    }
    else {
        if ((document.getElementById("selserhours").selectedIndex) < ($('#selserhours  option').length - 1) && (parseFloat(document.getElementById('seltimeforser').value) + parseFloat(document.getElementById('selserhours').value)) < 20) {
            document.getElementById("ser-windows-selected").style.display = "block";
            document.getElementById("ser-windows").style.display = "none";
            document.getElementById("dv-ser-windows").classList.add("serselected-border");
            sercount++;
            document.getElementById("dv-interiorwindows").style.display = "block";
            document.getElementById("selserhours").selectedIndex++;
            extraServices.push("InteriorWindows");
        }
        else {
            $("#spnInvalidSertimeErr").text("You cant't select extra services! Helper must be able to finish cleaning by 8pm!!").fadeIn(1000).fadeOut(3000);
        }        
    }
    selectedExtraSers();
}
function selectedExtraSers() { 
    if (sercount == 0) {
        document.getElementById("dv-extrasers").classList.remove("d-block"); 
        document.getElementById("dv-extrasers").classList.add("d-none");        
    }
    else { 
        document.getElementById("dv-extrasers").classList.remove("d-none");
        document.getElementById("dv-extrasers").classList.add("d-block");
    }
    document.getElementById("totalSerHours").innerHTML = document.getElementById("selserhours").value;
    document.getElementById("spnpercleaningrate").innerHTML = (parseFloat(document.getElementById("totalSerHours").innerHTML) * _serviceHourlyRate);
    document.getElementById("spntotalpayment").innerHTML = (parseFloat(document.getElementById("totalSerHours").innerHTML) * _serviceHourlyRate);
    document.getElementById("spnBasicSerHours").innerHTML = (parseFloat(document.getElementById("selserhours").value) - parseFloat(sercount * 0.5));    
    document.getElementById("hdnselectedserhoursindex").value = document.getElementById("selserhours").selectedIndex;
}

function isSufficientTimeforSer() {
    document.getElementById("hdnclearextrasers").value = '';
    if (parseFloat(document.getElementById("selserhours").value) >= parseFloat(3 + (sercount * 0.5))) {
        document.getElementById("hdnselectedserhoursindex").value = document.getElementById("selserhours").selectedIndex;
        document.getElementById("totalSerHours").innerHTML = document.getElementById("selserhours").value;
        document.getElementById("spnpercleaningrate").innerHTML = (parseFloat(document.getElementById("totalSerHours").innerHTML) * _serviceHourlyRate);
        document.getElementById("spntotalpayment").innerHTML = (parseFloat(document.getElementById("totalSerHours").innerHTML) * _serviceHourlyRate);
        document.getElementById("spnBasicSerHours").innerHTML = (parseFloat(document.getElementById("selserhours").value) - parseFloat(sercount * 0.5));
    }
    else {
        if (document.getElementById("selserhours").selectedIndex == 0) {
            document.getElementById("hdnclearextrasers").value = 'true';  
        }
        document.getElementById("selserhours").selectedIndex = parseInt(document.getElementById("hdnselectedserhoursindex").value);
        var confirmsertimeModal = new bootstrap.Modal(document.getElementById('confirmsertimeModal'));
        confirmsertimeModal.show();        
    }
}
function clearExtraServices() {
    if (document.getElementById("hdnclearextrasers").value == 'true') {
        document.getElementById("dv-extrasers").classList.remove("d-block");
        document.getElementById("dv-extrasers").classList.add("d-none");
        document.getElementById("totalSerHours").innerHTML = 3;
        document.getElementById("spnpercleaningrate").innerHTML = (_serviceHourlyRate*3);
        document.getElementById("spntotalpayment").innerHTML = (_serviceHourlyRate*3);
        document.getElementById("spnBasicSerHours").innerHTML = 3;
        initialyExtraServices();
        document.getElementById("selserhours").selectedIndex = 0;
        document.getElementById("hdnclearextrasers").value = 0;
        sercount = 0;
    }
    else {
        document.getElementById("selserhours").selectedIndex = sercount;
        document.getElementById("totalSerHours").innerHTML = document.getElementById("selserhours").value;
        document.getElementById("spnpercleaningrate").innerHTML = (parseFloat(document.getElementById("totalSerHours").innerHTML) * _serviceHourlyRate);
        document.getElementById("spntotalpayment").innerHTML = (parseFloat(document.getElementById("totalSerHours").innerHTML) * _serviceHourlyRate);
        document.getElementById("spnBasicSerHours").innerHTML = (parseFloat(document.getElementById("selserhours").value) - parseFloat(sercount * 0.5));
    }
    document.getElementById("hdnselectedserhoursindex").value = document.getElementById("selserhours").selectedIndex;
    $('#confirmsertimeModal').modal('hide');
}

function showAddNewAddressBlock() {
    document.getElementById("btnAddNewAddress").classList.remove("d-block");
    document.getElementById("btnAddNewAddress").classList.add("d-none");
    document.getElementById("dvAddNewAddress").classList.remove("d-none");
    document.getElementById("dvAddNewAddress").classList.add("d-block");
}
function showAddNewAddressBtn() {
    document.getElementById("txtStreetName").value = "";
    document.getElementById("txtHouseNumber").value = "";
    document.getElementById("txtMobile").value = "";
    document.getElementById("spnMobile").innerHTML = "";
    document.getElementById("btnAddNewAddress").classList.remove("d-none");
    document.getElementById("btnAddNewAddress").classList.add("d-block");
    document.getElementById("dvAddNewAddress").classList.remove("d-block");
    document.getElementById("dvAddNewAddress").classList.add("d-none");
}

function setPostalCodeandCities() {    
    document.getElementById("txtPostalCode").value = document.getElementById("txtzipcode").value;
    $.ajax({
        type: 'get',
        url: "/BookService/getAllCitiesByPostalCode",
        data: { "postalcode": document.getElementById("txtPostalCode").value },
        success: function (data) {
            if (data != null) {
                $('#selcityfornewadd').empty();
                var count = 0;
                $.each(data, function (i, v) {
                    if (count == 0) {
                        $('#selcityfornewadd').append('<option value="' + v.state + '" selected>' + v.city + '</option>')
                        count++;
                    }
                    else {
                        $('#selcityfornewadd').append('<option value="' + v.state + '">' + v.city + '</option>')
                    }
                });
            }
        },
        error: function (response) {
            alert("error: " + response.responseText);
        }
    });
}
function getAllUserAddressesbyPostalcode() {
    document.getElementById("dvcontainer-useraddresses").innerHTML = "";
    $.ajax({
        type: "get",
        url: "/BookService/getAllUserAddressesbyPostalcode",
        data: { "postalcode": document.getElementById("txtPostalCode").value },
        dataType: "json",
        success: function (data) {
            if (data == "") {
                document.getElementById("btnContinuetoMakepayment").classList.add("btndisable");
                document.getElementById("btnContinuetoMakepayment").disabled = true;
            }
            else {
                document.getElementById("btnContinuetoMakepayment").classList.remove("btndisable");
                document.getElementById("btnContinuetoMakepayment").disabled = false;
                var strAddresses = "";
                var count = 0;
                $.each(data, function (i, v) {
                    if (count == 0) {
                        strAddresses += "<div class='dvuseradd mb-2 px-4 py-3'><div style='float:left;' class='me-3 mt-3'><input type='radio' checked class='rbuseradd' name='rbuseradd' id='rbuseradd" + v.addressId + "' value='" + v.addressId + "' /></div><div><div><span class='fw-bold'>Address: </span>" + v.addressLine1 + " " + v.addressLine2 + ", " + v.city + " " + v.postalCode + "</div><div><span class='point fw-bold'>Phone number: </span>" + v.mobile + "</div></div></div>";
                        count++;
                    }
                    else {
                        strAddresses += "<div class='dvuseradd mb-2 px-4 py-3'><div style='float:left;' class='me-3 mt-3'><input type='radio' class='rbuseradd' name='rbuseradd' id='rbuseradd" + v.addressId + "' value='" + v.addressId + "' /></div><div><div><span class='fw-bold'>Address: </span>" + v.addressLine1 + " " + v.addressLine2 + ", " + v.city + " " + v.postalCode + "</div><div><span class='point fw-bold'>Phone number: </span>" + v.mobile + "</div></div></div>";
                    }
                });
                document.getElementById("dvcontainer-useraddresses").innerHTML = strAddresses;
            }
        },
        error: function (response) {
            alert("error: " + response.responseText);
        }
    })
}

function saveUserNewAddress() {
    var count = 0;
    if (document.getElementById("txtStreetName").value.length > 0) {
        document.getElementById("spnStreetName").innerHTML = "";
        count++;
    }
    else {
        document.getElementById("spnStreetName").innerHTML = "Enter Street name!!";
        count--;
    }
    if (document.getElementById("txtHouseNumber").value.length > 0) {
        document.getElementById("spnHouseNumber").innerHTML = "";
        count++;
    }
    else {
        document.getElementById("spnHouseNumber").innerHTML = "Enter House number!!";
        count--;
    }
    if (document.getElementById("txtMobile").value.length > 0) {        
        if (document.getElementById("txtMobile").value.length < 10) {
            document.getElementById("spnMobile").innerHTML = "Enter valid Mobile number!!";
            count--;
        }
        else {
            document.getElementById("spnMobile").innerHTML = "";
            count++;
        }
    }
    else {
        document.getElementById("spnMobile").innerHTML = "Enter Mobile number!!";
        count--;
    }
    if (count == 3) {
        var data = {
            addressLine1: document.getElementById("txtStreetName").value,
            addressLine2: document.getElementById("txtHouseNumber").value,
            state: document.getElementById("selcityfornewadd").value,
            city: document.getElementById("selcityfornewadd").options[document.getElementById("selcityfornewadd").selectedIndex].text,
            postalCode: document.getElementById("txtPostalCode").value,
            mobile: document.getElementById("txtMobile").value
        };
        $.ajax({
            type: "post",
            dataType: "JSON",
            data: JSON.stringify(data),
            contentType: "application/json",
            url: "/BookService/addNewAddress",
            success: function (response) {
                if (response > 0) {
                    getAllUserAddressesbyPostalcode();
                    setPostalCodeandCities();
                    showAddNewAddressBtn();
                }
            },
            error: function (response) {
                alert("error: " + response.responseText);
            }
        })    
    }
}

function bookService() {
    var completeBooking = {};
    completeBooking.ServiceStartDate = document.getElementById("dtSerDate").value
    var myarr = document.getElementById("seltimeforser").value.split(".");
    if (myarr.length > 1) {
        completeBooking.ServiceStartTime = myarr[0] + ":30";
    }
    else {
        completeBooking.ServiceStartTime = myarr[0] + ":00";
    }
    completeBooking.ZipCode = document.getElementById("txtzipcode").value;
    completeBooking.ServiceHourlyRate = _serviceHourlyRate;
    completeBooking.ServiceHours = document.getElementById("totalSerHours").innerHTML;
    completeBooking.ExtraHours = parseFloat(document.getElementById("totalSerHours").innerHTML) - parseFloat(document.getElementById("spnBasicSerHours").innerHTML);
    completeBooking.ExtraServicesName = extraServices; 
    completeBooking.SubTotal = document.getElementById("spnpercleaningrate").innerHTML;
    completeBooking.TotalCost = document.getElementById("spntotalpayment").innerHTML;
    completeBooking.Comments = document.getElementById("txtareaComments").value;
    completeBooking.HasPets = document.getElementById("cbhavePets").checked;
    completeBooking.UserAddressID = $("input[type='radio'][name='rbuseradd']:checked").val();
    console.log(completeBooking);
    $.ajax({
        url: "/BookService/saveBookServiceRequest",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(completeBooking),
        success: function (response) {
            if (response > 0) {
                showCompleteBooking(response);
            }
        },
        error: function (response) {
            console.log("bookService() error: " + response.responseText);
        }
    });
}

function showCompleteBooking(servicereqid) {
    Swal.fire({
        icon: 'success',
        title: 'Booking has been successfully submitted!!',
        text: 'Service Request Id: ' + servicereqid + "!!"
    }).then(function () {
        window.location = "/customer/servicehistory";
    });
}