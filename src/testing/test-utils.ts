import { Spectator } from '@ngneat/spectator/jest';

export function getControl<T>(spectator: Spectator<T>, name: string) {
  return spectator.query(`[formControlName="${name}"]`)!;
}

export function typeInControl<T>(spectator: Spectator<T>, name: string, text: string) {
  const element = getControl(spectator, name);
  if (element) {
    spectator.typeInElement(text, element);
  }
}

export function getNearestInputError<T>(spectator: Spectator<T>, name: string) {
  return spectator.query(`[formControlName="${name}"]+ngx-error-message .error-message`);
}

export function addNewTagItem<T>(spectator: Spectator<T>, text: string | string[], parentSelector: string = '') {
  if (Array.isArray(text)) {
    text.forEach((item) => addNewTagItem(spectator, item, parentSelector));
  } else {
    const tagInput = spectator.query(`${parentSelector} .ng2-tag-input__text-input`);
    if (tagInput) {
      spectator.typeInElement(text, tagInput);
      spectator.dispatchKeyboardEvent(tagInput, 'keydown', 'Enter');
      spectator.detectChanges();
    }
  }
}
