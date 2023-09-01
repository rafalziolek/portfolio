import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function loadCaseStudy(slug) {
  const rawContent = await readFile(`/content/${slug}.mdx`);
  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
}

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
