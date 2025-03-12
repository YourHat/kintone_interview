(() => {
  'use strict';
  kintone.events.on('app.record.detail.process.proceed', (event) => {
  var record = event.record;
  var orderrecordnumber = record.order_record_number.value;
  var params = {'app':4,'id':orderrecordnumber};
  var action = event.action.value;

  if(action == "Refund Complete & Restock"){
    return kintone.api('/k/v1/record','GET', params).then((resp)=>{
      var itemqty = resp.record.qty.value;
      var itemrecordnumber = resp.record.item_record_number.value;
      var paramsItem = {'app':6,'id':itemrecordnumber};

    return kintone.api('/k/v1/record','GET', paramsItem).then((resp)=>{
       var updated_stock = Number(resp.record.stock.value) + Number(itemqty);

       var update_body = {
         'app':6,
         'id': itemrecordnumber,
         'record':{
           'stock':{
             'value':updated_stock
           }
         }
       }
       return kintone.api('/k/v1/record','PUT', update_body).then((resp)=>{
       })
      
      return event;
    })
  }).catch((resp)=>{
      alert("error occured");
      event.error = 'please try again.'
    })
  }
  });
})();
