# Gamification-Konzept

## User-Story
Im folgenden werden mehrere Szenarien der Nutzerinteraktion dargestellt.

### Standardvorgehen
1.	Der Besucher bewegt sich auf dem Dashboard.
2.	Der Nutzer klickt auf das Spiele-Symbol und kommt in den Gamification-Modus.
3.	Der Nutzer wählt einen Avatar (Junge/Mädchen/geschlechtloses Kind oder Mann/Frau/geschlechtloser Erwachsener) um zwischen Kinder- und Erwachsenenmodus zu wählen.
4.	Der Nutzer absolviert Level 1-3.
7.	Das Spiel endet.

### Level 1 absolvieren
1.	Der Nutzer startet auf Level 1 mit 3 Wissensfragen seines Modus.
2.	Der Nutzer beantwortet alle 3 Wissensfragen korrekt und erreicht Level 2.

### Level 1 nicht bestehen
1.	Der Nutzer startet auf Level 1 mit 3 Wissensfragen seines Modus.
2.	Der Nutzer beantwortet mindestens 1 von 3 Wissensfragen falsch. Der Nutzer erhält sofort Feedback zur korrekten Antwort und einen Link zu weiteren Informationen.
3.	Der Nutzer erhält die Möglichkeit, Level 1 erneut zu starten.

### Level 2 absolvieren
1.	Der Nutzer startet auf Level 2 mit 3 Schätzfragen seines Modus.
2.	Der Nutzer beantwortet alle 3 Schätzfragen innerhalb des Toleranzbereichs.

### Level 2 nicht bestehen
1.	Der Nutzer startet auf Level 2 mit 3 Schätzfragen seines Modus.
2.	Der Nutzer beantwortet mindestens 1 von 3 Schätzfragen falsch. Der Nutzer erhält sofort Feedback zur korrekten Antwort und einen Link zu weiteren Informationen.
3.	Der Nutzer erhält die Möglichkeit, Level 2 erneut zu starten.

### Level 3 absolvieren mit Auto
1.	Der Nutzer startet auf Level 3 mit einer Frage, welche Strecke er mit dem Auto zurücklegt.
2.	Level 3 zeigt als Tipp die Möglichkeit, weniger Auto zu fahren: "Versuche, kürzere Fahrten mit dem Fahrrad oder de öffentlichen Nahverkehr zurückzulegen und reduziere deinen CO2-Fußabdruck"

### Level 3 absolvieren ohne Auto
1.	Der Nutzer startet auf Level 3 mit einer Frage, welche Strecke er mit dem Auto zurücklegt.
2.	Level 3 zeigt die Nachricht "Du bist schon auf einem sehr guten Weg! Leider haben wir derzeit keine weiteren Tipps für dich".

## Fragen
Das Quiz teilt sich in 2 Kategorien. Die Fragen werden in Wissensfragen (zeitlos) und aktuellen Schätzfragen unterteilt.
### Schätzfragen
Die estimation_questions.csv beinhaltet Schätzfragen. Die Antworten ergeben sich aus dem aktuellen Wert, der aus answer_source gelesen werden kann. 
answer_tolerance gibt die Toleranz der Schätzungen an, in dem sich die Antwort befinden soll.
### Wissensfragen
Die quiz_questions.csv beinhaltet Wissensfragen. Die korrekte Antwort, sowie 3 falsche Antworten sind direkt in der Tabelle hinterlegt.

## Weitere Ideen
### Basisinformationen
-	Avatar
-	Punkte
-	Levelsystem
-	weitere Absprungpunkte

### Wissen
-	Wissensfragen
-	Schätzfragen

### Kompetition
-	Eigene Ziele setzen (z. B. nächste Woche 10% weniger Strecke mit dem Auto)
	-	Mehr Punkte für ambitioniertere Ziele
	-	Mehr Punkte für erreichen von Zielen
-	Kompetition mit anderen
	-	Eigenen Punktestand teilen
	-	Eigene Werte mit dem Stadtteil vergleichen
	-	Eigene Werte mit ganz Karlsruhe vergleichen
	-	Eigene Werte mit ganz Deutschland vergleichen
-	Tipps

### Kooperationen
-	Stadtradeln
-	Prämien
-	Verlosungen
-	Umfragen
