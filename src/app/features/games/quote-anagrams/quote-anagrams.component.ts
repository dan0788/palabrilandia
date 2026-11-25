import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuoteAnagramChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom } from '../../../core/utils/random.util';

@Component({
  selector: 'app-quote-anagrams',
  imports: [RouterLink],
  templateUrl: './quote-anagrams.component.html',
  styleUrl: './quote-anagrams.component.scss'
})
export class QuoteAnagramsComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: QuoteAnagramChallenge[] = [
    {
      id: 1,
      author: 'Federico García Lorca',
      work: 'Romancero gitano (1928)',
      scrambledKeywords: ['EDRVE', 'REUQI', 'ARMS'],
      correctKeywords: ['VERDE', 'QUIERO', 'RAMAS'],
      fullQuote: '"Verde que te quiero verde. Verde viento. Verdes ramas."',
      clue: 'Famoso verso con cromatismo verde y símbolo de misterio lírico.'
    },
    {
      id: 2,
      author: 'Antonio Machado',
      work: 'Proverbios y cantares (1912)',
      scrambledKeywords: ['MACINO', 'ANRDA', 'ESAHC'],
      correctKeywords: ['CAMINO', 'ANDAR', 'HACE'],
      fullQuote: '"Caminante, no hay camino, se hace camino al andar."',
      clue: 'Poema cumbre de la Generación del 98 sobre la senda de la vida.'
    },
    {
      id: 3,
      author: 'Gabriel García Márquez',
      work: 'Vivir para contarla (2002)',
      scrambledKeywords: ['VIDA', 'VIÓIV', 'EDRCRAUE'],
      correctKeywords: ['VIDA', 'VIVIÓ', 'RECUERDA'],
      fullQuote: '"La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla."',
      clue: 'Memoria autobiográfica del creador del Realismo Mágico.'
    },
    {
      id: 4,
      author: 'Gustavo Adolfo Bécquer',
      work: 'Rimas (1871)',
      scrambledKeywords: ['PEOISA', 'OJSO', 'SERE'],
      correctKeywords: ['POESÍA', 'OJOS', 'ERES'],
      fullQuote: '"¿Qué es poesía?, dices mientras clavas en mi pupila tu pupila azul... ¡Poesía... eres tú!"',
      clue: 'Rima romántica universal sobre la mirada y la poesía.'
    }
  ];

  public activeChallenges = signal<QuoteAnagramChallenge[]>([]);
  public currentIndex = signal<number>(0);
  public solvedSlots = signal<{ [key: number]: string }>({});
  public isCurrentSolved = signal<boolean>(false);
  public score = signal<number>(0);
  public showClue = signal<boolean>(false);
  public gameFinished = signal<boolean>(false);

  public currentChallenge = computed(() => this.activeChallenges()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allChallenges, 3);
    this.activeChallenges.set(sampled);
    this.currentIndex.set(0);
    this.score.set(0);
    this.gameFinished.set(false);
    this.loadChallenge(0);
  }

  private loadChallenge(idx: number): void {
    this.solvedSlots.set({});
    this.isCurrentSolved.set(false);
    this.showClue.set(false);
  }

  public testWord(slotIndex: number, typedValue: string): void {
    const target = this.currentChallenge().correctKeywords[slotIndex];
    if (typedValue.trim().toUpperCase() === target.toUpperCase()) {
      this.sound.playCorrect();
      this.solvedSlots.update(s => ({ ...s, [slotIndex]: target }));

      // Comprobar si completó todas las palabras de la cita
      const current = this.solvedSlots();
      const allDone = this.currentChallenge().correctKeywords.every((_, i) => !!current[i]);
      if (allDone) {
        this.isCurrentSolved.set(true);
        this.score.update(s => s + 1);
        this.gamification.setMascotMessage('🧩 ¡Criptograma descifrado con excelencia poética!');
      }
    }
  }

  public toggleClue(): void {
    this.sound.playHint();
    this.showClue.update(c => !c);
  }

  public nextChallenge(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeChallenges().length - 1) {
      const nextIdx = this.currentIndex() + 1;
      this.currentIndex.set(nextIdx);
      this.loadChallenge(nextIdx);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 3 ? 3 : 2;
    const earnedXp = this.score() * 40 + 35;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'descifrar los criptogramas del 27');
    if (this.score() >= 2) {
      this.gamification.unlockBadge('descifrador-versos');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
