import { App } from './app';

describe('App', () => {

  it('should be defined', () => {
    expect(App).toBeDefined();
  });

  it('should have title set to "frontend"', () => {
    const app = new App();
    expect((app as any).title).toBe('frontend');
  });

});