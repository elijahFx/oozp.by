import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";

// Константы
const INDENT = 4952;
const nbrbApi = `https://www.nbrb.by/api/refinancingrate`;

// Основная функция для генерации документа
async function generateClaimDocument(formData) {
  // Получаем данные из формы
  const {
    claimType,
    consumerFullName: name,
    consumerAddress: address,
    consumerPhone: phone,
    sellerName: orgName,
    sellerUnp: unp,
    sellerAddress: orgAddress,
    goodName: good,
    cost: price,
    contractDate: date,
    problem: complaint,
    deadline,
    request: mainRequirement,
    secondRequest: additionalRequirement,
    moral: moralAmount,
    penalty,
    vozmAmount,
    sorazm,
  } = formData;

  console.log(formData);

  // Получаем текущие ставки
  const refinancingRate = await getRefinancingRate();
  const daysInCurrentYear = getDaysInCurrentYear();

  // Определяем тип претензии и формируем контент
  let documentContent = [];
  let requirements = [];
  let legalBasis = [];

  // Формируем заголовок
  documentContent.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `${orgName}`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      indent: { left: INDENT },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `${orgAddress}`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      indent: { left: INDENT },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `УНП - ${unp}`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      indent: { left: INDENT },
      spacing: { after: 300 },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `${name}`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      indent: { left: INDENT },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `${address}`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      indent: { left: INDENT },
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: `${phone}`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      indent: { left: INDENT },
      spacing: { after: 300 },
    })
  );

  documentContent.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `ПРЕТЕНЗИЯ`,
          bold: true,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      spacing: { after: 300 },
    })
  );

  // Формируем основное содержание претензии в зависимости от типа
  switch (claimType) {
    case "nekachTov":
      // Формирование для некачественного товара
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${date} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я произвел(-а) оплату в сумме: ${price} белорусских рублей.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `В процессе эксплуатации товара в соответствии с его назначением и правилами пользования, мною был(-и) обнаружен(-ы) следующий(-ие) недостатки товара: ${complaint}.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Таким образом, полагаю, что Вашей организацией было нарушено мое право, как потребителя, на товар надлежащего качества.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      // Добавляем юридическое обоснование
      legalBasis = getLegalBasisForNekachTov();
      // Добавляем требования
      requirements = getRequirementsForNekachTov(formData);
      break;

    case "nekachUsl":
      // Формирование для некачественной услуги
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${date} заключил(-а) с Вашей организацией договор оказания услуг (выполнения работ), согласно которому Ваша организация обязалась оказать (выполнить) следующие услуги (работы): ${good} (далее – услуги).`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `В процессе оказания услуг (выполнения работ), мною был(-и) обнаружен(-ы) следующий(-ие) недостатки услуг (работ): ${complaint}.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Таким образом, полагаю, что Вашей организацией было нарушено мое право, как потребителя, на услугу (работу) надлежащего качества.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForNekachUsl();
      requirements = getRequirementsForNekachUsl(formData);
      break;

    case "srokiTov":
      // Формирование для нарушения сроков передачи товара
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${date} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `В соответствии с условиями договора, Ваша организация обязалась осуществить доставку товара в срок до ${complaint}. Вместе с тем, на момент составления настоящей претензии Ваша организация не исполнила обязательства по договору ни в каком объеме.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForSrokiTov(formData, refinancingRate, daysInCurrentYear);
      requirements = getRequirementsForSrokiTov(formData);
      break;

    case "srokiUslug":
      // Формирование для нарушения сроков оказания услуг
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${date} заключил(-а) с Вашей организацией договор оказания услуг (выполнения работ), согласно которому Ваша организация обязалась оказать (выполнить) следующие услуги (работы): ${good} (далее – услуги).`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `В соответствии с условиями договора, Ваша организация обязалась осуществить оказание услуг (выполнение работ) в срок до ${complaint}. Вместе с тем, на момент составления настоящей претензии Ваша организация не исполнила обязательства по договору ни в каком объеме.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForSrokiUslug(formData);
      requirements = getRequirementsForSrokiUslug(formData);
      break;

    case "otkaz":
      // Формирование для одностороннего отказа от договора
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${date} заключил(-а) с Вашей организацией договор оказания услуг (выполнения работ), согласно которому Ваша организация обязалась оказать (выполнить) следующие услуги (работы): ${good} (далее – услуги).`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `В настоящий момент времени необходимость в оказании услуг (выполнении работ) отпала, в связи с чем заявляю свое требование о расторжении заключенного между нами договора и возврате уплаченных мной денежных средств за данные услуги (работы) в полном объеме.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForOtkaz();
      requirements = getRequirementsForOtkaz(formData);
      break;

    case "kachTov":
      // Формирование для возврата качественного товара
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${date} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `В настоящий момент времени необходимость в приобретенном мною товаре отпала, в связи с чем заявляю свое требование о возврате уплаченных мной денежных средств за данный товар в полном объеме.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForKachTov();
      requirements = getRequirementsForKachTov(formData);
      break;

    default:
      break;
  }

  // Добавляем юридическое обоснование
  documentContent.push(...legalBasis);

  // Добавляем требования
  documentContent.push(...requirements);

  // Добавляем моральный вред если указан
  if (moralAmount) {
    documentContent.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${requirements.length + 1}. Выплатить мне компенсацию понесенного морального вреда в размере ${moralAmount} белорусских рублей.`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
        spacing: { after: 300 },
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `Согласно пункту 1 статьи 18 Закона, компенсация морального вреда, причиненного потребителю вследствие нарушения изготовителем (продавцом, поставщиком, представителем, исполнителем, ремонтной организацией) прав потребителя, предусмотренных законодательством, осуществляется причинителем вреда при наличии его вины, если иное не предусмотрено законодательными актами.`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `Согласно пункту 2 статьи 18 Закона, компенсация морального вреда осуществляется независимо от подлежащего возмещению имущественного вреда. Компенсация морального вреда осуществляется в денежной форме.`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `Согласно пункту 3 статьи 18 Закона, размер компенсации морального вреда определяется судом в зависимости от характера причиненных потребителю физических и нравственных страданий, а также от степени вины причинителя вреда. При определении размера компенсации морального вреда должны учитываться требования разумности и справедливости.`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      })
    );
  }

  // Добавляем заключительную часть
  documentContent.push(
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 708 },
      children: [
        new TextRun({
          text: `Одновременно информирую, что в случае неисполнения Вами заявленных требований мною будет подготовлено исковое заявление в суд.`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      spacing: { after: 300 },
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 708 },
      children: [
        new TextRun({
          text: `Срок предоставления ответа на претензию составляет ${getResponseDays(claimType)} дней с момента ее получения.`,
          font: "Times New Roman",
          size: 28,
        }),
      ],
      spacing: { after: 500 },
    })
  );

  // Добавляем подпись
  documentContent.push(createSignatureSection(name, getCurrentDate()));

  // Создаем документ
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: documentContent,
        page: {
          size: { width: 16838, height: 23811 }, // A4 size in twips
        },
      },
    ],
  });

  return doc;
}

