import { GridItem, Box, Text } from '@chakra-ui/react';

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
  highlightedSection: string | null;
  textContent: SectionContent | null;
  highlightSection: (sectionId: string) => void;
};

function Paper({ textContent, highlightSection, highlightedSection }: PaperProps) {
  return (
    <GridItem>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        height="100%"
        maxHeight="100vh" // Ensure it doesn't exceed the viewport height
        overflowY="auto"
        bg="white" // White background for the box
      >
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          No, Bionic Reading does not work
        </Text>
        <Text>by Joshua Snell</Text>

        {/* Conditionally render sections once textContent is available */}
        {textContent && (
          <>
            {/* Abstract Section */}
            <Box
              bg={highlightedSection === 'abstract' ? 'yellow.200' : 'transparent'}
              p={2}
              mt={4}
              borderRadius="md"
              onClick={() => highlightSection('abstract')}
            >
              <Text fontSize="lg" mt={4}>
                Abstract
              </Text>
              <Text id="abstract">It has recently been claimed that presenting text with the first half of each word printed in bold (<strong>a</strong>s <strong>i</strong>s <strong>d</strong>one <strong>i</strong>n <strong>t</strong>his <strong>e</strong>xample), so-called Bionic Reading, facilitates reading. However, empirical tests of this claim are lacking, and theoretically one might expect a cost rather than a benefit. Here I tested participants' reading speed of 100 paragraphs that were presented either in 'Bionic' or in normal font. Statistical analyses revealed no significant difference in reading times between Bionic and normal reading. I conclude that Bionic Reading does not facilitate reading.</Text>

            </Box>

            {/* Introduction Sections */}
            <Text p={2} mt={4} fontSize="lg">1. Introduction</Text>
            {Object.keys(textContent).map((key) => {
              if (key.startsWith('intro')) {
                return (
                  <Box
                    key={key}
                    bg={highlightedSection === key ? 'yellow.200' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                    onClick={() => highlightSection(key)}
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
                    bg={highlightedSection === key ? 'yellow.200' : 'transparent'}
                    p={2}
                    mt={4}
                    borderRadius="md"
                    onClick={() => highlightSection(key)}
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
