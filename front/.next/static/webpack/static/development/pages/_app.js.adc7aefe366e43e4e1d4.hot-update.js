webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./reducers/post.js":
/*!**************************!*\
  !*** ./reducers/post.js ***!
  \**************************/
/*! exports provided: addPostAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPostAction\", function() { return addPostAction; });\n/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n// 기본 구조\nvar initialState = {\n  mainPosts: [{\n    id: 1,\n    User: {\n      id: 1,\n      nickname: \"동현이\"\n    },\n    content: \"동현이의 첫 번째 게시글! #아잉 #조아요\",\n    Images: [{\n      src: \"https://expanddesk-media.s3.amazonaws.com/hosting/740px-Google_Docs_logo.svg.png\"\n    }, {\n      src: \"https://expanddesk-media.s3.amazonaws.com/hosting/logo_google-drive.png\"\n    }],\n    Comments: [{\n      User: {\n        nickname: \"동현삼\"\n      },\n      content: \"꺄악\"\n    }, {\n      User: {\n        nickname: \"동현사\"\n      },\n      content: \"아이조아\"\n    }]\n  }],\n  // 이미지 업로드할 때의 경로\n  imagePaths: [],\n  // 게시글 추가가 완료되었는지 여부\n  postAdded: false\n};\nvar dummyPost = {\n  id: 2,\n  content: \"더미 포스트입니다.\",\n  User: {\n    id: 1,\n    nickname: \"동현이\"\n  },\n  Images: [],\n  Comments: []\n};\nvar addPostAction = function addPostAction() {\n  return {\n    type: \"ADD_POST\"\n  };\n};\n\nvar reducer = function reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    // 목록의 가장 앞 부분에 새로운 포스트를 추가함.\n    case \"ADD_POST\":\n      return _objectSpread(_objectSpread({}, state), {}, {\n        mainPosts: [dummyPost].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(state.mainPosts)),\n        postAdded: true\n      });\n\n    default:\n      return state;\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (reducer);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy9wb3N0LmpzP2E3ZTMiXSwibmFtZXMiOlsiaW5pdGlhbFN0YXRlIiwibWFpblBvc3RzIiwiaWQiLCJVc2VyIiwibmlja25hbWUiLCJjb250ZW50IiwiSW1hZ2VzIiwic3JjIiwiQ29tbWVudHMiLCJpbWFnZVBhdGhzIiwicG9zdEFkZGVkIiwiZHVtbXlQb3N0IiwiYWRkUG9zdEFjdGlvbiIsInR5cGUiLCJyZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFNQSxZQUFZLEdBQUc7QUFDakJDLFdBQVMsRUFBRSxDQUNQO0FBQ0lDLE1BQUUsRUFBRSxDQURSO0FBRUlDLFFBQUksRUFBRTtBQUFFRCxRQUFFLEVBQUUsQ0FBTjtBQUFTRSxjQUFRLEVBQUU7QUFBbkIsS0FGVjtBQUdJQyxXQUFPLEVBQUUseUJBSGI7QUFJSUMsVUFBTSxFQUFFLENBQUM7QUFBRUMsU0FBRyxFQUFFO0FBQVAsS0FBRCxFQUE4RjtBQUFFQSxTQUFHLEVBQUU7QUFBUCxLQUE5RixDQUpaO0FBS0lDLFlBQVEsRUFBRSxDQUNOO0FBQ0lMLFVBQUksRUFBRTtBQUFFQyxnQkFBUSxFQUFFO0FBQVosT0FEVjtBQUVJQyxhQUFPLEVBQUU7QUFGYixLQURNLEVBS047QUFDSUYsVUFBSSxFQUFFO0FBQUVDLGdCQUFRLEVBQUU7QUFBWixPQURWO0FBRUlDLGFBQU8sRUFBRTtBQUZiLEtBTE07QUFMZCxHQURPLENBRE07QUFtQmpCO0FBQ0FJLFlBQVUsRUFBRSxFQXBCSztBQXFCakI7QUFDQUMsV0FBUyxFQUFFO0FBdEJNLENBQXJCO0FBeUJBLElBQU1DLFNBQVMsR0FBRztBQUNkVCxJQUFFLEVBQUUsQ0FEVTtBQUVkRyxTQUFPLEVBQUUsWUFGSztBQUdkRixNQUFJLEVBQUU7QUFBRUQsTUFBRSxFQUFFLENBQU47QUFBU0UsWUFBUSxFQUFFO0FBQW5CLEdBSFE7QUFJZEUsUUFBTSxFQUFFLEVBSk07QUFLZEUsVUFBUSxFQUFFO0FBTEksQ0FBbEI7QUFRTyxJQUFNSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLEdBQU07QUFDL0IsU0FBTztBQUNIQyxRQUFJLEVBQUU7QUFESCxHQUFQO0FBR0gsQ0FKTTs7QUFNUCxJQUFNQyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFrQztBQUFBLE1BQWpDQyxLQUFpQyx1RUFBekJmLFlBQXlCO0FBQUEsTUFBWGdCLE1BQVc7O0FBQzlDLFVBQVFBLE1BQU0sQ0FBQ0gsSUFBZjtBQUNJO0FBQ0EsU0FBSyxVQUFMO0FBQ0ksNkNBQ09FLEtBRFA7QUFFSWQsaUJBQVMsR0FBR1UsU0FBSCxzR0FBaUJJLEtBQUssQ0FBQ2QsU0FBdkIsRUFGYjtBQUdJUyxpQkFBUyxFQUFFO0FBSGY7O0FBS0o7QUFDSSxhQUFPSyxLQUFQO0FBVFI7QUFXSCxDQVpEOztBQWNlRCxzRUFBZiIsImZpbGUiOiIuL3JlZHVjZXJzL3Bvc3QuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDquLDrs7gg6rWs7KGwXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgbWFpblBvc3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgVXNlcjogeyBpZDogMSwgbmlja25hbWU6IFwi64+Z7ZiE7J20XCIgfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwi64+Z7ZiE7J207J2YIOyyqyDrsojsp7gg6rKM7Iuc6riAISAj7JWE7J6JICPsobDslYTsmpRcIixcbiAgICAgICAgICAgIEltYWdlczogW3sgc3JjOiBcImh0dHBzOi8vZXhwYW5kZGVzay1tZWRpYS5zMy5hbWF6b25hd3MuY29tL2hvc3RpbmcvNzQwcHgtR29vZ2xlX0RvY3NfbG9nby5zdmcucG5nXCIgfSwgeyBzcmM6IFwiaHR0cHM6Ly9leHBhbmRkZXNrLW1lZGlhLnMzLmFtYXpvbmF3cy5jb20vaG9zdGluZy9sb2dvX2dvb2dsZS1kcml2ZS5wbmdcIiB9XSxcbiAgICAgICAgICAgIENvbW1lbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBVc2VyOiB7IG5pY2tuYW1lOiBcIuuPme2YhOyCvFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwi6rqE7JWFXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVXNlcjogeyBuaWNrbmFtZTogXCLrj5ntmITsgqxcIiB9LFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIuyVhOydtOyhsOyVhFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXSxcbiAgICAvLyDsnbTrr7jsp4Ag7JeF66Gc65Oc7ZWgIOuVjOydmCDqsr3roZxcbiAgICBpbWFnZVBhdGhzOiBbXSxcbiAgICAvLyDqsozsi5zquIAg7LaU6rCA6rCAIOyZhOujjOuQmOyXiOuKlOyngCDsl6zrtoBcbiAgICBwb3N0QWRkZWQ6IGZhbHNlXG59O1xuXG5jb25zdCBkdW1teVBvc3QgPSB7XG4gICAgaWQ6IDIsXG4gICAgY29udGVudDogXCLrjZTrr7gg7Y+s7Iqk7Yq47J6F64uI64ukLlwiLFxuICAgIFVzZXI6IHsgaWQ6IDEsIG5pY2tuYW1lOiBcIuuPme2YhOydtFwiIH0sXG4gICAgSW1hZ2VzOiBbXSxcbiAgICBDb21tZW50czogW11cbn07XG5cbmV4cG9ydCBjb25zdCBhZGRQb3N0QWN0aW9uID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiQUREX1BPU1RcIlxuICAgIH07XG59O1xuXG5jb25zdCByZWR1Y2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIC8vIOuqqeuhneydmCDqsIDsnqUg7JWeIOu2gOu2hOyXkCDsg4jroZzsmrQg7Y+s7Iqk7Yq466W8IOy2lOqwgO2VqC5cbiAgICAgICAgY2FzZSBcIkFERF9QT1NUXCI6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIG1haW5Qb3N0czogW2R1bW15UG9zdCwgLi4uc3RhdGUubWFpblBvc3RzXSxcbiAgICAgICAgICAgICAgICBwb3N0QWRkZWQ6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./reducers/post.js\n");

/***/ })

})