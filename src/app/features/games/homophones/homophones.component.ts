import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomophoneChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-homophones',
  imports: [RouterLink],
  templateUrl: './homophones.component.html',
  styleUrl: './homophones.component.scss'
})
export class HomophonesComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: HomophoneChallenge[] = [
    {
      id: 1,
      context: 'El novelista guardó el secreto y no quiso ___ el desenlace de la trama hasta el estreno.',
      options: ['revelar', 'rebelar'],
      correctWord: 'revelar',
      distractorMeaning: 'Rebelar (con B) significa sublevarse o sublevar a otros contra una autoridad.',
      explanation: '¡Exacto! "Revelar" con V significa manifestar un secreto o hacer visible algo oculto.'
    },
    {
      id: 2,
      context: 'Los jóvenes atletas saltaron la ___ de madera que rodeaba el campo de atletismo.',
      options: ['valla', 'vaya', 'baya'],
      correctWord: 'valla',
      distractorMeaning: 'Vaya es del verbo ir; baya es un fruto carnoso silvestre.',
      explanation: '¡Muy bien! "Valla" con V y LL es la cerca, estacada o barrera de madera o metal.'
    },
    {
      id: 3,
      context: 'El gobierno decidió no ___ con nuevos impuestos los libros y ediciones culturales.',
      options: ['gravar', 'grabar'],
      correctWord: 'gravar',
      distractorMeaning: 'Grabar (con B) significa registrar sonidos/imágenes o labrar un relieve.',
      explanation: '¡Ortografía crítica de Bachillerato! "Gravar" con V significa imponer una carga, gravamen o tributo.'
    },
    {
      id: 4,
      context: 'Quien busca con paciencia y perseverancia en las bibliotecas, siempre ___ la verdad.',
      options: ['halla', 'haya', 'allá'],
      correctWord: 'halla',
      distractorMeaning: 'Haya es del verbo haber o árbol; allá es adverbio de lugar lejano.',
      explanation: '¡Brillante! "Halla" con H y LL proviene del verbo hallar (encontrar).'
    },
    {
      id: 5,
      context: 'El protagonista sintió un escalofrío que le erizó el fino ___ de los brazos.',
      options: ['vello', 'bello'],
      correctWord: 'vello',
      distractorMeaning: 'Bello (con B) significa hermoso o dotado de belleza.',
      explanation: '¡Correcto! "Vello" con V se refiere al pelo corto y suave del cuerpo humano o pelusilla de las plantas.'
    },
    {
      id: 6,
      context: 'Si hubiera salido antes de casa, ___ alcanzado a tiempo el tren de cercanías.',
      options: ['habría', 'abría'],
      correctWord: 'habría',
      distractorMeaning: 'Abría (sin H) es forma del verbo abrir (abría la puerta).',
      explanation: '¡De diez! "Habría" con H es forma del verbo auxiliar haber en condicional simple.'
    }
  ];

  public activeChallenges = signal<HomophoneChallenge[]>([]);
  public currentIndex = signal<number>(0);
  public selectedWord = signal<string | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentChallenge = computed(() => this.activeChallenges()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allChallenges, 5);
    const randomized = sampled.map(c => ({
      ...c,
      options: shuffleArray(c.options)
    }));

    this.activeChallenges.set(randomized);
    this.currentIndex.set(0);
    this.selectedWord.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.gameFinished.set(false);
  }

  public selectWord(w: string): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();
    this.selectedWord.set(w);
  }

  public checkAnswer(): void {
    const selected = this.selectedWord();
    if (!selected) return;

    const correct = selected === this.currentChallenge().correctWord;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('🛡️ ¡Guardián del léxico impecable! No caíste en la trampa del homófono.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('💡 ¡Recuerda el significado distintivo de cada grafía!');
    }
  }

  public nextChallenge(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeChallenges().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedWord.set(null);
      this.isAnswerChecked.set(false);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 4 ? 3 : this.score() >= 2 ? 2 : 1;
    const earnedXp = this.score() * 30 + 30;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'superar la Batalla de Homófonos');
    if (this.score() >= 4) {
      this.gamification.unlockBadge('maestro-homofonos');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
