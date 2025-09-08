export const formatDocumentText = (text: string) => {
  if (!text) return [];
  
  const paragraphs = text.split(/\r\n|\n/);
  const formattedParagraphs: JSX.Element[] = [];
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const prevParagraph = i > 0 ? paragraphs[i - 1] : '';
    
    if (paragraph.trim() === '') {
      continue;
    }
    
    // Глава
    if (paragraph.startsWith('ГЛАВА')) {
      formattedParagraphs.push(
        <h3 key={i} className="text-lg text-center font-bold text-gray-900 mt-8">
          {paragraph}
        </h3>
      );
      continue;
    }

    // Следующий параграф после "Глава" - форматируем так же (обычно это название главы)
    if (prevParagraph.startsWith('ГЛАВА')) {
      formattedParagraphs.push(
        <h3 key={i} className="text-lg text-center font-bold text-gray-900 mb-8">
          {paragraph}
        </h3>
      );
      continue;
    }

    // Статья
    if (paragraph.startsWith('Статья')) {
      formattedParagraphs.push(
        <h3 key={i} className="font-semibold text-gray-900 mt-4">
          {paragraph}
        </h3>
      );
      continue;
    }
    
    // Закон и другие основные заголовки
    if (paragraph.includes('ЗАКОН РЕСПУБЛИКИ БЕЛАРУСЬ') || 
        paragraph.includes('О ЗАЩИТЕ ПРАВ ПОТРЕБИТЕЛЕЙ')) {
      formattedParagraphs.push(
        <h3 key={i} className="text-lg text-center font-bold text-gray-900 mt-6 mb-3">
          {paragraph}
        </h3>
      );
      continue;
    }
    
    // Document title and number
    if ((paragraph.includes('№') || paragraph.includes('г.')) && paragraph.length < 100) {
      formattedParagraphs.push(
        <h2 key={i} className="text-xl font-bold text-gray-900 mb-4">
          {paragraph}
        </h2>
      );
      continue;
    }
    
    // Обычный параграф
    formattedParagraphs.push(
      <p key={i} className="text-gray-700 mt-4">
        {paragraph}
      </p>
    );
  }
  
  return formattedParagraphs;
};