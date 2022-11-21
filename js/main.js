import Sortable from '/node_modules/sortablejs/modular/sortable.complete.esm.js';

$(function() {
    //----- SORTABLE -----//
    var el = document.getElementById('images-list');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        dragClass: "sortable-drag",
        group: 'list'
    });
    
    var el = document.getElementById('s-tier');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        dragClass: "sortable-drag",
        group: 'list',
    });
    
    var el = document.getElementById('a-tier');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        dragClass: "sortable-drag",
        group: 'list'
    });
    
    var el = document.getElementById('b-tier');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        dragClass: "sortable-drag",
        group: 'list'
    });
    
    var el = document.getElementById('c-tier');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        dragClass: "sortable-drag",
        group: 'list'
    });
    
    var el = document.getElementById('d-tier');
    new Sortable(el, {
        animation: 200,
        swapThreshold: 1,
        dragClass: "sortable-drag",
        group: 'list'
    });
    //----------//
    
    //----- ZOOM ON MOUSECLICK -----//
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
    
    //----- TOOLTIP -----//
    $( document ).tooltip({
        show: {
            delay: 500
        },
        position: {
            my: "center bottom-20px",
            at: "center top",
        },
        // track: true
    });
    
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
    $(document).on("dblclick", "#edit-tier-s", function(){
        var current = $(this).text();
        $("#edit-tier-s").html(`<textarea class="form-control" id="newcont" style="width:100px;">${current}</textarea>`);
        $("#newcont").focus();
        
        $("#newcont").focus(function() {
            console.log('in');
        }).blur(function() {
             var newcont = $("#newcont").val();
             $("#edit-tier-s").text(newcont);
        });
    })

    $(document).on("dblclick", "#edit-tier-a", function(){
        var current = $(this).text();
        $("#edit-tier-a").html(`<textarea class="form-control" id="newcont" style="width:100px;">${current}</textarea>`);
        $("#newcont").focus();
        
        $("#newcont").focus(function() {
            console.log('in');
        }).blur(function() {
            var newcont = $("#newcont").val();
            $("#edit-tier-a").text(newcont);
        });
    })

    $(document).on("dblclick", "#edit-tier-b", function(){
        var current = $(this).text();
        $("#edit-tier-b").html(`<textarea class="form-control" id="newcont" style="width:100px;">${current}</textarea>`);
        $("#newcont").focus();
        
        $("#newcont").focus(function() {
            console.log('in');
        }).blur(function() {
             var newcont = $("#newcont").val();
             $("#edit-tier-b").text(newcont);
        });
    })

    $(document).on("dblclick", "#edit-tier-c", function(){
        var current = $(this).text();
        $("#edit-tier-c").html(`<textarea class="form-control" id="newcont" style="width:100px;">${current}</textarea>`);
        $("#newcont").focus();
        
        $("#newcont").focus(function() {
            console.log('in');
        }).blur(function() {
             var newcont = $("#newcont").val();
             $("#edit-tier-c").text(newcont);
        });
    })

    $(document).on("dblclick", "#edit-tier-d", function(){
        var current = $(this).text();
        $("#edit-tier-d").html(`<textarea class="form-control" id="newcont" style="width:100px;">${current}</textarea>`);
        $("#newcont").focus();
        
        $("#newcont").focus(function() {
            console.log('in');
        }).blur(function() {
             var newcont = $("#newcont").val();
             $("#edit-tier-d").text(newcont);
        });
    })
    //----------//
});

