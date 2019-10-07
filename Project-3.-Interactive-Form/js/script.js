
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

//Adds feild “Please select a T-shirt theme”.
$('#color').prepend('<option>Please select a T-shirt theme</option>');
$('#color option').eq(1).attr('selected', true);
$('#color option').eq(1).removeAttr('selected');

//Disable other "Color" fields
$('#color').each(function(){
    $('#color option').hide();
});

//Displays the T-shirt color options that match
//the design selected in the "Design" menu.
$('#design').change(function(event){
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
            $('#color option').hide();
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
$('#payment option').eq(1).prop('selected', true);
$('#payment option').eq(1).removeAttr('selected');

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

$('form').submit(function(event) {
    event.preventDefault();
    const name = $('#name').val();
    const mail = $('#mail').val();
    const ccNum = $('#cc-num').val();
    const ccZip = $('#zip').val();
    const ccCvv = $('#cvv').val();

   $(".error").remove();

    // Name field cannot  be blank
   if (name.length < 1) {
    $('#name').after('<span class="error">This field cannot be blank</span>');
    }

    // E-mail field cannot  be blank
    if (mail.length < 1) {
        $('#mail').after('<span class="error">This field cannot be blank</span>');
        } 

});

// E-mail address must be valid
$('#mail').on('input', function(event) {
    const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const validEmail = regEx.test(mail);

    $(".error").remove();

    if (!validEmail){
        console.log(regEx);
        $('#mail').after('<span class="error">Enter a valid email</span>');
    } 

});

/*

// Checks that name field is not blank
$('#name').on("input", function (event){
    
    if ($(event.target).val() === ''){
        $('#name').css('border-color', 'red');
    }
    else {
        $('#name').css('border-color', "#5e97b0");
    }
});

// Must be a valid email address
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    }

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    tooltip.innerHTML = '<span>Must be a valid email address</span>';
    showOrHideTip(showTip, tooltip);
  };
}    

$('#mail').on("input", createListener(isValidEmail));

// User must select at least one checkbox under the
// "Register for Activities" section of the form.


// User must supply a Credit Card number, a Zip Code, and 
// a 3 number CVV value before the form can be submitted.

*/