![Banner](https://github.com/Vidhyanandcs/tracker-dApp-ui/blob/main/banner.jpg)
# tracker-dApp-ui
![GitHub last commit](https://img.shields.io/github/last-commit/Vidhyanandcs/tracker-dApp-ui)
![GitHub issues](https://img.shields.io/github/issues-raw/Vidhyanandcs/tracker-dApp-ui)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Vidhyanandcs/tracker-dApp-ui)
![GitHub](https://img.shields.io/github/license/Vidhyanandcs/tracker-dApp-ui)

The user interface built for a decentralized facility tracker application. This facility tracker is intended to track a commercial laundry facility and store the details in Algorand blockchain for future verification.

The following are tracked using this application:

    1) Employees Present.
    2) Amount of consumables in stock.
    3) Working condition of machines.
    4) Spares available in the facility.

The CSS has been written without any CSS frameworks. We have used felxbox and CSS grid. This makes the application easier to maintain and light weight. We have used vue 3.0 for this project. The options API is used instead of composition API so that developers familiar with 2.x and 3.x versions of vue can utilise this repositiory.

Note: To run the app in production with authentication you will have to use the guards in the `/router/index.js`.

## Technologies
Project is created with:
* Node.JS: 14.16.0
* vue.JS: 3.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


