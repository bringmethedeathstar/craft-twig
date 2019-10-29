<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

return [
  // Global/live settings
  '*' => [
    'errorTemplatePrefix' => '_errors/',
    'enableCsrfProtection' => true,
    'omitScriptNameInUrls' => true,
    'useEmailAsUsername' => true,
    'defaultWeekStartDay' => 1,
    'siteUrl' => 'REPLACE_ME',
    'cpTrigger' => 'manage',
    'securityKey' => 'xxx',
  ],

  // Dev environment settings
  'dev' => [
    'testToEmailAddress' => getenv('CMS_EMAIL') ?: null,
    'siteUrl' => getenv('SITE_URL'),
    'userSessionDuration' => 'P1W',
    'devMode' => true,
  ],

  // Staging environment settings
  'staging' => [
    'siteUrl' => 'REPLACE_ME',
    'devMode' => true,
  ],
];
