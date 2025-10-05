import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Образцы претензий | Автопотребитель - готовые шаблоны документов",
  description: "Бесплатные образцы претензий для защиты прав потребителей. Готовые шаблоны документов для различных категорий товаров и услуг в Беларуси.",
  keywords: "образцы претензий, шаблоны документов, защита прав потребителей, претензия, возврат товара, некачественные услуги, нарушение сроков, потребительский рынок",
  openGraph: {
    title: "Образцы претензий для потребителей | Автопотребитель",
    description: "Готовые шаблоны документов для защиты прав потребителей. Бесплатные образцы претензий по различным категориям товаров и услуг.",
    type: "website",
    locale: "ru_BY",
  },
};

const claimSamples = [
  {
    title: "Претензия по некачественному товару",
    description: "Требование о возврате денежных средств за товар",
    filename: "neck-tovar.docx",
    slug: "neckachestvennyy_tovar"
  },
  {
    title: "Претензия по некачественной работе (услуге)",
    description: "Требование о возврате денежных средств за работу (услугу)",
    filename: "neck-usl.docx",
    slug: "neckachestvennaya_usluga"
  },
  {
    title: "Претензия о нарушении сроков выполнения работ",
    description:
      "Требование о расторжении договора с возвратом денежных средств",
    filename: "sroki-usl.docx",
    slug: "narushenie_srokov_rabot"
  },
  {
    title: "Претензия о нарушении сроков поставки товара",
    description:
      "Требование о возврате денежных средств за непоставленный товар",
    filename: "sroki-tov.docx",
    slug: "narushenie_srokov_postavki"
  },
  {
    title:
      "Претензия об одностороннем отказе от выполнения работ (оказания услуг)",
    description:
      "Требование о возврате денежных средств в связи с отсутствием необходимости в выполнении работ (оказании услуг)",
    filename: "otk-usl.docx",
    slug: "otkaz_ot_uslug"
  },
  {
    title: "Претензия о возврате качественного товара",
    description:
      "Требование о возврате денежных средств за товар надлежащего качества, не подошедший по характеристикам",
    filename: "otk-tov.docx",
    slug: "vozvrat_kachestvennogo_tovara"
  },
];

export default function ClaimSamplesPage() {
  const handleDownload = (filename: string, slug: string) => {
    // Создаем ссылку на файл в папке public
    const fileUrl = `/docs/${filename}`;

    // Отслеживаем скачивание
    if (typeof window !== 'undefined') {
      if ((window as any).ym) {
        (window as any).ym(104384730, 'reachGoal', `claim_download_${slug}`);
      }
      if ((window as any).gtag) {
        (window as any).gtag('event', `claim_download_${slug}`);
      }
    }

    // Создаем временную ссылку для скачивания
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Образцы претензий
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <p>
            На этой странице вы найдете образцы претензий, которые могут быть
            полезны при защите ваших прав как потребителя автомобильных услуг.
            Вы можете скачать эти образцы и использовать их как основу для
            составления собственной претензии.
          </p>
          <p>
            <strong>Внимание!</strong> Данные образцы носят общий характер. Для
            получения индивидуальной консультации и помощи в составлении
            претензии, пожалуйста,{" "}
            <Link 
              href="/contacts" 
              className="text-primary hover:underline"
              data-track-event="claim_samples_contacts_link"
            >
              свяжитесь с нами
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {claimSamples.map((sample, index) => (
            <Card 
              key={index} 
              className="flex flex-col h-full"
              data-track-event={`claim_samples_card_${sample.slug}`}
            >
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{sample.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {sample.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4 mt-auto">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload(sample.filename, sample.slug)}
                  data-track-event={`claim_samples_download_${sample.slug}`}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Скачать образец
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Нужна персональная консультация?
          </h2>
          <p className="text-muted-foreground mb-6">
            Если вы не нашли подходящий образец или вам требуется индивидуальная
            помощь в составлении претензии, наши специалисты готовы помочь.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contacts" passHref>
              <Button 
                data-track-event="claim_samples_contacts_button"
              >
                Связаться с нами
              </Button>
            </Link>
            <Link href="/claim-builder" passHref>
              <Button 
                variant="outline"
                data-track-event="claim_samples_builder_button"
              >
                Конструктор претензий
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}