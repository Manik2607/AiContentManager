import { useState } from "react";
import { Button } from "@/components/ui/button"; // Example import path for Shadcn UI Button
import { Input } from "@/components/ui/input"; // Example import path for Shadcn UI Input
import { Label } from "@/components/ui/label"; // Example import path for Shadcn UI Label
import { Card } from "@/components/ui/card";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-96 p-10">
          <h2 className="text-2xl font-bold mb-4">Upload</h2>
          <form className="w-full">
            <div className="mb-4">
              <Label htmlFor="file" className="block mb-2">
                File:
              </Label>
              <Label className="block mb-2">{file && file.name}</Label>
              <Input
                id="file"
                type="file"
                className="w-full"
                required
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </div>
            <div className="flex">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
                Upload
              </Button>
              <div className="flex-grow"></div>
              {/* <Link className="px-8 py-1 text-blue-500" to="/register">
                Register now
              </Link> */}
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
