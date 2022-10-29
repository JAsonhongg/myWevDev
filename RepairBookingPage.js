//Declare a class: "Booking" Class
class Booking {
    //Constructor & Properties
    constructor() {
      //Properties
      this.customerType = "customer";//default value: "customer"
      this.name = "Daniel";
      this.email = "";
      this.phone = "";
      this.purchaseDate = "";
      this.warranty = true;
      this.courtesy_phone = "";//default: "" = no phone loan
      this.phone_bond = 0;	
      this.courtesy_charger = "";//default: "" = no charge loan				
      this.charger_bond = 0;
      this.bond = 0;
      this.service_fee = 85;
      this.sub_total = 0;
      this.gst = 0;
      this.grand_total = 0;			
    }					
  
    //Methods
    updateBond() {
      if (this.customerType == "business") {
        this.bond = 0;
      } else {
        this.bond = this.phone_bond + this.charger_bond;
      }				
    }
  
    updateServiceFee() {				
      if (this.warranty == false) {
        this.service_fee = 50;
      } else  {
        this.service_fee = 0;
      }			
    }
  
    updateProperties() {
      //Customer type
      if (document.getElementById("customer").checked) {
        this.customerType = "customer";
      } else {
        this.customerType = "business";
      }
      //name
      this.name = document.getElementById("name").value;
      this.email = document.getElementById("email").value;
      this.phone = document.getElementById("phone").value;
    }

    //auto caluate total cost
    updateTotal(){
      this.sub_total = this.bond + this.service_fee;
      document.getElementById("subTotal").value = this.sub_total;
      this.gst = this.sub_total * 0.15;
      document.getElementById("gst").value = this.gst;
      this.grand_total = this.sub_total + this.gst;
      document.getElementById("grandTotal").value = this.grand_total;
    }
    
}

let myBooking = new Booking(); 


//------------------------------------------------------------------
//If we move js in the <head>, need to wrap all script in "ready" (when it is ready)		
$(document).ready(function() {

    //-------------------------------------------------
    //Change style of legend element by adding "legend-style" class to all "legend" elements
    $('legend').addClass("legend-style");
  
    //-------------------------------------------------
    //Use "focus" and "blur" to each form element (input).
    //When the input is "focus" or on entering data, change background color to "pink"			
    $('input').focus(function(){
      $(this).css('background', 'CornflowerBlue ');//change background color to "pink"
    });		
  
    //When users complete and leave the input element, change the background back to "white"			
    $('input').blur(function(){
      $(this).css('background', 'white');
    });
  
    //-------------------------------------------------
    //Link: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
    $('input#purchaseDate').change(function() {
      let purchaseDate = new Date($(this).val());
      let today = new Date();
      if (purchaseDate.getTime() - today.getTime() > 0) {
        //alert("Purchase date must be before today!");
        $('input#purchaseDate').after('<p class="error-message">Purchase date must be before today!</p>');
        $(this).val("");//Reset value
      } else {
        $('p.error-message').remove();//Remove error message
      }
    });
    
    //check the repair date
    $('input#repairDate').change(function() {
        let purchaseDate = new Date($('input#purchaseDate').val());
        let repairDate = new  Date($("input#repairDate").val());
        let today = new Date();
        if (repairDate.getTime() - today.getTime() < 0) {	
          //alert("Repair date must be after today!");
          $('input#repairDate').after('<p class="error-message">Repair date must be after today!</p>');
          $(this).val("");//Reset value				
        } else {
          $('p.error-message').remove();//Remove error message
          //Check if warranty is checked or un-checked
          if ((repairDate.getTime() - purchaseDate.getTime())/(1000*360*24) < 2*365) {
            //alert("CHECKED");
            $('input#warranty').prop("checked", true);
            //Update Service Fee
            //yourBooking.warranty = true;
            //yourBooking.updateServiceFee();
            //$('input#serviceFee').val("$" + yourBooking.service_fee);
    
          } else {
            //alert("UN-CHECKED");
            $('input#warranty').prop("checked", false);
            //Update Service Fee
            //yourBooking.warranty = false;
            //yourBooking.updateServiceFee();
            //$('input#serviceFee').val("$" + yourBooking.service_fee);
          }					
        }				
      });

    //Update service fee accordingly to "warrenty" checkbox
    $('input#warranty').change(function(){
      if (this.checked) {
        //alert("CHECKED");
        myBooking.warranty = true;
        myBooking.service_fee = 0;
        myBooking.updateServiceFee();
        $("input#serviceFee").val("$" + myBooking.service_fee);
      } else {
        //alert("UN-CHECKED");
        myBooking.warranty = false;
        myBooking.service_fee = 85;				
        myBooking.updateServiceFee();
        $("input#serviceFee").val("$" + myBooking.service_fee);					
      }
    });
  
    //-------------------------------------------------
    //Add item
    $('#addItemBtn').click(function(e){
      let itemType = $('select#itemType').val();				
      if (itemType == "charger") {
        //Add charger if not added yet.
        if (myBooking.courtesy_charger == "") {
          //Add charger
          $('#itemTable').append('<tr id="charger-row">' + 
                                 '<td style="border: 1px solid black;">' + itemType + '</td>' +
                                 '<td style="border: 1px solid black;">' + '$30' + '</td>' +
                                 '<td style="border: 1px solid black;">' + '<button id="chargerBtn">REMOVE</button>' + '</td>' +
                                 '</tr>');					
          myBooking.courtesy_charger = itemType;						
          myBooking.charger_bond = 30;//Update bond
          myBooking.updateBond();
          $('input#bondAmount').val("$" + myBooking.bond);
          alert("CHARGER ADDED SUCCESSFULLY! BOND: " + myBooking.bond);											
        } else {
          alert("Charger already added!!!");
        }
      } else {
        if (myBooking.courtesy_phone == "") {
          //Add phone
          let bond = (itemType == "iPhone") ? 275 : 100;
          $('#itemTable').append('<tr id="phone-row">' + 
                                 '<td style="border: 1px solid black;">' + itemType + '</td>' +
                                 '<td style="border: 1px solid black;">' + '$' + bond + '</td>' +
                                 '<td style="border: 1px solid black;">' + '<button id="phoneBtn">REMOVE</button>' + '</td>' +
                                 '</tr>');						
          myBooking.courtesy_phone = itemType;							
          myBooking.phone_bond = bond;//Update bond
          myBooking.courtesy_phone = itemType;
          myBooking.updateBond();
          $('input#bondAmount').val("$" + myBooking.bond);
          alert("PHONE ADDED SUCCESSFULLY! BOND:" + myBooking.phone_bond);
        } else {
          alert("Phone already added!!!");
        }
      }		
  
      //Prevent submitting form
      e.preventDefault();
    });
  
    //For dynamically added elements you need event delegation, use the other version on jQuery on(), 
    // you can delegate event to static parent of the dynamically added elements.
    //Remove button
    $('#itemTable').on("click", "#chargerBtn", function() {				
      $('#charger-row').remove();
      alert("REMOVED CHARGER SUCCESSFULLY!!!");
      //Update myBooking object				
      myBooking.courtesy_charger = "";	
      myBooking.charger_bond = 0;//Update bond
      myBooking.updateBond();
      $('input#bondAmount').val("$" + myBooking.bond);
      alert("CHARGER REMOVED SUCCESSFULLY!");	
    });
  
    $('#itemTable').on("click", "#phoneBtn",function() {
      $('#phone-row').remove();
      alert("REMOVED PHONE SUCCESSFULLY!!!");
      //Update myBooking object
      myBooking.courtesy_phone = "";
      myBooking.phone_bond = 0;//Update bond
      myBooking.updateBond();
      $('input#bondAmount').val("$" + myBooking.bond);
      alert("PHONE REMOVED SUCCESSFULLY!");
    });					
});

