Versjon 1.0.5:
Endring i view v_BikeRaceResults. La til FinishDate-kolonne
Endring i view v_CompetitionTeamBikeRider. La til det.CQPoints-kolonne, det.BikeTeamName, br.Nationality(og i group by)

For Sesongplasseringschartet så må BikeRaceNameShort legges inn for de rittene som skal være med som punkter


Versjon 1.0.6:
La til db-funksjon SeasonFinish for å finne siste rittdato ut i fra BikeRaceDetail.FinishDate
Bruker dette i views v_SumCompetitionTeam_Victories og v_SumChampionsLeagueTeam_Victories for å ikke vise victory i maratontabellene før sesongen er ferdig
Viser rankingtrend i sykkelkonken-bildet
Viser utvidet tooltip med rankingtrend i sesongplasseringschartet

1.0.7
Ny tabell BikeRaceSeasonPlacement for å kunne sette administrere hvilke sykkelritt som skal vises i sesongplasseringsgrafen

1.0.8
Ungdomskonk. Admin og resultater.
Fikset "legg til sykkelritt" i "admin-utregning"

1.0.9
Deploy til azure



firebase deploy
Henter fra katalog dist/stats-sykkelkonken så appen må bygges med "ng build --prod" før "firebase deploy" kjøres
Må ha web.config med <action type="Rewrite" url="/index.html" /> (må kanskje kopieres fra et annet sted, la inn i assets-folder)
Må ha index.html med <base href="/">
Per nå kan ikke http://direct.ams.no/sykkelkonken.service nås siden den blir servet fra http


serviceurl finnes i config.json


ved deploy til azure, slett web.config fra assets folder og legg inn på root
deploy fra dist catalog
add to web.config i <system.webServer>:
<staticContent>
    <remove fileExtension=".json" />
    <remove fileExtension=".woff" />
    <remove fileExtension=".woff2" />
    <mimeMap fileExtension=".json" mimeType="application/json" />
    <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
    <mimeMap fileExtension=".woff2" mimeType="application/font-woff" />      
</staticContent>