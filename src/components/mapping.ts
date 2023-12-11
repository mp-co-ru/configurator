interface INodeAttrInfo {
  rus_name: string;
}

interface INodeAttrMapping {
  [index: string]: INodeAttrInfo;
}

export const NodeAttrMapping: INodeAttrMapping = {
  cn: { rus_name: "Имя узла" },
  description: { rus_name: "Описание" },
  prsJsonConfigString: { rus_name: "Конфигурация экземпляра" },
  prsActive: { rus_name: "Флаг активности" },
  prsDefault: { rus_name: "Сущность по умолчанию" },
  prsEntityTypeCode: { rus_name: "Тип узла" },
  prsIndex: { rus_name: "Индекс узла" },
  prsArchive: { rus_name: "Флаг архивирования начений тега" },
  prsCompress: { rus_name: "Флаг сжатия значений тега" },
  prsMaxLineDev: { rus_name: "Параметр сжатия значений тега" },
  prsStep: { rus_name: 'Флаг "ступенчатого тега"' },
  prsUpdate: { rus_name: "Флаг обновления значений тега" },
  prsValueTypeCode: { rus_name: "Тип значений тега" },
  prsDefaultValue: { rus_name: "Значение тега по умолчанию" },
  prsMeasureUnits: { rus_name: "Единицы измерения тега" },
};
