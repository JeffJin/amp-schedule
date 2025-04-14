import { Pipe } from '@angular/core';

@Pipe({
  name: 'showFilter'
  // pure: false
})

export class ShowPipe {
  transform(value: any[]) {
    value = value.filter(item => {
      return item.visible == true;
    });
    return value; //only impure works
  }
}
