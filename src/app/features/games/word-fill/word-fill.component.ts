import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordFillQuestion } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-word-fill',
  imports: [RouterLink],
  templateUrl: './word-fill.component.html',
  styleUrl: './word-fill.component.scss'
})
export class WordFillComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  // Banco completo ampliado con retos para todos los niveles y Bachillerato
  private readonly allQuestions: WordFillQuestion[] = [
    {
      id: 1,
      sentenceBefore: 'El marinero navegó en un gran',
      missingWord: 'barco',
      sentenceAfter: 'de vela blanca por el océano.',
      options: ['barco', 'varco'],
      explanation: '¡Excelente! "Barco" siempre se escribe con "B". Además, es un sustantivo común que nombra un medio de transporte marítimo.',
      category: 'Ortografía',
      hint: 'Piensa en las palabras de la familia: barquito, barcaza.'
    },
    {
      id: 2,
      sentenceBefore: 'El águila es un animal muy',
      missingWord: 'rápido',
      sentenceAfter: 'cuando vuela entre las montañas.',
      options: ['rápido', 'rapido', 'rápído'],
      explanation: '¡Bravo! "Rápido" es una palabra esdrújula (su fuerza va en la antepenúltima sílaba: rá-pi-do). ¡Y todas las esdrújulas llevan tilde siempre!',
      category: 'Ortografía',
      hint: 'Es una palabra esdrújula. ¿Recuerdas la regla de oro de las esdrújulas?'
    },
    {
      id: 3,
      sentenceBefore: 'Caperucita Roja llevaba una capa de color',
      missingWord: 'rojo',
      sentenceAfter: 'por el sendero del bosque.',
      options: ['rojo', 'correr', 'saltando'],
      explanation: '¡Muy bien! "Rojo" es un adjetivo calificativo, porque nos dice cómo es o qué cualidad tiene la capa.',
      category: 'Gramática',
      hint: 'Buscamos una palabra que exprese una cualidad o color (un adjetivo).'
    },
    {
      id: 4,
      sentenceBefore: 'Los niños',
      missingWord: 'leyeron',
      sentenceAfter: 'un hermoso poema sobre la primavera.',
      options: ['leyeron', 'leerán', 'leyeronn'],
      explanation: '¡Acertaste! "Leyeron" es una forma del verbo leer en tiempo pasado y en tercera persona del plural (ellos).',
      category: 'Gramática',
      hint: 'Es la acción que realizaron en tiempo pasado.'
    },
    {
      id: 5,
      sentenceBefore: 'Un sinónimo de la palabra "alegre" es',
      missingWord: 'feliz',
      sentenceAfter: ', ya que significan casi lo mismo.',
      options: ['feliz', 'triste', 'enojado'],
      explanation: '¡Genial! Los sinónimos son palabras diferentes que comparten el mismo significado. Alegre y feliz son grandes amigos.',
      category: 'Sinónimos',
      hint: 'Los antónimos son lo contrario, ¡pero aquí buscamos que signifique lo mismo!'
    },
    {
      id: 6,
      sentenceBefore: 'Para escribir una carta, la niña usó su',
      missingWord: 'lápiz',
      sentenceAfter: 'favorito de madera.',
      options: ['lápiz', 'lápis', 'lapiz'],
      explanation: '¡Maravilloso! "Lápiz" lleva tilde porque es palabra llana terminada en Z, y termina en Z (en plural: lápices).',
      category: 'Ortografía',
      hint: 'Termina en Z y lleva tilde en la primera sílaba.'
    },
    // Retos avanzados para nivel Bachillerato
    {
      id: 7,
      sentenceBefore: 'Espero que el profesor me',
      missingWord: 'dé',
      sentenceAfter: 'la autorización para ingresar a la biblioteca.',
      options: ['dé', 'de'],
      explanation: '¡Nivel Bachillerato! "Dé" lleva tilde diacrítica cuando corresponde a la forma del verbo dar, para distinguirse de la preposición "de".',
      category: 'Ortografía',
      hint: 'Regla de la tilde diacrítica en monosílabos: forma verbal de dar.'
    },
    {
      id: 8,
      sentenceBefore: 'El científico manipuló el',
      missingWord: 'tubo',
      sentenceAfter: 'de ensayo con sumo cuidado durante el experimento.',
      options: ['tubo', 'tuvo'],
      explanation: '¡Excelente distinción homófona! "Tubo" con B es una pieza hueca cilíndrica; "tuvo" con V procede del verbo tener.',
      category: 'Ortografía',
      hint: 'Pieza cilíndrica de vidrio o metal.'
    },
    {
      id: 9,
      sentenceBefore: 'El estudiante preparó el examen,',
      missingWord: 'conque',
      sentenceAfter: 'obtuvo una calificación sobresaliente.',
      options: ['conque', 'con que', 'con qué'],
      explanation: '¡Sintaxis de Bachillerato! "Conque" es una conjunción consecutiva ilativa equivalente a "así que" o "por tanto".',
      category: 'Gramática',
      hint: 'Conjunción consecutiva que equivale a "por lo tanto".'
    },
    {
      id: 10,
      sentenceBefore: 'Federico García Lorca y Rafael Alberti integraron la Generación del',
      missingWord: '27',
      sentenceAfter: ', cumbre de la poesía lírica moderna española.',
      options: ['27', '98', '14'],
      explanation: '¡Literatura Moderna! La Generación del 27 rindió homenaje a Luis de Góngora en 1927 aunando tradición y vanguardia.',
      category: 'Gramática',
      hint: 'Movimiento poético reunido en el tricentenario de Góngora (1927).'
    },
    {
      id: 11,
      sentenceBefore: 'Me entusiasma mucho',
      missingWord: 'que',
      sentenceAfter: 'hayas leído Cien años de soledad este verano.',
      options: ['que', 'qué', 'de que'],
      explanation: '¡Sintaxis de oraciones compuestas! La proposición subordinada sustantiva ejerce la función de sujeto introducida por la conjunción "que". Evita el dequeísmo.',
      category: 'Gramática',
      hint: 'Nexo completivo subordinante de sujeto.'
    },
    {
      id: 12,
      sentenceBefore: 'El explorador no ha llegado',
      missingWord: 'aún',
      sentenceAfter: 'al campamento base en la cordillera.',
      options: ['aún', 'aun'],
      explanation: '¡Tilde diacrítica! "Aún" lleva tilde cuando equivale a "todavía", mientras que "aun" es átona cuando equivale a "incluso" o "siquiera".',
      category: 'Ortografía',
      hint: 'Equivale a "todavía".'
    }
  ];

  // Preguntas seleccionadas aleatoriamente para esta sesión
  public activeQuestions = signal<WordFillQuestion[]>([]);
  public currentIndex = signal<number>(0);
  public selectedOption = signal<string | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public showHint = signal<boolean>(false);
  public gameFinished = signal<boolean>(false);

  public currentQuestion = computed(() => this.activeQuestions()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    // Selección aleatoria de 6 preguntas barajadas
    const sampled = sampleRandom(this.allQuestions, 6);
    // Barajar también las opciones dentro de cada pregunta
    const questionsWithShuffledOptions = sampled.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    this.activeQuestions.set(questionsWithShuffledOptions);
    this.currentIndex.set(0);
    this.selectedOption.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.showHint.set(false);
    this.gameFinished.set(false);
  }

  public selectOption(option: string): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();
    this.selectedOption.set(option);
  }

  public checkAnswer(): void {
    const selected = this.selectedOption();
    if (!selected) return;

    const correct = selected.toLowerCase() === this.currentQuestion().missingWord.toLowerCase();
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('¡Qué puntería léxica! Esa palabra encaja a la perfección.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('¡Casi casi! Fíjate bien en la explicación para aprender el truco.');
    }
  }

  public nextQuestion(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeQuestions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedOption.set(null);
      this.isAnswerChecked.set(false);
      this.showHint.set(false);
    } else {
      this.finishGame();
    }
  }

  public toggleHint(): void {
    this.sound.playHint();
    this.showHint.update(h => !h);
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 5 ? 3 : this.score() >= 3 ? 2 : 1;
    const earnedXp = this.score() * 25 + 20;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'completar Palabras al Rescate');
    if (this.score() >= 5) {
      this.gamification.unlockBadge('maestro-ortografia');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
