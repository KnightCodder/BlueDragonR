import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html';
import fs from 'fs';

export default async function Home() {
  const filePath = path.join(process.cwd(), '../engine/doc.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <>
      <div dangerouslySetInnerHTML={{__html : contentHtml}} />
    </>
  );
}
