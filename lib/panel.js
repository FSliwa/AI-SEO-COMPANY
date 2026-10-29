// Adresy panelu klienta (panel.ai-seo-company.pl). Demo otwiera panel fikcyjnej
// „Stolarni Demo” bez logowania; parametry UTM odróżniają wejścia ze strony.
const PANEL_URL = process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl';

export const PANEL_LOGIN_URL = `${PANEL_URL}/logowanie`;
export const PANEL_DEMO_URL = `${PANEL_URL}/demo?utm_source=strona&utm_medium=referral&utm_campaign=panel_demo`;
