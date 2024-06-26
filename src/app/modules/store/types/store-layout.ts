export class StoreLayout {
  primary_color: string;
  secondary_color: string;
  logotipo_url: string;

  constructor(object?: Partial<StoreLayout>) {
    if (!!object) {
      this.primary_color = object?.primary_color || null;
      this.secondary_color = object?.secondary_color || null;
      this.logotipo_url = object?.logotipo_url || null;
    }
  }
}
