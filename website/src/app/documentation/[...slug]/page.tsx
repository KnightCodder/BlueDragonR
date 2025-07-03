import FileNode from "@/interfaces/fileNode";
import displayEngineFilesTree from "@/lib/displayEngineFilesTree";
import engineFilesTree from "@/lib/engineFilesTree";
import { notFound } from "next/navigation";
import { Doc } from "@/componenets/Doc";

const filesTree: FileNode[] = displayEngineFilesTree(engineFilesTree('../engine'));


// Recursively finds and returns the address of the node at the given path
function fileExists(pathSegments: string[]): string {
  let currentLevel = filesTree;
  let matchedNode: FileNode | null = null;

  for (const segment of pathSegments) {
    matchedNode = currentLevel.find((node) => node.name === segment) || null;
    if (!matchedNode) return "";
    currentLevel = matchedNode.children || [];
  }

  return matchedNode?.address || "";
}

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  function traverse(node: FileNode, path: string[]) {
    params.push({ slug: [...path, node.name] });
    if (node.children) {
      for (const child of node.children) {
        traverse(child, [...path, node.name]);
      }
    }
  }

  for (const node of filesTree) {
    traverse(node, []);
  }

  return params;
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await props.params;
  const fileAddress = fileExists(slug);
  if (fileAddress === "") return notFound();

  return (
    <>
      <Doc fileAddress={fileAddress} />
    </>
  );
}
