import {
  Bundle,
  BundleEntry,
  BundleLink,
  BundleType,
  Element,
  Identifier,
  Meta,
  Resource,
  Signature
} from '@i4mi/fhir_r4';
import {uid} from 'quasar';
import {ENV} from 'src/assets/env';
import {CHCoreCompositionEPR} from 'src/model/CHCoreCompositionEPR';
import utils from 'src/services/utils';
export class CHCoreDocumentEPR implements Bundle {
  resourceType = 'Bundle';
  id?: string;
  meta = {profile: ['http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-document-epr']} as Meta;
  implicitRules?: string;
  language?: string;

  identifier = {system: 'urn:ietf:rfc:3986'} as Identifier;
  type = BundleType.DOCUMENT;
  timestamp: string;
  link?: BundleLink[];
  entry = [] as BundleEntry[];
  signature?: Signature;

  _resourceType?: Element;
  _id?: Element;
  _implicitRules?: Element;
  _language?: Element;

  _timestamp?: Element;

  public constructor(composition: CHCoreCompositionEPR, ...params: Resource[]) {
    const now = new Date().toISOString();
    this.meta.lastUpdated = now;
    this.identifier.value = 'urn:uuid:' + uid();
    this.timestamp = now;
    this.entry[0] = {
      fullUrl: this.getFullUrl(composition.id, composition.resourceType),
      resource: composition
    };
    this.addResource(...params);
  }

  public addResource(...params: Resource[]) {
    for (const r of params) {
      if (r.resourceType && r.id) {
        this.entry.push({
          fullUrl: this.getFullUrl(r.id, r.resourceType),
          resource: r
        });
      }
    }
  }

  private getFullUrl(id: string, resourceType: string) {
    return utils.isUUID(id) ? `urn:uuid:${id}` : `${ENV.BASE_URL}${resourceType}/${id}`;
  }
}
