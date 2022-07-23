var elements = document.getElementsByClassName("copy_button")

console.log(elements)

Array.prototype.forEach.call(elements, function(el) {
  console.log('HELLO');
});







      
function show(){
  console.log('it is just test')
  var rowId = 
              event.target.parentNode.parentNode.id;
              console.log(rowId)
              var data = 
 document.getElementById(rowId).querySelectorAll(".row-data"); 
              /*returns array of all elements with 
              "row-data" class within the row with given id*/
              console.log(data)
                var name = data[0].innerHTML;

  
                console.log(name)
}
