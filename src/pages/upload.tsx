import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Example import path for Shadcn UI Button
import { Input } from "@/components/ui/input"; // Example import path for Shadcn UI Input
import { Label } from "@/components/ui/label"; // Example import path for Shadcn UI Label
import { Card } from "@/components/ui/card";
import { auth, storage } from "@/firebase/firebase"; // Adjust the import path as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const {toast} = useToast();

  //user details
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails({
            email: docSnap.data().email,
            name: docSnap.data().name,
          });
          console.log("userDetails");
          console.log(userDetails);
        } else {
          console.log("No such document!");
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
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setDownloadURL(downloadURL);
          const metadata = {
            fileName: file.name,
            uplodedAt: new Date().toISOString(),
            contentType: file.type,
            fileExtension: file.name.split(".").at(-1),
            downloadURL: downloadURL,
            user: userDetails,
          };
          if (metadata.fileExtension) {
            setDoc(doc(db, "files", metadata.fileExtension.toUpperCase()), metadata)
              .then(() => {
                console.log("Document written with ID: ", metadata.contentType);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          } else {
            console.error("File extension is undefined");
          }
          console.log(metadata);
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
        });    }
  }, [downloadURL]);

  interface UserDetails {
    email: string;
    name: string;
  }

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
