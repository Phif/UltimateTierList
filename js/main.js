import Sortable from '/node_modules/sortablejs/modular/sortable.complete.esm.js';

$(function() {
    //----- SORTABLE -----//
    
    var el = document.querySelector('#tier-list');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        handle: ".handle"
    });
    
    let imageSortable = document.querySelectorAll(".images-sort");
    let imageSortableArray = new Array;
    for (let i = 0; i < imageSortable.length; i++) {
        imageSortableArray.push(imageSortable[i].getAttribute("id"));
    }

    imageSortableArray.forEach(element => {
        var el = document.getElementById(element);
        new Sortable(el, {
            animation: 200,
            swapThreshold: 1,
            group: 'list'
        });
    });
    //----------//
    
    
    //----- TOOLTIP -----//
    // $( document ).tooltip({
    //     show: {
    //         delay: 0
    //     },
    //     position: {
    //         my: "center bottom-30px",
    //         at: "center top",
    //     },
    //     track: true
    // });
    //----------//
    
    
    //----- MOUSE EVENTS -----//
    $(document).on("mouseleave", ".tier-images", function() {
        $(this).css('z-index', 0);
    });
    
    $(document).on("mousedown", ".tier-images", function() {
        $(this).css('transition', 'transform ease-in-out 0.2s');
        $(this).css('transform', 'scale(' + 2 + ')');
        $(this).css('z-index', 2);
    });
    
    $(document).on("mouseup", ".tier-images", function() {
        $(this).css('transition', 'all ease-in-out 0.2s');
        $(this).css('transform', 'scale(' + 1 + ')');
        $(this).css('z-index', 0);
    });
    //----------//
    
    //----- ADD IMAGES -----//
    document.querySelector("#input-file").addEventListener("change", (e) => { 
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            const files = e.target.files; 
            const ul = document.querySelector("#images-list");
            for (let i = 0 ; i < files.length ; i++) {
                if (!files[i].type.match("image")) continue;
                const reader = new FileReader();
                reader.addEventListener("load", function (event) {
                    const addedFile = event.target;
                    const li = document.createElement("li");
                    li.setAttribute("class", "tier-images");
                    const img = document.createElement("img");
                    img.src = addedFile.result;
                    img.title = files[i].name;
                    ul.appendChild(li);
                    li.appendChild(img);
                });
                reader.readAsDataURL(files[i]);
                
            }
        } else {
            alert("Your browser does not support File API");
        }
    });
    //----------//
    
    
    //----- DOUBLE CLICK TO EDIT -----//
    // Tier title
    let tierTitles = document.querySelectorAll(".tier-title");
    let tierTitlesArray = new Array;
    updateTierTitles();
    function updateTierTitles() {
        tierTitles = document.querySelectorAll(".tier-title");
        tierTitlesArray = new Array;

        for (let i = 0; i < tierTitles.length; i++) {
            tierTitlesArray.push("#" + tierTitles[i].getAttribute("id"));
        }
        
        tierTitlesArray.forEach(element => {
            $(document).on("click", element, function(){
                var current = $(this).text();
                $(element).html(`<textarea class="form-control" id="newcont" style="width:100px; height:100px;">${current}</textarea>`);
                $("#newcont").focus();
                $("#newcont").focus().blur(function() {
                    var newcont = $("#newcont").val();
                    $(element).text(newcont);
                });
            })
        });
    }
    
    // Tierlist title
    $(document).on("click", "#tier-list-title", function(){
        var current = $(this).text();
        $("#tier-list-title").html(`<input class="form-control" id="newcont" placeholder="${current}" style="width:100%"></input>`);
        $("#newcont").focus();
        $("#newcont").focus().blur(function() {
            var newcont = $("#newcont").val();
            if (newcont == "") {
                $("#tier-list-title").text("Double-click to edit tier list title");
            } else {
                $("#tier-list-title").text(newcont);
            }
        });
    })
    //----------//
    
    /* COLOR PICKER */
    let colorPickers = document.querySelectorAll(".color-picker");
    updateColorPickers();
    function updateColorPickers() {
        colorPickers = document.querySelectorAll(".color-picker");
        colorPickers.forEach(element => {
            element.addEventListener("input", function(){ 
                element.parentElement.style.backgroundColor = event.target.value;
            });
        });
    }
    //----------//
    
    /* ADD NEW TIER */
    let divTierNumber = 5;
    
    // Default colors
    document.querySelector("#tier-title-0").parentElement.style.backgroundColor = "#b20022";
    document.querySelector("#tier-title-1").parentElement.style.backgroundColor = "#ff7f00";
    document.querySelector("#tier-title-2").parentElement.style.backgroundColor = "#e5e52e";
    document.querySelector("#tier-title-3").parentElement.style.backgroundColor = "#71dc56";
    document.querySelector("#tier-title-4").parentElement.style.backgroundColor = "#5eb1d4";
    document.querySelector("#tier-title-5").parentElement.style.backgroundColor = "#d45eba";

    let buttonAddTier = document.querySelector("#add-tier");
    buttonAddTier.addEventListener("click", function() {
        divTierNumber += 1;
        let divTier = document.createElement("div");
        divTier.setAttribute("class", "tier");
        divTier.setAttribute("id", `tier-${divTierNumber}`);
        divTier.setAttribute("style", "background-color : #ccc;");
        
        let spanIcon = document.createElement("span");
        spanIcon.setAttribute("class", "material-symbols-outlined handle");
        spanIcon.innerText = "drag_indicator";
        
        let inputColorPicker = document.createElement("input");
        inputColorPicker.setAttribute("type", "color");
        inputColorPicker.setAttribute("value", "#ffffff");
        inputColorPicker.setAttribute("class", "color-picker");
        
        let divTierTitle = document.createElement("div");
        divTierTitle.setAttribute("class", "tier-title");
        divTierTitle.setAttribute("id", `tier-title-${divTierNumber}`);
        divTierTitle.innerText = "New Tier";
        
        let divTierImages = document.createElement("div");
        divTierImages.setAttribute("class", "image-sort");
        
        let divTierList = document.querySelector("#tier-list");
        
        divTierList.appendChild(divTier);
        divTier.appendChild(spanIcon);
        divTier.appendChild(inputColorPicker);
        divTier.appendChild(divTierTitle);
        divTier.appendChild(divTierImages);
        
        updateColorPickers();
        updateTierTitles();
    });

});

