import '@testing-library/jest-dom';

// Globally mock lucide-react library for tests due to them not being handled correctly
jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: (_, iconName) => () => iconName,
    }
  );
});
