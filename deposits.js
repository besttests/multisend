$( document ).ready(function() {
  var source = ' \
  <div class="memo-tb fn-clear"> \
	<table cellspacing="0" class="memo-tb-inner"> \
		<tbody style="font-size: 20px;"><tr> \
			<td class="memo-tb-left" style="width: 300px;">{{member_sn}}</td> \
			<td class="memo-tb-left" style="width: 600px;">{{payment_id}}</td> \
			<td class="memo-tb-right amount" style="width: 200px;">{{amount}}</td> \
			<td class="memo-tb-right"><a href="https://{{domain}}/admin/currency_deposit/new?{{params}}" target="_blank">Deposit</a></td> \
		</tr> \
    <tr> \
      <td class="memo-tb-left" style=width: 300px">{{address_label}}</td> \
      <td class="memo-tb-left" style=width: 500px">{{address}}</td> \
    </tr> \
  </tbody></table></div>';

  var template = Handlebars.compile(source);

  var patt = /交易成功/;
  var result = patt.test($("#content > #main > .tip-extra").text());
  var $trade = $('.p-trade-list')
  var $info = $(".tb-border.p-trade-slips td").first()

  if ( result ) {
    var regex_member_com_sn= /pea\w{8}tio/i;
    var regex_member_io_sn = /pt\w{8}/i;

    var regex_payment_id = /\d{28,}/i;
    var content = $trade.find('td.name').text();
    var doc_text = $(document).text()

    var member_sn_matches = regex_member_com_sn.exec(doc_text);
    var domain = 'peatio.com';

    var payment_id_matches = regex_payment_id.exec(content);

    var member_sn = member_sn_matches ? member_sn_matches[0].toUpperCase() : '';
    var payment_id = payment_id_matches[0];
    var amount = $trade.find('td.amount').text();

    var info_list = $( "th:contains('对方信息')" ).next().text().split("\t");

    var address_label = "";
    var address = "";

    $.each(info_list, function(i, v) {
      if (address_label == "" && $.trim(v) != "") {
        address_label = $.trim(v);
      } else if (address == "" && $.trim(v) != "") {
        address = $.trim(v);
      }
    });

    var params = $.param({
      'deposit[sn]': member_sn,
      'deposit[tx_id]': payment_id,
      'deposit[amount]': amount,
      'deposit[address]': address,
      'deposit[address_label]': address_label,
      'deposit[address_type]': 'alipay',
      'deposit[amount]': amount
    });

    var data = {'member_sn': member_sn, 'payment_id': payment_id, 'amount': amount, 'address': address, 'address_label': address_label, 'domain': domain, 'params': params}

    $('.p-trade-slips').after(template(data));
  } else {
  }
});
