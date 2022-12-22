import {date} from 'quasar';
import {fragment} from 'xmlbuilder2';
import {
  AddressUse,
  AllergyIntolerance,
  Coding,
  HumanNameNameUse,
  Narrative,
  NarrativeStatus,
  Patient
} from '@i4mi/fhir_r4';

import {CHCoreCompositionEPR} from 'src/model/CHCoreCompositionEPR';
import {ENV} from 'src/assets/env';
import {XMLBuilder, ExpandObject} from 'xmlbuilder2/lib/interfaces';

/**
 * Creates and returns an xhtml div.
 * @param title an optional string that will be set as <h1> tag if provided.
 * @returns the xhtml div.
 */
export function getDiv(title?: string) {
  const div = fragment({encoding: 'UTF-8', defaultNamespace: {ele: 'http://www.w3.org/1999/xhtml'}}, 'div').first();
  if (title) div.ele('h1').txt(title);
  return div;
}

/**
 * Returns an object representig a term and its description for a description list.
 * @param term the term of a description list.
 * @param description the description of the given term.
 * @returns an ExpandObject that can be added to a description list.
 */
export function getDtDd(term: string, description: string): ExpandObject {
  const dtDd = {
    dt: {
      strong: {'#': term}
    },
    dd: {'#': description}
  } as ExpandObject;
  return dtDd;
}

/**
 * Gets a generated fhir narrative.
 * @param div an xhtml div.
 * @returns a fhir narrative.
 */
export function getNarrative(div: XMLBuilder): Narrative {
  return {
    status: NarrativeStatus.GENERATED,
    div: div.end({prettyPrint: false})
  };
}

/**
 * Generates the a dense fhir narrative for the given patient.
 * @param patient Patient whose narrative will be generated.
 * @param $t vue-i18n translation function.
 * @returns a fhir narrative.
 */
