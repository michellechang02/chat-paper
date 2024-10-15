from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from parser import parse_bionic_reading
import json


load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

system_instructions = """
You are a helpful assistant. In addition to answering the user's message, recommend 5 sections out of the following list:

[intro1, intro2, intro3, intro4, section1-1, section1-2, section1-3, section1-4, section1-5, section1-6, section1-7, 
section2-1, section2-2, section2-3, section2-4, section2-5, section3-1, section3-2, section3-3, section3-4, section3-5, 
section4-1, section4-2, section4-3, section4-4, section4-5, Abstract].

Make the recommendations based on the user's query. Provide the user's answer as "user_answer" and the recommended 5 sections as "five_sections" in your response.
"""

# Define a Pydantic model to parse the incoming JSON request body
class UserMessage(BaseModel):
    user_message: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

sections = [
    "intro1", "intro2", "intro3", "intro4", "section1-1", "section1-2", "section1-3", "section1-4", "section1-5", 
    "section1-6", "section1-7", "section2-1", "section2-2", "section2-3", "section2-4", "section2-5", 
    "section3-1", "section3-2", "section3-3", "section3-4", "section3-5", "section4-1", "section4-2", 
    "section4-3", "section4-4", "section4-5", "Abstract"
]

# Endpoint for sending a message to the OpenAI API
@app.post("/send-message")
async def send_chatgpt_message(message: UserMessage):
    try:
        # Make the API request to OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-4",  # You can also use "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": system_instructions},
                {"role": "user", "content": message.user_message + "\nPlease recommend 5 sections to look at."},
            ],
            max_tokens=150
        )

        # Extract the response content
        output = response.choices[0].message["content"].strip()

        # You can use a custom parsing strategy if needed, but for now, we assume the response
        # will contain the user answer followed by the list of recommended sections.
        split_output = output.split("Recommended sections:")  # Assuming GPT will separate with this text
        user_answer = split_output[0].strip()
        five_sections = split_output[1].strip() if len(split_output) > 1 else ""

        return JSONResponse(content={
            "user_answer": user_answer,
            "five_sections": five_sections
        })

    except Exception as e:
        # Catch any errors and return a 500 response
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")


# Endpoint for retrieving the content of the text file (e.g., bionicreading.txt)
@app.get("/get-text")
async def get_text():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_directory, "bionicreading.txt")
    json_file_path = os.path.join(current_directory, "bionicreading.json")
    try:
        # Parse the file content
        parsed_data = parse_bionic_reading(file_path)

        # Save the parsed data to a JSON file
        with open(json_file_path, 'w') as json_file:
            json_file.write(json.dumps(parsed_data))

        # Return the parsed data as a JSON response
        return JSONResponse(content=parsed_data)

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Text file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")
