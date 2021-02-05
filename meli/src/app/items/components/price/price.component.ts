import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const sizes = {
  base: ['app-price--default'],
  large: ['app-price--large']
};

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {

  DECIMAL_SEPARATOR = ',';
  THOUSAND_SEPARATOR = '.';
  MIN_VALUE_TO_FORMAT = 1000;

  @Input() set size(value: keyof typeof sizes) {
    this._size = (sizes[value] || []).join(' ');
  }
  _size = 'default';
  @Input() set currency(currency: string) {
    if (currency === 'ARS') {
      this._currency = '$';
    } else {
      this._currency = currency;
    }
  }
  _currency = '$';
  _amount: number;
  @Input()
  set amount(amount: number) {
    this._amount = amount;
  }
  get amount() {
    return this._amount;
  }
  @Input() decimals = 2;

  get amountFormatted() {
    if (this.amount !== undefined) {
      const sign = this.amount < 0 ? '-' : '';
      const amountTruncated = Math.abs(Math.trunc(this.amount));
      if (amountTruncated >= this.MIN_VALUE_TO_FORMAT) {
        return sign + this.formatThousandNumber(amountTruncated);
      }
      return sign + amountTruncated;
    }
    return '';
  }

  get decimalFormatted() {
    if (this.amount !== undefined && this.decimals > 0) {
      const stringAmount = this.amount.toString();
      const decimalsPosition = stringAmount.indexOf('.');
      if (decimalsPosition > 0) {
        const decimalPart = stringAmount.substring(
          decimalsPosition + 1,
          stringAmount.length
        );
        if (decimalPart.length >= this.decimals) {
          return (
            this.DECIMAL_SEPARATOR + decimalPart.substring(0, this.decimals)
          );
        } else {
          return this.DECIMAL_SEPARATOR + this.addZeros(decimalPart);
        }
      } else {
        return this.DECIMAL_SEPARATOR + this.addZeros('');
      }
    }
    return '';
  }

  private formatThousandNumber(number: number) {
    return number
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + this.THOUSAND_SEPARATOR);
  }

  private addZeros(decimalPart: string) {
    const diff = this.decimals - decimalPart.length;
    for (let i = 0; i < diff; i++) {
      decimalPart += '0';
    }
    return decimalPart;
  }

}
