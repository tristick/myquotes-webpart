import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderName
} from '@microsoft/sp-application-base';


import * as strings from 'MypanelApplicationCustomizerStrings';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import mypanel from './component/mytsxpanel';
import { Itspanelprops } from './component/Itspanelprops';



const LOG_SOURCE: string = 'MypanelApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IMypanelApplicationCustomizerProperties {

  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class MypanelApplicationCustomizer
  extends BaseApplicationCustomizer<IMypanelApplicationCustomizerProperties> {
  

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    
    const header = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    //header.domElement.innerHTML='<div><button type="button" onclick>My Panel</button></div>'

    const elem: React.ReactElement<Itspanelprops> = React.createElement(mypanel,{
      
      userDisplayName: this.context.pageContext.user.email,
      contextext:this.context
    },
      );

    ReactDOM.render(elem, header.domElement);

   // console.log('Myheader',header)
    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    return Promise.resolve();
  }

  protected onDispose(): void {
    ReactDOM.unmountComponentAtNode(this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top).domElement);
  }
  
}



