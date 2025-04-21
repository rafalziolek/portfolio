import matter from "gray-matter";
import { imageSizeFromFile } from 'image-size/fromFile'
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

export async function getImagesData(relativeDirPath) {
  const imageDirPath = path.join(process.cwd(), relativeDirPath);
  const publicBaseDir = path.basename(relativeDirPath);


  let fileNames;
  try {
    fileNames = await readDirectory(relativeDirPath);
  } catch (error) {
    console.error(`Error reading directory ${relativeDirPath}:`, error);
    return [];
  }

  const photos = fileNames
    .filter(fileName => !fileName.startsWith('.'))
    .map((fileName, index) => {
      return {
        id: index.toString(),
        src: `/${publicBaseDir}/${fileName}`,
        alt: `Photo ${index + 1}`,
      };
    });

  return photos;
  }