// Sends an example message to the OpenAI API
// Note this is an async function, necessary since we are using await with fetch
async function sendExampleMessage() {
   // Get the example message and example response components to display messages
   const exampleMessage = document.getElementById('example-message');
   const exampleResponse = document.getElementById('example-response');
   // Set a message to be sent to OpenAI to a static message - 
   // you will need to make this dynamic!
   const message = "User: Hello ChatGPT!";
   // Set the example message component in chat to the above message
   exampleMessage.textContent = message;   


   // Now to make an API call to OpenAI
   // First we need an API key - you must fill this line in with your own key!
   // Define some system instructions. You can leave this out to get the default GPT behavior, but we'll need to use this for more fine-tuned responses!
   systemInstructions = `
   You are a friendly AI, but you have a sassy side. \n
   Also, you love red pandas! \n
   `
   // Wrap the call in a try/catch block
   try {
      // We recommend using fetch to call the API, like so:
      const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
         },
         body: JSON.stringify({
            model: 'gpt-4o', // You can change this model to whichever one you want- gpt-3.5-turbo, gpt-4-turbo also work
            messages: [ // Add your prompts below. This includes system instructions, and anything you want the AI to know to generate the response. You can add multiple user
               { role: 'system', content: systemInstructions },
               { role: 'user', content: message },
               { role: 'user', content: "How are you doing today, ChatGPT?" },
            ],
            max_tokens: 150 // You may want to set this to a relatively high number for your responses. 350 is generally a solid limit.
         })
      });

      // Catch errors if response fails to send
      if (!aiResponse.ok) {
         throw new Error('Request failed: ' + aiResponse.statusText);
      }

      // Await the data to be send back from the API
      const data = await aiResponse.json();
      // Then clean the output
      const output = data.choices[0].message.content.trim();
      // Finally, display the response
      exampleResponse.textContent = "AI: " + output;
   } catch (error) {
      // Display an error message if something goes wrong (likely, bad API key, or bad internet)
      console.error('Error:', error);
      exampleResponse.textContent = 'Something went wrong!';
   }
}

// Gets the original text of the document by reading in a text document
async function getText() {
   const response = await fetch('bionicreading.txt')
   const text = await response.text()
   return text;
}

// Given a section, highlights a subsection
let previousSection = null;
function highlightSection(section) {
   // Remove previous highlights
   if (previousSection) {
      const prevSelectedSection = document.getElementById(previousSection);
      if (prevSelectedSection) {
         // Remove existing highlights by stripping the <mark> tags
         prevSelectedSection.innerHTML = prevSelectedSection.innerHTML.replace(/<\/?mark[^>]*>/gi, '');
      }
   }

   // Get current section
   const selectedSection = document.getElementById(section);
   if (!selectedSection) return; // Guard clause if the section is not found
   
   // Highlight the whole section by wrapping the entire content in a <mark> tag
   const text = selectedSection.innerHTML;
   selectedSection.innerHTML = `<mark class='highlight'>${text}</mark>`;

   // Update the previousSection variable to the current section
   previousSection = section;

   // Scroll to the section in the text
   selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

