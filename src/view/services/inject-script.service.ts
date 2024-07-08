import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { filter } from 'rxjs';
import { ScriptsPath } from '../../enums/scripts-path.enum';


declare let $: any;
const commonScripts = [
  'dropdown-bootstrap-extended.js',
  'feather.min.js',
  'chips-init.js',
  'init.js',
];

@Injectable()
export class InjectScriptService {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  inject(): void {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof ActivationStart
        )
      )
      .subscribe((event: any) => {
        for (const common of commonScripts) {
          $(document).ready(() => {
            $.getScript(`${ScriptsPath.ASSETS_JS}/${common}`);
          });
        }

        if (event instanceof ActivationStart) {
          const { jsScripts } = event.snapshot.data;
          if (!jsScripts) {
            return;
          }

          for (const script of jsScripts) {
            $(document).ready(() => {
              $.getScript(`${ScriptsPath.ASSETS_JS}/${script}`);
            });
          }
        }
      });
  }
}
