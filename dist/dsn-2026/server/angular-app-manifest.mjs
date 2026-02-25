
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-C7JWJJ7Q.js",
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
    'index.csr.html': {size: 7336, hash: 'e6514de901e9fa88d98443d5679778ccff0169590f370419aa29ce1cb9560ee5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 6809, hash: '383293fa6025321a0b0bfcb568529dc42233fa8bec1e399fd156d7fc9567fa9f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'biographie/index.html': {size: 21614, hash: '4d71f503077d444d161a915806fd8ae1ff2b93837644dcca2c01c909e308dc9c', text: () => import('./assets-chunks/biographie_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21718, hash: '7397b18fa956a48b893112daf8ab2b99d4821d3e01a4afd16bc6a7007119dcea', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'grands-dossiers/index.html': {size: 21562, hash: 'c1f3b3cb5a16d82a9e47dfbbf243e7191e0ff84536ce5a61c46877dd078205a6', text: () => import('./assets-chunks/grands-dossiers_index_html.mjs').then(m => m.default)},
    'styles-BT3CCORC.css': {size: 360570, hash: '5bibTOhwSrY', text: () => import('./assets-chunks/styles-BT3CCORC_css.mjs').then(m => m.default)}
  },
};
