import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GamificationService } from '../../core/services/gamification.service';
import { SoundService } from '../../core/services/sound.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public gamification = inject(GamificationService);
  public sound = inject(SoundService);

  onSoundToggle(): void {
    this.sound.toggleMute();
  }
}
