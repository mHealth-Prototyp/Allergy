import {
  CodeableConcept,
  Coding,
  Composition,
  CompositionAttester,
  CompositionEvent,
  CompositionRelatesTo,
  CompositionSection,
  CompositionStatus,
  Device,
  DomainResource,
  Element,
  Extension,
  Identifier,
  Meta,
  Narrative,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
  Reference,
  RelatedPerson,
  Resource
} from '@i4mi/fhir_r4';
import {FhirUtilLanguageType} from '@i4mi/mhealth-proto-components';
import {uid} from 'quasar';
import {ENV} from 'src/assets/env';
import {getDiv, getNarrative} from 'src/services/fhirNarrativeGenerator';
import utils from 'src/services/utils';
import {convert} from 'xmlbuilder2';
export class CHCoreCompositionEPR implements Composition {
  resourceType: 'Composition';
  id: string;
  meta = {profile: ['http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-composition-epr']} as Meta;
  implicitRules?: string;
  language: string;

  text?: Narrative;
  contained?: Resource[];
  extension = [] as Extension[];
  modifierExtension?: Extension[];

  identifier = {system: 'urn:ietf:rfc:3986'} as Identifier;
  status = CompositionStatus.PRELIMINARY;
  type = {coding: []} as CodeableConcept;
  category?: CodeableConcept[];
  subject = {} as Reference;
  encounter?: Reference;
  date: string;
  author = [] as Reference[];
  title: string;
  confidentiality: string;
  attester?: CompositionAttester[];
  custodian?: Reference;
  relatesTo?: CompositionRelatesTo[];
  event?: CompositionEvent[];
  section: CompositionSection[];

  _resourceType?: Element;
  _id?: Element;
  _implicitRules?: Element;
  _language?: Element;

  _date?: Element;
  _title?: Element;
  _confidentiality: Element;

  public constructor(
    language: FhirUtilLanguageType,
    type: Coding,
    patient: Patient,
    authors: (Practitioner | PractitionerRole | Device | Patient | RelatedPerson | Organization)[],
    title: string,
    v3ConfidentialityClassification: 'U' | 'L' | 'M' | 'N' | 'R' | 'V',
    documentEntryConfidentialityCode: Coding
  ) {
    this.resourceType = 'Composition';
    this.id = uid();
    const now = new Date().toISOString();
    this.meta.lastUpdated = now;
    this.language = language;
    this.identifier.value = 'urn:uuid:' + uid();
    this.type.coding?.push(type);
    this.subject.reference = `Patient/${patient.id ?? ''}`;
    this.date = now;
    for (const a of authors) {
      if (a.resourceType && a.id) {
        const reference = this.getReference(a.id, a.resourceType);
        this.author.push({
          reference: reference
        });
        this.extension.push({
          url: 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-informationrecipient',
          valueReference: {
            reference: reference
          }
        });
      }
    }
    this.title = title;
    this.confidentiality = v3ConfidentialityClassification;
    this.section = [];
    this._confidentiality = {
      extension: [
        {
          url: 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-confidentialitycode',
          valueCodeableConcept: {
            coding: [documentEntryConfidentialityCode]
          }
        }
      ]
    };
  }

  public addSectionWithImage(title: string, h4WithImg: {title: string; src: string}, ...params: Resource[]) {
    const section = {
      title: title,
      entry: []
    } as CompositionSection;
    const div = getDiv();
    div.ele('h2').txt(title);
    div.ele('div').ele('h4').txt(h4WithImg.title).up().ele('img', {src: h4WithImg.src});
    for (const [index, r] of params.entries()) {
      if (r.resourceType && r.id) {
        const reference = this.getReference(r.id, r.resourceType);
        section.entry?.push({
          reference: this.getReference(r.id, r.resourceType)
        });
        const text = (r as DomainResource).text;
        if (text?.div) {
          div.ele('h3').txt(`Entry ${index.toString()}`);
          if (utils.isUUID(r.id)) {
            div.ele('p').txt(reference);
          } else {
            div.ele('a', {href: `${ENV.BASE_URL}${r.resourceType}/${r.id}`}).txt(reference);
          }
          div.ele(convert(text?.div, {format: 'object'}));
          //const root = fragment(text?.div).first().removeAtt('xmlns');
          //div.node.appendChild(root.node);
        }
      }
    }
    section.text = getNarrative(div);
    this.section.push(section);
  }

  public addSection(title: string, ...params: Resource[]) {
    const section = {
      title: title,
      entry: []
    } as CompositionSection;
    const div = getDiv();
    div.ele('h2').txt(title);
    for (const [index, r] of params.entries()) {
      if (r.resourceType && r.id) {
        const reference = this.getReference(r.id, r.resourceType);
        section.entry?.push({
          reference: this.getReference(r.id, r.resourceType)
        });
        const text = (r as DomainResource).text;
        if (text?.div) {
          div.ele('h3').txt(`Entry ${index.toString()}`);
          if (utils.isUUID(r.id)) {
            div.ele('p').txt(reference);
          } else {
            div.ele('a', {href: `${ENV.BASE_URL}${r.resourceType}/${r.id}`}).txt(reference);
          }
          div.ele(convert(text?.div, {format: 'object'}));
          //const root = fragment(text?.div).first().removeAtt('xmlns');
          //div.node.appendChild(root.node);
        }
      }
    }
    section.text = getNarrative(div);
    this.section.push(section);
  }

  private getReference(id: string, resourceType: string) {
    return utils.isUUID(id) ? `urn:uuid:${id}` : `${resourceType}/${id}`;
  }
}
