import { BUILD_CONFIG } from "./config.mjs"
import * as esbuild from 'esbuild'

try {
    const context = await esbuild.context(BUILD_CONFIG);
    await context.watch();
    console.log('Watching code for changes...');
} catch (e) {
    console.error(e);
};
