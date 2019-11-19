## I Feel Good App

### Installation

- Following [React Native Installation](https://facebook.github.io/react-native/docs/getting-started)

### Note

- For `react-native-app-tour` issue, please check [here](https://github.com/prscX/react-native-app-tour#-issues) for more detail. Alternative solution for that is open on [PR#49](https://github.com/prscX/react-native-app-tour/pull/49), so to build apk now change on `RNAppTourModule.java` like below

```
        TapTarget targetView = TapTarget.forView(view, title, description);
        // int[] points = new int[2];
        // view.getLocationOnScreen(points);
        // Rect rectBonds = new Rect(points[0], points[1], points[0] + view.getWidth(), points[1] + view.getHeight());

        // TapTarget targetView = TapTarget.forBounds(rectBonds, title, description);

```
