import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
  }, []);

  const handleInstallClick = () => {
    if (isInstalled) {
      toast.info("App is already installed");
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstalled(true);
          toast.success("App installed successfully!");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {!isInstalled && (
        <button
          onClick={handleInstallClick}
          className="text-yellow-100 sm:text-lg text-sm font-normal border border-yellow-100 px-4 py-2 hover:bg-zinc-800 rounded-full transition duration-300 ease-in-out"
        >
          Install App
        </button>
      )} 
    </>
  );
};

export default InstallButton;
