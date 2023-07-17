# How to include Flutter module as a React Native package

[![Medium](
https://img.shields.io/badge/p.mazhnik-%23000000.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZXNtb2tlIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+TWVkaXVtIGljb248L3RpdGxlPjxwYXRoIGQ9Ik0wIDB2MjRoMjRWMEgwem0xOS45MzggNS42ODZMMTguNjUxIDYuOTJhLjM3Ni4zNzYgMCAwIDAtLjE0My4zNjJ2OS4wNjdhLjM3Ni4zNzYgMCAwIDAgLjE0My4zNjFsMS4yNTcgMS4yMzR2LjI3MWgtNi4zMjJ2LS4yN2wxLjMwMi0xLjI2NWMuMTI4LS4xMjguMTI4LS4xNjUuMTI4LS4zNlY4Ljk5bC0zLjYyIDkuMTk1aC0uNDlMNi42OSA4Ljk5djYuMTYzYS44NS44NSAwIDAgMCAuMjMzLjcwN2wxLjY5NCAyLjA1NHYuMjcxSDMuODE1di0uMjdMNS41MSAxNS44NmEuODIuODIgMCAwIDAgLjIxOC0uNzA3VjguMDI3YS42MjQuNjI0IDAgMCAwLS4yMDMtLjUyN0w0LjAxOSA1LjY4NnYtLjI3aDQuNjc0bDMuNjEzIDcuOTIzIDMuMTc2LTcuOTI0aDQuNDU2di4yNzF6Ii8+PC9zdmc+&logoColor=white
)](
https://www.medium.com/@p.mazhnik/
)
[![Dev.to](https://img.shields.io/badge/mazhnik-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](
https://dev.to/mazhnik
)
[![LinkedIn](
https://img.shields.io/badge/p--mazhnik-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
)](
https://www.linkedin.com/in/p-mazhnik/
)

It’s sometimes not practical to rewrite your entire application in Flutter all at once.
In such case, Flutter can be seamlessly integrated into your existing application as a library or module.
While there are numerous resources discussing the utilization of React Native's code in Flutter, 
there appears to be a dearth of information on the inverse scenario, 
that is, incorporating Flutter code into a React Native application.  
In this article series, I'll delve into the process of integrating a Flutter module as a React Native npm package.

Topics covered in the article series:

Article 1: **How to include Flutter module as a React Native package**

Source code: [rn-package-flutter/article-1](https://github.com/p-mazhnik/rn-package-flutter/tree/article-1) branch.  
Article: [Medium](https://medium.com/@p.mazhnik/how-to-include-flutter-module-as-a-react-native-package-b115846de1ca), 
[Dev.to](https://dev.to/mazhnik/how-to-include-flutter-module-as-a-react-native-package-5b00),
[GitHub](./article-1.md)

- Step-by-step guide for setting up a Flutter module as an npm package in a React Native app.
- Launching Flutter screen from the React Native app on Android and iOS platforms.

Article 2: **Render Flutter module alongside React Native components**

- Rendering Flutter module alongside React Native components for a seamless integration on Web, iOS, and Android platforms.

Article 3: TBD

- Establishing communication between Flutter and React Native.

## Repository structure
- `ReactNativeApp` directory contains host app code written in React Native Web, TypeScript
- `rn-flutter` directory contains package code written in React Native Web
- `flutter_module` directory contains Flutter module written in Dart

## Main Libraries Used 🛠
Tested with Flutter **3.10** and React-Native **0.72**.
- [Flutter](https://flutter.dev/)
- [React Native](https://reactnative.dev/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [CocoaPods](https://cocoapods.org/about)
- [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

## Found Libraries Limitations 🐞
- [ ] React Native: need to duplicate in host app custom 3rd party maven 
dependencies used in react-native npm module  
https://stackoverflow.com/questions/65089494/3rd-party-maven-dependency-in-react-native-npm-module
- [ ] CocoaPods: can't define pod configuration ("Debug" or "Release") in `.podspec` file  
https://github.com/CocoaPods/CocoaPods/issues/2847,  
https://github.com/CocoaPods/CocoaPods/issues/6338
- [ ] CocoaPods: can't define local directory in the podspec `source` property  
https://github.com/CocoaPods/cocoapods-packager/issues/216
- [ ] Flutter: can't display Flutter in multiple elements on web
https://github.com/flutter/flutter/issues/118481

## Learn More 📖
[Add Flutter to existing app](https://flutter.dev/docs/development/add-to-app)

