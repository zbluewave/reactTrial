![Delivery](/src/images/dot-logo_120x120.png)

# Delivery.com Internal Tools


Bootstrapped using Facebook's [Create React App](https://github.com/facebookincubator/create-react-app).

Utilizing [React Semantic UI](https://react.semantic-ui.com/introduction) for a UI library.

## Frontend Client Installation & Running Locally

* Install using [yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://www.npmjs.com/get-npm):

`yarn install` or `npm install`

* Pass in a URL for the API and start the application:

`REACT_APP_URL=https://www-sym672.staging.delivery.com/api yarn start` 

or 

`REACT_APP_URL=https://www-sym672.staging.delivery.com/api npm run start`

* Viewable on localhost:3000

_[redux logger](https://github.com/evgenyrodionov/redux-logger) is used as a redux debugging tool when the client is ran locally. Check the console!_

## Styles

This project uses [Sass](http://sass-lang.com/) as a CSS preprocessor. Style files (.scss) are found next to their component and imported within `/styles/index.scss`. During building, this will be compiled into one master CSS file for the application. [BEM](http://getbem.com/) is used as the naming convention.

Tangentially, [ESLint](https://eslint.org/) runs while Webpack is watching your files. `.eslintrc` is the config file for this and uses the default ESLint recommended configuration along with react-specific rules provided by [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react).

## Frontend Client Tests

[jest](https://facebook.github.io/jest/) is used as the test runner.

[enzyme](http://airbnb.io/enzyme/) for manipulating components.

Test files live alongside their corresponding components and use a `{component}.test.js` naming convention.

Running Tests:

`yarn test` or `npm run test`

## Frontend-Standard-Library as a Submodule

FSL is pulled in as a submodule to this repository (similar to a dependency).
With this, you can avoid reinventing something that may have already been built. You can easily import React components this way (as seen in [MerchantsList](https://github.com/Deliverydotcom/Internal-Tools/blob/master/src/Merchants/Component/MerchantsList.js):

```javascript
import PaginationWidget from 'FSL/modules-react/Base/Component/PaginationWidget/PaginationWidget';
```

'FSL' is a webpack alias for src/frontend-standard-library in the sake of brevity.


## Jenkins Pipeline

There is a pipeline setup in the integration environment for this tool to deploy to https://new-admin-integration.delivery.com.

Build with parameters:

`Branch` refers to the branch of React-Internal-Tools you wish to build off. (master)

`API_URL` is the same URL you'd pass when running the frontend client locally. This will default to integration.delivery.com/api if not supplied.