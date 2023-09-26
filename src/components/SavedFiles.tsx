"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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

interface FileDetail {
  file_name: string;
  file_size: number;
  created_at: string;
}

const SavedFiles = () => {
  const [savedFiles, setSavedFiles] = useState<FileDetail[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/saved")
      .then((res) => {
        setSavedFiles(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [savedFiles]);

  if (loading) {
    return <div className="text-4xl my-10">Loading Data .....</div>;
  }

  return (
    <div className="my-10">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>File Size</TableCell>
              <TableCell>Creation Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedFiles?.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>{file.file_size}</TableCell>
                <TableCell>{file.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SavedFiles;
