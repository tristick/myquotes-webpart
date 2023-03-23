import { SPFI } from "@pnp/sp";
import { getSP } from "../pnpjsConfig";
import { IMyquotesWebpartProps } from "../webparts/myquotesWebpart/components/IMyquotesWebpartProps";



const LIST_NAME = 'FAQ';


export const getFAQItems = async (props:IMyquotesWebpartProps) => {
    let _sp : SPFI =getSP(props.context) ;
  const items =_sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('Letter',true).orderBy('Title',true)();
  console.log('FAQ items',items);
  return items;
    
    
}

