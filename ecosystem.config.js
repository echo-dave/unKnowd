module.exports = {
  apps: [
    {
      name: "unKnowd",
      script: "./server.js",
      watch: true,
      env_dev: {
        NODE_ENV: "development",
        ignore_watch: ["client","client/*",]
      },
      env_production: {
        NODE_ENV: "production",
        ignore_watch: [
          "client/public/upload",
          "node_modules",
          ".pm2",
          ".ssh",
          ".profile.d",
          ".heroku_exec_data.json"
        ],
        exec_mode: "cluster",
        instances: "max"
      }
    }
  ]
};
