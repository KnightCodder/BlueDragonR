import FileNode from "@/interfaces/fileNode";

export function SideNav({ files }: { files: FileNode[] }) {
    return (
        <>
            <FileTab entries={files} level={0} />
        </>
    );
}

function FileTab({ entries, level }: { entries: FileNode[], level: number }) {
    return (
        <ul className="pl-2">
            {entries.map((entry) => (
                <li key={`${entry.address}\\${entry.name}`} className={`pl-${level * 2}`}>
                    {entry.name}
                    {entry.children && (
                        <FileTab entries={entry.children} level={level + 1} />
                    )}
                </li>
            ))}
        </ul>
    );
}