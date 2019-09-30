// Hides the "Other" job role input 
$('#other-title').hide();

//Reveals the "Other" job role input if "other" option chosen
$('#title').change(function(){

     if ($('#title option:selected').text() === "Other"){
         $('#other-title').show();
     }   else {
                $('#other-title').hide();
             }
});

//Adds feild “Please select a T-shirt theme”
$('#color').prepend('<option>Please select a T-shirt theme</option>');
$('#color option').eq(1).attr('selected', true);
$('#color option').eq(1).removeAttr('selected');

//Displays the T-shirt color options that match
//the design selected in the "Design" menu.
$('#design').change(function(event){
// Displays T-shirt colors of corresponded design 
    $('#color').each(function(){
        if ($(event.target).val() === "js puns"){
            $("#color option:contains('Please select')").hide();
            $("#color option:contains('I ♥ JS')").hide();     
            $("#color option:contains('JS Puns')").show(); 
        } else if ($(event.target).val() === "heart js"){
            $("#color option:contains('Please select')").hide();        
            $("#color option:contains('JS Puns')").hide();
            $("#color option:contains('I ♥ JS')").show();           
        }
        else {
            $("#color option:contains('Please select')").show();
            $("#color option:contains('JS Puns')").show(); 
            $("#color option:contains('I ♥ JS')").show();
        }
    });
});