<?php

return [
  '*' => [
    'useDevServer' => false,

    'manifest' => [
      'legacy' => 'manifest.json',
      'modern' => 'manifest.json',
    ],

    'server' => [
      'manifestPath' => '@webroot/assets/',
      'publicPath' => '/',
    ],

    'localFiles' => [
      'basePath' => '@webroot',
    ],
  ],

  'staging' => [],

  'dev' => [
    'useDevServer' => true,
    'errorEntry' => 'main.js',

    'devServer' => [
      'manifestPath' => 'http://localhost:8080/',
      'publicPath' => 'http://localhost:8080/',
    ],
  ],
];
