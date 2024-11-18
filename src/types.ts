export interface IContactFormState{
  name:string,
  phone:string,
  mail:string,
  photo:string
}

export interface IAllContactsState extends IContactFormState{
  id:string
}
