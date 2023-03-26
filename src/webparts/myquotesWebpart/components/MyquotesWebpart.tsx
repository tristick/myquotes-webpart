import * as React from 'react';
import { IMyquotesWebpartProps } from './IMyquotesWebpartProps';
import { useEffect, useState} from 'react';
import { IFAQ } from '../../../interface';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { getFAQItems,savefavourite } from '../../../services/myservices';
import styles from './MyquotesWebpart.module.scss';

let _columns =[

  {
    key:'Title',
    name: 'Title',
    fieldName : 'Title',
    minWidth:50,
    maxWidth:150,
    isResizable:true
  },
  {
    key:'Letter',
    name: 'Letter',
    fieldName : 'Letter',
    minWidth:50,
    maxWidth:150,
    isResizable:true
  }
  
  ]

const Faq = (props:IMyquotesWebpartProps) =>{


  //const LOG_SOURCE = 'My logging';
  
  const [faqItems,setFaqItems ] = useState<IFAQ[]>([]) 
  
  
  
  const getItems = async () => {
    const items = getFAQItems(props);
    console.log('My items',items);
    setFaqItems(( await items).map((item:any) => {
      return {
        Id:item.Id,
        Title:item.Title,
        Body:item.Body,
        Letter:item.Letter,
        FaqLink:item.FaqLink
      }

    }));
}


 useEffect(() =>{
  //run main function
getItems();

},[])


let faqList: JSX.Element[]=[];
faqItems.forEach((item,index)=>{
  faqList.push( 
  <div className={styles['flex-container']}>
  <div className={styles.card}>
    <div className={styles['card-details']}>
      <p className={styles['text-title']}> <a href = {JSON.stringify(item.FaqLink)}>{item.Title}</a></p>
      <p className={styles['text-body']}>{item.Body}</p>
    </div>
    <button onClick = {() => savefavourite(props,item.Id)} className={styles['card-button']}>Add To favourities</button>
  </div></div>)})



return (
  <>
  
  <p><pre>{JSON.stringify(faqItems,null,2)}</pre></p>
  {faqList}
  <DetailsList
            items={faqItems}
            columns={_columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode = {SelectionMode.none}
          
  />
   
          
  </>
)
}

export default Faq




