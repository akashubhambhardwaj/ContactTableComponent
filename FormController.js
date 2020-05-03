({
  doSave : function(component, event, helper) {
      //step 1 
      var action = component.get('c.CreateCon');

      //step 2 set parameters
      action.setParams({
          con : component.get('v.myCon')
      });

      //step 3 callback

      action.setCallback(this, function(response){
          var state = response.getState();
          if(state === 'SUCCESS' || state === 'DRAFT'){
              var responseValue = response.getReturnValue();
              console.log(responseValue);  
              var eventVal = component.getEvent('getContacts');
              eventVal.setParams({
                  StoreCons : responseValue
              })
              eventVal.fire();
              component.set('v.myCon',{
                  sobjectName : 'Contact',
                  FirstName   : '',
                  LastName    : '',
                  Email       : '',
                  Phone       : '',
              })
          }else if(state === 'ERROR' ){
              var errors = response.getError();
              console.log(errors);
          }else if(state === 'INCOMPLETE'){

          } 
      },'ALL');

      //STEP 4 ENQUUE Action
      $A.enqueueAction(action);

  }
})
