import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import fs from "fs";
import path from "path";

export function CodeBlock({ fileAddress }: { fileAddress: string }) {
    let fullPath = "";

    if (fileAddress.toLowerCase().endsWith("makefile")) {
        fullPath = fileAddress;
    } else {
        // Read all files in the directory
        const files = fs.readdirSync(fileAddress);
        const codeFile = files.find(f => path.parse(f).name === "code");

        if (!codeFile) return <></>;

        fullPath = path.join(fileAddress, codeFile);
    }

    if (!fs.existsSync(fullPath)) return <div className="p-4 text-red-500">File not found: {fullPath}</div>;

    const code = fs.readFileSync(fullPath, "utf-8");

    return (
        <div className="p-4">
            <SyntaxHighlighter language="cpp" style={oneDark} wrapLongLines={true}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
