(() => {
  'use strict';
  kintone.events.on('app.record.detail.process.proceed', (event) => {
  var record = event.record;
  var itemrecordnumber = record.item_record_number.value;
  var params = {'app':6,'id':itemrecordnumber};
  var action = event.action.value;
  if(action == "Items Received"){
    return kintone.api('/k/v1/record','GET', params).then((resp)=>{
       var updated_stock = Number(resp.record.stock.value) + Number(record.qty.value);
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
  }).catch((resp)=>{
      alert("error occured");
      event.error = 'please try again.'
    })
  }
  });
})();
