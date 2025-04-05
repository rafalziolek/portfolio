import matter from "gray-matter";

import fs from "fs/promises";
import path from "path";

export async function parsePost(slug) {
  const rawContent = await readFile(
    path.join(`/content/${slug}.mdx`)
  );
  const { data: frontmatter, content } = matter(rawContent);
  return {frontmatter, content};
}

export function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

export function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}