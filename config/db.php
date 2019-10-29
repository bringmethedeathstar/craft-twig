<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

return [
  '*' => [
    'database' => 'REPLACE_ME',
    'password' => 'REPLACE_ME',
    'server' => 'localhost',
    'schema' => 'public',
    'driver' => 'mysql',
    'tablePrefix' => '',
    'port' => '3306',
    'user' => 'root',
  ],

  'dev' => [
    'server' => 'localhost',
    'database' => getenv('DB_DATABASE'),
    'password' => getenv('DB_PASSWORD'),
  ],

  'staging' => [
    'database' => 'REPLACE_ME',
    'password' => 'REPLACE_ME',
  ],
];
