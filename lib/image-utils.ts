import fs from 'fs';
import path from 'path';

export async function loadImage(src: string): Promise<string> {
  // Chemin absolu vers le fichier dans le dossier public
  const publicPath = path.join(process.cwd(), 'public', src);
  
  // Lire le fichier en base64
  const imageBuffer = fs.readFileSync(publicPath);
  return `data:image/png;base64,${imageBuffer.toString('base64')}`;
}