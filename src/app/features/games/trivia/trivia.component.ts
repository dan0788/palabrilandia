import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TriviaQuestion } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom } from '../../../core/utils/random.util';

@Component({
  selector: 'app-trivia',
  imports: [RouterLink],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.scss'
})
export class TriviaComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allQuestions: TriviaQuestion[] = [
    {
      id: 1,
      category: 'Cuentos Clásicos',
      question: '¿Quién engañó a Caperucita Roja en el bosque haciéndose pasar por su tierna abuelita?',
      options: ['El cazador valiente', 'El lobo feroz', 'El leñador bondadoso', 'El duende del bosque'],
      correctIndex: 1,
      explanation: '¡Exacto! El lobo feroz es el antagonista del cuento popular recopilado por Charles Perrault y los Hermanos Grimm.'
    },
    {
      id: 2,
      category: 'Poesía y Rima',
      question: '¿Cuál de estas palabras tiene una rima perfecta (consonante) con "corazón"?',
      options: ['Melón y canción', 'Mesa y silla', 'Flor y primavera', 'Rápido y viento'],
      correctIndex: 0,
      explanation: '¡Maravilloso! Corazón, melón y canción terminan exactamente en el mismo sonido "-ón", creando una rima consonante.'
    },
    {
      id: 3,
      category: 'Gramática Divertida',
      question: 'En la oración: "El perro juguetón corre muy feliz por el parque", ¿cuál es el verbo que indica la acción?',
      options: ['Perro', 'Juguetón', 'Corre', 'Parque'],
      correctIndex: 2,
      explanation: '¡Gran detective! "Corre" es el verbo (del verbo correr). Recuerda que los verbos nos dicen qué hacen o sienten los seres.'
    },
    {
      id: 4,
      category: 'Ortografía Mágica',
      question: '¿Cuál de estas palabras del desayuno está correctamente escrita con la letra H intercalada o inicial?',
      options: ['Uevo', 'Huevo', 'Guevo', 'Huebo'],
      correctIndex: 1,
      explanation: '¡De diez! Las palabras que empiezan por los diptongos "ue", "ie", "ui" siempre se escriben con H (huevo, hielo, huida).'
    },
    {
      id: 5,
      category: 'Cuentos Clásicos',
      question: '¿De qué material construyó su casa el tercer cerdito para que el soplido del lobo no pudiera tumbarla?',
      options: ['Paja dorada', 'Ramas y madera', 'Ladrillos y cemento', 'Hojas secas'],
      correctIndex: 2,
      explanation: '¡Muy bien! Con ladrillos y esfuerzo construyó un hogar resistente. Nos enseña el valor del trabajo bien hecho.'
    },
    {
      id: 6,
      category: 'Poesía y Rima',
      question: 'Cuando un poeta escribe: "Tus ojos brillan como dos luceros", ¿qué recurso literario está usando?',
      options: ['Una comparación o símil', 'Un trabalenguas', 'Una adivinanza corta', 'Un diálogo teatral'],
      correctIndex: 0,
      explanation: '¡Excelente! Al usar la palabra "como" para unir dos ideas parecidas, el autor crea una comparación o símil.'
    },
    // Preguntas avanzadas de Bachillerato: Literatura Moderna
    {
      id: 7,
      category: 'Literatura Moderna',
      question: '¿Qué novela cumbre del Realismo Mágico narra la historia de la familia Buendía en el pueblo de Macondo?',
      options: ['Rayuela', 'Cien años de soledad', 'La ciudad y los perros', 'Pedro Páramo'],
      correctIndex: 1,
      explanation: '¡Nivel Bachillerato! "Cien años de soledad" (1967) de Gabriel García Márquez es la obra insignia del Boom latinoamericano y el Realismo Mágico.'
    },
    {
      id: 8,
      category: 'Literatura Moderna',
      question: '¿Qué célebre poeta granadino de la Generación del 27 escribió "Poeta en Nueva York" y "Bodas de sangre"?',
      options: ['Federico García Lorca', 'Antonio Machado', 'Miguel Hernández', 'Vicente Aleixandre'],
      correctIndex: 0,
      explanation: '¡Correcto! Federico García Lorca es una de las cumbres líricas y dramáticas del siglo XX en lengua española.'
    },
    {
      id: 9,
      category: 'Literatura Moderna',
      question: '¿Cuál es el movimiento poético fundado por Vicente Huidobro cuyo lema fue: "El poeta es un pequeño Dios"?',
      options: ['El Surrealismo', 'El Creacionismo', 'El Futurismo', 'El Modernismo'],
      correctIndex: 1,
      explanation: '¡Gran cultura literaria! El Creacionismo defendía que la poesía no debía imitar la naturaleza, sino crear realidades inéditas.'
    },
    // Preguntas avanzadas de Bachillerato: Sintaxis Compuesta
    {
      id: 10,
      category: 'Sintaxis de Bachillerato',
      question: 'En la oración: "Me encanta que investigues sobre literatura moderna", ¿qué función sintáctica cumple la proposición subordinada?',
      options: ['Complemento directo', 'Sujeto paciente', 'Sujeto de la oración principal', 'Complemento circunstancial'],
      correctIndex: 2,
      explanation: '¡Brillante análisis sintáctico! Con verbos de afección psíquica como encantar o gustar, la proposición subordinada sustantiva ("que investigues...") funciona como sujeto.'
    },
    {
      id: 11,
      category: 'Sintaxis de Bachillerato',
      question: '¿Qué tipo de nexo coordinante une las proposiciones en: "No asistió al recital, sino que se quedó leyendo en casa"?',
      options: ['Coordinante copulativo', 'Coordinante adversativo excluyente', 'Subordinante causal', 'Coordinante distributivo'],
      correctIndex: 1,
      explanation: '¡Exacto! "Sino que" introduce una proposición coordinada adversativa que corrige o excluye la afirmación previa.'
    },
    // Preguntas avanzadas de Bachillerato: Ortografía Crítica
    {
      id: 12,
      category: 'Ortografía Crítica',
      question: '¿En cuál de las siguientes opciones la palabra "si" / "sí" requiere tilde diacrítica obligatoria?',
      options: ['Si llueve no saldré', 'Dijo para sí que triunfaría', 'Tocó una pieza en si menor', 'Si estudias aprobarás'],
      correctIndex: 1,
      explanation: '¡Dominio ortográfico de Bachillerato! "Sí" lleva tilde diacrítica cuando es pronombre reflexivo ("para sí") o adverbio de afirmación.'
    },
    {
      id: 13,
      category: 'Ortografía Crítica',
      question: '¿Cuál de las siguientes oraciones utiliza de forma correcta el homófono "hecho" / "echo"?',
      options: ['Siempre le echo sal a la sopa', 'Siempre le hecho sal a la sopa', 'Yo nunca echo los deberes', 'Echo de ladrillo y cal'],
      correctIndex: 0,
      explanation: '¡Excelente! "Echo" del verbo echar va sin H. En cambio, "hecho" del verbo hacer o sustantivo ("suceso") se escribe con H.'
    }
  ];

  public activeQuestions = signal<TriviaQuestion[]>([]);
  public currentIndex = signal<number>(0);
  public selectedIndex = signal<number | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public currentStreak = signal<number>(0);
  public maxStreak = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentQuestion = computed(() => this.activeQuestions()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    // Selección aleatoria de 6 preguntas barajadas
    const sampled = sampleRandom(this.allQuestions, 6);
    // Barajar opciones de cada pregunta asegurando que el índice correcto se preserve
    const randomizedQuestions = sampled.map(q => {
      const originalCorrectText = q.options[q.correctIndex];
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);
      return {
        ...q,
        options: shuffledOptions,
        correctIndex: newCorrectIndex
      };
    });

    this.activeQuestions.set(randomizedQuestions);
    this.currentIndex.set(0);
    this.selectedIndex.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.currentStreak.set(0);
    this.maxStreak.set(0);
    this.gameFinished.set(false);
  }

  public selectAnswer(idx: number): void {
    if (this.isAnswerChecked()) return;
    this.selectedIndex.set(idx);
    this.sound.playPop();

    const correct = idx === this.currentQuestion().correctIndex;
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
      this.gamification.setMascotMessage('⭐ ¡Genial! ¡Tu racha de sabiduría literaria sigue creciendo!');
    } else {
      this.sound.playIncorrect();
      this.currentStreak.set(0);
      this.gamification.setMascotMessage('💡 ¡Ánimo! De cada pregunta aprendemos un tesoro nuevo.');
    }
  }

  public nextQuestion(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeQuestions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedIndex.set(null);
      this.isAnswerChecked.set(false);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 5 ? 3 : this.score() >= 3 ? 2 : 1;
    const earnedXp = this.score() * 25 + 30;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'superar la Trivia de Lengua y Letras');
    if (this.maxStreak() >= 4 || this.score() >= 5) {
      this.gamification.unlockBadge('campeon-trivia');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
