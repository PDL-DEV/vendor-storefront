import { BypassHtmlSanitizerPipe } from './bypass-html-sanitizer.pipe';

describe('BypassHtmlSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new BypassHtmlSanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
