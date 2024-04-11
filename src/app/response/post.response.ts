export interface GetALLPost{
  likes: String[];
  image: string;
  imageDescription: string;
  imageName: string;
  uploadedBy: string;
  uploadedByUserId: string;
  __v: number;
  _id: string;
}
export class GetALLPostC{
  image: string = "";
  imageDescription: string = '';
  imageName: string = '';
  uploadedBy: string =  '';
  uploadedByUserId: string = '';
  __v: number = 0;
  _id: string = '';
}