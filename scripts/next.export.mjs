import { writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create routes-manifest.json for static export and handle other special files
const prepareExport = () => {
  const outDir = join(process.cwd(), 'out');

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  // Create routes-manifest.json
  const routesManifest = {
    version: 4,
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

  // Create prerender-manifest.json
  const prerenderManifest = {
    version: 4,
    routes: {
      "/": {
        initialRevalidateSeconds: false,
        srcRoute: null,
        dataRoute: ""
      }
    },
    dynamicRoutes: {},
    notFoundRoutes: []
  };

  writeFileSync(
    join(outDir, 'prerender-manifest.json'),
    JSON.stringify(prerenderManifest, null, 2)
  );

  // Ensure there's a .nojekyll file to disable GitHub Pages Jekyll processing
  writeFileSync(join(outDir, '.nojekyll'), '');

  console.log('✅ Export preparation completed successfully');
};

prepareExport();
