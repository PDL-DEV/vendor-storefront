export class VendorType {
    id: string;
    store_id: string;
    reference: string;
    document: string;
    name: string;
    email: string;
    phone: string;
  
    constructor(object?: Partial<VendorType>) {
      if (!!object) {
        this.id = object.id || null;
        this.store_id = object.store_id || null;
        this.reference = object.reference || null;
        this.document = object.document || null;
        this.name = object.name || null;
        this.email = object.email || null;
        this.phone = object.phone || null;
      }
    }
  }
  