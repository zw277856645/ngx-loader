import { Directive, ElementRef, Injector, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { InputBoolean } from '@demacia/cmjs-lib';

@Directive({
    selector: '[onlyNumber][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: OnlyNumberDirective,
            multi: true
        }
    ]
})
export class OnlyNumberDirective implements Validator, OnInit, OnChanges {

    @Input() @InputBoolean() positive: boolean = false;
    @Input() onlyNumber: string;
    @Input() min: number;
    @Input() max: number;

    private replaceReg: RegExp;
    private ctrl: AbstractControl;

    constructor(private ele: ElementRef,
                private injector: Injector,
                private render: Renderer2) {
        // only firefox and ie
        this.render.setStyle(this.ele.nativeElement, 'ime-mode', 'disabled');
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes.min && !changes.min.firstChange)
            || (changes.max && !changes.max.firstChange)
            && this.ctrl) {
            this.ctrl.updateValueAndValidity();
        }
    }

    ngOnInit() {
        if (!this.onlyNumber || this.onlyNumber === 'int') {
            if (this.positive) {
                this.replaceReg = /[^\d]/g;
            } else {
                this.replaceReg = /[^-\d]/g;
            }
        } else {
            if (this.positive) {
                this.replaceReg = /[^\d\.]/g;
            } else {
                this.replaceReg = /[^-\d\.]/g;
            }
        }

        let ngModel = this.injector.get(NgControl);
        if (ngModel) {
            ngModel.valueChanges.subscribe((value: any) => {
                if (value && this.replaceReg.test(value)) {
                    ngModel.control.setValue(value.replace(this.replaceReg, ''));
                }
            });
        }
    }

    validate(c: AbstractControl): ValidationErrors | null {
        if (!this.ctrl) {
            this.ctrl = c;
        }

        if (isNullOrUndefined(this.min) && isNullOrUndefined(this.max)) {
            return null;
        }

        let v = isNullOrUndefined(c.value) ? '' : String(c.value).trim();

        if (!v) {
            return null;
        }

        let n = parseFloat(v);

        if (typeof n !== 'number') {
            return null;
        }

        if (!isNullOrUndefined(this.min)) {
            let min = parseFloat(String(this.min));
            if (n < min) {
                return { min: true };
            }
        }
        if (!isNullOrUndefined(this.max)) {
            let max = parseFloat(String(this.max));
            if (n > max) {
                return { max: true };
            }
        }

        return null;
    }

}
