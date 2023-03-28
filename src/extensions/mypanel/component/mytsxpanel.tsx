import * as React from 'react';

import { useEffect, useState} from 'react';

import { Panel } from 'office-ui-fabric-react/lib/Panel';

import { useBoolean } from '@fluentui/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';
import { getFavIds } from '../../../services/myservices';

import { Ifavouriteitem } from '../../../interface';
import { Itspanelprops } from './Itspanelprops';



const mypanel = (props:Itspanelprops):JSX.Element =>{


  //const LOG_SOURCE = 'My logging';
  
  
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [favItems,setFavItems ] = useState<Ifavouriteitem[]>([]) 

 useEffect(() =>{
  //run main function
 

},[])

const getmyFavIds= async () :Promise<void> => {
  const items = getFavIds(props);

  setFavItems(( await items).map((item:Ifavouriteitem) => {
    return {
      Title:item.Title,
      appID:item.appID
    }

  }));

  
}

return (
  <>
   <DefaultButton text="Open panel" onClick={openPanel} />     
   <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onOpen={getmyFavIds}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
   <p>{JSON.stringify(favItems,null,2)}</p>
      </Panel>       
          
          
          </>
)
}

export default mypanel




