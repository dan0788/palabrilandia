import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SyntaxChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-syntax-lab',
  imports: [RouterLink],
  templateUrl: './syntax-lab.component.html',
  styleUrl: './syntax-lab.component.scss'
})
export class SyntaxLabComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: SyntaxChallenge[] = [
    {
      id: 1,
      sentence: 'El jurado determinó que la novela ganadora era conmovedora.',
      sentenceType: 'Subordinada Sustantiva',
      subordinateClause: 'que la novela ganadora era conmovedora',
      nexus: 'que',
      options: ['Subordinada Sustantiva (Función CD)', 'Subordinada Adjetiva', 'Coordinada Copulativa', 'Subordinada Adverbial de Tiempo'],
      correctAnswer: 'Subordinada Sustantiva (Función CD)',
      explanation: '¡Excelente! La proposición subordinada puede sustituirse por el pronombre "eso": "El jurado determinó eso" -> funciona como Complemento Directo (CD).'
    },
    {
      id: 2,
      sentence: 'Me alegra enormemente que hayas alcanzado tus metas este año.',
      sentenceType: 'Subordinada Sustantiva',
      subordinateClause: 'que hayas alcanzado tus metas este año',
      nexus: 'que',
      options: ['Subordinada Sustantiva (Función Sujeto)', 'Subordinada Sustantiva (Función CD)', 'Coordinada Adversativa', 'Subordinada Adjetiva'],
      correctAnswer: 'Subordinada Sustantiva (Función Sujeto)',
      explanation: '¡Perfecto análisis de Bachillerato! Con verbos de sentimiento como alegrar, gustar o doler, la subordinada actúa como Sujeto ("Eso me alegra").'
    },
    {
      id: 3,
      sentence: 'Los poemas que escribió Lorca en Nueva York denuncian la deshumanización urbana.',
      sentenceType: 'Subordinada Adjetiva',
      subordinateClause: 'que escribió Lorca en Nueva York',
      nexus: 'que (pronombre relativo)',
      options: ['Subordinada Adjetiva / Relativo', 'Subordinada Sustantiva de Sujeto', 'Coordinada Distributiva', 'Subordinada Causal'],
      correctAnswer: 'Subordinada Adjetiva / Relativo',
      explanation: '¡Muy bien! Introduce una cualidad que modifica directamente a su antecedente sustantivo ("Los poemas").'
    },
    {
      id: 4,
      sentence: 'No vino a la biblioteca porque prefirió descansar, sino que redactó su ensayo en casa.',
      sentenceType: 'Coordinada Adversativa',
      subordinateClause: 'sino que redactó su ensayo en casa',
      nexus: 'sino que',
      options: ['Coordinada Adversativa', 'Coordinada Copulativa', 'Subordinada Concesiva', 'Coordinada Disyuntiva'],
      correctAnswer: 'Coordinada Adversativa',
      explanation: '¡Correcto! El nexo "sino que" une dos proposiciones con una relación de contraposición y exclusión.'
    },
    {
      id: 5,
      sentence: 'Aunque la lluvia arreciaba sobre la ciudad, los actores continuaron la función.',
      sentenceType: 'Subordinada Adverbial Concesiva',
      subordinateClause: 'Aunque la lluvia arreciaba sobre la ciudad',
      nexus: 'Aunque',
      options: ['Subordinada Adverbial Concesiva', 'Subordinada Adverbial Causal', 'Subordinada Condicional', 'Coordinada Ilativa'],
      correctAnswer: 'Subordinada Adverbial Concesiva',
      explanation: '¡Brillante! El nexo "Aunque" introduce una objeción o dificultad real que no impide el cumplimiento de la proposición principal.'
    },
    {
      id: 6,
      sentence: 'Si analizas con rigor el poema, descubrirás la maestría métrica del autor.',
      sentenceType: 'Subordinada Adverbial Condicional',
      subordinateClause: 'Si analizas con rigor el poema',
      nexus: 'Si',
      options: ['Subordinada Adverbial Condicional', 'Subordinada Sustantiva', 'Coordinada Explicativa', 'Subordinada Consecutiva'],
      correctAnswer: 'Subordinada Adverbial Condicional',
      explanation: '¡De diez! La prótasis ("Si analizas...") establece la condición sine qua non para que se cumpla la apódosis principal.'
    }
  ];

  public activeChallenges = signal<SyntaxChallenge[]>([]);
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

    const correct = selected === this.currentChallenge().correctAnswer;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('🔬 ¡Análisis sintáctico impecable! Dominas las estructuras compuestas.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('💡 ¡Ánimo! Fíjate en el nexo y prueba a sustituir por "eso".');
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

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'superar el Laboratorio de Sintaxis Compuesta');
    if (this.score() >= 4) {
      this.gamification.unlockBadge('analista-sintactico');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
