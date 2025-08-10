# dsl-langium-university-students
First try with Langium's framework - General task: to create a simple DSL for an university
Current step: C

Task requirements:
A. Create a Langium project

Do steps 1 and 2 of Langium’s getting-started documentation: https://langium.org/docs/learn/workflow/

Extension name: uni-students
Language name: University Students
File extensions: .unis
Include the VS Code extension, but no CLI, web worker or language tests.

B. Write a Langium grammar

Do step 3 of the documentation to implement a syntax that can parse the following example:

// Declarations of students and their age
student Alice age 25
student Bob age 15

// Declarations of university disciplines
discipline Computer_Science
discipline Law
discipline Vogon_Poetry

// Declarations of universities where you can study
university CAU {
    // List of disciplines offered at this university (cross-references)
    disciplines Computer_Science, Law
}

// Statements about who studies what and where (these are all cross-references)
Alice studies Computer_Science at CAU
Bob studies Vogon_Poetry at CAU

Hint: you can use the online playground to quickly write and test your grammar, but you should save it into your Langium project when you’re done so you can also test the language in VS Code.

Run the generator as described in step 4 of the documentation. Also read step 5, but you don’t need to do anything for that.

C. Implement validations

Add the following validations to your project:

    For every studies statement, check that the student is at least 18 years old.
    For every studies statement, check that the referenced university actually offers the referenced discipline.


D. Create a VS Code Webview

Create a Webview in the VS Code extension, initially with an empty web page.

Implement a simple React app to fill the Webview contents. The app should take a JSON model of the data described in your Langium DSL and render it in some way — choose yourself how to represent it.

E. Connect the Webview to the Language Server

Use the vscode-messenger library to communicate between the extension backend and the webview.

Use JSON-RPC messages to send the DSL contents from the language server to the extension.

    Example for the language server side:
    https://github.com/eclipse-langium/langium/blob/21b105164186dfff6a4763c21d450931e2200e5b/examples/statemachine/src/language-server/main-browser.ts#L25-L38
    Similarly, register a notification handler on the LanguageClient in the VS Code extension code.


Wire all these things together: When a DSL document is changed, the AST contents are sent to the extension via JSON-RPC. The extension forwards the JSON data to the Webview via the vscode-messenger library. The Webview then renders the received contents in the React app.
