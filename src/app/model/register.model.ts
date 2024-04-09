import { FormControl } from "@angular/forms";

export interface RegisterModel{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegisterData{
  name: string | null;
  email: string | null;
  password: string | null;
}