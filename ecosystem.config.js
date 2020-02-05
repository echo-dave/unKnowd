module.exports = {
  apps: [
    {
      name: "unKnowd",
      script: "./server.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        ignore_watch: ["client/*"]
      },
      env_production: {
        NODE_ENV: "production",
        watch:false,
        ignore_watch: ["client/public/upload","node_modules"],
        exec_mode: "cluster",
        instances: "max"
      }
    }
  ]
};
