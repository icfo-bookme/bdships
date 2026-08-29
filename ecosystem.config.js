module.exports = {
  apps: [
    {
      name: "bdships",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
      },
    },
  ],
};