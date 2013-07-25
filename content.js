chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse){
      for (var i=1; i<(message.length - 1);i++) {
        $('#send-tx-custom-form .add-recipient').click();
      }

      $("#send-tx-custom-form .recipient-container .recipient").each(function(i, e) {
        $(this).find("[name=send-to-address]").val(message[i][0])
        $(this).find("[name=send-value]").val(message[i][1])
      });
    }
);
