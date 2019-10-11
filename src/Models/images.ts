import { Guid } from 'guid-typescript';

export class Images {
    imageId : Guid;
    imageUrl :string;
    goToUrl:string;
    forProductNo?:Guid;
    imageCategory:string;
}
