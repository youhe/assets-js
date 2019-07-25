/*********************************
  要素（elm）を引数で渡すと以下を返す
  top, right, bottom, left, width, height
  fixTop -> top 絶対値
  fixLeft -> left 絶対値
*********************************/

export default function(elm) {
  const rect = elm.getBoundingClientRect();
  rect.fixTop = rect.top + window.pageYOffset;
  rect.fixLeft = rect.left + window.pageXOffset;
  return rect;
}
