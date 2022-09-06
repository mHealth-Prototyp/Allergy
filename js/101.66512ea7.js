"use strict";(globalThis["webpackChunkmhealth_proto_patient"]=globalThis["webpackChunkmhealth_proto_patient"]||[]).push([[101],{101:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var l=a(9835),o=a(6970);function n(e,t,a,n,i,s){const r=(0,l.up)("q-card-section"),c=(0,l.up)("DocumentSearch"),d=(0,l.up)("q-card"),g=(0,l.up)("q-icon"),h=(0,l.up)("AllergyView"),u=(0,l.up)("q-dialog"),m=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(d,null,{default:(0,l.w5)((()=>[(0,l.Wm)(r,{class:"card-title"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.$t("documents.title")),1)])),_:1}),(0,l.Wm)(r,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,{patient:e.$store.getPatient(),ref:"documentSearch",locale:e.$store.getSettings().language,demoMode:!1,addedDocuments:e.uploadedDocuments,onFoundDocument:e.openDocument,fhirUtils:e.$fhirUtils,languageString:e.$store.getSettings().language.substring(0,2)||"de",epdPlaygroundUtils:e.$epdUtils,translations:e.documentSearchStrings},null,8,["patient","locale","addedDocuments","onFoundDocument","fhirUtils","languageString","epdPlaygroundUtils","translations"])])),_:1})])),_:1}),(0,l.Wm)(u,{modelValue:e.showAllergyPopup,"onUpdate:modelValue":t[1]||(t[1]=t=>e.showAllergyPopup=t),class:"dialog"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{class:"allergy-dialog-card"},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{class:"card-title with-close-icon"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.allergyToDisplay?e.getAllergyName(e.allergyToDisplay):"")+" ",1),(0,l.wy)((0,l.Wm)(g,{onClick:t[0]||(t[0]=()=>{e.showAllergyPopup=!1,e.allergyToDisplay=void 0}),name:"fas fa-times",class:"close-icon",flat:"",round:"",dense:""},null,512),[[m]])])),_:1}),(0,l.Wm)(r,null,{default:(0,l.w5)((()=>[(0,l.Wm)(h,{allergyIntolerance:e.allergyToDisplay,translations:e.allergyStrings,languageString:e.$store.getSettings().language.substring(0,2)||"de",fhirUtils:e.$fhirUtils,epdPlaygroundUtils:e.$epdUtils,showTitle:!1},null,8,["allergyIntolerance","translations","languageString","fhirUtils","epdPlaygroundUtils"])])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}var i=a(8852);const s=(0,l.aZ)({name:"Documents-Page",components:{DocumentSearch:i.jS,AllergyView:i.HY},data(){return{uploadedDocuments:new Array,lang:this.$i18n.locale.substring(0,2),showAllergyPopup:!1,allergyToDisplay:void 0,documentSearchStrings:{titleLabel:this.$t("documents.searchComponent.documentTableLabel"),fetchMpiLabel:this.$t("documents.searchComponent.fetchMpi"),mpiLabel:this.$t("documents.searchComponent.fetchedMpi"),fetchMetadataLabel:this.$t("documents.searchComponent.fetchMetadata"),fetchingError:this.$t("documents.searchComponent.fetchingError"),kiloByteLabel:this.$t("common.kiloByte"),megaByteLabel:this.$t("common.megaByte"),searchLabel:this.$t("common.search"),dateLabel:this.$t("common.date"),descriptionLabel:this.$t("common.description"),classLabel:this.$t("common.class"),typeLabel:this.$t("common.type"),authorLabel:this.$t("common.author"),fileTypeLabel:this.$t("common.fileType"),fileSizeLabel:this.$t("common.fileSize")},allergyStrings:{allergy:this.$t("allergy.allergy"),intolerance:this.$t("allergy.intolerance"),typeLabel:this.$t("allergy.typeLabel"),codeDisplayLabel:this.$t("allergy.codeDisplayLabel"),dateLabel:this.$t("common.date"),clinicalStateLabel:this.$t("allergy.clinicalStateLabel"),verificationStateLabel:this.$t("allergy.verificationStateLabel"),reactionLabel:this.$t("allergy.reactionLabel"),reactionsLabel:this.$t("allergy.reactionsLabel"),reactionDateLabel:this.$t("allergy.reactionDateLabel"),reactionSubstanceLabel:this.$t("allergy.reactionSubstanceLabel"),reactionSeverityLabel:this.$t("allergy.reactionSeverityLabel"),reactionDescriptionLabel:this.$t("allergy.reactionDescriptionLabel"),additionalInformation:this.$t("allergy.additionalInformation"),categoryLabel:this.$t("allergy.categoryLabel"),criticalityLabel:this.$t("allergy.criticalityLabel"),noteLabel:this.$t("allergy.noteLabel"),exposureDateLabel:this.$t("allergy.exposureDateLabel"),exposureRouteLabel:this.$t("allergy.exposureRouteLabel"),reactionNoteLabel:this.$t("allergy.reactionNoteLabel"),reactionLocationLabel:this.$t("allergy.reactionLocationLabel"),noOtherDataAvailable:this.$t("allergy.noOtherDataAvailable")}}},methods:{openDocument(e){const t=e.metadata;t.content&&t.content[0]&&t.content[0].attachment&&t.content[0].attachment.url?this.checkIfIsAllergy(t)?this.$epdUtils.useITI68(t).then((e=>{this.showAllergyPopup=!0,this.allergyToDisplay=JSON.parse(e)})).catch((e=>console.log(e))):confirm(this.$t("documents.openPrompt1")+(t.description||this.$t("documents.unknownTitle"))+this.$t("documents.openPrompt2"))&&window.open(t.content[0].attachment.url,t.description||this.$t("documents.unknownTitle"),"height="+(.7*window.innerHeight).toString()+",width="+(.7*window.innerWidth).toString()):console.log("Can not open document in window, unsufficient metadata",document)},checkIfIsAllergy(e){return"application/fhir+json"===e.content[0].attachment.contentType&&void 0!==e.type&&void 0!==e.type.coding&&e.type.coding.findIndex((e=>"722446000"===e.code))>-1},getAllergyName(e){var t;const a=null===(t=e.code.coding)||void 0===t?void 0:t.find((e=>e.system&&"http://snomed.info/sct"===e.system));if(a&&a.code){const e=i.bt.find((e=>e.defaultCoding.code===a.code));return(null===e||void 0===e?void 0:e.languageDisplays[this.lang])||this.$t("common.unknown")}return this.$t("common.unknown")}}});var r=a(1639),c=a(4458),d=a(3190),g=a(2074),h=a(2857),u=a(2146),m=a(9984),p=a.n(m);const y=(0,r.Z)(s,[["render",n],["__scopeId","data-v-756a8570"]]),b=y;p()(s,"components",{QCard:c.Z,QCardSection:d.Z,QDialog:g.Z,QIcon:h.Z}),p()(s,"directives",{ClosePopup:u.Z})}}]);