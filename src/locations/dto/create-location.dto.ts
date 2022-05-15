export class CreateLocationDto {
  readonly name: string;
  readonly gmbaccountId: number;
  readonly languageCode: string;
  readonly storeCode: string;
  readonly title: string;
  readonly primaryPhone: string;
  readonly additionalPhones: string;
  readonly regionCode: string;
  readonly administrativeArea: string;
  readonly postalCode: string;
  readonly locality: string;
  readonly addressLines: string;
  readonly websiteUri: string;
  readonly latlng: string;
  readonly mapsUri: string;
}