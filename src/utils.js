import matter from "gray-matter";
import { imageSizeFromFile } from 'image-size/fromFile'
import fs from "fs/promises";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

// Mapping from route slugs to actual directory names
const slugToDirectoryMap = {
  'watson-design-system': 'watson',
  'runchise': 'runchise',
  'docplanner-ia': 'docplanner-ia',
  'nikola': 'nikola',
  'multitood': 'multitood'
};

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

export async function getProjectImages(projectSlug) {
  // Map the slug to the actual directory name
  const directoryName = slugToDirectoryMap[projectSlug] || projectSlug;
  const projectDirPath = `public/projects/${directoryName}`;
  
  console.log(`Getting images for slug: ${projectSlug}, directory: ${directoryName}, path: ${projectDirPath}`);
  
  let fileNames;
  try {
    fileNames = await readDirectory(projectDirPath);
  } catch (error) {
    console.error(`Error reading directory ${projectDirPath}:`, error);
    return [];
  }

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const imageFiles = fileNames.filter(fileName => 
    !fileName.startsWith('.') && 
    imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext))
  );

  console.log(`Found ${imageFiles.length} image files:`, imageFiles);

  const images = await Promise.all(
    imageFiles.map(async (fileName, index) => {
      const imagePath = path.join(process.cwd(), projectDirPath, fileName);
      
      try {
        const dimensions = await imageSizeFromFile(imagePath);
        return {
          id: index.toString(),
          src: `/projects/${directoryName}/${fileName}`,
          alt: `${projectSlug} image ${index + 1}`,
          width: dimensions.width || 1600,
          height: dimensions.height || 1200,
        };
      } catch (error) {
        console.error(`Error getting dimensions for ${fileName}:`, error);
        return {
          id: index.toString(),
          src: `/projects/${directoryName}/${fileName}`,
          alt: `${projectSlug} image ${index + 1}`,
          width: 1600,
          height: 1200,
        };
      }
    })
  );

  console.log(`Returning ${images.length} processed images`);
  return images;
}

export const getColorPlaceholder = async (imagePath) => {
  // Construct the full file system path assuming images are in /public
  const fullPath = path.join("public", imagePath);

  try {
    // Use the constructed full path with your existing readFile helper
    const fileBuffer = await fs.readFile(path.join(process.cwd(), fullPath));

    // getPlaiceholder works with the buffer directly
    const { color } = await getPlaiceholder(fileBuffer);
    // Return the hex value which is likely what's needed for CSS
    return color.hex;

  } catch (err) {
    // Log the error to see what went wrong
    // Decide how to handle the error, e.g., return a default color or re-throw
    return "#cccccc"; // Example: return a default gray color
  }
}