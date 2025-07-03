import { SideNav } from "@/componenets/SideNav";
import FileNode from "@/interfaces/fileNode";
import engineFilesTree from "@/lib/engineFilesTree";
import displayEngineFilesTree from "@/lib/displayEngineFilesTree";

export default function DocumentationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const filesTree: FileNode[] = displayEngineFilesTree(engineFilesTree('../engine'));

    return (
        <>
            <SideNav files= {filesTree} />
            {children}
        </>
    );
}