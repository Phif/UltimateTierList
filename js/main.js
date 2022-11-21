import Sortable from '/node_modules/sortablejs/modular/sortable.complete.esm.js';

$(function() {
    //----- SORTABLE -----//
    var ele = document.getElementById('tier-list-id');
    new Sortable(ele, {
        animation: 200,
        swapThreshold: 1,
    });
    
    let sortableElements = new Array('images-list', 's-tier', 'a-tier', 'b-tier', 'c-tier', 'd-tier');
    sortableElements.forEach(element => {
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
    let tierTitles = new Array("#edit-tier-s", "#edit-tier-a", "#edit-tier-b", "#edit-tier-c", "#edit-tier-d");
    tierTitles.forEach(element => {
        $(document).on("dblclick", element, function(){
            var current = $(this).text();
            $(element).html(`<textarea class="form-control" id="newcont" style="width:100px; height:100px;">${current}</textarea>`);
            $("#newcont").focus();
            
            $("#newcont").focus().blur(function() {
                var newcont = $("#newcont").val();
                $(element).text(newcont);
            });
        })
    });
    
    // Tierlist title
    $(document).on("dblclick", "#tierlist-title", function(){
        var current = $(this).text();
        $("#tierlist-title").html(`<input class="form-control" id="newcont" placeholder="${current}" style="width:100%"></input>`);
        $("#newcont").focus();
        
        $("#newcont").focus().blur(function() {
            var newcont = $("#newcont").val();
            if (newcont == "") {
                $("#tierlist-title").text("Double-click to edit tier list title");
            } else {
                $("#tierlist-title").text(newcont);
            }
        });
    })
    
    
    
    
    //----------//
    
});

