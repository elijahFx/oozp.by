const nbrbApi = `https://www.nbrb.by/api/refinancingrate`;

let selectedOption = "Возврат денежных средств";
let selectedOptionType = "Некачественный товар";
const {
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
} = docx;
const INDENT = 4952;
let refinancingRate = 100;
let daysInCurrentYear = getDaysInCurrentYear();
let tovarNek = true;
let uslugaNek = false;
let srokiTov = false;
let srokiUslug = false;
let otkaz = false;
let kachTov = false;

document.addEventListener("DOMContentLoaded", function () {
  let vozvr = true;
  let zamena = false;
  let sorazm = false;
  let vozmesh = false;
  let ustranen = false;
  let daysForOtvet = 7;

  let penaltyUslugiSize = 0;
  let penaltyTovarSize = 0;

  let isSecond = false;
  let secondRequirementSelectedOptionString = `Возврат денежных средств`;
  let secondOptionText = `, а в случае невозможности удовлетворить данное требование в течение установленного законодательством срока, ПРОШУ: расторгнуть договор и вернуть уплаченные мною денежные средства`;

  const sorazmAmountDiv = document.querySelector("#sorazmDiv");
  const vozmAmountDiv = document.querySelector("#vozmeshDiv");
  const options = document.getElementById("options");
  const checkmark = document.querySelector("#checkmark");
  const penaltyCheckmark = document.querySelector("#penaltyCheckmark");
  const mainTitleH1 = document.querySelector("#mainTitle");
  const selectedTypeOptionInput = document.querySelector("#type");
  const goodLabel = document.querySelector("#goodLabel");
  const priceLabel = document.querySelector("#priceLabel");
  const dateLabel = document.querySelector("#dateLabel");
  const complaintLabel = document.querySelector("#complaintLabel");
  let goodDiv = document.querySelector("#good");
  let complaintDiv = document.querySelector("#complaint");
  const optionsLabel = document.querySelector("#optionsLabel");
  const penaltyContainer = document.querySelector(".penaltyContainer");
  const secondRequirement = document.querySelector("#addSecondRequirement");
  const secondRequirementContainer = document.querySelector(
    "#secondRequirementContainer"
  );
  const secondRequirementSelectedOption =
    document.querySelector("#secondOptions");



  document.querySelector("#date").addEventListener("input", function (e) {
    let value = e.target.value;

    // Remove any characters that are not digits
    value = value.replace(/\D/g, "");

    // Insert dots at the appropriate positions
    if (value.length > 2) {
      value = value.substring(0, 2) + "." + value.substring(2);
    }
    if (value.length > 5) {
      value = value.substring(0, 5) + "." + value.substring(5);
    }
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    // Update the input field's value
    e.target.value = value;
  });

  document.getElementById("phone").addEventListener("focus", function (e) {
    let input = e.target;
    if (input.value === "") {
      input.value = "+";
    }
  });

  document.getElementById("phone").addEventListener("input", function (e) {
    let input = e.target;
    let value = input.value;

    // Remove any non-numeric characters except the leading '+'
    value = value.replace(/[^\d+]/g, "");

    // Ensure the value starts with '+'
    if (!value.startsWith("+")) {
      value = "+" + value.replace(/\D/g, "");
    } else {
      value = "+" + value.slice(1).replace(/\D/g, "");
    }

    // Limit the length to not exceed '+375293918416'
    if (value.length > "+375293918416".length) {
      value = value.slice(0, "+375293918416".length);
    }

    // Update the input field's value
    input.value = value;
  });

  document.getElementById("phone").addEventListener("blur", function (e) {
    let input = e.target;
    if (input.value === "+") {
      input.value = "";
    }
  });

  document.getElementById("unp").addEventListener("input", function (e) {
    let value = e.target.value;

    // Remove any non-numeric characters
    value = value.replace(/\D/g, "   ");

    // Limit the length to not exceed 9 digits
    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    // Update the input field's value
    input.value = value;
  });

  document.getElementById("unp").addEventListener("keypress", function (e) {
    // Allow only numeric digits
    if (e.key < "0" || e.key > "9") {
      e.preventDefault();
    }
  });

  function handleInput(e) {
    let value = e.target.value;

    value = value.replace(/[^0-9,.]/g, "");

    const commaCount = (value.match(/,/g) || []).length;
    const periodCount = (value.match(/\./g) || []).length;

    if (commaCount < 1 && periodCount < 1) {
      value += ",00";
    } else {
      if (commaCount > 1 || periodCount > 1) {
        value = value.replace(/[,.](?=.*[,.])/g, "");
      }

      if (commaCount > 1 || periodCount > 1) {
        value = value.replace(/[,.](?=.*[,.])/g, "");
      }

      if (value.includes(",") || value.includes(".")) {
        let separator = value.includes(",") ? "," : ".";
        let [integerPart, decimalPart] = value.split(separator);

        if (!decimalPart) {
          decimalPart = "00";
        
        } else if (decimalPart.length === 1) {
        
          decimalPart += "0";
        } else if (decimalPart.length > 2) {
        
          decimalPart = decimalPart.slice(0, 2);
        }
      

        value = integerPart + separator + decimalPart;
      }
    }

    e.target.value = value;
  }

  const elements = ["#vosmesh", "#sorazm", "#moralAmount", "#price"];
  elements.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener("blur", handleInput);
    }
  });

  document.getElementById("complaint").addEventListener("input", function (e) {
    if (document.getElementById("complaint").placeholder === "22.01.2023") {
      let value = e.target.value;

      // Remove any characters that are not digits
      value = value.replace(/\D/g, "");

      // Insert dots at the appropriate positions
      if (value.length > 2) {
        value = value.substring(0, 2) + "." + value.substring(2);
      }
      if (value.length > 5) {
        value = value.substring(0, 5) + "." + value.substring(5);
      }
      if (value.length > 10) {
        value = value.substring(0, 10);
      }

      // Update the input field's value
      e.target.value = value;
    }
  });

  secondRequirement.addEventListener("click", () => {
    if (isSecond) {
      secondRequirement.style.backgroundColor = `#218838`;
      secondRequirement.innerText = `Заявить второе (последующее требование)`;
      secondRequirementContainer.style.display = `none`;
      isSecond = false;
    } else {
      isSecond = true;
      secondRequirement.style.backgroundColor = `#721c24`;
      secondRequirement.innerText = `Убрать последующее требование`;
      secondRequirementContainer.style.display = `block`;
    }
  });

  secondRequirementSelectedOption.addEventListener("change", () => {

    secondRequirementSelectedOptionString =
      secondRequirementSelectedOption.options[
        secondRequirementSelectedOption.selectedIndex
      ].text;

   

    if (secondRequirementSelectedOptionString === `Возврат денежных средств`) {
      secondOptionText = `, а в случае невозможности удовлетворить данное требование в течение установленного законодательством срока, ПРОШУ: расторгнуть договор и вернуть уплаченные мною денежные средства`;
    } else if (secondRequirementSelectedOptionString === `Замена товара`) {
      secondOptionText = `, а в случае невозможности удовлетворить данное требование в течение установленного законодательством срока, ПРОШУ: заменить реализованный мне товар на аналогичный товар надлежащего качества`;
    }
  });

  const moralDiv = document.querySelector(".moralDiv");
  const penaltyDiv = document.querySelector(".penaltyDiv");

  selectedTypeOptionInput.addEventListener("change", async function () {
    selectedOptionType = this.options[this.selectedIndex].text;
    mainTitleH1.innerHTML = `${selectedOptionType}`;

    switch (selectedOptionType) {
      case "Некачественная услуга":
        removeOptionByValue(secondRequirementSelectedOption, "2");
        secondRequirement.style.display = `block`;
        penaltyContainer.style.display = `none`;
        options.style.display = `block`;
        optionsLabel.style.display = `block`;
        goodLabel.innerHTML = `Какие работы (услуги) обязался реализовать Вам исполнитель:`;
        goodDiv.placeholder = `Осуществить работы по ремонту телефона, оказать медицинские услуги...`;
        priceLabel.innerHTML = `Стоимость работ (услуг):`;
        dateLabel.innerHTML = `Дата заключения договора выполнения работ (оказания услуг):`;
        complaintLabel.innerHTML = `Недостатки выполненной работы (оказанной услуги):`;
        complaintDiv.placeholder = `Телефон после ремонта не включается, зубы после лечения очень сильно болят`;
        uslugaNek = true;
        tovarNek = false;
        srokiTov = false;
        srokiUslug = false;
        otkaz = false;
        kachTov = false;
        removeOptionByValue(options, "5");
        removeOptionByValue(options, "4");
        removeOptionByValue(options, "3");
        removeOptionByValue(options, "2");
        removeOptionByValue(options, "1");
        let newOption8 = document.createElement("option");
        newOption8.value = "1";
        newOption8.text = "Возврат денежных средств";
        options.add(newOption8);
        let newOption7 = document.createElement("option");
        newOption7.value = "2";
        newOption7.text = "Соразмерное уменьшение стоимости";
        options.add(newOption7);
        let newOption6 = document.createElement("option");
        newOption6.value = "3";
        newOption6.text =
          "Возмещение расходов на устранение недостатков третьими лицами";
        options.add(newOption6);
        let newOption5 = document.createElement("option");
        newOption5.value = "4";
        newOption5.text = "Безвозмездное устранение недостатков";
        options.add(newOption5);
        break;
      case "Некачественный товар":
        removeOptionByValue(secondRequirementSelectedOption, "2");
        let newSecondOption = document.createElement("option");
        newSecondOption.value = "2";
        newSecondOption.text = "Замена товара";
        secondRequirementSelectedOption.add(newSecondOption);
        secondRequirement.style.display = `block`;
        penaltyContainer.style.display = `none`;
        options.style.display = `block`;
        optionsLabel.style.display = `block`;
        removeOptionByValue(options, "5");
        removeOptionByValue(options, "4");
        removeOptionByValue(options, "3");
        removeOptionByValue(options, "2");
        removeOptionByValue(options, "1");
        goodLabel.innerHTML = `Наименование товара:`;
        goodDiv.placeholder = `Телефон iPhone 11 (2021 г.)`;
        priceLabel.innerHTML = `Цена товара:`;
        dateLabel.innerHTML = `Дата покупки товара:`;
        complaintLabel.innerHTML = `Недостатки товара:`;
        complaintDiv.placeholder = `Не работает интернет, камера не работает`;
        uslugaNek = false;
        tovarNek = true;
        srokiTov = false;
        srokiUslug = false;
        otkaz = false;
        kachTov = false;
        let newOption9 = document.createElement("option");
        newOption9.value = "1";
        newOption9.text = "Возврат денежных средств";
        options.add(newOption9);
        let newOption4 = document.createElement("option");
        newOption4.value = "2";
        newOption4.text = "Соразмерное уменьшение стоимости";
        options.add(newOption4);
        let newOption3 = document.createElement("option");
        newOption3.value = "3";
        newOption3.text =
          "Возмещение расходов на устранение недостатков третьими лицами";
        options.add(newOption3);
        let newOption2 = document.createElement("option");
        newOption2.value = "4";
        newOption2.text = "Безвозмездное устранение недостатков";
        options.add(newOption2);
        let newOption = document.createElement("option");
        newOption.value = "5";
        newOption.text = "Замена товара";
        options.add(newOption);
        complaintLabel.style.display = `block`;
        complaintDiv.style.display = `block`;
        break;
      case "Нарушение сроков передачи оплаченного товара":
        secondRequirement.style.display = `none`;
        secondRequirementContainer.style.display = `none`;
        isSecond = false;
        penaltyContainer.style.display = `block`;
        options.style.display = `block`;
        optionsLabel.style.display = `block`;
        goodLabel.innerHTML = `Наименование товара:`;
        goodDiv.placeholder = `Пылесос Bosch X01-02`;
        priceLabel.innerHTML = `Цена товара:`;
        dateLabel.innerHTML = `Дата покупки товара:`;
        complaintLabel.innerHTML = `Дата согласованной доставки товара:`;
        complaintDiv.placeholder = `22.01.2023`;
        uslugaNek = false;
        tovarNek = false;
        srokiTov = true;
        srokiUslug = false;
        otkaz = false;
        kachTov = false;
        removeOptionByValue(options, "5");
        removeOptionByValue(options, "4");
        removeOptionByValue(options, "3");
        removeOptionByValue(options, "2");
        removeOptionByValue(options, "1");
        let newOption10 = document.createElement("option");
        newOption10.value = "1";
        newOption10.text = "Возврат денежных средств";
        options.add(newOption10);
        refinancingRate = await getRefinancingRate();
        break;
      case "Нарушение сроков оказания услуг (выполнения работ)":
        secondRequirement.style.display = `none`;
        secondRequirementContainer.style.display = `none`;
        isSecond = false;
        penaltyContainer.style.display = `block`;
        options.style.display = `block`;
        optionsLabel.style.display = `block`;
        goodLabel.innerHTML = `Какие работы (услуги) обязался реализовать Вам исполнитель:`;
        goodDiv.placeholder = `Осуществить работы по ремонту телефона, оказать медицинские услуги...`;
        priceLabel.innerHTML = `Стоимость работ (услуг):`;
        dateLabel.innerHTML = `Дата заключения договора выполнения работ (оказания услуг):`;
        complaintLabel.innerHTML = `Оговоренный срок оказания услуг (выполнения работ):`;
        complaintDiv.placeholder = `22.01.2023`;
        uslugaNek = false;
        tovarNek = false;
        srokiTov = false;
        srokiUslug = true;
        otkaz = false;
        kachTov = false;
        removeOptionByValue(options, "5");
        removeOptionByValue(options, "4");
        removeOptionByValue(options, "3");
        removeOptionByValue(options, "2");

        break;
      case "Односторонний отказ от договора оказания услуг (выполнения работ)":
        secondRequirement.style.display = `none`;
        secondRequirementContainer.style.display = `none`;
        isSecond = false;
        penaltyContainer.style.display = `none`;
        goodLabel.innerHTML = `Какие работы (услуги) обязался реализовать Вам исполнитель:`;
        goodDiv.placeholder = `Осуществить работы по ремонту телефона, оказать медицинские услуги...`;
        priceLabel.innerHTML = `Стоимость работ (услуг):`;
        dateLabel.innerHTML = `Дата заключения договора выполнения работ (оказания услуг):`;
        complaintLabel.remove();
        complaintDiv.remove();
        options.style.display = `none`;
        optionsLabel.style.display = `none`;
        uslugaNek = false;
        tovarNek = false;
        srokiTov = false;
        srokiUslug = false;
        otkaz = true;
        kachTov = false;
        removeOptionByValue(options, "5");
        removeOptionByValue(options, "4");
        removeOptionByValue(options, "3");
        removeOptionByValue(options, "2");
        removeOptionByValue(options, "1");
        break;
      case "Возврат качественного товара (в течение 14 календарных дней)":
        secondRequirement.style.display = `none`;
        secondRequirementContainer.style.display = `none`;
        isSecond = false;
        penaltyContainer.style.display = `none`;
        options.style.display = `block`;
        optionsLabel.style.display = `block`;
        goodLabel.innerHTML = `Наименование товара:`;
        goodDiv.placeholder = `Телефон iPhone 11 (2021 г.)`;
        priceLabel.innerHTML = `Цена товара:`;
        dateLabel.innerHTML = `Дата покупки товара:`;
        complaintLabel.style.display = `none`;
        complaintDiv.style.display = `none`;
        options.style.display = `none`;
        optionsLabel.style.display = `none`;
        uslugaNek = false;
        tovarNek = false;
        srokiTov = false;
        srokiUslug = false;
        otkaz = false;
        kachTov = true;
        break;
      default:
        break;
    }
  });

  checkmark.addEventListener("change", () => {
    const isCheckmark = document.querySelector("#checkmark").checked;

    if (isCheckmark) {
      moralDiv.style.display = `block`;
    
    } else {
      moralDiv.style.display = `none`;
    }
  });

  options.addEventListener("change", function () {
   
    selectedOption = this.options[this.selectedIndex].text;

    switch (selectedOption) {
      case "Возврат денежных средств":
        vozvr = true;
        zamena = false;
        sorazm = false;
        vozmesh = false;
        ustranen = false;
        vozmAmountDiv.style.display = `none`;
        sorazmAmountDiv.style.display = `none`;
        break;
      case "Замена товара":
        vozvr = false;
        zamena = true;
        sorazm = false;
        vozmesh = false;
        ustranen = false;
        vozmAmountDiv.style.display = `none`;
        sorazmAmountDiv.style.display = `none`;
        break;
      case "Безвозмездное устранение недостатков":
        vozvr = false;
        zamena = false;
        sorazm = false;
        vozmesh = false;
        ustranen = true;
        vozmAmountDiv.style.display = `none`;
        sorazmAmountDiv.style.display = `none`;
        break;
      case "Соразмерное уменьшение стоимости":
        vozvr = false;
        zamena = false;
        sorazm = true;
        vozmesh = false;
        ustranen = false;
        vozmAmountDiv.style.display = `none`;
        sorazmAmountDiv.style.display = `block`;
        break;
      case "Возмещение расходов на устранение недостатков третьими лицами":
        vozvr = false;
        zamena = false;
        sorazm = false;
        vozmesh = true;
        ustranen = false;
        sorazmAmountDiv.style.display = `none`;
        vozmAmountDiv.style.display = `block`;
        break;
      default:
        break;
    }

    if (vozvr || sorazm || vozmesh) {
      daysForOtvet = 7;
    
    } else if (ustranen || zamena) {
      daysForOtvet = 14;
    }
  });

  document
    .querySelector("button#finalBtn")
    .addEventListener("click", function () {
      const name = document.querySelector("#name").value.trim();
      const address = document.querySelector("#address").value;
      const phone = document.querySelector("#phone").value;
      const liabelee = document.querySelector("#liabelee").value;
      const liabeleeAddress = document.querySelector("#liabeleeAddress").value;
      const complaint =
        document.querySelector("#complaint")?.value.trim().toLowerCase() || "";
      const unp = document.querySelector("#unp").value;
      const price = document.querySelector("#price").value;
      const good = document.querySelector("#good").value.trim().toLowerCase();
      const firstDate = document.querySelector("#date").value;
      const optionsLabel = document.querySelector("#optionsLabel").innerText;
      const sorazmAmount = document.querySelector("#sorazm").value;
      const vozmAmount = document.querySelector("#vozmesh").value;
      const moralAmount = document.querySelector("#moralAmount").value;
      const penaltyDate = document.querySelector("#complaint")?.value || "";

      const abr = abbreviateName(name);
      const date = getCurrentDate();

      let paragraphs = [];
      let paragraphs0 = [];
      let firstParagraphs = [];
      let moralParagraph = [];
      let pravoParagraphs = [];
      let count = 1;

      //НЕКАЧЕСТВЕННЫЙ ТОВАР!!!!!!!
      if (tovarNek) {
        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Я, ${name}, ${firstDate} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В процессе эксплуатации товара в соответствии с его назначением и правилами пользования, мною был(-и) обнаружен(-ы) следующий(-ие) недостатки товара: ${complaint}.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Обращаю Ваше внимание, что согласно пункту 2, 4, 5 статьи 11 Закона «О защите прав потребителей» от 9 января 2002 г. № 90-З (далее – Закон), продавец (исполнитель) обязан продемонстрировать работоспособность товара (результата работы) и передать потребителю товар (выполнить работу, оказать услугу), качество которого соответствует предоставленной информации о товаре (работе, услуге), требованиям законодательства, технических регламентов Таможенного союза, технических регламентов Евразийского экономического союза и условиям договора, а также по требованию потребителя предоставить ему необходимые средства измерений, прошедшие метрологический контроль в соответствии с законодательством об обеспечении единства измерений, документы, подтверждающие качество товара (результата работы, услуги), его комплектность, количество.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Если продавец (исполнитель) при заключении договора был поставлен потребителем в известность о конкретных целях приобретения товара (выполнения работы, оказания услуги), продавец (исполнитель) обязан передать потребителю товар (выполнить работу, оказать услугу) надлежащего качества, пригодный для использования в соответствии с этими целями.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `При реализации потребителю товаров (выполнении работ, оказании услуг) по образцам, описаниям товаров (работ, услуг), содержащимся в каталогах, проспектах, рекламе, буклетах или представленным в фотографиях или иных информационных источниках, в том числе в глобальной компьютерной сети Интернет, продавец (исполнитель) обязан передать потребителю товар (выполнить работу, оказать услугу), качество которого соответствует таким образцам, описаниям, а также требованиям законодательства, технических регламентов Таможенного союза, технических регламентов Евразийского экономического союза.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Также согласно пункту 1 статьи 20 Закона, в случае реализации товара ненадлежащего качества, если его недостатки не были оговорены продавцом, потребитель вправе по своему выбору потребовать:`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.1. замены недоброкачественного товара товаром надлежащего качества;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.2. соразмерного уменьшения покупной цены товара;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.3. незамедлительного безвозмездного устранения недостатков товара;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.4. возмещения расходов по устранению недостатков товара.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 3 статьи 20 Закона, потребитель вправе расторгнуть договор розничной купли-продажи и потребовать возврата уплаченной за товар денежной суммы в соответствии с пунктом 4 статьи 27 настоящего Закона.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В соответствии с пунктом 11 статьи 20 Закона, продавец (изготовитель, поставщик, представитель) обязан принять товар ненадлежащего качества у потребителя, а в случае необходимости - провести проверку качества товара, в том числе с привлечением ремонтной организации. Продавец (изготовитель, поставщик, представитель) обязан проинформировать потребителя о его праве на участие в проведении проверки качества товара, а если такая проверка не может быть проведена незамедлительно, - также о месте и времени проведения проверки качества товара. Ремонтная организация при получении товара от продавца (изготовителя, поставщика, представителя) для проведения проверки качества товара обязана провести такую проверку в течение трех дней со дня получения товара.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `При возникновении между потребителем и продавцом (изготовителем, поставщиком, представителем) спора о наличии недостатков товара и причинах их возникновения продавец (изготовитель, поставщик, представитель) обязан провести экспертизу товара за свой счет в порядке, установленном Правительством Республики Беларусь. О месте и времени проведения экспертизы потребитель должен быть извещен в письменной форме.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Стоимость экспертизы оплачивается продавцом (изготовителем, поставщиком, представителем). Если в результате проведенной экспертизы товара установлено, что недостатки товара отсутствуют или возникли после передачи товара потребителю вследствие нарушения им установленных правил использования, хранения, транспортировки товара или действий третьих лиц либо непреодолимой силы, потребитель обязан возместить продавцу (изготовителю, поставщику, представителю) расходы на проведение экспертизы, а также связанные с ее проведением расходы на транспортировку товара.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Потребитель вправе принять участие в проведении проверки качества и экспертизы товара лично или через своего представителя, оспорить заключение экспертизы товара в судебном порядке, а также при возникновении между потребителем и продавцом (изготовителем, поставщиком, представителем) спора о наличии недостатков товара и причинах их возникновения провести экспертизу товара за свой счет. Если в результате экспертизы товара, проведенной за счет потребителя, установлено, что недостатки возникли до передачи товара потребителю или по причинам, возникшим до момента его передачи, продавец (изготовитель, поставщик, представитель) обязан возместить потребителю расходы на проведение экспертизы, а также связанные с ее проведением расходы на транспортировку товара.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно статье 21 Закона, потребитель вправе предъявить предусмотренные статьей 20 Закона требования продавцу (изготовителю, поставщику, представителю) в отношении недостатков товара в течение гарантийного срока или срока годности товара.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 2 статьи 15 Закона, убытки, причиненные потребителю, подлежат возмещению в полном объеме сверх неустойки, установленной законодательством или договором.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На основании изложенного и руководствуясь статьями 290-291 ГК, 2, 18, 20, 21 Закона,`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs0.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Таким образом, полагаю, что Вашей организацией было нарушено мое право, как потребителя, на товар надлежащего качества.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        if (
          selectedOption === "Возврат денежных средств" ||
          selectedOption === ""
        ) {
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Расторгнуть заключенный, между нами, договор;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${(count =
                    count +
                    1)}. Вернуть уплаченные мной денежные средства по договору в размере ${price} белорусских рублей`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
                new TextRun({
                  text: isSecond ? secondOptionText : "",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                  bold: true, // Делаем текст жирным
                }),
                new TextRun({
                  text: moralAmount ? ";" : ".",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
        } else if (selectedOption === "Замена товара") {
          paragraphs.push(
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
                  text: isSecond ? secondOptionText : "",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                  bold: true, // Делаем текст жирным
                }),
                new TextRun({
                  text: moralAmount ? ";" : ".",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
        } else if (selectedOption === "Безвозмездное устранение недостатков") {
          paragraphs.push(
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
                  text: isSecond ? secondOptionText : "",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                  bold: true, // Делаем текст жирным
                }),
                new TextRun({
                  text: moralAmount ? ";" : ".",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
        } else if (selectedOption === "Соразмерное уменьшение стоимости") {
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Соразмерно уменьшить стоимость товара на ${sorazmAmount} белорусских рублей`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
                new TextRun({
                  text: isSecond ? secondOptionText : "",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                  bold: true, // Делаем текст жирным
                }),
                new TextRun({
                  text: moralAmount ? ";" : ".",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );

          paragraphs0.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `Поскольку мне был реализован некачественный товар, полагаю правомерным и необходимым соразмерно уменьшить его стоимость на ${sorazmAmount} белорусских рублей.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
        } else if (
          selectedOption ===
          "Возмещение расходов на устранение недостатков третьими лицами"
        ) {
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Возместить расходы на устранение недостатка(-ов) товара общей стоимостью в ${vozmAmount} белорусских рублей`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
                new TextRun({
                  text: isSecond ? secondOptionText : "",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                  bold: true, // Делаем текст жирным
                }),
                new TextRun({
                  text: moralAmount ? ";" : ".",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
          paragraphs0.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `В связи с наличием в товаре производственного(-ых) недостатка(-ов), мною были затрачены денежные средства в размере ${vozmAmount} белорусских рублей.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
        }

        // НЕКАЧЕСТВЕННАЯ УСЛУГА!!!!!!
      } else if (uslugaNek) {
        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Я, ${name}, ${firstDate} заключил(-а) с Вашей организацией договор оказания услуг (выполнения работ), согласно которому Ваша организация обязалась оказать (выполнить) следующие услуги (работы): ${good} (далее – услуги).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В процессе оказания услуг (выполнения работ), мною был(-и) обнаружен(-ы) следующий(-ие) недостатки услуг (работ): ${complaint}.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs0.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Таким образом, полагаю, что Вашей организацией было нарушено мое право, как потребителя, на услугу (работу) надлежащего качества.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно статье 290 Гражданского кодекса Республики Беларусь от 07.12.1998 № 218-З (далее - ГК), обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями законодательства, а при отсутствии таких условий и требований – в соответствии с обычно предъявляемыми требованиями.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 1 статьи 2 Закона Республики Беларусь от 09.01.2002 № 90-З «О защите прав потребителей» (далее – Закон), действие настоящего Закона распространяется на отношения между потребителями и изготовителями, продавцами, поставщиками, представителями, исполнителями, ремонтными организациями, возникающие из договоров розничной купли-продажи, подряда, аренды, страхования, хранения, энергоснабжения, комиссии, перевозки пассажира, перевозки груза, возмездного оказания услуг и иных подобных договоров.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 1 статьи 31 Закона, при обнаружении отступлений от условий договора, ухудшивших результат работы (услугу), или иных недостатков выполненной работы (оказанной услуги) потребитель вправе по своему выбору потребовать:`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );
        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.1. безвозмездного устранения недостатков выполненной работы (оказанной услуги);`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );
        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.2. соразмерного уменьшения установленной цены выполненной работы (оказанной услуги);`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.3. безвозмездного изготовления другой вещи из однородного материала такого же качества или повторного выполнения работы (оказания услуги), если это возможно. При этом потребитель обязан возвратить ранее переданную ему исполнителем вещь;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.4. возмещения понесенных им расходов по устранению недостатков выполненной работы (оказанной услуги) своими силами или третьими лицами.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 3 статьи 31 Закона, потребитель вправе расторгнуть договор о выполнении работы (оказании услуги) и потребовать возврата уплаченной за выполненную работу (оказанную услугу) денежной суммы, если в установленные пунктом 1 статьи 32 Закона или договором сроки недостатки выполненной работы (оказанной услуги) не устранены исполнителем. Потребитель также вправе расторгнуть договор о выполнении работы (оказании услуги) и потребовать возврата уплаченной за выполненную работу (оказанную услугу) денежной суммы, если им обнаружены существенные недостатки выполненной работы (оказанной услуги) или отступления от условий договора, ухудшившие результат работы (услугу).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На основании изложенного и руководствуясь статьями 290-291 ГК, 2, 18, 31 Закона,`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );
        if (selectedOption === "Возврат денежных средств") {
          daysForOtvet = 7;
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Расторгнуть заключенный, между нами, договор;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${(count =
                    count +
                    1)}. Вернуть уплаченные мной денежные средства по договору в размере ${price} белорусских рублей${
                    moralAmount ? ";" : "."
                  }`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
        } else if (
          selectedOption === "Безвозмездное устранение недостатков" ||
          selectedOption === ""
        ) {
          daysForOtvet = 14;
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Безвозмездно устранить вышеизложенные недостатки услуги (работы) не позднее 14 дней с момента получения настоящей претензии${
                    moralAmount ? ";" : "."
                  }`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
        } else if (selectedOption === "Соразмерное уменьшение стоимости") {
          daysForOtvet = 7;
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Соразмерно уменьшить стоимость услуги (работы) на ${sorazmAmount} белорусских рублей${
                    moralAmount ? ";" : "."
                  }`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
          paragraphs0.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `Поскольку мне была реализована некачественная услуга (работа), полагаю правомерным и необходимым соразмерно уменьшить её стоимость на ${sorazmAmount} белорусских рублей.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
        } else if (
          selectedOption ===
          "Возмещение расходов на устранение недостатков третьими лицами"
        ) {
          daysForOtvet = 7;
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${count}. Возместить расходы на устранение недостатка(-ов) услуги (работы) общей стоимостью в ${vozmAmount} белорусских рублей`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
                new TextRun({
                  text: isSecond ? secondOptionText : "",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                  bold: true, // Делаем текст жирным
                }),
                new TextRun({
                  text: moralAmount ? ";" : ".",
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
          paragraphs0.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `В связи с наличием в реализованной мне услуге (работе) недостатка(-ов), мною были затрачены денежные средства в размере ${vozmAmount} белорусских рублей.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
        }

        /// НАРУШЕНИЕ СРОКОВ ПЕРЕДАЧИ ТОВАРА
      } else if (srokiTov) {
        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Я, ${name}, ${firstDate} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В соответствии с условиями договора, Ваша организация обязалась осуществить доставку товара в срок до ${complaint}. Вместе с тем, на момент составления настоящей претензии Ваша организация не исполнила обязательства по договору ни в каком объеме.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В соответствии со статьей 290 Гражданского кодекса Республики Беларусь от 07.12.1998 № 218-З (далее - ГК), обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями законодательства.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Обращаю Ваше внимание, что согласно пункту 2 статьи 24 Закона «О защите прав потребителей» от 09.01.2002 г. № 90-З (далее – Закон), в случае если продавец, получивший сумму предварительной оплаты, не исполняет обязанности по передаче товара потребителю в установленный договором срок, потребитель по своему выбору вправе потребовать:`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `2.1. передачи оплаченного товара в установленный им новый срок;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `2.2. возврата суммы предварительной оплаты за товар, не переданный продавцом.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 4 статьи 24 Закона, в случае нарушения установленного договором срока передачи предварительно оплаченного товара продавец обязан выплатить потребителю проценты на сумму предварительной оплаты в размере ставки рефинансирования Национального банка Республики Беларусь, установленной на день выплаты процентов.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 5 статьи 24 Закона, требования потребителя о возврате суммы предварительной оплаты подлежит удовлетворению продавцом незамедлительно. В случае, если удовлетворить требования потребителя незамедлительно не представляется возможным, максимальный срок для удовлетворения требований потребителя не может превышать семи дней со дня предъявления соответствующего требования.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно статье 26 Закона, за нарушение сроков, предусмотренных частью первой пункта 5 статьи 24, продавец допустивший такое нарушение, уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены товара.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        if (penaltyCheckmark.checked) {
          const [days, penalty] = calculatePenalty(
            getCurrentDate(),
            penaltyDate
          );
          penaltyTovarSize = penalty;
          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `Проценты выплачиваются со дня, когда по договору передача товара потребителю должна была быть осуществлена, до дня передачи товара потребителю или до дня возврата потребителю суммы предварительной оплаты, если договором для начисления процентов не установлен более короткий срок.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `Расчет суммы процентов:`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${price} × ${
                    refinancingRate * 100
                  } % / ${daysInCurrentYear} × ${days} = ${penalty} белорусских рублей, где:`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${price} – размер денежной суммы, предварительно мною внесенной по договору;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${
                    refinancingRate * 100
                  } % – ставка рефинансирования Национального Банка Республики Беларусь на день составления настоящей претензии;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${daysInCurrentYear} – количество дней в настоящем календарном году;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${days} – количество дней просрочки: с ${addOneDay(
                    penaltyDate
                  )} по ${getCurrentDate()}.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
        }

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Таким образом, вышеперечисленные обязательства Вами не выполнены.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На основании изложенного и руководствуясь статьями 290-291 ГК, 24, 26 Закона,`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${count}. Вернуть мне уплаченные по договору денежные средства в размере ${price} белорусских рублей`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
              new TextRun({
                text: isSecond ? secondOptionText : "",
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
                bold: true, // Делаем текст жирным
              }),
              new TextRun({
                text: moralAmount || penaltyCheckmark.checked ? ";" : ".",
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${(count =
                  count +
                  1)}. Выплатить мне проценты за несвоевременную доставку товара в размере ${penaltyTovarSize} белорусских рублей${
                  moralAmount ? ";" : "."
                }`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
            spacing: { after: moralAmount ? 0 : 300 },
          })
        );

        daysForOtvet = 7;
        ///НАРУШЕНИЕ СРОКОВ ОКАЗАНИЯ УСЛУГ (ВЫПОЛНЕНИЯ РАБОТ)
      } else if (srokiUslug) {
        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Я, ${name}, ${firstDate} заключил(-а) с Вашей организацией договор оказания услуг (выполнения работ), согласно которому Ваша организация обязалась оказать (выполнить) следующие услуги (работы): ${good} (далее – услуги).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В соответствии с условиями договора, Ваша организация обязалась оказать услуги (выполнить работы) в срок до ${complaint}. Вместе с тем, на момент составления настоящей претензии Ваша организация не исполнила обязательства по договору ни в каком объеме.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В соответствии со статьей 290 Гражданского кодекса Республики Беларусь от 07.12.1998 № 218-З (далее - ГК), обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями законодательства.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Обращаю Ваше внимание, что согласно пункту 1 статьи 30 Закона «О защите прав потребителей» от 09.01.2002 г. № 90-З (далее - Закон), если исполнитель нарушил сроки выполнения работы (оказания услуги), отдельных этапов выполнения работы (оказания услуги), а также иные сроки, предусмотренные договором, или во время выполнения работы (оказания услуги) стало очевидным, что она не будет выполнена в срок, потребитель вправе по своему выбору:`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.1. назначить исполнителю новый срок;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.2. поручить выполнение работы (оказание услуги) третьим лицам за разумную цену или выполнить ее своими силами и потребовать от исполнителя возмещения понесенных расходов;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.3. потребовать соразмерного уменьшения установленной цены за выполнение работы (оказание услуги);`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `1.4. расторгнуть договор о выполнении работы (оказании услуги).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 5 статьи 30 Закона, при расторжении договора о выполнении работы (оказании услуги) исполнитель не вправе потребовать возмещения своих затрат, произведенных в процессе выполнения работы (оказания услуги), а также платы за уже выполненную работу (оказанную услугу), за исключением случаев, когда потребитель принял выполненную работу (оказанную услугу).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 6 статьи 30 Закона, в случае нарушения установленных сроков выполнения работы (оказания услуги) или назначенных потребителем на основании пункта 1 настоящей статьи новых сроков исполнитель уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены выполнения работы (оказания услуги), а если цена выполнения работы (оказания услуги) договором о выполнении работ (оказании услуг) не определена, - в размере одного процента общей цены заказа.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        if (penaltyCheckmark.checked) {
          const [days, penalty] = calculatePenalty(
            getCurrentDate(),
            penaltyDate
          );
          penaltyUslugiSize = penalty;
          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `Таким образом, исходя из крайнего срока исполнения Вашей организацией обязательств по договору – ${penaltyDate}, на день заявления требований о расторжении договора просрочка составила ${days} календарных дней. `,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `Расчет неустойки за нарушение срока исполнения обязательств:`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${price} × 0,01 × ${days} = ${penalty} белорусских рублей, где:`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${price} – размер предоплаты по договору;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `0,01 – размер неустойки за каждый день просрочки исполнения обязательств;`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );

          pravoParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${days} – количество дней просрочки исполнения обязательств с ${addOneDay(
                    penaltyDate
                  )} по ${getCurrentDate()}.`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
            })
          );
        }

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Таким образом, вышеперечисленные обязательства Вами не выполнены.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На основании изложенного и руководствуясь статьями 290-291 ГК, 30 Закона,`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${count}. Расторгнуть заключенный между нами договор оказания услуг (выполнения работ) и вернуть мне уплаченные по договору денежные средства в размере ${price} белорусских рублей`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
              new TextRun({
                text: isSecond ? secondOptionText : "",
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
                bold: true, // Делаем текст жирным
              }),
              new TextRun({
                text: moralAmount || penaltyCheckmark.checked ? ";" : ".",
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        if (penaltyCheckmark.checked) {
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${(count =
                    count +
                    1)}. Выплатить мне неустойку за несвоевременное исполнение обязательств по договору в размере ${penaltyUslugiSize} белорусских рублей${
                    moralAmount ? ";" : "."
                  }`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
        }

        /// ОДНОСТОРОННИЙ ОТКАЗ!!!
      } else if (otkaz) {
        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Я, ${name}, ${firstDate} заключил(-а) с Вашей организацией договор оказания услуг (выполнения работ), согласно которому Ваша организация обязалась оказать (выполнить) следующие услуги (работы): ${good} (далее – услуги).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На сегодняшний день необходимость в оказании услуг Вашей организацией отпала. В связи с этим я в одностороннем порядке отказываюсь от исполнения договора с Вашей организацией.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно ст. 38-1 Закона от 09.01.2002 г. № 90-З «О защите прав потребителей» (далее - Закон), потребитель вправе в одностороннем порядке отказаться от исполнения договора о выполнении работы (оказании услуги) при условии оплаты исполнителю фактически понесенных им расходов, если иное не предусмотрено законодательством.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В случае, если денежная сумма, уплаченная потребителем по договору о выполнении работы (оказании услуги), от исполнения которого потребитель отказался, превышает фактически понесенные исполнителем расходы на исполнение такого договора, исполнитель обязан вернуть потребителю уплаченную им по договору о выполнении работы (оказании услуги) денежную сумму за вычетом фактически понесенных исполнителем расходов в течение четырнадцати дней со дня предъявления соответствующего требования, если меньший срок не предусмотрен таким договором.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `За нарушение срока, предусмотренного пунктом 2 настоящей статьи, исполнитель уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены выполнения работы (оказания услуги), а если цена выполнения работы (оказания услуги) договором о выполнении работы (оказании услуги) не определена, - в размере одного процента общей цены заказа. Договором о выполнении работы (оказании услуги) между потребителем и исполнителем может быть установлен более высокий размер неустойки.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В случае, если какие-либо расходы были понесены, прошу предоставить мне подтверждающие это обстоятельство документы.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На основании изложенного, а также ст. 38-1 Закона, `,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${count}. Расторгнуть договор об оказании услуг (выполнении работ) и возвратить мне уплаченные денежные средства в размере ${price} белорусских рублей;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${(count =
                  count +
                  1)} Предоставить документы подтверждающие фактически понесенные расходы по состоянию на дату составления претензии по договору об оказании услуг (выполнении работ)${
                  moralAmount ? ";" : "."
                }`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        daysForOtvet = 14;
      } else if (kachTov) {
        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Я, ${name}, ${firstDate} заключил(-а) с Вашей организацией договор купли-продажи: ${good} (далее – товар).`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        firstParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `В настоящий момент времени необходимость в приобретенном мною товаре отпала, в связи с чем заявляю свое требование о возврате уплаченных мною денежных средств за данный товар в полном объеме.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        pravoParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Обращаю Ваше внимание, что согласно статье 28 Закона «О защите прав потребителей» от 9 января 2002 г. № 90-З (далее – Закон), потребитель вправе в течение четырнадцати дней с момента передачи ему непродовольственного товара, если более длительный срок не объявлен продавцом, в месте приобретения или иных местах, объявленных продавцом, возвратить товар надлежащего качества или обменять его на аналогичный товар других размера, формы, габарита, фасона, расцветки или комплектации, произведя в случае разницы в цене необходимый перерасчет с продавцом.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Требование потребителя об обмене либо возврате товара подлежит удовлетворению, если товар не был в употреблении, сохранены его потребительские свойства и имеются доказательства приобретения его у данного продавца. В случае обмена либо возврата товара потребитель обязан возвратить товар в потребительской упаковке, если товар был продан в такой упаковке.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Перечень непродовольственных товаров надлежащего качества, не подлежащих обмену и возврату, утверждается Правительством Республики Беларусь.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `При возврате потребителем товара надлежащего качества его требование о возврате уплаченной за товар денежной суммы подлежит удовлетворению продавцом незамедлительно. В случае, если удовлетворить требование потребителя незамедлительно не представляется возможным, максимальный срок для удовлетворения требования не может превышать семи дней. За нарушение указанных сроков продавец уплачивает потребителю за каждый день просрочки неустойку в размере одного процента цены товара на день его реализации потребителю.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Расчеты с потребителем при возврате уплаченной за товар денежной суммы осуществляются в той же форме, в которой производилась оплата товара, если иное не предусмотрено соглашением сторон.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `При возврате потребителю уплаченной за товар денежной суммы продавец не вправе требовать от потребителя предъявления документа, удостоверяющего личность, за исключением случая, если при заключении договора использовались данные документа, удостоверяющего личность потребителя.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Пищевые продукты надлежащего качества обмену и возврату не подлежат.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Требования настоящей статьи не распространяются на случаи, когда продавцом является физическое лицо, осуществляющее реализацию товаров в рамках ремесленной или самостоятельной профессиональной деятельности.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `На основании изложенного и руководствуясь пунктом 3 статьи 467 ГК, 28 Закона,`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${count}. Расторгнуть заключенный, между нами, договор;`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        ),
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { firstLine: 708 },
              children: [
                new TextRun({
                  text: `${(count =
                    count +
                    1)}. Вернуть уплаченные мной денежные средства по договору в размере ${price} белорусских рублей${
                    moralAmount ? ";" : "."
                  }`,
                  font: "Times New Roman",
                  size: 28, // 14 pt = 28 half-points
                }),
              ],
              spacing: { after: moralAmount ? 0 : 300 },
            })
          );
      }

      let pravoParagraphsExceptLast = pravoParagraphs.slice(0, -1);
      let lastPravoParagraph = pravoParagraphs[pravoParagraphs.length - 1];

      if (moralAmount) {
        moralParagraph.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `${(count =
                  count +
                  1)}. Выплатить мне компенсацию понесенного морального вреда в размере ${moralAmount} белорусских рублей.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
            spacing: { after: 300 },
          })
        );
        moralParagraph.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 1 статьи 18 Закона, компенсация морального вреда, причиненного потребителю вследствие нарушения изготовителем (продавцом, поставщиком, представителем, исполнителем, ремонтной организацией) прав потребителя, предусмотренных законодательством, осуществляется причинителем вреда при наличии его вины, если иное не предусмотрено законодательными актами.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        moralParagraph.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 2 статьи 18 Закона, компенсация морального вреда осуществляется независимо от подлежащего возмещению имущественного вреда. Компенсация морального вреда осуществляется в денежной форме.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );

        moralParagraph.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { firstLine: 708 },
            children: [
              new TextRun({
                text: `Согласно пункту 3 статьи 18 Закона, размер компенсации морального вреда определяется судом в зависимости от характера причиненных потребителю физических и нравственных страданий, а также от степени вины причинителя вреда в случае, когда его вина является основанием для возмещения вреда. При определении размера компенсации морального вреда должны учитываться требования разумности и справедливости.`,
                font: "Times New Roman",
                size: 28, // 14 pt = 28 half-points
              }),
            ],
          })
        );
      }

      const consumer = {
        type: selectedOption,
        optionsLabel: selectedOptionType,
        name,
        address,
        phone,
        liabelee,
        liabeleeAddress,
        complaint,
        unp,
        price,
        good,
        sorazmAmount,
        vozmAmount,
        moralAmount,
        firstDate,
        daysForOtvet,
      };

      /*

НА БУДУЩЕЕ, ЕСЛИ ЕГР ВДРУГ ЗАХОЧЕТ РАБОТАТЬ

        if (unp) {
            fetch(`https://egr.gov.by/api/v2/egr/getBaseInfoByRegNum/${unp}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Ошибка получения данных:', error);
                });
        }
*/

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1417, // 2 cm converted to inches
                  right: 1063, // 1.5 cm converted to inches
                  bottom: 1417, // 2 cm converted to inches
                  left: 1575, // 3 cm converted to inches
                },
              },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${liabelee}`,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
                indent: { left: INDENT },
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `${liabeleeAddress}`,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
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
                    size: 28, // 14 pt = 28 half-points
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
                    size: 28, // 14 pt = 28 half-points
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
                    size: 28, // 14 pt = 28 half-points
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
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
                indent: { left: INDENT },
                spacing: { after: 300 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `ПРЕТЕНЗИЯ`,
                    bold: true,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
                spacing: { after: 300 },
              }),
              firstParagraphs[0],
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                indent: { firstLine: 708 },
                children: [
                  new TextRun({
                    text: `Я произвел(-а) оплату в сумме: ${price} белорусских рублей.`,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
              }),
              firstParagraphs[1],
              ...paragraphs0,
              ...pravoParagraphsExceptLast,

              moralParagraph[1],
              moralParagraph[2],
              moralParagraph[3],
              lastPravoParagraph,
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                indent: { firstLine: 708 },
                children: [
                  new TextRun({
                    text: `ПРОШУ:`,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
              }),
              ...paragraphs,
              moralParagraph[0],

              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                indent: { firstLine: 708 },
                children: [
                  new TextRun({
                    text: `Одновременно информирую, что в случае неисполнения Вами заявленных требований мною будет подготовлено исковое заявление в суд.\n
                                    
                                    `,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
                spacing: { after: 300 },
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                indent: { firstLine: 708 },
                children: [
                  new TextRun({
                    text: `Срок предоставления ответа на претензию составляет ${daysForOtvet} дней с момента ее получения. `,
                    font: "Times New Roman",
                    size: 28, // 14 pt = 28 half-points
                  }),
                ],
                spacing: { after: 500 },
              }),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE }, // Таблица на всю ширину страницы
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
                                size: 28, // 14 pt = 28 half-points
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                        margins: { top: 0, bottom: 0, left: 0, right: 0 },
                        verticalAlign: "top",
                        width: { size: 100 / 3, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: `РОЗПРОЗП`,
                                font: "Times New Roman",
                                size: 28,
                                color: "FFFFFF", // Белый цвет текста
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.SINGLE,
                            size: 1,
                            color: "000000",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                        margins: { top: 0, bottom: 0, left: 0, right: 0 },
                        verticalAlign: "top",
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
                                size: 28, // 14 pt = 28 half-points
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                        margins: { top: 0, bottom: 0, left: 0, right: 0 },
                        verticalAlign: "top",
                        width: { size: 100 / 3, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `(подпись)`,
                    font: "Times New Roman",
                    size: 20, // 14 pt = 28 half-points
                    italics: true,
                    bold: true,
                  }),
                ],
              }),
            ],
            page: {
              size: { width: 16838, height: 23811 }, // A4 size in twips (1 cm = 567 twips)
            },
          },
        ],
      });

      if (consumer) {
        fetch(`https://asy.rozp.by/index.php?route=module/claims_constructor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(consumer),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("");
          })
          .catch((error) => {
            console.error("Ошибка получения данных:", error);
          });
      }

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Претензия.docx");
      });

      allClear();
    });
});

