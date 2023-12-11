import { objectClass } from "../components/interfaces";
import { _deleteNode } from "./main";

export async function deleteNode(
  peresvetUrl: string,
  objClass: objectClass,
  id: string
) {
  console.log(peresvetUrl, objClass, id);
  const res = await _deleteNode(peresvetUrl, objClass, id);
  return res;
}
