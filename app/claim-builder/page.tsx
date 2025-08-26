"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { claimOptions, typeMap } from "../../lib/constructorConfig";
import { generateClaimDocument } from "../../lib/claims_constructor";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Packer } from "docx";
import {
  blurPhoneHanlder,
  dateHandler,
  focusPhoneHandler,
  formatNumberInput,
  keypressUnpHandler,
  phoneHandler,
  unpHandler,
} from "../../lib/eventHandlers";

export default function ClaimBuilderPage() {
  const [claimType, setClaimType] = useState("");
  const [showMoralDamage, setShowMoralDamage] = useState(false);
  const [showPenalty, setShowPenalty] = useState(false);
  const [mainRequirement, setMainRequirement] = useState("");
  const [showAdditionalRequirement, setShowAdditionalRequirement] =
    useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showSorazm, setShowSorazm] = useState(false);
  const [showVozm, setShowVozm] = useState(false);

  // Получить доступные дополнительные требования
  const getAdditionalOptions = () => {
    if (
      !mainRequirement ||
      !claimOptions[claimType as keyof typeof claimOptions]
    )
      return [];
    return claimOptions[claimType as keyof typeof claimOptions].filter(
      (option) => option !== mainRequirement
    );
  };

  const handleMainRequirementChange = (value: string) => {
    setMainRequirement(value);

    // Показываем/скрываем поле для суммы соразмерного уменьшения
    setShowSorazm(value === "Соразмерное уменьшение стоимости");

    // Показываем/скрываем поле для суммы возмещения расходов
    setShowVozm(value === "Возмещение расходов по устранению недостатков");
  };

  const handleReset = () => {
    setClaimType("");
    setShowMoralDamage(false);
    setShowPenalty(false);
    setMainRequirement("");
    setShowAdditionalRequirement(false);
    setIsAgreed(false);
    setShowSorazm(false);
    setShowVozm(false);

    const inputIds = [
      "name",
      "address",
      "phone",
      "orgName",
      "unp",
      "orgAddress",
      "good",
      "price",
      "date",
      "complaint",
      "deadline",
      "moralAmount",
      "sorazmAmount",
      "vozmAmount",
    ];

    inputIds.forEach((id) => {
      const el = document.getElementById(id) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (el) el.value = "";
    });

    const additionalSelect = document.getElementById("additionalRequirement");
    if (additionalSelect) additionalSelect.innerHTML = "";
  };

  const handleSubmit = async () => {
    if (!isAgreed) {
      alert(
        "Пожалуйста, подтвердите согласие с политикой обработки персональных данных"
      );
      return;
    }

    const additionalRequirementSelect = document.getElementById(
      "additionalRequirement"
    ) as HTMLSelectElement;
    const additionalRequirementValue =
      additionalRequirementSelect?.textContent || null;

    const formData = {
      //@ts-ignore
      type: typeMap[claimType],
      consumerFullName: (document.getElementById("name") as HTMLInputElement)
        ?.value,
      consumerAddress: (document.getElementById("address") as HTMLInputElement)
        ?.value,
      consumerPhone: (document.getElementById("phone") as HTMLInputElement)
        ?.value,
      sellerName: (document.getElementById("orgName") as HTMLInputElement)
        ?.value,
      sellerUnp: (document.getElementById("unp") as HTMLInputElement)?.value,
      sellerAddress: (document.getElementById("orgAddress") as HTMLInputElement)
        ?.value,
      goodName: (document.getElementById("good") as HTMLInputElement)?.value,
      cost: (document.getElementById("price") as HTMLInputElement)?.value,
      contractDate: (document.getElementById("date") as HTMLInputElement)
        ?.value,
      problem: (document.getElementById("complaint") as HTMLTextAreaElement)
        ?.value,
      deadline: (document.getElementById("deadline") as HTMLInputElement)
        ?.value,
      request: mainRequirement,
      secondRequest: showAdditionalRequirement
        ? additionalRequirementValue
        : null,
      secondRequestValue: showAdditionalRequirement
        ? additionalRequirementValue
        : null,
      moral: showMoralDamage
        ? (document.getElementById("moralAmount") as HTMLInputElement)?.value
        : null,
      penalty: showPenalty,
      isAgreed,
      claimType,
      sorazm: showSorazm
        ? (document.getElementById("sorazmAmount") as HTMLInputElement)?.value
        : null,
      vozmAmount: showVozm
        ? (document.getElementById("vozmAmount") as HTMLInputElement)?.value
        : null,
    };

    console.log("Additional requirement select:", additionalRequirementSelect);
    console.log("Additional requirement value:", additionalRequirementValue);

    try {
      // 1. Генерируем документ
      const doc = await generateClaimDocument(formData);

      // Convert Document to Blob
      const blob = await Packer.toBlob(doc); // Make sure Packer is imported from docx

      if (!(blob instanceof Blob)) {
        throw new Error("Document generation failed - invalid blob returned");
      }

      // 2. Создаем ссылку для скачивания
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Претензия_${formData.consumerFullName || "документ"}.docx`;
      document.body.appendChild(a);
      a.click();

      // 3. Очищаем память
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

      // 4. Отправляем данные на сервер (если нужно)
      const response = await fetch("https://apocrypha.su/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке на сервер");
      }

      console.log("Документ скачан и претензия успешно отправлена!");
    } catch (error) {
      console.error("Error:", error);
      console.log(
        "Произошла ошибка: " +
          (error instanceof Error ? error.message : "Неизвестная ошибка")
      );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Конструктор претензий
        </h1>

        <div className="space-y-8">
          {/* Тип претензии */}
          <Card>
            <CardHeader>
              <CardTitle>Тип претензии</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) => {
                  setClaimType(value);
                  setMainRequirement("");
                  setShowAdditionalRequirement(false);
                  setShowSorazm(false);
                  setShowVozm(false);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип претензии" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nekachTov">
                    Некачественный товар
                  </SelectItem>
                  <SelectItem value="nekachUsl">
                    Некачественная услуга
                  </SelectItem>
                  <SelectItem value="srokiTov">
                    Нарушение сроков передачи оплаченного товара
                  </SelectItem>
                  <SelectItem value="srokiUsl">
                    Нарушение сроков оказания услуг
                  </SelectItem>
                  <SelectItem value="otkaz">
                    Односторонний отказ от договора
                  </SelectItem>
                  <SelectItem value="vozvrat">
                    Возврат качественного товара
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Данные заявителя */}
          <Card>
            <CardHeader>
              <CardTitle>Данные заявителя</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше ФИО:</Label>
                <Input id="name" placeholder="Иванов Иван Иванович" />
              </div>
              <div>
                <Label htmlFor="address">Ваш Адрес:</Label>
                <Input
                  id="address"
                  placeholder="220014, г. Минск, ул. Сурганова, д. 36, кв. 503"
                />
              </div>
              <div>
                <Label htmlFor="phone">Ваш Телефон:</Label>
                <Input
                  id="phone"
                  onBlur={(e) => blurPhoneHanlder(e)}
                  onInput={(e) => phoneHandler(e)}
                  onFocus={(e) => focusPhoneHandler(e)}
                  placeholder="+375299999999"
                />
              </div>
            </CardContent>
          </Card>

          {/* Данные организации */}
          <Card>
            <CardHeader>
              <CardTitle>Данные организации</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orgName">
                  Наименование Вашего продавца, исполнителя:
                </Label>
                <Input id="orgName" placeholder="ООО ИМВБРБ" />
              </div>
              <div>
                <Label htmlFor="unp">УНП (Учетный номер плательщика):</Label>
                <Input
                  id="unp"
                  onKeyUp={(e) => keypressUnpHandler(e)}
                  onInput={(e) => unpHandler(e)}
                  placeholder="123456789"
                  maxLength={9}
                />
              </div>
              <div>
                <Label htmlFor="orgAddress">
                  Юридический адрес Вашего продавца, исполнителя:
                </Label>
                <Input
                  id="orgAddress"
                  placeholder="220014, г. Минск, ул. Сурганова, д. 36, оф. 305"
                />
              </div>
            </CardContent>
          </Card>

          {/* Информация о товаре/услуге */}
          <Card>
            <CardHeader>
              <CardTitle>Информация о товаре/услуге</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {claimType !== "nekachUsl" && (
                <div>
                  <Label htmlFor="good">
                    {claimType === "vozvrat" ||
                    claimType === "nekachTov" ||
                    claimType === "srokiTov"
                      ? "Наименование товара:"
                      : claimType === "srokiUsl"
                      ? "Наименование услуги:"
                      : claimType === "otkaz"
                      ? "Предмет договора:"
                      : "Какие работы (услуги) обязался реализовать Вам исполнитель:"}
                  </Label>
                  <Input
                    id="good"
                    placeholder={
                      claimType === "nekachTov"
                        ? "Пылесос iPhone 11 (2021 г.)"
                        : claimType === "srokiTov"
                        ? "Пылесос Bosch X01-02"
                        : claimType === "vozvrat"
                        ? "Телефон iPhone 11 (2021 г.)"
                        : claimType === "srokiUsl"
                        ? "Услуга по ремонту телефона"
                        : claimType === "otkaz"
                        ? "Осуществить работы по ремонту телефона, оказать медицинские услуги..."
                        : "Осуществить работы по ремонту телефона, оказать медицинские услуги..."
                    }
                  />
                </div>
              )}

              <div>
                <Label htmlFor="price">
                  {claimType === "nekachTov" ||
                  claimType === "srokiTov" ||
                  claimType === "vozvrat"
                    ? "Цена товара:"
                    : "Стоимость работ (услуг):"}
                </Label>
                <Input
                  onBlur={(e) => formatNumberInput(e)}
                  id="price"
                  placeholder="1396,00"
                />
              </div>

              <div>
                <Label htmlFor="date">
                  {claimType === "nekachTov" ||
                  claimType === "srokiTov" ||
                  claimType === "vozvrat"
                    ? "Дата покупки товара:"
                    : "Дата заключения договора выполнения работ (оказания услуг):"}
                </Label>
                <Input
                  id="date"
                  onInput={(e) => dateHandler(e)}
                  placeholder="01.12.2023"
                />
              </div>

              {claimType === "nekachTov" && (
                <div>
                  <Label htmlFor="complaint">Недостатки товара:</Label>
                  <Textarea
                    id="complaint"
                    placeholder="Не работает интернет, камера не работает"
                  />
                </div>
              )}

              {claimType === "nekachUsl" && (
                <div>
                  <Label htmlFor="complaint">
                    Недостатки выполненной работы (оказанной услуги):
                  </Label>
                  <Textarea
                    id="complaint"
                    placeholder="Телефон после ремонта не включается, зубы после лечения очень сильно болят"
                  />
                </div>
              )}

              {claimType === "srokiUsl" && (
                <div>
                  <Label htmlFor="deadline">
                    Оговоренный срок оказания услуг (выполнения работ):
                  </Label>
                  <Input
                    id="deadline"
                    onInput={(e) => dateHandler(e)}
                    placeholder="22.01.2023"
                  />
                </div>
              )}

              {claimType === "srokiTov" && (
                <div>
                  <Label htmlFor="deadline">
                    Дата согласованной доставки товара:
                  </Label>
                  <Input
                    id="deadline"
                    onInput={(e) => dateHandler(e)}
                    placeholder="22.01.2023"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Требования */}
          {(claimType === "nekachTov" ||
            claimType === "nekachUsl" ||
            claimType === "srokiTov" ||
            claimType === "srokiUsl") && (
            <Card>
              <CardHeader>
                <CardTitle>Требования</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Основное требование:</Label>
                  <Select onValueChange={handleMainRequirementChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите требование" />
                    </SelectTrigger>
                    <SelectContent>
                      {claimOptions[
                        claimType as keyof typeof claimOptions
                      ]?.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showSorazm && (
                  <div>
                    <Label htmlFor="sorazmAmount">
                      Сумма соразмерного уменьшения стоимости товара (работ,
                      услуг):
                    </Label>
                    <Input
                      id="sorazmAmount"
                      onBlur={(e) => formatNumberInput(e)}
                      placeholder="500,00"
                    />
                  </div>
                )}

                {showVozm && (
                  <div>
                    <Label htmlFor="vozmAmount">
                      Сумма возмещения расходов по устранению недостатков:
                    </Label>
                    <Input
                      id="vozmAmount"
                      onBlur={(e) => formatNumberInput(e)}
                      placeholder="300,00"
                    />
                  </div>
                )}

                {(claimType === "nekachTov" || claimType === "nekachUsl") &&
                  mainRequirement && (
                    <div className="space-y-4">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setShowAdditionalRequirement(
                            !showAdditionalRequirement
                          )
                        }
                      >
                        {showAdditionalRequirement
                          ? "Скрыть дополнительное требование"
                          : "Добавить дополнительное требование"}
                      </Button>

                      {showAdditionalRequirement && (
                        <div>
                          <Label htmlFor="additionalRequirement">
                            Дополнительное требование:
                          </Label>
                          <Select>
                            <SelectTrigger id="additionalRequirement">
                              <SelectValue placeholder="Выберите дополнительное требование" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAdditionalOptions().map((option, index) => (
                                <SelectItem key={index} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}
              </CardContent>
            </Card>
          )}

          {/* Дополнительные требования */}
          <Card>
            <CardHeader>
              <CardTitle>Дополнительные требования</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Показываем моральный вред только для разрешенных типов */}
              {claimType !== "otkaz" && claimType !== "vozvrat" && (
                <>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="moralDamage"
                      onCheckedChange={setShowMoralDamage}
                    />
                    <Label htmlFor="moralDamage">Моральный вред</Label>
                  </div>
                  {showMoralDamage && (
                    <div>
                      <Label htmlFor="moralAmount">
                        Сумма морального вреда
                      </Label>
                      <Input
                        id="moralAmount"
                        onBlur={(e) => formatNumberInput(e)}
                        placeholder="1000,00"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Неустойка показывается только для нарушений сроков */}
              {(claimType === "srokiTov" || claimType === "srokiUsl") && (
                <div className="flex items-center space-x-2">
                  <Switch id="penalty" onCheckedChange={setShowPenalty} />
                  <Label htmlFor="penalty">Неустойка за нарушение сроков</Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Согласие с политикой */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreement"
              checked={isAgreed}
              onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
            />
            <Label htmlFor="agreement">
              Я ознакомлен и согласен с{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                политикой обработки моих персональных данных
              </Link>
            </Label>
          </div>

          <Button
            disabled={!isAgreed}
            className={`w-full ${!isAgreed && `opacity-75`}`}
            size="lg"
            onClick={handleSubmit}
          >
            Сформировать претензию
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleReset}
          >
            Очистить форму
          </Button>
        </div>
      </div>
    </div>
  );
}
