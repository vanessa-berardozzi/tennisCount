const config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/src/components/$1',
		'^@/lib/(.*)$': '<rootDir>/src/lib/$1',
		'^@/types/(.*)$': '<rootDir>/src/types/$1',
		// Séparation des modules CSS pour plus de précision
		'\\.module\\.css$': '<rootDir>/src/__mocks__/styleMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transformIgnorePatterns: ['/node_modules/', '\\.css$'],
};

export default config;
