import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AppSettingsService } from './core/services/app-settings/app-settings.service';
import { SummonerVersionService } from './core/services/summoner-version/summoner-version.service';
import { SessionService } from './core/services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private appSettingsService: AppSettingsService,
    private swUpdate: SwUpdate,
    private summonerVersionService: SummonerVersionService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.initSettingsService();
    this.getLastApiVersion();
  }

  initSettingsService() {
    this.appSettingsService.init();
    this.updatePWA();
  }

  updatePWA() {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.checkForUpdate().then((isUpdated) => {
      if (isUpdated) {
        this.swUpdate.activateUpdate().then(() => {
          location.reload();
        });
      }
    });
  }

  getLastApiVersion() {
    if (this.sessionService.getApiVersion()) {
      this.summonerVersionService.versionUpdated.next(true);
      return;
    }
    this.summonerVersionService.getLeagueOfLegendsVersions().subscribe();
  }
}
