# Changelog

All notable changes to `proposal-page/sdk-js` will be documented in this file.

## 0.4.0 - 2019-05-14
- added the `acceptProject` method to create a accept intent for a project.
- added the `confirmProjectAcceptance` method to confirm the accept intent for a project.
- added the `revertProjectAcceptance` method to revert the acceptance of a project.

## 0.3.0 - 2019-05-06
- added the optional parameter `title` (default = null) to the listProjects method.
- it's possible to list projects by title.

## 0.2.0 - 2019-04-30
- added the optional parameters `page` (default = 1) and `itemsPerPage` (default = 6) to the listTemplates method.
- it's possible to list project templates with a specific page and with a specific quantity of items per page.
- added the optional parameters `page` (default = 1) and `itemsPerPage` (default = 6) to the listProjects method.
- it's possible to list projects with a specific page and with a specific quantity of items per page.

## 0.1.0 - 2019-04-23

- initial release
