module.exports = {
  apps : [{
    name: "aamaio-web",
    script: "pnpm",
    args: "start",
    cwd: "./",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};
