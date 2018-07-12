# Combining All Results From a Formula Loop Step
**Problem this solves:**
* "How do you loop through something, get all the results from that loop and combine them?"

**Solution:**
You will need to use the last step of the loop as an aggregator
basically you will:
make a Javascript step called aggregator and then add the following Javascript:

  ```
  let arr = steps.aggregator ? steps.aggregator.arr : [];

  <insert custom logic>

  done({arr:arr})
  ```

This will look to see if the step has already run and if it has it will get the results from the step and you can add to them or if it has not run it will start with an empty array.

Included in this folder is [Loop_Step_Aggregation.json](Loop_Step_Aggregation.json) this is formula json that can be imported and used to test with. This was built with just a handful of steps. It is a manual trigger for testing, it will get contacts and then loop through all the contacts and get the contact name and add it to an array and after it has looped through you it will log and array of contact names.

A few things to note there is no paging in this formula so if you have over 200 contacts your final array will be an array of 200 names since the page size defaults to 200. Also please note the formula will be slow if you have a lot of contacts this is just as simple example formula to demonstrate how to aggregator your results you will likely want to add your own logic.
