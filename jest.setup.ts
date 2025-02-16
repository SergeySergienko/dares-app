import '@testing-library/jest-dom';

jest.mock('lucide-react', () => {
  return new Proxy(
    {},
    {
      get: (_, iconName) => () => iconName,
    }
  );
});
