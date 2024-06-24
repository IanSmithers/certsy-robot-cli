
const commonPlugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ['./src'], // This must match tsconfig.
            alias: {
                "core": "./src/core", // This is the absolute path, different from tsconfig.
                "types": "./src/types",
                "helpers": "./src/helpers"
            },
        },
    ],
];

module.exports = {
    plugins: [...commonPlugins]
};