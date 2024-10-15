import { Box, GridItem, Input, Text, VStack, HStack, IconButton, Button} from '@chakra-ui/react'
import { Send } from 'react-feather';

interface ChatMessage {
    sender: string;
    text: string;
    highlightedSections: string[] | null;
  }

type ChatBotProps = {
    chatMessages: ChatMessage[];
    userMessage: string;
    setUserMessage: (message: string) => void;
    handleSendMessage: () => void;
    handleClick: (section: string) => void;
    isLoading: boolean;
}

function Chatbot({
    chatMessages,
    userMessage,
    setUserMessage,
    handleSendMessage,
    isLoading,
    handleClick
}: ChatBotProps) {
  return (
    <GridItem mt={10}>
    <Box borderWidth="1px" borderRadius="lg" p={4} maxHeight="100vh" display="flex" flexDirection="column">
      <Text fontSize="3xl" mb={2} fontWeight="bold" textAlign="center">ChatPaper</Text>
      <VStack
        spacing={3}
        align="stretch"
        p={3}
        mb={4}
        overflowY="auto"
        flexGrow={1}
      >
        {/* Display chat messages */}
        {chatMessages.map((msg, index) => (
            <Box 
                key={index} 
                alignSelf={msg.sender === 'User' ? 'flex-end' : 'flex-start'} 
                maxW="80%" 
                p={3}
                borderRadius="lg" 
                bg={msg.sender === 'User' ? 'teal.100' : 'gray.100'}
                mb={4}
            >
                <Text fontWeight={msg.sender === 'User' ? 'bold' : 'normal'}>
                {msg.sender}: {msg.text}
                </Text>
                {msg.highlightedSections && (
                <HStack mt={2}>
                    {msg.highlightedSections.map((section: string, sectionIndex: number) => (
                    <Button 
                        key={sectionIndex}
                        variant="ghost" 
                        colorScheme="teal"
                        onClick={() => handleClick(section)}
                        sx={{
                        _focus: {
                            outline: '2px solid',
                            outlineColor: 'teal.500'
                        }
                        }}
                    >
                        {section}
                    </Button>
                    ))}
                </HStack>
                )}
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
        onClick={handleSendMessage} colorScheme="teal"
        isLoading={isLoading}>
          Send
        </IconButton>
        </HStack>
      </Box>
    </Box>
  </GridItem>
  )
}

export default Chatbot