import { AddColorMatrix } from "./AddColorMatrix";
import { BindColorMatrix } from "./BindColorMatrix";
import { CompareColorMatrix } from "../../../components/color/CompareColorMatrix";
import { CurrentColorMatrix } from "./CurrentColorMatrix";
export function SetColorMatrix(color) {
  const current = CurrentColorMatrix();
  const entry = AddColorMatrix(color.colorMatrix, color.colorOffset);
  if (!CompareColorMatrix(entry.colorMatrix, entry.colorOffset, current.colorMatrix, current.colorOffset)) {
    BindColorMatrix(entry);
  }
}
