import { INode, objectClass } from "../components/interfaces";
import { getNode, getServiceEndpoint, getLinkedNode } from "./base";
import { objectRootNode,
  tagRootNode,
  dataStorageRootNode,
  connectorRootNode } from "../models/rootNodes"

class PeresvetGetError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/*
export async function getRootObjects(peresvetUrl: string) {
  try {
    const objects = await getNode(peresvetUrl, "prsObject");
    const rootObjects = objects;
    return rootObjects;
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}

export async function getRootTags(peresvetUrl: string) {
  try {
    const tags = await getNode(peresvetUrl, "prsTag");
    const rootTags = tags;
    return rootTags;
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}
*/

/*
export async function getChildren(
  peresvetUrl: string,
  objClass: objectClass,
  id: string
): Promise<INode[]> {
  try {
    if (objClass === "prsObject" && id) {
      const objectChildren = await getNode(peresvetUrl!, objClass, 1, id);
      const tagChildren = await getNode(peresvetUrl!, "prsTag", 1, id);
      return objectChildren.concat(tagChildren);
    } else if (objClass === "prsTag" && id) {
      const alertChildren = await getNode(peresvetUrl!, "prsAlert", 1, id);
      return alertChildren;
    } else {
      const children = await getNode(peresvetUrl!, objClass, 1, id);
      return children;
    }
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}
*/

export async function getChildren(
  peresvetUrl: string,
  objClass: objectClass,
  id: string
): Promise<INode[]> {
  try {
    let children: INode[] = [];

    if ((objClass === "") && (id === "")) {
      // особый случай. узел - корневой
      children.push(objectRootNode);
      children.push(tagRootNode);
      children.push(dataStorageRootNode);
      children.push(connectorRootNode);

      return children;
    }

    let request = "";
    if (id === "") {
      // особый случай - кликаем на групповой узел для сущности
      let svcEndpoint = getServiceEndpoint(objClass);
      request = `http://${peresvetUrl}${svcEndpoint}/?q={}`;
      children = children.concat(await getNode(request));
      return children;
    }

    // здесь блок, где id уже гарантированно имеет какое-то значение
    if (objClass === "prsObject") {
      // для объекта: получим список дочерних объектов, потом - список тегов
      request = `http://${peresvetUrl}${getServiceEndpoint("prsObject")}?q={"base":"${id}"}`;
      children = children.concat(await getNode(request));
      request = `http://${peresvetUrl}${getServiceEndpoint("prsTag")}?q={"base":"${id}"}`;
      children = children.concat(await getNode(request));
      return children;
    }

    if (objClass === "prsTag") {
      request = `http://${peresvetUrl}${getServiceEndpoint("prsAlert")}/?q={"base":"${id}"}`;
      children = children.concat(await getNode(request));
      request = `http://${peresvetUrl}${getServiceEndpoint("prsMethod")}/?q={"base":"${id}"}`;
      children = children.concat(await getNode(request));
      return children;
    }

    if (objClass === "prsDataStorage") {
      request = `http://${peresvetUrl}${getServiceEndpoint(objClass)}/?q={"id":"${id}","getLinkedTags":true}`;
      children = children.concat(await getLinkedNode(request, "linkedTags"));
      request = `http://${peresvetUrl}${getServiceEndpoint(objClass)}/?q={"id":"${id}","getLinkedAlerts":true}`;
      children = children.concat(await getLinkedNode(request, "linkedAlerts"));
      return children;
    }

    if (objClass === "prsConnector") {
      request = `http://${peresvetUrl}${getServiceEndpoint(objClass)}/?q={"id":"${id}","getLinkedTags":true}`;
      children = children.concat(await getLinkedNode(request, "linkedTags"));
      return children;
    }

    /*
    // обработаем случаи, когда создаются вспомогательные узлы
    if (id !== "") {
      if (objClass === "prsObject") {
        // кликаем на объект
        children.push({
          id: "",
          getChildrenRequest: `/v1/objects/?q={"base":"${id}"}`,
          attributes: { ...defaultAttributes,
            cn: "Объекты",
            objectClass: "prsObject"
          },
          children: [],
          isOpen: false,
          _static: true
        } as INode );

        children.push({
          id: "",
          getChildrenRequest: `/v1/tags/?q={"base":"${id}"}`,
          attributes: { ...defaultAttributes,
            cn: "Теги",
            objectClass: "prsTag"
          },
          children: [],
          isOpen: false,
          _static: true
        } as INode );
      }
    } else { // то есть id = "", то есть это - вспомогательный узел
      children = children.concat(await getNode(peresvetUrl!, childrenRequest!));

    }
    */

    return children;

    /*
    if (objClass === "prsObject" && id) {
      const objectChildren = await getNode(peresvetUrl!, objClass, 1, id);
      const tagChildren = await getNode(peresvetUrl!, "prsTag", 1, id);
      return objectChildren.concat(tagChildren);
    } else if (objClass === "prsTag" && id) {
      const alertChildren = await getNode(peresvetUrl!, "prsAlert", 1, id);
      return alertChildren;
    } else {
      const children = await getNode(peresvetUrl!, objClass, 1, id);
      return children;
    }
    */
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}
