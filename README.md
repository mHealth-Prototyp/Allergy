# mHealth Prototyp (Patient view)
Prototype app for demonstrating mHealth use cases on EPD Playground with patient centered examples using the [CH AllergyIntolerance profile](http://fhir.ch/ig/ch-allergyintolerance/index.html).

Try out the latest version of this webapp: https://mhealth-prototyp.github.io/Allergy/ (use `matteo@mail.li` with passwort `test` for mock login or use one of the test users from [chapter 1.1](#1.1-example-users)).

You might also be interested in the [health-professional oriented prototype app](https://github.com/mHealth-Prototyp/Basic-Prototyp).

## Content Table
- [1 About this prototype webapp](#1-about-this-prototype-webapp)
  - [1.1 Example users](#1.1-example-users)
  - [1.2 Import local data](#1.2-import-local-data)
  - [1.3 EPD Playground](#1.3-epd-playground)
  - [1.4 Mobile Access Gateway](#1.4-mobile-access-gateway)
- [2 Pages](#2-pages)
  - [2.1 Dashboard](#21-dashboard)
  - [2.2 Documents](#22-documents)
  - [2.3 Upload](#23-upload)
  - [2.4 Settings](#24-settings)
  - [2.5 About](#25-about)
- [3 Install and run the app](#3-install-and-run-the-app)
- [4 Submit issues](#4-submit-issues)
- [5 Changelog](#5-changelog)

## 1 About this prototype webapp
This webapp is intended to serve as a prototype around an use case with allergies and intolerances. It is able to connect to the [EPD Playground](#1.3-epd-playground) and load a patient's health record. It also includes an allergy dashboard with the possibility of tracking allergy symptoms in a (locally stored) diary.

### 1.1 Example users
Since the EPD Playground does not support user roles and authentification, the login is mocked in this prototype. You can use one of the following example users for playing around with the prototype:

| Name                 | Login               | Password    | Personas |
| -------------------- | ------------------- | ----------- | -------- |
| Patricia Laurent     | pat67@approches.ch  | laur3nt     | Is taking care of her 80 year old mother that had a stroke. Patricia has a confirmed allergy for latex and a lactose intolerance. She is also suspecting to have an allergy on grass pollen, that's why she is logging her symptoms in a diary. In the last days, she was looking after her mothers cat Felix and finds out that she may be also allergic to cat hair. |
| Elisabeth Brönnimann | elisabeth@broennimann.today | 19kurt69 | Elisabeth Brönnimann is the example persona from the Bern University of Applied Sciences Institute for Medical Informatics, so of course she also has a patient record on the EPD Playground. |
| Matteo Lecomte | matteo@mail.li | test | Matteo Lecomte is another account used for testing of CHAllergyIntolerance resources. |


### 1.2 Import or export local data
The diary is not stored on the EPD Playground, but locally in your webbrowsers storage. For making sharing this local data with other users, you can use the Import / Export function on the settings page. For example, a set of diary entries for the Patricia Laurent persona can be loaded by copying the following code and pasting it into the "Import" popup on the Settings page.

```
{"diaryEntries":[{"date":"2021-12-25T23:00:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"gastro","sct":"122865005","image":"digestive.json"}}],"note":"Gestern gab es Fondue, und ich konnte nicht widerstehen. Heute habe ich wieder Blähungen.","allergy":{"type":"finding","defaultCoding":{"system":"http://snomed.info/sct","code":"782415009","display":"Intolerance to lactose"},"languageDisplays":{"en":"Intolerance to lactose","de":"Laktoseintoleranz","fr":"intolérance au lactose","it":"intolleranza al lattosio","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/nahrungsmittelintoleranzen/laktoseintoleranz"}]}},{"date":"2022-05-19T15:25:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"eye","sct":"81745001","image":"eye.json"}}],"note":"ich habe in letzter Zeit oft gereizte Augen"},{"date":"2022-06-01T17:00:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"lung","sct":"39607008","image":"lung.json"}}],"note":"Ich habe das Gefühl, dass ich nicht richtig Luft kriege wenn die Fenster offen sind. Der Nachbar hat heute das hohe Gras gemäht."},{"date":"2022-06-16T10:30:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"eye","sct":"81745001","image":"eye.json"}}],"note":"Heute hatte ich wieder einmal den ganzen Vormittag gerötete Augen"},{"date":"2022-08-04T10:00:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"eye","sct":"81745001","image":"eye.json"}}]},{"date":"2022-08-24T06:00:00.000Z","symptoms":[],"note":"Heute am Morgen keine Symptome","allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-24T10:30:00.000Z","symptoms":[{"intensity":"255604002","location":{"name":"eye","sct":"81745001","image":"eye.json"}},{"intensity":"260413007","location":{"name":"lung","sct":"39607008","image":"lung.json"}}],"note":"Beim Mittagessen auf der Terasse leicht gereizte Augen","allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-24T17:00:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"eye","sct":"81745001","image":"eye.json"}},{"intensity":"255604002","location":{"name":"lung","sct":"39607008","image":"lung.json"}}],"note":"Abendspaziergang im Wald","allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-26T10:30:00.000Z","symptoms":[{"intensity":"255604002","location":{"name":"lung","sct":"39607008","image":"lung.json"}},{"intensity":"255604002","location":{"name":"eye","sct":"81745001","image":"eye.json"}}],"note":"Mittagessen im Park. Sonst heute keine Symptome.","allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-27T15:30:00.000Z","symptoms":[{"intensity":"24484000","location":{"name":"eye","sct":"81745001","image":"eye.json"}},{"intensity":"6736007","location":{"name":"lung","sct":"39607008","image":"lung.json"}},{"intensity":"6736007","location":{"name":"nose","sct":"45206002","image":"nose.json"}}],"note":"Ich habe meinem Bruder beim Heuen geholfen, danach ging es mir gar nicht gut.","allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-28T07:00:00.000Z","symptoms":[{"intensity":"6736007","location":{"name":"eye","sct":"81745001","image":"eye.json"}},{"intensity":"255604002","location":{"name":"nose","sct":"45206002","image":"nose.json"}},{"intensity":"255604002","location":{"name":"lung","sct":"39607008","image":"lung.json"}}],"note":"Am Morgen spüre ich immer noch die Folgen von gestern.","allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-28T18:00:00.000Z","symptoms":[{"intensity":"260413007","location":{"name":"eye","sct":"81745001","image":"eye.json"}},{"intensity":"260413007","location":{"name":"nose","sct":"45206002","image":"nose.json"}},{"intensity":"260413007","location":{"name":"lung","sct":"39607008","image":"lung.json"}}],"note":"Abends keine Symptome mehr"},{"date":"2022-08-29T12:15:00.000Z","symptoms":[{"intensity":"255604002","location":{"name":"eye","sct":"81745001","image":"eye.json"}}],"allergy":{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}},{"date":"2022-08-30T14:00:00.000Z","symptoms":[{"intensity":"260413007","location":{"name":"eye","sct":"81745001","image":"eye.json"}},{"intensity":"260413007","location":{"name":"lung","sct":"39607008","image":"lung.json"}}],"note":"heute keine Symptome 😊"}],"suspectedAllergies":[{"type":"substance","defaultCoding":{"system":"http://snomed.info/sct","code":"256277009","display":"Grass pollen"},"languageDisplays":{"en":"Grass pollen","de":"Gräserpollen","fr":"pollen de graminées","it":"polline di graminacee","rm":"?"},"additionalInformation":[{"name":"aha! Allergiezentrum Schweiz","url":"https://www.aha.ch/allergiezentrum-schweiz/allergien-intoleranzen/pollenallergie-heuschnupfen/heuschnupfen-pollenallergie"}]}],"settings":{"language":"de-CH","organization":{"resourceType":"Organization","id":"1","identifier":[{"system":"urn:oid:2.16.756.5.30.1.178.1.1","value":"Klinik Höheweg"}],"name":"Klinik Höheweg","contact":[{"name":{"family":"Loser","given":["Marianne"]}}]},"facilityType":{"system":"http://snomed.info/sct","code":"264358009","display":"General practice premises"},"practiceSetting":{"system":"http://snomed.info/sct","code":"394802001","display":"General medicine"},"dashboard":["timeline","diaryList","newDiaryEntry","calendar","allergies"]}}
```
Please mind that importing data overwrites previously generated diary entries and suspected allergies.

### 1.3 EPD Playground
The EPD Playground is a low-threshold "test and play" implementation of a Swiss electronic health record for demonstrating key use cases of mHealth. It is a source of inspiration for developers, managers and healthcare personal in Switzerland. For easier testing, no authentication is needed on the EPD Playground. Learn more on the [project page of the EPD Playground.](https://epdplayground.ch/index.php?title=Main_Page).

### 1.4 Mobile Access Gateway
The Mobile Access Gateway is a FHIR endpoint that allows us to communicate with the EPD Playground using mHealth Profiles.

## 2 Pages
### 2.1 Dashboard
The dashboard page is the core of this web-application. It includes five different cards, that can be enabled or disabled in the settings menu at the bottom right.

#### 2.1.1 Timeline Card
The timeline displays the symptoms that were entered in the local symptoms diary, rendered as a graph over time. The symptoms are differentiated for location, and can be filtered for associated allergies.

#### 2.1.2 Allergy Card
The allergy card has two tabs. The first tab shows the confirmed allergies that are stored on the EPD Playground (preferably by a health professional). The second tab shows the locally stored suspected allergies, that can be entered by the patient without having them confirmed. This can be useful for tracking symptoms when assessing probable new allergies.  New suspected allergies can be entered in the [Create Diary Entry Card](#213-create-diary-entry)

#### 2.1.3 Create Diary Entry Card
The create diary entry card allows the user to create locally stored entries for their symptoms diary. It allows to differ symptoms by location and symptom strength and associate the symptoms to any of the confirmed or suspected allergies (see [2.1.2 AllergyCard](#212-allergy-card)). It is also possible to add a free-text note; and to enter new suspected allergies.

#### 2.1.4 Diary Card
The diary shows all diary entries in a list view and also allows for the creation of new diary entries.

#### 2.1.5 Allergy Calendar Card
The allergy calendar card also shows the entries from the symptoms diary, but in a calendar view instead of a list view.

### 2.2 Documents
This page allows you to search and access all documents that the patient's have stored on the EPD playground. Documents in the CHAllergyIntolerance format that are stored as json/fhir are displayed in the app, all other documents can be downloaded and viewed offline.

### 2.3 Upload
Here, documents can be tagged with metadata and uploaded to the EPD Playground. Please be aware that, since the EPD Playground has no private account, everything you upload here can be publicly accessed. It goes without saying that this feature should not be uses with real healthcare data.

### 2.4 Settings
On this page, the apps language can be set. Currently available are german and french. Please mind, that content loaded from the EPD Playground may not always be available in the selected language.

Also, some read-only settings can be reviewed here.

### 2.5 About
The About page shows information about the project, links to the project partners and the number of the app version currently running.

## 3 Install and run the app

### 3.1 Install dependencies
Before you can run the app, you need to install the dependencies using the node package manager. Make sure you're in the root folder of the project (that contains `package.json`) and run the following command:
```bash
npm i
```

### 3.2 Start the app in development mode (hot-code reloading, error reporting, etc.)
After installing the dependencies, the following command will build the app and start a development server.
```bash
npm run start
```
When the server is up and running, you can point your favorite browser to the displayed address to see the app (usually [localhost:8080](http://localhost:8080), but this may differ when you're already running other servers).

### 3.3 Build the app for production
If you want to deploy the app to a web server, you can run the following command and then just publish the content of the newly created `dist` folder.
```bash
npm run build
```

## 4 Submit issues
Go to the issue site of the repository to submit an issue: [on github.com](https://github.com/mHealth-Prototyp/Allergy/issues)

## 5 Changelog

| Version     | Date        | Changes     |
| ----------- | ----------- | ----------- |
| 1.0.0       | 2022-09-06  | Initial version uploaded to this repository|
