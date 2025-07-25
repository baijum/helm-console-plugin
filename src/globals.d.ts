export {};

declare global {
  interface Window {
    SERVER_FLAGS: any;
  }
}

window.SERVER_FLAGS = window.SERVER_FLAGS || {};
