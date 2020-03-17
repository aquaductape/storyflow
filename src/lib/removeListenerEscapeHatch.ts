export default function removeListenersEscapeHatch(callback: Function) {
  const removeOnClick = () => {
    callback();
    window.removeEventListener("click", removeOnClick);
    window.removeEventListener("keydown", removeOnEscapeKey);
  };
  const removeOnEscapeKey = (e: KeyboardEvent) => {
    if (!e.key.match(/escape/i)) return null;
    callback();
    window.removeEventListener("click", removeOnClick);
    window.removeEventListener("keydown", removeOnEscapeKey);
  };
  window.addEventListener("click", removeOnClick);
  window.addEventListener("keydown", removeOnEscapeKey);
}
