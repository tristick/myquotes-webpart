import { SPFI } from "@pnp/sp";


import { Itspanelprops } from "../extensions/mypanel/component/Itspanelprops";
import { IFAQ, Ifavouriteitem } from "../interface";


import { getSP, getSPext } from "../pnpjsConfig";
import { IMyquotesWebpartProps } from "../webparts/myquotesWebpart/components/IMyquotesWebpartProps";



const LIST_NAME = 'FAQ';



export const getFAQItems= async (props:IMyquotesWebpartProps):Promise<IFAQ[]>=> {
  const _sp :SPFI = getSP(props.context) ;
  const items =_sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('Letter',true).orderBy('Title',true)();
  console.log('FAQ items',items);
  return items;
    
    
}

export const savefavourite =async (props:IMyquotesWebpartProps,appid: number):Promise<void>=>{
  const _sp :SPFI = getSP(props.context) ;

  const iar = _sp.web.lists.getByTitle('Favouriteitem').items.add({
    Title: props.userDisplayName,
    appID: String(appid)
  });
  console.log('Item added',iar);
}

export const getFavIds = async (props:Itspanelprops): Promise<Ifavouriteitem[]>  => {
  const _sp :SPFI = getSPext(props.contextext) ;
  
  const user = props.userDisplayName
  const items =_sp.web.lists.getByTitle('Favouriteitem').items.select().filter("Title eq '"+user+"'")();
  console.log('My fav items',items)
  return items;
    
    
}

