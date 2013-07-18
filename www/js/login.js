function init() {
    alert("init");
    document.addEventListener("online", onOnline, false);
	document.addEventListener("deviceready", ondeviceReady, false);
	delete init;
}

function checkPreAuth() {
    alert("checkPreAuth");
	console.log("checkPreAuth");
    var form = $("#loginForm");
    alert("passou");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    alert("handleLogin");
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
        $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
            alert(res);
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                $.mobile.changePage("home.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
    document.addEventListener("offline", onOffline, false);
    
	console.log("deviceReady");
	$("#loginPage").on("pageinit",function() {
		console.log("pageinit run");
		$("#loginForm").on("submit",handleLogin);
		checkPreAuth();
	});
	$.mobile.changePage("#loginPage");
}

// Handle the online event
    //
    function onOnline() {
        showAlert('Device online','connection','Done');
        var time = 2000;
        vibrate(time);
        $("divOffline").hide();
    }

// Handle the offline event
    //
    function onOffline() {
        $("divOffline").show();
        showAlert('Device offline','connection','Done');
    }

// Show a alert
    //
    function showAlert(message, title, buttonName) {
        navigator.notification.alert(
            message,            // message
            title,              // title
            buttonName          // buttonName
        );
    }

    // Beep three times
    //
    function playBeep(amount) {
        navigator.notification.beep(amount);
    }

    // Vibrate for 2 seconds
    //
    function vibrate(time) {
        navigator.notification.vibrate(time);
    }