import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text } from '@chakra-ui/react';
import DatasetUpload from './components/DatasetUpload';
import DatasetList from './components/DatasetList';
import AnalysisResults from './components/AnalysisResults';

function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={8} align="stretch">
          <Heading>통계 분석 시스템</Heading>
          
          <DatasetUpload onUploadSuccess={(newDataset) => {
            setDatasets([...datasets, newDataset]);
          }} />
          
          <DatasetList 
            datasets={datasets}
            onSelectDataset={setSelectedDataset}
          />
          
          {selectedDataset && (
            <AnalysisResults 
              dataset={selectedDataset}
              onAnalysisComplete={setAnalysisResults}
            />
          )}
          
          {analysisResults && (
            <Box p={4} borderWidth={1} borderRadius="lg">
              <Heading size="md">분석 결과</Heading>
              <Text mt={2}>{JSON.stringify(analysisResults, null, 2)}</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App; 
 