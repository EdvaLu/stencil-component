import { Component, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';
import { CarouselItem } from '../../models/carousel/carousel.model';

@Component({
    tag: 'carousel-container',
    styleUrl: 'carousel-container.scss',
    shadow: true
})
export class CarouselContainer {

    private timer: ReturnType<typeof setInterval>;

    @Prop() items!: Array<CarouselItem>;
    @Prop() autoPlayInterval?: number;

    // Boolean that indicates visibility of "Next" and "Prev" buttons
    @Prop() showNavButtons: boolean = true;
    // Boolean that indicates visibility of dots/bullets/indicators
    @Prop() showNavDots: boolean = true;
    @Prop() showStopStartButton: boolean = true;

    @State() selectedItem!: CarouselItem;
    @State() stopAutoPlay: boolean = false;

    @Listen('clickImage')
    onClickImage(_event: CustomEvent): void {
        // TODO: Your logic
    }

    @Event() clickNextPrevButton: EventEmitter<{type: string, item: CarouselItem}>;
    @Event() clickDotButton: EventEmitter<CarouselItem>;

    componentWillLoad() {
        this.selectedItem = this.items[0];
        if (this.autoPlayInterval) this.timer = setInterval(() => this.next('autoPlay'), this.autoPlayInterval);
    }

    disconnectedCallback() {
        if (this.autoPlayInterval) clearInterval(this.timer);
    }

    resetPlayback(): void {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.next('autoPlay'), this.autoPlayInterval);
    }

    onStopAutoPlayback(): void {
        (this.stopAutoPlay = !this.stopAutoPlay) ? clearInterval(this.timer) : this.resetPlayback();
    }

    previous(): void {
        const currentIndex = (this.items as CarouselItem[]).findIndex(item => item === this.selectedItem);
        if (this.selectedItem === this.items[0]) {
            this.selectedItem = this.items[this.items.length - 1];
        } else {
            this.selectedItem = this.items[currentIndex - 1];
        }
        this.resetPlayback();
        this.clickNextPrevButton.emit({type: 'prev', item: this.selectedItem});
    }

    next(type?: string): void {
        const currentIndex = (this.items as CarouselItem[]).findIndex(item => item === this.selectedItem);
        if (this.selectedItem === this.items[this.items.length - 1]) {
            this.selectedItem = this.items[0];
        } else {
            this.selectedItem = this.items[currentIndex + 1];
        }
        this.resetPlayback();
        if (type !== 'autoPlay') this.clickNextPrevButton.emit({type: 'next', item: this.selectedItem});
    }

    // dots/bullets/indicators
    onDotClick(item: CarouselItem): void {
        this.selectedItem = item;
        this.resetPlayback();
        this.clickDotButton.emit(item);
    }

    render() {
        return (
            <division>
                <section>
                    <carousel-item selectedItem={this.selectedItem}></carousel-item>
                </section>
                <section class="carousel-actions">
                    {this.showNavButtons ? 
                        <button 
                            aria-label="Previous slide" 
                            onClick={this.previous.bind(this)}>
                                Prev
                            </button>
                        : null}

                    {this.showNavDots ?
                            <division>
                                { this.items.map(item =>
                                    <a
                                        class={this.selectedItem === item ? 'dot active' : 'dot'}
                                        onClick={() => this.onDotClick(item)}
                                        aria-label={item.altText}
                                    ></a> )}
                            </division>
                        : null}

                    {this.showNavButtons ?
                            <button
                                aria-label="Next slide"
                                onClick={this.next.bind(this)}>
                                    Next
                            </button>
                        : null}

                    {this.showStopStartButton ? 
                            <button 
                                aria-label={this.stopAutoPlay ? 'Start autoplay' : 'Stop autoplay'} 
                                onClick={this.onStopAutoPlayback.bind(this)}>
                                {this.stopAutoPlay ? 'Start' : 'Stop'}
                            </button>
                        : null}
                </section>
            </division>
        );
    }

}