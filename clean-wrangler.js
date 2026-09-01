import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('dist/server/wrangler.json');

if (fs.existsSync(filePath)) {
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Resolve dist/client relative to dist/server/wrangler.json
  config.pages_build_output_dir = '../client';

  // 2. Remove keys unsupported by Cloudflare Pages
  delete config.main;
  delete config.rules;
  delete config.assets;

  // 3. Remove unsupported top-level & dev fields warned by Wrangler
  delete config.definedEnvironments;
  delete config.exports;
  delete config.connect;
  delete config.ai_search_namespaces;
  delete config.ai_search;
  delete config.agent_memory;
  delete config.secrets_store_secrets;
  delete config.artifacts;
  delete config.unsafe_hello_world;
  delete config.flagship;
  delete config.worker_loaders;
  delete config.ratelimits;
  delete config.vpc_services;
  delete config.vpc_networks;
  delete config.python_modules;

  if (config.dev) {
    delete config.dev.enable_containers;
    delete config.dev.generate_types;
  }

  // 4. Remove unconfigured SESSION KV namespaces
  if (Array.isArray(config.kv_namespaces)) {
    config.kv_namespaces = config.kv_namespaces.filter(
      (kv) => !(kv.binding === 'SESSION' && !kv.id)
    );
    if (config.kv_namespaces.length === 0) {
      delete config.kv_namespaces;
    }
  }

  if (Array.isArray(config.previews?.kv_namespaces)) {
    config.previews.kv_namespaces = config.previews.kv_namespaces.filter(
      (kv) => !(kv.binding === 'SESSION' && !kv.id)
    );
    if (config.previews.kv_namespaces.length === 0) {
      delete config.previews.kv_namespaces;
    }
  }

  if (config.previews && Object.keys(config.previews).length === 0) {
    delete config.previews;
  }

  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  console.log('Successfully cleaned dist/server/wrangler.json for Cloudflare Pages');
}