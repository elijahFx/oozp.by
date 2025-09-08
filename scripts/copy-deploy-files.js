const fs = require('fs');
const path = require('path');

// Создаем папку deploy если её нет
const deployDir = path.join(__dirname, '..', 'deploy');
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir, { recursive: true });
}

// Файлы для копирования
const filesToCopy = [
  'package.json',
  'package-lock.json',
  'next.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
  'postcss.config.js',
  'components.json',
  '.eslintrc.json',
  'ecosystem.config.js',
  '.htaccess'
];

// Папки для копирования
const dirsToCopy = [
  '.next',
  'public',
  'app',
  'components',
  'lib',
  'hooks',
  'api'
];

// Функция для копирования файла
function copyFile(src, dest) {
  try {
    fs.copyFileSync(src, dest);
    console.log(`✓ Скопирован: ${path.basename(src)}`);
  } catch (error) {
    console.error(`✗ Ошибка копирования ${src}:`, error.message);
  }
}

// Функция для копирования папки
function copyDir(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        copyFile(srcPath, destPath);
      }
    });
    console.log(`✓ Скопирована папка: ${path.basename(src)}`);
  } catch (error) {
    console.error(`✗ Ошибка копирования папки ${src}:`, error.message);
  }
}

console.log('🚀 Подготовка файлов для деплоя...\n');

// Копируем файлы
filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, '..', file);
  const destPath = path.join(deployDir, file);
  
  if (fs.existsSync(srcPath)) {
    copyFile(srcPath, destPath);
  } else {
    console.log(`⚠️  Файл не найден: ${file}`);
  }
});

console.log('');

// Копируем папки
dirsToCopy.forEach(dir => {
  const srcPath = path.join(__dirname, '..', dir);
  const destPath = path.join(deployDir, dir);
  
  if (fs.existsSync(srcPath)) {
    copyDir(srcPath, destPath);
  } else {
    console.log(`⚠️  Папка не найдена: ${dir}`);
  }
});

console.log('\n✅ Подготовка завершена!');
console.log(`📁 Файлы для деплоя находятся в папке: ${deployDir}`);
console.log('\n📋 Следующие шаги:');
console.log('1. Загрузите содержимое папки deploy на ваш сервер');
console.log('2. На сервере выполните: npm install --production');
console.log('3. Запустите приложение: npm start');
console.log('4. Настройте проксирование (см. DEPLOY_INSTRUCTIONS.md)');
