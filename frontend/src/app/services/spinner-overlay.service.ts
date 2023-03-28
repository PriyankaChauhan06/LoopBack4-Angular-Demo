import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { defer, finalize, NEVER, share } from 'rxjs';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef | any = undefined;

  public readonly spinner$ = defer(() => { this.show(); return NEVER.pipe( finalize(() => { this.hide() }) ) }).pipe(share());

  constructor(private overlay: Overlay) {}

  private show(): void {
    Promise.resolve(null).then(() => {
        if (!this.overlayRef) {
          this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
          });
          this.overlayRef.attach(new ComponentPortal(SpinnerOverlayComponent));
        }
    });
  }

  private hide(): void { if (this.overlayRef) { this.overlayRef.detach(); this.overlayRef = undefined } }
}