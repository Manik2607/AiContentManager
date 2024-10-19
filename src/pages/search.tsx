import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // th to your Firebase config
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card"; // Shadcn UI card for grouping files
import { ScrollArea } from "@/components/ui/scroll-area"; // Shadcn UI scroll area

interface FileItem {
  id: string;
  name: string;
  url: string;
  fileExtension: string;
  downloadURL: string;
  uploadedAt: string;
  fileName: string;
  contentType: string;
  user: {
    name: string;
    email: string;
  };
}

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<FileItem[]>([]);

    async function searchByDocumentName(collectionName: string, searchTerm: string) {
        const colRef = collection(db, collectionName);
        const querySnapshot = await getDocs(colRef);

        // Filter documents whose document ID starts with the search term
        const matchingDocs: Array<{ id: string; [key: string]: any }> = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            if (doc.id.startsWith(searchTerm)) {
                matchingDocs.push({ id: doc.id, ...doc.data() });
            }
        });

        return matchingDocs;
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        searchByDocumentName("files", searchTerm).then((res) => {
            setSearchResults(res);
            console.log(res);
        });
    };

    return (
      <div className="w-full h-full p-10">
        <h1 className="text-3xl mb-6">Search File in Database:</h1>
        <div className="flex mb-6">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-4"
          />
          <Button onClick={handleSearch} type="submit">
            Search
          </Button>
        </div>
        <ScrollArea className="max-h-[80vh] p-4 border rounded-lg">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <ul>
              {searchResults.length > 0 ? (
                searchResults.map((file) => (
                  <li key={file.id} className="mb-4">
                    <div className="flex justify-between items-center">
                      <span>{file.fileName}</span>
                      <div>
                        <Button onClick={() => window.open(file.downloadURL)}>
                          View
                        </Button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No files found.</p>
              )}
            </ul>
          </Card>
        </ScrollArea>
      </div>
    );
}