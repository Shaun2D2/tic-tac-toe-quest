export const composeElement = ({
  tag, attributes, content = '',
}) => `<${tag} ${Object.entries(attributes).map(
  ([key, value]) => `${key}=${value} `,
)}>${content}</${tag}>`;

export const fetchElement = (element) => (typeof element === 'object' ? element : document.querySelector(element));

export const fetchAllElements = (selector) => document.querySelectorAll(selector);

export const createElement = ({ target, ...rest }) => {
  const { content } = rest;
  const el = fetchElement(target);

  if (!el) throw new Error('target element does not exist in the DOM');

  if (content) {
    let domContent = content;

    if (Array.isArray(content)) { domContent = content.reduce((acc, val) => (acc += val)); }

    el.innerHTML = domContent;

    return;
  }

  el.innerHTML += composeElement(rest);
};

export const injectHtmlContent = (el, html) => {
  el.innerHTML += html;
};

export const findHtmlElement = (name) => document.querySelector(name);

export const updateElement = ({ target, content, attributes = {} }) => {
  const el = fetchElement(target);

  if (content) {
    el.innerHTML = content;
  }

  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
};

export const updateElements = (configArray = []) => {
  configArray.forEach((config) => updateElement(config));
};

export const addListener = (config) => {
  const el = fetchElement(config.target);

  el.addEventListener(config.type, config.handler);
};

export const addOnClick = (config) => addListener({ type: 'click', ...config });
