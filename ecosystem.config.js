module.exports = {
  apps: [
    {
      name: "unKnowd",
      script: "./server.js",
      env_dev: {
        watch: true,
        NODE_ENV: "development || \"\"",
        ignore_watch: ["client","client/*",".git"]
      },
      env_production: {
        watch: false,
        NODE_ENV: "production",
        ignore_watch: [
          "client/public/upload",
          "client/node_modules",
          "node_modules",
          ".pm2",
          ".ssh",
          ".profile.d",
          ".heroku_exec_data.json",
          ".git"
        ],
        exec_mode: "cluster",
        instances: "max"
      }
    }
  ]
};
