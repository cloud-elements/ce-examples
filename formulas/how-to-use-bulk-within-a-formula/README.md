# Using Bulk in your formulas

Doing bulk within a formula is a little difficult. Bulk by nature is an asynchronous job. While Formulas are a synchronous procedure. The trick to getting them to work together is webhooks.

There are two ways to know when a bulk job is completed. You can set the header Elements-Async-Callback-Url and receive a webhook when the job is done.

One good way to do it is to have two formulas. One to start the bulk job and set the Elements-Async-Callback-Url to 
manually trigger a second formula that downloads the results and sends them somewhere else.

Here are the example formulas. They will bulk download from one instance, and bulk upload to another.

IMPORTANT NOTE: for these formulas to work, you must use a common resource! You must be able to call GET 
/MyCommonResource, copy a payload that gets returned and call POST /myCommonResource to the other endpoint. Included 
are some example transformations.

## To Configure:

1. Import both formulas [bulk_Step1.json](bulk_Step1.json) and [bulk_Step2.json](bulk_Step2.json)

2. Create the common resource by calling POST /organizations/objects/MyContact/definitions with this payload: 
[ObjectDefinition.json](ObjectDefinition.json)

3. Create transformations for Salesforce by calling POST /organizations/elements/sfdc/transformations/MyContact with:
 [MyContactSFDC.json](MyContactSFDC.json)

4. Create transformations for DynamicsCRM by calling POST 
/organizations/elements/dynamicscrm/transformations/MyContact with: [dynamicscrmMyContact.json](dynamicscrmMyContact.json)

5. Create a formula instance for Bulk Step 2 and capture the ID of the created formula instance.

You will need to give the Bulk Step 1 formula the instance ID for the second formula. This will let the webhook trigger the correct formula 

Flowcharts describing the formulas can be found [here](Flowchart-BulkStep1.html) and [here](Flowchart-BulkStep2.html).

For more information on how to use Cloud Elements, see our [developer portal](https://developers.cloud-elements.com) 
or our [support page](https://support.cloud-elements.com/hc/en-us).

For support, contact us at [dev-experience@cloud-elements.com](mailto:dev-experience@cloud-elements.com).