//------------------------------------------------------------------
//NO ERROR --> Send data to invoice page	
$('#myform').submit(function(e){
    //Prevent submitting form
    e.preventDefault();	
  
    //Until this point, all input data are valid
    //Update object property
    myBooking.updateProperties();			
    //give some new prperty
    var purchasedate1= document.getElementById("purchaseDate").value;
    var repairdate1= document.getElementById("repairDate").value;

    //Create a "blank" page
    let invoiceWindow = window.open('', '_blank');
    //Build the "invoice page" which is a HTML document
    invoiceWindow.document.write(
      `
                  <html>
                      <head>
                          <title>Booking invoice</title>
                          <style>
                          h1 {text-align:center;}
                          </style>
                      </head>
                      <body>
                          <h1>Repair Booking</h1>
                          <fieldset>
                            <h2>Your info</h2>
                            <p>Customer Type: ${myBooking.customerType}</p>
                            <p>Name: ${myBooking.name}</p>
                            <p>Email: ${myBooking.email}</p>
                            <p>Phone: ${myBooking.phone}</p>
                            <p>Postcode: </p>
                            <p>Address: </p>
                          </fieldset> 
                          <br>
                          <fieldset>
                          <h2>Repair details</h2>
                          <p>Purchase Date: ${purchasedate1}</P>
                          <p>Repair Date: ${repairDate1}</p>
                          

                          </fieldset>
                          <br>
                          <fieldset>
                          <h2>Cost</h2>
                          <p>Bond: $${myBooking.bond}</p>
                          <p>Service Fee: $${myBooking.service_fee}</p>
                          </fieldset>
                      </body>
                  </html>
                  `			
    );
  
    //Write the body section for the page
    // invoiceWindow.document.write(
    //   `
    //               <body>
    //                 <h1>Repair Booking</h1>
    //                 <hr>
    //                 <h2>Your info</h2>
    //                 <p>Customer Type: ${myBooking.customerType}</p>
    //                 <p>Name: ${myBooking.name}</p>
    //                 <p>Email: ${myBooking.email}</p>
    //                 <p>Phone: ${myBooking.phone}</p>

                    
    //                 <hr>
    //                 <h2>Cost</h2>
    //                 <p>Bond: $${myBooking.bond}</p>
    //                 <p>Service Fee: $${myBooking.service_fee}</p>
    //                 <p>Purchase Date: ${myBooking.purchaseDate}</P>
    //               </body>
    //               </html>
    //               `
    // );		
  
    /*
              //Store myBooking in localStorage and send it to "invoice.htmnl"
              //Convert myBooking object to JSON string
              let myBookingData = JSON.stringify(myBooking);
              alert(myBookingData);
              localStorage.setItem("myBooking", myBookingData);
  
              window.open("invoice.html");//Open on new window
              //window.location.href = "invoice.html"; //open on the same window
        */ 
});
  