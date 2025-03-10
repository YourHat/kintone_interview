(() => {
  'use strict';
  kintone.events.on('app.record.create.submit', (event) => {
  var record = event.record;
  var firstname = record.first_name.value;
  var lastname = record.last_name.value;
  var companyname = record.company_name.value;
  var contacttype = record.contact_type.value;
  var query = 'first_name="'+firstname +'" and last_name="'+lastname+'" and company_name="' + companyname + '" and contact_type="' + contacttype + '"';
  var params = {app:5,query};

  return kintone.api('/k/v1/records','GET', params).then((resp)=>{
 
    if(!resp.records.length){
      alert("New Contact Added!");
    }else{
      record.first_name.error = 'duplicate contact found';
      record.last_name.error = 'duplicate contact found';
      record.company_name.error = 'duplicate contact found'
    }
    return event;
  }).catch((resp)=>{
    alert("error occured");
  }
  
)
    
  });
})();
