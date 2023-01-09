$(function() {
    //----- UUID -----//
    function createUUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    
    //----- SHOW/HIDE CAPTIONS -----//
    var isCaptionOn = false;
    toggleCaptionOff();
    
    document.getElementById("toggle-image-captions").addEventListener("click", function() {
        let captionArray = document.querySelectorAll(".caption");
        
        if (isCaptionOn) {
            captionArray.forEach(element => {
                element.style.visibility = "hidden";
            });
            toggleCaptionOff();
        } else {
            captionArray.forEach(element => {
                element.style.visibility = "visible";
            });
            toggleCaptionOn();
        }
    })
    
    function toggleCaptionOn() {
        document.getElementById("toggle-image-captions").childNodes[1].innerHTML = "subtitles";
        document.getElementById("toggle-image-captions").style.backgroundColor = "#4bd74b";
        document.getElementById("toggle-image-captions").setAttribute("title", "Hide image captions");
        isCaptionOn = true;
    }
    
    function toggleCaptionOff() {
        document.getElementById("toggle-image-captions").childNodes[1].innerHTML = "subtitles_off";
        document.getElementById("toggle-image-captions").style.backgroundColor = "white";
        document.getElementById("toggle-image-captions").setAttribute("title", "Display image captions");
        isCaptionOn = false;
    }
    //----------//
    
    
    //----- CROPPIE -----// 
    var croppie = new Croppie(document.getElementById('crop-image'), {
        showZoomer: false
    });
    
    // Confirm
    document.getElementById("button-crop-confirm").addEventListener("click", function() {
        if (croppedElement.childNodes[0].getAttribute("originalsrc").match(/data:image\/gif/gi)) {
            if (confirm("Cropping this GIF will turn it into a standard image with no animations. This change can't be reverted unless you reupload the image.\nAre you sure?")) {
                executeCropping();
            }
        } else {
            executeCropping();
        }
    });
    
    function executeCropping() {
        document.getElementById("crop-container").style.visibility = "hidden";
        
        croppie.result({
            type: 'base64',
            size: {width: 200, height: 200},
        }).then((newSrc) => {
            croppedElement.childNodes[0].setAttribute("src", newSrc);
        });
    }
    
    // Delete
    document.getElementById("button-crop-delete").addEventListener("click", function() {
        croppedElement.remove();
        document.getElementById("crop-container").style.visibility = "hidden";
    });
    
    // Quit
    document.getElementById("button-crop-cancel").addEventListener("click", function() {
        quitCropping();
    });
    
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && (document.getElementById("crop-container").style.visibility == "visible")) {
            quitCropping();
        }
    })
    
    function quitCropping() {
        document.getElementById("crop-container").style.visibility = "hidden";
        isCaptionClickable = true;
    }
    //----------//
    
    
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
    //----------//
    
    
    //----- ADD TIER -----//
    let draggedElement;
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
        
        let divTierOptions = document.createElement("div");
        divTierOptions.setAttribute("class", "tier-options");
        
        let deleteTierIcon = document.createElement("span");
        deleteTierIcon.setAttribute("class", "material-symbols-rounded delete-tier");
        deleteTierIcon.innerText = "close";
        
        let dragTierIcon = document.createElement("span");
        dragTierIcon.setAttribute("class", "material-symbols-rounded handle");
        dragTierIcon.innerText = "drag_indicator";
        
        let hiddenTierIcon = document.createElement("span");
        hiddenTierIcon.setAttribute("class", "material-symbols-rounded hidden");
        hiddenTierIcon.innerText = "close";
        
        let buttonColorPicker = document.createElement("button");
        buttonColorPicker.setAttribute("class", "color-picker");
        buttonColorPicker.setAttribute("title", "Pick a color!");
        buttonColorPicker.setAttribute("data-html2canvas-ignore", "");
        
        let divTierTitle = document.createElement("div");
        divTierTitle.setAttribute("class", "tier-title");
        divTierTitle.setAttribute("id", `tier-title-${divTierNumber}`);
        divTierTitle.setAttribute("title", "Click to edit");
        divTierTitle.innerText = "New Tier";
        
        let divTierImages = document.createElement("div");
        divTierImages.setAttribute("class", "images-sort");
        divTierImages.setAttribute("id", `images-sort-${divTierNumber}`);
        
        let divTierList = document.querySelector("#tier-list");
        
        divTierList.appendChild(divTier);
        divTier.appendChild(divTierOptions);
        divTierOptions.appendChild(deleteTierIcon);
        divTierOptions.appendChild(dragTierIcon);
        divTierOptions.appendChild(hiddenTierIcon);
        divTier.appendChild(buttonColorPicker);
        divTier.appendChild(divTierTitle);
        divTier.appendChild(divTierImages);
        new JSColor(buttonColorPicker, {onInput: `update(this, \'#tier-${divTierNumber}\')`, value: "#fff"});
        
        updateTierTitles();
        updateSortables();
        updateDeleteTier();
    });
    //----------//
    
    //----- ADD IMAGES -----//
    const ul = document.querySelector("#images-list");
    var croppedElement;
    var tierImageId = 0;
    var loadingIndex = 0;
    var loadingMax = 0;
    let imgInput = document.getElementById('input-file');
    
    imgInput.addEventListener('change', function (e) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            let imageFile = e.target.files;
            loadingIndex = 0;
            loadingMax = imageFile.length;
            if (loadingMax != 0) {
                showProcessingImages();
            }
            for (let i = 0; i < imageFile.length; i++) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    const li = document.createElement("li");   
                    li.setAttribute("class", "tier-image");
                    
                    const img = document.createElement("img");
                    img.title = imageFile[i].name.match(/.*(?=\.)/i);     
                    
                    const span = document.createElement("span");
                    span.setAttribute("class", "caption");
                    span.innerText = img.getAttribute("title");
                    if (isCaptionOn) {span.style.visibility = "visible";}
                    
                    img.addEventListener("load", function addImage() {
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        
                        var imageWidth = img.width;
                        var imageHeight = img.height;
                        
                        var maxWidth = 1000;
                        var maxHeight = 1000;
                        
                        if (imageWidth >= imageHeight) {
                            imageWidth = imageWidth*maxHeight/imageHeight;
                            imageHeight = maxHeight;
                        } else {
                            imageHeight = imageHeight*maxWidth/imageWidth;
                            imageWidth = maxWidth;
                        }
                        
                        canvas.setAttribute("width", imageWidth);
                        canvas.setAttribute("height", imageHeight);
                        
                        ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
                        
                        const dataurl = canvas.toDataURL(imageFile[i].type);
                        img.src = dataurl;
                        
                        li.setAttribute("id", `tier-image-${tierImageId}`);
                        img.setAttribute("id", `image-${tierImageId}`)
                        img.setAttribute("originalsrc", img.getAttribute("src"));
                        
                        document.getElementById(`image-${tierImageId}`).style.width = "100px";
                        document.getElementById(`image-${tierImageId}`).style.height = "100px";
                        
                        tierImageId += 1;
                        loadingIndex += 1;
                        
                        updateProcessingImages(loadingIndex, loadingMax)
                        
                        this.removeEventListener("load", addImage);
                    });
                    
                    img.src = e.target.result;
                    
                    ul.appendChild(li);
                    li.appendChild(img);
                    li.appendChild(span);
                    
                    li.addEventListener("dragstart", function() {
                        draggedElement = li;
                    });
                    li.addEventListener("dblclick", function() {
                        croppedElement = li;
                        croppedElement.childNodes[0].src = croppedElement.childNodes[0].getAttribute("originalsrc");
                        croppie.bind({
                            url : croppedElement.childNodes[0].src
                        });
                        var imageCaption = croppedElement.childNodes[0].getAttribute("title");
                        document.getElementById("tier-image-title").innerText = imageCaption;
                        document.getElementById("crop-container").style.visibility = "visible";
                    });
                    
                }
                reader.readAsDataURL(imageFile[i]);
            }
        }
    });
    
    imgInput.addEventListener('click', function() {
        imgInput.value = '';
    })
    //----------//
    
    
    //----- DELETE A TIER -----//
    updateDeleteTier();
    
    function updateDeleteTier() {
        let deleteTier = document.querySelectorAll(".delete-tier");
        for (let i = 0; i < deleteTier.length; i++) {
            deleteTier[i].addEventListener("click", function() {
                if (confirm("This tier and all the images inside it will be deleted.\nAre you sure?")) {
                    deleteTier[i].parentNode.parentNode.remove();
                }
            })        
        }
    }
    //----------//
    
    
    //----- DELETE ALL IMAGES -----//
    const deleteAllTierImages = document.querySelector("#delete-all-images");
    deleteAllTierImages.addEventListener("click", function() { 
        if (confirm("This will delete ALL the images that you uploaded.\nAre you sure?")) {
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
    
    // Tier title
    let tierTitles = document.querySelectorAll(".tier-title");
    let tierTitlesArray = new Array;
    let isTierTitleClickable = true;
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
                if (isTierTitleClickable) {
                    $(element).html(`<textarea id="newcont" style="width:100px; height:90px;">${current}</textarea>`);
                    $("#newcont").focus();
                    $("#newcont").select()
                    isTierTitleClickable = false;
                } 
                $("#newcont").focus().blur(function() {
                    var newcont = $("#newcont").val();
                    $(element).text(newcont);
                    isTierTitleClickable = true;
                });
            })
        });
    }
    
    // Image caption
    var tierImageTitle = document.getElementById("tier-image-title");
    var isCaptionClickable = true;
    tierImageTitle.addEventListener("click", function() {
        if (isCaptionClickable) {
            isCaptionClickable = false;
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
                        isCaptionClickable = true;
                    } else {
                        croppedElement.childNodes[0].setAttribute("title", inputImageCaption.value);
                        tierImageTitle.innerHTML = inputImageCaption.value;
                        croppedElement.childNodes[1].innerText = inputImageCaption.value;
                        isCaptionClickable = true;
                        showSavedCaption();
                        setTimeout(hideSavedCaption, 2000);
                    }
                }
                if (event.key === "Escape") {
                    tierImageTitle.innerHTML = currentImageCaption;
                    isCaptionClickable = true;
                }
            });
        }
    });
    //----------//
    
    
    //----- TOOLTIPS -----/
    // Caption saved
    var tooltipCaptionSaved = document.createElement("div");
    tooltipCaptionSaved.setAttribute("id", "caption-saved");
    tooltipCaptionSaved.setAttribute("class", "tooltip green");
    tooltipCaptionSaved.innerText = "Image caption saved!";
    document.body.appendChild(tooltipCaptionSaved);
    
    function showSavedCaption() {
        tooltipCaptionSaved.style.transform = "scale(1)";
        tooltipCaptionSaved.style.visibility = "visible";
    }
    function hideSavedCaption() {
        tooltipCaptionSaved.style.transform = "scale(0)";
        tooltipCaptionSaved.style.visibility = "hidden";
    }
    
    // Processing images
    var tooltipProcessingImages = document.createElement("div");
    tooltipProcessingImages.setAttribute("id", "processing-images");
    tooltipProcessingImages.setAttribute("class", "tooltip blue");
    tooltipProcessingImages.innerText = "Processing your image(s)...";
    document.body.appendChild(tooltipProcessingImages);
    var tooltipDotLoading = ".";
    
    function showProcessingImages() {
        tooltipProcessingImages.style.transform = "scale(1)";
        tooltipProcessingImages.style.visibility = "visible";
    }
    function hideProcessingImages() {
        tooltipProcessingImages.style.transform = "scale(0)";
        tooltipProcessingImages.style.visibility = "hidden";
    }
    function updateProcessingImages(current, max) {
        if (current <= max && max != 0) {
            tooltipProcessingImages.innerText = `Processing your image(s)${tooltipDotLoading + tooltipDotLoading.repeat(current%3)} \n ${current} / ${max} \n ${(Math.trunc((current / max)*100))}%`;
        }
        if (current >= max && max != 0) {
            setTimeout(() => {
                max = 0;
                tooltipProcessingImages.setAttribute("class", "tooltip green");
                tooltipProcessingImages.innerText = `${current} image(s) have been successfully imported!`;
                tooltipProcessingImages.style.transform = "scale(1.2)";   
                setTimeout(() => {tooltipProcessingImages.style.transform = "scale(1)";}, 200);         
                setTimeout(hideProcessingImages, 2000);
                setTimeout(() => {tooltipProcessingImages.setAttribute("class", "tooltip blue");}, 2000);
            }, 500);
        }
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
