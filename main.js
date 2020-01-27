$("#measurement").on('change', function(){
    calculate()
});

function calculate(){
    $("#gage").val("weeks");
    var measurement = parseFloat($("#measurement").val());
    if (measurement == 0) return; 
    var cat = $("#categoryButton").html().trim();
    var scale = $("#scaleButton").html().trim(); 

    if(scale == "cm"){
        measurement = parseInt(measurement*10);
    }

    // console.log(gsac)
    loadJSON(function(response) {
        // Parse JSON string into object
        var data = JSON.parse(response);
        
        if(cat=="CRL"){
            mn = parseFloat(data.DATA.tables[0].min)
            mx = parseFloat(data.DATA.tables[0].max)
            if (measurement<mn || measurement>mx){
                $("#gage").val("weeks");
                alert("Not in range!");
                
                return;
            }
                
            
            table = data.DATA.CRL_TABLE_MM;
            table.forEach(element => {
                if(parseInt(element.crl) == measurement){
                    
                    $("#gage").val(element.gage +" weeks");
                    return;
                }
            });
        }else{
            mn = parseFloat(data.DATA.tables[1].min)
            mx = parseFloat(data.DATA.tables[1].max)
            if (measurement<mn || measurement>mx){
                $("#gage").val("weeks");
                alert("Not in range!");
                return;
            }
            table = data.DATA.G_SAC_TABLE_MM;
            table.forEach(element => {
                if(parseInt(element.gsac) == measurement){
                    
                    $("#gage").val(element.gage +" weeks");
                    return;
                }
            });
        }

        
        
    });
}

$("#categoryDropdown a").click(function(){
    var selText = $(this).text();
    // console.log(selText)
    $("#categoryButton").html(selText);
    calculate(); 
  });

  $("#scaleDropdown a").click(function(){
    var selText = $(this).text();
    // console.log(selText)
    $("#scaleButton").html(selText);
    calculate(); 
  });

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'DATA.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
 }