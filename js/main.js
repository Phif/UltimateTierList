// import Sortable from '/node_modules/sortablejs/modular/sortable.complete.esm.js';

$(function() {
    //----- SORTABLE -----//
    var el = document.querySelector('#tier-list');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        handle: ".handle",
    });
    
    let imageSortable = document.querySelectorAll(".images-sort");
    let imageSortableArray = new Array;
    updateSortables();
    
    function updateSortables() {
        imageSortable = document.querySelectorAll(".images-sort");
        imageSortableArray = new Array;
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
        
    }
    
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
    $(document).on("mouseleave", ".tier-image", function() {
        $(this).css('z-index', 1);
    });
    
    $(document).on("mousedown", ".tier-image", function() {
        $(this).css('transition', 'transform ease-in-out 0.2s');
        $(this).css('transition-delay', '0.2s');
        $(this).css('transition-property', 'transform');
        $(this).css('transform', 'scale(' + 2 + ')');
        $(this).css('z-index', 2);
    });
    
    $(document).on("mouseup", ".tier-image", function() {
        $(this).css('transition-delay', '0s');
        $(this).css('transition', 'all ease-in-out 0.2s');
        // $(this).css('transform', 'scale(' + 1 + ')');
        $(this).css('z-index', 1);
    });
    //----------//
    
    //----- ADD IMAGES -----//

    let tierImageId = 0; 
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
                    li.setAttribute("class", "tier-image");
                    li.setAttribute("id", `tier-image-${tierImageId}`);
                    tierImageId += 1;
                    const img = document.createElement("img");
                    img.src = addedFile.result;
                    img.title = files[i].name;
                    ul.appendChild(li);
                    li.appendChild(img);
                    li.addEventListener("dragstart", function(){
                        draggedElement = li;
                    })
                });
                reader.readAsDataURL(files[i]);
            }
        } else {
            alert("Your browser does not support File API");
        }
    });
    //----------//
    
    //----- DELETE ONE IMAGE -----//
    let deleteZone = document.querySelector("#delete-image");
    let draggedElement;
    
    deleteZone.ondrop = function(){
        draggedElement.remove();
    };
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
                $(element).html(`<textarea id="newcont" style="width:100px; height:90px;">${current}</textarea>`);
                $("#newcont").focus();
                $("#newcont").select()
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
        $("#tier-list-title").html(`<input id="newcont" placeholder="${current}" style="width:100%"></input>`);
        $("#newcont").focus();
        $("#newcont").focus().blur(function() {
            var newcont = $("#newcont").val();
            if (newcont == "") {
                $("#tier-list-title").text("Click to edit your Tier List's title");
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
    let defaultTierColors = ["#cc0044", "#ff7f00", "#e5e52e", "#71dc56", "#5eb1d4", "#d45eba"];
    for (let i = 0; i < defaultTierColors.length; i++) {
        document.querySelector(`#tier-title-${i}`).parentElement.style.backgroundColor = defaultTierColors[i];
    }
    
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
        inputColorPicker.setAttribute("title", "Pick a color!");
        
        let divTierTitle = document.createElement("div");
        divTierTitle.setAttribute("class", "tier-title");
        divTierTitle.setAttribute("id", `tier-title-${divTierNumber}`);
        divTierTitle.innerText = "New Tier";
        
        let divTierImages = document.createElement("div");
        divTierImages.setAttribute("class", "images-sort");
        divTierImages.setAttribute("id", `images-sort-${divTierNumber}`);
        
        let divTierList = document.querySelector("#tier-list");
        
        divTierList.appendChild(divTier);
        divTier.appendChild(spanIcon);
        divTier.appendChild(inputColorPicker);
        divTier.appendChild(divTierTitle);
        divTier.appendChild(divTierImages);
        
        updateColorPickers();
        updateTierTitles();
        updateSortables();
    });
    
    
    
    
});