export function getDensePatientNarrative(patient: Patient, $t: (key: string) => string): Narrative {
  const div = getDiv($t('fhirPatient.resourceType'));
  if (patient.id)
    div
      .ele('p')
      .ele('a', {href: `${ENV.BASE_URL}Patient/${patient.id}`})
      .txt(`${ENV.BASE_URL}Patient/${patient.id}`);
  div
    .ele('p')
    .ele('a', {href: 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-patient-epr'})
    .txt('CH Core Patient Profile EPR');

  const dl = div.ele('dl');

  if (patient.name && patient.name.length > 0) {
    const name = patient.name.find((x) => x.use === HumanNameNameUse.OFFICIAL) ?? patient.name[0];
    let nameValue = '';
    for (const g of name.given ?? []) {
      nameValue += `${g} `;
    }
    if (name.family) nameValue += name.family;

    dl.ele(getDtDd($t('fhirPatient.name'), nameValue.trim()));
  }

  if (patient.gender) dl.ele(getDtDd($t('common.gender'), $t(`common.${patient.gender}`)));
  if (patient.birthDate) dl.ele(getDtDd($t('common.birthdate'), date.formatDate(patient.birthDate, 'DD.MM.YYYY')));

  if (patient.address && patient.address.length > 0) {
    const address = patient.address.find((x) => x.use === AddressUse.HOME) ?? patient.address[0];
    if (address.line && address.postalCode && address.city) {
      dl.ele('dt').ele('strong').txt($t('common.address'));
      for (const l of address.line) {
        dl.ele('dd').txt(l);
      }
      dl.ele('dd').txt(`${address.postalCode}, ${address.city}`);
      if (address.state) dl.ele('dd').txt(address.state);
      if (address.country) dl.ele('dd').txt(address.country);
    }
  }
  return getNarrative(div);
}

/**
 * Generates the a dense fhir narrative for the given composition.
 * @param composition Composition whose narrative will be generated.
 * @param $t vue-i18n translation function.
 * @returns a fhir narrative.
 */
export function getDenseCompositionNarrative(
  composition: CHCoreCompositionEPR,
  $t: (key: string) => string
): Narrative {
  const div = getDiv(composition.title);
  div.ele('p').txt(`urn:uuid:${composition.id}`);
  div.ele('p').ele('a', {href: composition.meta.profile}).txt('CH Core Composition Profile EPR');
  const dl = div.ele('dl');
  dl.ele(getDtDd($t('fhirComposition.status'), $t('fhirComposition.compositionStatus.' + composition.status)));
  const type = composition.type.coding?.at(0);
  if (type?.display) dl.ele(getDtDd($t('common.type'), type.display));
  dl.ele(getDtDd($t('common.date'), `${date.formatDate(composition.date, 'DD.MM.YYYY HH:mm')}`));
  if (composition.subject.reference) {
    dl.ele('dt').ele('strong').txt($t('fhirComposition.subject'));
    dl.ele('dd')
      .ele('a', {href: ENV.BASE_URL + composition.subject.reference})
      .txt(`${composition.subject.reference}`);
  }
  return getNarrative(div);
}

/**
 * Generates the a dense fhir narrative for the given allergy or intolerance.
 * @param allergyIntolerance AllergyIntolerance whose narrative will be generated.
 * @param $t vue-i18n translation function.
 * @returns a fhir narrative.
 */
export function getDenseAllergyIntoleranceNarrative(
  allergyIntolerance: AllergyIntolerance,
  $t: (key: string) => string
): Narrative {
  const div = getDiv();
  div
    .ele('p')
    .ele('a', {href: 'http://fhir.ch/ig/ch-allergyintolerance/StructureDefinition/ch-allergyintolerance'})
    .txt('CH Allergy Intolerance');
  const dl = div.ele('dl');

  const clinicalStatus = allergyIntolerance.clinicalStatus?.coding?.at(0);
  if (clinicalStatus?.display)
    dl.ele(
      getDtDd(
        $t('fhirAllergyIntolerance.clinicalStatus'),
        $t('fhirAllergyIntolerance.allergyIntoleranceClinicalStatus.' + clinicalStatus.display.toLowerCase())
      )
    );

  const verificationStatus = allergyIntolerance.verificationStatus?.coding?.at(0);
  if (verificationStatus?.display)
    dl.ele(
      getDtDd(
        $t('fhirAllergyIntolerance.verificationStatus'),
        $t('fhirAllergyIntolerance.allergyIntoleranceVerificationStatus.' + verificationStatus.display.toLowerCase())
      )
    );

  if (allergyIntolerance.type)
    dl.ele(
      getDtDd(
        $t('fhirAllergyIntolerance.type'),
        $t('fhirAllergyIntolerance.allergyIntoleranceType.' + allergyIntolerance.type)
      )
    );

  if (allergyIntolerance.category) {
    let display = '';
    allergyIntolerance.category.forEach(
      (x) => (display += $t('fhirAllergyIntolerance.allergyIntoleranceCategory.' + x) + ', ')
    );
    dl.ele(getDtDd($t('fhirAllergyIntolerance.category'), display.slice(0, -2)));
  }
  if (allergyIntolerance.criticality)
    dl.ele(
      getDtDd(
        $t('fhirAllergyIntolerance.criticality'),
        $t('fhirAllergyIntolerance.allergyIntoleranceCriticality.' + allergyIntolerance.criticality)
      )
    );

  if (allergyIntolerance.code?.coding)
    dl.ele(getDtDd($t('fhirAllergyIntolerance.code'), allergyIntolerance.code.coding[0].display ?? ''));

  if (allergyIntolerance.reaction && allergyIntolerance.reaction.length > 0) {
    const table = div.ele('h4').txt($t('fhirAllergyIntolerance.reactions')).up().ele('table');
    table
      .ele('thead')
      .ele('tr', {style: 'text-align: center;'})
      .ele('th')
      .txt($t('fhirAllergyIntolerance.substance'))
      .up()
      .ele('th')
      .txt($t('fhirAllergyIntolerance.manifestation'))
      .up()
      .ele('th')
      .txt($t('fhirAllergyIntolerance.severity'))
      .up()
      .ele('th')
      .txt($t('fhirAllergyIntolerance.exposureRoute'));

    const tBody = table.ele('tbody');
    for (const r of allergyIntolerance.reaction) {
      const tr = tBody.ele('tr', {style: 'text-align: center;'});
      const substance = r.substance?.coding?.at(0);
      if (substance?.display) {
        tr.ele('td').txt(substance.display);
      } else {
        tr.ele('td').txt('-');
      }
      if (r.manifestation && r.manifestation.length > 0) {
        const coding: Coding[] = [];
        r.manifestation.forEach((x) => coding.push(...(x.coding ?? [])));
        let display = '';
        coding.forEach((x) => (display += x.display ? x.display + ' ,' : ''));
        tr.ele('td').txt(display.slice(0, -2));
      } else {
        tr.ele('td').txt('-');
      }
      if (r.severity) {
        tr.ele('td').txt(r.severity);
      } else {
        tr.ele('td').txt('-');
      }
      const exposureRoute = r.exposureRoute?.coding?.at(0);
      if (exposureRoute?.display) {
        tr.ele('td').txt(exposureRoute.display);
      } else {
        tr.ele('td').txt('-');
      }
    }
  }
  return getNarrative(div);
}
