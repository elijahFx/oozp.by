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
const DEFAULT_FONT = "Times New Roman";
const FONT_SIZE = 28; // 14pt = 28 half-points
const CURRENCY = "белорусских рублей";
const INDENT2 = { firstLine: 708 };
let outerPenalty = 0;
let SECOND_REQUEST = "";

let moralDamageParagraphs = [];

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

  SECOND_REQUEST = getSecondRequest(formData);

  console.log(formData);

  moralDamageParagraphs = moralAmount
    ? [
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
        }),
      ]
    : [];

  console.log(claimType);

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
      legalBasis = getLegalBasisForNekachTov(formData);
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
      requirements = getRequirementsForNekachTov(formData);

      console.log(requirements);

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
              text: `В соответствии с условиями договора, Ваша организация обязалась осуществить доставку товара в срок до ${formData.deadline}. Вместе с тем, на момент составления настоящей претензии Ваша организация не исполнила обязательства по договору ни в каком объеме.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForSrokiTov(
        formData,
        refinancingRate,
        daysInCurrentYear
      );
      requirements = getRequirementsForSrokiTov(formData);
      break;

    case "srokiUsl":
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
              text: `В соответствии с условиями договора, Ваша организация обязалась осуществить оказание услуг (выполнение работ) в срок до ${deadline}. Вместе с тем, на момент составления настоящей претензии Ваша организация не исполнила обязательства по договору ни в каком объеме.`,
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
              text: `Я произвел(-а) оплату в сумме: ${formData.cost} белорусских рублей.`,
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
              text: `На сегодняшний день необходимость в оказании услуг Вашей организацией отпала. В связи с этим я в одностороннем порядке отказываюсь от исполнения договора с Вашей организацией.`,
              font: "Times New Roman",
              size: 28,
            }),
          ],
        })
      );
      legalBasis = getLegalBasisForOtkaz();
      requirements = getRequirementsForOtkaz(formData);
      break;

    case "vozvrat":
      // Формирование для возврата качественного товара
      documentContent.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: 708 },
          children: [
            new TextRun({
              text: `Я, ${name}, ${formData.contractDate} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
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
              text: `Я произвел(-а) оплату в сумме: ${formData.cost} белорусских рублей.`,
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
              text: `В настоящий момент времени необходимость в приобретенном мною товаре отпала, в связи с чем заявляю свое требование о возврате уплаченных мною денежных средств за данный товар в полном объеме.`,
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
            text: `${
              requirements.length + 1
            }. Выплатить мне компенсацию понесенного морального вреда в размере ${moralAmount} белорусских рублей.`,
            font: "Times New Roman",
            size: 28,
          }),
        ],
        spacing: { after: 300 },
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
          text: `Срок предоставления ответа на претензию составляет ${getResponseDays(
            mainRequirement
          )} дней с момента ее получения.`,
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
function getLegalBasisForNekachTov(formData) {
  const paragraphs = [];

  if (formData?.sorazm) {
    paragraphs.push(
      createParagraph(
        `В связи с наличием недостатка(-ов) в приобретенном мной товаре полагаю разумным соразмерно уменьшить его стоимоcть на ${formData.sorazm} белорусских рублей.`
      )
    );
  }

  if (formData?.vozmAmount) {
    paragraphs.push(
      createParagraph(
        `В связи с наличием недостатка(-ов) в приобретенном мной товаре я был вынужден понести расходы по устранению обнаруженных недостатков в общем размере в ${formData.vozmAmount} белорусских рублей.`
      )
    );
  }

  paragraphs.push(
    createParagraph(
      "Обращаю Ваше внимание, что согласно пункту 2, 4, 5 статьи 11 Закона «О защите прав потребителей» от 9 января 2002 г. № 90-З (далее – Закон), продавец (исполнитель) обязан продемонстрировать работоспособность товара (результата работы) и передать потребителю товар (выполнить работу, оказать услугу), качество которого соответствует предоставленной информации о товаре (работе, услуге), требованиям законодательства, технических регламентов Таможенного союза, технических регламентов Евразийского экономического союза и условиям договора, а также по требованию потребителя предоставить ему необходимые средства измерений, прошедшие метрологический контроль в соответствии с законодательством об обеспечении единства измерений, документы, подтверждающие качество товара (результата работы, услуги), его комплектность, количество."
    )
  );

  paragraphs.push(
    createParagraph(
      "Если продавец (исполнитель) при заключении договора был поставлен потребителем в известность о конкретных целях приобретения товара (выполнения работы, оказания услуги), продавец (исполнитель) обязан передать потребителю товар (выполнить работу, оказать услугу) надлежащего качества, пригодный для использования в соответствии с этими целями."
    )
  );

  paragraphs.push(
    createParagraph(
      "При реализации потребителю товаров (выполнении работ, оказании услуг) по образцам, описаниям товаров (работ, услуг), содержащимся в каталогах, проспектах, рекламе, буклетах или представленным в фотографиях или иных информационных источниках, в том числе в глобальной компьютерной сети Интернет, продавец (исполнитель) обязан передать потребителю товар (выполнить работу, оказать услугу), качество которого соответствует таким образцам, описаниям, а также требованиям законодательства, технических регламентов Таможенного союза, технических регламентов Евразийского экономического союза."
    )
  );

  paragraphs.push(
    createParagraph(
      "Также согласно пункту 1 статьи 20 Закона, в случае реализации товара ненадлежащего качества, если его недостатки не были оговорены продавцом, потребитель вправе по своему выбору потребовать:"
    )
  );

  paragraphs.push(
    createParagraph(
      "1.1. замены недоброкачественного товара товаром надлежащего качества;"
    )
  );
  paragraphs.push(
    createParagraph("1.2. соразмерного уменьшения покупной цены товара;")
  );
  paragraphs.push(
    createParagraph(
      "1.3. незамедлительного безвозмездного устранения недостатков товара;"
    )
  );
  paragraphs.push(
    createParagraph(
      "1.4. возмещения расходов по устранению недостатков товара."
    )
  );

  paragraphs.push(
    createParagraph(
      "Согласно пункту 3 статьи 20 Закона, потребитель вправе расторгнуть договор розничной купли-продажи и потребовать возврата уплаченной за товар денежной суммы в соответствии с пунктом 4 статьи 27 настоящего Закона."
    )
  );

  paragraphs.push(
    createParagraph(
      "В соответствии с пунктом 11 статьи 20 Закона, продавец (изготовитель, поставщик, представитель) обязан принять товар ненадлежащего качества у потребителя, а в случае необходимости - провести проверку качества товара, в том числе с привлечением ремонтной организации. Продавец (изготовитель, поставщик, представитель) обязан проинформировать потребителя о его праве на участие в проведении проверки качества товара, а если такая проверка не может быть проведена незамедлительно, - также о месте и времени проведения проверки качества товара. Ремонтная организация при получении товара от продавца (изготовителя, поставщика, представителя) для проведения проверки качества товара обязана провести такую проверку в течение трех дней со дня получения товара."
    )
  );

  paragraphs.push(
    createParagraph(
      "При возникновении между потребителем и продавцом (изготовителем, поставщиком, представителем) спора о наличии недостатков товара и причинах их возникновения продавец (изготовитель, поставщик, представитель) обязан провести экспертизу товара за свой счет в порядке, установленном Правительством Республики Беларусь. О месте и времени проведения экспертизы потребитель должен быть извещен в письменной форме."
    )
  );

  paragraphs.push(
    createParagraph(
      "Стоимость экспертизы оплачивается продавцом (изготовителем, поставщиком, представителем). Если в результате проведенной экспертизы товара установлено, что недостатки товара отсутствуют или возникли после передачи товара потребителю вследствие нарушения им установленных правил использования, хранения, транспортировки товара или действий третьих лиц либо непреодолимой силы, потребитель обязан возместить продавцу (изготовителю, поставщику, представителю) расходы на проведение экспертизы, а также связанные с ее проведением расходы на транспортировку товара."
    )
  );

  paragraphs.push(
    createParagraph(
      "Потребитель вправе принять участие в проведении проверки качества и экспертизы товара лично или через своего представителя, оспорить заключение экспертизы товара в судебном порядке, а также при возникновении между потребителем и продавцом (изготовителем, поставщиком, представителем) спора о наличии недостатков товара и причинах их возникновения провести экспертизу товара за свой счет. Если в результате экспертизы товара, проведенной за счет потребителя, установлено, что недостатки возникли до передачи товара потребителю или по причинам, возникшим до момента его передачи, продавец (изготовитель, поставщик, представитель) обязан возместить потребителю расходы на проведение экспертизы, а также связанные с ее проведением расходы на транспортировку товара."
    )
  );

  paragraphs.push(
    createParagraph(
      "Согласно статье 21 Закона, потребитель вправе предъявить предусмотренные статьей 20 Закона требования продавцу (изготовителю, поставщику, представителю) в отношении недостатков товара в течение гарантийного срока или срока годности товара."
    )
  );

  paragraphs.push(
    createParagraph(
      "Согласно пункту 2 статьи 15 Закона, убытки, причиненные потребителю, подлежат возмещению в полном объеме сверх неустойки, установленной законодательством или договором."
    )
  );

  paragraphs.push(...moralDamageParagraphs);

  paragraphs.push(
    createParagraph(
      "На основании изложенного и руководствуясь статьями 290-291 ГК, 2, 18, 20, 21 Закона,"
    )
  );

  paragraphs.push(createParagraph("ПРОШУ:"));

  return paragraphs;
}

