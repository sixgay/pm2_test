module.exports = {
  apps : [{
    name      : 'szhmqd21_node',
    script    : './src/app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : 'root',
      host : '47.107.150.71',
      ref  : 'origin/master',
      repo : 'git@github.com:sixgay/pm2_test.git',
      path : '/ftp/node/production',
      'post-deploy' : 'git pull && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
