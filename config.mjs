const BUILD_CONFIG = {
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    outfile: './dist/index.js',
    loader: {'.svg': 'text'},
    sourcemap: true,
};

export { BUILD_CONFIG };

