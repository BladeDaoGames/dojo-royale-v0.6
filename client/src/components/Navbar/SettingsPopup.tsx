interface SettingsPopup {
  onClose: () => void;
}

const SettingsPopup = ({ onClose }: SettingsPopup) => {
  const settingsModalContainerImageUrl =
    "/images/settings/settings_modal_container.png";
  const settingsWalletImageUrl = "/images/settings/settings_wallet.png";
  const settingsProfileImageUrl = "/images/settings/settings_profile.png";
  const settingsSoundImageUrl = "/images/settings/settings_sound.png";
  const settingsLogoutImageUrl = "/images/settings/settings_logout.png";
  const settingsButtonContainerImageUrl =
    "/images/settings/settings_button_container.png";

  // Function to stop event propagation
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="absolute top-8 right-0 p-4 rounded-lg w-[820px] h-[820px] bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${settingsModalContainerImageUrl})`,
        }}
        onClick={stopPropagation}
      >
        {/* Settings Title */}

        <h1 className="absolute top-36 left-72 text-7xl text-white">
          Settings
        </h1>
        {/* Accoutn button block block */}
        <div
          className="bg-no-repeat bg-contain w-[570px] h-[160px] absolute top-[220px] left-32"
          style={{
            backgroundImage: `url(${settingsButtonContainerImageUrl})`,
          }}
        >
          <div
            className="absolute bg-no-repeat bg-contain top-12 left-16 w-[60px] h-[60px]"
            style={{
              backgroundImage: `url(${settingsProfileImageUrl})`,
            }}
          ></div>
          <h1 className="absolute top-12 left-40 text-5xl text-white">
            Account
          </h1>
        </div>
        {/* Mute button block */}
        <div
          className="bg-no-repeat bg-contain w-[570px] h-[160px] absolute top-[310px] left-32 mt-6"
          style={{
            backgroundImage: `url(${settingsButtonContainerImageUrl})`,
          }}
        >
          <div
            className="absolute bg-no-repeat bg-contain top-12 left-16 w-[60px] h-[60px]"
            style={{
              backgroundImage: `url(${settingsSoundImageUrl})`,
            }}
          ></div>
          <h1 className="absolute top-12 left-40 text-5xl text-white">Mute</h1>
        </div>
        {/* Address button block */}
        <div
          className="bg-no-repeat bg-contain w-[570px] h-[160px] absolute top-[450px] left-32"
          style={{
            backgroundImage: `url(${settingsButtonContainerImageUrl})`,
          }}
        >
          <div
            className="absolute bg-no-repeat bg-contain top-12 left-16 w-[60px] h-[60px]"
            style={{
              backgroundImage: `url(${settingsWalletImageUrl})`,
            }}
          ></div>
          <h1 className="absolute top-12 left-40 text-5xl text-white">
            Address
          </h1>
        </div>
        {/* Logout button block */}
        <div
          className="bg-no-repeat bg-contain w-[570px] h-[160px] absolute top-[570px]  left-32"
          style={{
            backgroundImage: `url(${settingsButtonContainerImageUrl})`,
          }}
        >
          <div
            className="absolute bg-no-repeat bg-contain top-12 left-16 w-[60px] h-[60px]"
            style={{
              backgroundImage: `url(${settingsLogoutImageUrl})`,
            }}
          ></div>
          <h1 className="absolute top-12 left-40 text-5xl text-white">
            Logout
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
