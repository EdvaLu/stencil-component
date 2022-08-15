import { newSpecPage } from '@stencil/core/testing';
import { CarouselContainer } from '../carousel-container';

describe('carousel-container', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [CarouselContainer],
            html: `<carousel-container></carousel-container>`,
        });
        expect(page.root).toEqualHtml(`
      <carousel-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </carousel-container>
    `);
    });
});
