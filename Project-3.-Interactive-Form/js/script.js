// Hides the "Other" job role input 
$('#other-title').hide();
//Reveals the "Other" job role input if "other" option chosen
if ($('#title option:selected').text() === "Other"){
    $('#other-title').show();
}