module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Commit history of andres-dc/ftf-test';
      return args;
    });
  },
};
