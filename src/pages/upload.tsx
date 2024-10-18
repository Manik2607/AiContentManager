import { useState } from "react";
import { Button } from "@/components/ui/button"; // Example import path for Shadcn UI Button
import { Input } from "@/components/ui/input"; // Example import path for Shadcn UI Input
import { Label } from "@/components/ui/label"; // Example import path for Shadcn UI Label
import { Card } from "@/components/ui/card";
import { storage } from "@/firebase/firebase"; // Adjust the import path as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const folder_name = file.name.split(".")[1].toUpperCase();
    const storageRef = ref(storage, `${folder_name}/${file.name}`);
    //get metadata of file

    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setError(null);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress
      },
      (error) => {
        setError(error.message);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
      const metadata = {
        fileName: file.name,
        uplodedAt: new Date().toISOString(),
        contentType: file.type,
        fileExtension: file.name.split(".")[1],
        downloadURL: downloadURL,
      };
      console.log(metadata);
          setUploading(false);
        });
      }
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full flex-grow">
        <Card className="w-96 p-10">
          <h2 className="text-2xl font-bold mb-4">Upload</h2>
          <form className="w-full" onSubmit={handleUpload}>
            <div className="mb-4">
              <Label htmlFor="file" className="block mb-2">
                File:
              </Label>
              <Input
                id="file"
                type="file"
                className="w-full"
                required
                onChange={(e: any) => setFile(e.target.files[0])}
              />
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
    </>
  );
}
