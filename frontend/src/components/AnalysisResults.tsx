import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';

interface Dataset {
  id: number;
  name: string;
}

interface AnalysisResultsProps {
  dataset: Dataset;
  onAnalysisComplete: (results: any) => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  dataset,
  onAnalysisComplete,
}) => {
  const [analysisType, setAnalysisType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleAnalysis = async () => {
    if (!analysisType) {
      toast({
        title: '분석 유형을 선택해주세요',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/datasets/${dataset.id}/analysis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ analysis_type: analysisType }),
        }
      );

      if (!response.ok) {
        throw new Error('분석 실패');
      }

      const results = await response.json();
      onAnalysisComplete(results);
      
      toast({
        title: '분석 완료',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: '분석 실패',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl">데이터셋 분석</Text>
        <Text>선택된 데이터셋: {dataset.name}</Text>
        
        <Select
          placeholder="분석 유형 선택"
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
        >
          <option value="pca">주성분 분석 (PCA)</option>
          <option value="clustering">군집 분석</option>
        </Select>
        
        <Button
          colorScheme="blue"
          onClick={handleAnalysis}
          isLoading={isLoading}
          isDisabled={!analysisType}
        >
          분석 시작
        </Button>
      </VStack>
    </Box>
  );
};

export default AnalysisResults; 