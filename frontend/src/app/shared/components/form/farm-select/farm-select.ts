import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'farm-select',
  imports: [
    FormsModule
  ],
  templateUrl: './farm-select.html',
  styleUrl: './farm-select.scss'
})
export class FarmSelect {

  //region parameters

  /** Select label. */
  @Input() public label = '';

  /** Additional CSS classes for the select. */
  @Input() public cssClasses = '';

  /** Additional style for the select. */
  @Input() public style = '';

  /** Selected value. */
  @Input() public value: any;

  /** If the input is disabled. */
  @Input() public disabled = false;

  /** Selectable values. */
  @Input() public selectableValues = new Array<{label: string, value: any}>();

  /** Notify when the select value changes. */
  @Output() public valueChange = new EventEmitter();

  //endregion

}
