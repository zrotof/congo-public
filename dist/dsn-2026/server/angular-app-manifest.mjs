
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-7AW3TEND.js",
      "chunk-ZXY2PINL.js",
      "chunk-ARE3AAON.js",
      "chunk-OOKFKW6E.js",
      "chunk-SUHQHNGX.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-53OI2SDS.js",
      "chunk-QTKY4V7F.js",
      "chunk-UBN6TVKQ.js"
    ],
    "route": "/biographie"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HS2AEFIJ.js",
      "chunk-2W3HOH33.js"
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
    'index.csr.html': {size: 7336, hash: '34c56859effdfe15ec9f820a1cdd1808cbadeef566f00bfb5268ea482bfe1f50', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6809, hash: '39425e082dd3efa73737f00596d20887755ae7840a5d9f1d3a923008694b9a31', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21614, hash: 'dd1160afb4e1e9eef56fa39cb55fa135e698fcd6c940292b5e9ff4a88a547f4b', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21718, hash: '8e86eac371a602a5f775e74ce0308aa3100318667c6a6465b2bde2801ea43d3b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21562, hash: '894be831a02e3884b0dd15ea059ce29bf6faf0f162d5079139b1987259e4684d', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'styles-BT3CCORC.css': {size: 360570, hash: '5bibTOhwSrY', text: () => import('./assets-chunks/styles-BT3CCORC_css.mjs').then(m => m.default)}
  },
};
