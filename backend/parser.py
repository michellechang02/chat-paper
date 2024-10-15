# Function to parse the bionicreading.txt file
def parse_bionic_reading(file_path):
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        parsed_data = {}
        current_section = None
        content = []

        # Parse the file line by line
        for line in lines:
            line = line.strip()

            # Check if the line starts with a section ID (e.g., intro1, section1-1, etc.)
            if ':' in line:
                # Save the previous section's content if there is any
                if current_section:
                    parsed_data[current_section] = " ".join(content).strip()

                # Split line by ':' to get section ID and its initial content
                section_id, section_content = line.split(':', 1)
                current_section = section_id.strip()
                content = [section_content.strip()]  # Start new content list for this section
            else:
                # Continue appending content to the current section
                content.append(line)

        # Don't forget to add the last section after loop ends
        if current_section:
            parsed_data[current_section] = " ".join(content).strip()

        return parsed_data

    except FileNotFoundError:
        raise Exception("Text file not found")
    except Exception as e:
        raise Exception(f"Error parsing file: {str(e)}")