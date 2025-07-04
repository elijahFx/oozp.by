import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Users, Shield, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">О нас</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground">
            Общественное объединение "Автопотребитель" — некоммерческая организация, защищающая права и интересы потребителей автомобильных услуг в Беларуси.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Наша миссия</h2>
          <p>
            Мы стремимся создать справедливый рынок автомобильных услуг, где права потребителей уважаются и соблюдаются, а споры разрешаются цивилизованным путем на основе законодательства о защите прав потребителей.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Принципы работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Законность</h3>
                    <p className="text-sm text-muted-foreground">Все наши действия основаны на законодательстве РБ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Профессионализм</h3>
                    <p className="text-sm text-muted-foreground">Команда опытных юристов и специалистов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Доступность</h3>
                    <p className="text-sm text-muted-foreground">Бесплатные консультации для всех потребителей</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Результативность</h3>
                    <p className="text-sm text-muted-foreground">Успешное решение сложных споров</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">История организации</h2>
          <p>
            Объединение было создано группой юристов и активистов, столкнувшихся с систематическими нарушениями прав потребителей в автомобильной сфере. За годы работы мы помогли сотням граждан Беларуси отстоять свои права и получить компенсацию за некачественные товары и услуги.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Наша команда</h2>
          <p>
            В объединении работают квалифицированные юристы, специализирующиеся на защите прав потребителей, с опытом ведения дел в судах различных инстанций. Наши специалисты регулярно повышают квалификацию и следят за изменениями в законодательстве.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Сотрудничество</h2>
          <p>
            Мы открыты для сотрудничества с государственными органами, другими общественными объединениями и СМИ по вопросам защиты прав потребителей и повышения правовой грамотности населения.
          </p>
        </div>
      </div>
    </div>
  )
}