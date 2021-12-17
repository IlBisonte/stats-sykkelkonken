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
