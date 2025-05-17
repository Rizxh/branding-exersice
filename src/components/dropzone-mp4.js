import React, { useCallback, useState } from "react";
import { Box, Input, Text, useColorModeValue, AspectRatio } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

const VideoUploadDropzone = ({ onFileUploaded, value }) => {
  const [bannerLogo, setBannerLogo] = useState(value);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileUploaded(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerLogo(reader.result); // Mengirim data URL ke parent component
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "video/*",
  });

  return (
    <Box
      p={1.5}
      borderWidth={2.5}
      borderColor={borderColor}
      borderRadius="md"
      bg={bgColor}
      cursor="pointer"
      textAlign="center"
      {...getRootProps()}
    >
      <Input {...getInputProps()} />
      {isDragActive ? (
        <Text>Drop the files here ...</Text>
      ) : (
        <Text>Upload Video</Text>
      )}
      {bannerLogo && (
        <Box mt={4}>
          <Text>Selected file:</Text>
          <AspectRatio ratio={16 / 9}>
            <video src={bannerLogo} controls/>
          </AspectRatio>
        </Box>
      )}
    </Box>
  );
};

export default VideoUploadDropzone;
