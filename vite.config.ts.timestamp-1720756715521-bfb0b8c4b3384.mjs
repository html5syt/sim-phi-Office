var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "sim-phi-vite",
      private: true,
      version: "1.5.9",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc && vite build && node scripts/build.js",
        preview: "vite preview",
        "eslint:check": "eslint --ext .js,.ts src",
        "eslint:format": 'eslint --fix "src/**/*.{js,ts}"',
        validate: "office-toolbox validate -m manifest.xml"
      },
      dependencies: {
        "@sim-phi/extends": "^0.3.4",
        jszip: "^3.10.1",
        md5: "^2.3.0",
        "stackblur-canvas": "^2.7.0",
        "office-toolbox": "^0.1.1"
      },
      devDependencies: {
        "@babel/plugin-transform-nullish-coalescing-operator": "^7.24.1",
        "@rollup/plugin-babel": "^6.0.4",
        "@rollup/plugin-terser": "^0.4.4",
        "@stylistic/eslint-plugin": "^1.7.0",
        "@types/eslint": "^8.56.9",
        "@types/md5": "^2.3.5",
        "@types/prompts": "^2.4.9",
        "@typescript-eslint/eslint-plugin": "^7.6.0",
        "@typescript-eslint/parser": "^7.6.0",
        eslint: "^8.57.0",
        "eslint-plugin-rulesdir": "^0.2.2",
        picocolors: "^1.0.0",
        prompts: "^2.4.2",
        "ts-node": "^10.9.2",
        typescript: "^5.5.3",
        vite: "^5.2.8"
      }
    };
  }
});

