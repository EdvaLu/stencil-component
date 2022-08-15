import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { CarouselItem as Item } from '../../models/carousel/carousel.model';

@Component({
    tag: 'carousel-item',
    styleUrl: 'carousel-item.scss',
    shadow: true
})
export class CarouselItem {

    @Prop() selectedItem: Item;

    @Event() clickImage: EventEmitter<void>;

    onClickImage(): void {
        this.clickImage.emit();
    }

    render() {
        return <img
                src={this.selectedItem.image}
                alt={this.selectedItem?.altText ?? this.selectedItem.altText}
                onClick={this.onClickImage.bind(this)} />
    }

}
