/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import eslintPlugin from "vite-plugin-eslint";
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: "packages",
      outputDir: "lib/types",
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "packages/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    eslintPlugin({
      include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "examples"),
    },
    dedupe: ["vue"],
  },
  // 单元测试配置
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
  // rollup打包配置
  build: {
    outDir: "lib", //输出文件名称
    lib: {
      entry: path.resolve(__dirname, "./packages/index.ts"), //指定组件编译入口文件
      name: "k-designer",
      // formats: ["es"],
      fileName: "k-designer",
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
