export interface LegalAmendment {
  id: string;
  date: string;
  description: string;
  type: 'amendment' | 'addition' | 'deletion' | 'revision';
  articleNumbers?: string[];
}

export interface LegalDocument {
  id: string;
  number: number;
  createdAt: string;
  num: string;
  description: string;
  date: string;
  isCurrent: number;
  fullName: string;
  name: string;
  changes: string;
  type: string;
  content: string;
  // Computed fields for UI
  title?: string;
  adoptionDate?: string;
  effectiveDate?: string;
  registrationNumber?: string;
  status?: 'active' | 'repealed' | 'suspended';
  category?: string;
  fullText?: string;
  amendments?: LegalAmendment[];
}

export interface LegalApiResponse {
  success: boolean;
  data: LegalDocument[];
  error?: string;
}

const LEGAL_API_BASE_URL = 'https://apocrypha.su';

// Parse changes string into amendments array
function parseChanges(changesString: string): LegalAmendment[] {
  if (!changesString) return [];
  
  const amendments: LegalAmendment[] = [];
  const changeEntries = changesString.split('\r\n\r\n').filter(entry => entry.trim());
  
  changeEntries.forEach((entry, index) => {
    const match = entry.match(/Закон Республики Беларусь от (.+?) г\. № (.+?) \(/);
    if (match) {
      const date = match[1];
      const number = match[2];
      
      let type: 'amendment' | 'addition' | 'deletion' | 'revision' = 'amendment';
      if (entry.includes('новая редакция')) {
        type = 'revision';
      } else if (entry.includes('дополнен')) {
        type = 'addition';
      } else if (entry.includes('исключен')) {
        type = 'deletion';
      }
      
      amendments.push({
        id: `amendment-${index}`,
        date: date,
        description: entry.trim(),
        type: type
      });
    }
  });
  
  return amendments;
}

// Transform API response to match our UI expectations
function transformDocument(doc: LegalDocument): LegalDocument {
  return {
    ...doc,
    title: doc.fullName,
    adoptionDate: doc.date,
    effectiveDate: doc.date,
    registrationNumber: doc.num,
    status: doc.isCurrent === 1 ? 'active' : 'repealed',
    category: getDocumentCategory(doc.type, doc.name),
    fullText: doc.content,
    amendments: parseChanges(doc.changes)
  };
}

function getDocumentCategory(type: string, name: string): string {
  if (name.toLowerCase().includes('потребител')) {
    return 'Защита прав потребителей';
  }
  if (name.toLowerCase().includes('жилищ')) {
    return 'ЖКХ';
  }
  if (name.toLowerCase().includes('строител')) {
    return 'Строительство';
  }
  if (type === 'Кодекс') {
    return 'Кодексы';
  }
  return 'Общее законодательство';
}

export async function fetchLegalDocuments(): Promise<LegalDocument[]> {
  try {
    const response = await fetch(`${LEGAL_API_BASE_URL}/legal-documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const documents: LegalDocument[] = await response.json();
    
    // Transform documents to match UI expectations
    return documents.map(transformDocument);
  } catch (error) {
    console.error('Error fetching legal documents:', error);
    
    // Return fallback documents if API fails
    return getFallbackLegalDocuments();
  }
}

export async function fetchLegalDocumentById(id: string): Promise<LegalDocument | null> {
  try {
    const response = await fetch(`${LEGAL_API_BASE_URL}/legal-documents/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const document: LegalDocument = await response.json();
    return transformDocument(document);
  } catch (error) {
    console.error(`Error fetching legal document ${id}:`, error);
    
    // Return fallback document if API fails
    return getFallbackLegalDocumentById(id);
  }
}

// Fallback legal documents in case API is unavailable
function getFallbackLegalDocuments(): LegalDocument[] {
  return [
    {
      id: "consumer-protection-law",
      number: 1,
      createdAt: "09.01.2002",
      num: "90-З",
      description: "Основной закон, регулирующий отношения в сфере защиты прав потребителей в Республике Беларусь",
      date: "9 января 2002 г.",
      isCurrent: 1,
      fullName: "Закон Республики Беларусь «О защите прав потребителей»",
      name: "О защите прав потребителей",
      changes: "Закон Республики Беларусь от 4 января 2003 г. № 183-З;\r\n\r\nЗакон Республики Беларусь от 29 июня 2006 г. № 137-З;\r\n\r\nЗакон Республики Беларусь от 8 июля 2008 г. № 366-З – новая редакция;",
      type: "Закон",
      content: `ЗАКОН РЕСПУБЛИКИ БЕЛАРУСЬ
9 января 2002 г. № 90-З

О ЗАЩИТЕ ПРАВ ПОТРЕБИТЕЛЕЙ

ГЛАВА 1
ОБЩИЕ ПОЛОЖЕНИЯ

Статья 1. Основные термины и их определения

В настоящем Законе применяются следующие основные термины и их определения:

потребитель – физическое лицо, имеющее намерение заказать или приобрести либо заказывающее, приобретающее товар (работу, услугу) или использующее товар (результат работы, услугу) исключительно для личных, семейных, домашних и иных нужд, не связанных с осуществлением предпринимательской деятельности;

изготовитель – организация, индивидуальный предприниматель, производящие товары для реализации потребителю;

продавец – организация, индивидуальный предприниматель, реализующие товары потребителю по договору розничной купли-продажи;

исполнитель – организация, индивидуальный предприниматель, выполняющие работы или оказывающие услуги потребителю;

недостаток товара (работы, услуги) – несоответствие товара (работы, услуги) нормативным документам, устанавливающим требования к качеству товара (работы, услуги), иному законодательству или условиям договора;

существенный недостаток товара (работы, услуги) – неустранимый недостаток, либо недостаток, который не может быть устранен без несоразмерных расходов либо несоразмерных затрат времени, или выявляется неоднократно, или проявляется вновь после его устранения, либо другие подобные недостатки.

Статья 2. Сфера действия настоящего Закона

Действие настоящего Закона распространяется на отношения между потребителями и изготовителями, продавцами, поставщиками, представителями, исполнителями, ремонтными организациями.

Статья 5. Права потребителя

Потребитель имеет право на:
- просвещение в области защиты прав потребителей;
- информацию о товарах (работах, услугах);
- свободный выбор товаров (работ, услуг);
- надлежащее качество товаров (работ, услуг);
- возмещение в полном объеме убытков, вреда;
- государственную защиту своих прав;
- общественную защиту своих прав;
- создание общественных объединений потребителей.`,
      title: "Закон Республики Беларусь «О защите прав потребителей»",
      adoptionDate: "9 января 2002 г.",
      effectiveDate: "9 января 2002 г.",
      registrationNumber: "90-З",
      status: "active",
      category: "Защита прав потребителей",
      fullText: "",
      amendments: []
    }
  ];
}

function getFallbackLegalDocumentById(id: string): LegalDocument | null {
  const documents = getFallbackLegalDocuments();
  return documents.find(doc => doc.id === id) || null;
}