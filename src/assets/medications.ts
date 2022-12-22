import {Medication, Organization} from '@i4mi/fhir_r4';

export const MEDICATIONS: Medication[] = [
  {
    resourceType: 'Medication',
    meta: {
      profile: ['http://fhir.ch/ig/ch-emed/StructureDefinition/ch-emed-medication']
    },
    code: {
      coding: [
        {
          system: 'urn:oid:2.51.1.1',
          code: '7680614460013',
          display: 'BILAXTEN Tabl 20 mg (B) 10 Stk',
          _display: {
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'de'
                  },
                  {
                    url: 'content',
                    valueString: 'BILAXTEN Tabl 20 mg (B) 10 Stk'
                  }
                ]
              },
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'fr'
                  },
                  {
                    url: 'content',
                    valueString: 'BILAXTEN cpr 20 mg (B) 10 pce'
                  }
                ]
              }
            ]
          }
        }
      ],
      text: 'BILAXTEN Tabl 20 mg (B)',
      _text: {
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'de'
              },
              {
                url: 'content',
                valueString: 'BILAXTEN Tabl 20 mg (B)'
              }
            ]
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'fr'
              },
              {
                url: 'content',
                valueString: 'BILAXTEN cpr 20 mg (B)'
              }
            ]
          }
        ]
      }
    },
    manufacturer: {
      reference: '#manufacturer',
      type: 'Organization'
    },
    contained: [
      {
        id: 'manufacturer',
        resourceType: 'Organization',
        identifier: [
          {
            system: 'urn:oid:2.51.1.3',
            value: '7601001301252'
          }
        ],
        name: 'A. Menarini GmbH'
      } as Organization
    ]
  },
  {
    resourceType: 'Medication',
    meta: {
      profile: ['http://fhir.ch/ig/ch-emed/StructureDefinition/ch-emed-medication']
    },
    code: {
      coding: [
        {
          system: 'urn:oid:2.51.1.1',
          code: '7680667470014',
          display: 'FOSTER Dosieraeros 100/6 120 Dos',
          _display: {
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'de'
                  },
                  {
                    url: 'content',
                    valueString: 'FOSTER Dosieraeros 100/6 120 Dos'
                  }
                ]
              },
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'fr'
                  },
                  {
                    url: 'content',
                    valueString: 'FOSTER aéros doseur 100/6 120 dos'
                  }
                ]
              }
            ]
          }
        }
      ],
      text: 'FOSTER Dosieraeros 100/6',
      _text: {
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'de'
              },
              {
                url: 'content',
                valueString: 'FOSTER Dosieraeros 100/6'
              }
            ]
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'fr'
              },
              {
                url: 'content',
                valueString: 'FOSTER aéros doseur 100/6'
              }
            ]
          }
        ]
      }
    },
    manufacturer: {
      reference: '#manufacturer',
      type: 'Organization'
    },
    contained: [
      {
        id: 'manufacturer',
        resourceType: 'Organization',
        identifier: [
          {
            system: 'urn:oid:2.51.1.3',
            value: '7601001404212'
          }
        ],
        name: 'Chiesi SA'
      } as Organization
    ]
  },
  {
    resourceType: 'Medication',
    meta: {
      profile: ['http://fhir.ch/ig/ch-emed/StructureDefinition/ch-emed-medication']
    },
    code: {
      coding: [
        {
          system: 'urn:oid:2.51.1.1',
          code: '7680543200193',
          display: 'VENTOLIN Dosieraeros 100 mcg 200 Dos',
          _display: {
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'de'
                  },
                  {
                    url: 'content',
                    valueString: 'VENTOLIN Dosieraeros 100 mcg 200 Dos'
                  }
                ]
              },
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'fr'
                  },
                  {
                    url: 'content',
                    valueString: 'VENTOLIN aéros doseur 100 mcg 200 dos'
                  }
                ]
              }
            ]
          }
        }
      ],
      text: 'VENTOLIN Dosieraeros 100 mcg',
      _text: {
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'de'
              },
              {
                url: 'content',
                valueString: 'VENTOLIN Dosieraeros 100 mcg6'
              }
            ]
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'fr'
              },
              {
                url: 'content',
                valueString: 'VENTOLIN aéros doseur 100 mcg'
              }
            ]
          }
        ]
      }
    },
    manufacturer: {
      reference: '#manufacturer',
      type: 'Organization'
    },
    contained: [
      {
        id: 'manufacturer',
        resourceType: 'Organization',
        identifier: [
          {
            system: 'urn:oid:2.51.1.3',
            value: '7601001000674'
          }
        ],
        name: 'GlaxoSmithKline AG'
      } as Organization
    ]
  },
  {
    resourceType: 'Medication',
    meta: {
      profile: ['http://fhir.ch/ig/ch-emed/StructureDefinition/ch-emed-medication']
    },
    code: {
      coding: [
        {
          system: 'urn:oid:2.51.1.1',
          code: '7680481430164',
          display: 'ZYRTEC Filmtabl 10 mg 10 Stk',
          _display: {
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'de'
                  },
                  {
                    url: 'content',
                    valueString: 'ZYRTEC Filmtabl 10 mg 10 Stk'
                  }
                ]
              },
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'fr'
                  },
                  {
                    url: 'content',
                    valueString: 'ZYRTEC cpr pell 10 mg 10 pce'
                  }
                ]
              }
            ]
          }
        }
      ],
      text: 'ZYRTEC Filmtabl 10 mg',
      _text: {
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'de'
              },
              {
                url: 'content',
                valueString: 'ZYRTEC Filmtabl 10 mg'
              }
            ]
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'fr'
              },
              {
                url: 'content',
                valueString: 'ZYRTEC cpr pell 10 mg'
              }
            ]
          }
        ]
      }
    },
    manufacturer: {
      reference: '#manufacturer',
      type: 'Organization'
    },
    contained: [
      {
        id: 'manufacturer',
        resourceType: 'Organization',
        identifier: [
          {
            system: 'urn:oid:2.51.1.3',
            value: '7601001002432'
          }
        ],
        name: 'UCB-Pharma SA'
      } as Organization
    ]
  },
  {
    resourceType: 'Medication',
    meta: {
      profile: ['http://fhir.ch/ig/ch-emed/StructureDefinition/ch-emed-medication']
    },
    code: {
      coding: [
        {
          system: 'urn:oid:2.51.1.1',
          code: '7680530550379',
          display: 'LACDIGEST Kautabl Dose 50 Stk',
          _display: {
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'de'
                  },
                  {
                    url: 'content',
                    valueString: 'LACDIGEST Kautabl Dose 50 Stk'
                  }
                ]
              },
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'fr'
                  },
                  {
                    url: 'content',
                    valueString: 'LACDIGEST cpr croque boîte 50 pce'
                  }
                ]
              }
            ]
          }
        }
      ],
      text: 'LACDIGEST Kautabl',
      _text: {
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'de'
              },
              {
                url: 'content',
                valueString: 'LACDIGEST Kautabl'
              }
            ]
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'fr'
              },
              {
                url: 'content',
                valueString: 'LACDIGEST cpr croque'
              }
            ]
          }
        ]
      }
    },
    manufacturer: {
      reference: '#manufacturer',
      type: 'Organization'
    },
    contained: [
      {
        id: 'manufacturer',
        resourceType: 'Organization',
        identifier: [
          {
            system: 'urn:oid:2.51.1.3',
            value: '0355292000000'
          }
        ],
        name: 'Recordati AG'
      } as Organization
    ]
  },
  {
    resourceType: 'Medication',
    meta: {
      profile: ['http://fhir.ch/ig/ch-emed/StructureDefinition/ch-emed-medication']
    },
    code: {
      coding: [
        {
          system: 'urn:oid:2.51.1.1',
          code: '7680579700018',
          display: 'HYDROCORTISON Galepharm Tabl 10 mg',
          _display: {
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'de'
                  },
                  {
                    url: 'content',
                    valueString: 'HYDROCORTISON Galepharm Tabl 10 mg'
                  }
                ]
              },
              {
                url: 'http://hl7.org/fhir/StructureDefinition/translation',
                extension: [
                  {
                    url: 'lang',
                    valueCode: 'fr'
                  },
                  {
                    url: 'content',
                    valueString: 'HYDROCORTISONE Galepharm cpr 10 mg'
                  }
                ]
              }
            ]
          }
        }
      ],
      text: 'HYDROCORTISON Tabl',
      _text: {
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'de'
              },
              {
                url: 'content',
                valueString: 'HYDROCORTISON Tabl'
              }
            ]
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/translation',
            extension: [
              {
                url: 'lang',
                valueCode: 'fr'
              },
              {
                url: 'content',
                valueString: 'HYDROCORTISONE cpr'
              }
            ]
          }
        ]
      }
    },
    manufacturer: {
      reference: '#manufacturer',
      type: 'Organization'
    },
    contained: [
      {
        id: 'manufacturer',
        resourceType: 'Organization',
        identifier: [
          {
            system: 'urn:oid:2.51.1.3',
            value: '7601001000568'
          }
        ],
        name: 'Galepharm'
      } as Organization
    ]
  }
];
