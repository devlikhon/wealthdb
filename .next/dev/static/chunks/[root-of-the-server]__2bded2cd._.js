(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'antd'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfigProvider, {
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/providers.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const LoginHeaderLogo = ()=>{
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginHeaderLogo.useEffect": ()=>{
            const handleResize = {
                "LoginHeaderLogo.useEffect.handleResize": ()=>{
                    setIsMobile(window.innerWidth <= 768);
                }
            }["LoginHeaderLogo.useEffect.handleResize"];
            handleResize(); // initial
            window.addEventListener("resize", handleResize);
            return ({
                "LoginHeaderLogo.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["LoginHeaderLogo.useEffect"];
        }
    }["LoginHeaderLogo.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "data-test-id": "",
        className: "login__logo",
        height: "30",
        width: "192",
        viewBox: "0 0 192 30",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        "aria-hidden": "true",
        role: "presentation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            // transform="translate(-45,0)"
            transform: isMobile ? "translate(-35,0)" : "translate(-45,0)",
            id: "Login",
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                transform: "translate(-30.000000, -29.000000)",
                id: "Login_2_Desktop",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    transform: "translate(30.000000, 29.000000)",
                    id: "Logo",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(0,0)",
                        id: "Group-49",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M52.6463158,9.08556338 C53.226,8.36017606 53.5161053,7.20982394 53.5168421,5.63450704 C53.5182105,4.07957746 53.2273684,2.94475352 52.6442105,2.22992958 C52.0610526,1.51510563 51.0466316,1.15774648 49.6010526,1.15774648 L47.46,1.15774648 L47.46,10.1746479 L49.6031579,10.1746479 C51.0502105,10.1739085 52.0645263,9.8109507 52.6463158,9.08556338 Z M53.7673684,1.46302817 C54.5708421,2.41933099 54.9732632,3.81507042 54.9747368,5.65035211 C54.9782105,7.49894366 54.5765263,8.9031338 53.7694737,9.86302817 C52.9624211,10.8229225 51.6992632,11.3028169 49.98,11.3028169 L46.1094737,11.3028169 L46.1094737,0.0316901408 L49.9778947,0.0316901408 C51.6992632,0.0323239437 52.9624211,0.509471831 53.7673684,1.46302817 Z",
                                id: "Fill-3",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M58.1284316,6.76374296 C58.2210632,5.13127817 58.9502211,4.31441197 60.3158,4.31303873 C61.6708526,4.31303873 62.3487474,5.12990493 62.3494842,6.76374296 L58.1284316,6.76374296 Z M63.6389579,6.97501056 C63.6389579,4.51796831 62.5312737,3.28944718 60.3158,3.28944718 C59.1929579,3.28944718 58.3249579,3.65029225 57.7115895,4.37219366 C57.0982211,5.09398944 56.7926421,6.11515141 56.7947474,7.43557394 C56.7947474,10.1278627 57.9684316,11.4735317 60.3158,11.4728979 C62.1550632,11.4728979 63.2221158,10.7010317 63.5168526,9.15740493 L62.2884316,9.15740493 C62.1158,10.0116655 61.4631684,10.4380035 60.3305368,10.4366303 C58.8638,10.4366303 58.1298,9.54360211 58.1284316,7.75775704 L63.6021158,7.75775704 C63.6284316,7.52958803 63.6389579,7.26972887 63.6389579,6.97501056 Z",
                                id: "Fill-5",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M70.8326316,11.3017606 L70.8021053,10.2507042 C70.266,11.0633451 69.406,11.4692958 68.2221053,11.468662 C66.4923158,11.468662 65.6273684,10.5602113 65.6273684,8.74330986 L65.6273684,3.46161972 L66.9021053,3.46161972 L66.9021053,8.1528169 C66.9021053,8.93524648 67.0336842,9.49859155 67.2968421,9.84295775 C67.56,10.1873239 67.9897895,10.3601408 68.5863158,10.3616197 C69.1428421,10.3616197 69.5989474,10.2119366 69.9547368,9.91267606 C70.3105263,9.61341549 70.5382105,9.32112676 70.6378947,9.03591549 C70.7071579,8.83922535 70.7531579,8.63492958 70.7747368,8.42746479 C70.7947368,8.22464789 70.8042105,8.00492958 70.8042105,7.77147887 L70.8042105,3.45739437 L72.0778947,3.45739437 L72.0778947,11.3017606 L70.8326316,11.3017606 Z",
                                id: "Fill-7",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M75.0979053,4.48204225 L73.6242211,4.48204225 L73.6242211,3.45739437 L75.0979053,3.45739437 L75.0979053,1.26443662 L76.3726421,1.26443662 L76.3726421,3.45739437 L78.3610632,3.45739437 L78.3610632,4.48204225 L76.3726421,4.48204225 L76.3726421,9.15739437 C76.3726421,9.63485915 76.4561158,9.95176056 76.6231684,10.1080986 C76.7902211,10.2644366 77.1266421,10.3429225 77.6326421,10.343662 C77.9072737,10.341338 78.1812737,10.3158803 78.4515895,10.2676056 L78.4515895,11.3038732 C78.1413789,11.3631338 77.8263263,11.3935563 77.5105368,11.3947183 C76.6102211,11.3947183 75.9831684,11.2422887 75.6294842,10.9373239 C75.2758,10.6323592 75.1003263,10.0943662 75.1031684,9.32323944 L75.1031684,4.48204225 L75.0979053,4.48204225 Z",
                                id: "Fill-9",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M79.5747158,9.12358099 L80.8199789,9.12358099 C80.9007158,10.0270669 81.5431368,10.4788627 82.7473474,10.4788627 C83.9312421,10.4788627 84.5231368,10.0422782 84.5231368,9.16900352 C84.5231368,8.78375704 84.4270316,8.5045669 84.2347158,8.33132746 C84.0420842,8.15914437 83.6726105,8.02182042 83.1262947,7.92041197 L81.7157684,7.65104577 C80.4204,7.39752465 79.7726105,6.68660915 79.7726105,5.5182993 C79.7494526,4.87530634 80.0485053,4.26347535 80.5694526,3.88836972 C81.1007158,3.4932993 81.8165053,3.29544718 82.7168211,3.29470775 C84.5680842,3.29470775 85.5505053,4.07671479 85.6641895,5.64083451 L84.4357684,5.64083451 C84.3241895,4.73734859 83.7473474,4.28523592 82.7052421,4.28449648 C81.5719789,4.28449648 81.0052421,4.67534155 81.0052421,5.45703169 C81.0052421,6.02608099 81.3845053,6.39157394 82.1431368,6.55351056 L83.8273474,6.88836972 C85.1425053,7.15319366 85.7999789,7.89970775 85.7999789,9.12780634 C85.7999789,9.84822887 85.5270316,10.4193908 84.9810316,10.8411866 C84.4350316,11.2629824 83.6915579,11.47425 82.7505053,11.4749894 C80.7266105,11.4749894 79.6691368,10.6932993 79.5778737,9.12991901 L79.5747158,9.12358099 Z",
                                id: "Fill-11",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M92.6115684,8.77289789 L93.8863053,8.77289789 C93.7045158,10.5700458 92.6726211,11.4683556 90.7905158,11.4676162 C89.6466211,11.4676162 88.7789368,11.1155387 88.1873579,10.4112782 C87.5957789,9.70701761 87.2996737,8.69398944 87.2989368,7.37219366 C87.2989368,6.08346127 87.6052526,5.08099648 88.2178842,4.3647993 C88.8305158,3.64860211 89.6880947,3.29050352 90.7905158,3.29050352 C91.7112526,3.29050352 92.4420947,3.52395423 92.9831474,3.99085563 C93.5242,4.45775704 93.8252526,5.1229331 93.8863053,5.98627817 L92.6115684,5.98627817 C92.4803053,4.8897993 91.8733579,4.34113732 90.7905158,4.34050352 C89.3540947,4.34050352 88.6354632,5.35067958 88.6347263,7.37113732 C88.6347263,9.40279225 89.3533579,10.4183556 90.7905158,10.4176162 C91.9133579,10.4176162 92.5203053,9.86937676 92.6115684,8.77289789",
                                id: "Fill-13",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(95.789474, 0.000000)",
                                id: "Group-17",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        transform: "translate(0,0)",
                                        id: "Clip-16"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0.0400210526,0.0306126761 L1.31465263,0.0306126761 L1.31465263,4.52321831 C1.85086316,3.70138732 2.72633684,3.29015493 3.94107368,3.28941549 C5.70096842,3.28941549 6.58107368,4.19290141 6.58107368,5.99997887 L6.58107368,11.3006831 L5.30623158,11.3006831 L5.30623158,6.61054225 C5.30623158,5.82959155 5.17223158,5.26614085 4.90423158,4.92040141 C4.63612632,4.57466197 4.19328421,4.40205634 3.57581053,4.40279577 C3.07454737,4.38452113 2.58275789,4.54339437 2.18633684,4.85173944 C1.81717895,5.15173944 1.58202105,5.44371127 1.48096842,5.72744366 C1.41128421,5.92434507 1.36538947,6.12906338 1.34423158,6.3369507 C1.32423158,6.53976761 1.31370526,6.75948592 1.31370526,6.99188028 L1.31370526,11.3027958 L0.0389684211,11.3027958 L0.0389684211,0.0306126761 L0.0400210526,0.0306126761 Z",
                                        id: "Fill-15",
                                        fill: "#ffffff",
                                        mask: "url(#mask-2)"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M105.738937,6.76374296 C105.829463,5.13127817 106.557884,4.31441197 107.9242,4.31303873 C109.279358,4.31303873 109.957147,5.12990493 109.957884,6.76374296 L105.738937,6.76374296 Z M111.247358,6.97501056 C111.247358,4.51796831 110.139674,3.28944718 107.9242,3.28944718 C106.801463,3.28944718 105.934095,3.65029225 105.322095,4.37219366 C104.7102,5.09398944 104.403884,6.11515141 104.403253,7.43557394 C104.403253,10.1278627 105.576832,11.4735317 107.9242,11.4728979 C109.765568,11.4728979 110.833253,10.7010317 111.127358,9.15740493 L109.896832,9.15740493 C109.7242,10.0116655 109.071568,10.4380035 107.938937,10.4366303 C106.472305,10.4366303 105.738937,9.54360211 105.738937,7.75775704 L111.212621,7.75775704 C111.236832,7.52958803 111.247358,7.26972887 111.247358,6.97501056 Z",
                                id: "Fill-18",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(117.473684, 0.000000)",
                                id: "Group-22",
                                fill: "#ffffff",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M4.18733684,10.2190141 L1.40849474,10.2190146 L1.40849474,5.93978873 L4.18733684,5.93978873 C5.17754737,5.93978873 5.90028421,6.10742958 6.35586316,6.44260563 C6.81049474,6.77640845 7.03902105,7.31197183 7.03902105,8.04084507 C7.03902105,9.49362676 6.08870526,10.2197535 4.18849474,10.2190141 L4.18733684,10.2190141 Z M1.40849474,1.11126761 L3.89902105,1.11126761 C4.78807368,1.11126761 5.43512632,1.25630282 5.83996842,1.54647887 C6.24417895,1.83380282 6.44944211,2.30387324 6.44944211,2.95457746 C6.44944211,4.2221831 5.59965263,4.85598592 3.90007368,4.85598592 L1.40944211,4.85598592 L1.40849474,1.11126761 Z M6.1726,5.25633803 C7.26596842,4.84785211 7.81291579,4.06552817 7.81365263,2.90915493 C7.81365263,0.988732394 6.59438947,0.0292605634 4.15575789,0.0306338028 L0.0884947368,0.0306323308 L0.0884947368,11.3017606 L4.36628421,11.3017606 C5.67470526,11.3017606 6.67586316,11.0165493 7.38217895,10.4471831 C8.08849474,9.8778169 8.43481053,9.06232394 8.43481053,7.99647887 C8.43544211,6.48232394 7.68133684,5.56901408 6.1726,5.25633803 Z",
                                    id: "Fill-20"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                    lineNumber: 90,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M132.632642,8.37677113 C132.640116,8.61846127 132.609589,8.85983451 132.542116,9.09191197 C132.398116,9.51075 132.110537,9.86462324 131.730537,10.0901514 C131.306853,10.3459965 130.819484,10.4757148 130.325274,10.4640951 C129.295063,10.4640951 128.779589,10.027088 128.778958,9.15317958 C128.778958,8.09684155 129.410537,7.56867254 130.673695,7.56867254 L132.631589,7.56867254 L132.632642,8.37677113 Z M130.902116,3.28944718 C129.142853,3.28944718 128.131168,4.04082042 127.867274,5.54367254 L129.130432,5.54367254 C129.263168,4.71233451 129.838958,4.29613732 130.863168,4.29613732 C131.499589,4.29613732 131.9558,4.42004577 132.231589,4.66796831 C132.507379,4.91578521 132.643589,5.32395423 132.640011,5.89226408 L132.640011,6.60951761 L130.774747,6.60951761 C128.589484,6.60951761 127.496537,7.47782746 127.4958,9.21444718 C127.4958,9.9147993 127.723168,10.4662077 128.185274,10.8655035 C128.647379,11.2647993 129.276853,11.4686725 130.080011,11.4686725 C131.202853,11.4686725 132.052642,11.1182852 132.629484,10.4176162 L132.658958,11.3017711 L133.889484,11.3017711 L133.889484,5.88064437 C133.881063,4.15247535 132.885168,3.28870775 130.902116,3.28944718 Z",
                                id: "Fill-23",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M136.381105,3.45737324 L137.626263,3.45737324 L137.656789,4.52427465 C138.212579,3.70244366 139.087737,3.29121127 140.282158,3.29047183 C142.042789,3.29047183 142.923105,4.19406338 142.923105,6.00103521 L142.923105,11.3017394 L141.648368,11.3017394 L141.648368,6.61054225 C141.648368,5.82959155 141.514368,5.26624648 141.246368,4.92040141 C140.978263,4.57466197 140.535842,4.40205634 139.918895,4.40279577 C139.361737,4.40279577 138.898579,4.55247887 138.529421,4.85173944 C138.160263,5.15110563 137.924895,5.44297183 137.823105,5.72744366 C137.753737,5.9244507 137.707842,6.12906338 137.686263,6.3369507 C137.666368,6.53976761 137.655737,6.75948592 137.655737,6.99188028 L137.655737,11.3027958 L136.381105,11.3027958 L136.381105,3.45737324 Z",
                                id: "Fill-25",
                                fill: "#ffffff"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                id: "Fill-27",
                                fill: "#ffffff",
                                points: "146.655779 7.34049296 146.655779 11.3017606 145.379989 11.3017606 145.379989 0.0306338028 146.655779 0.0306338028 146.655779 6.96021127 149.9642 3.45633803 151.482095 3.45633803 147.990516 7.06690141 151.922095 11.3017606 150.268411 11.3017606"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                id: "Fill-29",
                                fill: "#00a3e0",
                                points: "54.5326211 26.818331 51.8915684 17.2236127 49.2663053 26.818331 47.6126211 26.818331 44.7589368 15.5492113 46.2157789 15.5492113 48.5378842 25.3563592 51.1031474 15.7764296 52.7568316 15.7764296 55.3378842 25.3257254 57.6589368 15.5492113 59.0399895 15.5492113 56.1873579 26.818331"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M61.1505368,22.281338 C61.2410632,20.6467606 61.9694842,19.8292606 63.3358,19.8285211 C64.6908526,19.8285211 65.3687474,20.6461268 65.3694842,22.281338 L61.1505368,22.281338 Z M66.6589579,22.4926056 C66.6589579,20.0376761 65.5512737,18.8091549 63.3358,18.8070423 C62.2129579,18.8070423 61.3456947,19.1678873 60.7336947,19.8897887 C60.1218,20.6115845 59.8153789,21.6327465 59.8147474,22.953169 C59.8147474,25.6432394 60.9884316,26.9883803 63.3358,26.9883803 C65.1771684,26.9883803 66.2448526,26.2165141 66.5389579,24.6728873 L65.3084316,24.6728873 C65.1358,25.5271479 64.4831684,25.9542254 63.3505368,25.9542254 C61.8839053,25.9542254 61.1505368,25.0605634 61.1505368,23.2732394 L66.6242211,23.2732394 C66.6463263,23.0471831 66.6589579,22.7883803 66.6589579,22.4926056 Z",
                                id: "Fill-31",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M73.3537053,23.8943134 C73.3604421,24.1368486 73.3292842,24.3788556 73.2610737,24.6115669 C73.1183368,25.0306162 72.8303368,25.3841725 72.4494947,25.6077993 C72.0265474,25.8633275 71.5399158,25.9929401 71.0463368,25.981743 C70.0140211,25.981743 69.4979158,25.5447359 69.4979158,24.6708275 C69.4979158,23.6144894 70.1294947,23.0863204 71.3926526,23.0863204 L73.3526526,23.0863204 L73.3537053,23.8943134 Z M71.6210737,18.8070951 C69.8618105,18.8070951 68.8501263,19.5584683 68.5863368,21.0613204 L69.8494947,21.0613204 C69.9800211,20.2301937 70.5568632,19.814419 71.5800211,19.8136796 C72.2164421,19.8136796 72.6726526,19.9376937 72.9484421,20.1856162 C73.2242316,20.4334331 73.3610737,20.8422359 73.3589684,21.411919 L73.3589684,22.1291725 L71.4884421,22.1291725 C69.3031789,22.1291725 68.2101263,22.9968486 68.2094947,24.7320951 C68.2094947,25.4324472 68.4389684,25.98375 68.8989684,26.3831514 C69.3589684,26.7824472 69.9905474,26.9863204 70.7937053,26.9863204 C71.9164421,26.9863204 72.7663368,26.6359331 73.3431789,25.9351585 L73.3747579,26.8193134 L74.6031789,26.8193134 L74.6031789,21.3971303 C74.5989684,19.6697007 73.6048632,18.8063556 71.6210737,18.8070951 Z",
                                id: "Fill-33",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: "translate(0,0)",
                                id: "Clip-36"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                id: "Fill-35",
                                fill: "#00a3e0",
                                points: "77.1463158 26.8183099 78.4210526 26.8183099 78.4210526 15.5491901 77.1463158 15.5491901"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M81.4884211,19.9964894 L80.0147368,19.9964894 L80.0147368,18.9750106 L81.4884211,18.9750106 L81.4884211,16.7820528 L82.7621053,16.7820528 L82.7621053,18.9750106 L84.7515789,18.9750106 L84.7515789,19.9964894 L82.7621053,19.9964894 L82.7621053,24.6718415 C82.7621053,25.1493063 82.8456842,25.4662077 83.0126316,25.6225458 C83.1795789,25.7788838 83.5161053,25.8576866 84.0221053,25.8591655 C84.2967368,25.856419 84.5707368,25.8305387 84.8410526,25.7820528 L84.8410526,26.8183204 C84.5308421,26.8777923 84.2157895,26.9081092 83.9,26.9090599 C82.9995789,26.9090599 82.3726316,26.7566303 82.0189474,26.4517711 C81.6652632,26.146912 81.4897895,25.6088134 81.4926316,24.8376866 L81.4926316,19.9964894 L81.4884211,19.9964894 Z",
                                id: "Fill-37",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M86.5568316,15.549243 L87.8315684,15.549243 L87.8315684,20.0418486 C88.3677789,19.2200176 89.2431474,18.8087852 90.4578842,18.8081514 C92.2178842,18.8081514 93.0978842,19.7119542 93.0978842,21.5197711 L93.0978842,26.8203697 L91.8231474,26.8203697 L91.8231474,22.1228345 C91.8231474,21.3411444 91.6891474,20.7777993 91.4210421,20.4326937 C91.1530421,20.0876937 90.7102,19.915088 90.0926211,19.915088 C89.5916737,19.8967077 89.1002,20.055581 88.7042,20.3640317 C88.3351474,20.6633979 88.0999895,20.9552641 87.9989368,21.2397359 C87.9293579,21.436743 87.8833579,21.6413556 87.8620947,21.8493486 C87.8420947,22.0521655 87.8315684,22.2718838 87.8315684,22.5031162 L87.8315684,26.8141373 L86.5568316,26.8141373 L86.5568316,15.549243 Z",
                                id: "Fill-38",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                id: "Fill-39",
                                fill: "#00a3e0",
                                points: "104.601084 25.7524965 101.170558 17.1326725 101.170558 26.8183415 99.8652947 26.8183415 99.8652947 15.5492218 101.808453 15.5492218 105.314663 24.4584824 108.820032 15.5492218 110.732663 15.5492218 110.732663 26.8183415 109.426347 26.8183415 109.426347 17.1020387 105.996874 25.7524965"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M118.305242,23.8943134 C118.312084,24.1365317 118.282295,24.3784331 118.216821,24.6115669 C118.071032,25.0295599 117.782926,25.3823768 117.403137,25.6077993 C116.979558,25.8636444 116.492084,25.993257 115.997874,25.981743 C114.967663,25.981743 114.452189,25.5447359 114.451663,24.6708275 C114.451663,23.6144894 115.083242,23.0863204 116.3464,23.0863204 L118.304189,23.0863204 L118.305242,23.8943134 Z M116.574821,18.8070951 C114.815453,18.8070951 113.803874,19.5584683 113.539979,21.0613204 L114.803137,21.0613204 C114.933768,20.2301937 115.510505,19.814419 116.533663,19.8136796 C117.172611,19.8136796 117.625242,19.9384331 117.902084,20.1856162 C118.178926,20.4326937 118.310505,20.8436092 118.310505,21.411919 L118.310505,22.1291725 L116.435768,22.1291725 C114.252611,22.1291725 113.160295,22.9968486 113.158926,24.7320951 C113.158926,25.4324472 113.3884,25.98375 113.8484,26.3831514 C114.3084,26.7824472 114.939979,26.9863204 115.743137,26.9863204 C116.865979,26.9863204 117.715768,26.6359331 118.292611,25.9351585 L118.322084,26.8193134 L119.552716,26.8193134 L119.552716,21.3971303 C119.551242,19.6697007 118.558611,18.8063556 116.574821,18.8070951 Z",
                                id: "Fill-40",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M122.069421,18.9750211 L123.314684,18.9750211 L123.345211,20.0419225 C123.901,19.2199859 124.776474,18.8088592 125.971526,18.8081197 C127.731526,18.8081197 128.611842,19.7120282 128.612579,21.5197394 L128.612579,26.8204437 L127.336789,26.8204437 L127.336789,22.1229085 C127.336789,21.3411127 127.203211,20.7777676 126.935737,20.4327676 C126.668368,20.087662 126.225526,19.9150563 125.607316,19.9150563 C125.050158,19.9150563 124.587,20.0647394 124.217842,20.364 C123.848684,20.6633662 123.613316,20.9552324 123.511526,21.2397042 C123.442368,21.4369225 123.396474,21.6414296 123.374684,21.8493169 C123.354789,22.0521338 123.344158,22.2718521 123.344158,22.5030845 L123.344158,26.8141056 L122.069421,26.8141056 L122.069421,18.9750211 Z",
                                id: "Fill-41",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M135.684253,23.8943134 C135.691516,24.136743 135.660884,24.37875 135.593726,24.6115669 C135.450253,25.0301937 135.162358,25.3835387 134.782147,25.6077993 C134.358463,25.8636444 133.871095,25.993257 133.376884,25.981743 C132.346674,25.981743 131.8312,25.5447359 131.830568,24.6708275 C131.830568,23.6144894 132.462147,23.0863204 133.725305,23.0863204 L135.683095,23.0863204 L135.684253,23.8943134 Z M133.953726,18.8070951 C132.194463,18.8070951 131.182779,19.5584683 130.918884,21.0613204 L132.182042,21.0613204 C132.312674,20.2301937 132.889516,19.814419 133.912674,19.8136796 C134.549095,19.8136796 135.005305,19.9376937 135.281095,20.1856162 C135.556884,20.4334331 135.692989,20.8422359 135.689516,21.411919 L135.689516,22.1291725 L133.824253,22.1291725 C131.636884,22.1291725 130.543832,22.9968486 130.545305,24.7320951 C130.545305,25.4324472 130.774674,25.98375 131.234674,26.3831514 C131.694779,26.7824472 132.326358,26.9863204 133.129411,26.9863204 C134.252253,26.9863204 135.102147,26.6359331 135.678989,25.9351585 L135.710568,26.8193134 L136.938989,26.8193134 L136.938989,21.3971303 C136.931937,19.6697007 135.936779,18.8063556 133.953726,18.8070951 Z",
                                id: "Fill-42",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M144.942168,22.981669 C144.942168,23.7619859 144.742484,24.4218803 144.343221,24.9612465 C143.943958,25.5007183 143.378905,25.7699789 142.648484,25.7693451 C141.091221,25.7693451 140.312379,24.8091338 140.311642,22.8887113 C140.311642,20.879662 141.085642,19.8749789 142.633642,19.8749789 C143.352589,19.8749789 143.9148,20.1263873 144.325326,20.6281479 C144.735747,21.1299085 144.941011,21.8249789 144.941011,22.7091338 L144.942168,22.981669 Z M144.942168,18.9740282 L144.912695,19.9658239 C144.324589,19.1912113 143.509853,18.8038521 142.468484,18.8038521 C141.345642,18.8038521 140.483221,19.1542394 139.881116,19.8549085 C139.278905,20.5555775 138.977537,21.5658592 138.976905,22.8855423 C138.976905,24.1356127 139.281116,25.1055423 139.889537,25.7957535 C140.4948,26.4876549 141.341116,26.8320211 142.424274,26.8320211 C143.585642,26.8320211 144.415116,26.4007183 144.912695,25.538007 L144.912695,26.7559648 C144.912695,28.2171972 144.128168,28.9481831 142.558905,28.9489225 C141.384905,28.9489225 140.732274,28.5527958 140.601116,27.7605423 L139.326274,27.7605423 C139.517958,29.2534648 140.595432,29.9999789 142.558905,29.9999789 C143.813011,29.9999789 144.730905,29.7207887 145.312695,29.1623028 C145.894484,28.6039225 146.185326,27.7306479 146.185326,26.5425845 L146.185326,18.9740282 L144.942168,18.9740282 Z",
                                id: "Fill-43",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 161,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M149.617947,22.281338 C149.708368,20.6467606 150.436158,19.8292606 151.801,19.8285211 C153.165947,19.8277817 153.844579,20.645493 153.836895,22.281338 L149.617947,22.281338 Z M155.126368,22.4926056 C155.126368,20.0376761 154.017947,18.8091549 151.801,18.8070423 C150.678263,18.8070423 149.811632,19.1678873 149.201105,19.8897887 C148.590579,20.6115845 148.284263,21.6327465 148.282158,22.953169 C148.282158,25.6432394 149.455105,26.9883803 151.801105,26.9883803 C153.644579,26.9883803 154.712263,26.2165141 155.004263,24.6728873 L153.775842,24.6728873 C153.603105,25.5271479 152.950579,25.9542254 151.817842,25.9542254 C150.349105,25.9542254 149.615737,25.0605634 149.617947,23.2732394 L155.091632,23.2732394 C155.115737,23.0471831 155.126368,22.7883803 155.126368,22.4926056 Z",
                                id: "Fill-44",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 166,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M158.495821,22.5845176 L158.495821,26.8193768 L157.220032,26.8193768 L157.220032,18.9750106 L158.465295,18.9750106 L158.495821,20.041912 C159.001084,19.2199754 159.800347,18.8088486 160.893611,18.8081092 C162.027084,18.8081092 162.765611,19.2904331 163.109505,20.2552923 C163.644874,19.2911725 164.509821,18.8088486 165.704137,18.8081092 C167.3134,18.8081092 168.117505,19.7120176 168.116768,21.5197289 L168.116769,26.8204331 L166.840979,26.8204331 L166.840979,22.1228979 C166.840979,21.3411021 166.722453,20.777757 166.485189,20.432757 C166.248032,20.0876514 165.855821,19.9150458 165.308453,19.9150458 C164.847189,19.9013134 164.400347,20.0771937 164.071611,20.4021232 C163.743189,20.7267359 163.538558,21.0313838 163.457926,21.3158556 C163.388347,21.5125458 163.344768,21.7173697 163.328453,21.9253627 C163.313716,22.1291303 163.306347,22.3478979 163.306347,22.5792359 L163.306347,26.8140951 L162.031611,26.8140951 L162.031611,22.1228979 C162.031611,21.3411021 161.912979,20.777757 161.675821,20.432757 C161.438663,20.0876514 161.046242,19.9150458 160.498874,19.9150458 C160.034663,19.8981444 159.584137,20.0743415 159.253716,20.4021232 C158.930242,20.7267359 158.728137,21.0313838 158.647295,21.3158556 C158.577505,21.5124401 158.534032,21.7173697 158.517926,21.9253627 C158.503189,22.1291303 158.495821,22.3478979 158.495821,22.5792359 L158.495821,22.5845176 Z",
                                id: "Fill-45",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M171.504253,22.281338 C171.592674,20.6467606 172.320358,19.8292606 173.687305,19.8285211 C175.054463,19.8277817 175.732989,20.645493 175.7232,22.281338 L171.504253,22.281338 Z M177.012674,22.4926056 C177.012674,20.0376761 175.904253,18.8091549 173.687305,18.8070423 C172.564568,18.8070423 171.697937,19.1678873 171.087411,19.8897887 C170.476884,20.6115845 170.170568,21.6327465 170.168463,22.953169 C170.168463,25.6432394 171.341411,26.9883803 173.687411,26.9883803 C175.530884,26.9883803 176.598568,26.2165141 176.890568,24.6728873 L175.662147,24.6728873 C175.489411,25.5271479 174.836884,25.9542254 173.704147,25.9542254 C172.235411,25.9542254 171.502042,25.0605634 171.504253,23.2732394 L176.977937,23.2732394 C177.002042,23.0471831 177.012674,22.7883803 177.012674,22.4926056 Z",
                                id: "Fill-46",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M179.107358,18.9750211 L180.352621,18.9750211 L180.383147,20.0419225 C180.939674,19.2199859 181.815147,18.8088592 183.009463,18.8081197 C184.769463,18.8081197 185.649779,19.7120282 185.650516,21.5197394 L185.650516,26.8204437 L184.375779,26.8204437 L184.375779,22.1229085 C184.375779,21.3411127 184.241674,20.7777676 183.973674,20.4327676 C183.705674,20.087662 183.263147,19.9150563 182.646305,19.9150563 C182.089147,19.9150563 181.625989,20.0647394 181.256832,20.364 C180.887674,20.6633662 180.652305,20.9552324 180.550516,21.2397042 C180.481674,21.4370282 180.435779,21.6415352 180.413674,21.8493169 C180.393674,22.0521338 180.383147,22.2718521 180.383147,22.5030845 L180.383147,26.8141056 L179.108411,26.8141056 L179.108411,18.9750211 L179.107358,18.9750211 Z",
                                id: "Fill-47",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M188.592653,19.9964894 L187.118968,19.9964894 L187.118968,18.9750106 L188.592653,18.9750106 L188.592653,16.7820528 L189.867284,16.7820528 L189.867284,18.9750106 L191.855811,18.9750106 L191.855811,19.9964894 L189.867284,19.9964894 L189.867284,24.6718415 C189.867284,25.1493063 189.950863,25.4662077 190.117916,25.6225458 C190.285284,25.7799401 190.621074,25.8591655 191.127389,25.8591655 C191.402021,25.8565246 191.675916,25.8306444 191.946232,25.7820528 L191.946232,26.8183204 C191.636126,26.8777923 191.321074,26.9082148 191.005284,26.9090599 C190.104126,26.9090599 189.476758,26.7566303 189.123179,26.4517711 C188.769495,26.146912 188.594021,25.6088134 188.596863,24.8376866 L188.596863,19.9964894 L188.592653,19.9964894 Z",
                                id: "Fill-48",
                                fill: "#00a3e0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                                lineNumber: 186,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LoginHeaderLogo, "0VTTNJATKABQPGLm9RVT0tKGUgU=");
_c = LoginHeaderLogo;
const __TURBOPACK__default__export__ = LoginHeaderLogo;
var _c;
__turbopack_context__.k.register(_c, "LoginHeaderLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/components/SVG/Envelop.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const Envelop = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "data-test-id": "",
        width: "32",
        height: "32",
        viewBox: "0 0 50 50",
        role: "presentation",
        className: "link-icon",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: "translate(0,0)",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#ffffff",
                    d: "M25,0C11.2,0,0,11.2,0,25c0,13.8,11.2,25,25,25s25-11.2,25-25C50,11.2,38.8,0,25,0z M25,48.8 C11.9,48.8,1.2,38.1,1.2,25C1.2,11.9,11.9,1.2,25,1.2S48.8,11.9,48.8,25C48.8,38.1,38.1,48.8,25,48.8z"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Envelop.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#ffffff",
                    d: "M38.5,20.7C38.5,20.7,38.4,20.6,38.5,20.7c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0h-1.6V9.7 c0-0.3-0.3-0.6-0.6-0.6H14.3c-0.3,0-0.6,0.3-0.6,0.6v10.8h-1.6c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0.1 c0,0-0.1,0.1-0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0.1c0,0,0,0.1-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1v17.4c0,0.3,0.3,0.6,0.7,0.6h26.1 c0.3,0,0.6-0.3,0.6-0.6V21.2C38.8,20.9,38.6,20.8,38.5,20.7z M12.7,22.3l9.9,7.1l-9.9,7.9V22.3z M25.2,28.8L36.4,38H13.7L25.2,28.8 z M27.7,29.4l9.8-7.1v15L27.7,29.4z M14.9,10.3h20.4v12.1l-8.6,6.1l-1.2-1c-0.2-0.2-0.5-0.2-0.8,0l-1.3,1l-8.6-6.1V10.3z"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Envelop.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#ffffff",
                    d: "M25.2,23.4C25.2,23.4,25.2,23.4,25.2,23.4c0.2,0,1.9,0,3.3-0.9c0.3-0.2,0.4-0.6,0.2-0.8 c-0.2-0.3-0.6-0.4-0.8-0.2c-1.2,0.8-2.7,0.8-2.7,0.7c-2.1,0-3.9-1.8-3.9-3.9c0-2.1,1.7-3.9,3.9-3.9c1.7,0,3.2,1,3.5,2.3 c0,0,0,0,0,0c0,0,0,0,0,0c0.3,1.5-0.3,2.4-0.3,2.4c0,0-0.4,0.6-1,0.7c0,0,0,0-0.1,0c0,0,0-0.1,0-0.1l0.4-3.2c0-0.3-0.2-0.6-0.5-0.7 c-0.3,0-0.6,0.2-0.7,0.5c-0.5-0.4-1-0.6-1.7-0.6c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6c0.6,0,1.1-0.2,1.5-0.5 c0.1,0.1,0.1,0.2,0.2,0.3c0.2,0.1,0.4,0.3,0.8,0.3c0.1,0,0.2,0,0.3,0c1.1-0.2,1.7-1.1,1.8-1.2c0-0.1,0.9-1.3,0.5-3.3c0,0,0,0,0,0 c0,0,0,0,0,0c-0.4-1.8-2.5-3.2-4.7-3.2c-2.8,0-5.1,2.3-5.1,5.1C20.1,21.1,22.4,23.4,25.2,23.4z M24.8,19.9c-0.8,0-1.4-0.6-1.4-1.4 c0-0.8,0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4C26.3,19.2,25.6,19.9,24.8,19.9z"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Envelop.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/components/SVG/Envelop.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/components/SVG/Envelop.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Envelop;
const __TURBOPACK__default__export__ = Envelop;
var _c;
__turbopack_context__.k.register(_c, "Envelop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/components/SVG/Faq.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Faq = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "data-test-id": "",
        width: "32",
        height: "32",
        viewBox: "0 0 50 50",
        role: "presentation",
        className: "link-icon",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: "translate(0,0)",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#ffffff",
                    d: "M25,0c-5.4,0-10.6,1.7-15,5C3.7,9.8,0,17.1,0,25c0,0.9,0,1.8,0.1,2.6c0.5,5.1,2.6,9.9,6,13.8 c0,0,0,0.1,0.1,0.1c2.6,3,6,5.4,9.7,6.8c2.9,1.1,5.9,1.7,9,1.7c4.9,0,9.6-1.4,13.6-4c2.6-1.7,4.8-3.8,6.6-6.2 C48.3,35.4,50,30.3,50,25C50,11.2,38.8,0,25,0z M44.2,39c-1.7,2.4-3.8,4.4-6.3,5.9c-3.8,2.5-8.3,3.8-13,3.8c-3,0-5.9-0.5-8.6-1.6 c-3.6-1.4-6.8-3.6-9.3-6.5c0,0,0,0,0,0c-3.2-3.7-5.2-8.2-5.7-13.2c-0.1-0.8-0.1-1.6-0.1-2.5c0-7.6,3.5-14.5,9.5-19.1 c4.1-3.1,9.1-4.7,14.2-4.7c13.1,0,23.8,10.7,23.8,23.8C48.8,30.1,47.2,34.9,44.2,39z"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: "#ffffff",
                    d: "M39.2,15.5C39.2,15.5,39.2,15.5,39.2,15.5l-16.1,0c0,0,0,0,0,0c-0.1,0-0.3-0.1-0.4-0.2l-0.5-0.8 c-0.3-0.5-0.8-0.8-1.4-0.8h-7.3c-0.9,0-1.6,0.7-1.6,1.6V17h-1.2c-0.9,0-1.6,0.7-1.6,1.6v15.9c0,0.9,0.7,1.6,1.6,1.6h25.6 c0.9,0,1.6-0.7,1.6-1.6V33h1.2c0.9,0,1.6-0.7,1.6-1.6V17.2c0-0.4-0.2-0.8-0.5-1.2C40.1,15.7,39.7,15.5,39.2,15.5z M36.8,34.5 c0,0.2-0.2,0.4-0.4,0.4H10.8c-0.2,0-0.4-0.2-0.4-0.4V18.6c0-0.2,0.2-0.4,0.4-0.4h7.3c0.1,0,0.3,0.1,0.4,0.2l0.5,0.8 c0.3,0.5,0.8,0.8,1.4,0.8c0,0,0,0,0,0l16.1,0c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3V34.5z M39.6,31.4c0,0.2-0.2,0.4-0.4,0.4 H38V20.3c0-0.4-0.2-0.8-0.5-1.2c-0.3-0.3-0.7-0.5-1.2-0.5c0,0,0,0,0,0l-16.1,0h0c-0.1,0-0.3-0.1-0.4-0.2l-0.5-0.8 c-0.3-0.5-0.8-0.8-1.4-0.8h-4.9v-1.5c0-0.2,0.2-0.4,0.4-0.4h7.3c0.1,0,0.3,0.1,0.4,0.2l0.5,0.8c0.3,0.5,0.8,0.8,1.4,0.8 c0,0,0,0,0,0l16.1,0c0,0,0,0,0,0c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3V31.4z"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    transform: "translate(0,0)",
                    fill: "#ffffff",
                    cx: "18.2",
                    cy: "27.3",
                    r: "1"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    transform: "translate(0,0)",
                    fill: "#ffffff",
                    cx: "23.6",
                    cy: "27.3",
                    r: "1"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    transform: "translate(0,0)",
                    fill: "#ffffff",
                    cx: "29",
                    cy: "27.3",
                    r: "1"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/components/SVG/Faq.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Faq;
const __TURBOPACK__default__export__ = Faq;
var _c;
__turbopack_context__.k.register(_c, "Faq");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/components/SVG/Slash.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Slash = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "data-test-id": "",
        height: "60",
        width: "60",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 56 56",
        role: "presentation",
        "aria-hidden": "true",
        className: "slash-icon",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M7.83913 7.83715V48.1609H48.1589V7.83715H7.83913ZM0 0H56V56H0V0ZM12.3198 42.5601L33.6008 13.4419H43.6802L22.3992 42.5601H12.3198Z",
            fill: "#ffffff"
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/components/SVG/Slash.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/components/SVG/Slash.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Slash;
const __TURBOPACK__default__export__ = Slash;
var _c;
__turbopack_context__.k.register(_c, "Slash");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$LoginHeaderLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/components/SVG/LoginHeaderLogo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$Envelop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/components/SVG/Envelop.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$Faq$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/components/SVG/Faq.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$Slash$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/app/components/SVG/Slash.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const LoginHeader = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "login-header",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$LoginHeaderLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "header-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/contact-us",
                        className: "header-links",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$Envelop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Contact Us"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/faq",
                        className: "header-links",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$Faq$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "FAQ"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$components$2f$SVG$2f$Slash$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/components/LoginHeader/LoginHeader.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = LoginHeader;
const __TURBOPACK__default__export__ = LoginHeader;
var _c;
__turbopack_context__.k.register(_c, "LoginHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__2bded2cd._.js.map