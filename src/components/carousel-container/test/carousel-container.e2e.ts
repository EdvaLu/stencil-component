import { newE2EPage } from '@stencil/core/testing';

describe('carousel-container', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<carousel-container></carousel-container>');

        const element = await page.find('carousel-container');
        expect(element).toHaveClass('hydrated');
    });
});
