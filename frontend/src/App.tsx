import { Box, Grid, GridItem, Button, Text, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import './App.css';

function App() {
  const [highlightedSection, setHighlightedSection] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const highlightSection = (sectionId: string) => {
    setHighlightedSection(sectionId);
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const botResponse = `Bot: I see you said "${userMessage}"`; // Simple response logic for the example
      setChatMessages([...chatMessages, { sender: 'User', text: userMessage }, { sender: 'Bot', text: botResponse }]);
      setUserMessage('');
    }
  };

  return (
    <Box p={4}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        {/* Paper Section */}
        <GridItem>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            height="100%"
            overflowY="auto"
          >
            <Text fontSize="xl" mb={2}>No, Bionic Reading does not work</Text>
            <Text as="caption">by Joshua Snell</Text>

            {/* Abstract Section */}
            <Box
              bg={highlightedSection === 'abstract' ? 'yellow.200' : 'transparent'}
              p={2}
              mt={4}
              borderRadius="md"
            >
              <Text fontSize="lg" mt={4}>Abstract</Text>
              <Text id="abstract">
                It has recently been claimed that presenting text with the first half of each word printed in bold...
              </Text>
            </Box>

            {/* Introduction Section */}
            <Box
              bg={highlightedSection === 'intro1' ? 'yellow.200' : 'transparent'}
              p={2}
              mt={4}
              borderRadius="md"
            >
              <Text fontSize="lg" mt={4}>1. Introduction</Text>
              <Text id="intro1">
                Reading is a challenging cognitive task for various reasons. Text constitutes a very homogeneous visual
                landscape wherein no single location stands out on the basis of saliency...
              </Text>
            </Box>
          </Box>
        </GridItem>

        {/* Chatbot Section */}
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={4} height="100%" display="flex" flexDirection="column">
            <Text fontSize="lg" mb={2}>Chatbot</Text>
            <VStack
              spacing={3}
              align="stretch"
              borderWidth="1px"
              borderRadius="md"
              p={3}
              mb={4}
              height="300px"
              overflowY="auto"
              bg="gray.50"
            >
              {/* Display chat messages */}
              {chatMessages.map((msg, index) => (
                <Box key={index} alignSelf={msg.sender === 'User' ? 'flex-end' : 'flex-start'}>
                  <Text fontWeight={msg.sender === 'User' ? 'bold' : 'normal'}>{msg.sender}: {msg.text}</Text>
                </Box>
              ))}
            </VStack>
            
            {/* Message Input and Send Button */}
            <Box mt="auto">
              <Input
                placeholder="Type a message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                mb={2}
              />
              <Button onClick={handleSendMessage} colorScheme="blue" width="100%">
                Send
              </Button>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
