import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FarmButtonKind } from '../../../enums/farm-button-kind';

@Component({
  selector: 'farm-button',
  imports: [],
  templateUrl: './farm-button.html',
  styleUrl: './farm-button.scss'
})
export class FarmButton {

  //region parameters

  /** If the button is used to submit a form. */
  @Input() public isSubmit = false;

  /** Button label. */
  @Input() public label = '';

  /** Button kind (primary, secondary, etc.). */
  @Input() public kind = FarmButtonKind.PRIMARY;

  /** Additional CSS classes for the button. */
  @Input() public cssClasses = '';

  /** Additional style for the button. */
  @Input() public style = '';

  /** If the input is disabled. */
  @Input() public disabled = false;

  /** Display a loading spinner if set to true. */
  @Input() public isLoading = false;

  /** Notify when the button is clicked. */
  @Output() public onClick = new EventEmitter();

  //endregion

}
