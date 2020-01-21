$( "#form1" ).submit(function( event ) {
    event.preventDefault();

    var gsac = $("#measurement").val();
    var scale = $("#dropdownMenuButton").html(); 
    if(scale == "cm"){
        gsac = parseInt(parseFloat(gsac)*10);
    }
    console.log(gsac)
    loadJSON(function(response) {
        // Parse JSON string into object
        var data = JSON.parse(response);
        
        table = data.G_SAC_DATA.G_SAC_TABLE_MM;
        table.forEach(element => {
            if(element.gsac == gsac){
                alert("Gestational Age :"+ element.gage);
                return;
            }
        });
        
    });

});

$(".dropdown-menu a").click(function(){
    var selText = $(this).text();
    
    $("#dropdownMenuButton").html(selText); 
  });

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'G_SAC_DATA.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
 }