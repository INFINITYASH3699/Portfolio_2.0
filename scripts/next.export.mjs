import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create routes-manifest.json for static export
const createRoutesManifest = () => {
  const outDir = join(process.cwd(), 'out');

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const routesManifest = {
    version: 3,
    basePath: "",
    redirects: [],
    headers: [],
    dynamicRoutes: [],
    staticRoutes: [
      {
        page: "/",
        regex: "^/(?:/)?$",
        routeKeys: {},
        namedRegex: "^/(?:/)?$"
      }
    ],
    dataRoutes: [],
    rewrites: []
  };

  writeFileSync(
    join(outDir, 'routes-manifest.json'),
    JSON.stringify(routesManifest, null, 2)
  );

  console.log('✅ routes-manifest.json created successfully');
};

createRoutesManifest();