function getRequirementsForNekachTov(formData) {
  const requirements = [];
  let count = 1;

  SECOND_REQUEST = getSecondRequest(formData);

  console.log(formData.request);

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
            } белорусских рублей${formData.secondRequest ? "" : formData.moral ? ";" : "."}`,
            font: "Times New Roman",
            size: 28,
          }),
          new TextRun({
            text: formData.secondRequest ? `${SECOND_REQUEST}` : "",
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
            bold: true, // Делаем текст жирным
          }),
        ],
      })
    );
    count += 1;
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
            text: formData.secondRequest ? `${SECOND_REQUEST}` : "",
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
  } else if (formData.request === "Соразмерное уменьшение стоимости") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Соразмерно уменьшить стоимость ${
              formData.claimType === "nekachTov" ? "товара" : "работы (услуги)"
            } на ${formData.sorazm} белорусских рублей`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? `${SECOND_REQUEST}` : "",
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
  } else if (
    formData.request === "Возмещение расходов по устранению недостатков"
  ) {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Возместить расходы на устранение недостатка(-ов) ${
              formData.claimType === "nekachTov" ? "товара" : "работы (услуги)"
            } общей стоимостью в ${formData.vozmAmount} белорусских рублей`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? `${SECOND_REQUEST}` : "",
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
  } else if (formData.request === "Безвозмездное устранение недостатков") {
    requirements.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 708 },
        children: [
          new TextRun({
            text: `${count}. Безвозмездно устранить вышеизложенные недостатки ${
              formData.claimType === "nekachTov" ? "товара" : "работы (услуги)"
            } не позднее 14 дней с момента получения настоящей претензии`,
            font: "Times New Roman",
            size: 28, // 14 pt = 28 half-points
          }),
          new TextRun({
            text: formData.secondRequest ? `${SECOND_REQUEST}` : "",
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
  }
  // Добавьте другие варианты требований

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

function getResponseDays(mainRequirement) {
  switch (mainRequirement) {
    case `Безвозмездное устранение недостатков`:
      return 14;

    case `Замена товара`:
      return 30;

    default:
      return 7;
  }
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

function getLegalBasisForNekachUsl() {
  return [
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 708 },
      children: [
        new TextRun({
          text: "Согласно статье 290 Гражданского кодекса Республики Беларусь от 07.12.1998 № 218-З (далее - ГК), обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями законодательства, а при отсутствии таких условий и требований – в соответствии с обычно предъявляемыми требованиями.",
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
          text: "Согласно пункту 1 статьи 2 Закона Республики Беларусь от 09.01.2002 № 90-З «О защите прав потребителей» (далее – Закон), действие настоящего Закона распространяется на отношения между потребителями и изготовителями, продавцами, поставщиками, представителями, исполнителями, ремонтными организациями, возникающие из договоров розничной купли-продажи, подряда, аренды, страхования, хранения, энергоснабжения, комиссии, перевозки пассажира, перевозки груза, возмездного оказания услуг и иных подобных договоров.",
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
          text: "Согласно пункту 1 статьи 31 Закона, при обнаружении отступлений от условий договора, ухудшивших результат работы (услугу), или иных недостатков выполненной работы (оказанной услуги) потребитель вправе по своему выбору потребовать:",
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
          text: "1.1. безвозмездного устранения недостатков выполненной работы (оказанной услуги);",
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
          text: "1.2. соразмерного уменьшения установленной цены выполненной работы (оказанной услуги);",
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
          text: "1.3. безвозмездного изготовления другой вещи из однородного материала такого же качества или повторного выполнения работы (оказания услуги), если это возможно. При этом потребитель обязан возвратить ранее переданную ему исполнителем вещь;",
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
          text: "1.4. возмещения понесенных им расходов по устранению недостатков выполненной работы (оказанной услуги) своими силами или третьими лицами.",
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
          text: "Согласно пункту 3 статьи 31 Закона, потребитель вправе расторгнуть договор о выполнении работы (оказании услуги) и потребовать возврата уплаченной за выполненную работу (оказанную услугу) денежной суммы, если в установленные пунктом 1 статьи 32 Закона или договором сроки недостатки выполненной работы (оказанной услуги) не устранены исполнителем. Потребитель также вправе расторгнуть договор о выполнении работы (оказании услуги) и потребовать возврата уплаченной за выполненную работу (оказанную услугу) денежной суммы, если им обнаружены существенные недостатки выполненной работы (оказанной услуги) или отступления от условий договора, ухудшившие результат работы (услугу).",
          font: "Times New Roman",
          size: 28,
        }),
      ],
    }),
    ...moralDamageParagraphs,
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 708 },
      children: [
        new TextRun({
          text: "На основании изложенного и руководствуясь статьями 290-291 ГК, 2, 18, 31 Закона,",
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
          text: "ПРОШУ:",
          font: "Times New Roman",
          size: 28,
        }),
      ],
    }),
  ];
}

function getLegalBasisForSrokiTov(
  formData,
  refinancingRate,
  daysInCurrentYear
) {
  if (!formData || typeof refinancingRate !== "number" || !daysInCurrentYear) {
    throw new Error("Некорректные входные данные");
  }

  const { cost, penalty: hasPenalty, deadline } = formData;
  const paragraphs = [];

  // Основные юридические положения
  paragraphs.push(
    createParagraph(
      "В соответствии со статьей 290 Гражданского кодекса Республики Беларусь от 07.12.1998 № 218-З (далее - ГК), обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями законодательства."
    ),
    createParagraph(
      "Обращаю Ваше внимание, что согласно пункту 2 статьи 24 Закона «О защите прав потребителей» от 09.01.2002 г. № 90-З (далее – Закон), в случае если продавец, получивший сумму предварительной оплаты, не исполняет обязанности по передаче товара потребителю в установленный договором срок, потребитель по своему выбору вправе потребовать:"
    ),
    createParagraph(
      "2.1. передачи оплаченного товара в установленный им новый срок;"
    ),
    createParagraph(
      "2.2. возврата суммы предварительной оплаты за товар, не переданный продавцом."
    ),
    createParagraph(
      "Согласно пункту 4 статьи 24 Закона, в случае нарушения установленного договором срока передачи предварительно оплаченного товара продавец обязан выплатить потребителю проценты на сумму предварительной оплаты в размере ставки рефинансирования Национального банка Республики Беларусь, установленной на день выплаты процентов."
    ),
    createParagraph(
      "Согласно пункту 5 статьи 24 Закона, требования потребителя о возврате суммы предварительной оплаты подлежит удовлетворению продавцом незамедлительно. В случае, если удовлетворить требования потребителя незамедлительно не представляется возможным, максимальный срок для удовлетворения требований потребителя не может превышать семи дней со дня предъявления соответствующего требования."
    ),
    createParagraph(
      "Согласно статье 26 Закона, за нарушение сроков, предусмотренных частью первой пункта 5 статьи 24, продавец допустивший такое нарушение, уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены товара."
    ),
    createParagraph(
      "Таким образом, вышеперечисленные обязательства Вами не выполнены."
    )
  );

  // Расчет пени (если требуется)
  if (hasPenalty) {
    const [days, penalty] = calculatePenalty(
      getCurrentDate(),
      deadline,
      formData,
      refinancingRate,
      daysInCurrentYear
    );

    outerPenalty = penalty;

    paragraphs.push(
      createParagraph(
        "Проценты выплачиваются со дня, когда по договору передача товара потребителю должна была быть осуществлена, до дня передачи товара потребителю или до дня возврата потребителю суммы предварительной оплаты, если договором для начисления процентов не установлен более короткий срок."
      ),
      createParagraph("Расчет суммы процентов:"),
      createParagraph(
        `${cost} × ${formatRate(
          refinancingRate
        )} / ${daysInCurrentYear} × ${days} = ${penalty} ${CURRENCY}, где:`
      ),
      createParagraph(
        `${cost} ${CURRENCY} – размер денежной суммы, предварительно мною внесенной по договору;`
      ),
      createParagraph(
        `${formatRate(
          refinancingRate
        )} – ставка рефинансирования Национального Банка Республики Беларусь на день составления настоящей претензии;`
      ),
      createParagraph(
        `${daysInCurrentYear} – количество дней в настоящем календарном году;`
      ),
      createParagraph(
        `${days} – количество дней просрочки: с ${addOneDay(
          deadline
        )} по ${getCurrentDate()}.`
      )
    );
  }

  if (formData.moral) {
    paragraphs.push(
      createParagraph(
        "Согласно пункту 1 статьи 18 Закона, компенсация морального вреда, причиненного потребителю вследствие нарушения изготовителем (продавцом, поставщиком, представителем, исполнителем, ремонтной организацией) прав потребителя, предусмотренных законодательством, осуществляется причинителем вреда при наличии его вины, если иное не предусмотрено законодательными актами."
      ),
      createParagraph(
        "Согласно пункту 2 статьи 18 Закона, компенсация морального вреда осуществляется независимо от подлежащего возмещению имущественного вреда. Компенсация морального вреда осуществляется в денежной форме."
      ),
      createParagraph(
        "Согласно пункту 3 статьи 18 Закона, размер компенсации морального вреда определяется судом в зависимости от характера причиненных потребителю физических и нравственных страданий, а также от степени вины причинителя вреда в случае, когда его вина является основанием для возмещения вреда. При определении размера компенсации морального вреда должны учитываться требования разумности и справедливости."
      )
    );
  }

  // Заключительная часть
  paragraphs.push(
    createParagraph(
      "На основании изложенного и руководствуясь статьями 290-291 ГК, 24, 26 Закона,"
    ),
    createParagraph("ПРОШУ:")
  );

  return paragraphs;
}

function getRequirementsForSrokiTov(formData) {
  const paragraphs = [];
  let count = 1;

  paragraphs.push(
    createParagraph(
      `${count}. Вернуть мне уплаченные по договору денежные средства в размере ${formData.cost} белорусских рублей;`
    )
  );

  if (formData.penalty) {
    count += 1;
    paragraphs.push(
      createParagraph(
        `${count}. Выплатить мне проценты за несвоевременную доставку товара в размере ${outerPenalty} белорусских рублей${
          !formData.moral ? "." : ";"
        }`,
        {},
        formData.moral ? undefined : 300
      )
    );
  }

  return paragraphs;
}

function getLegalBasisForSrokiUslug(
  formData,
  refinancingRate,
  daysInCurrentYear
) {
  const { cost, penalty: hasPenalty, deadline } = formData;
  const paragraphs = [];

  paragraphs.push(
    createParagraph(
      "В соответствии со статьей 290 Гражданского кодекса Республики Беларусь от 07.12.1998 № 218-З (далее - ГК), обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями законодательства."
    ),
    createParagraph(
      "Обращаю Ваше внимание, что согласно пункту 1 статьи 30 Закона «О защите прав потребителей» от 09.01.2002 г. № 90-З (далее - Закон), если исполнитель нарушил сроки выполнения работы (оказания услуги), отдельных этапов выполнения работы (оказания услуги), а также иные сроки, предусмотренные договором, или во время выполнения работы (оказания услуги) стало очевидным, что она не будет выполнена в срок, потребитель вправе по своему выбору:"
    ),
    createParagraph("1.1. назначить исполнителю новый срок;"),
    createParagraph(
      "1.2. поручить выполнение работы (оказание услуги) третьим лицам за разумную цену или выполнить ее своими силами и потребовать от исполнителя возмещения понесенных расходов;"
    ),
    createParagraph(
      "1.3. потребовать соразмерного уменьшения установленной цены за выполнение работы (оказание услуги);"
    ),
    createParagraph(
      "1.4. расторгнуть договор о выполнении работы (оказании услуги)."
    ),
    createParagraph(
      "Согласно пункту 5 статьи 30 Закона, при расторжении договора о выполнении работы (оказании услуги) исполнитель не вправе потребовать возмещения своих затрат, произведенных в процессе выполнения работы (оказания услуги), а также платы за уже выполненную работу (оказанную услугу), за исключением случаев, когда потребитель принял выполненную работу (оказанную услугу)."
    )
  );

  if (hasPenalty) {
    const [days, penalty] = calculatePenalty(
      getCurrentDate(),
      deadline,
      formData,
      refinancingRate,
      daysInCurrentYear
    );

    outerPenalty = penalty;

    paragraphs.push(
      createParagraph(
        `Согласно пункту 6 статьи 30 Закона, в случае нарушения установленных сроков выполнения работы (оказания услуги) или назначенных потребителем на основании пункта 1 настоящей статьи новых сроков исполнитель уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены выполнения работы (оказания услуги), а если цена выполнения работы (оказания услуги) договором о выполнении работ (оказании услуг) не определена, - в размере одного процента общей цены заказа.`
      ),
      createParagraph(
        `Таким образом, исходя из крайнего срока исполнения Вашей организацией обязательств по договору – ${deadline}, на день заявления требований о расторжении договора просрочка составила ${days} календарных дней. `
      ),
      createParagraph(
        `Расчет неустойки за нарушение срока исполнения обязательств:`
      ),
      createParagraph(
        `${formData.cost} × 0,01 × ${days} = ${penalty} белорусских рублей, где:`
      ),
      createParagraph(`${formData.cost} – размер предоплаты по договору;`),
      createParagraph(
        `0,01 – размер неустойки за каждый день просрочки исполнения обязательств;`
      ),
      createParagraph(
        `${days} – количество дней просрочки исполнения обязательств с ${addOneDay(
          formData.deadline
        )} по ${getCurrentDate()}.`
      )
    );
  }

  if (formData.moral) {
    paragraphs.push(
      createParagraph(
        `Согласно пункту 1 статьи 18 Закона, компенсация морального вреда, причиненного потребителю вследствие нарушения изготовителем (продавцом, поставщиком, представителем, исполнителем, ремонтной организацией) прав потребителя, предусмотренных законодательством, осуществляется причинителем вреда при наличии его вины, если иное не предусмотрено законодательными актами.`
      ),
      createParagraph(
        `Согласно пункту 2 статьи 18 Закона, компенсация морального вреда осуществляется независимо от подлежащего возмещению имущественного вреда. Компенсация морального вреда осуществляется в денежной форме.`
      ),
      createParagraph(
        `Согласно пункту 3 статьи 18 Закона, размер компенсации морального вреда определяется судом в зависимости от характера причиненных потребителю физических и нравственных страданий, а также от степени вины причинителя вреда. При определении размера компенсации морального вреда должны учитываться требования разумности и справедливости.`
      )
    );
  }

  paragraphs.push(
    createParagraph(
      `Таким образом, вышеперечисленные обязательства Вами не выполнены.`
    ),
    createParagraph(
      `На основании изложенного и руководствуясь статьями 290-291 ГК, 30 Закона,`
    ),
    createParagraph(`ПРОШУ:`)
  );

  return paragraphs;
}

function getRequirementsForSrokiUslug(formData) {
  const paragraphs = [];
  let count = 1;

  paragraphs.push(
    createParagraph(
      `${count}. Расторгнуть заключенный между нами договор оказания услуг (выполнения работ) и вернуть мне уплаченные по договору денежные средства в размере ${
        formData.cost
      } белорусских рублей${formData.moral || formData.penalty ? ";" : "."}`
    )
  );

  if (formData.penalty) {
    count += 1;
    paragraphs.push(
      createParagraph(
        `${count}. Выплатить мне неустойку за несвоевременное исполнение обязательств по договору в размере ${outerPenalty} белорусских рублей${
          formData.moral ? ";" : "."
        }`,
        {},
        formData.moral ? undefined : 300
      )
    );
  }

  return paragraphs;
}

function getLegalBasisForOtkaz(formData) {
  const paragraphs = [];

  paragraphs.push(
    createParagraph(
      "Согласно ст. 38-1 Закона от 09.01.2002 г. № 90-З «О защите прав потребителей» (далее - Закон), потребитель вправе в одностороннем порядке отказаться от исполнения договора о выполнении работы (оказании услуги) при условии оплаты исполнителю фактически понесенных им расходов, если иное не предусмотрено законодательством."
    ),
    createParagraph(
      "В случае, если денежная сумма, уплаченная потребителем по договору о выполнении работы (оказании услуги), от исполнения которого потребитель отказался, превышает фактически понесенные исполнителем расходы на исполнение такого договора, исполнитель обязан вернуть потребителю уплаченную им по договору о выполнении работы (оказании услуги) денежную сумму за вычетом фактически понесенных исполнителем расходов в течение четырнадцати дней со дня предъявления соответствующего требования, если меньший срок не предусмотрен таким договором."
    ),
    createParagraph(
      "За нарушение срока, предусмотренного пунктом 2 настоящей статьи, исполнитель уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены выполнения работы (оказания услуги), а если цена выполнения работы (оказания услуги) договором о выполнении работы (оказании услуги) не определена, - в размере одного процента общей цены заказа. Договором о выполнении работы (оказании услуги) между потребителем и исполнителем может быть установлен более высокий размер неустойки."
    ),
    createParagraph(
      "В случае, если какие-либо расходы были понесены, прошу предоставить мне подтверждающие это обстоятельство документы."
    ),
    createParagraph("На основании изложенного, а также ст. 38-1 Закона,"),
    createParagraph("ПРОШУ:")
  );

  return paragraphs;
}

function getRequirementsForOtkaz(formData) {
  const paragraphs = [];

  paragraphs.push(
    createParagraph(
      `1. Расторгнуть договор об оказании услуг (выполнении работ) и возвратить мне уплаченные денежные средства в размере ${formData.cost} белорусских рублей;`
    ),
    createParagraph(
      `2. Предоставить документы подтверждающие фактически понесенные расходы по состоянию на дату составления претензии по договору об оказании услуг (выполнении работ).`,
      {},
      300
    )
  );

  return paragraphs;
}

function getLegalBasisForKachTov() {
  const paragraphs = [];

  paragraphs.push(
    createParagraph(
      `Обращаю Ваше внимание, что согласно статье 28 Закона «О защите прав потребителей» от 9 января 2002 г. № 90-З (далее – Закон), потребитель вправе в течение четырнадцати дней с момента передачи ему непродовольственного товара, если более длительный срок не объявлен продавцом, в месте приобретения или иных местах, объявленных продавцом, возвратить товар надлежащего качества или обменять его на аналогичный товар других размера, формы, габарита, фасона, расцветки или комплектации, произведя в случае разницы в цене необходимый перерасчет с продавцом.`
    ),
    createParagraph(
      `Требование потребителя об обмене либо возврате товара подлежит удовлетворению, если товар не был в употреблении, сохранены его потребительские свойства и имеются доказательства приобретения его у данного продавца. В случае обмена либо возврата товара потребитель обязан возвратить товар в потребительской упаковке, если товар был продан в такой упаковке.`
    ),
    createParagraph(
      `Перечень непродовольственных товаров надлежащего качества, не подлежащих обмену и возврату, утверждается Правительством Республики Беларусь.`
    ),
    createParagraph(
      `При возврате потребителем товара надлежащего качества его требование о возврате уплаченной за товар денежной суммы подлежит удовлетворению продавцом незамедлительно. В случае, если удовлетворить требование потребителя незамедлительно не представляется возможным, максимальный срок для удовлетворения требования не может превышать семи дней. За нарушение указанных сроков продавец уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены товара на день его реализации потребителю.`
    ),
    createParagraph(
      `Расчеты с потребителем при возврате уплаченной за товар денежной суммы осуществляются в той же форме, в которой производилась оплата товара, если иное не предусмотрено соглашением сторон.`
    ),
    createParagraph(
      `При возврате потребителю уплаченной за товар денежной суммы продавец не вправе требовать от потребителя предъявления документа, удостоверяющего личность, за исключением случая, если при заключении договора использовались данные документа, удостоверяющего личность потребителя.`
    ),
    createParagraph(
      `Пищевые продукты надлежащего качества обмену и возврату не подлежат.`
    ),
    createParagraph(
      `Требования настоящей статьи не распространяются на случаи, когда продавцом является физическое лицо, осуществляющее реализацию товаров в рамках ремесленной или самостоятельной профессиональной деятельности.`
    ),
    createParagraph(
      `На основании изложенного и руководствуясь пунктом 3 статьи 467 ГК, 28 Закона,`
    ),
    createParagraph(`ПРОШУ:`)
  );

  return paragraphs;
}

function getRequirementsForKachTov(formData) {
  const paragraphs = [];

  paragraphs.push(
    createParagraph(`1. Расторгнуть заключенный, между нами, договор;`),
    createParagraph(
      `2. Вернуть уплаченные мной денежные средства по договору в размере ${formData.cost} белорусских рублей.`,
      {},
      300
    )
  );

  return paragraphs;
}

function calculatePenalty(
  todaysDateStr,
  penaltyDateStr,
  formData,
  refinancingRate,
  daysInCurrentYear
) {
  let innerPrice = formData.cost;
  // Convert date strings to Date objects
  let todaysDate = new Date(todaysDateStr.split(".").reverse().join("-"));
  let penaltyDate = new Date(penaltyDateStr.split(".").reverse().join("-"));

  // Calculate the difference in time (in milliseconds)
  let timeDifference = todaysDate - penaltyDate;

  // Convert time difference from milliseconds to days
  let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  let resultPenalty = 0;

  // Calculate the penalty

  if (formData.claimType === "srokiUsl") {
    resultPenalty = daysDifference * 0.01 * parseFloat(innerPrice);
  } else if (formData.claimType === "srokiTov") {
    resultPenalty =
      ((parseFloat(innerPrice) * refinancingRate) / daysInCurrentYear) *
      daysDifference;
  }

  let roundedNumber = resultPenalty.toFixed(2);

  let formattedNumber = roundedNumber.replace(".", ",");

  return [daysDifference, formattedNumber];
}

function getCurrentDate() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function getDaysInCurrentYear() {
  const currentYear = new Date().getFullYear();

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  return isLeapYear(currentYear) ? 366 : 365;
}

function addOneDay(dateStr) {
  // Convert the date string to a Date object
  let dateParts = dateStr.split(".");
  let date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

  // Add one day
  date.setDate(date.getDate() + 1);

  // Format the new date back to "dd.mm.yyyy"
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let yyyy = date.getFullYear();

  return `${dd}.${mm}.${yyyy}`;
}

function formatRate(rate) {
  return `${(rate * 100).toFixed(2)} %`;
}

/**
 * Создает стандартный параграф с выравниванием и отступом
 */
function createParagraph(text, options = {}, spacing) {
  console.log(spacing);

  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: INDENT2,
    children: [
      new TextRun({
        text,
        font: DEFAULT_FONT,
        size: FONT_SIZE,
        ...options,
      }),
    ],
    spacing: spacing && { after: spacing },
  });
}

function getSecondRequest(formData) {
  let request = ``;

  switch (formData?.secondRequest) {
    case "Возврат денежных средств":
      request = `, а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ: расторгнуть заключенный между нами договор и вернуть уплаченные мной денежные средства в размере ${
        formData.cost
      } белорусских рублей${formData.moral || formData.penalty ? ";" : "."}`;
      break;
    case "Замена товара":
      request = `, а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ: осуществить замену приобретенного мной товара на товар надлежащего качества${
        formData.moral || formData.penalty ? ";" : "."
      }`;
      break;
    case "Соразмерное уменьшение стоимости":
      request = `, а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ: соразмерно уменьшить стоимость ${
        formData.claimType === "nekachTov" ? "товара" : "услуги (работы)"
      } по договору на ${formData.sorazm} белорусских рублей${
        formData.moral || formData.penalty ? ";" : "."
      }`;
      break;
    case "Возмещение расходов по устранению недостатков":
      request = `, а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ: соразмерно уменьшить стоимость ${
        formData.claimType === "nekachTov" ? "товара" : "услуги (работы)"
      } по договору на ${formData.vozmAmount} белорусских рублей${
        formData.moral || formData.penalty ? ";" : "."
      }`;
      break;
    case "Безвозмездное устранение недостатков":
      request = `, а в случае невозможности удовлетворить вышеизложенное требование в установленный законодательством срок, ПРОШУ: безвозмездно устранить обнаруженный(-ые) мной недостаток(-ки) в течение 14 дней с момента получения настоящей претензии${
        formData.moral || formData.penalty ? ";" : "."
      }`;
      break;
    default:
      break;
  }

  console.log(request);

  return request;
}

// Экспорт основной функции
export { generateClaimDocument };
