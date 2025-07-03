import FileNode from "@/interfaces/fileNode";

export default function displayEngineFilesTree(fileTree: FileNode[]): FileNode[] {
    const displayFileTree: FileNode[] = [];

    for (const file of fileTree) {
        // Include Makefile directly
        if (file.name.toLowerCase() === "makefile" && file.type === "file") {
            displayFileTree.push(file);
            continue;
        }

        // Process folders that contain code.* files
        if (file.type === "folder" && file.children.length > 0) {
            let done = false;

            for (const f of file.children) {
                if (f.type === "file" && f.name.startsWith("code.")) {
                    const extension = f.name.split(".")[1]; // e.g., "cpp"
                    displayFileTree.push({
                        name: `${file.name}.${extension}`,
                        type: "file",
                        address: file.address,
                        children: []
                    });
                    done = true;
                }
            }

            if (!done)
            {
                displayFileTree.push({
                    name: file.name,
                    type: "folder",
                    address: file.address,
                    children: displayEngineFilesTree(file.children),
                });
            }
        }


    }

    return displayFileTree;
}
