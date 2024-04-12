export interface IPost<C> {
  likes: String[];
  image: string;
  imageDescription: string;
  imageName: string;
  uploadedBy: string;
  uploadedByUserId: string;
  comments: C;
  __v: number;
  _id: string;
}
export class GetALLPostC {
  image: string = "";
  imageDescription: string = '';
  imageName: string = '';
  uploadedBy: string = '';
  uploadedByUserId: string = '';
  comments: CComment[] = [];
  __v: number = 0;
  _id: string = '';
}

export interface IComment {
  _id: string;
  by: string;
  comment: string;
  userId: string;
}

export class CComment {
  _id: string = "";
  by: string = "";
  comment: string = "";
  userId: string = "";
}