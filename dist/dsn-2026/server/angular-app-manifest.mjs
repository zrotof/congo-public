
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-QZPQLEA3.js",
      "chunk-2IGEVF4P.js",
      "chunk-TD4DC6IM.js",
      "chunk-7XN3NRXD.js",
      "chunk-JREVMSHC.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-VHYJ2FQI.js",
      "chunk-QTKY4V7F.js",
      "chunk-RVA7YD3C.js"
    ],
    "route": "/biographie"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7TA5OBDW.js",
      "chunk-3YURJR2P.js"
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
    'index.csr.html': {size: 7356, hash: '4c47b32904d008d5eeffbb9f6b089de4566b5087f0e48f330d8c43d6e07af990', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6829, hash: '8325e85544a9b305840dd0966bf191e8c690946b226499e513d8ff591c277335', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21582, hash: 'aebf1c8e0458b7365d9f80935120589cbd767701d6b1d0d33510781087a27302', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21634, hash: '3e66c21b4a3a6d0d49d02eb95dc5e992ed249890ed3b6611adf3629d84387f76', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21738, hash: 'a537e37bf297c20f8841bace5a49a0b002a2f94675f1be15fcc59c735b4a676c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-BT3CCORC.css': {size: 360570, hash: '5bibTOhwSrY', text: () => import('./assets-chunks/styles-BT3CCORC_css.mjs').then(m => m.default)}
  },
};
