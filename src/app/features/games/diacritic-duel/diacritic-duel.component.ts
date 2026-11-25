import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiacriticChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-diacritic-duel',
  imports: [RouterLink],
  templateUrl: './diacritic-duel.component.html',
  styleUrl: './diacritic-duel.component.scss'
})
export class DiacriticDuelComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: DiacriticChallenge[] = [
    {
      id: 1,
      sentenceBefore: 'Deseo de corazón que el tutor me',
      sentenceAfter: 'el visto bueno para el proyecto.',
      pair: ['dé', 'de'],
      correctWord: 'dé',
      grammaticalFunction: 'Forma del verbo dar',
      explanation: '¡Exacto! "Dé" lleva tilde diacrítica por ser forma del verbo dar, diferenciándose de la preposición "de".'
    },
    {
      id: 2,
      sentenceBefore: 'Cuando llegó la hora de votar, ella dijo que',
      sentenceAfter: 'apoyaba la moción literaria.',
      pair: ['sí', 'si'],
      correctWord: 'sí',
      grammaticalFunction: 'Adverbio afirmativo',
      explanation: '¡Muy bien! "Sí" lleva tilde cuando es adverbio afirmativo o pronombre reflexivo; "si" sin tilde es conjunción condicional.'
    },
    {
      id: 3,
      sentenceBefore: 'El premio no era para ti ni para',
      sentenceAfter: ', sino para toda la clase.',
      pair: ['mí', 'mi'],
      correctWord: 'mí',
      grammaticalFunction: 'Pronombre personal tónico',
      explanation: '¡Perfecto! "Mí" lleva tilde como pronombre personal tras preposición; "mi" sin tilde es adjetivo posesivo (mi cuaderno).'
    },
    {
      id: 4,
      sentenceBefore: 'Quiso asistir a la inauguración,',
      sentenceAfter: 'sus compromisos se lo impidieron.',
      pair: ['mas', 'más'],
      correctWord: 'mas',
      grammaticalFunction: 'Conjunción adversativa (= pero)',
      explanation: '¡Gran sutileza ortográfica! "Mas" sin tilde equivale a "pero". Lleva tilde ("más") únicamente cuando denota cantidad.'
    },
    {
      id: 5,
      sentenceBefore: 'El conferencista no ha iniciado',
      sentenceAfter: 'su disertación sobre las vanguardias.',
      pair: ['aún', 'aun'],
      correctWord: 'aún',
      grammaticalFunction: 'Adverbio temporal (= todavía)',
      explanation: '¡De diez! "Aún" lleva tilde si se puede reemplazar por "todavía". Se escribe sin tilde cuando equivale a "incluso" o "hasta".'
    },
    {
      id: 6,
      sentenceBefore: 'Solo sé que no',
      sentenceAfter: 'nada, sentenció el sabio filósofo.',
      pair: ['sé', 'se'],
      correctWord: 'sé',
      grammaticalFunction: 'Forma del verbo saber',
      explanation: '¡Correcto! "Sé" lleva tilde como forma verbal de saber o de ser ("sé puntual"), a diferencia del pronombre átono "se".'
    },
    {
      id: 7,
      sentenceBefore: '¿No comprendes el',
      sentenceAfter: 'de su insistencia en revisar el poema?',
      pair: ['porqué', 'porque'],
      correctWord: 'porqué',
      grammaticalFunction: 'Sustantivo (= causa, motivo)',
      explanation: '¡Excelente! "Porqué" junto y con tilde es un sustantivo que significa causa o razón (va precedido de artículo: el porqué).'
    }
  ];

  public activeChallenges = signal<DiacriticChallenge[]>([]);
  public currentIndex = signal<number>(0);
  public selectedWord = signal<string | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public currentStreak = signal<number>(0);
  public maxStreak = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentChallenge = computed(() => this.activeChallenges()[this.currentIndex()]);
  public shuffledOptions = computed(() => {
    const c = this.currentChallenge();
    return c ? shuffleArray(c.pair) : [];
  });

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allChallenges, 5);
    this.activeChallenges.set(sampled);
    this.currentIndex.set(0);
    this.selectedWord.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.currentStreak.set(0);
    this.maxStreak.set(0);
    this.gameFinished.set(false);
  }

  public selectWord(w: string): void {
    if (this.isAnswerChecked()) return;
    this.selectedWord.set(w);
    this.sound.playPop();

    const correct = w === this.currentChallenge().correctWord;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.currentStreak.update(st => {
        const next = st + 1;
        if (next > this.maxStreak()) this.maxStreak.set(next);
        return next;
      });
      this.gamification.setMascotMessage('🎯 ¡Blanco perfecto en la tilde diacrítica!');
    } else {
      this.sound.playIncorrect();
      this.currentStreak.set(0);
      this.gamification.setMascotMessage('💡 ¡Atento a la categoría gramatical de la palabra!');
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

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'superar el Duelo de Tildes Diacríticas');
    if (this.maxStreak() >= 4 || this.score() >= 5) {
      this.gamification.unlockBadge('francotirador-tilde');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
