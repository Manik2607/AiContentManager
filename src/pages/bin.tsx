import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Shadcn UI card for grouping files
import { ScrollArea } from "@/components/ui/scroll-area"; // Shadcn UI scroll area
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input"; // Shadcn UI input for search bar
import { Download, File } from "lucide-react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";


interface FileItem {
  id: string;
  name: string;
  url: string;
}

const BinPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Add search state

  // Dummy data for deleted files
  // await setDoc(doc(db, "deleted", file.name),file);

const [deletedFiles, setDeletedFiles] = useState<FileItem[]>([]);

useEffect(() => {
    const fetchDeletedFiles = async () => {
        const querySnapshot = await getDocs(collection(db, "deleted"));
        const files: FileItem[] = [];
        querySnapshot.forEach((doc) => {
            files.push({ id: doc.id, ...doc.data() } as FileItem);
        });
        setDeletedFiles(files);
    };

    fetchDeletedFiles();
}, []);


  // Filter function for searching files
  const filterFiles = (files: FileItem[]) =>
    files.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="w-full h-full p-10">
      <h1 className="text-3xl mb-6">Bin</h1>
      <Tabs defaultValue="deleted">
        <TabsList>
          <TabsTrigger value="deleted">Deleted Files</TabsTrigger>
        </TabsList>

        {/* Search input for filtering */}
        <div className="my-4">
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Deleted Files Tab */}
        <TabsContent value="deleted">
          <ScrollArea className="max-h-[80vh] p-4 border rounded-lg">
            <Card className="mb-6 p-6">
              <h2 className="text-2xl font-bold mb-4">Deleted Files</h2>
              <ul>
                {filterFiles(deletedFiles).length > 0 ? (
                  filterFiles(deletedFiles).map((file) => (
                    <li
                      key={file.id}
                      className="mb-1 bg-secondary rounded-lg p-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex">
                          <File className="mx-2" />
                          <span>{file.name}</span>
                        </div>
                        <div className="flex">
                          <Button
                            className="bg-green-500 mx-1 text-white hover:bg-green-600"
                            onClick={() => window.open(file.url)}
                          >
                            <Download size={24} />
                            Download
                          </Button>
                          <Button className="bg-blue-500 mx-1 text-white hover:bg-blue-600">
                            Restore
                          </Button>
                          <Button variant="destructive">
                            Delete Permanently
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No deleted files found.</p>
                )}
              </ul>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BinPage;
