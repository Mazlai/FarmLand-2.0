import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FarmInputType } from '../../../enums/farm-input-type';
import { Util } from '../../../classes/util';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'farm-input',
  imports: [
    FormsModule
  ],
  templateUrl: './farm-input.html',
  styleUrl: './farm-input.scss'
})
export class FarmInput {

  //region parameters

  /** Input type. */
  @Input() public type = FarmInputType.TEXT;

  /** Input label. */
  @Input() public label = '';

  /** Additional CSS classes for the input. */
  @Input() public cssClasses = '';

  /** Additional style for the input. */
  @Input() public style = '';

  /** Input value. */
  @Input() public value: any;

  /** If the input is disabled. */
  @Input() public disabled = false;

  /** Notify when the input value changes. */
  @Output() public valueChange = new EventEmitter();

  //endregion

  //region fields

  /** Unique ID for each instance of the component. */
  protected readonly componentId = `farm-input-${Util.generateRandomStringId()}`;

  //endregion

}
