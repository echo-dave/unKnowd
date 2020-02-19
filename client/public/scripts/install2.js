let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
   // Update UI notify the user they can add to home screen
   btnAdd.setAttribute("style","z-index:35; display:block; position:absolute; margin-top:4rem;width:100%");

    // InstallPrompt()

});


btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    document.querySelector("#btnAdd").remove();
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });

  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
  });
