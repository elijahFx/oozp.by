import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FileText, Scale, BookOpen, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchLegalDocuments } from "../../lib/legal-api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нормативные правовые акты | Автопотребитель - законы и кодексы",
  description: "Полная база нормативных правовых актов Республики Беларусь: законы, кодексы, декреты. Актуальные тексты с изменениями и дополнениями.",
  keywords: "законы беларуси, кодексы, нормативные акты, правовые документы, законодательство РБ, защита прав потребителей, юридические документы",
  openGraph: {
    title: "Нормативные правовые акты Беларуси | Автопотребитель",
    description: "Актуальная база законов, кодексов и других нормативных актов с полными текстами и историей изменений.",
    type: "website",
    locale: "ru_BY",
  },
};

const getDocumentTypeIcon = (type: string) => {
  switch (type) {
    case 'code':
      return <BookOpen className="h-5 w-5" />;
    case 'law':
      return <Scale className="h-5 w-5" />;
    case 'decree':
      return <FileText className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getDocumentTypeName = (type: string) => {
  return type || 'Документ';
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default" className="bg-green-100 text-green-800">Действует</Badge>;
    case 'repealed':
      return <Badge variant="destructive">Отменен</Badge>;
    case 'suspended':
      return <Badge variant="secondary">Приостановлен</Badge>;
    default:
      return <Badge variant="outline">Неизвестно</Badge>;
  }
};

async function LegalDocumentsList() {
  const documents = await fetchLegalDocuments();
  

  const documentsByType = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Поиск по названию документа..."
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Все документы</TabsTrigger>
          <TabsTrigger value="Закон">Законы</TabsTrigger>
          <TabsTrigger value="Кодекс">Кодексы</TabsTrigger>
          <TabsTrigger value="Декрет">Декреты</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <Card key={document.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getDocumentTypeIcon(document.type)}
                      <Badge variant="outline">{getDocumentTypeName(document.type)}</Badge>
                    </div>
                    {getStatusBadge(document.status || "active")}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{document.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {document.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow space-y-3">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Принят: {document.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>№ {document.num}</span>
                    </div>
                    <div>
                      <span className="font-medium">Тип:</span> {document.type}
                    </div>
                  </div>
                  
                  {document.amendments && document.amendments.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        Изменений: <span className="font-medium">{document.amendments.length}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Последнее: {document.amendments[document.amendments.length - 1]?.date}
                      </p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Link href={`/legal-documents/${document.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Читать документ
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Object.entries(documentsByType).map(([type, docs]) => (
          <TabsContent key={type} value={type} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((document) => (
                <Card key={document.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getDocumentTypeIcon(document.type)}
                        <Badge variant="outline">{getDocumentTypeName(document.type)}</Badge>
                      </div>
                      {getStatusBadge(document.status || "active")}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{document.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {document.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow space-y-3">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Принят: {document.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>№ {document.num}</span>
                      </div>
                      <div>
                        <span className="font-medium">Тип:</span> {document.type}
                      </div>
                    </div>
                    
                    {document.amendments && document.amendments.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          Изменений: <span className="font-medium">{document.amendments.length}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Последнее: {document.amendments[document.amendments.length - 1]?.date}
                        </p>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Link href={`/legal-documents/${document.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Читать документ
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 bg-muted rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="h-6 bg-muted rounded w-20 animate-pulse" />
                <div className="h-6 bg-muted rounded w-16 animate-pulse" />
              </div>
              <div className="h-6 bg-muted rounded w-full animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full animate-pulse" />
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-muted rounded w-full animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function LegalDocumentsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Нормативные правовые акты
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Полная база актуальных законов, кодексов и других нормативных актов Республики Беларусь 
            с полными текстами и историей изменений
          </p>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <LegalDocumentsList />
        </Suspense>

        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Нужна помощь в применении закона?</h2>
            <p className="text-muted-foreground mb-6">
              Наши юристы помогут разобраться в сложных правовых вопросах и применить 
              нормы законодательства к вашей ситуации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts">
                <Button size="lg">Получить консультацию</Button>
              </Link>
              <Link href="/claim-builder">
                <Button variant="outline" size="lg">Составить претензию</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}