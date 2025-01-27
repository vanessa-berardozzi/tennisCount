const config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/src/components/$1',
		'^@/lib/(.*)$': '<rootDir>/src/lib/$1',
		'^@/types/(.*)$': '<rootDir>/src/types/$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
