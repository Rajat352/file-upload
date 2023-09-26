"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import SavedFiles from "../components/SavedFiles";

interface FileDetail {
  name: string;
  size: number;
  createdAt: string;
}

const FileUpload = () => {
  const [fileDetails, setFileDetails] = useState<FileDetail[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setErrorMessage("");

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const filteredFiles = response.data.filter(
        (file: FileDetail) => file.size <= 2 * 1024 * 1024
      );

      setFileDetails(filteredFiles);

      if (response.data.length !== filteredFiles.length) {
        setErrorMessage(
          "Some files exceed the 2MB size limit and were not uploaded."
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setErrorMessage("An error occurred while uploading files.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const saveFile = async (file: FileDetail) => {
    try {
      const res = await axios.post("http://localhost:3001/save", file);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-10">
      <div
        {...getRootProps()}
        className="dropzone border border-solid border-black rounded-lg h-20 my-10"
      >
        <input {...getInputProps()} />
        <p className="text-center">
          Drag & drop files here, or click to select files
        </p>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>File Size</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileDetails.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.createdAt}</TableCell>
                <TableCell>
                  <Button onClick={() => saveFile(file)}>Save</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SavedFiles />
    </div>
  );
};

export default FileUpload;
