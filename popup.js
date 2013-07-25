$("#go").click(function() {
  var array = CSV.csvToArray($("#csv").val());
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.sendMessage(tab.id, array);
  });
})
