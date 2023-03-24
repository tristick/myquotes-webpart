import * as React from 'react';
import { IMyquotesWebpartProps } from './IMyquotesWebpartProps';
import { useEffect, useState} from 'react';
import { IFAQ } from '../../../interface';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { getFAQItems } from '../../../services/myservices';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';

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
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  
  
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
  //run main function
getItems();

},[])


return (
  <>
  <DetailsList
            items={faqItems}
            columns={_columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode = {SelectionMode.none}
          
          />
   <DefaultButton text="Open panel" onClick={openPanel} />       
   <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <p><pre>{JSON.stringify(faqItems,null,2)}</pre></p>
      </Panel>       
          
          
          </>
)
}

export default Faq




