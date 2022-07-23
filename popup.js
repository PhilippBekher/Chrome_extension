

let btnWorkFlow = document.getElementById("btnWorkFlow");
let btnNoWorkFlow = document.getElementById("btnNoWorkFlow");
let textField = document.getElementById("bubble_element_textfield");
let btnSendData = document.getElementById("sendData")
let input = document.getElementById('fname')
let dropdown = document.getElementById('dropdown')
let table = document.getElementById('table')
let block_name_and_sending_button = Array.from(
  document.getElementsByClassName('block_name_and_sending_button')
)


let element_type ;
let element_JSON_content ;

const boxes = Array.from(
  document.getElementsByClassName('box')
);


btnWorkFlow.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getBubbleElementWithFlow,
    } , (injectionResults)=> {
      for (const frameResult of injectionResults)
        if (injectionResults[0].result == null){
          alert('You forgot to copy element in Bubble!')
          return 
        }
        element_JSON_content = JSON.stringify(injectionResults[0])
        //  textField.innerHTML = JSON.stringify(injectionResults[0]);

         block_name_and_sending_button.forEach(element => {
          element.style.display = 'block';
         });
         element_type = 'with'
        
         

    });
  });

  btnSendData.addEventListener("click", async()=>{

    if(input.value == ''){
      alert('Name should not be empty')
      return
    }

    let body = {
      "records": [
        {
          "fields": {
            "Name":`${input.value}`,
            "JSON": `${element_JSON_content}`,
            "Type":`${element_type}`
          }
        }
      
      ]
    }

    let response = await fetch('https://api.airtable.com/v0/appk6Bh8roMH1L4XK/Table%201', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer keymeBbOhZfZnfH4p",
    },
});
console.log( await response.json)
  })


  function getBubbleElementWithFlow (){

    var BubbleElement = JSON.parse(window.localStorage.getItem("bubble_element_with_workflows_clipboard"))
    console.log(BubbleElement)
    return BubbleElement;
      // textField.innerHTML =  JSON.parse(window.localStorage.getItem("bubble_element_with_workflows_clipboard"))
    }

btnNoWorkFlow.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getBubbleElementWithoutFlow,
    });
  });
  


  function getBubbleElementWithoutFlow (){

    console.log(JSON.parse(window.localStorage.getItem("bubble_element_clipboard")))

      }


  async function SendBubbleDataToAirTable  (data) {
    const response = await fetch('https://api.airtable.com/v0/apprcrVMZwMlUlWto/Table%201?api_key=keymeBbOhZfZnfH4p')
  }


  async function fetchAirTableData() {

    let response = await fetch('https://api.airtable.com/v0/appk6Bh8roMH1L4XK/Table%201', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer keymeBbOhZfZnfH4p",
      },
  });
  const records = await response.json()

  
  loadIntoTable()

}


async function loadIntoTable(table) {
  let response = await fetch('https://api.airtable.com/v0/appk6Bh8roMH1L4XK/Table%201', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer keymeBbOhZfZnfH4p",
    },
});

const res = await response.json()

var HTMLtext = ' ';

for (var i = 0; i < res.records.length; i++){
  
   var tr = `<tr id="${i+1}">
   <td>${res.records[i].fields.Name}</td>
   <td class="row-data">${res.records[i].fields.JSON}</td>
   <td>${res.records[i].fields.Type}</td>
   <td><button onclick="show()"  id="copy_button" class="btn btn-primary copy_button">Copy</button></td>
 </tr>`

 HTMLtext = HTMLtext + tr
}

  table.innerHTML = `
  <tr>
  <th>Name</th>
  <th>JSON</th>
  <th>Type</th>
  <th>Copy</th>
  </tr> + ${HTMLtext}
`
}

loadIntoTable(table);



  