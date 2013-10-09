function checkPreAuth() {
    
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    console.log("handleLogin");
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
    /*
        $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
    */
            alert(res);
            var res = true;	/* condição sempre verdadeira*/
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;
                $.mobile.changePage("travels.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
    /*}
    	,"json");
    	navigator.notification.alert("Your login failed", function() {}); 
    */
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

/*
$(index.html).ready(function(){
	$("#loginPage").on("pageinit",function() {
		console.log("pageinit run");
		$("#loginForm").on("submit",handleLogin);
		checkPreAuth();
	});
	
	$.mobile.changePage("#loginPage");
});
*/
