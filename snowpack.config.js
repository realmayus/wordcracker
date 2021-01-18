/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: false},
    src: {url: '/dist'},
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-sass'],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018'
  }
};
