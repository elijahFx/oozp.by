import { Metadata } from "next";
import ServiceHero from "@/components/podpis/ServiceHero";
import ComingSoon from "@/components/podpis/ComingSoon";
import BenefitsSection from "@/components/podpis/BenefitsSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Электронная подпись | Дистанционное заключение договоров",
  description: "Сервис электронной подписи для дистанционного заключения договоров оказания безвозмездных юридических услуг с ООЗПП 'Автопотребитель'",
  keywords: "электронная подпись, дистанционные услуги, онлайн договор, юридические услуги, защита прав потребителей",
  openGraph: {
    title: "Электронная подпись | ООЗПП 'Автопотребитель'",
    description: "Дистанционное заключение договоров оказания безвозмездных юридических услуг",
    type: "website",
    locale: "ru_BY",
  },
};

export default function ElectronicSignaturePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <ServiceHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-8">
            <ComingSoon />
            <BenefitsSection />
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">О сервисе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Наш сервис электронной подписи позволит заключать договоры 
                  оказания безвозмездных юридических услуг дистанционно, 
                  без необходимости личного посещения офиса.
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">
                    <strong>Важно:</strong> Все электронные документы будут 
                    иметь полную юридическую силу в соответствии с 
                    законодательством Республики Беларусь.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Текущие способы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Пока сервис в разработке, вы можете:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    Посетить наш офис лично
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    Отправить документы почтой
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    Получить консультацию по телефону
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}