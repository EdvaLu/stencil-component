import { newE2EPage } from '@stencil/core/testing';

describe('carousel-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<carousel-item></carousel-item>');

        const element = await page.find('carousel-item');
        expect(element).toHaveClass('hydrated');
    });
});
