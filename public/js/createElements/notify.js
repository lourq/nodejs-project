export const createNotify = (message) => {
  const notify = document.createElement("div");

  notify.id = "notify";
  notify.textContent = message;

  document.body.appendChild(notify)
  setTimeout(() => {
    const element = document.getElementById("notify");
    if (element) element.remove()
  }, 2000);
};
