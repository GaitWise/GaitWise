# Expo Router Example

Use [`expo-router`](https://docs.expo.dev/router/introduction/) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)
```
GaitWise
├─ app
│  ├─ (tabs)
│  │  ├─ board
│  │  │  ├─ index.js
│  │  │  └─ _layout.js
│  │  ├─ calendar
│  │  │  ├─ calendar.js
│  │  │  └─ _layout.js
│  │  ├─ home
│  │  │  ├─ index.js
│  │  │  └─ _layout.js
│  │  ├─ setting
│  │  │  ├─ index.js
│  │  │  └─ _layout.js
│  │  ├─ walking
│  │  │  ├─ index.js
│  │  │  └─ _layout.js
│  │  └─ _layout.js
│  ├─ App.js
│  ├─ index.js
│  ├─ profile
│  │  └─ index.js
│  ├─ project_select
│  │  ├─ index.js
│  │  └─ _layout.js
│  ├─ survey
│  │  ├─ age.js
│  │  ├─ gender.js
│  │  ├─ height.js
│  │  ├─ surveyPage.js
│  │  ├─ weight.js
│  │  └─ _layout.js
│  └─ [...unmatched].js
├─ app.json
├─ babel.config.js
├─ components
│  ├─ index.js
│  └─ survey
│     └─ Surveytemplate.js
├─ constants
│  ├─ icons.js
│  ├─ image.js
│  ├─ index.js
│  └─ theme.js
├─ package-lock.json
├─ package.json
└─ README.md

```