import FileNode from "@/interfaces/fileNode";
import fs from 'fs';
import path from "path";

interface EntryInfo {
    name: string;
    type: "file" | "folder";
}

function getSubdirectories(dirPath: string): EntryInfo[] {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .map((dirent) => ({
        name: dirent.name,
        type: dirent.isDirectory() ? "folder" : "file",
    }));
}

export default function engineFilesTree(root : string) : FileNode[]
{
    const fileTree : FileNode[] = [];
    
    if (fs.statSync(root).isFile()) return [];

    // code to get engine files
    const entries : EntryInfo[] = getSubdirectories(root);

    for (const entry of entries) {
        fileTree.push({
            name : entry.name,
            type : entry.type,
            address : path.join(root, entry.name),
            children : engineFilesTree(path.join(root, entry.name))
        });
    }

    return fileTree;
}
