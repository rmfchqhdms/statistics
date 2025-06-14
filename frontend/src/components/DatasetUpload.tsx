import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

interface DatasetUploadProps {
  onUploadSuccess: (dataset: any) => void;
}

const DatasetUpload: React.FC<DatasetUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: '파일을 선택해주세요',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('업로드 실패');
      }

      const data = await response.json();
      onUploadSuccess(data);
      
      toast({
        title: '업로드 성공',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: '업로드 실패',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <FormControl>
        <FormLabel>데이터셋 업로드</FormLabel>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          mb={4}
        />
        <Button
          colorScheme="blue"
          onClick={handleUpload}
          isDisabled={!file}
        >
          업로드
        </Button>
      </FormControl>
    </Box>
  );
};

export default DatasetUpload; 