$(document).ready(function(){
    
    function searchActivity(){
        let allType = ["education", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
        
        var num = Math.floor(Math.random()*6)+1
        console.log(num);
    
        let boredType = allType[num];
        console.log(boredType);

    let boredURL= "https://www.boredapi.com/api/activity?participants=1&type=" + boredType;

    $.ajax({
        url:boredURL,
        method:"GET"
    }).then(function(response){
        console.log(response);

        $("#boredActivity").text(response.activity);

    })

    };

    $("#boredBtn").on("click",function(){
   
        searchActivity()

    })

    $("#selected").change(function(){
    
        console.log($(this).val());
        var selected = $(this).val();
        location.href="index.html#" + selected;
    })

    var button = $("#burgerButton")

    button.on("click", function(){
        $(".navbar-menu").toggleClass("is-active");
        $(".navbar-burger").toggleClass("is-active");
    })



})
