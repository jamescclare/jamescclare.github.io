import { BUILD_CONFIG } from "./config.mjs"
import * as esbuild from 'esbuild'

await esbuild.build(BUILD_CONFIG)
