import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('dist/server/wrangler.json');

if (fs.existsSync(filePath)) {
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Remove keys unsupported by Cloudflare Pages
  delete config.main;
  delete config.rules;
  delete config.assets;

  // 2. Remove SESSION KV namespace if missing an ID
  if (Array.isArray(config.kv_namespaces)) {
    config.kv_namespaces = config.kv_namespaces.filter(
      (kv) => !(kv.binding === 'SESSION' && !kv.id)
    );
    if (config.kv_namespaces.length === 0) {
      delete config.kv_namespaces;
    }
  }

  // 3. Remove preview SESSION KV namespace if missing an ID
  if (Array.isArray(config.previews?.kv_namespaces)) {
    config.previews.kv_namespaces = config.previews.kv_namespaces.filter(
      (kv) => !(kv.binding === 'SESSION' && !kv.id)
    );
    if (config.previews.kv_namespaces.length === 0) {
      delete config.previews.kv_namespaces;
    }
  }

  // 4. Remove empty previews object if left over
  if (config.previews && Object.keys(config.previews).length === 0) {
    delete config.previews;
  }

  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  console.log('Successfully cleaned dist/server/wrangler.json for Cloudflare Pages');
}