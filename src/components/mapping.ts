interface INodeAttrInfo {
  rus_name: string;
}

interface INodeAttrMapping {
  [index: string]: INodeAttrInfo;
}

export const NodeAttrMapping: INodeAttrMapping = {
  cn: { rus_name: "Имя" },
  description: { rus_name: "Описание" },
  prsJsonConfigString: { rus_name: "Конфигурация" },
  prsActive: { rus_name: "Активность" },
  prsDefault: { rus_name: "По умолчанию" },
  prsEntityTypeCode: { rus_name: "Тип" },
  prsIndex: { rus_name: "Индекс" },
  prsArchive: { rus_name: "Архивировать значения" },
  prsCompress: { rus_name: "Сжимать значения" },
  prsMaxLineDev: { rus_name: "Параметр сжатия" },
  prsStep: { rus_name: '"Ступенчатый"' },
  prsUpdate: { rus_name: "Обновлять значения" },
  prsValueTypeCode: { rus_name: "Тип значений" },
  prsDefaultValue: { rus_name: "Значение по умолчанию" },
  prsMeasureUnits: { rus_name: "Единицы измерения" },
};
