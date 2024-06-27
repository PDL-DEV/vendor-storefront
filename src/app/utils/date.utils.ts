export class DateUtils {
  public getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  }

  static getDateInFuture(minutes: number): Date {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);

    return date;
  }

  static formatSummaryDate(dateParam: Date): string {
    try {
      const months = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];
      const date = new Date(dateParam);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    } catch (error) {
      return '-';
    }
  }
}
