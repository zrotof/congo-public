
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
    'index.csr.html': {size: 7356, hash: '362de97aa3c101d07e0ee225636e8d1ebfad54652b5f316a9b558f740b6c5a21', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6829, hash: '0bb1f68aae32a19ce48918da19265d9d1db9b11b25a78852e05075020b5b7688', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 21738, hash: '650b4b2fbd039c7d4921f26514be22624e5449a142fa0b2a7769b37a2730f5b6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21634, hash: '5d71a0bdee3f11f9a6efcecf11b778c4db76cb935131abc5208d720c3148d10b', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21582, hash: '3a555532f2a3290fd28e630c3a7fd6611e40c4ae7809e3f6cc4389768ebd9211', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'styles-BT3CCORC.css': {size: 360570, hash: '5bibTOhwSrY', text: () => import('./assets-chunks/styles-BT3CCORC_css.mjs').then(m => m.default)}
  },
};
