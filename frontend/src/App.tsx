import { Box, Grid, GridItem, Button, Text, Input, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Chatbot from './components/Chatbot';
import Paper from './components/Paper';

interface ChatMessage {
  sender: string;
  text: string;
}

interface SectionContent {
  abstract: string;
  intro1: string;
  intro2: string;
  intro3: string;
  intro4: string;
  section1_1: string;
  section1_2: string;
  section1_3: string;
  section1_4: string;
  section1_5: string;
  section1_6: string;
  section1_7: string;
  section2_1: string;
  section2_2: string;
  section2_3: string;
  section2_4: string;
  section2_5: string;
  section3_1: string;
  section3_2: string;
  section3_3: string;
  section3_4: string;
  section3_5: string;
  section4_1: string;
  section4_2: string;
  section4_3: string;
  section4_4: string;
  section4_5: string;
}



function App() {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [textContent, setTextContent] = useState<SectionContent | null>(null);
  const highlightSection = (sectionId: string) => {
    setHighlightedSection(sectionId);
  };

  

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const botResponse = `Bot: I see you said "${userMessage}"`; 
      // Update chatMessages with the new user and bot messages
      setChatMessages([
        ...chatMessages,
        { sender: 'User', text: userMessage },
        { sender: 'Bot', text: botResponse }
      ]);


      // Clear the user message input
      setUserMessage('');
    }
  };

  useEffect(() => {
    axios.get('https://chat-paper-eight.vercel.app/get-text')
    .then(response => {
      // Update state with the retrieved text content
      setTextContent(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error("Error fetching text content:", error);
    });
  }, [])

  return (
    <Box mx={5} mt={10} mb={10}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        {/* Paper Section */}
        <Paper textContent={textContent} highlightSection={highlightSection} highlightedSection={highlightedSection} />

        {/* Chatbot Section */}
        <Chatbot chatMessages={chatMessages} userMessage={userMessage} setUserMessage={setUserMessage} handleSendMessage={handleSendMessage} />
        
      </Grid>
    </Box>
  );
}

export default App;
