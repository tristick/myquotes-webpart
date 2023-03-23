import * as React from 'react';
import { IMyquotesWebpartProps } from './IMyquotesWebpartProps';
import { useEffect, useState} from 'react';
import { IFAQ } from '../../../interface';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { getFAQItems } from '../../../services/myservices';


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
        Letter:item.Letter
      }
    }));
}


 useEffect(() =>{


getItems();
  

  

},[])


return (
  <>
  <pre>{JSON.stringify(faqItems,null,2)}</pre>
  
  <DetailsList
            items={faqItems}
            columns={_columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode = {SelectionMode.none}
          
          /></>
)
}

export default Faq




