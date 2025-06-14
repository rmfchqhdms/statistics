import React from 'react';
import {
  Box,
  List,
  ListItem,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';

interface Dataset {
  id: number;
  name: string;
  created_at: string;
}

interface DatasetListProps {
  datasets: Dataset[];
  onSelectDataset: (dataset: Dataset) => void;
}

const DatasetList: React.FC<DatasetListProps> = ({ datasets, onSelectDataset }) => {
  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Text fontSize="xl" mb={4}>데이터셋 목록</Text>
      <List spacing={3}>
        {datasets.map((dataset) => (
          <ListItem key={dataset.id}>
            <Box p={3} borderWidth={1} borderRadius="md">
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold">{dataset.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  생성일: {new Date(dataset.created_at).toLocaleDateString()}
                </Text>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => onSelectDataset(dataset)}
                >
                  분석하기
                </Button>
              </VStack>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DatasetList; 