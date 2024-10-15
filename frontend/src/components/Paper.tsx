import { GridItem, Box, Text, VStack, Image } from '@chakra-ui/react';
import figure1 from '../assets/fig1.jpg';
import figure2 from '../assets/fig2.jpg';
import "./Paper.css"

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

type PaperProps = {
  highlightedSections: string[] | null;
  textContent: SectionContent | null;
};

function Paper({ textContent, highlightedSections }: PaperProps) {
  return (
    <GridItem mt={10} className="eb-garamond-custom-component">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={10}
        maxHeight="100vh" // Ensure it doesn't exceed the viewport height
        overflowY="auto"
        bg="white" // White background for the box
      >
        <Text fontSize="4xl" p={2} mt={4} fontWeight="bold" mb={2}>
          No, Bionic Reading does not work
        </Text>
        <Text p={2}>by Joshua Snell</Text>

        {/* Conditionally render sections once textContent is available */}
        {textContent && (
          <>
            {/* Abstract Section */}
            <Box
              bg={highlightedSections?.includes('Abstract') ? 'teal.100' : 'transparent'}
              p={2}
              mt={4}
              borderRadius="md"
            >
              <Text fontSize="lg" mt={4} fontWeight="bold">
                Abstract
              </Text>
              <Text id="Abstract" mt={4}>It has recently been claimed that presenting text with the first half of each word printed in bold (<strong>a</strong>s <strong>i</strong>s <strong>d</strong>one <strong>i</strong>n <strong>t</strong>his <strong>e</strong>xample), so-called Bionic Reading, facilitates reading. However, empirical tests of this claim are lacking, and theoretically one might expect a cost rather than a benefit. Here I tested participants' reading speed of 100 paragraphs that were presented either in 'Bionic' or in normal font. Statistical analyses revealed no significant difference in reading times between Bionic and normal reading. I conclude that Bionic Reading does not facilitate reading.</Text>

            </Box>

            {/* Introduction Sections */}
            <Text p={2} mt={4} fontSize="lg" fontWeight="bold">1. Introduction</Text>
            {Object.keys(textContent).map((key) => {
              if (key.startsWith('intro')) {
                return (
                  <Box
                    key={key}
                    bg={highlightedSections?.includes(key)? 'teal.100' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                  >
                    <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                  </Box>
                );
              }
              return null;
            })}

            {Object.keys(textContent).map((key) => {
              if (key.startsWith('section1') && key !== 'section ids') {
                return (
                  <Box
                    key={key}
                    bg={highlightedSections?.includes(key) ? 'teal.100' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                  >
                    <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                  </Box>
                );
              }
              return null;
            })}


            <Text p={2} mt={4} fontSize="lg" fontWeight="bold">2. Methods</Text>
            {Object.keys(textContent).map((key) => {
              if (key.startsWith('section2') && !key.startsWith('section2-4') &&
              key !== 'section ids') {
                return (
                  <Box
                    key={key}
                    bg={highlightedSections?.includes(key) ? 'teal.100' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                  >
                    <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                  </Box>
                );
              } else if (key.startsWith('section2-4')) {
                return (
                <VStack p={2}>
                    <Image src={figure1} alt="fig1.jpg" mt={4}/>
                    <Text mt={2}>Fig. 1. Trial example. The size of letters relative to the screen 
                        is exaggerated here for the sake of visibility.</Text>
                <Box
                    key={key}
                    bg={highlightedSections?.includes(key) ? 'teal.100' : 'transparent'}
                    mt={4}
                    borderRadius="md"
                  >
                    <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                  </Box>
                  </VStack>
                );
              }
              return null;
            })}

            <Text p={2} mt={4} fontSize="lg" fontWeight="bold">3. Results</Text>
            {Object.keys(textContent).map((key) => {
              if (key.startsWith('section3') && !key.startsWith('section3-3') && 
              key !== 'section ids') {
                return (
                  <Box
                    key={key}
                    bg={highlightedSections?.includes(key) ? 'teal.100' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                  >
                    <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                  </Box>
                );
              } else if (key.startsWith('section3-3')) {
                return (
                    <VStack p={2}>
                        <Image src={figure2} alt="fig2.jpg" mt={4}/>
                    <Text mt={2}>Fig. 2. Average reading times (s) 
                    in Bionic and normal reading, respectively. Error bars indicate SEs.</Text>
                    <Box
                      key={key}
                      bg={highlightedSections?.includes(key) ? 'teal.100' : 'transparent'}
                      mt={4}
                      borderRadius="md"
                    >
                      <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                    </Box>
                    </VStack>
                  );
              }
              return null;
            })}

            <Text p={2} mt={4} fontSize="lg" fontWeight="bold">4. Discussion</Text>
            {Object.keys(textContent).map((key) => {
              if (key.startsWith('section4') && key !== 'section ids') {
                return (
                  <Box
                    key={key}
                    bg={highlightedSections?.includes(key) ? 'teal.100' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                  >
                    <Text id={key}>{textContent[key as keyof SectionContent]}</Text>
                  </Box>
                );
              }
              return null;
            })}
          </>
        )}
      </Box>
    </GridItem>
  );
}

export default Paper;
