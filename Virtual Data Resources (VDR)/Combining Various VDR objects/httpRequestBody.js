if (fromVendor) {
  const customerId = transformedObject.CustomerID;

  const https = require('https');
  let options = {
    host: "staging.cloud-elements.com",
    path: `/elements/api-v2/myOrders?where=${encodeURIComponent(`CustomerID='${customerId}'`)}`,
    method: "GET",
    "headers": {
      "accept": "application/json",
      "Authorization": `User ${configuration.userSecret}, Organization ${configuration.organizationSecret}, Element ${configuration.elementInstanceToken}`
    }
  };

  // dataHandling
  let data = "";
  const request = https.request(options, function(res) {
    res.on('data', function(d) {
      data += d;
    }).on('end', function(d) {
      if (res.statusCode === 200) {
        let parsedData = JSON.parse(data);
        transformedObject.orders = parsedData;
        done(transformedObject);
      } else {
        transformedObject.orders = {
          message: "https call to orders failed",
          error: res.statusMessage
        };
        done(transformedObject);
      }
    });
  });

  request.on('error', function(e) {
    transformedObject.orders = {
      message: "https call to orders failed",
      error: JSON.stringify(e)
    };
    done(transformedObject);
  });

  request.end();

}
