module.exports = {
    apps : [
        {
          name: "unKnowd",
          script: "./server.js",
          watch: true,
          env: {
              "PORT": 3000,
              "NODE_ENV": "development"
          },
          env_production: {
              "NODE_ENV": "production",
              instances : "max",
              exec_mode : "cluster"

          }
        }
    ]
  }