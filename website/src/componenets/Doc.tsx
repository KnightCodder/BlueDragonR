import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";

export function Doc({ fileAddress }: { fileAddress: string }) {
    const fullPath = path.join(fileAddress, "doc.md");

    let markdown = "";

    if (fs.existsSync(fullPath)) {
        try {
            markdown = fs.readFileSync(fullPath, "utf-8");
        } catch (err) {
            markdown = "# ⚠️ Error loading documentation";
            console.error(err);
        }
    }

    return (
        <>
            <CodeBlock fileAddress={fileAddress} />
            <div className="prose max-w-none p-4">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </>
    );
}