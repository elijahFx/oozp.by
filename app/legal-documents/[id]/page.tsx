import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, ExternalLink, History, BookOpen, Scale, AlertCircle } from "lucide-react";
import { fetchLegalDocumentById } from "../../../lib/legal-api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { formatDocumentText } from "@/lib/formatLegalDocuments";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Добавляем await перед params
  const { id } = await params;
  const document = await fetchLegalDocumentById(id);
  
  if (!document) {
    return {
      title: "Документ не найден | Автопотребитель",
    };
  }

  return {
    title: `${document.name} | Автопотребитель`,
    description: document.description,
    keywords: `${document.title}, ${document.category}, законодательство беларуси, нормативные акты`,
    openGraph: {
      title: document.name,
      description: document.description,
      type: "article",
      locale: "ru_BY",
    },
  };
}

const getDocumentTypeIcon = (type: string) => {
  switch (type) {
    case 'code':
      return <BookOpen className="h-6 w-6" />;
    case 'law':
      return <Scale className="h-6 w-6" />;
    case 'decree':
      return <FileText className="h-6 w-6" />;
    default:
      return <FileText className="h-6 w-6" />;
  }
};

const getDocumentTypeName = (type: string) => {
  switch (type) {
    case 'code':
      return 'Кодекс';
    case 'law':
      return 'Закон';
    case 'decree':
      return 'Декрет';
    case 'regulation':
      return 'Постановление';
    case 'instruction':
      return 'Инструкция';
    default:
      return 'Документ';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge>Действует</Badge>;
    case 'repealed':
      return <Badge variant="destructive">Отменен</Badge>;
    case 'suspended':
      return <Badge variant="secondary">Приостановлен</Badge>;
    default:
      return <Badge variant="outline">Неизвестно</Badge>;
  }
};

const getAmendmentTypeIcon = (type: string) => {
  switch (type) {
    case 'amendment':
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case 'addition':
      return <FileText className="h-4 w-4 text-green-500" />;
    case 'deletion':
      return <FileText className="h-4 w-4 text-red-500" />;
    case 'revision':
      return <History className="h-4 w-4 text-purple-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

const getAmendmentTypeName = (type: string) => {
  switch (type) {
    case 'amendment':
      return 'Изменение';
    case 'addition':
      return 'Дополнение';
    case 'deletion':
      return 'Исключение';
    case 'revision':
      return 'Редакция';
    default:
      return 'Изменение';
  }
};



async function LegalDocumentContent({ id }: { id: string }) {
  const document = await fetchLegalDocumentById(id);

  if (!document) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <Link 
          href="/legal-documents" 
          className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Назад к документам
        </Link>
      </nav>

      {/* Document Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {getDocumentTypeIcon(document.type)}
                <Badge variant="outline" className="text-sm">
                  {getDocumentTypeName(document.type)}
                </Badge>
                {getStatusBadge(document.status || "active")}
              </div>
              
              <CardTitle className="text-2xl lg:text-3xl font-bold mb-4">
                {document.title}
              </CardTitle>
              
              <p className="text-muted-foreground text-lg mb-6">
                {document.description}
              </p>
            </div>
          </div>
          
          {/* Document Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Принят</p>
                <p className="font-medium">{document.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Опубликован</p>
                <p className="font-medium">{document.createdAt}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Номер</p>
                <p className="font-medium">{document.num}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Тип</p>
                <p className="font-medium">{document.type}</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Document Content */}
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Текст документа</TabsTrigger>
          <TabsTrigger value="amendments">
            Изменения ({document.amendments?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-6">
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {formatDocumentText(document.content, document.type)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amendments" className="mt-6">
          <div className="space-y-4">
            {!document.amendments || document.amendments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Изменений не найдено</h3>
                  <p className="text-muted-foreground">
                    В данный документ изменения не вносились или информация о них недоступна.
                  </p>
                </CardContent>
              </Card>
            ) : (
              document.amendments
                .reverse()
                .map((amendment) => (
                  <Card key={amendment.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getAmendmentTypeIcon(amendment.type)}
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {getAmendmentTypeName(amendment.type)}
                            </Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>{amendment.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3 whitespace-pre-line">
                        {amendment.description}
                      </p>
                      {amendment.articleNumbers && amendment.articleNumbers.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-sm text-muted-foreground mr-2">Затронутые статьи:</span>
                          {amendment.articleNumbers.map((articleNum, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              Ст. {articleNum}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Нужна помощь в применении этого документа?
        </h3>
        <p className="text-gray-700 mb-6">
          Наши юристы помогут разобраться в сложных правовых вопросах и применить 
          нормы законодательства к вашей конкретной ситуации.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+375296062598"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <FileText className="w-5 h-5" />
            +375 (29) 606-25-98
          </a>
          <Link href="/contacts">
            <Button variant="outline" size="lg">
              Связаться с нами
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="h-6 bg-muted rounded w-48 animate-pulse" />
      
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 bg-muted rounded animate-pulse" />
            <div className="h-6 bg-muted rounded w-20 animate-pulse" />
            <div className="h-6 bg-muted rounded w-16 animate-pulse" />
          </div>
          <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-muted rounded w-full animate-pulse" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded w-16 animate-pulse" />
                <div className="h-5 bg-muted rounded w-24 animate-pulse" />
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>
      
      <div className="h-10 bg-muted rounded animate-pulse" />
      
      <Card>
        <CardContent className="p-8 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded w-full animate-pulse" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default async function LegalDocumentPage({ params }: PageProps) {
  // Добавляем await перед params
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<LoadingSkeleton />}>
        <LegalDocumentContent id={id} />
      </Suspense>
    </div>
  );
}