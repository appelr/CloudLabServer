# Lab Report 2 - Randolf Appel

This is the report of the second lab assignment in the course [Software Development for the Cloud](https://www.hkr.se/en/course/DA376D/), done by Randolf Appel.

The task was to extend the backend of the program created in the first lab by adding the possibility to do calculations as well as a console application in our favourite programming language to test the route. 
Afterwards the program should be deployed to the [Heroku Cloud](http://heroku.com).

## Project URL and Custom Routes

The project can be found at "[https://sdincloud.herokuapp.com](https://sdincloud.herokuapp.com)" and the custom routes are the following: 

	- /appelrandolf    (Displays a basic landing page)
	- /joke            (Displays a random joke)
	- /calc            (Displays a basic landing page)
	

Parameters for ```/calc```: 

	- operation      (add, sub, mul, div)
	- numberone      (Number)
	- numbertwo      (Number)

When using the parameters in the route for ```/calc``` a page with the result of the calculation will be shown.

## Screenshots

Screenshots of the backend as well as the result page can be found in the screenshots directory of the uploaded project.

## Procedure

To accomplish the task a new route should be added to express which processes the given parameters and calculates the result.

### Adding a new route to express

The first step was to create a new route in express. This was really straight forward because I already did it in the first lab.

```
.get('/calc', (req, res) => res.send('This is the landing page for the calculator.'))
```

### Processing the parameters

Now that the route is working the next step was accept and handle incoming parameters.
This can be accomplished by accessing the parameters through ```req.query```like this: 

```
var operation = req.query.operation;
var numberone = req.query.numberone;
var numbertwo = req.query.numbertwo;
```

The calculations can be executed using a switch statement on the operation parameter: 

```
switch (operation) {
      case 'add':
        result = Number(numberone) + Number(numbertwo)
        break
      case 'sub':
        result = Number(numberone) - Number(numbertwo)
        break
      case 'mul':
        result = Number(numberone) * Number(numbertwo)
        break
      case 'div':
        result = Number(numberone) / Number(numbertwo)
        break
      default:
        return
    }
```

Finally the result of the calculation can be sent back to the client by using: 

```
res.send(result.toString());
```

### Adding error handling

Once the general processing of the parameters is working some error handling should be added to avoid that the user runs into any problems.
Therefore I added statements to check if the parameters are in the correct format and sent a response with instructions how to use the calculator correctly as inline HTML code: 

```
if (isNaN(numberone) || isNaN(numbertwo))
	res.send(`<h1>Calculator</h1><p>Append a query string to the url to specify the following parameters: <br><br> operation: (add, sub, mul, div) <br> numberone: Any positive number <br> numbertwo: Any positive number</p>`);
```

### Creating a console application to test the route

At this point the program is working and needs to be tested using a console application. I chose C# because I have the most experience with it.
The application is also versioned in [GitHub](http://github.com) and can be found under the following URL: 

[https://github.com/appelr/CalculatorTest.git](https://github.com/appelr/CalculatorTest.git)

#### Creating the application

I created the application by executing the following command in the command line: 

```
dotnet new console --framework net6.0
```

This creates a new .NET Framework 6.0 console application in the directory where the command was executed.

#### Executing the HTTP-request

In the class ```Program.cs``` I added a method to execute a HTTP-request to the server and output the result to the console:

```
private static async Task TestCalculation(string op, int numberOne, int numberTwo)
    {
        var uri = $"http://sdincloud.herokuapp.com/calc?operation={op}&numberone={numberOne}&numbertwo={numberTwo}";
    
        using var client = new HttpClient();
        var response = await client.GetStringAsync(uri);
                               
        Console.WriteLine($"The server returned: {response}.");
    }
```

Furthermore I added some console statements to display which calculation was executed. 

#### Verifying the result

To verify that the server is calculating the numbers correct, I added code in C# to also calculate it and to compare the results: 

```
	// ...
	
    var response = await client.GetStringAsync(uri);
        
    int localCalculation;
    switch (op)
    {
        case "add":
            Console.WriteLine($"Performing the following calculation: {numberOne} + {numberTwo}");
            localCalculation = numberOne + numberTwo;
            break;
        case "sub":
            Console.WriteLine($"Performing the following calculation: {numberOne} - {numberTwo}");
            localCalculation = numberOne - numberTwo;
            break;
        case "mul":
            Console.WriteLine($"Performing the following calculation: {numberOne} * {numberTwo}");
            localCalculation = numberOne * numberTwo;
            break;
        case "div":
            Console.WriteLine($"Performing the following calculation: {numberOne} / {numberTwo}");
            localCalculation = numberOne / numberTwo;
            break;
        default:
            return;
    }
        
    Console.WriteLine($"The server returned: {response}.");
        
    Console.WriteLine($"Calculation is equal to the locally calculated result: {Int32.Parse(response) == localCalculation}.");
```

## Problems

Because of a recent security breach, [Heroku](http://heroku.com) decided to revoke all OAuth access keys from [GitHub](http://github.com) which made automatic deployment almost impossible. Therefore I had to switch to manual deployment. 