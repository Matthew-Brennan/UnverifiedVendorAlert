public with sharing class getOLI {

    @AuraEnabled (cacheable=true)//Needed for the LWC to find the apex class
    public static List<Opportunity> getList(string record) {
        System.debug(record);
        //First Select the opp with the ID passed from the JS
        //Also Select the Opp line items from that OPP
        //get the product name, the vendor account, the account name, and the status of the vendor verification
        return [SELECT Id, Name, 
                (SELECT Product2Id, Opp_Product_Name__c, Vendor_Account__c, Vendor_Account__r.Name, Vendor_Account__r.Vetted_Account_Approved__c FROM OpportunityLineItems) 

                FROM Opportunity WHERE Id = :record];
    }    
}