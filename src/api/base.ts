import {
  INode,
  defaultAttributes,
  IAttributes,
  objectClass,
} from "../components/interfaces";

interface PeresvetReadResponse {
  data: INode[];
}

interface PeresvetCreateResponse {
  id: String;
}

export class PeresvetConnectionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function getServiceEndpoint(objClass: objectClass) {
  let serviceEndpoint: string | null = null;

  switch (objClass) {
    case "prsObject":
      serviceEndpoint = "/v1/objects";
      break;
    case "prsTag":
      serviceEndpoint = "/v1/tags";
      break;
    case "prsDataStorage":
      serviceEndpoint = "/v1/dataStorages";
      break;
    case "prsAlert":
      serviceEndpoint = "/v1/alerts";
      break;
    case "prsMethod":
      serviceEndpoint = "/v1/methods";
      break;
    case "prsConnector":
      serviceEndpoint = "/v1/connectors"
      break;
    default:
      break;
  }
  return serviceEndpoint;
}

/*
export async function getNode(
  peresvetUrl: String,
  objClass: objectClass,
  scope: number | null = 1,
  base: String | null = null,
  id: String | null = null
): Promise<INode[]> {
  // Construct a query with optional parent id and id of node to search
  const q = {
    scope: scope,
    ...(id === null || id === "" ? {} : { id: id }),
    ...(base === null || base === "" ? {} : { base: base }),
  };

  // Convert Object to json
  // const jsonQuery = JSON.stringify(q).replace(/"/g, '\\"');
  const jsonQuery = JSON.stringify(q);

  const serviceEndpoint = getServiceEndpoint(objClass);

  if (!serviceEndpoint) {
    return [];
  }

  // http://localhost/v1/tags?q="{}"
  // Construct URL with parameters and query
  const url = `http://${peresvetUrl}${serviceEndpoint}?q=${
    Object.keys(q).length === 0 ? "{}" : jsonQuery
  }`;
  // Get response from Peresvet platform
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status === 404) {
      throw new PeresvetConnectionError(
        "Не получается соединиться с платформой"
      );
    }
    const jsonResponse = await response.json();
    return processResponse(jsonResponse as PeresvetReadResponse);
  } catch (e) {
    throw new PeresvetConnectionError("Не получается соединиться с платформой");
  }
}
*/
export async function getNode(
  request: string
): Promise<INode[]> {

  try {
    const response = await fetch(request, {
      method: "GET",
    });
    if (response.status === 404) {
      throw new PeresvetConnectionError(
        "Нет соединения с платформой"
      );
    }
    const jsonResponse = await response.json();

    return processResponse(jsonResponse as PeresvetReadResponse);
  } catch (e) {
    throw new PeresvetConnectionError(`Ошибка получения дочерних узлов: ${e}`);
  }
}

export async function getLinkedNode(
  request: string,
  key: string
): Promise<INode[]> {

  try {
    const response = await fetch(request, {
      method: "GET",
    });
    if (response.status === 404) {
      throw new PeresvetConnectionError(
        "Нет соединения с платформой"
      );
    }
    let jsonResponse = await response.json();

    jsonResponse = {
      "data": jsonResponse["data"][0][key]
    };
    if (jsonResponse["data"] === null) {
      return [];
    }

    return processResponse(jsonResponse as PeresvetReadResponse);
  } catch (e) {
    throw new PeresvetConnectionError(`Ошибка получения дочерних узлов: ${e}`);
  }
}

export async function sendNode(
  peresvetUrl: String,
  objClass: objectClass,
  attributes: IAttributes,
  parentId: string | null = null
) {
  const serviceEndpoint = getServiceEndpoint(objClass);

  if (!serviceEndpoint) {
    return null;
  }
  Object.entries(attributes).map((val) => {
    if (val[1] === "") {
      delete attributes[val[0]];
    }
  });
  const body = {
    attributes: { ...attributes },
    ...(parentId === null ? {} : { parentId: parentId }),
  };
  const url = `http://${peresvetUrl}${serviceEndpoint}/`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    return jsonResponse as PeresvetCreateResponse;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function _linkTags(
  peresvetUrl: String,
  dataStorageId: String,
  tags: INode[]
) {
  const serviceEndpoint = getServiceEndpoint("prsDataStorage");
  const body = {
    id: dataStorageId,
    linkTags: tags.map((tag) => tag.id),
  };
  const url = `http://${peresvetUrl}${serviceEndpoint}/`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();
  } catch (e) {
    throw new PeresvetConnectionError(
      `Произошла ошибка при привязке тегов ${tags.map((tag) => {
        tag.id;
      })}`
    );
  }
  return null;
}

