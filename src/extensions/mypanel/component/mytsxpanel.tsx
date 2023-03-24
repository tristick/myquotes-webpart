import * as React from 'react';

import { useEffect} from 'react';

import { Panel } from 'office-ui-fabric-react/lib/Panel';

import { useBoolean } from '@fluentui/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton';



const mypanel = () =>{


  //const LOG_SOURCE = 'My logging';
  
  
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  

 useEffect(() =>{
  //run main function


},[])


return (
  <>
   <DefaultButton text="Open panel" onClick={openPanel} />     
   <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
   
      </Panel>       
          
          
          </>
)
}

export default mypanel




