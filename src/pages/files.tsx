import React, { useEffect, useState } from 'react';
import {storage } from "../firebase/firebase";
// import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, listAll,ref } from 'firebase/storage';
import { Button } from '@/components/ui/button';

const FilesPage: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);



    useEffect(
        () => {
            try {
                const storageRef = ref(storage, 'PDF/');
                listAll(storageRef).then((res) => {
                    res.items.forEach((item) => {                        
                        getDownloadURL(item).then((url) => {
                            setFiles((prev) => [...prev, { id: item.name, name: item.name, url }]);
                        });
                    });
                });
            
            } catch (error) {
                console.error('Error fetching files: ', error);
            } finally {
                setLoading(false);
            }
        }
    , []);
    
    if (loading) {
        return <div className='w-full h-full flex justify-center items-center'>Loading...</div>;
    }

    return (
        <div className='w-full h-full p-10'>
            <h1>Files</h1>
            <ul className='p-10'>
                {files.map(file => (
                <>
                    <li key={file.id}>{file.name}</li>
                    <Button onClick={() => window.open(file.url)}>View</Button>
                </>
                ))}
            </ul>
        </div>
    );
};

export default FilesPage;