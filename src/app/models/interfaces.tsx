const sample = () => 1;
const sample2 = () => 1;

export interface TypeOfInputs {
  name: RegExp;
  surname: RegExp;
  birth: RegExp;
  country: RegExp;
  city: RegExp;
  address: RegExp;
  email: RegExp;
  password: RegExp;
  zip: RegExp;
  number: RegExp;
}
export interface TypeItem {
  prop: string;
  type: string;
  index: number;
  dataD: Array<boolean>;
  dataE: Array<string>;
  stor: Array<string>;
  onB: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onC: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default { sample, sample2 };
