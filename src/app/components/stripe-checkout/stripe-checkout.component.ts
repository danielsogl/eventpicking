import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  Input
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ng-mdb-pro/free/modals/modal.directive';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.scss']
})
export class StripeCheckoutComponent implements AfterViewInit, OnDestroy {
  @Input() item: any;
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @ViewChild('modal') public modal: ModalDirective;

  public isModalShown = false;
  public card: any;
  public cardHandler = this.onChange.bind(this);
  public error: string;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }
  }

  public showModal(): void {
    this.modal.show();
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.modal.hide();
  }
}
