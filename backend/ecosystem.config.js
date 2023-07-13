require("dotenv").config({ path: "./.env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_PATH_SOURCE,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-not-my",
      script: "./dist/app.js",
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      "pre-deploy-local": `scp --exclude=".env.deploy.example" ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH_SOURCE}`,
      "post-deploy":
        "cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
