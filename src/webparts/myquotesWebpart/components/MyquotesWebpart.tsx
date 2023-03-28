import * as React from 'react';
import { IMyquotesWebpartProps } from './IMyquotesWebpartProps';
import { useEffect, useState} from 'react';
import { IFAQ } from '../../../interface';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { getFAQItems,savefavourite } from '../../../services/myservices';
import styles from './MyquotesWebpart.module.scss';


const _columns =[

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

const Faq = (props:IMyquotesWebpartProps):JSX.Element =>{


  //const LOG_SOURCE = 'My logging';
  
  const [faqItems,setFaqItems ] = useState<IFAQ[]>([]) 
  
  
  
  const getItems = async () :Promise<void>=> {
    const items = getFAQItems(props);
    console.log('My items',items);
    setFaqItems(( await items).map((item:IFAQ) => {
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
getItems().catch(Promise.reject);

},[])


const  faqList: JSX.Element[]=[];
faqItems.forEach((item,index)=>{
  faqList.push( 
  <div className={styles.flexContainer}>
  <div className={styles.card}>
    <div className={styles.cardDetails}>
      <p className={styles.textTitle}> <a href = {JSON.stringify(item.FaqLink)}>{item.Title}</a></p>
      <p className={styles.textBody}>{item.Body}</p>
    </div>
    <button onClick = {() => savefavourite(props,item.Id)} className={styles.cardButton}>Add To favourities</button>
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




