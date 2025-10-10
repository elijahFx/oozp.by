"use client";

import { useState, useRef, useCallback } from "react";
import { ClaimTypeSection } from "@/components/claim-builder/ClaimTypeSection";
import { ConsumerDataSection } from "@/components/claim-builder/ConsumerDataSection";
import { OrganizationDataSection } from "@/components/claim-builder/OrganizationDataSection";
import { ProductServiceSection } from "@/components/claim-builder/ProductServiceSection";
import { RequirementsSection } from "@/components/claim-builder/RequirementsSection";
import { AdditionalRequirementsSection } from "@/components/claim-builder/AdditionalRequirementsSection";
import { AgreementSection } from "@/components/claim-builder/AgreementSection";
import { ActionButtons } from "@/components/claim-builder/ActionButtons";
import { ErrorAlert } from "@/components/claim-builder/ErrorAlert";
import { HowToUseSection } from "@/components/claim-builder/HowToUseSection";
import { ServiceDescription } from "@/components/claim-builder/ServiceDescription";
import { claimOptions, typeMap } from "@/lib/constructorConfig";
import { generateClaimDocument } from "@/lib/claims_constructor";
import { Packer } from "docx";

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
  const [error, setError] = useState<string | null>(null);

  const errorRef = useRef<HTMLDivElement>(null);

  const scrollToError = useCallback(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Добавляем небольшую вибрацию для привлечения внимания
      errorRef.current.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-10px)" },
          { transform: "translateX(10px)" },
          { transform: "translateX(0)" },
        ],
        {
          duration: 500,
          iterations: 1,
        }
      );
    }
  }, []);

  const showError = useCallback(
    (message: string) => {
      setError(message);
      // Используем setTimeout чтобы дать компоненту отрендериться
      setTimeout(() => {
        scrollToError();
      }, 100);
    },
    [scrollToError]
  );

  const handleMainRequirementChange = (value: string) => {
    setMainRequirement(value);
    setShowSorazm(value === "Соразмерное уменьшение стоимости");
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
    setError(null);

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

  const validateForm = (): {
    isValid: boolean;
    errorMessage?: string;
    fieldId?: string;
  } => {
    // Проверка типа претензии
    if (!claimType) {
      return {
        isValid: false,
        errorMessage: "Пожалуйста, выберите тип претензии",
        fieldId: "claim-type-select",
      };
    }

    // Проверка обязательных полей
    const requiredFields = [
      { id: "name", name: "ФИО" },
      { id: "address", name: "адрес" },
      { id: "phone", name: "телефон" },
      { id: "orgName", name: "наименование организации" },
      { id: "orgAddress", name: "адрес организации" },
    ];

    // Добавляем поле товара/услуги только если оно должно отображаться
    if (claimType !== "nekachUsl") {
      requiredFields.push({ id: "good", name: "наименование товара/услуги" });
    }

    requiredFields.push(
      { id: "price", name: "цена" },
      { id: "date", name: "дата покупки/заключения договора" }
    );

    for (const field of requiredFields) {
      const element = document.getElementById(field.id) as HTMLInputElement;
      if (element && !element.value.trim()) {
        return {
          isValid: false,
          errorMessage: `Пожалуйста, заполните поле "${field.name}"`,
          fieldId: field.id,
        };
      }
    }

    // Проверка основного требования для соответствующих типов
    if (
      (claimType === "nekachTov" ||
        claimType === "nekachUsl" ||
        claimType === "srokiTov" ||
        claimType === "srokiUsl") &&
      !mainRequirement
    ) {
      return {
        isValid: false,
        errorMessage: "Пожалуйста, выберите основное требование",
        fieldId: "main-requirement-select",
      };
    }

    // Проверка суммы соразмерного уменьшения
    if (showSorazm) {
      const sorazmAmount = (
        document.getElementById("sorazmAmount") as HTMLInputElement
      )?.value;
      if (!sorazmAmount || parseFloat(sorazmAmount.replace(",", ".")) <= 0) {
        return {
          isValid: false,
          errorMessage:
            "Пожалуйста, укажите корректную сумму соразмерного уменьшения",
          fieldId: "sorazmAmount",
        };
      }
    }

    // Проверка суммы возмещения расходов
    if (showVozm) {
      const vozmAmount = (
        document.getElementById("vozmAmount") as HTMLInputElement
      )?.value;
      if (!vozmAmount || parseFloat(vozmAmount.replace(",", ".")) <= 0) {
        return {
          isValid: false,
          errorMessage:
            "Пожалуйста, укажите корректную сумму возмещения расходов",
          fieldId: "vozmAmount",
        };
      }
    }

    // Проверка суммы морального вреда
    if (showMoralDamage) {
      const moralAmount = (
        document.getElementById("moralAmount") as HTMLInputElement
      )?.value;
      if (!moralAmount || parseFloat(moralAmount.replace(",", ".")) <= 0) {
        return {
          isValid: false,
          errorMessage: "Пожалуйста, укажите корректную сумму морального вреда",
          fieldId: "moralAmount",
        };
      }
    }

    return { isValid: true };
  };

  const handleSubmit = async () => {
    try {
      // Сбрасываем предыдущие ошибки
      setError(null);

      // Валидация формы
      const validation = validateForm();
      if (!validation.isValid && validation.errorMessage) {
        showError(validation.errorMessage);

        // Дополнительная прокрутка к проблемному полю если есть fieldId
        if (validation.fieldId) {
          setTimeout(() => {
            const fieldElement = document.getElementById(validation.fieldId!);
            if (fieldElement) {
              fieldElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              fieldElement.focus();
            }
          }, 600);
        }

        return;
      }

      if (!isAgreed) {
        showError(
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
        consumerAddress: (
          document.getElementById("address") as HTMLInputElement
        )?.value,
        consumerPhone: (document.getElementById("phone") as HTMLInputElement)
          ?.value,
        sellerName: (document.getElementById("orgName") as HTMLInputElement)
          ?.value,
        sellerUnp: (document.getElementById("unp") as HTMLInputElement)?.value,
        sellerAddress: (
          document.getElementById("orgAddress") as HTMLInputElement
        )?.value,
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

      // Генерация документа
      const doc = await generateClaimDocument(formData);
      const blob = await Packer.toBlob(doc);

      if (!(blob instanceof Blob)) {
        throw new Error("Не удалось сгенерировать документ");
      }

      // Скачивание документа
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Претензия_${formData.consumerFullName || "документ"}.docx`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);

      // Отправка на сервер
      const response = await fetch("https://apocrypha.su/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных на сервер");
      }

      console.log("Документ скачан и претензия успешно отправлена!");
    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "Произошла неизвестная ошибка";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      showError(errorMessage);
    }
  };

  const showRequirementsSection =
    claimType === "nekachTov" ||
    claimType === "nekachUsl" ||
    claimType === "srokiTov" ||
    claimType === "srokiUsl";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Конструктор претензий
        </h1>
        

      <ServiceDescription />

        {/* Блок ошибок */}
        {error && (
          <div className="mb-6">
            <ErrorAlert
              ref={errorRef}
              message={error}
              onClose={() => setError(null)}
            />
          </div>
        )}

        <div className="space-y-8">
          <ClaimTypeSection
            claimType={claimType}
            setClaimType={setClaimType}
            setMainRequirement={setMainRequirement}
            setShowAdditionalRequirement={setShowAdditionalRequirement}
            setShowSorazm={setShowSorazm}
            setShowVozm={setShowVozm}
          />

          <ConsumerDataSection />

          <OrganizationDataSection />

          {claimType && <ProductServiceSection claimType={claimType} />}

          {showRequirementsSection && (
            <RequirementsSection
              claimType={claimType}
              mainRequirement={mainRequirement}
              showSorazm={showSorazm}
              showVozm={showVozm}
              showAdditionalRequirement={showAdditionalRequirement}
              setShowAdditionalRequirement={setShowAdditionalRequirement}
              handleMainRequirementChange={handleMainRequirementChange}
            />
          )}

          <AdditionalRequirementsSection
            claimType={claimType}
            showMoralDamage={showMoralDamage}
            showPenalty={showPenalty}
            setShowMoralDamage={setShowMoralDamage}
            setShowPenalty={setShowPenalty}
          />

          <AgreementSection isAgreed={isAgreed} setIsAgreed={setIsAgreed} />

          <ActionButtons
            isAgreed={isAgreed}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />

          <div className="lg:col-span-1">
            <HowToUseSection />
          </div>
        </div>
      </div>
    </div>
  );
}
