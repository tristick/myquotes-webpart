import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMyquotesWebpartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;

  userDisplayName: string;
  context:WebPartContext ;
  
 
}
