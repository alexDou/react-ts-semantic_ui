module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?|tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    "moduleNameMapper": {
        '@t(.*)$': '<rootDir>/src/typings/$1',
        '@components(.*)$': '<rootDir>/src/components/$1',
        '@containers(.*)$': '<rootDir>/src/containers/$1',
        '^@store(.*)$': '<rootDir>/src/store/$1',
        '@api(.*)$': '<rootDir>/src/api/$1',
        '@helpers(.*)$': '<rootDir>/src/helpers/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],
};
