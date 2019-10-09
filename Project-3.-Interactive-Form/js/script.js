
// Basic Info section

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

// T-shirt section

//Add field “Please select a T-shirt theme”.
$('#color').prepend('<option>Please select a T-shirt theme</option>');
$('#color option').eq(1).attr('selected', true);

//Disable "Color" section
$('#color').each(function(){
    $('#colors-js-puns').hide();
});

//Displays the T-shirt color options that match
//the design selected in the "Design" menu.
$('#design').change(function(event){
    $('#color').each(function(){       
        if ($(event.target).val() === "js puns"){
            $('#colors-js-puns').show();
            $("#color option:contains('Please select')").hide();
            $("#color option:contains('I ♥ JS')").hide();     
            $("#color option:contains('JS Puns')").show(); 
        } else if ($(event.target).val() === "heart js"){
            $('#color option').eq(4).attr('selected', true);
            $('#colors-js-puns').show();
            $("#color option:contains('Please select')").hide();        
            $("#color option:contains('JS Puns')").hide();
            $("#color option:contains('I ♥ JS')").show();           
        }
        else {
            $('#colors-js-puns').hide();
        }
    });
});

//Activities section

//Total cost of chosen activities 
var totalCost = 0;
const totalCostSpan = $('<span> </span>');
$('.activities').append(totalCostSpan);
totalCostSpan.hide();

// Variable for checkboxes input
const activCheckboxes = $('.activities input');

// Clicking on activities will disable competitive activities and add costs to Total Costs
$('.activities').change(function(event){
    $(".error").remove();
    const clicked = event.target;
    const clickedTime = $(clicked).attr('data-day-and-time');

      //Cost of chosen activity
    const clickedCost = parseInt($(clicked).attr('data-cost').match(/\d+/g));

    //Unable selection of a workshop at the same day and time
    for(let i = 0; i<activCheckboxes.length; i++){
        const activCheckboxesTime = $(activCheckboxes[i]).attr('data-day-and-time');
        if (clickedTime === activCheckboxesTime && clicked !== activCheckboxes[i]){
            if ($(clicked).prop('checked')){
                $(activCheckboxes[i]).prop('disabled', true);
            } else {
                $(activCheckboxes[i]).prop('disabled', false);
            }
        }
    }
   
    if ($(clicked).prop('checked')){
        totalCost += clickedCost;
    }  else {
        totalCost -= clickedCost;
    }

    totalCostSpan.show();
    totalCostSpan.html('<p>Total:  $' + totalCost + '</p>');

    if (totalCost === 0){
        totalCostSpan.hide();
    }
});

//Payment section
$('#payment option:contains("Select Payment Method")').prop('disabled', true);
$('#payment option:contains("Credit Card")').prop('selected', true);

$('#paypal').hide();
$('#bitcoin').hide();

$('#payment').change(function(event){
    
    if ($(event.target).val() === 'Credit Card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
    else if ($(event.target).val() === 'PayPal'){
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    }
    else if ($(event.target).val() === 'Bitcoin'){
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }
});

//Validation of inputs
function errorMessage (section, message){
    $(section).after('<span class="error">' + message + '</span>');  
}


$('form').submit(function(event) {
   event.preventDefault();
   
   $(".error").remove();

    // Name field cannot  be blank
   if ($('#name').val().length < 1) {
        errorMessage('#name', 'This field cannot be blank');
    }

    // E-mail field cannot  be blank
    if ($('#mail').val().length < 1) {
        errorMessage('#mail', 'This field cannot be blank');
    } 

    // At least one checkbox under the 
    //"Register for Activities" should be checked
    if ($('.activities input:checked').length === 0 ){
        errorMessage('.activities', 'Select at least one activity');
        }

    // Validation section of credit card
    if ($('#payment').val() === 'Credit Card'){
        const regExccNum = /^\d{13,16}$/;
        const validccNum = regExccNum.test($('#cc-num').val());
        const regExzip = /^\d{5}$/;
        const validZip = regExzip.test($('#zip').val());
        const regExCvv = /^\d{3}$/;
        const validCvv = regExCvv.test($('#cvv').val());

        // Credit card number field should contain from 13 to 16 numbers
        if (!validccNum) {
            errorMessage('#cc-num', 'This field should contain between 13 and 16 digits');
        }
        // Credit card ZIP code field should contain 5 numbers
         if (!validZip){
            errorMessage('#zip','This field should contain 5 digits' );
        }
        // Credit card CVV code field should contain 3 numbers
         if (!validCvv){
            errorMessage('#cvv', 'This field should contain 3 digits');
        }
    }
});

// E-mail address must be valid
// Real-time Error Messages
$('#mail').on('input', function(event) {
    const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const validEmail = regEx.test($('#mail').val());

    $(".error").remove();

    if (!validEmail){
        $('#mail').after('<span class="error">Enter a valid email</span>');
    } 
});
