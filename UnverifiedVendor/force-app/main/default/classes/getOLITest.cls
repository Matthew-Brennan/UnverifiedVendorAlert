@isTest
private class getOLITest {

    @isTest
static void testGetList_NoOpportunityLineItems() {

}

@isTest
    static void testGetList() {
        //create new opp for the test then insert
        Opportunity newopp = new Opportunity(
            Name = 'Test Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today()
        );
        insert newopp;

        //get the opp that was just created should just be 1
        Opportunity opp = [SELECT Id, Name FROM Opportunity LIMIT 1];

        //test the getList function
        List<Opportunity> opps = getOLI.getList(opp.Id);

        //we expect 1 opp to be returned since we inserted 1 opp
        //so the size of the opps returned should be 1
        System.assertEquals(1, opps.size());
    }
}