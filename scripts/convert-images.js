import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname equivalente em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Formatos de imagem suportados para conversão
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.jfif'];
const WEBP_EXTENSION = '.webp';

// Diretórios onde procurar imagens
const SEARCH_DIRECTORIES = [
  path.join(__dirname, '../src/assets'),
//   path.join(__dirname, '../public'),
];

/**
 * Busca recursivamente por arquivos de imagem em um diretório
 */
function findImageFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Busca recursiva em subdiretórios (exceto node_modules e build)
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'build') {
        findImageFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      // Adiciona apenas arquivos de imagem que não são WebP
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Converte uma imagem para WebP
 */
async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath);
  const outputPath = inputPath.replace(ext, WEBP_EXTENSION);

  // Verifica se o arquivo WebP já existe
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  WebP já existe: ${path.basename(outputPath)}`);
    return { skipped: true };
  }

  try {
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);
    
    return {
      success: true,
      inputSize: inputStats.size,
      outputSize: outputStats.size,
      reduction: parseFloat(reduction),
      fileName: path.basename(inputPath),
    };
  } catch (error) {
    throw new Error(`Erro ao converter: ${error.message}`);
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🔍 Buscando imagens no projeto...\n');

  // Busca todas as imagens nos diretórios especificados
  let allImages = [];
  SEARCH_DIRECTORIES.forEach((dir) => {
    if (fs.existsSync(dir)) {
      const images = findImageFiles(dir);
      allImages = allImages.concat(images);
    }
  });

  if (allImages.length === 0) {
    console.log('✅ Nenhuma imagem encontrada para conversão!');
    return;
  }

  console.log(`📸 Encontradas ${allImages.length} imagem(ns) para converter:\n`);

  let converted = 0;
  let skipped = 0;
  let errors = 0;
  let totalOriginalSize = 0;
  let totalWebPSize = 0;

  // Processa cada imagem
  for (const imagePath of allImages) {
    const relativePath = path.relative(path.join(__dirname, '..'), imagePath);
    console.log(`🔄 Processando: ${relativePath}`);

    try {
      const result = await convertToWebP(imagePath);

      if (result.skipped) {
        skipped++;
        console.log('');
        continue;
      }

      if (result.success) {
        converted++;
        totalOriginalSize += result.inputSize;
        totalWebPSize += result.outputSize;

        console.log(`   ✅ Convertido: ${result.fileName}`);
        console.log(`   📦 Original: ${(result.inputSize / 1024).toFixed(2)} KB`);
        console.log(`   📦 WebP: ${(result.outputSize / 1024).toFixed(2)} KB`);
        console.log(`   💾 Redução: ${result.reduction}%\n`);
      }
    } catch (error) {
      errors++;
      console.error(`   ❌ Erro: ${error.message}\n`);
    }
  }

  // Resumo final
  console.log('━'.repeat(50));
  console.log('📊 Resumo da Conversão:');
  console.log(`   ✅ Convertidas: ${converted}`);
  console.log(`   ⏭️  Já existentes: ${skipped}`);
  console.log(`   ❌ Erros: ${errors}`);
  
  if (converted > 0) {
    const totalReduction = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(2);
    console.log(`\n   💾 Espaço total economizado: ${totalReduction}%`);
    console.log(`   📦 Tamanho original total: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
    console.log(`   📦 Tamanho WebP total: ${(totalWebPSize / 1024).toFixed(2)} KB`);
  }
  console.log('━'.repeat(50));
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

