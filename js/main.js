

$(function() {
    // CROPPIE //
    let cropThumbnail = document.getElementById("crop-image-thumbnail");
    
    var croppie = new Croppie(document.getElementById('crop-image'), {
        showZoomer: true
    });
    
    document.getElementById("button-crop-image").addEventListener("click", function() {
        cropThumbnail.style.visibility = "visible";
        
        croppie.result({
            type: 'base64',
            size: {width: 200, height: 200},
        }).then((newSrc) => {
            cropThumbnail.setAttribute("src", newSrc); // Preview
        });
    });
    
    document.getElementById("button-crop-confirm").addEventListener("click", function() {
        document.getElementById("crop-container").style.visibility = "hidden";
        cropThumbnail.setAttribute("src", "");
        cropThumbnail.style.visibility = "hidden";
        
        croppie.result({
            type: 'base64',
            size: {width: 200, height: 200},
        }).then((newSrc) => {
            croppedElement.childNodes[0].setAttribute("src", newSrc);
        });
    });
    
    document.getElementById("button-crop-cancel").addEventListener("click", function() {
        croppedElement.childNodes[0].setAttribute("src", cropThumbnail.src);
        document.getElementById("crop-container").style.visibility = "hidden";
        cropThumbnail.style.visibility = "hidden";
    });
    
    
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
        $(this).css('z-index', 1);
    });
    
    $("#add-image").on({
        mouseenter: function() {
            $(this).css('border', '5px solid mediumturquoise');
            $(this).css('color', 'mediumturquoise');
        },
        mouseleave: function() {
            $(this).css('border', '0px solid transparent');
            $(this).css('color', 'black');
        },
        dragover: function() {
            $(this).css('border', '5px solid mediumturquoise');
            $(this).css('color', 'mediumturquoise');
        },
        dragleave: function() {
            $(this).css('border', '0px solid transparent');
            $(this).css('color', 'black');
        },
        drop: function() {
            $(this).css('border', '0px solid transparent');
            $(this).css('color', 'black');
        }
    });
    
    $("#delete-zone").on({
        mouseleave: function() {
            $(this).css('border', '2px dashed grey');
            $(this).css('color', 'black');
        },
        dragover: function() {
            $(this).css('border', '5px solid crimson');
            $(this).css('color', 'crimson');
        },
        dragleave: function() {
            $(this).css('border', '2px dashed grey');
            $(this).css('color', 'black');
        },
        drop: function() {
            $(this).css('border', '2px dashed grey');
            $(this).css('color', 'black');
        }
    });
    //----------//
    
    /* ADD NEW TIER */
    let divTierNumber = 5;
    
    // Default colors
    let defaultTierColors = ["#dc143c", "#ff8c00", "#ffd700", "#4bd74b", "#4bb4dc", "#da70d6"];
    for (let i = 0; i < defaultTierColors.length; i++) {
        document.querySelector(`#tier-title-${i}`).parentElement.style.backgroundColor = defaultTierColors[i];
    }
    
    // Get dragged tier ID
    let tiers = document.querySelectorAll(".tier");
    tiers.forEach(element => {
        element.childNodes[1].addEventListener("mousedown", function() {
            draggedElement = element;
        })
    });
    
    // Add a Tier
    let buttonAddTier = document.querySelector("#add-tier");
    buttonAddTier.addEventListener("click", function() {
        divTierNumber += 1;
        let divTier = document.createElement("div");
        divTier.setAttribute("class", "tier");
        divTier.setAttribute("id", `tier-${divTierNumber}`);
        divTier.setAttribute("style", "background-color : #ccc;");
        divTier.setAttribute("title", "Click to edit");
        
        let dragTierIcon = document.createElement("span");
        dragTierIcon.setAttribute("class", "material-symbols-outlined handle");
        dragTierIcon.setAttribute("data-html2canvas-ignore", "");
        dragTierIcon.innerText = "drag_indicator";
        
        let buttonColorPicker = document.createElement("button");
        buttonColorPicker.setAttribute("class", "color-picker");
        buttonColorPicker.setAttribute("title", "Pick a color!");
        buttonColorPicker.setAttribute("data-html2canvas-ignore", "");
        
        // let inputColorPicker = document.createElement("input");
        // inputColorPicker.setAttribute("type", "color");
        // inputColorPicker.setAttribute("value", "#ffffff");
        // inputColorPicker.setAttribute("class", "color-picker");
        // inputColorPicker.setAttribute("title", "Pick a color!");
        // inputColorPicker.setAttribute("data-html2canvas-ignore", "");
        
        let divTierTitle = document.createElement("div");
        divTierTitle.setAttribute("class", "tier-title");
        divTierTitle.setAttribute("id", `tier-title-${divTierNumber}`);
        divTierTitle.innerText = "New Tier";
        
        let divTierImages = document.createElement("div");
        divTierImages.setAttribute("class", "images-sort");
        divTierImages.setAttribute("id", `images-sort-${divTierNumber}`);
        
        let divTierList = document.querySelector("#tier-list");
        
        divTierList.appendChild(divTier);
        divTier.appendChild(dragTierIcon);
        divTier.appendChild(buttonColorPicker);
        // divTier.appendChild(inputColorPicker);
        divTier.appendChild(divTierTitle);
        divTier.appendChild(divTierImages);
        new JSColor(buttonColorPicker, {onInput: `update(this, \'#tier-${divTierNumber}\')`, value: "#fff"});
        
        dragTierIcon.addEventListener("mousedown", function() {
            draggedElement = divTier;
        })
        
        // updateColorPickers();
        updateTierTitles();
        updateSortables();
    });
    //----------//
    
    //----- ADD IMAGES -----//
    let tierImageId = 0; 
    let croppedElement;
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
                    img.setAttribute("originalsrc", img.getAttribute("src"));
                    img.title = files[i].name;
                    ul.appendChild(li);
                    li.appendChild(img);
                    li.addEventListener("dragstart", function() {
                        draggedElement = li;
                    });
                    li.addEventListener("dblclick", function() {
                        croppedElement = li;
                        cropThumbnail.setAttribute("src", croppedElement.childNodes[0].src);
                        croppedElement.childNodes[0].src = croppedElement.childNodes[0].getAttribute("originalsrc");
                        croppie.bind({
                            url : croppedElement.childNodes[0].src
                        });
                        var imageCaption = croppedElement.childNodes[0].getAttribute("title");
                        document.getElementById("tier-image-title").innerText = imageCaption;
                        document.getElementById("crop-container").style.visibility = "visible";
                    });
                });
                reader.readAsDataURL(files[i]);
            }
        } else {
            alert("Your browser does not support File API");
        }
    });
    //----------//
    
    //----- DELETE ONE TIER / IMAGE -----//
    let deleteZone = document.querySelector("#delete-zone");
    let draggedElement;
    
    deleteZone.ondrop = function(){
        draggedElement.remove();
    };
    
    //----------//
    
    //----- DELETE ALL IMAGES -----//
    const deleteAllTierImages = document.querySelector("#delete-all-images");
    deleteAllTierImages.addEventListener("click", function() { 
        if (confirm("This will delete ALL the images that you uploaded. Are you sure?")) {
            let allTierImages = document.querySelectorAll(".tier-image");
            allTierImages.forEach(element => {     
                element.remove();
            });
        }
    });
    
    //----------//
    
    //----- TEXT EDITS -----//
    // Tier List title
    var tierListName = "My-TierList";
    $(document).on("click", "#tier-list-title", function() {
        var current = $(this).text();
        $("#tier-list-title").html(`<input id="newcont" placeholder="${current}" style="width:100%"></input>`);
        $("#newcont").focus();
        $("#newcont").focus().blur(function() {
            tierListName = $("#newcont").val();
            if (tierListName == "") {
                $("#tier-list-title").text("My Tier List");
            } else {
                $("#tier-list-title").text(tierListName);
            }
        });
    })
    
    // Image caption
    var tierImageTitle = document.getElementById("tier-image-title");
    let firstClickCaption = true;
    tierImageTitle.addEventListener("click", function() {
        if (firstClickCaption) {
            firstClickCaption = false;
            var currentImageCaption = croppedElement.childNodes[0].getAttribute("title");
            tierImageTitle.innerHTML = (`<input id="input-image-caption" placeholder="${currentImageCaption}"></input>`);
            var inputImageCaption = document.getElementById("input-image-caption");
            inputImageCaption.focus();
            inputImageCaption.value = currentImageCaption;
            inputImageCaption.select();
            tierImageTitle.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {                    
                    if (inputImageCaption.value == "") {
                        tierImageTitle.innerHTML = currentImageCaption;
                    } else {
                        croppedElement.childNodes[0].setAttribute("title", inputImageCaption.value);
                        tierImageTitle.innerHTML = inputImageCaption.value;
                        firstClickCaption = true;
                    }
                }
                if (event.key === "Escape") {
                    tierImageTitle.innerHTML = currentImageCaption;
                    firstClickCaption = true;
                }
            });
        }
    });
    
    // Tier title
    let tierTitles = document.querySelectorAll(".tier-title");
    let tierTitlesArray = new Array;
    let firstClick = true;
    updateTierTitles();
    function updateTierTitles() {
        tierTitles = document.querySelectorAll(".tier-title");
        tierTitlesArray = new Array;
        
        for (let i = 0; i < tierTitles.length; i++) {
            tierTitlesArray.push("#" + tierTitles[i].getAttribute("id"));
        }
        
        tierTitlesArray.forEach(element => {
            $(document).on("click", element, function() {
                var current = $(this).text();
                if (firstClick) {
                    $(element).html(`<textarea id="newcont" style="width:100px; height:90px;">${current}</textarea>`);
                    $("#newcont").focus();
                    $("#newcont").select()
                    firstClick = false;
                } 
                $("#newcont").focus().blur(function() {
                    var newcont = $("#newcont").val();
                    $(element).text(newcont);
                    firstClick = true;
                });
            })
        });
    }
    //----------//
    
    /* COLOR PICKER */
    let colorPickers = document.querySelectorAll(".color-picker");
    console.log(colorPickers)
    updateColorPickers();
    function updateColorPickers() {
        colorPickers = document.querySelectorAll(".color-picker");
        colorPickers.forEach(element => {
            element.addEventListener("input", function() { 
                element.parentElement.style.backgroundColor = event.target.value;
            });
        });
    }
    //----------//
    
    //----- DOWNLOAD TIER LIST AS JPG -----//
    $( "#download-tier-list" ).on( "click", function() {
        html2canvas(document.querySelector("#to-download")).then(canvas => {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, `${tierListName}.jpg`);
            });
        });
    });
    //----------//
    
});
