require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF,
} = process.env;

module.exports = {
  apps : [{
    name   : "mesto-not-my",
    script : "./dist/app.js"
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:trashmarket/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'cd frontend && pwd && npm i && npm run build',
    }
  }
}
