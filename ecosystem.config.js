const debugging = false;
let nodeArgs = [];

if (debugging) {
  nodeArgs.push("--inspect-brk=0.0.0.0")
}

module.exports = {
  apps : [{
    name: 'nodebase',
    script: 'src/server.js',
    node_args: nodeArgs,
    watch: true,
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