// vite.config.ts
import { defineConfig } from "file:///D:/desktop/Phigros/sim-phi/sim-phi/node_modules/vite/dist/node/index.js";
import terser from "file:///D:/desktop/Phigros/sim-phi/sim-phi/node_modules/@rollup/plugin-terser/dist/es/index.js";
import { getBabelOutputPlugin } from "file:///D:/desktop/Phigros/sim-phi/sim-phi/node_modules/@rollup/plugin-babel/dist/es/index.js";
var pkg = require_package();
var vite_config_default = defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "SimPhiVite",
      formats: ["es"],
      fileName: `script-${pkg.version}`
    },
    sourcemap: true,
    cssTarget: "chrome61",
    rollupOptions: {
      external: [/^\/utils\//],
      output: {
        plugins: [
          getBabelOutputPlugin({
            plugins: [["@babel/plugin-transform-nullish-coalescing-operator"]]
          }),
          terser({ compress: { passes: 3 } })
        ]
      }
    }
  },
  preview: {
    host: true,
    port: 2085
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZS5qc29uIiwgInZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XHJcbiAgXCJuYW1lXCI6IFwic2ltLXBoaS12aXRlXCIsXHJcbiAgXCJwcml2YXRlXCI6IHRydWUsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMS41LjlcIixcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGQgJiYgbm9kZSBzY3JpcHRzL2J1aWxkLmpzXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcclxuICAgIFwiZXNsaW50OmNoZWNrXCI6IFwiZXNsaW50IC0tZXh0IC5qcywudHMgc3JjXCIsXHJcbiAgICBcImVzbGludDpmb3JtYXRcIjogXCJlc2xpbnQgLS1maXggXFxcInNyYy8qKi8qLntqcyx0c31cXFwiXCIsXHJcbiAgICBcInZhbGlkYXRlXCI6IFwib2ZmaWNlLXRvb2xib3ggdmFsaWRhdGUgLW0gbWFuaWZlc3QueG1sXCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHNpbS1waGkvZXh0ZW5kc1wiOiBcIl4wLjMuNFwiLFxyXG4gICAgXCJqc3ppcFwiOiBcIl4zLjEwLjFcIixcclxuICAgIFwibWQ1XCI6IFwiXjIuMy4wXCIsXHJcbiAgICBcInN0YWNrYmx1ci1jYW52YXNcIjogXCJeMi43LjBcIixcclxuICAgIFwib2ZmaWNlLXRvb2xib3hcIjogXCJeMC4xLjFcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1udWxsaXNoLWNvYWxlc2Npbmctb3BlcmF0b3JcIjogXCJeNy4yNC4xXCIsXHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLWJhYmVsXCI6IFwiXjYuMC40XCIsXHJcbiAgICBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiOiBcIl4wLjQuNFwiLFxyXG4gICAgXCJAc3R5bGlzdGljL2VzbGludC1wbHVnaW5cIjogXCJeMS43LjBcIixcclxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIl44LjU2LjlcIixcclxuICAgIFwiQHR5cGVzL21kNVwiOiBcIl4yLjMuNVwiLFxyXG4gICAgXCJAdHlwZXMvcHJvbXB0c1wiOiBcIl4yLjQuOVwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjYuMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuNi4wXCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1ydWxlc2RpclwiOiBcIl4wLjIuMlwiLFxyXG4gICAgXCJwaWNvY29sb3JzXCI6IFwiXjEuMC4wXCIsXHJcbiAgICBcInByb21wdHNcIjogXCJeMi40LjJcIixcclxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjJcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjUuM1wiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi44XCJcclxuXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZGVza3RvcFxcXFxQaGlncm9zXFxcXHNpbS1waGlcXFxcc2ltLXBoaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZGVza3RvcFxcXFxQaGlncm9zXFxcXHNpbS1waGlcXFxcc2ltLXBoaVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZGVza3RvcC9QaGlncm9zL3NpbS1waGkvc2ltLXBoaS92aXRlLmNvbmZpZy50c1wiOy8qIGVzbGludC1kaXNhYmxlICovXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdGVyc2VyIGZyb20gJ0Byb2xsdXAvcGx1Z2luLXRlcnNlcic7XHJcbmltcG9ydCB7IGdldEJhYmVsT3V0cHV0UGx1Z2luIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tYmFiZWwnO1xyXG5pbXBvcnQgcGtnID0gcmVxdWlyZSgnLi9wYWNrYWdlLmpzb24nKTtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiAnLi8nLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogJy9zcmMnXHJcbiAgICB9XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcclxuICAgICAgbmFtZTogJ1NpbVBoaVZpdGUnLFxyXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXHJcbiAgICAgIGZpbGVOYW1lOiBgc2NyaXB0LSR7cGtnLnZlcnNpb259YFxyXG4gICAgfSxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIGNzc1RhcmdldDogJ2Nocm9tZTYxJyxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsvXlxcL3V0aWxzXFwvL10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIGdldEJhYmVsT3V0cHV0UGx1Z2luKHtcclxuICAgICAgICAgICAgcGx1Z2luczogW1snQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tbnVsbGlzaC1jb2FsZXNjaW5nLW9wZXJhdG9yJ11dXHJcbiAgICAgICAgICB9KSxcclxuICAgICAgICAgIHRlcnNlcih7IGNvbXByZXNzOiB7IHBhc3NlczogMyB9IH0pXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcmV2aWV3OiB7XHJcbiAgICBob3N0OiB0cnVlLFxyXG4gICAgcG9ydDogMjA4NVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLE1BQ1gsU0FBVztBQUFBLE1BQ1gsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLFFBQ1QsS0FBTztBQUFBLFFBQ1AsT0FBUztBQUFBLFFBQ1QsU0FBVztBQUFBLFFBQ1gsZ0JBQWdCO0FBQUEsUUFDaEIsaUJBQWlCO0FBQUEsUUFDakIsVUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLGNBQWdCO0FBQUEsUUFDZCxvQkFBb0I7QUFBQSxRQUNwQixPQUFTO0FBQUEsUUFDVCxLQUFPO0FBQUEsUUFDUCxvQkFBb0I7QUFBQSxRQUNwQixrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsaUJBQW1CO0FBQUEsUUFDakIsdURBQXVEO0FBQUEsUUFDdkQsd0JBQXdCO0FBQUEsUUFDeEIseUJBQXlCO0FBQUEsUUFDekIsNEJBQTRCO0FBQUEsUUFDNUIsaUJBQWlCO0FBQUEsUUFDakIsY0FBYztBQUFBLFFBQ2Qsa0JBQWtCO0FBQUEsUUFDbEIsb0NBQW9DO0FBQUEsUUFDcEMsNkJBQTZCO0FBQUEsUUFDN0IsUUFBVTtBQUFBLFFBQ1YsMEJBQTBCO0FBQUEsUUFDMUIsWUFBYztBQUFBLFFBQ2QsU0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsWUFBYztBQUFBLFFBQ2QsTUFBUTtBQUFBLE1BRVY7QUFBQSxJQUNGO0FBQUE7QUFBQTs7O0FDdENBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDRCQUE0QjtBQUNyQyxJQUFPLE1BQU07QUFDYixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxVQUFVLFVBQVUsSUFBSSxPQUFPO0FBQUEsSUFDakM7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxZQUFZO0FBQUEsTUFDdkIsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AscUJBQXFCO0FBQUEsWUFDbkIsU0FBUyxDQUFDLENBQUMscURBQXFELENBQUM7QUFBQSxVQUNuRSxDQUFDO0FBQUEsVUFDRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7QUFBQSxRQUNwQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
