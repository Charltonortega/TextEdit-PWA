// Get a reference to the button with the ID "buttonInstall"
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the Progressive Web App (PWA)

// Event listener for the "beforeinstallprompt" event
window.addEventListener("beforeinstallprompt", (event) => {
  // Store the beforeinstallprompt event in the deferredPrompt property of the window object
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden", false);
});

// Event listener for a click on the install button
butInstall.addEventListener("click", async () => {
  // Get the stored beforeinstallprompt event
  const promptEvent = window.deferredPrompt;

  // Check if the promptEvent is available
  if (!promptEvent) {
    return;
  }

  // Trigger the installation prompt
  promptEvent.prompt();

  // Reset the deferredPrompt property to null after prompting
  window.deferredPrompt = null;

  // Hide the install button by adding the "hidden" class
  butInstall.classList.toggle("hidden", true);
});

// Event listener for the "appinstalled" event
window.addEventListener("appinstalled", (event) => {
  // When the app is successfully installed, clear the deferredPrompt property
  window.deferredPrompt = null;
});
