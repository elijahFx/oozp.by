export function dateHandler(e) {
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

export function phoneHandler(e) {
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
}

export function focusPhoneHandler(e) {
  let input = e.target;
  if (input.value === "") {
    input.value = "+";
  }
}

export function blurPhoneHanlder(e) {
  let input = e.target;
  if (input.value === "+") {
    input.value = "";
  }
}

export function unpHandler(e) {
  let value = e.target.value;

  // Remove any non-numeric characters
  value = value.replace(/\D/g, "   ");

  // Limit the length to not exceed 9 digits
  if (value.length > 9) {
    value = value.slice(0, 9);
  }

  // Update the input field's value
  e.target.value = value;
}

export function keypressUnpHandler(e) {
  // Allow only numeric digits
  if (e.key < "0" || e.key > "9") {
    e.preventDefault();
  }
}

export function formatNumberInput(event) {
  const input = event.target;
  let value = input.value.trim();

  // Удаляем все символы, кроме цифр, точек и запятых
  value = value.replace(/[^\d.,]/g, "");

  // Если значение пустое, выходим
  if (!value) return;

  // Заменяем все точки на запятые
  value = value.replace(/\./g, ",");

  // Если запятых несколько, оставляем только первую
  const commaIndex = value.indexOf(",");
  if (commaIndex !== -1) {
    value =
      value.substring(0, commaIndex + 1) +
      value.substring(commaIndex + 1).replace(/,/g, "");
  }

  // Разделяем на целую и дробную части
  const parts = value.split(",");
  let integerPart = parts[0].replace(/\D/g, "") || "0";
  let decimalPart = parts[1] || "";

  // Ограничиваем дробную часть 2 знаками
  decimalPart = decimalPart.substring(0, 2).padEnd(2, "0");

  // Собираем отформатированное число
  const formattedValue = integerPart + "," + decimalPart;

  // Устанавливаем отформатированное значение обратно в поле
  input.value = formattedValue;
}