function abbreviateName(fullName) {
  // Split the full name into parts
  const parts = fullName.split(" ");

  // Ensure there are exactly 3 parts (last name, first name, middle name)
  if (parts.length !== 3) {
    throw new Error(
      "Пожалуйста введите свои полные ФИО: фамилию, имя, отчество!"
    );
  }

  // Extract last name, first name, and middle name
  const lastName = parts[0];
  const firstNameInitial = parts[1].charAt(0);
  const middleNameInitial = parts[2].charAt(0);

  // Construct the abbreviated name
  const abbreviatedName = `${lastName} ${firstNameInitial}.${middleNameInitial}.`;

  return abbreviatedName;
}

function getCurrentDate() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function removeOptionByValue(selectElement, value) {
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value == value) {
      selectElement.remove(i);
      break;
    }
  }
}

function allClear() {
  document.querySelector("#name").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#liabelee").value = "";
  document.querySelector("#liabeleeAddress").value = "";
  document.querySelector("#complaint").value = "";
  document.querySelector("#unp").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#good").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#sorazm").value = "";
  document.querySelector("#vozmesh").value = "";
  document.querySelector("#moralAmount").value = "";
}

function calculatePenalty(todaysDateStr, penaltyDateStr) {
  const innerPrice = document.querySelector("#price").value;
  // Convert date strings to Date objects
  let todaysDate = new Date(todaysDateStr.split(".").reverse().join("-"));
  let penaltyDate = new Date(penaltyDateStr.split(".").reverse().join("-"));

  // Calculate the difference in time (in milliseconds)
  let timeDifference = todaysDate - penaltyDate;

  // Convert time difference from milliseconds to days
  let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  let penalty = 0;

  // Calculate the penalty

  if (srokiUslug) {
    penalty = daysDifference * 0.01 * parseFloat(innerPrice);
  } else if (srokiTov) {
    penalty =
      ((parseFloat(innerPrice) * refinancingRate) / daysInCurrentYear) *
      daysDifference;
  }

  let roundedNumber = penalty.toFixed(2);

  let formattedNumber = roundedNumber.replace(".", ",");

  return [daysDifference, formattedNumber];
}

