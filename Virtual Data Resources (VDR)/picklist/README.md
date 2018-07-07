# Syncing picklist values with Transformations 

This example transforms picklist data between a [Common Resource](https://developers.cloud-elements.com/docs/guides/common-resources/mapping.html) and a particular vendor's own data model. 

Things to note in this example:
1. A hypothetical common resource named myContacts contains a picklist field called leadSource 
2. The goal is to map the picklist field of myContacts to a similar field on an instance of the SalesForce Lead object. 
3. Each picklist has similar but different values and different counts of options
4. The transformation uses the custom javascript option found in the <> button on Common Resource
5. The custom javascript transformation needs to handle data flowing in both directions (get/post)
6. The direction of dataflow is determined by the "isVendor" object

## Code Explanation:
The transformation defines two javascript objects (postPick & getPick) that represent both sides of the equation and vary depending on POST or GET:

1. getPick : The keys of the getPick object are the options found in the Sales Force LeadSource picklist. 
Since we are 'getting' from Sales Force and transforming to myContacts, the "originalObject" is coming from Sales Force and will contain a value for LeadSource. We can therefore use Leadsource as a key to look up, set and return a value from the getPick object using bracket syntax to access the property's value:
> getPick[originalObject.LeadSource]

2. postPick : The keys and values of the postPick object are the exact opposite of the getPick object with its keys representing options from myContacts and values representing the corresponding Sales Force options. Note that the postPick object has one more key than getPick because there are more options on the myContact picklist than the Sales Force equivalent. This allows us to map 2 myContacts keys (List & Event) to one Sales Force value 'Purchased List'. 

When posting to myContacts, the "originalObject" will be of the myContact type and will therefore contain a value for leadSource (not LeadSource) and we can use that as a key to lookup, set and post the appropriate Sales Force value from the postPick object, again using bracket syntax:
> postPick[originalObject.leadSource]

As an example with data, posting to myContacts with a leadSource value of 'Event' will subsequently post to Sales Force with a value for LeadSource of 'Purchased List' because postPick['Event'] will evaluate to 'Purchased List'.