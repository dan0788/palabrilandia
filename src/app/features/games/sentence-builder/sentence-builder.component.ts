import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SentencePuzzle } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-sentence-builder',
  imports: [RouterLink],
  templateUrl: './sentence-builder.component.html',
  styleUrl: './sentence-builder.component.scss'
})
export class SentenceBuilderComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allPuzzles: SentencePuzzle[] = [
    {
      id: 1,
      title: 'La Liebre y la Tortuga',
      authorOrSource: 'Fábula de Esopo',
      words: ['la liebre', 'venció a', 'La tortuga', 'constante', 'presumida.'],
      correctOrder: ['La tortuga', 'constante', 'venció a', 'la liebre', 'presumida.'],
      moralOrExplanation: '¡Moraleja sabia! La constancia, la paciencia y el esfuerzo siempre alcanzan la meta antes que el orgullo y la prisa.'
    },
    {
      id: 2,
      title: 'El Poder de la Lectura',
      authorOrSource: 'Pensamiento Literario',
      words: ['sin salir', 'de su habitación.', 'El niño que lee', 'viaja muy lejos'],
      correctOrder: ['El niño que lee', 'viaja muy lejos', 'sin salir', 'de su habitación.'],
      moralOrExplanation: '¡Magia de los libros! Leer nos permite volar en alfombras mágicas, explorar castillos y conocer estrellas desde nuestra cama.'
    },
    {
      id: 3,
      title: 'El Secreto de los Caminos',
      authorOrSource: 'Poema de Antonio Machado',
      words: ['al andar.', 'se hace camino', 'no hay camino,', 'Caminante,'],
      correctOrder: ['Caminante,', 'no hay camino,', 'se hace camino', 'al andar.'],
      moralOrExplanation: '¡Bello verso poético! El gran poeta Antonio Machado nos enseña que con cada paso que damos construimos nuestro propio futuro.'
    },
    {
      id: 4,
      title: 'La Puerta de la Fantasía',
      authorOrSource: 'Gramática y Creatividad',
      words: ['a mundos', 'abren puertas', 'Los buenos cuentos', 'maravillosos.'],
      correctOrder: ['Los buenos cuentos', 'abren puertas', 'a mundos', 'maravillosos.'],
      moralOrExplanation: '¡Sintaxis perfecta! Identificaste el sujeto ("Los buenos cuentos") y el predicado con su verbo de acción ("abren puertas...").'
    },
    {
      id: 5,
      title: 'Cien Años de Soledad',
      authorOrSource: 'Gabriel García Márquez (Realismo Mágico)',
      words: ['frente al pelotón', 'Muchos años después,', 'había de recordar', 'el coronel Aureliano', 'de fusilamiento,'],
      correctOrder: ['Muchos años después,', 'frente al pelotón', 'de fusilamiento,', 'el coronel Aureliano', 'había de recordar'],
      moralOrExplanation: '¡El comienzo más célebre del Realismo Mágico! Gabriel García Márquez abre Cien años de soledad con una célebre anticipación temporal narrativa.'
    },
    {
      id: 6,
      title: 'Romancero Gitano',
      authorOrSource: 'Federico García Lorca (Generación del 27)',
      words: ['verde viento,', 'que te quiero verde,', 'Verde', 'verdes ramas.'],
      correctOrder: ['Verde', 'que te quiero verde,', 'verde viento,', 'verdes ramas.'],
      moralOrExplanation: '¡Lírica moderna cumbre! Lorca utiliza el cromatismo verde y la anáfora para impregnar de misterio su Romance Sonámbulo.'
    },
    {
      id: 7,
      title: 'Subordinada Concesiva',
      authorOrSource: 'Sintaxis de Bachillerato',
      words: ['la poesía siempre', 'brillará con fuerza.', 'Aunque la noche', 'sea oscura,'],
      correctOrder: ['Aunque la noche', 'sea oscura,', 'la poesía siempre', 'brillará con fuerza.'],
      moralOrExplanation: '¡Sintaxis compuesta de Bachillerato! La oración subordinada adverbial concesiva introducida por "Aunque" expresa una objeción que no impide el evento.'
    }
  ];

  public activePuzzles = signal<SentencePuzzle[]>([]);
  public currentIndex = signal<number>(0);
  public availableWords = signal<string[]>([]);
  public placedWords = signal<string[]>([]);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentPuzzle = computed(() => this.activePuzzles()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allPuzzles, 4);
    this.activePuzzles.set(sampled);
    this.currentIndex.set(0);
    this.score.set(0);
    this.gameFinished.set(false);
    this.loadPuzzle(0);
  }

  private loadPuzzle(idx: number): void {
    const puzzle = this.activePuzzles()[idx];
    if (!puzzle) return;
    const shuffled = shuffleArray(puzzle.words);
    this.availableWords.set(shuffled);
    this.placedWords.set([]);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
  }

  public placeWord(word: string, indexInAvailable: number): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();

    const avail = [...this.availableWords()];
    avail.splice(indexInAvailable, 1);
    this.availableWords.set(avail);

    this.placedWords.update(p => [...p, word]);
  }

  public removeWord(word: string, indexInPlaced: number): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();

    const placed = [...this.placedWords()];
    placed.splice(indexInPlaced, 1);
    this.placedWords.set(placed);

    this.availableWords.update(a => [...a, word]);
  }

  public resetCurrentWords(): void {
    this.sound.playPop();
    this.loadPuzzle(this.currentIndex());
  }

  public checkOrder(): void {
    const placed = this.placedWords();
    const correct = this.currentPuzzle().correctOrder;

    const matches = placed.length === correct.length && placed.every((w, i) => w === correct[i]);
    this.isCorrect.set(matches);
    this.isAnswerChecked.set(true);

    if (matches) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('📜 ¡Magnífico constructor de historias! La frase fluye con perfecta armonía.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('🧐 Revisa el orden: ¿Quién realiza la acción y qué ocurre después?');
    }
  }

  public nextPuzzle(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activePuzzles().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.loadPuzzle(this.currentIndex());
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 3 ? 3 : 2;
    const earnedXp = this.score() * 35 + 25;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'ordenar las fábulas y versos literarios');
    if (this.score() >= 2) {
      this.gamification.unlockBadge('creador-fabulas');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
