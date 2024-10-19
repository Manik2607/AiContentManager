import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { auth, storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null); // Ref to file input
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails({
            email: docSnap.data().email,
            name: docSnap.data().name,
          });
        }
      }
    });
    return unsubscribe;
  }, []);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const folder_name = (file.name.split(".").at(-1) || "").toUpperCase();
    const storageRef = ref(storage, `${folder_name}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setError(null);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          "Upload is " +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 +
            "% done"
        );
      },
      (error) => {
        setError(error.message);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setDownloadURL(downloadURL);
          const metadata = {
            fileName: file.name,
            uploadedAt: new Date().toISOString(),
            contentType: file.type,
            fileExtension: file.name.split(".").at(-1),
            downloadURL: downloadURL,
            user: userDetails,
          };
          if (metadata.fileExtension) {
            await setDoc(
              doc(db, "files", metadata.fileExtension.toUpperCase()),
              metadata
            );
          }
          setUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (downloadURL) {
      toast({
        title: "File uploaded successfully!",
        description: "You can download the file from My Files page.",
      });
    }
  }, [downloadURL, toast]);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);

      // Programmatically set the dropped file to the input field
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        inputRef.current.files = dataTransfer.files; // Programmatically set the files
      }

      e.dataTransfer.clearData();
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  interface UserDetails {
    email: string;
    name: string;
  }

  if (!userDetails) {
    return (
      <div className="flex flex-col items-center justify-center w-full flex-grow">
        <Card className="w-96 p-10">
          <h2 className="text-2xl font-bold mb-4">Upload</h2>
          <p className="text-red-500 pb-3">
            You must be signed in to upload files.
          </p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login now
          </Link>
          <div className="flex mt-3">
            <p className="mr-8">Don't have an account?</p>
            <Link to="/register" className="text-blue-500 hover:underline ">
              Register now
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full flex-grow">
      <Card className="w-96 p-10">
        <h2 className="text-2xl font-bold mb-4">Upload</h2>

        {/* Drag and Drop Area */}
        <div
          className={`border-dashed border-2 p-4 mb-4 ${
            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-center">
            {file
              ? `File: ${file.name}`
              : "Drag and drop a file here or use the input below"}
          </p>
        </div>

        <form className="w-full" onSubmit={handleUpload}>
          <div className="mb-4">
            <Label htmlFor="file" className="block mb-2">
              Or select a file:
            </Label>
            <Input
              id="file"
              type="file"
              className="w-full"
              onChange={handleFileChange}
              required
              ref={inputRef} // Ref to the input element
            />
            {/* Display the file name below the input if a file is selected */}
            {file && <p className="mt-2 text-gray-600">{file.name}</p>}
          </div>
          <div className="flex">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            <div className="flex-grow"></div>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {downloadURL && (
          <p className="text-green-500 mt-4">
            File uploaded successfully! <a href={downloadURL}>Download</a>
          </p>
        )}
      </Card>
    </div>
  );
}
