interface ServerEndpointSetting {
  url: string;
  token: string;
}

export const getServerEndpointSetting = () => {
  const defaultSetting = {
    url: '',
    token: '',
  };
  try {
    const setting = window.localStorage.getItem('Polyfuze:ServerEndpointSetting');
    if (!setting) {
      return defaultSetting;
    }
    return JSON.parse(setting) as ServerEndpointSetting;
  } catch {
    return defaultSetting;
  }
};

export const setServerEndpointSetting = (setting: ServerEndpointSetting) => {
  const clientProtocol = window.location.protocol;
  if (!setting.url.startsWith(clientProtocol)) {
    setting.url = clientProtocol + '//' + setting.url;
  }
  const payload = JSON.stringify(setting);
  window.localStorage.setItem('Polyfuze:ServerEndpointSetting', payload);
};

export const initEndpointSetting = () => {
  const { url } = getServerEndpointSetting();
  if (!url) {
    setServerEndpointSetting({
      url: window.location.origin,
      token: '',
    });
  }
};
