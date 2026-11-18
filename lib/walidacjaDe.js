// Komunikaty natywnej walidacji formularzy po niemiecku (przeglądarka pokazuje je w swoim języku, nie języku strony).
// Użycie: <input required {...WALID_DE} />. Tylko wersja DE.
export const WALID_DE = {
  onInvalid: (e) => {
    const el = e.currentTarget;
    if (el.validity.typeMismatch) el.setCustomValidity('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    else if (el.type === 'checkbox') el.setCustomValidity('Bitte setzen Sie dieses Häkchen, um fortzufahren.');
    else if (el.validity.tooShort) el.setCustomValidity('Der Text ist zu kurz.');
    else el.setCustomValidity('Bitte füllen Sie dieses Feld aus.');
  },
  onInput: (e) => e.currentTarget.setCustomValidity(''),
};
