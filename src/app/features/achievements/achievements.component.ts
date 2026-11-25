import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GamificationService } from '../../core/services/gamification.service';
import { SoundService } from '../../core/services/sound.service';

@Component({
  selector: 'app-achievements',
  imports: [RouterLink],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {
  public gamification = inject(GamificationService);
  public sound = inject(SoundService);

  public readonly avatars = ['🦉', '🦊', '🐻', '🐰', '🐧', '🦁', '🐱', '🦄'];

  selectAvatar(avatar: string): void {
    this.gamification.setAvatar(avatar);
  }

  celebrateCertificate(): void {
    this.sound.playVictory();
    this.gamification.triggerConfetti();
    this.gamification.setMascotMessage('🎓 ¡Felicidades! Eres un orgullo para toda la comunidad de pequeños lectores.');
  }

  resetAll(): void {
    if (confirm('¿Quieres reiniciar tus puntos y medallas para empezar una nueva aventura?')) {
      this.gamification.resetProgress();
      this.sound.playPop();
    }
  }
}
