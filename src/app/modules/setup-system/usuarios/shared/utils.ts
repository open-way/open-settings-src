export const DAYS: any[] = [
    { index: 0, name: 'Domingo' },
    { index: 1, name: 'Lunes' },
    { index: 2, name: 'Martes' },
    { index: 3, name: 'Miércoles' },
    { index: 4, name: 'Jueves' },
    { index: 5, name: 'Viernes' },
    { index: 6, name: 'Sábado' },
];

export const MONTHS: any[] = [
    { index: 1, name: 'Enero' },
    { index: 2, name: 'Febrero' },
    { index: 3, name: 'Marzo' },
    { index: 4, name: 'Abril' },
    { index: 5, name: 'Mayo' },
    { index: 6, name: 'Junio' },
    { index: 7, name: 'Julio' },
    { index: 8, name: 'Agosto' },
    { index: 9, name: 'Septiembre' },
    { index: 10, name: 'Octubre' },
    { index: 11, name: 'Noviembre' },
    { index: 12, name: 'Diciembre' },
];

export function getDateToday() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const datobj = DAYS[today.getDay()];
    return `${datobj.name} - ${dd}/${mm}/${yyyy}`;
}
