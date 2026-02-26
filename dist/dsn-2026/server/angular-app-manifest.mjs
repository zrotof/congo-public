
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-FHM65A6T.js",
      "chunk-OFLREHOG.js",
      "chunk-5FLBR2AU.js",
      "chunk-NDM677HP.js",
      "chunk-GGCOLAIW.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PQGUFJ5H.js",
      "chunk-QTKY4V7F.js",
      "chunk-OCUQQB4A.js"
    ],
    "route": "/biographie"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-EHYZPPQN.js",
      "chunk-B3HXNSPU.js"
    ],
    "route": "/grands-dossiers"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7336, hash: '51d66bfe39dea6b1ee006f25031fd1bd6706abe59941349cf86491f0d93eef1d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6809, hash: '6eff6ec4d5121d1973296687c59021cab312a6a29aaca408151904b680dee72c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21614, hash: '4f2437fe3f73c3bd889af9e94000073e8b902ddda1afdca676ac47401d157b03', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21718, hash: 'c04df745ff7ddb5357efc1015921bcba805741e5569ba988ebe000096d21f378', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21562, hash: '6faa3d4fd8e46372578424fc167323b57c2901cf362167adbc7973b179de8a5b', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'styles-BT3CCORC.css': {size: 360570, hash: '5bibTOhwSrY', text: () => import('./assets-chunks/styles-BT3CCORC_css.mjs').then(m => m.default)}
  },
};
