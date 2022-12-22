import {
  Annotation,
  CodeableConcept,
  Coding,
  Element,
  Extension,
  Identifier,
  Meta,
  Narrative,
  Observation,
  ObservationComponent,
  ObservationReferenceRange,
  ObservationStatus,
  Period,
  Quantity,
  Range,
  Ratio,
  Reference,
  Resource,
  SampledData,
  Timing
} from '@i4mi/fhir_r4';
import {uid} from 'quasar';

export class CustomObservation implements Observation {
  resourceType: 'Observation';
  id: string;
  meta?: Meta;
  implicitRules?: string;
  language?: string;

  text?: Narrative;
  contained?: Resource[];
  extension?: Extension[];
  modifierExtension?: Extension[];

  identifier?: Identifier[];
  basedOn?: Reference[];
  partOf?: Reference[];
  status = ObservationStatus.PRELIMINARY;
  category?: CodeableConcept[];
  code = {coding: []} as CodeableConcept;
  subject?: Reference;
  focus?: Reference[];
  encounter?: Reference;
  effectiveDateTime?: string;

  effectivePeriod?: Period;
  effectiveTiming?: Timing;
  effectiveInstant?: string;

  issued?: string;

  performer?: Reference[];
  valueQuantity?: Quantity;
  valueCodeableConcept?: CodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: Range;
  valueRatio?: Ratio;
  valueSampledData?: SampledData;
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: Period;
  dataAbsentReason?: CodeableConcept;
  interpretation?: CodeableConcept[];
  note?: Annotation[];
  bodySite?: CodeableConcept;
  method?: CodeableConcept;
  specimen?: Reference;
  device?: Reference;
  referenceRange?: ObservationReferenceRange[];
  hasMember?: Reference[];
  derivedFrom?: Reference[];
  component?: CustomObservationComponent[];

  _resourceType?: Element;
  _id?: Element;
  _implicitRules?: Element;
  _language?: Element;

  _effectiveDateTime?: Element;
  _effectiveInstant?: Element;
  _issued?: Element;
  _valueString?: Element;
  _valueBoolean?: Element;
  _valueInteger?: Element;
  _valueTime?: Element;
  _valueDateTime?: Element;

  public constructor(code: Coding, ...params: CustomObservationComponent[]) {
    this.resourceType = 'Observation';
    this.id = uid();
    this.code.coding?.push(code);
    this.addComponent(...params);
  }

  public addComponent(...params: CustomObservationComponent[]) {
    if (params.length > 0) {
      if (!this.component) this.component = [];
      params.forEach((x) => this.component?.push(x));
    }
  }
}

export class CustomObservationComponent implements ObservationComponent {
  id?: string;
  extension?: Extension[];

  modifierExtension?: Extension[];

  code = {coding: []} as CodeableConcept;
  valueQuantity?: Quantity;
  valueCodeableConcept?: CodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: Range;
  valueRatio?: Ratio;
  valueSampledData?: SampledData;
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: Period;
  dataAbsentReason?: CodeableConcept;
  interpretation?: CodeableConcept[];
  referenceRange?: ObservationReferenceRange[];

  _id?: Element;
  _valueString?: Element;
  _valueBoolean?: Element;
  _valueInteger?: Element;
  _valueTime?: Element;
  _valueDateTime?: Element;

  public constructor(code: Coding) {
    this.code.coding?.push(code);
  }
}
