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

Source code of the article about including Flutter
module as a React Native package ([rn-package-flutter/article-1](https://github.com/p-mazhnik/rn-package-flutter/tree/article-1) branch).

- [Medium](https://medium.com/@p.mazhnik/how-to-include-flutter-module-as-a-react-native-package-b115846de1ca)
- [Dev.to](https://dev.to/mazhnik/how-to-include-flutter-module-as-a-react-native-package-5b00)
- [GitHub](./article.md)

Repository structure:
- `ReactNativeApp` directory contains host app code written in React Native Web, TypeScript
- `flutter_module_rn` directory contains package code written in React Native Web + Flutter, Dart

## Main Libraries Used 🛠
Tested with Flutter **3.10** and React-Native **0.72**.
- [Flutter](https://flutter.dev/)
- [React Native](https://reactnative.dev/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [CocoaPods](https://cocoapods.org/about)
- [create-react-native-module](https://github.com/brodybits/create-react-native-module)

## Found Libraries Limitations 🐞
- [ ] React Native: need to duplicate in host app custom 3rd party maven 
dependencies used in react-native npm module  
https://stackoverflow.com/questions/65089494/3rd-party-maven-dependency-in-react-native-npm-module
- [ ] CocoaPods: can't define pod configuration ("Debug" or "Release") in `.podspec` file  
https://github.com/CocoaPods/CocoaPods/issues/2847,  
https://github.com/CocoaPods/CocoaPods/issues/6338
- [ ] CocoaPods: can't define local directory in the podspec `source` property  
https://github.com/CocoaPods/cocoapods-packager/issues/216

## Learn More 📖
[Add Flutter to existing app](https://flutter.dev/docs/development/add-to-app)

