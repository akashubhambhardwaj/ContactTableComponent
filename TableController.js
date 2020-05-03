({
getCons : function(component, event, helper) {
      var conList = component.get('v.myContacts');
      var evePara = event.getParam('StoreCons');
      conList.push(evePara);
      console.log(conList);
      component.set('v.myContacts',conList);

},
  delCons : function(component, event, helper) {
      var contactId = event.getSource().get("v.title");
      console.log(contactId);

      var action = component.get('c.DeleteCon');

      action.setParams({
          conId : contactId
      });

      action.setCallback(this, function(response){
           var state = response.getState();
          if(state === 'SUCCESS' || state === 'DRAFT'){
              var responseVal = response.getReturnValue();
              console.log(responseVal);
              var rowIndex = event.getSource().get("v.name");
              console.log(rowIndex);
              var conList = component.get("v.myContacts");
              conList.splice(rowIndex,1);
              component.set("v.myContacts",conList);

          }else if(state === 'ERROR'){

          }else if(state === 'INCOMPLETE'){

          }

      },'ALL');

      $A.enqueueAction(action);
  }
})