// Вспомогательные функции
function getLegalBasisForNekachTov() {
  return [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 708 },
      children: [
        new TextRun({
          text: "Обращаю Ваше внимание, что согласно пункту 2, 4, 5 статьи 11 Закона «О защите прав потребителей»...",
          font: "Times New Roman",
          size: 28,
        }),
      ],
    }),
    // Другие параграфы юридического обоснования
  ];
}

function getRequirementsForNekachTov(formData) {
  const requirements = [];
  let count = 1;

  if (formData.request === "Возврат денежных средств") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Расторгнуть заключенный, между нами, договор;`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        spacing: { after: !formData.moral ? 160 : 0 },
        children: [
          new TextRun({
            text: `${
              count + 1
            }. Вернуть уплаченные мной денежные средства по договору в размере ${
              formData.cost
            } белорусских рублей${formData.moral ? ";" : "."}`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      })
    );
    count += 1;
    getSecondRequest(formData.secondRequest);
  } else if (formData.request === "Замена товара") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Осуществить замену товара ненадлежащего качества на товар надлежащего качества в срок не позднее 14 дней с момента получения настоящей претензии`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? formData.secondRequest : "",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
            bold: true, // Делаем текст жирным
          }),
          new TextRun({
            text: formData.moral ? ";" : ".",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
    getSecondRequest(formData.secondRequest);
  } else if (formData.request === "Соразмерное уменьшение стоимости") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Соразмерно уменьшить стоимость товара на ${formData.sorazm} белорусских рублей`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? formData.secondRequest : "",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
            bold: true, // Делаем текст жирным
          }),
          new TextRun({
            text: formData.moral ? ";" : ".",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
    getSecondRequest(formData.secondRequest);
  } else if (
    formData.request === "Возмещение расходов по устранению недостатков"
  ) {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Возместить расходы на устранение недостатка(-ов) товара общей стоимостью в ${formData.vozmAmount} белорусских рублей`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? formData.secondRequest : "",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
            bold: true, // Делаем текст жирным
          }),
          new TextRun({
            text: formData.moral ? ";" : ".",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
    getSecondRequest(formData.secondRequest);
  } else if (formData.request === "Безвозмездное устранение недостатков") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Безвозмездно устранить вышеизложенные недостатки товара не позднее 14 дней с момента получения настоящей претензии`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? formData.secondRequest : "",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
            bold: true, // Делаем текст жирным
          }),
          new TextRun({
            text: formData.moral ? ";" : ".",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
    getSecondRequest(formData.secondRequest);
  }
  // Добавьте другие варианты требований

  if (formData.moral) {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: `${count}. Выплатить мне компенсацию понесенного морального вреда в размере ${formData.moral} белорусских рублей.`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      })
    );
  }

  return requirements;
}

function createSignatureSection(name, date) {
  const abr = abbreviateName(name);

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: date,
                    font: "Times New Roman",
                    size: 28,
                  }),
                ],
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 100 / 3, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `АВТПО`,
                    font: "Times New Roman",
                    size: 28,
                    color: "FFFFFF",
                  }),
                ],
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 100 / 3, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: abr,
                    font: "Times New Roman",
                    size: 28,
                  }),
                ],
              }),
            ],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 100 / 3, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
    ],
  });
}

// Вспомогательные функции из вашего кода
function abbreviateName(fullName) {
  const parts = fullName.split(" ");
  if (parts.length !== 3) {
    throw new Error(
      "Пожалуйста введите свои полные ФИО: фамилию, имя, отчество!"
    );
  }
  return `${parts[0]} ${parts[1].charAt(0)}.${parts[2].charAt(0)}.`;
}

function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function getResponseDays(claimType) {
  // Логика определения количества дней для ответа
  return 7; // Пример
}

async function getRefinancingRate() {
  try {
    const response = await fetch(nbrbApi);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    const data = await response.json();
    return data[data.length - 1].Value / 100;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return 0.1; // Значение по умолчанию
  }
}

function getDaysInCurrentYear() {
  const currentYear = new Date().getFullYear();
  return (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
    currentYear % 400 === 0
    ? 366
    : 365;
}

function getSecondRequest(formData) {
  if (!formData.secondRequest || formData.secondRequest === null) {
    formData.secondRequest = ``
  };
  const requirements = [];
  let count = 2
  if (formData.secondRequest === "Возврат денежных средств") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ:`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Расторгнуть заключенный, между нами, договор;`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        spacing: { after: !formData.moral ? 160 : 0 },
        children: [
          new TextRun({
            text: `${
              count + 1
            }. Вернуть уплаченные мной денежные средства по договору в размере ${
              formData.cost
            } белорусских рублей${formData.moral ? ";" : "."}`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      })
    );
    count += 1;
  } else if (formData.secondRequest === "Замена товара") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ:`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Осуществить замену товара ненадлежащего качества на товар надлежащего качества в срок не позднее 14 дней с момента получения настоящей претензии`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
  } else if (
    formData.secondRequest === "Возмещение расходов по устранению недостатков"
  ) {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ:`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Возместить расходы на устранение недостатка(-ов) товара общей стоимостью в ${formData.vozmAmount} белорусских рублей`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
  } else if (formData.secondRequest === "Безвозмездное устранение недостатков") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ:`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Безвозмездно устранить вышеизложенные недостатки товара не позднее 14 дней с момента получения настоящей претензии`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
  } else if (formData.secondRequest === "Соразмерное уменьшение стоимости") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ:`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Соразмерно уменьшить стоимость товара на ${formData.sorazm} белорусских рублей`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
        ],
        spacing: { after: formData.moral ? 0 : 300 },
      })
    );
    count += 1;
  }

  return requirements
}

// Экспорт основной функции
export { generateClaimDocument };
