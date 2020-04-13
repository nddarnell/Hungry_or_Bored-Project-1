$(document).ready(function(){
    
    let modalInner = document.querySelector(".modal-inner");
    let modalOuter = document.querySelector(".modal-outer");
    //Listing call
    let currentSelection = "";
    let listingurl = "https://api.spoonacular.com/recipes/search?number=5&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
    buildList(listingurl);
    $("#homeMeal").on("click", function(){
        currentSelection = $(".is-hovered").val()
        let listingurl = "https://api.spoonacular.com/recipes/search?query=" + currentSelection + "&number=5&instructionsRequired=true&apiKey=b1c4692acbe74405a4cfce6b5a43950d"
        console.log(listingurl);
        buildList(listingurl);
    });
    $("#top-drop").change(function() {
        var val = $(this).val();
        if (val == "item1") {
            $("#main-drop").html("<option value='test'>item1: test 1</option><option value='test2'>item1: test 2</option>");
        } else if (val == "item2") {
            $("#main-drop").html("<option value='test'>item2: test 1</option><option value='test2'>item2: test 2</option>");

        } else if (val == "item3") {
            $("#main-drop").html("<option value='test'>item3: test 1</option><option value='test2'>item3: test 2</option>");
        }
    });
    function buildList(listingurl){
        $.ajax({
            url: listingurl,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            $("#recipe-append").empty();
            for (let i = 0; i < 5; i++){
                let recipeName = response.results[i].title;
                let recipeCookTime = response.results[i].readyInMinutes;
                let baseUri = response.baseUri;
                let recipePhoto = response.results[i].image;
                let id = response.results[i].id;
                let recipeDiv = $("<div>");
                recipeDiv.addClass("level notification recipe-list");
                let recipeImg = $("<img>").attr("src", baseUri + recipePhoto);
                recipeDiv.attr("data-value", id);
                recipeImg.addClass("recipe-image-styles");
                recipeDiv.append(recipeImg);
                let recipeNameh2 = $("<h2>").text(recipeName);
                recipeDiv.append(recipeNameh2);
                let recipeTimeP = $("<p>").text("Total cook time: " + recipeCookTime + " minutes");
                recipeDiv.append(recipeTimeP);
                $("#recipe-append").append(recipeDiv);
            }
        });


    }
    
    
    $("#recipe-append").on("click",".recipe-list", function(){
        let recipeId = $(this).data("value");
        let specificurl = "https://api.spoonacular.com/recipes/" + recipeId + "/analyzedInstructions?apiKey=b1c4692acbe74405a4cfce6b5a43950d";
        console.log(recipeId);
        specificRecipe(specificurl);
        $("#append-recipe-details").empty();
    });
    
    function closeModal(){
        modalOuter.classList.remove('open');
    }
    
    modalOuter.addEventListener('click', function(event){
        const isOutside = !event.target.closest('.modal-inner');
        if (isOutside) {
            modalOuter.classList.remove('open');
        }
    })
    
    //Specific URL call
    function specificRecipe(specificurl){
        $.ajax({
            url: specificurl,
            method: 'GET',
        }).then(function(response){
            console.log(response[0].steps);
            modalOuter.classList.add('open');
            let stepOl = $("<ol>");
            $("#append-recipe-details").append(stepOl)
        for (let i = 0; i < response[0].steps.length; i++){
        let step = response[0].steps[i].step;
        let currentStep = $("<li>").text(step);
        stepOl.append(currentStep);

        }
        //Pop up modal
        //Add recipe content inside
        
    });
}

        
    
});  
   
