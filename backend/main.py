from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import openai
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from parser import parse_bionic_reading


load_dotenv()

# Initialize FastAPI app
app = FastAPI()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Example system instructions for the OpenAI model
system_instructions = """
You are a AI that helps parse a paper.
"""

# Define a Pydantic model to parse the incoming JSON request body
class UserMessage(BaseModel):
    user_message: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Endpoint for sending a message to the OpenAI API
@app.post("/send-message")
async def send_example_message(message: UserMessage):
    try:

        # Make the API request to OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-4",  # You can also use "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": system_instructions},
                {"role": "user", "content": message.user_message},
            ],
            max_tokens=150
        )

        # Extract the response content
        output = response.choices[0].message["content"].strip()

        return JSONResponse(content={"response": output})

    except Exception as e:
        # Catch any errors and return a 500 response
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")


# Endpoint for retrieving the content of the text file (e.g., bionicreading.txt)
@app.get("/get-text")
async def get_text():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_directory, "bionicreading.txt")
    try:
        # Parse the file content
        parsed_data = parse_bionic_reading(file_path)


        # Return the parsed data as a JSON response
        return JSONResponse(content=parsed_data)

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Text file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")
