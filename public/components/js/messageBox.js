export function getMessageBox(selector = 'message-box-component') {
  return document.querySelector(selector);
}

export function showMessage(message, type = 'danger', selector = 'message-box-component') {
  const messageBox = getMessageBox(selector);
  if (!messageBox?.show) return;
  messageBox.show(message, type);
}

export function clearMessage(selector = 'message-box-component') {
  const messageBox = getMessageBox(selector);
  if (!messageBox?.clear) return;
  messageBox.clear();
}
