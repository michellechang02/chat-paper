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
    allow_origins=["http://localhost:5173", 
                   "https://michellechang02.github.io"],
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


Provide in string JSON format the user's answer as "user_answer" by answering the user's question first using the text in 40 words or less, without considering the recommendations, 
and then "five_sections" as a list of 5 sections you recommend the user to look at.
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
@app.post("/send-message")
async def send_chatgpt_message(message: UserMessage):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_directory, "bionicreading.txt")
    try:
        # Read the contents of the file
        with open(file_path, 'r') as file:
            file_content = file.read()

        # Make the API request to OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-4",  # You can also use "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": system_instructions},
                {"role": "system", "content": file_content},  # Include file content in the system message
                {"role": "user", "content": message.user_message + "\nPlease recommend 5 sections to look at."},
            ],
            max_tokens=150
        )

        # Extract the response content
        output = response.choices[0]["message"]["content"].strip()

        print("JSON OUTPUT" + output)
        
        # Extract the user's answer and the recommended 5 sections
        output_dict = json.loads(output)
        print(output_dict)

        return JSONResponse(content={
            "user_answer": output_dict['user_answer'],
            "five_sections": output_dict['five_sections']
        })

    except Exception as e:
        # Catch any errors and return a 500 response
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")


# Endpoint for retrieving the content of the text file (e.g., bionicreading.txt)
@app.get("/get-text")
async def get_text():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_directory, "bionicreading.txt")
    # json_file_path = os.path.join(current_directory, "bionicreading.json")
    try:
        # Parse the file content
        parsed_data = parse_bionic_reading(file_path)

        # # Save the parsed data to a JSON file
        # with open(json_file_path, 'w') as json_file:
        #     json_file.write(json.dumps(parsed_data))

        # Return the parsed data as a JSON response
        return JSONResponse(content=parsed_data)

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Text file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {str(e)}")
