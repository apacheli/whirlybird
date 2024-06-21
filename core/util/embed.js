// deno-fmt-ignore
export const
  author = (name, icon_url, url, proxy_icon_url) => ({ name, icon_url, url, proxy_icon_url }),
  field = (name, value, inline) => ({ name, value, inline }),
  footer = (text, icon_url, proxy_icon_url) => ({ text, icon_url, proxy_icon_url }),
  image = (url, height, width, proxy_url) => ({ url, height, width, proxy_url });
