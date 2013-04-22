$(document).ready(function(){

    function add_google_logo() {
        var src = "http://mlkshk.com/r/IVGC";
        show_image("http://mlkshk.com/r/IVGC", 276,110, "U Mad Bro");
    
    }



    function show_image(src, width, height, alt) {
        var img = document.createElement("img");
        img.src = src;
        img.width = width;
        img.height = height;
        img.alt = alt;
        document.body.appendChild(img);
    }
    $("#picButton").click(function(){
        add_google_logo();
    });

});