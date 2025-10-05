export const formatDocumentText = (text: string, type: string) => {
  if (!text) return [];
  
  const paragraphs = text.split(/\r\n|\n/);
  const formattedParagraphs: JSX.Element[] = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    const prevParagraph = i > 0 ? paragraphs[i - 1].trim() : '';
    const nextParagraph = i < paragraphs.length - 1 ? paragraphs[i + 1].trim() : '';
    
    if (paragraph === '') {
      continue;
    }
    
    // Определяем тип документа для специфичного форматирования
    const isLaw = type === 'Закон' || paragraph.includes('ЗАКОН РЕСПУБЛИКИ БЕЛАРУСЬ');
    const isResolution = type === 'Постановление' || paragraph.includes('ПОСТАНОВЛЕНИЕ') || paragraph.includes('ПРАВИЛА');
    const isDecree = type === 'Декрет' || paragraph.includes('ДЕКРЕТ');
    const isCode = type === 'Кодекс' || paragraph.includes('КОДЕКС');

    // Основной заголовок документа
    if (paragraph.includes('ЗАКОН РЕСПУБЛИКИ БЕЛАРУСЬ') || 
        paragraph.includes('ПОСТАНОВЛЕНИЕ') ||
        paragraph.includes('ДЕКРЕТ') ||
        paragraph.includes('КОДЕКС')) {
      formattedParagraphs.push(
        <h1 key={i} className="text-2xl font-bold text-gray-900 text-center mt-6 mb-4">
          {paragraph}
        </h1>
      );
      continue;
    }

    // Правила (для постановлений)
    if (paragraph === 'ПРАВИЛА' && isResolution) {
      formattedParagraphs.push(
        <h1 key={i} className="text-2xl font-bold text-gray-900 text-center mt-6 mb-2 uppercase">
          {paragraph}
        </h1>
      );
      continue;
    }

    // Название правил (следующий параграф после "ПРАВИЛА")
    if (prevParagraph === 'ПРАВИЛА' && isResolution) {
      formattedParagraphs.push(
        <h2 key={i} className="text-xl font-semibold text-gray-900 text-center mb-6 italic">
          {paragraph}
        </h2>
      );
      continue;
    }

    // Глава
    if (paragraph.startsWith('ГЛАВА')) {
      formattedParagraphs.push(
        <h2 key={i} className="text-2xl mt-4 font-bold text-gray-900 text-center">
          {paragraph}
        </h2>
      );
      continue;
    }

    // Название главы (следующий параграф после "ГЛАВА")
    if (prevParagraph.startsWith('ГЛАВА')) {
      formattedParagraphs.push(
        <h3 key={i} className="text-2xl mb-4 font-semibold text-gray-900 text-center">
          {paragraph.toUpperCase()}
        </h3>
      );
      continue;
    }

    // Статья
    if (paragraph.startsWith('Статья')) {
      formattedParagraphs.push(
        <h3 key={i} className="font-bold text-gray-900 mt-6 mb-3 text-lg">
          {paragraph}
        </h3>
      );
      continue;
    }

    // Пункты для постановлений (цифры с точкой в начале)
    if (isResolution && /^\d+\./.test(paragraph)) {
      const pointNumber = paragraph.match(/^(\d+)\./)?.[1];
      formattedParagraphs.push(
        <div key={i} className="mt-4 mb-3">
          <span className="font-bold text-gray-900 mr-2">{pointNumber}.</span>
          <span className="text-gray-700">{paragraph.replace(/^\d+\.\s*/, '')}</span>
        </div>
      );
      continue;
    }

    // Подпункты (буквы с закрывающей скобкой)
    if (/^[а-я]\)/.test(paragraph) || /^[a-z]\)/.test(paragraph)) {
      formattedParagraphs.push(
        <div key={i} className="ml-4 mt-2 mb-2">
          <span className="font-medium text-gray-900 mr-2">{paragraph.split(')')[0]})</span>
          <span className="text-gray-700">{paragraph.split(')').slice(1).join(')')}</span>
        </div>
      );
      continue;
    }

    // Номер и дата документа
    if ((paragraph.includes('№') || paragraph.includes('г.')) && paragraph.length < 150) {
      formattedParagraphs.push(
        <div key={i} className="text-center text-gray-600 mb-6">
          {paragraph}
        </div>
      );
      continue;
    }

    // Сноски и примечания
    if (paragraph.includes('*') && paragraph.length < 300) {
      formattedParagraphs.push(
        <div key={i} className="text-sm text-gray-500 italic mt-2 mb-4 border-l-4 border-gray-300 pl-4">
          {paragraph}
        </div>
      );
      continue;
    }

    // Заголовки разделов внутри документа
    if ((paragraph === 'ОБЩИЕ ПОЛОЖЕНИЯ' || 
         paragraph === 'ОСНОВНЫЕ ПОЛОЖЕНИЯ' ||
         paragraph === 'ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ') && 
        paragraph.length < 50) {
      formattedParagraphs.push(
        <h3 key={i} className="text-lg font-bold text-gray-900 mt-8 mb-4 text-center">
          {paragraph}
        </h3>
      );
      continue;
    }

    // Обычный параграф с улучшенным форматированием
    if (paragraph.length > 0) {
      // Проверяем, является ли это началом нового логического блока
      const isNewBlock = !prevParagraph || 
                         prevParagraph.endsWith('.') || 
                         prevParagraph.endsWith(';') ||
                         /^\d+\./.test(paragraph) ||
                         paragraph.startsWith('Статья');

      formattedParagraphs.push(
        <p key={i} className={`text-gray-700 ${isNewBlock ? 'mt-4' : ''} leading-relaxed`}>
          {paragraph}
        </p>
      );
    }
  }
  
  return formattedParagraphs;
};