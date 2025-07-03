export default interface FileNode {
    name: string;
    address: string;
    type: "file" | "folder";
    children: FileNode[];
}
