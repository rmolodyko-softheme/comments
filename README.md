# Comments Application

There is an application for displaying comments (with CRUD) and filtering by tags.

Comment message accepts and renders simple html tags, and also simple math expressions try to type:
1+2+3-4 inside comment.

Also I have written unit and e2e tests, to have a confidence that application is working.

This application has storybook to look at and test the simple components (building blocks) of application.

Before commit files the linter and unit tests runns.

## !important!

Before you run e2e tests or serve the application you need start mock json server:

`npm run mock:server`

## Serve application

`npm run start`

## To run linter

`npm run lint`

## To run unit tests

`npm run test`

## To run e2e tests

`npm run e2e`

## To run storybook and see your components run

`npm run storybook`
