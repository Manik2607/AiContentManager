import React, { useEffect, useState } from "react";
import { storage } from "../firebase/firebase";
import { getDownloadURL, listAll, ref, deleteObject } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Shadcn UI card for grouping files
import { ScrollArea } from "@/components/ui/scroll-area"; // Shadcn UI scroll area
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FileItem {
    id: string;
    name: string;
    url: string;
}

const FilesPage: React.FC = () => {
    const [pdfFiles, setPdfFiles] = useState<FileItem[]>([]);
    const [pptxFiles, setPptxFiles] = useState<FileItem[]>([]);
    const [imageFiles, setImageFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFiles = async (
            folderName: string,
            setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
        ) => {
            try {
                const storageRef = ref(storage, `${folderName}/`);
                const res = await listAll(storageRef);
                const filePromises = res.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return { id: item.name, name: item.name, url };
                });
                const files = await Promise.all(filePromises);
                setFiles(files);
            } catch (error) {
                console.error(`Error fetching files from ${folderName}: `, error);
            }
        };

        const loadFiles = async () => {
            setLoading(true);
            await Promise.all([
                fetchFiles("PDF", setPdfFiles),
                fetchFiles("PPTX", setPptxFiles),
                fetchFiles("JPG", setImageFiles),
            ]);
            setLoading(false);
        };

        loadFiles();
    }, []);

    // Handle delete file
    const handleDelete = async (file: FileItem, setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>) => {
        try {
            const folderName = file.name.split(".").at(-1)?.toUpperCase();
            const fileRef = ref(storage, `${folderName}/${file.name}`);
            await deleteObject(fileRef);
            setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
        } catch (error) {
            console.error(`Error deleting file ${file.name}: `, error);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p>Loading files...</p>
            </div>
        );
    }

    return (
      <div className="w-full h-full p-10">
        <h1 className="text-3xl mb-6">Files</h1>
        <Tabs defaultValue="pdf">
          <TabsList>
            <TabsTrigger value="pdf">PDF Files</TabsTrigger>
            <TabsTrigger value="pptx">PPTX Files</TabsTrigger>
            <TabsTrigger value="images">Image Files</TabsTrigger>
          </TabsList>
          <TabsContent value="pdf">
            <ScrollArea className="max-h-[80vh] p-4 border rounded-lg">
              <Card className="mb-6 p-6">
                <h2 className="text-2xl font-bold mb-4">PDF Files</h2>
                <ul>
                  {pdfFiles.length > 0 ? (
                    pdfFiles.map((file) => (
                      <li key={file.id} className="mb-4">
                        <div className="flex justify-between items-center">
                          <span>{file.name}</span>
                          <div>
                            <Button onClick={() => window.open(file.url)}>
                              View
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(file, setPdfFiles)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No PDF files found.</p>
                  )}
                </ul>
              </Card>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="pptx">
            <ScrollArea className="max-h-[80vh] p-4 border rounded-lg">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">PPTX Files</h2>
                <ul>
                  {pptxFiles.length > 0 ? (
                    pptxFiles.map((file) => (
                      <li key={file.id} className="mb-4">
                        <div className="flex justify-between items-center">
                          <span>{file.name}</span>
                          <div>
                            <Button onClick={() => window.open(file.url)}>
                              View
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(file, setPptxFiles)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No PPTX files found.</p>
                  )}
                </ul>
              </Card>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="images">
            <ScrollArea className="max-h-[80vh] p-4 border rounded-lg">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Image Files</h2>
                <ul>
                  {imageFiles.length > 0 ? (
                    imageFiles.map((file) => (
                      <li key={file.id} className="mb-4">
                        <div className="flex justify-between items-center">
                          <span>{file.name}</span>
                          <div>
                            <Button onClick={() => window.open(file.url)}>
                              View
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(file, setImageFiles)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No Image files found.</p>
                  )}
                </ul>
              </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default FilesPage;