export async function _updateNode(
  peresvetUrl: String,
  objClass: objectClass,
  node: INode
) {
  const serviceEndpoint = getServiceEndpoint(objClass);

  if (!serviceEndpoint) {
    return [];
  }
  Object.entries(node.attributes).map((val) => {
    if (val[1] === "") {
      delete node.attributes[val[0]];
    }
  });
  const body = {
    id: node.id,
    attributes: { ...node.attributes },
  };
  console.log(body);
  const url = `http://${peresvetUrl}${serviceEndpoint}/`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();
  } catch (e) {
    throw new PeresvetConnectionError(
      `Произошла ошибка при удалении узла ${node.id}`
    );
  }
  return null;
}

export async function _deleteNode(
  peresvetUrl: string,
  objClass: objectClass,
  id: string
) {
  const serviceEndpoint = getServiceEndpoint(objClass);
  if (!serviceEndpoint) {
    return null;
  }
  try {
    const response = await fetch(`http://${peresvetUrl}${serviceEndpoint}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    console.log(response);
    return true;
  } catch (e) {
    console.log(e);
  }
  return null;
}

function processResponse(resp: PeresvetReadResponse): INode[] {
  let nodes = resp.data;
  nodes.forEach((node) => {
    Object.entries(node.attributes).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        switch (val[0]) {
          case "TRUE":
            node.attributes[key] = true;
            break;
          case "FALSE":
            node.attributes[key] = false;
            break;
          default:
            node.attributes[key] = val[0];
        }
      }
    });
    node.children = [];
    node.isOpen = false;
    node.attributes = { ...defaultAttributes, ...node.attributes };
    if ((node.attributes.objectClass === "prsTag") && (node.id !== "")) {
      node.valAndTimestamp = "Получить значение"
    }

  });

  return nodes as INode[];
}

export async function linkTagToObject(
  peresvetUrl: String,
  obj_id: String,
  tag_id: String
) {
  const serviceEndpoint = getServiceEndpoint("prsTag");

  if (!serviceEndpoint) {
    return [];
  }
  const body = {
    id: tag_id,
    parentId: obj_id
  };
  const url = `http://${peresvetUrl}${serviceEndpoint}/`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();
  } catch (e) {
    throw new PeresvetConnectionError(
      `Произошла ошибка при привязке тега ${tag_id} к объекту ${obj_id}.`
    );
  }
  return null;
}

export async function linkTagToDataStorage(
  peresvetUrl: String,
  ds_id: String,
  tag_id: String
) {
  const serviceEndpoint = getServiceEndpoint("prsDataStorage");

  if (!serviceEndpoint) {
    return [];
  }
  const body = {
    id: ds_id,
    linkTags: [{"tagId": tag_id}]
  };
  const url = `http://${peresvetUrl}${serviceEndpoint}/`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();
  } catch (e) {
    throw new PeresvetConnectionError(
      `Произошла ошибка при привязке тега ${tag_id} к хранилищу ${ds_id}.`
    );
  }
  return null;
}

export async function linkTagToConnector(
  peresvetUrl: String,
  conn_id: String,
  tag_id: String
) {
  const serviceEndpoint = getServiceEndpoint("prsConnector");

  if (!serviceEndpoint) {
    return [];
  }
  const body = {
    id: conn_id,
    linkTags: [{
      "tagId": tag_id,
      "attributes": {
        "prsJsonConfigString": {}
      }
    }]
  };
  const url = `http://${peresvetUrl}${serviceEndpoint}/`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    await response.json();
  } catch (e) {
    throw new PeresvetConnectionError(
      `Произошла ошибка при привязке тега ${tag_id} к хранилищу ${conn_id}.`
    );
  }
  return null;
}
