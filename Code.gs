function doGet(e) {
  return HtmlService.createTemplateFromFile("form").evaluate()
  .setTitle("Vacation Tracker-Yariq Hasan")
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

var ss = SpreadsheetApp.getActiveSpreadsheet();

//This is grabs the data for the filter options
function getOptionsData(){
  var sheetName = ss.getSheetByName("OPTIONS");
  var data = sheetName.getRange(2, 1, sheetName.getLastRow()-1, sheetName.getLastColumn()).getDisplayValues();
  return data;
  // Logger.log(data);  
}

// This grabs the data from  the Options sheets and makes sure that it is to be used as a filter.
var groupOptions = getOptionsData().filter(d => d[0] !== "")
                   .map(function(d){ return '<option>' + d[0] + '</option>' }).join("");
  

  //this makes sure to get the data from the "SET CONTACT" sheet where you can change the email and whatsapp in order to contact them.
  const admin = ss.getSheetByName('SET ADMIN').getRange("A2").getValue() + ss.getSheetByName('SET ADMIN').getRange("B2").getValue(); // this grabs the data from the table for login purpose

  const emailURL = ss.getSheetByName('SET CONTACT').getRange("D4").getValue();

  const whatsAppURL = ss.getSheetByName('SET CONTACT').getRange("D5").getValue(); 
  
// this gets the table from the 'DATA 1' sheet 
function getTableData(objInput){
    var data;
    if(objInput.input1.toString()+objInput.input2.toString() == admin){
        data = ss.getSheetByName('DATA 1').getDataRange().getDisplayValues().slice(1);
    }else{
      data = undefined;
    }
    // console.log(data);
    return data;
};
// This makes sure that it grabs the data from DATA 1 "Leave Date" column and makes sures to filter those dates. 
function getFilterDate(){
  let data = ss.getSheetByName('DATA 1').getDataRange().getDisplayValues().slice(1);
  let filterDate = data.filter(d => d[2] !== "").map(d => d[2]);

// pushing it as an array
  var dataUnik = [];
  filterDate.map(function(r){
    if(dataUnik.indexOf(r) === -1){
      dataUnik.push(r);
    }
  });

  return dataUnik;
}
// this makes sures that it has the options in the dropbox.
  let dateOptions = getFilterDate().map(function(d){ return '<option>' + d + '</option>' }).join("");

function test(){
  console.log(dateOptions);
}



