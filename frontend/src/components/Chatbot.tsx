import { Box, GridItem, Input, Text, VStack, HStack, IconButton} from '@chakra-ui/react'
import { Send } from 'react-feather';

interface ChatMessage {
    sender: string;
    text: string;
  }

type ChatBotProps = {
    chatMessages: ChatMessage[];
    userMessage: string;
    setUserMessage: (message: string) => void;
    handleSendMessage: () => void;
}

function Chatbot({
    chatMessages,
    userMessage,
    setUserMessage,
    handleSendMessage
}: ChatBotProps) {
  return (
    <GridItem mt={10}>
    <Box borderWidth="1px" borderRadius="lg" p={4} maxHeight="100vh" display="flex" flexDirection="column">
      <Text fontSize="lg" mb={2} fontWeight="bold" textAlign="center">Chatbot 🤖</Text>
      <VStack
        spacing={3}
        align="stretch"
        borderWidth="1px"
        borderRadius="md"
        p={3}
        mb={4}
        overflowY="auto"
        bg="gray.50"
        flexGrow={1}
      >
        {/* Display chat messages */}
        {chatMessages.map((msg, index) => (
          <Box key={index} alignSelf={msg.sender === 'User' ? 'flex-end' : 'flex-start'}>
            <Text fontWeight={msg.sender === 'User' ? 'bold' : 'normal'}>
              {msg.sender}: {msg.text}
            </Text>
          </Box>
        ))}
      </VStack>

      {/* Message Input and Send Button */}
      <Box mt="auto">
        <HStack mb={2}>
        <Input
          placeholder="Type a message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <IconButton 
        aria-label='Send Message'
        icon={<Send />}
        onClick={handleSendMessage} colorScheme="teal" >
          Send
        </IconButton>
        </HStack>
      </Box>
    </Box>
  </GridItem>
  )
}

export default Chatbot