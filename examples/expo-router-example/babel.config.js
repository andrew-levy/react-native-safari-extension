module.exports = function(api) {
  api.cache(true);
  let plugins = [];
  
  

  

  
    plugins.push('expo-router/babel');
  

  

  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};
