# Lab Report 3 - Randolf Appel

This is the report of the third lab assignment in the course [Software Development for the Cloud](https://www.hkr.se/en/course/DA376D/), done by Randolf Appel.

The task was to deploy a given server on the [Heroku Cloud](http://heroku.com) and modify it by adding logic to count the occurrences of words in a specific length.

## Project URL and Custom Routes
The projects can be found at the following URLs:

| Description | URL |
|:--|:--|
| Client | https://github.com/appelr/CloudLabClient.git |
| Server | https://github.com/appelr/CloudLabServer.git |

The project can be found at "[https://cloudlabserver.herokuapp.com](https://cloudlabserver.herokuapp.com)" and the custom routes are the following: 

| Route | Method | Description |
|:--|:--|:--|
| / | GET |	Displays a basic landing page |
| /getWordLengthFrequency | POST | Returns a string containing information on the words |

## Screenshots

Screenshots of algorithm code as well as the table printed in the command line can be found in the screenshots directory of the uploaded project.

## Procedure

The procedure to accomplish the task were pretty straight forward as the an example of the service as well as the client were already uploaded.

### Modifying the Server

First off, I imported the example app.js file. It already had an express server set up as well as some boilerplate code for the algorithm. The route for the post request is accepting a string. First I added an array in the given max length (10) with initial values of 0. Then I had to split the sting at the whitespaces to turn it into an array. Afterwards, I iterated over the new array in a foreach loop and for each element I added 1 to the count of the corresponding field in the initial array. That means, I increased the count of the word with the given length by 1.
Finally, I transformed the array back into a string and returned it.

```
var data = req.body.data;

console.log("post requested received with data: ");
console.log(data);

// Create result array and fill it with initial values
var result = new Array(MAX_LENGTH_WORD);
result.fill(0);   

// Transform string to array and values to result
data.split(" ").forEach(word => {
var length = word.length;
result[length - 1] += 1;
});
  
// Copy result data in result string
var resultStr = "";
for (var i = 0; i < MAX_LENGTH_WORD; i++) {
  resultStr = resultStr + result[i] + " ";
}

console.log("sending response");
res.send(resultStr);
```
### Modifying the Client

As well as with the Server, first I added the example app.js file to the project. Then, I changed the default URL of the request to be the URL of the cloud where I deployed the server.
After that, I installed a node.js module called [console-table-printer](https://www.npmjs.com/package/console-table-printer).
I used this module to create a nice table output of the result on the console. To do so, I turned the result string to an array and iterated over it to enriched the array elements with informations. Finally, I used the ```printTable()``` method to print the result.

```
// Get data from response
var dataArray = res.data.split(" ");

// Create a table
const resultTable = [];

// Populate the table with values
for (let i = 0; i < dataArray.length - 1; i++) {
  resultTable.push({ wordlength:i + 1, wordcount:dataArray[i]})
}

// Print table
printTable(resultTable);
```