function formatPrice(value) {
  // Remove all non-digit characters
  value = value.replace(/\D/g, "");

  // If there's any input, convert to number and back to string to strip leading zeros
  if (value) {
    value = parseInt(value).toString();
  }

  // Ensure the value ends with a comma and two decimal places
  if (value.length > 2) {
    value = value.slice(0, -2) + "," + value.slice(-2);
  } else if (value.length === 2) {
    value = value + ",00";
  } else if (value.length === 1) {
    value = value + ",00";
  } else {
    value = "0,00";
  }

  return value;
}

function calculatePenalty(todaysDateStr, penaltyDateStr) {
  const innerPrice = document.querySelector("#price").value;

  let todaysDate = new Date(todaysDateStr.split(".").reverse().join("-"));
  let penaltyDate = new Date(penaltyDateStr.split(".").reverse().join("-"));

  penaltyDate.setDate(penaltyDate.getDate() + 1);

  let timeDifference = todaysDate - penaltyDate;

  let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let penalty = 0;

  if (typeof srokiUslug !== "undefined" && srokiUslug) {
    penalty = daysDifference * 0.01 * parseFloat(innerPrice);
  } else if (typeof srokiTov !== "undefined" && srokiTov) {
    penalty =
      ((parseFloat(innerPrice) * refinancingRate) / daysInCurrentYear) *
      daysDifference;
  }

  let roundedNumber = penalty.toFixed(2);
  let formattedNumber = roundedNumber.replace(".", ",");

  return [daysDifference, formattedNumber];
}

function formatPrice(value) {
  // Remove all non-digit characters
  value = value.replace(/\D/g, "");

  // If there's any input, convert to number and back to string to strip leading zeros
  if (value) {
    value = parseInt(value).toString();
  }

  // Ensure the value ends with a comma and two decimal places
  if (value.length > 2) {
    value = value.slice(0, -2) + "," + value.slice(-2);
  } else if (value.length === 2) {
    value = value + ",00";
  } else if (value.length === 1) {
    value = value + ",00";
  } else {
    value = "0,00";
  }

  return value;
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

async function getRefinancingRate() {
  try {
    const response = await fetch(nbrbApi);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    const refRate = data[data.length - 1].Value;
    return refRate / 100;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

function getDaysInCurrentYear() {
  const currentYear = new Date().getFullYear();

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  return isLeapYear(currentYear) ? 366 : 365;
}
