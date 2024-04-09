export interface ResponseGeneric<T>{
  status: string;
  message: string;
  data: T
}