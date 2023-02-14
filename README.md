#Semesterabgabe im Fach Webtechnologien mit dem Titel "Quiz MI"
*Beinhaltet eine Quiz Applikation 

# Installieren

### `npm install`

# Lokal laufen lassen

## Datenbank: 
* ueber MongoDB Compass verbinden (bei Mac evtl. vorher im Terminal einzugeben: `mongod --config /usr/local/etc/mongod.conf`)
* es gibt im Ordner "data_examples" zwei JSON-Dateien, die mit Datensaetzen gefuellt sind, damit man diese nicht einzeln zuerst eingeben muss, um zu spielen. Diese braucht man nur in den mongoDB Compass zu importieren.

## Backend starten: 
* in den Ordner /backend wechseln
* mit `nodemon server` oder `node server` starten


## Frontend starten: 
* in den Ordner /frontend wechseln
* mit `npm start` starten
* sollte unter localhost auf port 3000 starten.

## Login
* zunächst registrieren via "Registrieren", dann Login mit den angegebenen Nutzerdaten via "Login"
* Google-Anmeldung ginge über den Knopf "Login mit Google". Weil wir http benutzen, weigert sich Google aber, unsere Anwendung als sicher anzuerkennen ._.

## Quiz starten
* aus vorhandenen Kategorien auswählen, falls keine verfügbar müssen zunächst neue Fragen angelegt werden. Siehe Punkt "Fragen anlegen".
* Falls Fragen vorhanden, Kategorie wählen und Spiel beginnen

## Fragen anlegen
* Button "+" legt neues Quiz im Backend an, id wird zurueck gesendet und alle Fragen, die danach ohne den "fertig" Button zu klicken abgesendet werden, werden diesem einen    Quiz zugordnet. 
* unter "Fragen anlegen" Form ausfüllen !!richtige Antwortemoeglichkeiten per Leerzeichen getrennt, keine Input Überpruefung!!.
* Button fertig schließt Quiz und alle zuvor eingegebenen Fragen wurden diesem zugeordnet

## Chat
* zum Registrieren / Login genutzter Username wird auch für Chat verwendet. Bitte zweiten Tab öffnen, Login Vorgang wiederholen, Chat ausklappen um Funktionalität zu testen.
