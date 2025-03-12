(() => {
  'use strict';
  kintone.events.on('app.record.create.submit', (event) => {
  var record = event.record;
  var itemname = record.item_name.value;
  var seller = record.seller.value;
  var query = 'item_name="'+ itemname +'" and seller="'+seller+'"';
  var params = {app:6,query};
  return kintone.api('/k/v1/records','GET', params).then((resp)=>{
    if(!resp.records.length){
    }else{
      record.item_name.error = 'duplicate item found';
      record.seller.error = 'duplicate item found';
    }
    return event;
  }).catch((resp)=>{
    alert("error occured");
  }
  
)
    
  });
})();
