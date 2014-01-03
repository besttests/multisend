$( document ).ready(function() {
  function getURLParameter(name) {
    return decodeURI(
      (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
      );
  }

  $address = $("[seed=fz_input_fdemail]");
  $amount = $("[seed=fk_input_money]");
  $remark = $("[seed=fk_input_reason]");

  $amount.val(getURLParameter('amount'));
  $address.val(getURLParameter('address'));
  $remark.val(getURLParameter('remark'));
});

