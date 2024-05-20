import { LightningElement, wire, api, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

import getOpps from '@salesforce/apex/getOLI.getList'; //get the Apex Class function getList from getOLI.cls


export default class UnverifiedVendor extends LightningElement {

    
    errAlert;       //String to hold the Header Message
    allvendors = true; //bool for if there are any vendors not verified
    @api recordId;  //get the record ID of the page the LWC is on 
    @track error;   //error is the error message if something goes wrong
    @track records; //holds are the records that are returned from the wire
    array = [[]];   //hold the formated data to display on the message

    //wire call the getOpps function from the getOLI.cls Apex Class
    //pass the recordId
    @wire(getOpps, {record: "$recordId" }) 
    wiredGetOLI({ error, data }) {
        //if there are Opportunity Products on the Opp
        if (data) {     
            this.records = data;
            this.error = undefined;  
            
            //if the opp exists but there are no products
            if(data[0].OpportunityLineItems)
            {
                //iterate through all the Opportunity Line Items returned
                //if the vendor is not approved, add it to the array
                for (let i = 0; i < data[0].OpportunityLineItems.length; i++) {
                    if(!data[0].OpportunityLineItems[i].Vendor_Account__r.Vetted_Account_Approved__c)
                    {
                        this.allvendors = false;//there is at least one unverified vendor
                        this.array.push("Unverified Vendor: " + data[0].OpportunityLineItems[i].Vendor_Account__r.Name + " For Product: " + data[0].OpportunityLineItems[i].Opp_Product_Name__c)
                    }
                }

                //set the appropriate alert
                if(this.allvendors === false)
                {
                    this.errAlert = "ATTENTION! THE FOLLOWING VENDORS ARE UNVERIFIED";
                }
                else
                {
                    this.errAlert = "All Vendors Approved";
                }
                // this.errAlert = this.array;
                
                console.log(this.array);
            }
            else
            {
                this.errAlert = "Products not yet added";
            }

        } else if (error) {                 

            this.error = error;
            this.errAlert = "All Vendors Approved";
        }
        
    }
    
}
