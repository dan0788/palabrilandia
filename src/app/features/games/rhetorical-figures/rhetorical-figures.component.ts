import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RhetoricFigureChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-rhetorical-figures',
  imports: [RouterLink],
  templateUrl: './rhetorical-figures.component.html',
  styleUrl: './rhetorical-figures.component.scss'
})
export class RhetoricalFiguresComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: RhetoricFigureChallenge[] = [
    {
      id: 1,
      verse: '"Tanto dolor se agrupa en mi costado, que por doler me duele hasta el aliento."',
      author: 'Miguel Hernández ("Elegía a Ramón Sijé")',
      options: ['Hipérbole', 'Metáfora pura', 'Pleonasmo', 'Aliteración'],
      correctFigure: 'Hipérbole',
      explanation: '¡Exacto! La hipérbole es una exageración desmesurada que magnifica el dolor por la pérdida del amigo amado.'
    },
    {
      id: 2,
      verse: '"En el silencio solo se escuchaba / un susurro de abejas que sonaba."',
      author: 'Garcilaso de la Vega ("Égloga III")',
      options: ['Aliteración', 'Hipérbaton', 'Epíteto', 'Paradoja'],
      correctFigure: 'Aliteración',
      explanation: '¡Brillante! La aliteración repite intencionadamente el fonema sibilante /s/ para evocar acústicamente el zumbido de las abejas.'
    },
    {
      id: 3,
      verse: '"Es hielo abrasador, es fuego helado, / es herida que duele y no se siente."',
      author: 'Francisco de Quevedo (Soneto amoroso)',
      options: ['Oxímoron y Antítesis', 'Metonimia', 'Polisíndeton', 'Asíndeton'],
      correctFigure: 'Oxímoron y Antítesis',
      explanation: '¡Nivel Bachillerato cumbre! Une términos contradictorios ("hielo abrasador", "fuego helado") para definir la naturaleza paradójica del amor.'
    },
    {
      id: 4,
      verse: '"Escucho con los ojos a los muertos / y en músicos callados contrapuntos."',
      author: 'Francisco de Quevedo ("Desde la torre")',
      options: ['Sinestesia', 'Hipérbole', 'Prosopopeya', 'Elipsis'],
      correctFigure: 'Sinestesia',
      explanation: '¡Maravilloso! La sinestesia cruza dos sensaciones de sentidos distintos: oír ("escucho") con la vista ("los ojos").'
    },
    {
      id: 5,
      verse: '"Temprano levantó la muerte el vuelo, / temprano madrugó la madrugada, / temprano estás rodando por el suelo."',
      author: 'Miguel Hernández ("Elegía")',
      options: ['Anáfora', 'Encabalgamiento', 'Hipérbaton', 'Paranomasia'],
      correctFigure: 'Anáfora',
      explanation: '¡Correcto! La anáfora consiste en la repetición deliberada de la palabra "temprano" al comienzo de versos sucesivos.'
    },
    {
      id: 6,
      verse: '"Nuestras vidas son los ríos / que van a dar en la mar, / que es el morir."',
      author: 'Jorge Manrique ("Coplas por la muerte de su padre")',
      options: ['Metáfora', 'Comparación o Símil', 'Ironía', 'Hipérbole'],
      correctFigure: 'Metáfora',
      explanation: '¡Espléndido! Identifica directamente las vidas con ríos que desembocan en el mar (la muerte), sin utilizar el nexo "como".'
    }
  ];

  public activeChallenges = signal<RhetoricFigureChallenge[]>([]);
  public currentIndex = signal<number>(0);
  public selectedOption = signal<string | null>(null);
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
    this.selectedOption.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.gameFinished.set(false);
  }

  public selectOption(opt: string): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();
    this.selectedOption.set(opt);
  }

  public checkAnswer(): void {
    const selected = this.selectedOption();
    if (!selected) return;

    const correct = selected === this.currentChallenge().correctFigure;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('👁️ ¡Ojo poético afilado! Identificaste la figura con precisión de crítico literario.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('💡 ¡Ánimo! Piensa en qué sentido o juego de significado busca el poeta.');
    }
  }

  public nextChallenge(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeChallenges().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedOption.set(null);
      this.isAnswerChecked.set(false);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 4 ? 3 : this.score() >= 2 ? 2 : 1;
    const earnedXp = this.score() * 35 + 30;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'superar El Ojo Poético: Figuras Retóricas');
    if (this.score() >= 4) {
      this.gamification.unlockBadge('ojo-retorico');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
