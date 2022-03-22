import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {carouselItem} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {CarouselService} from "../carousel.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  data: carouselItem[] = []
  item!: carouselItem
  currentSlide = 0;
  @Output() slideEmit = new EventEmitter<string>()

  constructor(
    private http: HttpClient,
    public carouselService: CarouselService
  ) {}

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.http.get<carouselItem[]>('assets/carousel.json').subscribe(data => {
      this.data = data
    })
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.data.length - 1 : previous;
    this.onEmitTheme(this.currentSlide)
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.data.length ? 0 : next;
    this.onEmitTheme(this.currentSlide)
  }

  onEmitTheme(currentSlide: number) {
    if (currentSlide >= 0 && currentSlide <= 10) {
      this.slideEmit.emit('day')
    } else if (currentSlide >= 11 && currentSlide <= 20) {
      this.slideEmit.emit('night')
    } else {
      this.slideEmit.emit('insane')
    }
  }

}
