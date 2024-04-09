import { FormControl } from "@angular/forms";

export interface ImageModel{
  image: FormControl<string | null>;
  imageName: FormControl<string | null>;
  imageDescription: FormControl<string | null>;
}

export interface ImageFormData{
  image: string | null;
  imageName: string | null;
  imageDescription: string | null;
}