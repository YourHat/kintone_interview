(() => {
  'use strict';
  kintone.events.on('app.record.create.submit', (event) => {
  var record = event.record;
  var itemrecordnumber = record.item_record_number.value;
  var ordertype = record.order_type.value;
  var params = {'app':6,'id':itemrecordnumber};
  
  if(ordertype == "Sale"){
    return kintone.api('/k/v1/record','GET', params).then((resp)=>{
      if(Number(record.qty.value) > Number(resp.record.stock.value)){
        record.qty.error = 'only ' + resp.record.stock.value + ' in stock';
     
      }else{
         var updated_stock = Number(resp.record.stock.value) - Number(record.qty.value);
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
      }
      return event;
  }).catch((resp)=>{
      alert("error occured");
      event.error = 'please try again.'
    })
  }
  });
})();
