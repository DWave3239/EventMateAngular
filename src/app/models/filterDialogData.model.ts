export class FilterDialogData {
  options: string[];
  distance: number;
  types: string[];
  selectedTypes: string[];
  fromDate: Date;
  toDate: Date;
  enabled: boolean;
  locationString: string;
}

export declare type Items = Item[];

export interface Item {
  displayName : String;
}

export interface LocationResponse {
  items : Items;
}
