import { newSpecPage } from '@stencil/core/testing';
import { CarouselItem } from '../carousel-item';

describe('carousel-item', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [CarouselItem],
            html: `<carousel-item></carousel-item>`,
        });
        expect(page.root).toEqualHtml(`
      <carousel-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </carousel-item>
    `);
    });
});
