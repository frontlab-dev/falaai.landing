import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname equivalente em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const logoPath = path.join(__dirname, '../src/assets/09f4aa9565ae6cdcbfe82028f2acb821ea0180ab.webp');

// Tamanhos de ícones necessários
const iconSizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

async function generateIcons() {
  if (!fs.existsSync(logoPath)) {
    console.log('⚠️  Logo não encontrado, criando ícones placeholder...');
    
    // Criar ícones simples como fallback
    for (const icon of iconSizes) {
      const outputPath = path.join(publicDir, icon.name);
      await sharp({
        create: {
          width: icon.size,
          height: icon.size,
          channels: 4,
          background: { r: 65, g: 139, b: 255, alpha: 1 } // #418BFF
        }
      })
      .png()
      .toFile(outputPath);
      console.log(`✅ Criado: ${icon.name}`);
    }
    return;
  }

  for (const icon of iconSizes) {
    const outputPath = path.join(publicDir, icon.name);
    
    try {
      await sharp(logoPath)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Gerado: ${icon.name} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ Erro ao gerar ${icon.name}:`, error.message);
    }
  }
}

generateIcons();

