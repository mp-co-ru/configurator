import { _updateNode } from "../api/base";
import { INode, objectClass } from "../components/interfaces";

class PeresvetUpdateError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function updateNode(
  peresvetUrl: string,
  objClass: objectClass,
  node: INode
) {
  try {
    await _updateNode(peresvetUrl, objClass, node);
    return true;
  } catch (e: any) {
    throw new PeresvetUpdateError(e.message);
  }
}
