# Installieren

### `npm install`

# Lokal laufen lassen

## Datenbank: 
* ueber MongoDB Compass verbinden (bei Mac evtl. vorher im Terminal einzugeben: `mongod --config /usr/local/etc/mongod.conf`)

## Backend starten: 
* in den Ordner /backend wechseln
* mit `nodemon server` oder `node server` starten


## Frontend starten: 
* in den Ordner /frontend wechseln
* mit `npm start` starten
* sollte unter localhost auf port 3000 starten.

## Login
* zunächst registrieren via "Registrieren", dann login via "Login"

## Quiz starten
* aus vorhandenen Kategorien auswählen, falls keine verfügbar müssen zunächst neue Fragen angelegt werden. Siehe Punkt "Fragen anlegen".
* Falls Fragen vorhanden, Kategorie wählen und Spiel beginnen

## Fragen anlegen
* Button "+" legt neues Quiz im Backend an, id wird zurueck gesendet und alle Fragen, die danach ohne den "fertig" Button zu klicken abgesendet werden, werden diesem einen    Quiz zugordnet. 
* unter "Fragen anlegen" Form ausfüllen !!richtige Antwortemoeglichkeiten per Leerzeichen getrennt, keine Input Überpruefung!!.
* Button fertig schließt Quiz und alle zuvor eingegebenen Fragen wurden diesem zugeordnet

## Chat
* zum Registrieren / Login genutzter Username wird auch für Chat verwendet. Bitte zweiten Tab öffnen, Login Vorgang wiederholen, Chat ausklappen um Funktionalität zu testen.
